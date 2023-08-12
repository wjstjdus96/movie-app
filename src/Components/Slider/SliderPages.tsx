import { motion } from "framer-motion";
import { IPaginationProps, ISliderPages } from "../../types/component";
import styled from "styled-components";

const Pagination = styled(motion.div)<IPaginationProps>`
  opacity: 0;
  margin-right: 2rem;
  display: grid;
  position: absolute;
  right: 0;
  top: 20px;
  z-index: 0;
  grid-template-columns: repeat(${(props) => props.maxIndex + 1}, 1fr);
  grid-gap: 2px;
  > div {
    height: 3px;
    width: 20px;
    background-color: ${(props) => props.theme.white.darker};
  }
  > div:nth-child(${(props) => props.curIndex + 1}) {
    background-color: ${(props) => props.theme.white.lighter};
  }
`;

const paginationVariants = {
  hidden: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.6,
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

export function SliderPages({ maxIndex, index, title }: ISliderPages) {
  console.log(title + "  " + index);
  return (
    <Pagination
      maxIndex={maxIndex}
      curIndex={index}
      variants={paginationVariants}
    >
      {Array(maxIndex + 1)
        .fill(0)
        .map((_, idx) => (
          <motion.div key={idx}></motion.div>
        ))}
    </Pagination>
  );
}
