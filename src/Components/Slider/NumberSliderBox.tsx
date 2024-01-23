import styled from "styled-components";
import { ISliderBox } from "../../types/component";
import { motion } from "framer-motion";
import { makeImagePath, makePosterPath } from "../../utils/makePath";
import { useQuery } from "@tanstack/react-query";
import { getImages } from "../../apis/api";
import { IGetImage } from "../../types/data";
import { SliderBoxInfo } from "./SliderBoxInfo";
import { SliderBoxLogo } from "./SliderLogo";

export function NumberSliderBox({
  field,
  data,
  listType,
  keyword,
  isTotalType,
  number,
}: ISliderBox) {
  const boxInfoProps = { field, data, listType, keyword, isTotalType };
  const { data: imageData } = useQuery<IGetImage>(["images", data.id], () =>
    getImages(field.slice(0, -1), data.id)
  );

  return (
    <>
      {imageData ? (
        <Wrapper
          key={data.id}
          layoutId={listType + data.id}
          whileHover="hover"
          initial="normal"
          variants={boxVariants}
          transition={{ type: "tween" }}
        >
          <DefaultPosterBox variants={defaultBoxVariants}>
            <Number isBiggerThanTen={number! >= 10}>
              <div>{number}</div>
            </Number>
            <PosterImage src={makePosterPath(data.poster_path, "w500")} />
          </DefaultPosterBox>
          <HoverBox
            variants={hoverBoxVariants}
            bgPhoto={makeImagePath(imageData?.backdrops[0]?.file_path!, "w500")}
          >
            <SliderBoxLogo
              logo={imageData.logos[0]?.file_path}
              title={
                data.original_title ? data.original_title : data.original_name
              }
            />
          </HoverBox>
          <SliderBoxInfo {...boxInfoProps} />
        </Wrapper>
      ) : (
        <SkeletonBox />
      )}
    </>
  );
}

const Wrapper = styled(motion.div)`
  width: 227px;
  min-height: 100%;
`;

const DefaultPosterBox = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Number = styled.div<{ isBiggerThanTen?: boolean }>`
  position: relative;
  width: 50%;
  height: 100%;
  & > div {
    margin: 0;
    position: absolute;
    right: -1.5rem;
    font-size: ${(props) => (props.isBiggerThanTen ? "9rem" : "14rem")};
    letter-spacing: -12px;
    -webkit-text-stroke: 4px ${(props) => props.theme.gray.normal};
    color: black;
    font-weight: 900;
    z-index: 0;
    bottom: ${(props) => (props.isBiggerThanTen ? "0" : "-2rem")};
  }
`;

const PosterImage = styled.img`
  width: 50%;
  z-index: 1;
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

const defaultBoxVariants = {
  normal: {
    display: "flex",
  },
  hover: {
    display: "none",
    transition: {
      delay: 0.5,
      duration: 0.2,
      type: "tween",
    },
  },
};

const hoverBoxVariants = {
  normal: {
    display: "none",
  },
  hover: {
    display: "block",
    transition: {
      delay: 0.5,
      duration: 0.2,
      type: "tween",
    },
  },
};

const HoverBox = styled(motion.div)<{ bgPhoto: string }>`
  display: none;
  width: 227px;
  height: 128px;
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
  & > div {
    position: relative;
    width: 100%;
    height: 100%;
  }
`;

const SkeletonBox = styled.div`
  width: 227px;
  height: 10.7rem;
  border-radius: 5px;
  background-color: lightgray;
`;
