import { useQuery } from "@tanstack/react-query";
import {
  getNowPlayingMovies,
  getPopularMovies,
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
  height: 20vh;
  text-align: center;
  color: white;
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
    getPopularMovies
  );

  const { data: upcomingMovies } = useQuery<IGetDataResult>(
    ["movies", "upcoming"],
    getUpcomingMovies
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>loading</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={nowPlayingMovies?.results[0]?.backdrop_path || "undefined"}
            title={nowPlayingMovies?.results[0]?.title! || "undefined"}
            overview={nowPlayingMovies?.results[0]?.overview! || "undefined"}
          />
          <Sliders>
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
            <Slider
              data={popularMovies}
              title="인기 영화"
              listType="Popular"
              field="movies"
            />
          </Sliders>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
