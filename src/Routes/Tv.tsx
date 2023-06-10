import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getonTheAirTvs, getPopularTvs, IGetDataResult } from "../api";
import Banner from "../Components/Banner";
import Slider from "../Components/Slider/Slider";

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
  const { data: popularTvs, isLoading } = useQuery<IGetDataResult>(
    ["tvs", "popular"],
    getPopularTvs
  );

  const { data: onTheAirTvs } = useQuery<IGetDataResult>(
    ["tvs", "onTheAir"],
    getonTheAirTvs
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={popularTvs?.results[0]?.backdrop_path || "undefined"}
            title={popularTvs?.results[0]?.name! || "undefined"}
            overview={popularTvs?.results[0]?.overview! || "undefined"}
          />
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
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
