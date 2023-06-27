import { useUser } from "../../contexts/UserContext";
import { SERVER_URL } from "../../utils/apiCalls";
import styles from "./Header.module.css";
function Header({ children }) {
  const { photo } = useUser();
  return (
    <div className={styles.headerBack}>
      <h1 className={styles.header}>
        <img
          className={styles.headerImage}
          src={`${SERVER_URL}/img/users/${photo}`}
        ></img>
        <span className={styles.headerText}>{children}</span>
      </h1>
    </div>
  );
}

export default Header;
