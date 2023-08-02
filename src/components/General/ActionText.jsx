import styles from "./ActionText.module.css";

function ActionText({ onClick, children, variation }) {
  return (
    <div className={styles.actions}>
      <div
        className={`${styles.action} ${variation ? styles[variation] : ""}`}
        onClick={onClick}
      >
        {children}
      </div>
    </div>
  );
}

export default ActionText;
