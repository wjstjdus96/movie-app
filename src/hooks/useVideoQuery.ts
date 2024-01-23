import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { getVideos } from "../apis/api";
import { loadingState } from "../recoil/atom";
import { IGetDataResult } from "./../types/data";

export const useVideoQuery = (field: string, listType: string) => {
  const setIsLoading = useSetRecoilState<boolean>(loadingState);
  const { isLoading: isDataFetching, data } = useQuery<IGetDataResult>(
    [field, listType],
    () => getVideos({ field, listType })
  );

  useEffect(() => {
    if (isDataFetching) setIsLoading(true);
    else setIsLoading(false);
  }, [isDataFetching, setIsLoading]);

  return { data };
};
