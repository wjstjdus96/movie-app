import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import styled from "styled-components";
import { getImages } from "../../apis/api";
import { ISliderBox } from "../../types/component";
import { IGetImage } from "../../types/data";
import { makeImagePath } from "../../utils/makePath";
import { SliderBoxInfo } from "./SliderBoxInfo";
import { SliderBoxLogo } from "./SliderLogo";
import { useMediaQuery } from "react-responsive";
import { useOpenSliderModal } from "../../hooks/useOpenSliderModal";

function SliderBox({
  field,
  data,
  listType,
  keyword,
  isTotalType,
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
        <Box
          onClick={isMobile ? onOpenSliderModal : undefined}
          key={data.id}
          layoutId={listType + data.id}
          variants={boxVariants}
          whileHover="hover"
          initial="normal"
          transition={{ type: "tween" }}
          bgPhoto={makeImagePath(imageData?.backdrops[0]?.file_path!, "w500")}
        >
          <SliderBoxLogo
            logo={imageData.logos[0]?.file_path}
            title={
              data.original_title ? data.original_title : data.original_name
            }
          />
          <SliderBoxInfo {...boxInfoProps} onClickDetail={onOpenSliderModal} />
        </Box>
      ) : (
        <SkeletonBox />
      )}
    </>
  );
}
export default SliderBox;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  width: 100%;
  height: 128px;
  min-height: 100%;
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

const SkeletonBox = styled.div`
  width: 100%;
  height: 128px;
  border-radius: 5px;
  background-color: lightgray;
`;
