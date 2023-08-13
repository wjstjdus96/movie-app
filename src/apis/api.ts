import { IGetVideos } from "../types/data";

const API_KEY = "c7ed214708d356a99cf12085cc89c05e";
const BASE_PATH = "https://api.themoviedb.org/3";
const LNG = "ko-KR";
const REGION = "KR";

interface IGetVideoModalInfo {
  query: string;
  field: string;
  id: number;
}

export async function getVideos({ field, listType }: IGetVideos) {
  return fetch(
    `${BASE_PATH}/${field}/${listType}?api_key=${API_KEY}&language=${LNG}&region=${REGION}`
  ).then((response) => response.json());
}

export async function getVideoModalInfo({
  query,
  field,
  id,
}: IGetVideoModalInfo) {
  let url = `${BASE_PATH}/${field}/${id}`;

  if (query) url += `/${query}`;
  url += `?api_key=${API_KEY}&language=${LNG}`;
  if (query == "similar") url += "&page=1";

  return fetch(url).then((response) => response.json());
}

export function getImages(type: string, id: number) {
  return fetch(`${BASE_PATH}/${type}/${id}/images?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

//search
export async function getSearch(query: string, field: string) {
  let type = field == "multi" ? field : field.slice(0, field.length - 1);
  return await fetch(
    `${BASE_PATH}/search/${type}?api_key=${API_KEY}&language=${LNG}&query=${query}&page=1`
  ).then((response) => response.json());
}
