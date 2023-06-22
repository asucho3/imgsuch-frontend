import styles from "./NavItem.module.css";

function NavItem({ emoji, text }) {
  return (
    <li className={styles.navItem}>
      <span className={styles.navEmoji}>{emoji}</span>
      <span className={styles.navText}>{text}</span>
    </li>
  );
}

export default NavItem;
