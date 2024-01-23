import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Modal from "../Components/Modal/Modal";
import SearchList from "../Components/Search/SearchList";
import { getSearch } from "../apis/api";
import { isModalState, keywordState, searchResultState } from "../recoil/atom";
import { Itype } from "../types/data";

const Wrapper = styled.div`
  margin: 10vh;
  padding-top: 5vh;
  p {
    margin-bottom: 30px;
  }
`;

const Form = styled.div`
  position: relative;
`;

const Input = styled.input`
  position: absolute;
  left: 70px;
  width: 300px;
  color: ${(props) => props.theme.white.lighter};
  background-color: rgba(20, 20, 20, 0.9);
  font-size: 20px;
  border: 1px solid ${(props) => props.theme.white.lighter};
  padding: 10px;
  border-radius: 5px;
`;

const TypeButtons = styled.div`
  position: absolute;
  top: 10px;
  > :first-child {
    border-radius: 5px;
  }
  button {
    border: 0.5px solid ${(props) => props.theme.white.lighter};
    width: 60px;
    padding: 5px 0;
    cursor: pointer;
    background-color: ${(props) => props.theme.black.darker};
    color: ${(props) => props.theme.white.lighter};
  }
`;

const ExpandedButtons = styled.div`
  margin-top: 2px;
  display: flex;
  flex-direction: column;
  button:first-child {
    border-radius: 5px 5px 0 0;
  }
  button:last-child {
    border-radius: 0 0 5px 5px;
  }
`;

const ResultBody = styled.div`
  margin-top: 70px;
`;

const typeList = [
  { name: "전체", type: "total" },
  { name: "영화", type: "movies" },
  { name: "시리즈", type: "tvs" },
];

function Search() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const [inputKeyword, setInputKeyword] = useState(keyword);
  const [totalResult, setTotalResult] = useRecoilState(searchResultState);
  const [selectedType, setSelectedType] = useState({
    name: "전체",
    type: "total",
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const isModal = useRecoilValue(isModalState);

  const onChangeIsExpanded = () => setIsExpanded(!isExpanded);

  const onChangeSearchType = (type: Itype) => {
    const url = type.type === "total" ? "" : `/${type.type}`;
    setSelectedType(type);
    navigate(`/search${url}?keyword=${keyword}`);
  };

  const onInputKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(e.target.value);
  };

  const handleOnSubmit = () => {
    setKeyword(inputKeyword);
    setSelectedType({
      name: "전체",
      type: "total",
    });
    navigate(`/search?keyword=${inputKeyword}`);
  };

  const handleOnEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      handleOnSubmit();
    }
  };

  const getKeywordResults = async (keyword: string) => {
    const response = await getSearch(keyword);
    setTotalResult(response);
  };

  useEffect(() => {
    if (keyword) {
      getKeywordResults(keyword);
      setInputKeyword(keyword);
    } else {
      setTotalResult(null);
    }

    setSelectedType({
      name: "전체",
      type: "total",
    });
  }, [keyword, getKeywordResults, setTotalResult]);

  return (
    <Wrapper>
      <Form>
        <TypeButtons>
          <button onClick={onChangeIsExpanded}>
            {selectedType.name + "▾"}
          </button>
          {isExpanded && (
            <ExpandedButtons onClick={onChangeIsExpanded}>
              {typeList.map((type) => (
                <button
                  key={type.type}
                  onClick={() => onChangeSearchType(type)}
                >
                  {type.name}
                </button>
              ))}
            </ExpandedButtons>
          )}
        </TypeButtons>
        <Input
          type="text"
          value={inputKeyword}
          onChange={onInputKeywordChange}
          onKeyDown={handleOnEnterPress}
        />
      </Form>
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
