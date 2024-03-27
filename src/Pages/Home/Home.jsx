import { useState } from "react";
import { CarouselWithHeading } from "../../Components/CarouselWithHeading/CarouselWithHeading";
import { HeroBanner } from "./HeroBanner/HeroBanner";
import { Trending } from "../../Components/Trending/Trending";
import { Popular } from "../../Components/Popuplar/Popular";
import { TopRated } from "../../Components/TopRated/TopRated";
export const Home = () => {
  const [endpoints, setEndpoints] = useState({
    trending: "day",
  });

  const handleEndPointChange = (endpoint, value) => {
    setEndpoints((prevState) => ({
      ...prevState,
      [endpoint]: value,
    }));
  };

  console.log(endpoints.trending);

  return (
    <div>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};
