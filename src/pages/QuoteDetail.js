import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import { Fragment, useEffect } from "react";
import HighLighteQuote from '../components/quotes/HighlightedQuote';
import Comments from '../components/comments/Comments';
import { getSingleQuote } from "../lib/api";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
    const params = useParams();
    const match = useRouteMatch();
    const { sendRequest, status, data, error} = useHttp(getSingleQuote, true);
    
    //so useEffect runs once
    const { quoteId } = params;

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if(status === 'pending'){
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        )
    }

    if (error){
        return <p className="centered">{error}</p>
    }

    if(status === 'completed' && (!data.text || data.text.length === 0)){
        return <p className="centered">No quote found</p>
    }

    return (
        <Fragment>
            <HighLighteQuote text={data.text} author={data.author} />
            <Route path={match.path} exact>
                <div className="centered">
                    <Link className="btn--flat" to={`${match.url}/comments`}>
                        Show Comments
                    </Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </Fragment>
    );
}

export default QuoteDetail;