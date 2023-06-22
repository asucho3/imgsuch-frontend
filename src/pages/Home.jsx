import Feed from "../components/Feed/Feed";
import styles from "./Home.module.css";

function Home() {
  return (
    <>
      <Feed className={styles.container} />
    </>
  );
}

export default Home;
