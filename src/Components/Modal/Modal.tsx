import { useRecoilState, useSetRecoilState } from "recoil";
import { isModalState, modalInfoState } from "../../recoil/atom";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { IDetailData, IGetDataResult } from "../../types/data";
import { getVideoModalInfo } from "../../apis/api";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import VideoModal from "./VideoModal";

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
  width: 50vw;
  height: 90vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 100;
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
`;

export default function Modal() {
  const setIsModal = useSetRecoilState(isModalState);
  const [modalInfo, setModalInfo] = useRecoilState(modalInfoState);
  const { id, field, keyword, listType } = modalInfo;
  const navigate = useNavigate();

  const { isLoading: detailLoading, data: detailData } = useQuery<IDetailData>(
    ["details", id],
    () => getVideoModalInfo({ query: "", field: field.slice(0, -1), id })
  );

  const { isLoading: similarLoading, data: similarData } =
    useQuery<IGetDataResult>(["related", id], () =>
      getVideoModalInfo({ query: "similar", field: field.slice(0, -1), id })
    );

  const isLoading = detailLoading || similarLoading;

  const onOverlayClicked = () => {
    setIsModal(false);
    if (field == "totals") return navigate(`/search/totals?keyword=${keyword}`);
    if (keyword) return navigate(`/search/${field}?keyword=${keyword}`);
    if (field == "movies") return navigate(`/`);
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
        {!isLoading && (
          <VideoModal
            detailData={detailData}
            relatedData={similarData}
            field={field}
            keyword={keyword}
          />
        )}
      </ModalWrapper>
    </AnimatePresence>
  );
}
