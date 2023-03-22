import { useQuery } from "@tanstack/react-query";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getUpcomingMovies,
  IGetDataResult,
} from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";
import Slider from "../Components/Slider";

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 50px;
`;

const Loader = styled.div`
  height: 20vh;
  text-align: center;
  color: white;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(prop) => prop.bgPhoto});
  background-size: cover;
  & > h2 {
    font-size: 48px;
    margin-bottom: 20px;
  }
  & > p {
    font-size: 18px;
    width: 50%;
    line-height: 150%;
  }
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
            bgPhoto={makeImagePath(
              nowPlayingMovies?.results[0].backdrop_path || ""
            )}
          >
            <h2>{nowPlayingMovies?.results[0].title}</h2>
            <p>{nowPlayingMovies?.results[0].overview}</p>
          </Banner>
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
