import Feed from "../components/Feed/Feed";
import Header from "../components/General/Header";
import Nav from "../components/Nav/Nav";
import { useUser } from "../contexts/UserContext";
import styles from "./Home.module.css";

function Home() {
  const { name } = useUser();
  return (
    <>
      <Header>Welcome, {name}</Header>
      <Feed className={styles.container} />
    </>
  );
}

export default Home;
