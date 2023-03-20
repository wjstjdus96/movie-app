const API_KEY = "c7ed214708d356a99cf12085cc89c05e";
const BASE_PATH = "https://api.themoviedb.org/3";
const LNG = "ko-KR";

interface IData {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetDataResult {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IData[];
  total_pages: number;
  total_results: number;
}

export function getNowPlayingMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=${LNG}`
  ).then((response) => response.json());
}

export function getPopularMovies() {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=${LNG}`
  ).then((response) => response.json());
}

export function getTopRatedMovies() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=${LNG}`
  ).then((response) => response.json());
}

export function getUpcomingMovies() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=${LNG}`
  ).then((response) => response.json());
}

export function getDetails(movieId: string) {
  return fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=${LNG}`
  ).then((response) => response.json());
}

export function getRelated(movieId: string) {
  return fetch(
    `${BASE_PATH}/movie/${movieId}/similar?api_key=${API_KEY}&language=${LNG}&page=1`
  ).then((response) => response.json());
}
