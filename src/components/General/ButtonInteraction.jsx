import { useState } from "react";
import styles from "./ButtonInteraction.module.css";
import Loader from "./Loader";

function ButtonInteraction({ onClick, type, children, isProcessing }) {
  return (
    <div className={styles.interactionGroup}>
      <button
        disabled={isProcessing}
        onClick={onClick}
        className={styles[type]}
      >
        {children}
      </button>
      {isProcessing && (
        <div className={styles.spinnerContainer}>
          <Loader size={"small"} />
        </div>
      )}
    </div>
  );
}

export default ButtonInteraction;
