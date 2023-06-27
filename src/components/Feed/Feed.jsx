import Header from "../General/Header";
import styles from "./Feed.module.css";
import FeedItem from "./FeedItem";

const feedItems = [
  {
    id: 1,
    image: "/img/leo.jpg",
    name: "leo34",
    rating: 4.8,
    storyImage: "/img/story.jpg",
    storyTitle: "cool title",
    storyText: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque id
    aperiam, commodi dolorem impedit tempora laboriosam reprehenderit
    recusandae explicabo molestias veniam, tenetur veritatis laborum
    pariatur nemo vero hic nostrum numquam!`,
  },
  {
    id: 2,
    image: "/img/leo.jpg",
    name: "leo34",
    rating: 4.8,
    storyImage: "/img/story.jpg",
    storyTitle: "cool title",
    storyText: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque id
    aperiam, commodi dolorem impedit tempora laboriosam reprehenderit
    recusandae explicabo molestias veniam, tenetur veritatis laborum
    pariatur nemo vero hic nostrum numquam!`,
  },
  {
    id: 3,
    image: "/img/leo.jpg",
    name: "leo34",
    rating: 4.8,
    storyImage: "/img/story.jpg",
    storyTitle: "cool title",
    storyText: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque id
    aperiam, commodi dolorem impedit tempora laboriosam reprehenderit
    recusandae explicabo molestias veniam, tenetur veritatis laborum
    pariatur nemo vero hic nostrum numquam!`,
  },
];

function Feed() {
  return (
    <div className={styles.container}>
      {feedItems.map((story) => (
        <FeedItem story={story} key={story.id} />
      ))}
    </div>
  );
}

export default Feed;
