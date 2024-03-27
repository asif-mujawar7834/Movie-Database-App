import styles from "./Carousel.module.css";
import { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Container } from "../Container/Container";
export const Carousel2 = ({ loading, children, heading, tabList, apiUrl }) => {
  const containerRef = useRef();
  const scrollLeft = () => {
    containerRef.current.scrollLeft -= 200;
  };

  const scrollRight = () => {
    containerRef.current.scrollLeft += 200;
  };

  const [endpoint, setEndpoint] = useState(tabList[0]);
  const { data, loading, error } = useFetch(`/${apiUrl}/${endpoint}`);

  const onTabChange = (tab) => {
    setEndpoint(tab);
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
    <Container>
      <div className={styles.container}>
        {!loading ? (
          <>
            <div className={styles.header}>
              <h2>{heading}</h2>
              <Tab tabList={tabList} onTabChange={onTabChange} />
            </div>
            <div className={styles.scrollContainer} ref={containerRef}>
              <div className={styles.scrollContent}>{children}</div>
              <button
                onClick={scrollLeft}
                className={`${styles.button} ${styles.left}`}
              >
                <FaAngleLeft />
              </button>
              <button
                onClick={scrollRight}
                className={`${styles.button} ${styles.right}`}
              >
                <FaAngleRight />
              </button>
            </div>
          </>
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
    </Container>
  );
};
