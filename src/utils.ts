import noImage from "./assets/images/noImage.png";

export function makeImagePath(id: string, format?: string) {
  if (id === "" || id === null || id === undefined) {
    return noImage;
  } else {
    return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
  }

  // return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}
