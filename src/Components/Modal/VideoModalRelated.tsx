import styled from "styled-components";
import RelatedMovie from "./RelatedVideo";
import { IVideoModalRelated } from "../../types/component";

export function VideoModalRelated({
  relatedData,
  field,
  keyword,
}: IVideoModalRelated) {
  return (
    <Wrapper>
      <h2>비슷한 컨텐츠</h2>
      <RelatedMovies>
        {relatedData.map((item: any) => (
          <RelatedMovie
            key={item.id}
            id={item.id}
            title={item.title ? item.title : item.name}
            poster={item.poster_path}
            field={field}
            keyword={keyword}
          />
        ))}
      </RelatedMovies>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  h2 {
    font-size: 1.5rem;
    margin: 1.3rem 0;
  }
`;

const RelatedMovies = styled.div`
  display: grid;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  & > div {
    width: 100%;
    height: 100%;
  }
  @media all and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media all and (min-width: 768px) and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media all and (min-width: 1201px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
