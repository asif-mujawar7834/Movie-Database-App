import { useNavigate } from "react-router-dom";
import { CircularProgressBar } from "../CircularProgress/CricularProgress";
import { Genres } from "../Genres/Genres";
import { useSelector } from "react-redux";
import styles from "./Poster.module.css";
import blankPoster from "../../assets/Images/blankposter.jpg";
import { formatDate } from "../../utils/getDateInString";
export const Poster = ({ item, endpoint, showRatings, showGenres }) => {
  const navigate = useNavigate();
  const { url } = useSelector((state) => state?.homeSlice);
  const poster = item?.poster_path
    ? url.backdrop + item?.poster_path
    : blankPoster;
  return (
    <div
      key={item?.id}
      onClick={() => navigate(`/${item?.media_type || endpoint}/${item?.id}`)}
    >
      <div className={styles.item}>
        <img src={poster} />
        {showRatings && (
          <div className={styles.progress__container}>
            <CircularProgressBar
              rating={item?.vote_average}
              variant={"extra__small"}
            />
          </div>
        )}
        {showGenres && <Genres data={item?.genre_ids} />}
      </div>
      <div className={styles.textblock}>
        <span>{item?.title || item?.name}</span>
        <span>
          {item?.release_date
            ? formatDate(item?.release_date)
            : "Release Date NA"}
        </span>
      </div>
    </div>
  );
};
