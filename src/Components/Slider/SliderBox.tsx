import { useQuery } from "@tanstack/react-query";
import { getImages } from "../../api";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { makeImagePath } from "../../utils/makePath";
import { useNavigate } from "react-router-dom";

const Box = styled(motion.div)<{ bgPhoto: string }>`
  position: relative;
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
`;

const Logo = styled.img<{ bgPhoto: string }>`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-size: cover;
  max-width: 70%;
  max-height: 70%;
  content: url(${(prop) => prop.bgPhoto});
`;

const TextLogo = styled.h2<{ length: number }>`
  display: flex;
  position: absolute;
  font-family: "Oswald, sans-serif";
  left: 10px;
  bottom: -10px;
  font-size: ${(props) => (props.length > 10 ? "20px" : "28px")} !important;
  width: 80%;
  font-weight: 900;
  text-align: center;
  color: white;
  text-shadow: 2px 2px #558abb;
  align-items: flex-end;
  margin: 0;
`;

const Info = styled(motion.div)`
  padding: 5px;
  border-radius: 0 0 5px 5px;
  background-color: ${(props) => props.theme.modal.background};
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 12px;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duration: 0.2,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    backgroundcolor: "rgba(0,0,0,1)",
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: "tween",
    },
  },
};

interface IImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

interface IGetImage {
  backdrops: IImage[];
  id: number;
  logos: IImage[];
  posters: IImage[];
}
interface ISliderBox {
  field: string;
  data: any;
}

function SliderBox({ field, data }: ISliderBox) {
  const navigate = useNavigate();
  const { data: imageData, isLoading: imageLoading } = useQuery<IGetImage>(
    ["images", data.id],
    () => getImages(field.slice(0, -1), data.id)
  );
  console.log(data);
  const onBoxClicked = (dataId: number, field: string) => {
    navigate(`/${field}/${dataId}`);
  };

  return (
    <>
      {imageData ? (
        <Box
          key={data.id}
          layoutId={data.id + ""}
          variants={boxVariants}
          whileHover="hover"
          initial="normal"
          transition={{ type: "tween" }}
          bgPhoto={makeImagePath(imageData?.backdrops[0].file_path!, "w500")}
          onClick={() => onBoxClicked(data.id, field)}
        >
          {imageData.logos[0]?.file_path != undefined ? (
            <Logo
              bgPhoto={makeImagePath(imageData?.logos[0].file_path!, "w500")}
            />
          ) : (
            <TextLogo length={data.original_title.length}>
              {data.original_title}
            </TextLogo>
          )}

          <Info variants={infoVariants}>
            <h4>
              {data.title && data.title}
              {data.name}
            </h4>
          </Info>
        </Box>
      ) : null}
    </>
  );
}
export default SliderBox;
