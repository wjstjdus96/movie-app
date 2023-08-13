import { atom } from "recoil";

export const loadingState = atom<boolean>({
  key: "loading",
  default: false,
});

export const isModalState = atom<boolean>({
  key: "isModal",
  default: false,
});

export const modalInfoState = atom({
  key: "modalInfo",
  default: { id: 0, listType: "", field: "", keyword: "" },
});
