import noImage from "../assets/images/noImage.png";
import noPoster from "../assets/images/noPoster.jpeg";

export function makeImagePath(id: string, format?: string) {
  if (id === "" || id === null || id === undefined) {
    return noImage;
  } else {
    return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
  }
}

export function makePosterPath(id: string, format?: string) {
  if (id === "" || id === null || id === undefined) {
    return noPoster;
  } else {
    return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
  }
}
