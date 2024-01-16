import { AiFillStar } from "react-icons/ai";
import styled from "styled-components";

export interface VideoModalMainInfo {
  detailData: any;
}

export function VideoModalMainInfo({ detailData }: VideoModalMainInfo) {
  return (
    <Wrapper>
      <TitleBox>
        <div>{detailData?.title ? detailData?.title : detailData?.name}</div>
        <StarRatingBox>
          <AiFillStar color="yellow" size="23" />
          <span>{(detailData?.vote_average + "").slice(0, 3)}</span>
          <span>({detailData?.vote_count.toLocaleString()})</span>
        </StarRatingBox>
      </TitleBox>
      <AdditionInfoBox>
        <div>
          {detailData?.release_date
            ? detailData?.release_date?.slice(0, 4)
            : detailData?.first_air_date?.slice(0, 4)}
        </div>
        {detailData?.runtime && <div>{detailData?.runtime}분</div>}
        {detailData?.number_of_episodes && (
          <div>{detailData?.number_of_episodes} 에피소드</div>
        )}
        <GenreBox>
          {detailData?.genres?.map((item: any, idx: number) => (
            <div key={item.name}>
              {item.name}
              {detailData?.genres[idx + 1] && <p>/</p>}
            </div>
          ))}
        </GenreBox>
      </AdditionInfoBox>
      <DescriptionBox>
        {detailData?.tagline && <h4>" {detailData?.tagline} "</h4>}
        <p>{detailData?.overview}</p>
      </DescriptionBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`;

const GenreBox = styled.div`
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
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AdditionInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.gray.lighter};
  & > div:first-child {
    border: 1px solid ${(props) => props.theme.gray.lighter};
    padding: 5px;
    border-radius: 5px;
  }
`;

const StarRatingBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;

  & > span:last-child {
    font-size: 0.8rem;
  }
`;

const DescriptionBox = styled.div`
  h4 {
    font-size: 1.2rem;
    margin-bottom: 1.3rem;
  }
  p {
    line-height: 1.6;
  }
`;
