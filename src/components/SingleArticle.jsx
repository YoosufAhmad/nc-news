import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/api";
import CommentCard from "./CommentsCard";
import Error from "./Error";

const SingleArticle = () => {
  const [article, setArticle] = useState({});
  const { article_id } = useParams();
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticleById(article_id)
      .then((articleData) => {
        setArticle(articleData);
        setIsLoading(false);
      })
      .catch((error) => {
        setApiError(error);
      });
  }, [article_id]);

  if (apiError) {
    return (
      <Error
        errorStatus={apiError.response.status}
        errorMessage={apiError.response.data.msg}
      />
    );
  }

  if (isLoading) {
    return <p>Loading article...</p>;
  }

  return (
    <section>
      <b className="article-title">{article.title}</b>
      <br />
      <br />
      <img src={article.article_img_url} alt={article.title}></img>
      <br />
      <span className="author">By {article.author}</span>
      <br />
      <br />
      <span className="article-body">{article.body}</span>
      <br />
      <br />
      <span className="topic">Topic: {article.topic}</span>
      <br />
      <br />
      <span className="votes">Votes: {article.votes}</span>
      <br />
      <span>
        <CommentCard article_id={article_id} />
      </span>
    </section>
  );
};

export default SingleArticle;
