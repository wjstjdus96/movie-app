import styled from "styled-components";

export function DetailYear({ year }: { year: string }) {
  return <Wrapper>{year}</Wrapper>;
}

const Wrapper = styled.div`
  border: 1px solid white;
  border-radius: 4px;
  padding: 2px 4px;
  font-size: 0.6rem;
`;
