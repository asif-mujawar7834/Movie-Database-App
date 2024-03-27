import { useState } from "react";
import { Tab } from "../Tabs/Tab";
import styles from "../Trending/Trending.module.css";
import { useFetch } from "../../hooks/useFetch";
import { Carousel } from "../Carousel/Carousel";
import { Container } from "../Container/Container";
import { Poster } from "../Poster/Poster";
export const TopRated = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading, error } = useFetch(`/${endpoint}/top_rated`);

  const onTabChange = (tab) => {
    setEndpoint(tab);
  };
  return (
    <div className={styles.trending__container}>
      <Container>
        <div className={styles.header}>
          <h2>Top Rated</h2>
          <Tab tabList={["movie", "tv"]} onTabChange={onTabChange} />
        </div>
        <Carousel data={data?.results} loading={loading}>
          <div className={styles.carousel__container}>
            {data?.results?.map((item) => {
              return (
                <Poster
                  key={item?.id}
                  item={item}
                  endpoint={endpoint}
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
