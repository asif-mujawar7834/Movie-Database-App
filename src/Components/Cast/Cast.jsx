import React from "react";
import styles from "./Cast.module.css";
import { useSelector } from "react-redux";
import { Container } from "../Container/Container";
import blankprofile from "../../assets/Images/blankprofile.png";
import fonts from "../../fonts.module.css";
import { Carousel } from "../Carousel/Carousel";
export const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state?.homeSlice);

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

  return (
    <div className={styles.trending__container}>
      <Container>
        <div className={styles.header}>
          <h2>Cast</h2>
        </div>
        <Carousel data={data?.results} loading={loading}>
          <div className={styles.carousel__container}>
            {data?.map((item, index) => {
              const poster = item?.profile_path
                ? url.profile + item?.profile_path
                : blankprofile;
              return (
                <div key={index} style={{ textAlign: "center" }}>
                  <img
                    src={poster}
                    alt={item?.name}
                    className={styles.profile__picture}
                  />
                  <div className={styles.textblock}>
                    <span>{item?.name}</span>
                    <span>{item?.character}</span>
                  </div>
                  {/* <p className={`${styles.actorName} ${fonts.roboto__medium}`}>
                    {item?.name}
                  </p>
                  <p className={`${styles.character} ${fonts.roboto__regular}`}>
                    {item?.character}
                  </p> */}
                </div>
              );
            })}
          </div>
        </Carousel>
      </Container>
    </div>
    // <Container>
    //   <div className={styles.container}>
    //     {!loading ? (
    //       <div className={styles.scrollContainer} ref={containerRef}>
    //         <div className={styles.scrollContent}>
    //           {data?.map((item, index) => {
    //             const poster = item?.profile_path
    //               ? url.profile + item?.profile_path
    //               : blankprofile;
    //             return (
    //               <div key={index} style={{ textAlign: "center" }}>
    //                 <img
    //                   src={poster}
    //                   alt={item?.name}
    //                   className={styles.profile__picture}
    //                 />
    //                 <p
    //                   className={`${styles.actorName} ${fonts.roboto__medium}`}
    //                 >
    //                   {item?.name}
    //                 </p>
    //                 <p
    //                   className={`${styles.character} ${fonts.roboto__regular}`}
    //                 >
    //                   {item?.character}
    //                 </p>
    //               </div>
    //             );
    //           })}
    //         </div>
    //         {scrollable?.scrollLeft > 0 && (
    //           <button
    //             onClick={scrollLeft}
    //             className={`${styles.button} ${styles.left}`}
    //           >
    //             <FaAngleLeft />
    //           </button>
    //         )}

    //         {scrollable.scrollRight && (
    //           <button
    //             onClick={scrollRight}
    //             className={`${styles.button} ${styles.right}`}
    //           >
    //             <FaAngleRight />
    //           </button>
    //         )}
    //       </div>
    //     ) : (
    //       <div className={styles.scrollContent}>
    //         {skeleton()}
    //         {skeleton()}
    //         {skeleton()}
    //         {skeleton()}
    //         {skeleton()}
    //         {skeleton()}
    //         {skeleton()}
    //         {skeleton()}
    //         {skeleton()}
    //         {skeleton()}
    //         {skeleton()}
    //         {skeleton()}
    //       </div>
    //     )}
    //   </div>
    // </Container>
  );
};
