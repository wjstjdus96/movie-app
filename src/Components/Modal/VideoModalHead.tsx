import styled from "styled-components";
import { makeImagePath } from "../../utils/makePath";
import { BsPlayFill } from "react-icons/bs";
import { FaPlus, FaRegThumbsUp } from "react-icons/fa";
import { IVideoModalHead } from "../../types/component";

export function VideoModalHead({ bgImage, logoImage, title }: IVideoModalHead) {
  return (
    <Wrapper bgPhoto={makeImagePath(bgImage || "")}>
      <HeadInfoBox>
        {logoImage !== undefined ? (
          <Logo src={makeImagePath(logoImage, "w500")} />
        ) : (
          <TextLogo>{title}</TextLogo>
        )}
        <ButtonsBox>
          <button>
            <BsPlayFill size="28" />
            재생
          </button>
          <ButtonBox>
            <FaPlus size="20" />
          </ButtonBox>
          <ButtonBox>
            <FaRegThumbsUp size="20" />
          </ButtonBox>
        </ButtonsBox>
      </HeadInfoBox>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ bgPhoto: string }>`
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
  position: relative;
`;

const Logo = styled.img`
  width: 13rem;
`;

const TextLogo = styled.div`
  font-size: 3rem;
  font-family: "Oswald, sans-serif";
  font-weight: 900;
  color: white;
  text-shadow: 1px 1px #558abb;
`;

const HeadInfoBox = styled.div`
  position: absolute;
  left: 3rem;
  bottom: 4rem;
`;

const ButtonsBox = styled.div`
  display: flex;
  margin-top: 2rem;
  gap: 0.5rem;
  & > button {
    padding: 8px 30px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 5px;
    border: none;
    font-size: 18px;
    cursor: pointer;
  }
`;

const ButtonBox = styled.div`
  height: 2.8rem;
  width: 2.8rem;
  border: 2px solid ${(props) => props.theme.gray.normal};
  color: ${(props) => props.theme.white.lighter};
  background-color: ${(props) => props.theme.black.veryDark};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    border-color: ${(props) => props.theme.white.lighter};
  }
`;
