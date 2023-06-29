import { useState } from "react";
import Header from "../components/General/Header";
import Input from "../components/General/Input";
import styles from "./NewStory.module.css";
import { createStory } from "../utils/apiCalls";
import Alert from "../components/General/Alert";
import Button from "../components/General/Button";
import Loader from "../components/General/Loader";
import { useNavigate } from "react-router-dom";
function NewStory() {
  const [storyTitle, setStoryTitle] = useState("");
  const [storyText, setStoryText] = useState("");
  const [storyImages, setStoryImages] = useState([]);
  const [alert, setAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const MAX_FILES_PER_STORY = 5;
  const navigate = useNavigate();

  function handleFileChange(e) {
    // check that the user is not trying to upload over the limit
    if (e.target.files.length > MAX_FILES_PER_STORY) {
      setAlert(`You can upload up to ${MAX_FILES_PER_STORY} files per story`);
    }
    // set the piece of state to the files selected by the user
    setStoryImages((storyImages) => e.target.files);
  }

  async function handleSubmit(e) {
    // create a FormData object and append the title, the text and each of the 5 files
    e.preventDefault();
    if (storyImages.length > MAX_FILES_PER_STORY) return;
    setIsLoading(true);
    setAlert("");
    const storyForm = new FormData();
    storyForm.append("title", storyTitle);
    storyForm.append("text", storyText);
    storyForm.append("file1", storyImages[0]);
    storyForm.append("file2", storyImages[1]);
    storyForm.append("file3", storyImages[2]);
    storyForm.append("file4", storyImages[3]);
    storyForm.append("file5", storyImages[4]);

    try {
      const res = await createStory(storyForm);
      console.log(res);
      if (res.status === "success") {
        navigate("/app");
      } else {
        setAlert(res.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header>Write a new story</Header>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.inputFields}>
          <div className={styles.inputBlock}>
            <h3 className={styles.header}>Give your story a title</h3>
            <input
              name="title"
              id="title"
              type="text"
              className={styles.title}
              value={storyTitle}
              onChange={(e) => setStoryTitle(e.target.value)}
            ></input>
          </div>

          <div className={styles.inputBlock}>
            <h3 className={styles.header}>Tell us about your story!</h3>
            <textarea
              name="text"
              id="text"
              className={styles.text}
              value={storyText}
              onChange={(e) => setStoryText(e.target.value)}
            >
              {" "}
            </textarea>
          </div>

          <div className={styles.inputBlock}>
            <h3 className={styles.header}>Add a few images</h3>
            <input
              multiple={true}
              name="images"
              id="images"
              accept="image/png, image/jpeg"
              type="file"
              onChange={handleFileChange}
            ></input>
          </div>

          <div className={styles.buttonContainer}>
            <Button processing={isLoading}>Send!</Button>
            {isLoading && <Loader size={"small"} />}
          </div>
          {alert && <Alert>{alert}</Alert>}
        </form>
      </div>
    </>
  );
}

export default NewStory;

//{ field, type, setterFunction, children, id, defaultValue })
