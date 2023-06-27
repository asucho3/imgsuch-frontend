import styles from "./Alert.module.css";

function Alert({ children }) {
  return <div className={styles.alert}>{children}</div>;
}

export default Alert;
