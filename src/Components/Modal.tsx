import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  opacity: 0;
`;

const ModalWrapper = styled(motion.div)`
  position: fixed;
  background-color: white;
  border-radius: 10px;
  width: 45vw;
  height: 90vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1;
`;

interface IModal {
  dataId?: string;
  listType: string;
}

export default function Modal({ dataId, listType }: IModal) {
  console.log(dataId + listType);
  const navigate = useNavigate();

  const onOverlayClicked = () => {
    navigate(`/`);
  };

  return (
    <>
      <Overlay
        onClick={onOverlayClicked}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <ModalWrapper layoutId={dataId + listType}></ModalWrapper>
    </>
  );
}
