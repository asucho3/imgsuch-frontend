import styles from "./Search.module.css";

function Search() {
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchBar}
        type="text"
        placeholder="start typing..."
      ></input>
      <button className={styles.searchButton}>🔍</button>
    </div>
  );
}

export default Search;
