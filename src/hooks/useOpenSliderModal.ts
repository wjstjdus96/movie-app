import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isModalState, modalInfoState } from "../recoil/atom";
import { IUseOpenSliderModal } from "../types/component";

export const useOpenSliderModal = ({
  field,
  dataId,
  listType,
  keyword,
  isTotalType,
}: IUseOpenSliderModal) => {
  const navigate = useNavigate();
  const setIsModal = useSetRecoilState(isModalState);
  const setModalInfo = useSetRecoilState(modalInfoState);

  const onOpenSliderModal = () => {
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

  return { onOpenSliderModal };
};
