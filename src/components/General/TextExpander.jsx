import styles from "./TextExpander.module.css";
import { useState } from "react";

function TextExpander({ children }) {
  const LENGTH_LIMIT = 100;

  const [expand, setExpand] = useState(() => {
    children.length < LENGTH_LIMIT ? true : false;
  });
  function handleClick() {
    setExpand((expand) => !expand);
  }
  if (children.length <= LENGTH_LIMIT) return children;
  return (
    <>
      <span>
        {expand ? children : `${children.slice(0, LENGTH_LIMIT)}`}
        {!expand && (
          <span onClick={handleClick} className={styles.textExpander}>
            ... (click to expand)
          </span>
        )}
        {expand && (
          <span onClick={handleClick} className={styles.textExpander}>
            {" "}
            (click to collapse)
          </span>
        )}
      </span>
    </>
  );
}

export default TextExpander;
