import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Container } from "../../Components/Container/Container";
import styles from "./DetailsBanner.module.css";
import { useSelector } from "react-redux";
import fonts from "../../fonts.module.css";
import { CircularProgressBar } from "../../Components/CircularProgress/CricularProgress";
import { FaRegPlayCircle } from "react-icons/fa";
import { useState } from "react";
import { Popup } from "../../Components/Popup/Popup";
import ReactPlayer from "react-player";
import { Skeleton } from "./Skeleton/Skeleton";
import blankPoster from "../../assets/Images/blankposter.jpg";
export const DetailsBanner = ({ video, crew }) => {
  const { mediaType, id } = useParams();
  const [open, setOpen] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { url } = useSelector((state) => state?.homeSlice);
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const director = crew?.filter((c) => c?.job === "Director");
  const writers = crew?.filter(
    (w) => w?.job === "Writer" || w?.job === "Screenplay" || w?.job === "Story"
  );

  const togglePopup = (state) => {
    setOpen(state);
    if (!state) {
      setVideoId(null);
    } else {
      setVideoId(video?.key);
    }
  };

  const poster = data?.poster_path
    ? url.backdrop + data?.poster_path
    : blankPoster;

  const bannerBackground = data?.backdrop_path
    ? url.backdrop + data?.backdrop_path
    : blankPoster;

  return (
    <div
      className={styles.detailsbanner__container}
      style={{ backgroundImage: `url(${bannerBackground})` }}
    >
      <div className={styles.banner__overlay}></div>
      <div className={styles.banner__contents}>
        <Container>
          {!loading ? (
            <div className={styles.container}>
              <img
                src={poster}
                alt={`${data?.title} poster`}
                className={styles.poster}
              />
              <div className={styles.details}>
                <h1 className={`${styles.title} ${fonts.roboto__medium}`}>
                  {data?.title}
                </h1>
                <span
                  className={`${styles.tagline} ${fonts.roboto__thin__italic}`}
                >
                  {data?.tagline}
                </span>
                <div className={styles.genres}>
                  {data?.genres.map((genre, index) => (
                    <span key={index} className={styles.genre}>
                      {genre?.name}
                    </span>
                  ))}
                </div>
                <div className={styles.rating__and__button__container}>
                  {data?.vote_average ? (
                    <CircularProgressBar
                      rating={data?.vote_average}
                      variant={"medium"}
                    />
                  ) : null}
                  {video && (
                    <button onClick={() => togglePopup(true)}>
                      <FaRegPlayCircle className={styles.playicon} />
                      Watch Trailer
                    </button>
                  )}
                </div>
                <div
                  className={`${styles.overview__container} ${fonts.roboto__regular}`}
                >
                  <span className={styles.overviewTitle}>Overview</span>
                  <p className={styles.overview}>{data?.overview}</p>
                </div>
                <div className={styles.status__container}>
                  <div>
                    <span className={`${fonts.roboto__medium} ${fonts.bold}`}>
                      Status :
                    </span>
                    <span> {data?.status}</span>
                  </div>
                  <div>
                    <span className={`${fonts.roboto__medium} ${fonts.bold}`}>
                      Release Date :
                    </span>
                    <span> {data?.release_date}</span>
                  </div>
                  <div>
                    <span className={`${fonts.roboto__medium} ${fonts.bold}`}>
                      Runtime :
                    </span>
                    <span> {data?.runtime}</span>
                  </div>
                </div>
                <div className={styles.director__writer_details}>
                  <div>
                    <p>
                      <span className={`${fonts.roboto__medium} ${fonts.bold}`}>
                        Director :{" "}
                      </span>
                      {director?.length > 0 &&
                        director?.map((d, index) => (
                          <span key={index}>{d.name}</span>
                        ))}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className={`${fonts.roboto__medium} ${fonts.bold}`}>
                        Writers :{" "}
                      </span>
                      {writers?.length > 0 &&
                        writers?.map((w, i) => (
                          <span key={i}>
                            {w?.name}
                            {i !== writers?.length - 1 && " ,"}
                          </span>
                        ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Skeleton />
          )}
        </Container>
      </div>
      <Popup isOpen={open} togglePopup={togglePopup}>
        <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} />
      </Popup>
      <div className={styles.banner__faded__effect}></div>
    </div>
  );
};
