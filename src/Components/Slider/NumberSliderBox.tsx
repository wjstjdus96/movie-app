import styled from "styled-components";
import { ISliderBox } from "../../types/component";
import { motion } from "framer-motion";
import { makePosterPath } from "../../utils/makePath";

export function NumberSliderBox({
  field,
  data,
  listType,
  keyword,
  isTotalType,
  number,
}: ISliderBox) {
  const boxInfoProps = { field, data, listType, keyword, isTotalType };

  return (
    <Wrapper
      key={data.id}
      layoutId={listType + data.id}
      variants={boxVariants}
      whileHover="hover"
      initial="normal"
      transition={{ type: "tween" }}
    >
      <Number isBiggerThanTen={number! >= 10}>
        <div>{number}</div>
      </Number>
      <PosterImage src={makePosterPath(data.poster_path, "w500")} />
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  width: 227px;
  min-height: 100%;
  display: flex;
  justify-content: space-between;
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    zIndex: 1,
    borderRadius: "5px 5px 0px 0px",
    transition: {
      delay: 0.5,
      duration: 0.2,
      type: "tween",
    },
  },
};

const Number = styled.div<{ isBiggerThanTen?: boolean }>`
  position: relative;
  width: 50%;
  height: 100%;
  font-size: ${(props) => (props.isBiggerThanTen ? "9rem" : "14rem")};
  letter-spacing: -12px;
  -webkit-text-stroke: 4px ${(props) => props.theme.gray.normal};
  color: black;
  font-weight: 900;
  & > div {
    margin: 0;
    position: absolute;
    right: -1.5rem;
    z-index: 0;
    bottom: ${(props) => (props.isBiggerThanTen ? "0" : "-2rem")};
  }
`;

const PosterImage = styled.img`
  justify-self: end;
  align-self: flex-start;
  width: 50%;
  z-index: 1;
`;
