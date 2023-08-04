export interface IData {
  backdrop_path: any;
  genre_ids: number[];
  id: number;
  original_language: string;
  title?: string;
  original_title?: string;
  name?: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
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

export interface IImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface IGetImage {
  backdrops: IImage[];
  id: number;
  logos: IImage[];
  posters: IImage[];
}

export interface RelatedMovieProps {
  id: string;
  title: string;
  poster: string;
  field: string;
  keyword?: string;
}

export interface IDetailData {
  backdrop_path: string;
  genres: Genre[];
  id: number;
  homepage: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  tagline: string;
  vote_average: number;
  vote_count: number;

  // Movies
  original_title?: string;
  release_date?: string;
  runtime?: number;
  title?: string;

  //Series
  first_air_date?: string;
  last_air_date?: string;
  created_by?: CreatedBy[];
  episode_run_time?: number[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  original_name?: string;
  name?: string;
  seasons?: Season[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}
