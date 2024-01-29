import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import SliderBox from "./SliderBox";
import { ISlider } from "../../types/component";
import { SliderPages } from "./SliderPages";
import { SliderArrow } from "./SliderArrow";
import { IData } from "../../types/data";
import { SliderTitle } from "./SliderTitle";
import { NumberSliderBox } from "./NumberSliderBox";
import { useSliderSize } from "../../hooks/useSliderSize";

export default function Slider({ data, title, listType, field }: ISlider) {
  const [idx, setIdx] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [offset, setOffset] = useState(6);
  const { sliderSize } = useSliderSize();

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const changeIndex = (isBack: boolean) => {
    if (data && !leaving) {
      const length =
        listType === "trending"
          ? data.results!.slice(0, 13).length
          : data.results!.length;

      toggleLeaving();
      setIsBack(!isBack);
      const totalMovies = length - 1;
      const maxIdx = Math.floor(totalMovies / offset) - 1;
      const minIdx = 0;
      isBack
        ? setIdx((prev) => (prev === maxIdx ? 0 : prev + 1))
        : setIdx((prev) =>
            prev === minIdx ? Math.floor(totalMovies / offset) - 1 : prev - 1
          );
    }
  };

  useEffect(() => {
    const sliderItemNum = Math.round(window.innerWidth / 250);

    const updateSlider = () => {
      setOffset(sliderItemNum);
    };

    updateSlider();
  }, [sliderSize]);

  return (
    <Wrapper
      isTrending={listType === "trending"}
      initial="hidden"
      whileHover="hover"
      exit="exit"
    >
      {data && (
        <div>
          <SliderTitle title={title} />
          <SliderPages
            maxIndex={
              listType === "trending"
                ? Math.round(data.results.slice(0, 13).length / offset) - 1
                : Math.round(data.results.length / offset) - 1
            }
            index={idx}
          />
        </div>
      )}
      <AnimatePresence
        custom={isBack}
        initial={false}
        onExitComplete={toggleLeaving}
      >
        <Row
          custom={isBack}
          initial="invisible"
          animate="visible"
          whileHover="hover"
          variants={rowVariants}
          exit="exit"
          transition={{ type: "tween" }}
          key={idx}
        >
          <SliderArrow onChangeIndex={changeIndex} isLeft={true} />
          <SlideItems>
            {listType !== "trending"
              ? data?.results
                  .slice(1)
                  .slice(offset * idx, offset * idx + offset)
                  .map((data: IData, idx: number) => (
                    <SliderBox
                      key={idx}
                      data={data}
                      field={field}
                      listType={listType}
                    />
                  ))
              : data?.results
                  .slice(0, 12)
                  .slice(offset * idx, offset * idx + offset)
                  .map((data: IData, num: number) => (
                    <NumberSliderBox
                      key={idx}
                      number={offset * idx + num + 1}
                      data={data}
                      field={field}
                      listType={listType}
                    />
                  ))}
          </SlideItems>
          <SliderArrow onChangeIndex={changeIndex} isLeft={false} />
        </Row>
      </AnimatePresence>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)<{ isTrending?: boolean }>`
  margin: 0px 50px;
  position: relative;
  margin: ${(props) => (props.isTrending ? "0 50px 1rem" : "0px 50px")};

  @media all and (max-width: 767px) {
    margin: ${(props) => (props.isTrending ? "0 20px 1rem" : "0px 20px")};
  }
`;

const Row = styled(motion.div)`
  display: flex;
  position: absolute;
  z-index: 0;
  width: 100%;
`;

const SlideItems = styled.div`
  display: flex;
  gap: 10px;
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
