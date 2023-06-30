import styles from "./RoundButton.module.css";
function RoundButton({ type, onClick, size }) {
  let w, h, vw, vh, topOffset;
  if (size === "normal") {
    w = "4";
    h = "4";
    vw = "24";
    vh = "24";
    if (type === "edit") {
      topOffset = 1;
    }
    if (type === "delete") {
      topOffset = 7;
    }
  }
  if (size === "small") {
    w = "1.8";
    h = "1.8";
    vw = "24";
    vh = "24";
    if (type === "edit") {
      topOffset = 2.7;
    }
    if (type === "delete") {
      topOffset = 4.4;
    }
  }

  let markup;
  if (type === "edit") {
    markup = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox={`0 0 ${vw} ${vh}`}
        stroke-width="1.5"
        stroke="black"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
        />
      </svg>
    );
  }
  if (type === "delete") {
    markup = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox={`0 0 ${vw} ${vh}`}
        stroke-width="1.5"
        stroke="black"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    );
  }

  return (
    <div
      style={{
        width: `${w}rem`,
        height: `${h}rem`,
        top: `${topOffset}rem`,
        backgroundImage:
          type === "edit"
            ? `radial-gradient(
        var(--secondary-color-dark),
        var(--secondary-color-very-dark)`
            : `radial-gradient(
        var(--tertiary-color-light),
        var(--tertiary-color)`,
      }}
      onClick={onClick}
      className={styles.container}
    >
      <div className={styles.content}>{markup}</div>
    </div>
  );
}

export default RoundButton;
