import Feed from "../components/Feed/Feed";
import Header from "../components/General/Header";
import NewStoryButton from "../components/General/NewStoryButton";
import { useUser } from "../contexts/UserContext";
import styles from "./Home.module.css";

function Home() {
  const { name } = useUser();
  return (
    <>
      <Header>Welcome, {name}</Header>
      <Feed className={styles.container} />
      <NewStoryButton />
    </>
  );
}

export default Home;
