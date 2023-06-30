import styles from "./ImageNavigation.module.css";

function ImageNavigation({ direction, onClick }) {
  let markup;
  if (direction === "previous") {
    markup = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2.5"
        stroke="grey"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    );
  }
  if (direction === "next") {
    markup = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2.5"
        stroke="grey"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    );
  }

  return (
    <div
      style={direction === "previous" ? { left: "0rem" } : { right: "0rem" }}
      className={styles.container}
      onClick={onClick}
    >
      {markup}
    </div>
  );
}

export default ImageNavigation;
