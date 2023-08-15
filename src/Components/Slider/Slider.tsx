import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useMatch } from "react-router-dom";
import SliderBox from "./SliderBox";
import { ISlider } from "../../types/component";
import { SliderPages } from "./SliderPages";
import { SliderArrow } from "./SliderArrow";
import { useRecoilValue } from "recoil";
import { isModalState } from "../../recoil/atom";

const Wrapper = styled(motion.div)`
  margin: 0px 50px;
  position: relative;
  h2 {
    color: ${(props) => props.theme.white.lighter};
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
  const offset = 6;
  const isModal = useRecoilValue(isModalState);

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const bigMovieMatch = useMatch(`/:field/:dataId`);

  const changeIndex = (isBack: boolean) => {
    if (data && !leaving) {
      toggleLeaving();
      setIsBack(!isBack);
      const totalMovies = data.results!.length - 1;
      const maxIdx = Math.floor(totalMovies / offset) - 1;
      const minIdx = 0;
      isBack
        ? setIdx((prev) => (prev === maxIdx ? 0 : prev + 1))
        : setIdx((prev) =>
            prev === minIdx ? Math.floor(totalMovies / offset) - 1 : prev - 1
          );
    }
  };

  return (
    <div>
      <Wrapper initial="hidden" whileHover="hover" exit="exit">
        {data && (
          <>
            <div>
              <h2>{title}</h2>
              <SliderPages
                title={title}
                maxIndex={data.results.length}
                index={idx}
              />
            </div>
            <SliderArrow onChangeIndex={changeIndex} />
          </>
        )}
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
              .map((data, idx) => (
                <SliderBox
                  key={idx}
                  data={data}
                  field={field}
                  listType={listType}
                />
              ))}
          </Row>
        </AnimatePresence>
      </Wrapper>
    </div>
  );
}
