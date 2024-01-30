import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { getImages } from "../../apis/api";
import { useOpenSliderModal } from "../../hooks/useOpenSliderModal";
import { ISliderBox } from "../../types/component";
import { IGetImage } from "../../types/data";
import { makeImagePath, makePosterPath } from "../../utils/makePath";
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
  const boxInfoProps = { field, data };
  const { data: imageData } = useQuery<IGetImage>(["images", data.id], () =>
    getImages(field.slice(0, -1), data.id)
  );
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { onOpenSliderModal } = useOpenSliderModal({
    field,
    dataId: data.id,
    listType,
    keyword,
    isTotalType,
  });

  return (
    <>
      {imageData ? (
        <Wrapper
          onClick={isMobile ? onOpenSliderModal : undefined}
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
            <SliderBoxInfo
              {...boxInfoProps}
              onClickDetail={onOpenSliderModal}
            />
          </HoverBox>
        </Wrapper>
      ) : (
        <SkeletonBox />
      )}
    </>
  );
}

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const DefaultPosterBox = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const Number = styled.div<{ isBiggerThanTen?: boolean }>`
  position: relative;
  width: 50%;
  & > div {
    font-size: ${(props) => (props.isBiggerThanTen ? "10rem" : "14rem")};
    @media all and (max-width: 767px) {
      font-size: ${(props) => (props.isBiggerThanTen ? "8rem" : "10rem")};
      letter-spacing: -17px;
    }
    position: absolute;
    top: 40%;
    left: 70%;
    transform: translate(-50%, -50%);
    -webkit-text-stroke: 4px ${(props) => props.theme.gray.normal};
    color: black;
    letter-spacing: -12px;
    font-weight: 900;
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
  width: 100%;
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
  width: 100%;
  height: 10.7rem;
  border-radius: 5px;
  background-color: lightgray;
`;
