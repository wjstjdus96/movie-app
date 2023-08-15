import { useQueries, useQuery, useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate, useMatch } from "react-router";
import styled from "styled-components";
import { getSearch } from "../apis/api";
import { motion, AnimatePresence } from "framer-motion";
import { makeImagePath } from "../utils/makePath";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { IForm } from "../types/component";
import { IData, IGetDataResult } from "../types/data";
import { useSearchQuery } from "../hooks/useSearchQuery";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchResultSelector } from "../recoil/selector";
import { isModalState, keywordState, searchResultState } from "../recoil/atom";
import { toggleButtonClicked } from "../utils/toggleButton";
import useDebounce from "../hooks/useDebounce";
import SliderBox from "../Components/Slider/SliderBox";
import SearchList from "../Components/Search/SearchList";
import { useRef } from "react";
import Modal from "../Components/Modal/Modal";

const Wrapper = styled.div`
  height: 100vh;
  margin: 10vh;
  padding-top: 5vh;
  p {
    margin-bottom: 30px;
  }
`;

const Form = styled.div`
  position: relative;
  margin-bottom: 25px;
`;

const Input = styled.input`
  width: 300px;
  color: ${(props) => props.theme.white.lighter};
  background-color: rgba(20, 20, 20, 0.9);
  font-size: 20px;
  border: 1px solid ${(props) => props.theme.white.lighter};
  padding: 10px;
`;

const TypeButtons = styled.div`
  position: absolute;
  top: 10px;
  left: 320px;
`;

const ExpandedButtons = styled.div`
  margin-top: 2px;
  display: flex;
  flex-direction: column;
`;

const Results = styled.div`
  display: grid;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(15%, auto));
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  width: 227px;
  height: 128px;
  min-height: 100%;
  background-image: url(${(prop) => prop.bgPhoto});
  border-radius: 3px;
  background-size: cover;
  background-position: center center;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 5px;
  border-radius: 0 0 5px 5px;
  background-color: ${(props) => props.theme.modal.background};
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 12px;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duration: 0.2,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    backgroundcolor: "rgba(0,0,0,1)",
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: "tween",
    },
  },
};

const typeList = [
  { name: "전체", type: "total" },
  { name: "영화", type: "movies" },
  { name: "시리즈", type: "tvs" },
];

interface Itype {
  name: string;
  type: string;
}

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
  const [isModal, setIsModal] = useRecoilState(isModalState);

  const onChangeIsExpanded = () => setIsExpanded(!isExpanded);

  const onChangeSearchType = (type: Itype) => {
    const url = type.type == "total" ? "" : `/${type.type}`;
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
    if (e.code == "Enter") {
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
    } else {
      setTotalResult(null);
    }

    setSelectedType({
      name: "전체",
      type: "total",
    });
  }, [keyword]);

  return (
    <Wrapper>
      <Form>
        <Input
          type="text"
          value={inputKeyword}
          onChange={onInputKeywordChange}
          onKeyDown={handleOnEnterPress}
        />
        <TypeButtons>
          <button onClick={onChangeIsExpanded}>{selectedType.name}</button>
          {isExpanded && (
            <ExpandedButtons onClick={onChangeIsExpanded}>
              {typeList.map((type, idx) => (
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
      </Form>
      {totalResult ? (
        <>
          <AnimatePresence>
            <SearchList key="searchList" type={selectedType.type} />
          </AnimatePresence>
        </>
      ) : (
        <p>검색어를 입력해주세요</p>
      )}
      {isModal && <Modal />}
    </Wrapper>
  );
}

export default Search;
