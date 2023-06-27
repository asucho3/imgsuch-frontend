import CommentBox from "../Comments/CommentBox";
import TextExpander from "../General/TextExpander";
import Upvote from "../General/Upvote";
import styles from "./FeedItem.module.css";
// import ShowComments from "./ShowComments";

function FeedItem({ story }) {
  const { image, name, rating, storyImage, storyTitle, storyText } = story;
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <img src={image} className={styles.userImage}></img>
        <div className={styles.userName}>
          <span>🙍‍♂️</span>
          <span>{name}</span>
        </div>
        <div className={styles.userRating}>
          <span>⭐</span>
          <span>{rating}</span>
        </div>
      </div>
      <div className={styles.story}>
        <img src={storyImage} className={styles.storyImage}></img>
        <h2 className={styles.storyTitle}>{storyTitle}</h2>
        <div className={styles.storyText}>
          <TextExpander>{storyText}</TextExpander>
        </div>
      </div>
      <div className={styles.interactions}>
        <Upvote />
        {/* <ShowComments /> */}
        <CommentBox />
      </div>
    </div>
  );
}

export default FeedItem;
