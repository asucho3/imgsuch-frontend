import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import styles from "./Nav.module.css";
import NavItem from "./NavItem";
import Search from "./Search";
import Button from "../General/Button";
import ActionText from "../General/ActionText";
import { useUser } from "../../contexts/UserContext";
import { logout } from "../../utils/apiCalls";

function Nav() {
  const { dispatch } = useUser();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const res = await logout();
      console.log(res);
      dispatch({ type: "user/logout" });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.container}>
      <ul className={styles.navList}>
        <Link style={{ textDecoration: "inherit", color: "inherit" }} to="">
          <Logo />
        </Link>
        <Link
          style={{ textDecoration: "inherit", color: "inherit" }}
          to="friends"
        >
          <NavItem emoji="😀" text="Friends" />
        </Link>
        <NavItem emoji="📷" text="Images" />
        <NavItem emoji="🚀" text="Trending" />
        <NavItem emoji="❔" text="About" />
        <NavItem emoji="🚪" text="Logout" onClick={handleLogout} />
      </ul>
      <Search />
    </div>
  );
}

export default Nav;
