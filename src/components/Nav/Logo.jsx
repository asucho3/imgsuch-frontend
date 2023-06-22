import styles from "./Logo.module.css";

function Logo() {
  return (
    <>
      <div className={styles.logoContainer}>
        <div className={styles.logoText}>
          <span>imgsuch</span>
        </div>
      </div>
    </>
  );
}

export default Logo;
