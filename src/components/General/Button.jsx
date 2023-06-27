import styles from "./Button.module.css";
function Button({ processing, children, onClick }) {
  return (
    <button onClick={onClick} disabled={processing} className={styles.button}>
      {children}
    </button>
  );
}

export default Button;
