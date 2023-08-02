import { useUser } from "../../contexts/UserContext";
import styles from "./Search.module.css";

function Search() {
  const { dispatch, storySearch } = useUser();
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchBar}
        type="text"
        placeholder="search story"
        value={storySearch}
        onChange={(e) =>
          dispatch({ type: "user/setStorySearch", payload: e.target.value })
        }
      ></input>
      <button className={styles.searchButton}>🔍</button>
    </div>
  );
}

export default Search;
