import { atom, atomFamily } from "recoil";
import { IData } from "../types/data";

export type IDataKey = [string, string];

export const videosState = atomFamily<IData[], string>({
  key: "videoState",
  default: [],
});

export const loadingState = atom<boolean>({
  key: "loading",
  default: false,
});
