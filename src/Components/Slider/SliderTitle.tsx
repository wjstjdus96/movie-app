import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import { IoIosArrowForward } from "react-icons/io";

export interface ISliderTitle {
  title: string;
}

export function SliderTitle({ title }: ISliderTitle) {
  return (
    <Wrapper>
      <h2>{title}</h2>
      <MoreArrow variants={titleArrowVariants}>
        <div>
          <div className="showMorePhrase"> 모두 보기</div>
        </div>
        <IoIosArrowForward size={20} />
      </MoreArrow>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
  h2 {
    color: ${(props) => props.theme.white.lighter};
    @media all and (max-width: 767px) {
      font-size: 15px;
    }

    @media all and (min-width: 768px) and (max-width: 1200px) {
      font-size: 20px;
    }

    @media all and (min-width: 1201px) {
      font-size: 25px;
    }
  }
`;

const showMoreAnimation = keyframes`
    from{
        left: -30%;
    }
    to{
       left: 0;
    }
`;

const MoreArrow = styled(motion.div)`
  display: flex;
  align-self: flex-end;
  align-items: center;
  @media all and (max-width: 767px) {
    margin-bottom: -1px;
  }

  @media all and (min-width: 768px) and (max-width: 1200px) {
    margin-bottom: 0;
  }

  @media all and (min-width: 1201px) {
    margin-bottom: 3px;
  }
  & > div {
    @media all and (max-width: 767px) {
      font-size: 10px;
      width: 40px;
      height: 13px;
    }

    @media all and (min-width: 768px) and (max-width: 1200px) {
      font-size: 12px;
      width: 50px;
      height: 16px;
    }

    @media all and (min-width: 1201px) {
      font-size: 14px;
      width: 60px;
      height: 20px;
    }
    display: none;
    position: relative;
    & > div {
      position: absolute;
    }
  }

  &:hover {
    color: skyblue;
    font-weight: 700;
    & > div {
      display: block;
      & > div {
        animation: ${showMoreAnimation} 0.5s linear forwards;
      }
    }
  }
`;

const titleArrowVariants = {
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
