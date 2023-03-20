import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getDetails, getRelated, IGetDataResult } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import RelatedMovie from "../Components/RelatedMovie";

const Head = styled.div<{ bgPhoto: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0), #211e1e),
    url(${(prop) => prop.bgPhoto});
  background-size: cover;
  height: 50vh;
  background-position: center center;
  border-radius: 10px 10px 0 0;
  position: relative;
  h2 {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 80%;
    color: ${(props) => props.theme.white.lighter};
    font-size: 2rem;
    font-weight: 600;
    text-shadow: 2px 2px 4px #211e1e;
  }
`;

const Body = styled.div`
  padding: 10px 40px;
  p {
    font-size: 0.9rem;
    line-height: 150%;
    margin-bottom: 15px;
  }
`;

const Intro = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5vh;
  div {
    display: flex;
    gap: 10px;
  }
`;

const RelatedMovies = styled.div`
  margin-top: 10px;
`;

function Detail(dataId: string) {
  const location = useLocation();
  // const id = location.pathname.slice(1)?.slice(7);

  const { isLoading, data } = useQuery<any>(["details", dataId], () =>
    getDetails(dataId)
  );

  const { isLoading: relatedLoading, data: relatedData } = useQuery<any>(
    ["related", dataId],
    () => getRelated(dataId)
  );

  return (
    <div>
      <Head bgPhoto={makeImagePath(data?.backdrop_path || "")}>
        <h2>{data?.title}</h2>
      </Head>
      <Body>
        <Intro>
          <div>{data?.release_date?.slice(0, 4) + "  "}</div>
          <div>
            {data?.genres?.map((item: any) => (
              <div>{item.name}</div>
            ))}
          </div>
        </Intro>
        <p>{data?.overview}</p>
        <hr />
        <RelatedMovies>
          <div>비슷한 영화</div>
          <div>
            {relatedData?.results.map((item: any) => (
              <RelatedMovie
                id={item.id}
                title={item.title}
                backdrop={item.backdrop_path}
              />
            ))}
          </div>
        </RelatedMovies>
      </Body>
    </div>
  );
}

export default Detail;
