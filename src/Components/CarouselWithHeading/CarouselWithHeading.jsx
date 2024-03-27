import { useEffect, useState } from "react";
import { Tab } from "../Tabs/Tab";
import styles from "./CarouselWithHeading.module.css";
import { useFetch } from "../../hooks/useFetch";
import { Carousel } from "../Carousel/Carousel";
import { Container } from "../Container/Container";
import { Poster } from "../Poster/Poster";
export const CarouselWithHeading = ({
  heading,
  endpoint,
  setEndpoints,
  endpointName,
  tabList,
  mediaType,
  id,
  url,
}) => {
  // const [newUrl, setNewUrl] = useState(null);
  // useEffect(() => {
  //   switch (heading) {
  //     case "Trending":
  //       setNewUrl(`/trending/movie/${endpoint}`);
  //       break;

  //     case "What's Popular":
  //       setNewUrl(`/${endpoint}/popular`);
  //       break;

  //     case "Top Rated":
  //       setNewUrl(`/${endpoint}/top_rated`);
  //       break;

  //     case "Similar":
  //       setNewUrl(`/${mediaType}/${id}/similar`);
  //       break;

  //     case "Recommendations":
  //       setNewUrl(`/${mediaType}/${id}/recommendations`);
  //       break;
  //   }
  // }, [endpoint]);

  const { data, loading, error } = useFetch(url);

  const onTabChange = (tab) => {
    setEndpoints(endpointName, tab);
  };

  if (!data?.results?.length) return;
  return (
    <div className={styles.trending__container}>
      <Container>
        <div className={styles.header}>
          <h2>{heading}</h2>
          {tabList?.length && (
            <Tab tabList={tabList} onTabChange={onTabChange} />
          )}
        </div>
        <Carousel data={data?.results} loading={loading}>
          <div className={styles.trending__carousel__container}>
            {data?.results?.map((item) => {
              return (
                <Poster
                  key={item?.id}
                  item={item}
                  endpoint={endpoint || mediaType}
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
