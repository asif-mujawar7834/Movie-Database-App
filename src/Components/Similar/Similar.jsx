import styles from "../Trending/Trending.module.css";
import { useFetch } from "../../hooks/useFetch";
import { Carousel } from "../Carousel/Carousel";
import { Container } from "../Container/Container";
import { Poster } from "../Poster/Poster";
export const Similar = ({ mediaType, id, endPoint }) => {
  const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

  return (
    <div className={styles.trending__container}>
      <Container>
        <div className={styles.header}>
          <h2>Similar</h2>
        </div>
        <Carousel data={data?.results} loading={loading}>
          <div className={styles.carousel__container}>
            {data?.results?.map((item) => {
              return (
                <Poster
                  key={item?.id}
                  item={item}
                  endpoint={endPoint}
                  showRatings={true}
                  showGenres={false}
                />
              );
            })}
          </div>
        </Carousel>
      </Container>
    </div>
  );
};
