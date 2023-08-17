import { useQuery } from "@tanstack/react-query";
import { makeImagePath } from "../utils/makePath";
import styled from "styled-components";
import { getImages } from "../apis/api";
import { BsPlayFill, BsInfoCircle } from "react-icons/bs";
import { IData, IGetImage } from "../types/data";

const Wrapper = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  padding: 50px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(prop) => prop.bgPhoto});
  background-size: cover;
  & > div {
    width: 30%;
  }
`;

const Logo = styled.img<{ logoPhoto: string }>`
  content: url(${(prop) => prop.logoPhoto});
  background-size: cover;
  margin-top: 100px;
  margin-bottom: 40px;
  max-width: 100%;
  max-height: 50%;
`;

const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  & > button {
    padding: 10px 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 8px;
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

interface IBanner {
  data: IData;
  field: string;
}

function Banner({ data, field }: IBanner) {
  const { data: image } = useQuery<IGetImage>(["images", data.id], () =>
    getImages(field.slice(0, -1), data.id)
  );

  return (
    <>
      {image ? (
        <Wrapper bgPhoto={makeImagePath(image.backdrops[0].file_path || "")}>
          <div>
            {image.logos[0]?.file_path != undefined ? (
              <Logo
                logoPhoto={makeImagePath(image?.logos[0].file_path!, "w500")}
              />
            ) : (
              <div>{data.title ? data.title : data.name}</div>
            )}
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
      ) : null}
    </>
  );
}

export default Banner;
