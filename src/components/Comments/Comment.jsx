import TextExpander from "../General/TextExpander";
import styles from "./Comment.module.css";

function Comment() {
  return (
    <div className={styles.container}>
      <div className={styles.commentUser}>
        <img src="/img/leo.jpg" className={styles.commentUserImage}></img>
        <div className={styles.commentUserNameInteract}>
          <div className={styles.commentUserName}>leo34</div>
          <div className={styles.commentInteract}>
            <span>💪</span>
          </div>
        </div>
      </div>
      <div className={styles.commentText}>
        <TextExpander>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque id
          aperiam, commodi dolorem imp Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Eaque id aperiam, commodi dolorem imp
        </TextExpander>
      </div>
    </div>
  );
}

export default Comment;
