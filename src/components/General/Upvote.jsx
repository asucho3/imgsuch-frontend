import { useEffect, useState } from "react";
import { toggleRateStory } from "../../utils/apiCalls";
import styles from "./Upvote.module.css";
import Loader from "./Loader";
import { useUser } from "../../contexts/UserContext";

function Upvote({ rating, storyId }) {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch, ratedStories } = useUser();
  const [updatedRating, setUpdatedRating] = useState(rating);

  // keep updatedRating and rating in sync
  useEffect(
    function () {
      setUpdatedRating(rating);
    },
    [rating]
  );

  async function handleUpvote() {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const res = await toggleRateStory(storyId);
      setUpdatedRating(res.data.updatedStory.rating);
      if (res.status === "success") {
        dispatch({ type: "user/storyToggleRate", payload: storyId });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.upvoteContainer}>
        <div
          onClick={handleUpvote}
          className={
            !ratedStories.includes(storyId) ? styles.upvote : styles.upvoteGiven
          }
        >
          💪
        </div>
        {isLoading && (
          <div className={styles.spinnerContainer}>
            <Loader size={"small"} />
          </div>
        )}
      </div>
      <div className={styles.currentRating}>{updatedRating}</div>
    </div>
  );
}

export default Upvote;
