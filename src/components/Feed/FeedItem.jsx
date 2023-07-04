import { useNavigate } from "react-router-dom";
import { SERVER_URL, disableStory } from "../../utils/apiCalls";
import CommentBox from "../Comments/CommentBox";
import RoundButton from "../General/RoundButton";
import TextExpander from "../General/TextExpander";
import Upvote from "../General/Upvote";
import styles from "./FeedItem.module.css";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import Loader from "../General/Loader";
import ImageNavigation from "./ImageNavigation";
import FullImage from "./FullImage";
// import ShowComments from "./ShowComments";

function FeedItem({ story, showFullImage, setShowFullImage }) {
  const { author, id, images, rating, text, title, disabled } = story;
  const { id: userId } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigate = useNavigate();

  const numImages = images?.length;

  const imgsrc = images
    ? `${SERVER_URL}/img/stories/${images[currentImageIndex]}`
    : "";

  // to edit the story, save the current details to an object in localstorage, and then navigate to editStory
  // the details will be fetched there to set the initial values
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
        // after deleting, refresh the page
        navigate("/app");
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleImageNavigation(direction) {
    if (direction === "previous") {
      if (currentImageIndex > 0) {
        setCurrentImageIndex((currentImageIndex) => currentImageIndex - 1);
      }
    }
    if (direction === "next") {
      if (currentImageIndex < numImages - 1) {
        setCurrentImageIndex((currentImageIndex) => currentImageIndex + 1);
      }
    }
  }

  function handleImageClick() {
    // showFullImage is set to point at the id of the selected story; that way, each FeedItem can be compared to the showFullImage id and determine which one is to be shown via the FullImage component
    setShowFullImage((showFullImage) => (showFullImage === null ? id : null));
  }

  if (!author) return null;
  return (
    <div className={styles.container}>
      {userId === author.id && (
        <>
          <RoundButton
            type={"edit"}
            size={"normal"}
            onClick={handleEditStory}
          />
          <RoundButton
            type={"delete"}
            size={"normal"}
            onClick={handleDeleteStory}
          />
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
        <div className={styles.ratings}>
          <span>💪</span>
          <span>{author.rating}</span>
        </div>
      </div>
      <div className={styles.story}>
        {showFullImage === id && (
          <FullImage
            handleImageClick={handleImageClick}
            handleImageNavigation={handleImageNavigation}
            currentImageIndex={currentImageIndex}
            numImages={numImages}
            imgsrc={imgsrc}
          />
        )}

        {images?.length > 0 && (
          <div className={styles.imageContainer}>
            {!showFullImage && currentImageIndex > 0 && (
              <ImageNavigation
                direction={"previous"}
                onClick={() => handleImageNavigation("previous")}
              />
            )}
            <img
              onClick={handleImageClick}
              src={imgsrc}
              className={styles.storyImage}
            ></img>
            {!showFullImage && currentImageIndex < numImages - 1 && (
              <ImageNavigation
                direction={"next"}
                onClick={() => handleImageNavigation("next")}
              />
            )}
          </div>
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
