import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Modal from "../Components/Modal/Modal";
import SearchList from "../Components/Search/SearchList";
import SearchListInput from "../Components/Search/SearchListInput";
import { getSearch } from "../apis/api";
import { isModalState, keywordState, searchResultState } from "../recoil/atom";

function Search() {
  const keyword = useRecoilValue(keywordState);
  const [totalResult, setTotalResult] = useRecoilState(searchResultState);
  const [selectedType, setSelectedType] = useState({
    name: "전체",
    type: "total",
  });
  const isModal = useRecoilValue(isModalState);

  useEffect(() => {
    if (keyword) {
      const getKeywordResults = async (keyword: string) => {
        const response = await getSearch(keyword);
        setTotalResult(response);
      };

      getKeywordResults(keyword);
    } else {
      setTotalResult(null);
    }

    setSelectedType({
      name: "전체",
      type: "total",
    });
  }, [keyword, setTotalResult]);

  return (
    <Wrapper>
      <SearchListInput
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      <ResultBody>
        {totalResult ? (
          <>
            <AnimatePresence>
              <SearchList key="searchList" type={selectedType.type} />
            </AnimatePresence>
          </>
        ) : (
          <p>검색어를 입력해주세요</p>
        )}
      </ResultBody>
      {isModal && <Modal />}
    </Wrapper>
  );
}

export default Search;

const Wrapper = styled.div`
  margin: 10vh;
  padding-top: 5vh;
  p {
    margin-bottom: 30px;
  }

  @media all and (max-width: 767px) {
    margin: 5vh 20px;
  }
`;

const ResultBody = styled.div`
  margin-top: 70px;
`;
