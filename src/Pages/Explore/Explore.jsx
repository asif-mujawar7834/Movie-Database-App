import { useParams } from "react-router-dom";
import styles from "./Explore.module.css";
import { Container } from "../../Components/Container/Container";
import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../utils/api";
import { Spinner } from "../../Components/Spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { Poster } from "../../Components/Poster/Poster";
import { MultiSelect } from "../../Components/MultiSelect/MultiSelect";
import { useSelector } from "react-redux";
import { sort_by_data } from "../../utils/sort_by_data";
export const Explore = () => {
  const { mediaType } = useParams();
  const [page, setPage] = useState(1);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState([]);
  const [sortBy2, setSortBy2] = useState(null);
  const { genres } = useSelector((state) => state?.homeSlice);

  useEffect(() => {
    initialFetchData([], "");
    setPage(1);
    setData(null);
    setLoading(false);
    setSortBy([]);
    setSortBy2(null);
  }, [mediaType]);

  const initialFetchData = (genreIds, sort_by) => {
    setLoading(true);
    fetchDataFromAPI(`/discover/${mediaType}?page=1`, {
      with_genres: genreIds?.map((genre) => genre.id).join(","),
      sort_by: sort_by?.value,
    })
      .then((res) => {
        setData(res);
        setPage((prevPage) => prevPage + 1);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchData = () => {
    fetchDataFromAPI(`/discover/${mediaType}?page=${page}`, {
      with_genres: sortBy?.map((genre) => genre.id).join(","),
      sort_by: sortBy2?.value,
    }).then((res) => {
      setData({
        ...data,
        results: [...(data?.results || []), ...res?.results],
      });
      setPage((prevPage) => prevPage + 1);
    });
  };

  return (
    <div className={styles.container}>
      <Container>
        <div className={styles.header}>
          <h2 style={{ marginBottom: "20px" }}>Explore</h2>
          <div style={{ display: "flex", gap: "10px" }}>
            <MultiSelect
              multiple
              selectedOptions={sortBy}
              options={Object.values(genres).map((obj) => obj)}
              handleChange={(values) => {
                setSortBy(values);
                initialFetchData(values, sortBy2);
                setPage(1);
              }}
              fieldName={"name"}
            />
            <MultiSelect
              selectedOptions={sortBy2}
              options={sort_by_data}
              handleChange={(values) => {
                setSortBy2(values);
                initialFetchData(sortBy, values);
                setPage(1);
              }}
              fieldName={"label"}
            />
          </div>
        </div>
        {loading && <Spinner />}

        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                dataLength={data?.results?.length || []}
                next={fetchData}
                hasMore={page <= data?.total_pages}
                loader={<Spinner />}
              >
                <div className={styles.grid}>
                  {data?.results?.map((item) => (
                    <Poster
                      key={item?.id}
                      item={item}
                      endpoint={mediaType}
                      showRatings={true}
                      showGenres={true}
                    />
                  ))}
                </div>
              </InfiniteScroll>
            ) : (
              <h2>Sorry No Results Found</h2>
            )}
          </>
        )}
      </Container>
    </div>
  );
};
