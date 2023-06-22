import Header from "../General/Header";
import styles from "./Feed.module.css";
import FeedItem from "./FeedItem";

function Feed() {
  const testText1 = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque id
    aperiam, commodi dolorem impedit tempora laboriosam reprehenderit
    recusandae explicabo molestias veniam, tenetur veritatis laborum
    pariatur nemo vero hic nostrum numquam!`;
  const testText2 = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque id
    aperiam, commodi dolorem`;
  const testText3 = `weird...`;
  const testText4 = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque id
  aperiam, commodi doloremLorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque id
  aperiam, commodi doloremLorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque id
  aperiam, commodi doloremLorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque id
  aperiam, commodi doloremLorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque id
  aperiam, commodi doloremLorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque id
  aperiam, commodi dolorem`;

  return (
    <div className={styles.container}>
      <Header>Welcome back</Header>
      <FeedItem text={testText1} />
      <FeedItem text={testText2} />
      <FeedItem text={testText3} />
      <FeedItem text={testText4} />
    </div>
  );
}

export default Feed;
