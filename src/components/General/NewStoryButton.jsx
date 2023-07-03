import { useNavigate } from "react-router-dom";
import styles from "./NewStoryButton.module.css";
function NewStoryButton() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/app/newStory");
  }

  return (
    <div onClick={handleClick} className={styles.container}>
      asd
      <div className={styles.content}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          // stroke-width="1.5"
          stroke="currentColor"
          // class="w-6 h-6"
        >
          <path
            // stroke-linecap="round"
            // stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
    </div>
  );
}

export default NewStoryButton;
