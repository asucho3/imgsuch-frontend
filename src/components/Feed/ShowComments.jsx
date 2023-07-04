import styles from "./ShowComments.module.css";

function ShowComments({ showComments, setShowComments }) {
  if (showComments) return null;
  return (
    <div className={styles.container}>
      <div onClick={() => setShowComments(true)} className={styles.text}>
        Show comments
      </div>
    </div>
  );
}

export default ShowComments;
