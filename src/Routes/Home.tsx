import { useQuery } from "@tanstack/react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";
import Detail from "./Detail";

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 200px;
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
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(prop) => prop.bgPhoto});
  background-size: cover;
  & > h2 {
    font-size: 48px;
    margin-bottom: 20px;
  }
  & > p {
    font-size: 20px;
    width: 50%;
  }
`;

const Slider = styled.div`
  margin: 0px 50px;
  position: relative;
  top: -100px;
  h2 {
    font-size: 28px;
    margin-bottom: 20px;
  }
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Arrow = styled(motion.div)`
  font-size: 20px;
  width: 40px;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.8);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  opacity: 1;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
  &:first-child {
    left: 0px;
  }
  &:last-child {
    right: 0px;
  }
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  width: 227px;
  height: 128px;
  min-height: 100%;
  background-image: url(${(prop) => prop.bgPhoto});
  border-radius: 5px;
  background-size: cover;
  background-position: center center;
  /* position: relative;
  z-index: 1; */
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 8px;
  border-radius: 0 0 5px 5px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 13px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: fixed;
  background-color: #211e1e;
  border-radius: 10px;
  width: 45vw;
  height: 90vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

const rowVariants = {
  invisible: (isBack: boolean) => ({
    x: isBack ? -window.outerWidth - 5 : window.outerWidth + 5,
  }),
  visible: {
    x: 0,
  },
  exit: (isBack: boolean) => ({
    x: isBack ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: "tween",
    },
  },
};

const offset = 6;

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  const [idx, setIdx] = useState(0); // 슬라이더 인덱스
  const [leaving, setLeaving] = useState(false); // 슬라이더 진행 중인지
  const [isBack, setIsBack] = useState(false);
  const navigate = useNavigate();
  const bigMovieMatch: PathMatch<string> | null = useMatch("/movies/:movieId");

  const clickedMovie =
    bigMovieMatch &&
    data?.results.find((movie) => movie.id == +bigMovieMatch.params.movieId!); // ! = 항상 있음

  const increaseIndex = async () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      await setIsBack(false);
      const totalMovies = data.results.length - 1;
      const maxIdx = Math.floor(totalMovies / offset) - 1;
      setIdx((prev) => (prev === maxIdx ? 0 : prev + 1));
    }
  };
  const decreaseIndex = async () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      await setIsBack(true);
      const totalMovies = data.results.length - 1;
      const minIdx = 0;
      setIdx((prev) =>
        prev === minIdx ? Math.floor(totalMovies / offset) - 1 : prev - 1
      );
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = async (movieId: number) => {
    console.log(clickedMovie);
    await navigate(`/movies/${movieId}`);
    console.log(clickedMovie);
  };
  const onOverlayClicked = () => {
    console.log(clickedMovie);
    navigate(`/`);
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>loading</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <h2>{data?.results[0].title}</h2>
            <p>{data?.results[0].overview}</p>
          </Banner>
          <Slider>
            <h2>가장 많이 본 영화</h2>
            <div>
              <Arrow onClick={decreaseIndex}>&lt;</Arrow>
              <Arrow onClick={increaseIndex}>&gt;</Arrow>
            </div>
            <AnimatePresence
              custom={isBack}
              initial={false}
              onExitComplete={toggleLeaving}
            >
              <Row
                custom={isBack}
                variants={rowVariants}
                initial="invisible"
                animate="visible"
                exit="exit"
                transition={{ type: "tween" }}
                key={idx}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * idx, offset * idx + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      variants={boxVariants}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                      key={movie.id}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      onClick={() => onBoxClicked(movie.id)}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClicked}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigMovie layoutId={bigMovieMatch.params.movieId}></BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
