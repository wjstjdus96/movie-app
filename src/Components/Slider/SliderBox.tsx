import { useQuery } from "@tanstack/react-query";
import { getImages } from "../../api";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { makeImagePath } from "../../utils/makePath";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaHeart, FaAngleDown } from "react-icons/fa";

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
  display: flex;
  position: absolute;
  font-family: "Oswald, sans-serif";
  left: 20px;
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
  position: absolute;
  padding: 5px;
  border-radius: 0 0 5px 5px;
  background-color: ${(props) => props.theme.modal.background};
  background-color: rgba(0, 0, 0);
  opacity: 0;
  position: absolute;
  width: 100%;
  h4 {
    font-size: 12px;
  }
`;

const InfoBtn = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  & > div {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    cursor: pointer;
    & > div {
      height: 30px;
      width: 30px;
      border: 1px solid white;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  & > div:last-child {
    height: 30px;
    width: 30px;
    border: 1px solid white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
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

const infoVariants = {
  hover: {
    opacity: 1,
    backgroundcolor: "rgba(0,0,0,1)",
    padding: "15px",
    transition: {
      delay: 0.5,
      duration: 0.2,
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

export interface IGetImage {
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

  const onBoxClicked = (dataId: number, field: string) => {
    navigate(`/${field}/${dataId}`);
  };

  console.log(data);

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
          bgPhoto={makeImagePath(imageData?.backdrops[1]?.file_path!, "w500")}
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
          <div>
            <Info variants={infoVariants}>
              <InfoBtn>
                <div>
                  <div>
                    <FaPlay size="13" />
                  </div>
                  <div>
                    <FaHeart size="13" />
                  </div>
                </div>
                <div onClick={() => onBoxClicked(data.id, field)}>
                  <FaAngleDown size="18" />
                </div>
              </InfoBtn>
              <h4>{data.title ? data.title : data.name}</h4>
            </Info>
          </div>
        </Box>
      ) : null}
    </>
  );
}
export default SliderBox;
