import { useQuery } from "@tanstack/react-query";
import { BsInfoCircle, BsPlayFill } from "react-icons/bs";
import styled from "styled-components";
import { getImages } from "../apis/api";
import { IMainBanner } from "../types/component";
import { IGetImage } from "../types/data";
import { makeImagePath } from "../utils/makePath";

function Banner({ data, field }: IMainBanner) {
  const { data: image } = useQuery<IGetImage>(["images", data.id], () =>
    getImages(field.slice(0, -1), data.id)
  );
  const overview = data.overview.split(".", 3).join(".");

  return (
    <>
      {image && (
        <Wrapper bgPhoto={makeImagePath(image.backdrops[0].file_path || "")}>
          <div>
            {image.logos[0]?.file_path !== undefined ? (
              <Logo
                logoPhoto={makeImagePath(image?.logos[0].file_path!, "w500")}
              />
            ) : (
              <div>{data.title ? data.title : data.name}</div>
            )}
            <Overview>{overview}</Overview>
            <Buttons>
              <button>
                <BsPlayFill />
                재생
              </button>
              <button>
                <BsInfoCircle />
                상세정보
              </button>
            </Buttons>
          </div>
        </Wrapper>
      )}
    </>
  );
}

export default Banner;

const Wrapper = styled.div<{ bgPhoto: string }>`
  padding: 0px 50px;
  margin-bottom: 12rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(prop) => prop.bgPhoto});
  background-size: cover;
  & > div {
    width: 50%;
  }
  @media all and (max-width: 767px) {
    padding: 0px 20px;
    margin-bottom: 10rem;
  }
`;

const Logo = styled.img<{ logoPhoto: string }>`
  content: url(${(prop) => prop.logoPhoto});
  width: 100%;
  background-size: cover;
  margin-top: 100px;
  max-width: 25vw;
  @media all and (max-width: 767px) {
    margin-top: 70px;
    max-width: 40vw;
  }
`;

const Overview = styled.div`
  font-size: 1.1vw;
  line-height: 1.5;
  margin: 30px 0;
  @media all and (max-width: 767px) {
    font-size: 1.6vw;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  & > button {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    &:first-child {
      background-color: white;
    }
    &:last-child {
      background-color: rgba(0, 0, 0, 0.4);
      color: white;
    }
    &:hover {
      filter: brightness(70%);
    }
    @media all and (max-width: 767px) {
      padding: 5px 13px;
      font-size: 10px;
    }

    @media all and (min-width: 768px) and (max-width: 1200px) {
      padding: 8px 20px;
      font-size: 13px;
    }

    @media all and (min-width: 1201px) {
      padding: 10px 30px;
      font-size: 18px;
    }
  }
`;
