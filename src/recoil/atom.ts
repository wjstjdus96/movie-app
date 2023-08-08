import { atom, atomFamily } from "recoil";

export const MovieLoadingState = atom<boolean>({
  key: "loading",
  default: false,
});

export const TvLoadingState = atom<boolean>({
  key: "loading",
  default: false,
});

export const loadingState = atom<boolean>({
  key: "loading",
  default: false,
});
