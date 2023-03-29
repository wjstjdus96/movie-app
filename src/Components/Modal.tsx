import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getMovieDetails,
  getRelated,
  getRelatedTvs,
  getTvDetails,
} from "../api";
import { useQuery } from "@tanstack/react-query";
import { makeImagePath } from "../utils";
import RelatedMovie from "./RelatedMovie";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  opacity: 0;
`;

const ModalWrapper = styled(motion.div)`
  position: fixed;
  background-color: ${(props) => props.theme.modal.background};
  border-radius: 10px;
  width: 45vw;
  height: 90vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 50;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #4e4e4e;
    border-radius: 100px;
  }
  &::-webkit-scrollbar-track {
    background-color: #4e4e4e;
    border-radius: 100px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
`;

const Head = styled.div<{ bgPhoto: string }>`
  background-image: linear-gradient(
      rgba(0, 0, 0, 0),
      ${(props) => props.theme.modal.background}
    ),
    url(${(prop) => prop.bgPhoto});
  background-size: cover;
  height: 65vh;
  background-position: center center;
  border-radius: 10px 10px 0 0;
  position: relative;
  div {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 15%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  h2 {
    color: ${(props) => props.theme.white.lighter};
    font-size: 2rem;
    font-weight: 600;
    text-shadow: 2px 2px 4px #211e1e;
  }
  h4 {
  }
`;

const Poster = styled.img`
  object-fit: contain;
  height: 320px;
`;

const Body = styled.div`
  padding: 10px 40px;
  p {
    font-size: 0.8rem;
    line-height: 150%;
    margin-bottom: 15px;
  }
`;

const Infos = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.8vh;
  font-size: 0.9rem;
  .info::after {
    content: "·";
    margin: 0 15px;
  }
  .info:last-child::after {
    content: "";
    margin: 0;
  }
  div:last-child {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Genres = styled.div`
  display: flex;
  p {
    display: flex;
    margin-left: 5px !important;
    margin: 0 0;
  }
`;

const Rating = styled.div<{ percent: number }>`
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: white;
  div {
    margin-top: -7px;
  }
  div:first-child {
    color: #fff58c;
    padding: 0;
    position: absolute;
    z-index: 1;
    display: flex;
    top: 0;
    left: 0;
    overflow: hidden;
    -webkit-text-fill-color: gold;
    width: ${(prop) => prop.percent + "%"};
    font-size: 20px;
  }
  div:last-child {
    z-index: 0;
    padding: 0;
    font-size: 20px;
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

interface IModal {
  dataId: string;
  listType: string;
  field: string;
}

export default function Modal({ dataId, listType, field }: IModal) {
  const { isLoading, data: detailData } = useQuery<any>(
    ["details", dataId],
    () => {
      if (field == "movies") return getMovieDetails(dataId);
      return getTvDetails(dataId);
    }
  );

  const { isLoading: relatedLoading, data: relatedData } = useQuery<any>(
    ["related", dataId],
    () => {
      if (field == "movies") return getRelated(dataId);
      return getRelatedTvs(dataId);
    }
  );

  const navigate = useNavigate();

  const onOverlayClicked = () => {
    if (field == "movies") return navigate(`/`);
    return navigate("/tv");
  };

  console.log(detailData);

  return (
    <>
      <Overlay
        onClick={onOverlayClicked}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <ModalWrapper layoutId={dataId + listType}>
        <Head bgPhoto={makeImagePath(detailData?.backdrop_path || "")}>
          <div>
            <Poster
              src={makeImagePath(detailData?.poster_path || "", "w500")}
            />
            <h2>{detailData?.title ? detailData?.title : detailData?.name}</h2>
            <h4>
              {detailData?.original_title
                ? detailData?.original_title
                : detailData?.original_name}
            </h4>
          </div>
        </Head>
        <Body>
          <Infos>
            <div className="info">
              {detailData?.release_date
                ? detailData?.release_date?.slice(0, 4)
                : detailData?.first_air_date?.slice(0, 4)}
            </div>
            {detailData?.runtime && (
              <div className="info">{detailData?.runtime}분</div>
            )}
            <Genres className="info">
              {detailData?.genres?.map((item: any, idx: number) => (
                <p>
                  {item.name}
                  {detailData?.genres[idx + 1] && <p>/</p>}
                </p>
              ))}
            </Genres>
            <div className="info">
              <Rating percent={detailData?.vote_average * 10}>
                <div>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <div>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </Rating>
              <span>
                {" "}
                &nbsp;( {(detailData?.vote_average + "").slice(0, 3)} )
              </span>
            </div>
          </Infos>
          {detailData?.tagline && (
            <p>
              &#124; &nbsp;
              {detailData?.tagline}
            </p>
          )}
          <p>{detailData?.overview}</p>
          {relatedData && (
            <>
              <hr />
              <Related>
                <h2>비슷한 컨텐츠</h2>
                <RelatedMovies>
                  {relatedData?.results.map((item: any) => (
                    <RelatedMovie
                      id={item.id}
                      title={item.title ? item.title : item.name}
                      poster={item.poster_path}
                    />
                  ))}
                </RelatedMovies>
              </Related>
            </>
          )}
        </Body>
      </ModalWrapper>
    </>
  );
}
