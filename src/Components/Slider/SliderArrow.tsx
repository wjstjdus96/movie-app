import { motion } from "framer-motion";
import styled from "styled-components";
import { ISliderArrow } from "../../types/component";

const ArrowWrapper = styled(motion.div)`
  z-index: 0;
  > div {
    position: absolute;
    top: 53px;
  }
  > :first-child {
    left: -35px;
    border-radius: 10px 0 0 10px;
  }
  > :last-child {
    right: -35px;
    border-radius: 0 10px 10px 0;
  }
`;

const Arrow = styled(motion.div)`
  font-size: 20px;
  color: ${(props) => props.theme.white.lighter};
  width: 35px;
  height: 128px;
  background-color: rgba(119, 119, 119, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    font-weight: 600;
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

export function SliderArrow({ onChangeIndex }: ISliderArrow) {
  return (
    <ArrowWrapper variants={arrowWrapperVariants}>
      <Arrow
        variants={arrowVariants}
        whileHover="hoverOnArrow"
        onClick={() => onChangeIndex(false)}
      >
        &lt;
      </Arrow>
      <Arrow
        variants={arrowVariants}
        whileHover="hoverOnArrow"
        onClick={() => onChangeIndex(true)}
      >
        &gt;
      </Arrow>
    </ArrowWrapper>
  );
}
