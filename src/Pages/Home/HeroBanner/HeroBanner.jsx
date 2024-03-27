import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import style from "./HeroBanner.module.css";
import font from "../../../fonts.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const HeroBanner = () => {
  const { data, error, loading } = useFetch("/movie/upcoming");
  const [background, setBackground] = useState(null);
  const { url } = useSelector((state) => state?.homeSlice);
  const navigate = useNavigate();
  const inputRef = useRef();
  useEffect(() => {
    if (data && url) {
      const randomNumber = Math.floor(Math.random() * 20);
      const bg = url.backdrop + data.results[randomNumber]?.backdrop_path;
      setBackground(bg);
    }
  }, [data, url]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${inputRef.current.value}`);
  };

  return (
    <div
      className={style.banner}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className={style.banner__overlay}></div>
      <div className={style.banner__contents}>
        <h1 className={`${style.banner__title} ${font.roboto__bold}`}>
          Movie Database App
        </h1>
        <p className={`${style.banner__paragraph} ${font.roboto__medium}`}>
          Welcome to our movie database app. Search for your favorite movies and
          discover new ones.
        </p>
        <div
          className={`${style.banner__input__container} ${font.roboto__medium}`}
        >
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search for a movie..."
              className={style.banner__search}
              ref={inputRef}
            />
            <button
              className={`${style.banner__button} ${font.roboto__bold}`}
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className={style.banner__faded__effect}></div>
    </div>
  );
};
