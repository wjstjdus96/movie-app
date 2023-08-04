import { motion, AnimatePresence } from "framer-motion";
import { makeImagePath, makePosterPath } from "../../utils/makePath";
import styled from "styled-components";
import RelatedMovie from "./RelatedVideo";
import { AiFillStar } from "react-icons/ai";
import { IVideoModal } from "../../types/component";

const Head = styled.div<{ bgPhoto: string }>`
  overflow: visible;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0),
      ${(props) => props.theme.modal.background}
    ),
    url(${(prop) => prop.bgPhoto});
  background-size: cover;
  height: 55vh;
  background-position: center center;
  border-radius: 10px 10px 0 0;
`;

const Body = styled.div`
  padding: 10px 40px;
  width: 100%;
  height: 100%;
  position: relative;
  & > div:first-child {
    position: absolute;
    top: -35%;
    padding-right: 40px;
    display: flex;
    flex-direction: column;
  }
  p {
    font-size: 0.8rem;
    line-height: 150%;
    margin-bottom: 15px;
  }
  hr {
    border-width: 1px 0px 0px 0px;
    color: white;
    width: 100%;
  }
`;

const Intro = styled.div`
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  & > div:nth-child(2) {
    margin-left: 20px;
  }
  & > img {
    object-fit: contain;
    height: 400px;
  }
  h1 {
    font-size: 200%;
    font-weight: 700;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 120%;
    margin-bottom: 10px;
  }
  h4 {
    margin-bottom: 15px;
  }
`;

const FirstInfos = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1vh;
  font-size: 0.9rem;
  & > div:first-child {
    border: 1px solid white;
    border-radius: 4px;
    padding: 2px 4px;
    margin-right: 5px;
  }
  & > div:last-child {
    display: flex;
    align-items: center;
    div {
      display: flex;
      margin-left: 5px !important;
      margin: 0 0;
    }
    p {
      display: flex;
      margin-left: 5px !important;
      margin: 0 0;
    }
  }
`;

const SecondInfos = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2vh;
  & > div:first-child {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 3px;
  }

  & > div:first-child::after {
    margin: 0px 10px;
    content: "·";
  }
`;

const Related = styled.div`
  margin-top: 15px;
  h2 {
    margin-bottom: 15px;
    font-size: 1.2rem;
  }
`;

const RelatedMovies = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20%, auto));
  gap: 20px;
  justify-content: space-between;
  align-items: center;
`;

export default function VideoModal({
  detailData,
  relatedData,
  field,
  keyword,
}: IVideoModal) {
  console.log(detailData);
  return (
    <>
      <Head bgPhoto={makeImagePath(detailData?.backdrop_path || "")}></Head>
      <Body>
        <div>
          <Intro>
            <img src={makePosterPath(detailData?.poster_path || "", "w500")} />
            <div>
              <FirstInfos>
                <div>
                  {detailData?.release_date
                    ? detailData?.release_date?.slice(0, 4)
                    : detailData?.first_air_date?.slice(0, 4)}
                </div>
                <div>
                  {detailData?.genres?.map((item: any, idx: number) => (
                    <div key={item.name}>
                      {item.name}
                      {detailData?.genres[idx + 1] && <p>/</p>}
                    </div>
                  ))}
                </div>
              </FirstInfos>
              <h1>
                {detailData?.title ? detailData?.title : detailData?.name}
              </h1>
              <h2>
                {detailData?.original_title
                  ? detailData?.original_title
                  : detailData?.original_name}
              </h2>
              <SecondInfos>
                <div>
                  <AiFillStar color="yellow" size="23" />
                  <span>{(detailData?.vote_average + "").slice(0, 3)}</span>
                  <span>({detailData?.vote_count.toLocaleString()})</span>
                </div>
                <div>
                  {detailData?.runtime && <div>{detailData?.runtime}분</div>}
                </div>
              </SecondInfos>
              {detailData?.tagline && (
                <h4>
                  &#124; &nbsp;
                  {detailData?.tagline}
                </h4>
              )}
              <p>{detailData?.overview}</p>
            </div>
          </Intro>

          {relatedData && (
            <>
              <hr />
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
            </>
          )}
        </div>
      </Body>
    </>
  );
}
