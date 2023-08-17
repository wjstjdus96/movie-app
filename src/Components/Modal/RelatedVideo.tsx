import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makePosterPath } from "../../utils/makePath";
import { RelatedMovieProps } from "../../types/data";
import { useSetRecoilState } from "recoil";
import { modalInfoState } from "../../recoil/atom";

const Wrapper = styled.div`
  position: relative;
  width: 9vw;
`;

const Box = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
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
  transition: 0.8s;
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
  const setModalInfo = useSetRecoilState(modalInfoState);
  const onRelatedClicked = () => {
    setModalInfo({
      id: Number(id),
      listType: "",
      field: field,
      keyword: keyword ? keyword : "",
    });
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
