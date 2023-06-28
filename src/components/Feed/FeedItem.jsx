import { SERVER_URL } from "../../utils/apiCalls";
import CommentBox from "../Comments/CommentBox";
import TextExpander from "../General/TextExpander";
import Upvote from "../General/Upvote";
import styles from "./FeedItem.module.css";
// import ShowComments from "./ShowComments";

function FeedItem({ story }) {
  const { author, id, images, rating, text, title } = story;
  if (!author) return null;
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        {author.photo && (
          <img
            src={`${SERVER_URL}/img/users/${author.photo}`}
            className={styles.userImage}
          ></img>
        )}
        <div className={styles.userName}>
          <span>🙍‍♂️</span>
          <span>{author.name}</span>
        </div>
        <div className={styles.userRating}>
          <span>⭐</span>
          <span>{author.rating}</span>
        </div>
      </div>
      <div className={styles.story}>
        {images[0] && (
          <img
            src={`${SERVER_URL}/img/stories/${images[0]}`}
            className={styles.storyImage}
          ></img>
        )}
        <h2 className={styles.storyTitle}>{title}</h2>
        <div className={styles.storyText}>
          <TextExpander>{text}</TextExpander>
        </div>
      </div>
      <div className={styles.interactions}>
        <Upvote rating={rating} storyId={id} />
        {/* <ShowComments /> */}
        <CommentBox storyId={id} />
      </div>
    </div>
  );
}

export default FeedItem;
