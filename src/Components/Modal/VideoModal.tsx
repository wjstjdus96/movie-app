import styled from "styled-components";
import { IVideoModal } from "../../types/component";
import { VideoModalHead } from "./VideoModalHead";
import { VideoModalMainInfo } from "./VideoModalMainInfo";
import { VideoModalRelated } from "./VideoModalRelated";

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
        {relatedData.results.length !== 0 && (
          <VideoModalRelated
            relatedData={relatedData.results}
            field={field}
            keyword={keyword}
          />
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
  @media all and (max-width: 767px) {
    padding: 0 1.5rem;
  }
`;
