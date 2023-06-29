import { useState } from "react";
import styles from "./CreateComment.module.css";
import { addComment } from "../../utils/apiCalls";
function CreateComment({ storyId, setRefreshComments }) {
  const [text, setText] = useState();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const textObj = { comment: text };
    console.log(textObj);
    try {
      const res = await addComment(storyId, textObj);
      console.log(res);
      if (res.status === "success") {
        setRefreshComments(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
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
