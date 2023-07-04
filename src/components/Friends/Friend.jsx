import styles from "./Friend.module.css";
import {
  SERVER_URL,
  acceptFriendRequest,
  cancelFriendRequest,
  removeFriend,
  sendFriendRequest,
} from "../../utils/apiCalls";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import ButtonInteraction from "../General/ButtonInteraction";
import { useNavigate } from "react-router-dom";

function Friend({ friend, isFriend }) {
  const { id, photo, name, rating, stories } = friend;
  const { friendsRequestsReceived, friendsRequestsSent, dispatch } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // send friend request
  async function handleSendFriendRequest() {
    try {
      setIsProcessing(true);
      const data = await sendFriendRequest(id);
      if (data.status === "success") {
        dispatch({ type: "user/friendRequestSent", payload: id });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsProcessing(false);
    }
  }

  // cancel friend request
  async function handleCancelFriendRequest() {
    try {
      setIsProcessing(true);
      const data = await cancelFriendRequest(id);
      if (data.status === "success") {
        dispatch({ type: "user/cancelFriendRequest", payload: id });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsProcessing(false);
    }
  }

  // accept friend request
  async function handleAcceptFriendRequest() {
    try {
      setIsProcessing(true);
      const data = await acceptFriendRequest(id);
      if (data.status === "success") {
        dispatch({ type: "user/acceptFriendRequest", payload: id });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsProcessing(false);
    }
  }

  // remove friend
  async function handleRemoveFriend() {
    try {
      setIsProcessing(true);
      const data = await removeFriend(id);
      if (data.status === "success") {
        dispatch({ type: "user/removeFriend", payload: id });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsProcessing(false);
    }
  }

  // see stories
  function handleSeeStories() {
    dispatch({ type: "search/setDefaultSearch", payload: name });
    localStorage.setItem("defaultSearch", name);
    navigate("/app");
  }

  // send message
  async function handleSendMessage() {
    // try {
    //   }
    // } catch (err) {
    //   console.log(err);
    // } finally {
    //
    // }
  }

  return (
    <li
      id={id}
      className={`${isFriend ? styles.containerFriend : styles.container}`}
    >
      <div className={styles.friendPhotoContainer}>
        <img
          alt={`profile pic for ${name}`}
          className={styles.friendPhoto}
          src={`${SERVER_URL}/img/users/${photo}`}
        ></img>
      </div>
      <div className={styles.detailsAndInteractions}>
        <div className={styles.friendDetails}>
          <div className={styles.friendName}>🙍‍♂️{name}</div>
          <div className={styles.friendRating}>⭐{rating}</div>
          <div className={styles.friendStories}>📚{stories}</div>
          <div className={styles.friendStatus}>
            {isFriend ? "😀Friends" : "👤Not friend"}
          </div>
        </div>
        <div className={styles.friendInteractions}>
          {!isFriend &&
            !friendsRequestsSent.includes(id) &&
            !friendsRequestsReceived.includes(id) && (
              <ButtonInteraction
                onClick={handleSendFriendRequest}
                type="friendInteractionsAddFriend"
                isProcessing={isProcessing}
              >
                Add friend
              </ButtonInteraction>
            )}
          {!isFriend && friendsRequestsSent.includes(id) && (
            <ButtonInteraction
              onClick={handleCancelFriendRequest}
              type="friendInteractionsRequestSent"
              isProcessing={isProcessing}
            >
              Cancel request
            </ButtonInteraction>
          )}
          {!isFriend && friendsRequestsReceived.includes(id) && (
            <ButtonInteraction
              onClick={handleAcceptFriendRequest}
              type="friendInteractionsRequestReceived"
              isProcessing={isProcessing}
            >
              Accept friend request
            </ButtonInteraction>
          )}
          {isFriend && (
            <>
              <ButtonInteraction
                onClick={handleSeeStories}
                type="friendInteractionsSeeStories"
                isProcessing={isProcessing}
              >
                See stories
              </ButtonInteraction>
              {/* <ButtonInteraction
                onClick={handleSendMessage}
                type="friendInteractionsSendMessage"
                isProcessing={isProcessing}
              >
                Send message
              </ButtonInteraction> */}
              <ButtonInteraction
                onClick={handleRemoveFriend}
                type="friendInteractionsRemoveFriend"
                isProcessing={isProcessing}
              >
                Remove friend
              </ButtonInteraction>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default Friend;
