import styles from "./Upvote.module.css";

function Upvote() {
  return (
    <div className={styles.container}>
      <div className={styles.upvote}>💪</div>
      <div className={styles.currentRating}>5042</div>
    </div>
  );
}

export default Upvote;
