import { selectorFamily } from "recoil";
import { searchResultState } from "./atom";
import { IData } from "../types/data";

export const searchResultSelector = selectorFamily<any, string>({
  key: "searchResultSelector",
  get:
    (param: string) =>
    ({ get }) => {
      const totalResult = get(searchResultState);
      if (param === "total")
        return totalResult?.results.filter(
          (result: IData) => result.media_type !== "person"
        );
      return totalResult?.results.filter(
        (result: IData) => result.media_type + "s" === param
      );
    },
});
