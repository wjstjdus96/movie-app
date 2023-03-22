import { makeImagePath } from "../utils";
import styled from "styled-components";

const Wrapper = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(prop) => prop.bgPhoto});
  background-size: cover;
  & > h2 {
    font-size: 48px;
    margin-bottom: 20px;
  }
  & > p {
    font-size: 18px;
    width: 50%;
    line-height: 150%;
  }
`;

interface IBanner {
  bgPhoto: string;
  title: string;
  overview: string;
}

function Banner({ bgPhoto, title, overview }: IBanner) {
  return (
    <Wrapper bgPhoto={makeImagePath(bgPhoto || "")}>
      <h2>{title}</h2>
      <p>{overview}</p>
    </Wrapper>
  );
}

export default Banner;
