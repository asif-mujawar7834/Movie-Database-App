import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./CircularProgress.module.css";
export const CircularProgressBar = ({ rating, variant }) => {
  return (
    <div
      className={`${styles.circular__progress__container} ${styles[variant]}`}
    >
      <CircularProgressbar
        value={rating}
        text={`${rating.toFixed(1)}%`}
        maxValue={10}
        className={styles.circular__progress__text}
        styles={buildStyles({
          textSize: "25px",
          textColor: "green",
          pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
        })}
      />
    </div>
  );
};
