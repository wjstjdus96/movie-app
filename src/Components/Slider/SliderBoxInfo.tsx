import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaAngleDown, FaPlay, FaPlus, FaRegThumbsUp } from "react-icons/fa";
import styled from "styled-components";
import { getVideoModalInfo } from "../../apis/api";
import { ISliderBoxInfo } from "../../types/component";
import { IDetailData } from "../../types/data";

export function SliderBoxInfo({ field, data, onClickDetail }: ISliderBoxInfo) {
  const { isLoading: detailLoading, data: detailData } = useQuery<IDetailData>(
    ["details", data.id],
    () =>
      getVideoModalInfo({ query: "", field: field.slice(0, -1), id: data.id })
  );

  return (
    <Wrapper>
      {!detailLoading && (
        <Info variants={infoVariants}>
          <InfoBtn>
            <div>
              <ButtonBox isplay={true}>
                <FaPlay size="13" />
              </ButtonBox>
              <ButtonBox>
                <FaPlus size="13" />
              </ButtonBox>
              <ButtonBox>
                <FaRegThumbsUp size="13" />
              </ButtonBox>
            </div>
            <ButtonBox onClick={onClickDetail}>
              <FaAngleDown size="18" />
            </ButtonBox>
          </InfoBtn>
          <HeadInfo>
            <h4>{data.title ? data.title : data.name}</h4>
            <div>
              {detailData?.runtime && <div>{detailData?.runtime}분</div>}
              {detailData?.number_of_episodes && (
                <div>{detailData?.number_of_episodes} ep</div>
              )}
            </div>
          </HeadInfo>
          <GenresBox>
            {detailData?.genres?.map((item: any, idx: number) => (
              <Genre key={item.name}>
                <div> {item.name}</div>
              </Genre>
            ))}
          </GenresBox>
        </Info>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Info = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  position: absolute;
  padding: 10px;
  border-radius: 0 0 5px 5px;
  background-color: ${(props) => props.theme.modal.background};
  background-color: rgba(0, 0, 0);
  opacity: 0;
  width: 100%;
`;

const InfoBtn = styled.div`
  display: flex;
  justify-content: space-between;
  & > div {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    cursor: pointer;
  }
`;

const ButtonBox = styled.div<{ isplay?: boolean }>`
  height: 32px;
  width: 32px;
  border: 2px solid
    ${(props) =>
      props.isplay ? props.theme.white.lighter : props.theme.gray.normal};
  color: ${(props) =>
    props.isplay ? props.theme.black.veryDark : props.theme.white.lighter};
  background-color: ${(props) =>
    props.isplay ? props.theme.white.lighter : props.theme.black.veryDark};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    border-color: ${(props) => props.theme.white.lighter};
  }
`;

const HeadInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  h4 {
    font-size: 12px;
    font-weight: 700;
  }
  & > div {
    font-size: 12px;
    color: ${(props) => props.theme.white.darker};
  }
`;

const GenresBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 10px;
  flex-wrap: wrap;
  div {
    display: flex;
    margin: 0 0;
  }
`;

const Genre = styled.div`
  &::after {
    content: "/";
    float: right;
    display: block;
    margin: 0 5px;
  }
  &:last-child::after {
    content: "";
  }
`;

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.2,
      type: "tween",
    },
  },
};
