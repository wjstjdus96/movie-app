import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { IGetDataResult } from "../api";
import { useState } from "react";
import { makeImagePath } from "../utils";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";
import Modal from "./Modal";

const Wrapper = styled.div`
  margin: 0px 50px;
  position: relative;
  h2 {
    font-size: 28px;
    margin-bottom: 20px;
  }
`;

const Arrow = styled(motion.div)`
  font-size: 20px;
  width: 50px;
  height: 50px;
  background-color: rgb(0, 0, 0, 0.8);
  border-radius: 50%;
  position: absolute;
  transform: translateY(85%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  opacity: 0.5;

  &:hover {
    opacity: 1;
    cursor: pointer;
    font-weight: 600;
  }
  &:first-child {
    left: -30px;
  }
  &:last-child {
    right: -30px;
  }
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  width: 227px;
  height: 128px;
  min-height: 100%;
  background-image: url(${(prop) => prop.bgPhoto});
  border-radius: 5px;
  background-size: cover;
  background-position: center center;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 5px;
  border-radius: 0 0 5px 5px;
  background-color: ${(props) => props.theme.modal.background};
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 12px;
  }
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
      duration: 0.2,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    backgroundcolor: "rgba(0,0,0,1)",
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: "tween",
    },
  },
};

interface ISlider {
  data?: IGetDataResult;
  title: string;
  listType: string;
  field: string;
}

export default function Slider({ data, title, listType, field }: ISlider) {
  const [idx, setIdx] = useState(0); // 슬라이더 인덱스
  const [leaving, setLeaving] = useState(false); // 슬라이더 진행 중인지
  const [isBack, setIsBack] = useState(false);
  const offset = 6;
  const navigate = useNavigate();
  const bigMovieMatch = useMatch(`/movies/:listType/:movieId`);
  const toggleLeaving = () => setLeaving((prev) => !prev);

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

  const onBoxClicked = async (movieId: number, listType: string) => {
    await navigate(`/movies/${listType}/${movieId}`);
  };

  return (
    <div>
      <Wrapper>
        <h2>{title}</h2>
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
                  layoutId={movie.id + listType}
                  variants={boxVariants}
                  whileHover="hover"
                  initial="normal"
                  transition={{ type: "tween" }}
                  key={movie.id}
                  bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                  onClick={() => onBoxClicked(movie.id, listType)}
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
      </Wrapper>{" "}
      <AnimatePresence>
        {bigMovieMatch ? (
          <Modal
            dataId={bigMovieMatch.params.movieId!}
            listType={bigMovieMatch.params.listType!}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
