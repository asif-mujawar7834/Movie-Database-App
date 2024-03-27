import styles from "./Carousel.module.css";
import { useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
export const Carousel = ({ loading, children }) => {
  const containerRef = useRef();
  const [scrollable, setScrollable] = useState({
    scrollLeft: 0,
    scrollRight: true,
    totalWidth: containerRef?.current?.scrollWidth,
  });

  const scrollLeft = () => {
    const container = containerRef?.current;
    const value = (container.scrollLeft -= 400);
    setScrollable((prevState) => ({
      ...prevState,
      scrollLeft: value,
      scrollRight: value + container.clientWidth < container.scrollWidth,
    }));
  };

  const scrollRight = () => {
    const container = containerRef?.current;
    const value = (container.scrollLeft += 400);
    setScrollable((prevState) => ({
      ...prevState,
      scrollLeft: value,
      scrollRight: value + container.clientWidth < container.scrollWidth,
    }));
  };

  const skeleton = () => {
    return (
      <div className={styles.skeleton__container}>
        <div className={styles.item}>
          <div className={`${styles.skeleton} ${styles.image}`} />
        </div>
        <div className={styles.textblock}>
          <span className={`${styles.skeleton} ${styles.title}`} />
          <span className={`${styles.skeleton} ${styles.date}`} />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {!loading ? (
        <div className={styles.scrollContainer} ref={containerRef}>
          {children}
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
        </div>
      )}
    </div>
  );
};
