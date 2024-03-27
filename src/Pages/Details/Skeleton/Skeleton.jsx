import styles from "./Skeleton.module.css";
export const Skeleton = () => {
  return (
    <div className={styles.skeleton__container}>
      <div className={styles.item}>
        <div className={`${styles.skeleton} ${styles.image}`} />
      </div>
      <div className={styles.skeleton__textblock}>
        <p className={`${styles.skeleton} ${styles.title}`} />
        <p className={`${styles.skeleton} ${styles.date}`} />
        <div className={`${styles.skeleton} ${styles.overview}`}></div>
      </div>
    </div>
  );
};
