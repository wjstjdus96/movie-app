import { useQuery } from "@tanstack/react-query";
import { getSearch } from "../apis/api";
import { useRecoilState } from "recoil";
import { searchResultState } from "../recoil/atom";

export const useSearchQuery = async (keyword: string) => {
  const [, setSearchResultState] = useRecoilState(searchResultState);
  const { data } = useQuery(["search", keyword], () => getSearch(keyword));

  setSearchResultState(data);
};
