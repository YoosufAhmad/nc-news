import { getComments } from "../utils/api";
import { useEffect, useState } from "react";

const CommentsCard = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);


  useEffect(() => {
    getComments(article_id)
      .then((res) => {
        setComments(res);
        setIsLoading(false)
      })
      .catch((error) => {
        setApiError(error)
      });
  }, []);

  if (isLoading) {
    return <p>Loading comments...</p>
  }

  if (apiError) {
    return (
      <Error
        errorStatus={apiError.response.status}
        errorMessage={apiError.response.data.msg}
      />
    );
  }

  return (
    <section className="comments">
      <b>Comments</b>
      <ul className="comments-list">
        {comments.map((comment) => {
          if (comment) {
          const { comment_id, body, votes, author } = comment;
          return (
            <li className="comment" key={comment_id}>
              <span className="comment-body">{body}</span>
              <br />
              <span className="author">@{author}</span>
              <br />
              <span className="votes">Votes: {votes}</span>
            </li>
          )} else {
            return(<p>No comments for this article</p>)
          };
        })}
      </ul>
    </section>
  );
};

export default CommentsCard;
