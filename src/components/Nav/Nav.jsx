import { Link } from "react-router-dom";
import Logo from "./Logo";
import styles from "./Nav.module.css";
import NavItem from "./NavItem";
import Search from "./Search";

function Nav() {
  return (
    <div className={styles.container}>
      <ul className={styles.navList}>
        <Link style={{ textDecoration: "inherit", color: "inherit" }} to="/">
          <Logo />
        </Link>
        <Link
          style={{ textDecoration: "inherit", color: "inherit" }}
          to="/friends"
        >
          <NavItem emoji="😀" text="Friends" />
        </Link>
        <NavItem emoji="📷" text="Images" />
        <NavItem emoji="🚀" text="Trending" />
        <NavItem emoji="❔" text="About" />
      </ul>
      <Search />
    </div>
  );
}

export default Nav;
