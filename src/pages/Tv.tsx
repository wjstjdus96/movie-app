import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Banner from "../Components/Banner";
import Slider from "../Components/Slider/Slider";
import { IGetDataResult } from "../types/data";
import { useVideoQuery } from "../hooks/useVideoQuery";
import { useState } from "react";

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
  const [isLoading] = useState(false);
  const { data: popularTvs } = useVideoQuery("tv", "top_rated");
  const { data: onTheAirTvs } = useVideoQuery("tv", "on_the_air");

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            id={popularTvs?.results[0].id!}
            field="tvs"
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
