import styles from "./ActionText.module.css";

function ActionText({ onClick, children }) {
  return (
    <div className={styles.actions}>
      <div className={styles.action} onClick={onClick}>
        {children}
      </div>
    </div>
  );
}

export default ActionText;
