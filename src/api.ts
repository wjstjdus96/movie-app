const API_KEY = "c7ed214708d356a99cf12085cc89c05e";
const BASE_PATH = "https://api.themoviedb.org/3";
const LNG = "ko-KR";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetRelated {
  page: number;
  total_pages: number;
  total_results: number;
  results: IMovie[];
}

export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=${LNG}`
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
