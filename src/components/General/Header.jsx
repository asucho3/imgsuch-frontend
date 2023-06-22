import styles from "./Header.module.css";
function Header({ children }) {
  return (
    <div className={styles.headerBack}>
      <h1 className={styles.header}>
        <span className={styles.headerText}>{children}</span>
      </h1>
    </div>
  );
}

export default Header;
