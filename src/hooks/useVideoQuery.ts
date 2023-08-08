import { useQuery } from "@tanstack/react-query";
import { IGetVideos, IGetDataResult } from "./../types/data";
import { getVideos } from "../apis/api";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  MovieLoadingState,
  TvLoadingState,
  loadingState,
} from "../recoil/atom";
import { useEffect } from "react";

export const useVideoQuery = (field: string, listType: string) => {
  const [isLoading, setIsLoading] = useRecoilState<boolean>(loadingState);
  const {
    isLoading: isDataFetching,
    isSuccess,
    data,
  } = useQuery<IGetDataResult>([field, listType], () =>
    getVideos({ field, listType })
  );

  useEffect(() => {
    console.log("로딩 값" + isDataFetching);
    if (isDataFetching) setIsLoading(true);
    else setIsLoading(false);
  }, [isDataFetching]);

  return { isLoading, data };
};
