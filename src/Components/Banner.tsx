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
                <BsPlayFill size="24" />
                재생
              </button>
              <button>
                <BsInfoCircle size="24" />
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
  height: 100vh;
  padding: 50px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(prop) => prop.bgPhoto});
  background-size: cover;
  & > div {
    width: 50%;
  }
`;

const Logo = styled.img<{ logoPhoto: string }>`
  content: url(${(prop) => prop.logoPhoto});
  background-size: cover;
  margin-top: 100px;
  max-width: 50%;
  max-height: 20%;
`;

const Overview = styled.div`
  font-size: 1.1rem;
  line-height: 1.5;
  margin: 30px 0;
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  & > button {
    padding: 10px 30px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 5px;
    border: none;
    font-size: 18px;
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
  }
`;
