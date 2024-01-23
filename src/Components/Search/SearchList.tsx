import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { keywordState } from "../../recoil/atom";
import { searchResultSelector } from "../../recoil/selector";
import { ISearchList } from "../../types/component";
import { IData } from "../../types/data";
import SliderBox from "../Slider/SliderBox";

const Results = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
`;

function SearchList({ type }: ISearchList) {
  const filteredResult = useRecoilValue(searchResultSelector(type));
  const keyword = useRecoilValue(keywordState);

  return (
    <>
      <p>" {keyword} " 에 대한 검색결과입니다.</p>
      <Results>
        {filteredResult.length !== 0 ? (
          filteredResult.map((item: IData) => (
            <SliderBox
              key={item.id}
              field={item.media_type! + "s"}
              data={item}
              listType=""
              keyword={keyword}
              isTotalType={type === "total" ? true : false}
            />
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </Results>
    </>
  );
}

export default React.memo(SearchList);
