import { useSelector } from "react-redux";
import styles from "./Genres.module.css";
export const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state?.homeSlice);
  return (
    <div className={styles.container}>
      {data?.slice(0, 3)?.map((d) => (
        <span key={d}>{genres[d]?.name}</span>
      ))}
    </div>
  );
};
