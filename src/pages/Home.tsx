import styled from "styled-components";
import Slider from "../Components/Slider/Slider";
import Banner from "../Components/Banner";
import { useRecoilValue } from "recoil";
import { isModalState, loadingState } from "../recoil/atom";
import { useVideoQuery } from "../hooks/useVideoQuery";
import Modal from "../Components/Modal/Modal";

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
  const isLoading = useRecoilValue(loadingState);
  const isModal = useRecoilValue(isModalState);
  const { data: nowPlayingMovies } = useVideoQuery("movie", "now_playing");
  const { data: popularMovies } = useVideoQuery("movie", "popular");
  const { data: upcomingMovies } = useVideoQuery("movie", "upcoming");

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
          {isModal && <Modal />}
        </>
      )}
    </Wrapper>
  );
}

export default Home;
