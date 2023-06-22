import CommentBox from "../Comments/CommentBox";
import TextExpander from "../General/TextExpander";
import Upvote from "../General/Upvote";
import styles from "./FeedItem.module.css";
// import ShowComments from "./ShowComments";

function FeedItem({ text }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.user}>
          <img src="/img/leo.jpg" className={styles.userImage}></img>
          <div src="/img/leo.jpg" className={styles.userName}>
            <span>🙍‍♂️</span>
            <span>leo34</span>
          </div>
          <div src="/img/leo.jpg" className={styles.userRating}>
            <span>⭐</span>
            <span>4.8</span>
          </div>
        </div>
        <div className={styles.story}>
          <img src="/img/story.jpg" className={styles.storyImage}></img>
          <h2 className={styles.storyTitle}>title</h2>
          <div className={styles.storyText}>
            <TextExpander>{text}</TextExpander>
          </div>
        </div>
        <div className={styles.interactions}>
          <Upvote />
          {/* <ShowComments /> */}
          <CommentBox />
        </div>
      </div>
    </>
  );
}

export default FeedItem;
