import styled from "styled-components";
import Slider from "../Components/Slider/Slider";
import Banner from "../Components/Banner";
import { useRecoilValue } from "recoil";
import { isModalState, loadingState } from "../recoil/atom";
import { useVideoQuery } from "../hooks/useVideoQuery";
import Modal from "../Components/Modal/Modal";

function Home() {
  const isLoading = useRecoilValue(loadingState);
  const isModal = useRecoilValue(isModalState);
  const { data: nowPlayingMovies } = useVideoQuery("movie", "now_playing");
  const { data: popularMovies } = useVideoQuery("movie", "popular");
  const { data: upcomingMovies } = useVideoQuery("movie", "upcoming");
  const { data: topRatedMovies } = useVideoQuery("movie", "top_rated");
  const { data: trendingMovies } = useVideoQuery("movie", "trending");

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {nowPlayingMovies && (
            <Banner data={nowPlayingMovies.results[0]} field="movies" />
          )}
          <Sliders>
            <Slider
              data={trendingMovies}
              title="오늘의 Top10"
              listType="trending"
              field="movies"
            />
            <Slider
              data={popularMovies}
              title="인기 영화"
              listType="popular"
              field="movies"
            />
            <Slider
              data={topRatedMovies}
              title="평점 높은 영화"
              listType="topRated"
              field="movies"
            />
            <Slider
              data={nowPlayingMovies}
              title="현재 상영 중인 영화"
              listType="nowPlaying"
              field="movies"
            />
            <Slider
              data={upcomingMovies}
              title=" 개봉 예정 영화"
              listType="upComing"
              field="movies"
            />
          </Sliders>
          {isModal && <Modal />}
        </>
      )}
    </Wrapper>
  );
}

export default Home;

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
  gap: 11rem;
  position: relative;
  top: -120px;
  z-index: 0;
`;
