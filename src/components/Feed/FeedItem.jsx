import { useNavigate } from "react-router-dom";
import { SERVER_URL, disableStory } from "../../utils/apiCalls";
import CommentBox from "../Comments/CommentBox";
import RoundButton from "../General/RoundButton";
import TextExpander from "../General/TextExpander";
import Upvote from "../General/Upvote";
import styles from "./FeedItem.module.css";
import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import Loader from "../General/Loader";
// import ShowComments from "./ShowComments";

function FeedItem({ story }) {
  const { author, id, images, rating, text, title, disabled } = story;
  const { id: userId } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleEditStory() {
    const storyToEdit = {
      id,
      title,
      text,
    };
    localStorage.setItem("editStory", JSON.stringify(storyToEdit));
    navigate("/app/editStory");
  }

  async function handleDeleteStory() {
    setIsLoading(true);
    try {
      const res = await disableStory(id);
      if (res.status === "success") {
        window.location.reload(false);
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (!author) return null;
  return (
    <div className={styles.container}>
      {userId === author.id && (
        <>
          <RoundButton type={"edit"} onClick={handleEditStory} />
          <RoundButton type={"delete"} onClick={handleDeleteStory} />
        </>
      )}
      {disabled && <span>disabled</span>}
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
          <div className={styles.ratings}>
            <span>💪</span>
            <span>{author.rating}</span>
          </div>
          <div className={styles.ratings}>
            <span>👏</span>
            <span>{author.rating}</span>
          </div>
        </div>
      </div>
      <div className={styles.story}>
        {images && images[0] && (
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
        {isLoading && <Loader size={"big"} />}
        <Upvote rating={rating} storyId={id} />
        {/* <ShowComments /> */}
        <CommentBox storyId={id} />
      </div>
    </div>
  );
}

export default FeedItem;
