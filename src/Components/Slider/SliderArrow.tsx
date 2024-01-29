import { motion } from "framer-motion";
import styled from "styled-components";
import { ISliderArrow } from "../../types/component";

export function SliderArrow({ onChangeIndex, isLeft }: ISliderArrow) {
  return (
    <ArrowWrapper variants={arrowWrapperVariants} isLeft={isLeft}>
      <Arrow
        variants={arrowVariants}
        whileHover="hoverOnArrow"
        onClick={() => onChangeIndex(!isLeft)}
      >
        {isLeft ? <>&lt;</> : <> &gt;</>}
      </Arrow>
    </ArrowWrapper>
  );
}

const ArrowWrapper = styled(motion.div)<{ isLeft: boolean }>`
  position: relative;
  z-index: 0;
  > div {
    position: absolute;
    border-radius: ${(props) =>
      props.isLeft ? "10px 0 0 10px" : "0 10px 10px 0"};
    left: ${(props) => props.isLeft && "-35px"};
    @media all and (max-width: 767px) {
      left: ${(props) => props.isLeft && "-20px"};
    }
  }
`;

const Arrow = styled(motion.div)`
  font-size: 20px;
  color: ${(props) => props.theme.white.lighter};
  width: 35px;
  height: 100%;
  background-color: rgba(119, 119, 119, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    font-weight: 600;
  }
  @media all and (max-width: 767px) {
    width: 20px;
  }
`;

const arrowWrapperVariants = {
  hidden: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0,
    },
  },
};

const arrowVariants = {
  hoverOnArrow: {
    fontSize: "25px",
    backgroundColor: "rgba(119, 119, 119, 0.8)",
    transition: {
      duration: 0.2,
      type: "tween",
    },
  },
};
