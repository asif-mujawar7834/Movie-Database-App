import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { DetailsBanner } from "./DetailsBanner";
import { Cast } from "../../Components/Cast/Cast";
import { VideoSection } from "../../Components/VideoSection/VideoSection";
import { Similar } from "../../Components/Similar/Similar";
import { Recommendations } from "../../Components/Recommendations/Recommendations";
import { CarouselWithHeading } from "../../Components/CarouselWithHeading/CarouselWithHeading";

export const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  return (
    <div>
      <DetailsBanner
        video={data?.results[0]}
        crew={credits?.crew}
        loading={loading}
      />
      <Cast data={credits?.cast} loading={loading} />
      <VideoSection data={data?.results} loading={loading} />
      <Similar mediaType={mediaType} id={id} endPoint={mediaType} />
      <Recommendations mediaType={mediaType} id={id} endPoint={mediaType} />
    </div>
  );
};
