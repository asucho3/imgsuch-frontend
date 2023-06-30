import { useEffect, useState } from "react";
import {
  SERVER_URL,
  disableComment,
  getComments,
  toggleRateComment,
} from "../../utils/apiCalls";
import TextExpander from "../General/TextExpander";
import styles from "./Comment.module.css";
import { useUser } from "../../contexts/UserContext";
import Loader from "../General/Loader";
import CreateComment from "./CreateComment";
import RoundButton from "../General/RoundButton";

function Comment({ commentObj, setRefreshComments, setEdit, edit }) {
  const { author, comment, createdOn, rating, _id } = commentObj;
  const { dispatch, ratedComments, id: userId } = useUser();
  const [updatedRating, setUpdatedRating] = useState(rating);
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = edit === _id;

  async function handleToggleRateComment() {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const res = await toggleRateComment(_id);
      if (res.status === "success") {
        // add this comment to the context, to compare and set its style correctly (ie. if it has been rated, paint it green)
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

  function handleEditComment() {
    // use the setter function from the Comment Box to target this comment
    setEdit((edit) => (edit !== _id ? _id : null));
  }

  async function handleDeleteComment() {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const res = await disableComment(_id);
      if (res.status === "success") {
        // after deleting, refresh the comments using the setter function from CommentBox
        setRefreshComments(true);
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={`${styles.container} ${isEditing ? styles.editing : ""}`}>
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
      {userId === author.id && (
        <>
          <RoundButton
            type={"edit"}
            size={"small"}
            onClick={handleEditComment}
          />
          {!isEditing && (
            <RoundButton
              type={"delete"}
              size={"small"}
              onClick={handleDeleteComment}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Comment;
