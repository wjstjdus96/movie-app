import { selector, selectorFamily } from "recoil";
import { searchResultState } from "./atom";
import { IData, IGetDataResult } from "../types/data";

export const searchResultSelector = selectorFamily<any, string>({
  key: "searchResultSelector",
  get:
    (param: string) =>
    ({ get }) => {
      const totalResult = get(searchResultState);
      if (totalResult) {
        return totalResult.results.filter(
          (result: IData) => result.media_type == param
        );
      }
      return null;
    },
});
