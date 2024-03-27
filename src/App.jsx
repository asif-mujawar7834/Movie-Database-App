import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { fetchDataFromAPI } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import {
  fetchAPIConfiguration,
  getAllGenres,
} from "./Redux/Actions/HomeActions";
import { Header } from "./Components/Header/Header";
import { Details } from "./Pages/Details/Details";
import { Footer } from "./Components/Footer/Footer";
import { SearchResults } from "./Components/SearchResults/SearchResults";
import { Explore } from "./Pages/Explore/Explore";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchDataFromAPI("/configuration")
      .then((res) => {
        const url = {
          backdrop: res?.images?.secure_base_url + "original",
          poster: res?.images?.secure_base_url + "original",
          profile: res?.images?.secure_base_url + "original",
        };
        dispatch(fetchAPIConfiguration(url));
      })
      .catch((err) => {});

    const getAllGeneres = async () => {
      const allGenre = {};
      try {
        const data = await Promise.all([
          fetchDataFromAPI("/genre/movie/list"),
          fetchDataFromAPI("/genre/tv/list"),
        ]);
        data?.map(({ genres }) => {
          return genres?.map((item) => (allGenre[item?.id] = item));
        });
        dispatch(getAllGenres(allGenre));
      } catch (e) {}
    };
    getAllGeneres();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
