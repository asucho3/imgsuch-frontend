import styles from "./CommentBox.module.css";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import { getComments } from "../../utils/apiCalls";
import Loader from "../General/Loader";
import CreateComment from "./CreateComment";

function CommentBox({ storyId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [edit, setEdit] = useState(null);
  const [refreshComments, setRefreshComments] = useState(false);

  // if there is an edit in progress, copy the text of the comment being edited to pass it to CreateComment component
  const editText =
    edit !== null
      ? comments.find((comment) => comment._id === edit).comment
      : "";

  useEffect(
    function () {
      async function fetchComments() {
        try {
          setIsLoading(true);
          const res = await getComments(storyId);
          if (res.status === "success") {
            // after fetching the comments, update the state with the response (which contains the comments)
            setComments(res.data);
          }
        } catch (err) {
          console.log(err);
        } finally {
          // if we just fetched the comments, then refresh comments must be set to false
          setIsLoading(false);
          setRefreshComments(false);
        }
      }
      fetchComments();
    },
    [storyId, refreshComments]
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.commentBox}>
          {isLoading && <Loader size={"medium"} />}
          {!isLoading &&
            comments.length > 0 &&
            comments
              .slice()
              .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
              .map((comment) => (
                <Comment
                  key={comment._id}
                  commentObj={comment}
                  edit={edit}
                  setEdit={setEdit}
                  setRefreshComments={setRefreshComments}
                />
              ))}
          {!isLoading && comments.length === 0 && <div>No comments yet</div>}
        </div>
        <CreateComment
          editText={editText}
          storyId={storyId}
          setRefreshComments={setRefreshComments}
          commentId={edit}
          setEdit={setEdit}
        />
      </div>
    </>
  );
}

export default CommentBox;
