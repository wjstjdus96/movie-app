import styled from "styled-components";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  position: relative;
`;

const Box = styled.img`
  object-fit: contain;
  width: 8vw;
`;

const Title = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: 0.3s;
  &:hover {
    opacity: 1;
  }
  h4 {
    font-size: 0.5rem;
    padding: 10px;
  }
`;

interface RelatedMovieProps {
  id: string;
  title: string;
  poster: string;
}

function RelatedMovie({ id, title, poster }: RelatedMovieProps) {
  return (
    <Wrapper>
      <Box src={makeImagePath(poster, "w500")}></Box>
      <Title>
        <h4>{title}</h4>
      </Title>
    </Wrapper>
  );
}

export default RelatedMovie;
