import { useState } from "react";
import Header from "../components/General/Header";
import Input from "../components/General/Input";
import styles from "./EditStory.module.css";
import { createStory, updateStory } from "../utils/apiCalls";
import Alert from "../components/General/Alert";
import Button from "../components/General/Button";
import Loader from "../components/General/Loader";
import { useNavigate } from "react-router-dom";
function EditStory() {
  // get the story body from localstorage
  const storyToEdit = JSON.parse(localStorage.getItem("editStory"));
  const { id, title, text } = storyToEdit;

  // and set it as the initial value of the fields
  const [storyTitle, setStoryTitle] = useState(title);
  const [storyText, setStoryText] = useState(text);

  const [alert, setAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    // create a FormData object and append the title, the text and each of the 5 files
    e.preventDefault();

    setIsLoading(true);
    setAlert("");

    const updatedStory = { title: storyTitle, text: storyText };

    try {
      const res = await updateStory(id, updatedStory);
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
      <Header>Edit your story</Header>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.inputFields}>
          <div className={styles.inputBlock}>
            <h3 className={styles.header}>Edit the title</h3>
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
            <h3 className={styles.header}>Edit the story content</h3>
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

export default EditStory;

//{ field, type, setterFunction, children, id, defaultValue })
