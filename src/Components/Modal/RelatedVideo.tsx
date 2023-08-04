import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath, makePosterPath } from "../../utils/makePath";
import { RelatedMovieProps } from "../../types/data";

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

export default function RelatedMovie({
  id,
  title,
  poster,
  field,
  keyword,
}: RelatedMovieProps) {
  const navigate = useNavigate();
  const onRelatedClicked = () => {
    if (keyword) {
      return navigate(`/search/${field}/${id}?keyword=${keyword}`);
    }
    return navigate(`/${field}/${id}`);
  };

  return (
    <Wrapper>
      <Box src={makePosterPath(poster, "w500")}></Box>
      <Title onClick={() => onRelatedClicked()}>
        <h4>{title}</h4>
      </Title>
    </Wrapper>
  );
}
