import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromAPI } from "../../utils/api";
import { Poster } from "../Poster/Poster";
import styles from "./SearchResults.module.css";
import { Container } from "../Container/Container";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "../Spinner/Spinner";
export const SearchResults = () => {
  const { query } = useParams();
  const [page, setPage] = useState(1);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initialFetchData = () => {
      setLoading(true);
      fetchDataFromAPI(`/search/multi?query=${query}&page=1`)
        .then((res) => {
          setData(res);
          setPage((prevPage) => prevPage + 1);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    initialFetchData();
    setPage(1);
  }, [query]);

  const fetchData = () => {
    fetchDataFromAPI(`/search/multi?query=${query}&page=${page}`).then(
      (res) => {
        setData({
          ...data,
          results: [...(data?.results || []), ...res?.results],
        });
        setPage((prevPage) => prevPage + 1);
      }
    );
  };

  return (
    <div className={styles.container}>
      <Container>
        {loading && <Spinner />}
        {!loading &&
          (data?.results?.length > 0 ? (
            <InfiniteScroll
              dataLength={data?.results?.length || []}
              next={fetchData}
              hasMore={page <= data?.total_pages}
              loader={<Spinner />}
            >
              <h2 style={{ marginBottom: "20px" }}>
                Search Results of <q>{query}</q>
              </h2>
              <div className={styles.grid}>
                {data?.results?.map((item) => (
                  <Poster
                    key={item?.id}
                    item={item}
                    endpoint={""}
                    showRatings={false}
                    showGenres={false}
                  />
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            <h2>Sorry No Results Found</h2>
          ))}
      </Container>
    </div>
  );
};
