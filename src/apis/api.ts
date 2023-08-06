import { IGetVideos } from "../types/data";

const API_KEY = "c7ed214708d356a99cf12085cc89c05e";
const BASE_PATH = "https://api.themoviedb.org/3";
const LNG = "ko-KR";
const REGION = "KR";

export async function getVideos({ field, listType }: IGetVideos) {
  return fetch(
    `${BASE_PATH}/${field}/${listType}?api_key=${API_KEY}&language=${LNG}&region=${REGION}`
  ).then((response) => response.json());
}

//movies
export function getNowPlayingMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=${LNG}&region=${REGION}`
  ).then((response) => response.json());
}

export function getPopularMovies() {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=${LNG}&region=${REGION}`
  ).then((response) => response.json());
}

export function getTopRatedMovies() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=${LNG}&region=${REGION}`
  ).then((response) => response.json());
}

export function getUpcomingMovies() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=${LNG}&region=${REGION}`
  ).then((response) => response.json());
}

//tvs
export function getPopularTvs() {
  return fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=${LNG}`
  ).then((response) => response.json());
}

export function getonTheAirTvs() {
  return fetch(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=${LNG}`
  ).then((response) => response.json());
}

export function getDetails(type: string, id: string) {
  return fetch(
    `${BASE_PATH}/${type}/${id}?api_key=${API_KEY}&language=${LNG}`
  ).then((response) => response.json());
}

export function getRelated(type: string, id: string) {
  return fetch(
    `${BASE_PATH}/${type}/${id}/similar?api_key=${API_KEY}&language=${LNG}&page=1`
  ).then((response) => response.json());
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
