import { AnimatePresence } from "framer-motion";
import { useRecoilValue } from "recoil";
import { keywordState, searchResultState } from "../../recoil/atom";
import { searchResultSelector } from "../../recoil/selector";
import styled from "styled-components";
import SliderBox from "../Slider/SliderBox";
import { IData } from "../../types/data";
import React from "react";
const Results = styled.div`
  display: grid;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(15%, auto));
`;

interface ISearchList {
  type: string;
}

function SearchList({ type }: ISearchList) {
  const totalResult = useRecoilValue(searchResultState);
  const filteredResult = useRecoilValue(searchResultSelector(type));
  const keyword = useRecoilValue(keywordState);

  return (
    <>
      <p>" {keyword} " 에 대한 검색결과입니다.</p>
      <Results>
        {filteredResult.length != 0 ? (
          filteredResult.map((item: IData) => (
            <SliderBox
              key={item.id}
              field={item.media_type! + "s"}
              data={item}
              listType=""
              keyword={keyword}
              isTotalType={type == "total" ? true : false}
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
