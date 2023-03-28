import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getNowPlayingTvs, getPopularTvs, IGetDataResult } from "../api";
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

function Tv() {
  // const { data: nowPlayingTvs, isLoading } = useQuery<IGetDataResult>(
  //   ["tvs", "nowPlaying"],
  //   getNowPlayingTvs
  // );

  const { data: popularTvs, isLoading } = useQuery<IGetDataResult>(
    ["tvs", "popular"],
    getPopularTvs
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>loading</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={popularTvs?.results[0]?.backdrop_path || "undefined"}
            title={popularTvs?.results[0]?.name! || "undefined"}
            overview={popularTvs?.results[0]?.overview! || "undefined"}
          />
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
