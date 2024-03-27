import React, { useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import styles from "../Cast/Cast.module.css";
import videoStyles from "./VideoSection.module.css";
import { Container } from "../Container/Container";
import fonts from "../../fonts.module.css";
import { FaRegPlayCircle } from "react-icons/fa";
import { Popup } from "../Popup/Popup";
import ReactPlayer from "react-player";
export const VideoSection = ({ data, loading }) => {
  const [open, setOpen] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const containerRef = useRef();
  const [scrollable, setScrollable] = useState({
    scrollLeft: 0,
    scrollRight: true,
    totalWidth: containerRef?.current?.scrollWidth,
  });

  const scrollLeft = () => {
    const container = containerRef?.current;
    const value = (container.scrollLeft -= 200);
    setScrollable((prevState) => ({
      ...prevState,
      scrollLeft: value,
      scrollRight: value + container.clientWidth < container.scrollWidth,
    }));
  };

  const scrollRight = () => {
    const container = containerRef?.current;
    const value = (container.scrollLeft += 200);
    setScrollable((prevState) => ({
      ...prevState,
      scrollLeft: value,
      scrollRight: value + container.clientWidth < container.scrollWidth,
    }));
  };

  const togglePopup = (state, video) => {
    setOpen(state);
    if (!state) {
      setVideoId(null);
    } else {
      setVideoId(video?.key);
    }
  };

  const skeleton = () => {
    return (
      <div className={styles.skeleton__container}>
        <div className={styles.item}>
          <div className={`${styles.skeleton} ${styles.image}`} />
          <div
            className={`${styles.skeleton} ${styles.skeleton__name}`}
            style={{ marginTop: "10px" }}
          ></div>
          <div
            className={`${styles.skeleton} ${styles.skeleton__character}`}
            style={{ marginTop: "7px" }}
          ></div>
        </div>
      </div>
    );
  };

  if (!data?.length) return;

  return (
    <div className={videoStyles.videoSecton__container}>
      <Container>
        <h2>Official Videos</h2>
        <div className={styles.container}>
          {!loading ? (
            <div className={styles.scrollContainer} ref={containerRef}>
              <div className={styles.scrollContent}>
                {data?.map((item, index) => {
                  const poster = `https://img.youtube.com/vi/${item?.key}/mqdefault.jpg`;
                  return (
                    <div key={index} onClick={() => togglePopup(true, item)}>
                      <div className={videoStyles.poster}>
                        <img src={poster} alt={item?.title} />
                        <div>
                          <FaRegPlayCircle className={videoStyles.playIcon} />
                        </div>
                      </div>
                      <p
                        className={`${styles.actorName} ${fonts.roboto__medium}`}
                        style={{ textAlign: "center", marginTop: "10px" }}
                      >
                        {item?.name}
                      </p>
                    </div>
                  );
                })}
              </div>
              {scrollable.scrollLeft > 0 && (
                <button
                  onClick={scrollLeft}
                  className={`${styles.button} ${styles.left}`}
                >
                  <FaAngleLeft />
                </button>
              )}
              {scrollable.scrollRight && (
                <button
                  onClick={scrollRight}
                  className={`${styles.button} ${styles.right}`}
                >
                  <FaAngleRight />
                </button>
              )}
            </div>
          ) : (
            <div className={styles.scrollContent}>
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
            </div>
          )}
        </div>
        <Popup isOpen={open} togglePopup={togglePopup}>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} />
        </Popup>
      </Container>
    </div>
  );
};
