import styled from "styled-components";
import { makeImagePath } from "../../utils/makePath";

export interface ISliderBoxLogo {
  logo: string | undefined;
  title: string;
}

export function SliderBoxLogo({ logo, title }: ISliderBoxLogo) {
  return (
    <Wrapper>
      {logo !== undefined ? (
        <Logo bgPhoto={makeImagePath(logo, "w500")} />
      ) : (
        <TextLogo length={title.length}>{title}</TextLogo>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Logo = styled.img<{ bgPhoto: string }>`
  position: absolute;
  bottom: 10px;
  left: 20px;
  background-size: cover;
  max-width: 70%;
  max-height: 70%;
  content: url(${(prop) => prop.bgPhoto});
`;

const TextLogo = styled.h2<{ length: number }>`
  margin: 0 !important;
  display: flex;
  position: absolute;
  font-family: "Oswald, sans-serif";
  left: 20px;
  bottom: 10px;
  font-size: ${(props) => (props.length > 10 ? "18px" : "25px")} !important;
  width: 80%;
  font-weight: 900;
  text-align: center;
  color: white;
  text-shadow: 1px 1px #558abb;
  align-items: flex-end;
  margin: 0;
`;
