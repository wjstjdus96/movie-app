import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getDetails, getRelated } from "../api";
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
  margin-bottom: 1.8vh;
  font-size: 0.9rem;
  div::after {
    content: "·";
    margin: 0 15px;
  }
  div:last-child::after {
    content: "";
    margin: 0;
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
}

export default function Modal({ dataId, listType }: IModal) {
  const navigate = useNavigate();

  const onOverlayClicked = () => {
    navigate(`/`);
  };

  const { isLoading, data: detailData } = useQuery<any>(
    ["details", dataId],
    () => getDetails(dataId)
  );

  const { isLoading: relatedLoading, data: relatedData } = useQuery<any>(
    ["related", dataId],
    () => getRelated(dataId)
  );

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
            <h2>{detailData?.title}</h2>
            <h4>{detailData?.original_title}</h4>
          </div>
        </Head>
        <Body>
          <Infos>
            <div>{detailData?.release_date?.slice(0, 4) + "  "}</div>
            <div>{detailData?.runtime}분</div>
            <Genres>
              {detailData?.genres?.map((item: any, idx: number) => (
                <p>
                  {item.name}
                  {detailData?.genres[idx + 1] && <p>/</p>}
                </p>
              ))}
            </Genres>
            <div>{/* {detailData?.vote_average &&} */}</div>
          </Infos>
          {detailData?.tagline && (
            <p>
              &#124; &nbsp;
              {detailData?.tagline}
            </p>
          )}
          <p>{detailData?.overview}</p>
          <hr />
          <Related>
            <h2>비슷한 영화</h2>
            <RelatedMovies>
              {relatedData?.results.map((item: any) => (
                <RelatedMovie
                  id={item.id}
                  title={item.title}
                  poster={item.poster_path}
                />
              ))}
            </RelatedMovies>
          </Related>
        </Body>
      </ModalWrapper>
    </>
  );
}