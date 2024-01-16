import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import styled from "styled-components";
import { getImages } from "../../apis/api";
import { ISliderBox } from "../../types/component";
import { IGetImage } from "../../types/data";
import { makeImagePath } from "../../utils/makePath";
import { SliderBoxInfo } from "./SliderBoxInfo";

function SliderBox({
  field,
  data,
  listType,
  keyword,
  isTotalType,
}: ISliderBox) {
  const boxInfoProps = { field, data, listType, keyword, isTotalType };
  const { data: imageData, isLoading: imageLoading } = useQuery<IGetImage>(
    ["images", data.id],
    () => getImages(field.slice(0, -1), data.id)
  );

  return (
    <>
      {imageData ? (
        <Box
          key={data.id}
          layoutId={listType + data.id}
          variants={boxVariants}
          whileHover="hover"
          initial="normal"
          transition={{ type: "tween" }}
          bgPhoto={makeImagePath(imageData?.backdrops[0]?.file_path!, "w500")}
        >
          <div>
            {imageData.logos[0]?.file_path != undefined ? (
              <Logo
                bgPhoto={makeImagePath(imageData?.logos[0].file_path!, "w500")}
              />
            ) : (
              <TextLogo
                length={
                  data.original_title
                    ? data.original_title.length
                    : data.original_name.length
                }
              >
                {data.original_title ? data.original_title : data.original_name}
              </TextLogo>
            )}
          </div>
          <SliderBoxInfo
            {...boxInfoProps}
            logoImage={imageData.logos[0]?.file_path!}
          />
        </Box>
      ) : (
        <SkeletonBox />
      )}
    </>
  );
}
export default SliderBox;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  width: 227px;
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

const Logo = styled.img<{ bgPhoto: string }>`
  position: absolute;
  bottom: 10px;
  left: 20px;
  background-size: cover;
  max-width: 70%;
  max-height: 70%;
  content: url(${(prop) => prop.bgPhoto});
`;

const TextLogo = styled.h2<{ length: number }>`
  margin: 0 !important;
  display: flex;
  position: absolute;
  font-family: "Oswald, sans-serif";
  left: 20px;
  bottom: 10px;
  font-size: ${(props) => (props.length > 10 ? "18px" : "25px")} !important;
  width: 80%;
  font-weight: 900;
  text-align: center;
  color: white;
  text-shadow: 1px 1px #558abb;
  align-items: flex-end;
  margin: 0;
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
  width: 227px;
  height: 128px;
  border-radius: 5px;
  background-color: lightgray;
`;
