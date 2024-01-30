import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isModalState, modalInfoState } from "../recoil/atom";

interface IUseOpenSliderModal {
  field: string;
  dataId: number;
  listType: string;
  keyword?: string;
  isTotalType?: boolean;
}

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
