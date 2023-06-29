import { useState } from "react";
import { SERVER_URL, toggleRateComment } from "../../utils/apiCalls";
import TextExpander from "../General/TextExpander";
import styles from "./Comment.module.css";
import { useUser } from "../../contexts/UserContext";
import Loader from "../General/Loader";
import CreateComment from "./CreateComment";

function Comment({ commentObj }) {
  const { author, comment, createdOn, rating, _id } = commentObj;

  const { dispatch, ratedComments } = useUser();

  const [updatedRating, setUpdatedRating] = useState(rating);

  const [isLoading, setIsLoading] = useState(false);

  async function handleToggleRateComment() {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const res = await toggleRateComment(_id);
      if (res.status === "success") {
        dispatch({ type: "user/commentToggleRate", payload: _id });
        setUpdatedRating(res.data.updatedComment.rating);
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.commentUser}>
        <img
          src={`${SERVER_URL}/img/users/${author.photo}`}
          className={styles.commentUserImage}
          alt={`profile of ${author.name}`}
        ></img>
        <div className={styles.commentUserNameInteract}>
          <div className={styles.commentUserName}>{author.name}</div>
          <div
            onClick={handleToggleRateComment}
            className={
              !ratedComments.includes(_id)
                ? styles.commentInteract
                : `${styles.commentInteract} ${styles.upvoted}`
            }
          >
            <div>💪</div>
            {isLoading && (
              <div className={styles.spinnerContainer}>
                <Loader size={"small"} />
              </div>
            )}
            <div>{updatedRating}</div>
          </div>
        </div>
      </div>
      <div className={styles.commentText}>
        <TextExpander>{comment}</TextExpander>
      </div>
    </div>
  );
}

export default Comment;
