import { useEffect, useState } from "react";
import Header from "../General/Header";
import styles from "./Feed.module.css";
import FeedItem from "./FeedItem";
import { getFriendsStories, getMyStories } from "../../utils/apiCalls";
import { useUser } from "../../contexts/UserContext";
import Loader from "../General/Loader";
import Input from "../General/Input";

function Feed() {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch, stories, defaultSearch } = useUser();
  const [search, setSearch] = useState("");
  const [filteredStories, setFilteredStories] = useState([]);
  const [showFullImage, setShowFullImage] = useState(false);

  useEffect(
    function () {
      // if there is no default search, return
      if (!defaultSearch) return;
      // if there is a default search, set the search to that value and immediately set the default back to the empty string
      setSearch(defaultSearch);
      dispatch({ type: "search/setDefaultSearch", payload: "" });
    },
    [defaultSearch, search, dispatch]
  );

  useEffect(
    function () {
      // filter the stories by author name
      setFilteredStories((filteredStories) => [...stories]);
      if (search.length > 0) {
        setFilteredStories(
          stories.filter((story) => {
            if (story.author.name.includes(search)) return story;
          })
        );
      }
    },
    [search, setFilteredStories, stories]
  );

  useEffect(
    function () {
      async function fetchStories() {
        try {
          setIsLoading(true);
          const res = await getFriendsStories();
          const myStories = await getMyStories();
          const combined = [...res.data, ...myStories.data];
          dispatch({ type: "user/storiesReceived", payload: combined });
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }
      fetchStories();
    },
    [dispatch]
  );

  if (!filteredStories) return null;
  return (
    <div className={styles.container}>
      <div className={styles.selectorContainer}>
        <Input
          field={search}
          type="text"
          setterFunction={setSearch}
          id="search"
          defaultValue={search}
        >
          Search for a user
        </Input>
      </div>
      {isLoading && <Loader size={"big"} />}
      {!isLoading &&
        filteredStories.length > 0 &&
        filteredStories
          .slice()
          .sort((a, b) => {
            return new Date(b.createdOn) - new Date(a.createdOn);
          })
          .map((story, i) => (
            <FeedItem
              showFullImage={showFullImage}
              setShowFullImage={setShowFullImage}
              story={story}
              key={i}
            />
          ))}
    </div>
  );
}

export default Feed;
