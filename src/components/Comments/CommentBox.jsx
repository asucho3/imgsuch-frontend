import styles from "./CommentBox.module.css";
import Comment from "./Comment";

function CommentBox() {
  return (
    <div className={styles.commentBox}>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
}

export default CommentBox;
