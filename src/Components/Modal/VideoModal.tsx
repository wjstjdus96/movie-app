import { makeImagePath, makePosterPath } from "../../utils/makePath";
import styled from "styled-components";
import RelatedMovie from "./RelatedVideo";
import { AiFillStar } from "react-icons/ai";
import { IVideoModal } from "../../types/component";
import { VideoModalHead } from "./VideoModalHead";
import { VideoModalMainInfo } from "./VideoModalMainInfo";

export default function VideoModal({
  detailData,
  relatedData,
  field,
  keyword,
  logo,
}: IVideoModal) {
  return (
    <>
      <VideoModalHead
        bgImage={detailData?.backdrop_path}
        logoImage={logo}
        title={detailData?.title ? detailData?.title : detailData?.name}
      />
      <Body>
        <VideoModalMainInfo detailData={detailData} />
        {relatedData.results.length != 0 && (
          <Related>
            <h2>비슷한 컨텐츠</h2>
            <RelatedMovies>
              {relatedData?.results.map((item: any) => (
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
          </Related>
        )}
      </Body>
    </>
  );
}
const Body = styled.div`
  padding: 0 3rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Related = styled.div`
  margin-top: 15px;
  h2 {
    margin-bottom: 15px;
    font-size: 1.4rem;
  }
`;

const RelatedMovies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-content: space-between;
  align-items: center;
`;
