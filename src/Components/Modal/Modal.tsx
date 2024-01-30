import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getImages, getVideoModalInfo } from "../../apis/api";
import { isModalState, modalInfoState } from "../../recoil/atom";
import { IDetailData, IGetDataResult, IGetImage } from "../../types/data";
import VideoModal from "./VideoModal";

export default function Modal() {
  const setIsModal = useSetRecoilState(isModalState);
  const modalInfo = useRecoilValue(modalInfoState);
  const { id, field, keyword, listType } = modalInfo;
  const navigate = useNavigate();

  const { isLoading: detailLoading, data: detailData } = useQuery<IDetailData>(
    ["details", id],
    () => getVideoModalInfo({ query: "", field: field.slice(0, -1), id })
  );

  const { data: imageData, isLoading: imageLoading } = useQuery<IGetImage>(
    ["images", id],
    () => getImages(field.slice(0, -1), id)
  );

  const { isLoading: similarLoading, data: similarData } =
    useQuery<IGetDataResult>(["related", id], () =>
      getVideoModalInfo({ query: "similar", field: field.slice(0, -1), id })
    );

  const isLoading = detailLoading || similarLoading || imageLoading;

  const onOverlayClicked = () => {
    setIsModal(false);
    if (field === "totals")
      return navigate(`/search/totals?keyword=${keyword}`);
    if (keyword) return navigate(`/search/${field}?keyword=${keyword}`);
    if (field === "movies") return navigate(`/`);
    return navigate("/tvs");
  };

  return (
    <AnimatePresence>
      <Overlay
        onClick={onOverlayClicked}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <ModalWrapper key={id} layoutId={listType + id}>
        <CloseButton onClick={onOverlayClicked}>X</CloseButton>
        {!isLoading && (
          <VideoModal
            detailData={detailData}
            relatedData={similarData}
            field={field}
            keyword={keyword}
            logo={imageData?.logos[0]?.file_path! || undefined}
          />
        )}
      </ModalWrapper>
    </AnimatePresence>
  );
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  opacity: 0;
`;

const ModalWrapper = styled(motion.div)`
  position: fixed;
  background-color: ${(props) => props.theme.modal.background};
  border-radius: 10px;
  width: 55vw;
  height: 90vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 999;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #4e4e4e;
    border-radius: 100px;
  }
  &::-webkit-scrollbar-track {
    background-color: #4e4e4e;
    border-radius: 100px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
  @media all and (max-width: 767px) {
    width: 96vw;
  }

  @media all and (min-width: 768px) and (max-width: 1200px) {
    width: 80vw;
  }

  @media all and (min-width: 1201px) {
    width: 55vw;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  z-index: 1000;
  right: 0;
  margin: 10px;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4e4e4e;
  color: white;
  border: none;
  font-size: 10px;
  opacity: 80%;
`;
