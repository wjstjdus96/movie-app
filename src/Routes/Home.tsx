import { useQuery } from "@tanstack/react-query";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  IGetDataResult,
} from "../api";
import styled from "styled-components";
import Slider from "../Components/Slider";
import Banner from "../Components/Banner";

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 50px;
`;

const Loader = styled.div`
  color: white;
  position: fixed;
  left: 50%;
  margin: 0 auto;
  top: 50%;
  transform: translateX(-50%);
`;

const Sliders = styled.div`
  display: flex;
  flex-direction: column;
  gap: 180px;
  position: relative;
  top: -150px;
`;

function Home() {
  const { data: nowPlayingMovies, isLoading } = useQuery<IGetDataResult>(
    ["movies", "nowPlaying"],
    getNowPlayingMovies
  );

  const { data: popularMovies } = useQuery<IGetDataResult>(
    ["movies", "popular"],
    getTopRatedMovies
  );

  const { data: upcomingMovies } = useQuery<IGetDataResult>(
    ["movies", "upcoming"],
    getUpcomingMovies
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={nowPlayingMovies?.results[0]?.backdrop_path || "undefined"}
            title={nowPlayingMovies?.results[0]?.title! || "undefined"}
            overview={nowPlayingMovies?.results[0]?.overview! || "undefined"}
          />
          <Sliders>
            <Slider
              data={popularMovies}
              title="인기 영화"
              listType="Popular"
              field="movies"
            />
            <Slider
              data={nowPlayingMovies}
              title="현재 상영 중"
              listType="NowPlaying"
              field="movies"
            />
            <Slider
              data={upcomingMovies}
              title=" 개봉 예정 영화"
              listType="UpComing"
              field="movies"
            />
          </Sliders>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
