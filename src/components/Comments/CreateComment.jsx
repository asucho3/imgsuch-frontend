import { useEffect, useState } from "react";
import styles from "./CreateComment.module.css";
import { addComment, updateComment } from "../../utils/apiCalls";
function CreateComment({
  storyId,
  setRefreshComments,
  editText,
  commentId,
  setEdit,
}) {
  const [text, setText] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      setText(editText);
    },
    [editText, setText]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const textObj = { comment: text };
    console.log(textObj);
    try {
      let res;
      // if there is a commentId, this must be an update (because that value is passed when edit is enabled); otherwise, handle as a new comment
      if (!commentId) res = await addComment(storyId, textObj);
      if (commentId) res = await updateComment(commentId, textObj);
      if (res.status === "success") {
        setRefreshComments(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      // after submitting, revert back to default values
      setIsLoading(false);
      setEdit(null);
      setText("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="start typing and press send"
        className={styles.input}
      ></textarea>
      <button disabled={isLoading} className={styles.button}>
        Send
      </button>
    </form>
  );
}

export default CreateComment;
