import { useQuery } from "@tanstack/react-query";
import { IGetDataResult } from "./../types/data";
import { getVideos } from "../apis/api";
import { useRecoilState } from "recoil";
import { loadingState } from "../recoil/atom";
import { useEffect } from "react";

export const useVideoQuery = (field: string, listType: string) => {
  const [isLoading, setIsLoading] = useRecoilState<boolean>(loadingState);
  const { isLoading: isDataFetching, data } = useQuery<IGetDataResult>(
    [field, listType],
    () => getVideos({ field, listType })
  );

  useEffect(() => {
    if (isDataFetching) setIsLoading(true);
    else setIsLoading(false);
  }, [isDataFetching]);

  return { data };
};
