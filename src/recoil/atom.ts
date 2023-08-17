import { atom } from "recoil";
import { IGetDataResult } from "../types/data";

export const loadingState = atom<boolean>({
  key: "loading",
  default: false,
});

export const isModalState = atom<boolean>({
  key: "isModal",
  default: false,
});

interface IModalInfoState {
  id: number;
  listType: string;
  field: string;
  keyword: string;
}

export const modalInfoState = atom<IModalInfoState>({
  key: "modalInfo",
  default: { id: 0, listType: "", field: "", keyword: "" },
});

export const keywordState = atom({
  key: "keyword",
  default: "",
});

export const searchResultState = atom<IGetDataResult | null>({
  key: "searchResult",
  default: { page: 0, results: [], total_pages: 0, total_results: 0 },
});
