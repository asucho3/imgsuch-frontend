import styles from "./CommentBox.module.css";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import { getComments } from "../../utils/apiCalls";
import Loader from "../General/Loader";
import CreateComment from "./CreateComment";

function CommentBox({ storyId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [refreshComments, setRefreshComments] = useState(false);

  useEffect(
    function () {
      async function fetchComments() {
        try {
          setIsLoading(true);
          const res = await getComments(storyId);
          if (res.status === "success") {
            setComments(res.data);
          }
        } catch (err) {
          console.log(err);
        } finally {
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
              .map((comment) => comment)
              .sort((a, b) => b.createdOn < a.createdOn)
              .map((comment) => (
                <Comment key={comment._id} commentObj={comment} />
              ))}
          {!isLoading && comments.length === 0 && <div>No comments yet</div>}
        </div>
        <CreateComment
          storyId={storyId}
          setRefreshComments={setRefreshComments}
        />
      </div>
    </>
  );
}

export default CommentBox;
