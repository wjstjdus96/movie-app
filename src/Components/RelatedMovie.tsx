import styled from "styled-components";

interface RelatedMovieProps {
  id: string;
  title: string;
  backdrop?: string;
}

function RelatedMovie({ id, title, backdrop }: RelatedMovieProps) {
  return <div>{id}</div>;
}

export default RelatedMovie;
