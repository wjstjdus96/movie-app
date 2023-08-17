import styled from "styled-components";
import Banner from "../Components/Banner";
import Slider from "../Components/Slider/Slider";
import { useVideoQuery } from "../hooks/useVideoQuery";
import { isModalState, loadingState } from "../recoil/atom";
import { useRecoilValue } from "recoil";
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

function Tv() {
  const isLoading = useRecoilValue(loadingState);
  const isModal = useRecoilValue(isModalState);
  const { data: popularTvs } = useVideoQuery("tv", "top_rated");
  const { data: onTheAirTvs } = useVideoQuery("tv", "on_the_air");

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {popularTvs && <Banner data={popularTvs!.results[0]} field="tvs" />}
          <Sliders>
            <Slider
              data={popularTvs}
              title="인기 티비쇼"
              listType="popular"
              field="tvs"
            />
            <Slider
              data={onTheAirTvs}
              title="방영 중인 티비쇼"
              listType="onTheAir"
              field="tvs"
            />
          </Sliders>
          {isModal && <Modal />}
        </>
      )}
    </Wrapper>
  );
}

export default Tv;