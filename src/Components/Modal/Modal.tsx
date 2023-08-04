import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getDetails, getRelated } from "../../apis/api";
import { useQuery } from "@tanstack/react-query";
import { makeImagePath, makePosterPath } from "../../utils/makePath";
import RelatedMovie from "./RelatedVideo";
import VideoModal from "./VideoModal";
import { IModal } from "../../types/component";
import { IDetailData, IGetDataResult } from "../../types/data";

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

export default function Modal({
  dataId,
  listType,
  field,
  keyword,
  totalField,
}: IModal) {
  const { isLoading, data: detailData } = useQuery<IDetailData>(
    ["details", dataId],
    () => {
      if (field == "totals") return getDetails(totalField!, dataId);
      return getDetails(field.slice(0, -1), dataId);
    }
  );

  const { isLoading: relatedLoading, data: relatedData } =
    useQuery<IGetDataResult>(["related", dataId], () => {
      if (field == "totals") return getRelated(totalField!, dataId);
      return getRelated(field.slice(0, -1), dataId);
    });

  const navigate = useNavigate();

  const onOverlayClicked = () => {
    if (field == "totals") return navigate(`/search/totals?keyword=${keyword}`);
    if (keyword) return navigate(`/search/${field}?keyword=${keyword}`);
    if (field == "movies") return navigate(`/`);
    return navigate("/tvs");
  };

  return (
    <>
      <Overlay
        onClick={onOverlayClicked}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <ModalWrapper key={dataId} layoutId={dataId}>
        <VideoModal
          detailData={detailData}
          relatedData={relatedData}
          field={field}
          keyword={keyword}
        />
      </ModalWrapper>
    </>
  );
}
