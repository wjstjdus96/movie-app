import { useQuery } from "@tanstack/react-query";
import { IGetVideos, IGetDataResult } from "./../types/data";
import { getVideos } from "../apis/api";

export const useVideoQuery = (field: string, listType: string) => {
  const { isLoading, isSuccess, data } = useQuery<IGetDataResult>(
    [field, listType],
    () => getVideos({ field, listType })
  );

  return { isLoading, data };
};
