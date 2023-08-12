import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { makeImagePath } from "../../utils/makePath";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";
import Modal from "../Modal/Modal";
import SliderBox from "./SliderBox";
import { IGetDataResult } from "../../types/data";
import { ISlider } from "../../types/component";
import { SliderPages } from "./SliderPages";

const Wrapper = styled(motion.div)`
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

export default function Slider({ data, title, listType, field }: ISlider) {
  const [idx, setIdx] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const offset = 6;
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const bigMovieMatch = useMatch(`/:field/:dataId`);

  const changeIndex = async (isIncrease: boolean) => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      await setIsBack(!isIncrease);
      const totalMovies = data.results!.length - 1;
      const maxIdx = Math.floor(totalMovies / offset) - 1;
      const minIdx = 0;
      if (isIncrease == true) {
        setIdx((prev) => (prev === maxIdx ? 0 : prev + 1));
      } else {
        setIdx((prev) =>
          prev === minIdx ? Math.floor(totalMovies / offset) - 1 : prev - 1
        );
      }
      console.log(idx);
    }
  };

  return (
    <div>
      <Wrapper initial="hidden" whileHover="hover" exit="exit">
        {data && (
          <div>
            <h2>{title}</h2>
            <SliderPages
              title={title}
              maxIndex={data.results.length}
              index={idx}
            />
          </div>
        )}
        <div>
          <Arrow onClick={() => changeIndex(false)}>&lt;</Arrow>
          <Arrow onClick={() => changeIndex(true)}>&gt;</Arrow>
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
              .map((data) => (
                <SliderBox data={data} field={field} />
              ))}
          </Row>
        </AnimatePresence>
      </Wrapper>
      <AnimatePresence>
        {bigMovieMatch ? (
          <Modal
            key={bigMovieMatch.params.dataId! + listType}
            dataId={bigMovieMatch.params.dataId!}
            listType={listType}
            field={bigMovieMatch.params.field!}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
