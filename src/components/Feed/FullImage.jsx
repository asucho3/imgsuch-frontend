import styles from "./FullImage.module.css";
import ImageNavigation from "./ImageNavigation";

function FullImage({
  imgsrc,
  currentImageIndex,
  numImages,
  handleImageNavigation,
  handleImageClick,
}) {
  return (
    <>
      <div onClick={handleImageClick} className={styles.overlay}></div>
      <div className={styles.container}>
        {currentImageIndex > 0 && (
          <ImageNavigation
            direction={"previous"}
            onClick={() => handleImageNavigation("previous")}
          />
        )}
        <img src={imgsrc} className={styles.storyImage}></img>
        {currentImageIndex < numImages - 1 && (
          <ImageNavigation
            direction={"next"}
            onClick={() => handleImageNavigation("next")}
          />
        )}
      </div>
    </>
  );
}

export default FullImage;
