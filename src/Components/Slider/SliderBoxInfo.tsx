import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaAngleDown, FaPlay, FaPlus, FaRegThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getVideoModalInfo } from "../../apis/api";
import { isModalState, modalInfoState } from "../../recoil/atom";
import { ISliderBox } from "../../types/component";
import { IDetailData } from "../../types/data";

export function SliderBoxInfo({
  field,
  data,
  listType,
  keyword,
  isTotalType,
  logoImage,
}: ISliderBox) {
  const navigate = useNavigate();
  const setIsModal = useSetRecoilState(isModalState);
  const setModalInfo = useSetRecoilState(modalInfoState);

  const { isLoading: detailLoading, data: detailData } = useQuery<IDetailData>(
    ["details", data.id],
    () =>
      getVideoModalInfo({ query: "", field: field.slice(0, -1), id: data.id })
  );

  const onBoxClicked = (dataId: number, field: string) => {
    setIsModal(true);
    setModalInfo({
      id: dataId,
      listType: listType,
      field: field,
      keyword: keyword ? keyword : "",
    });
    if (keyword) {
      isTotalType
        ? navigate(`/search/${dataId}?keyword=${keyword}`)
        : navigate(`/search/${field}/${dataId}?keyword=${keyword}`);
    } else {
      navigate(`/${field}/${dataId}`);
    }
  };

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
            <ButtonBox onClick={() => onBoxClicked(data.id, field)}>
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
              <div key={item.name}>
                {item.name}
                {detailData?.genres[idx + 1] && <p>/</p>}
              </div>
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
  p {
    margin: 0 5px;
    color: ${(props) => props.theme.gray.normal};
    font-weight: 700;
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
