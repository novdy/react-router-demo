import { useRef, useEffect } from 'react';
import { addComment } from '../../lib/api';
import useHttp from '../../hooks/use-http';

import classes from './NewCommentForm.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const { sendRequest, status } = useHttp(addComment);
  const { onAddedComment } = props;

  useEffect(() => {
    if( status === 'completed'){
      onAddedComment();
    }
  }, [status, onAddedComment])

  const submitFormHandler = (event) => {
    event.preventDefault();

    // optional: Could validate here

    sendRequest({ commentData: {text: commentTextRef.current.value}, quoteId: props.quoteId });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' && (
        <div className='centered'>
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
