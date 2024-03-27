import { useState } from "react";
import { Tab } from "../Tabs/Tab";
import styles from "./Trending.module.css";
import { useFetch } from "../../hooks/useFetch";
import { Carousel } from "../Carousel/Carousel";
import { Container } from "../Container/Container";
import { Poster } from "../Poster/Poster";
export const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");
  const { data, loading, error } = useFetch(`/trending/movie/${endpoint}`);

  const onTabChange = (tab) => {
    setEndpoint(tab);
  };

  return (
    <div className={styles.trending__container}>
      <Container>
        <div className={styles.header}>
          <h2>Trending</h2>
          <Tab tabList={["day", "week"]} onTabChange={onTabChange} />
        </div>
        <Carousel data={data?.results} loading={loading}>
          <div className={styles.trending__carousel__container}>
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
