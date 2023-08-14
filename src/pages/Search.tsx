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
import { keywordState, searchResultState } from "../recoil/atom";
import { toggleButtonClicked } from "../utils/toggleButton";
import useDebounce from "../hooks/useDebounce";
import SliderBox from "../Components/Slider/SliderBox";

const Wrapper = styled.div`
  height: 100vh;
  margin: 10vh;
  padding-top: 5vh;
  p {
    margin-bottom: 25px;
  }
`;

const Form = styled.form``;

const Input = styled.input`
  width: 300px;
  color: ${(props) => props.theme.white.lighter};
  background-color: rgba(20, 20, 20, 0.9);
  font-size: 20px;
  border: 1px solid ${(props) => props.theme.white.lighter};
  padding: 10px;
  margin-bottom: 25px;
`;

const FieldButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  /* gap: 10px; */
  margin-bottom: 20px;
  button {
    border: 1px solid ${(props) => props.theme.white.lighter};
    color: ${(props) => props.theme.white.lighter};
    padding: 4px 0px;
    background-color: rgba(20, 20, 20, 0.9);
    &:active {
      background-color: #bdc3c7;
    }
  }
  .actived {
    background-color: #bdc3c7;
  }
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

function Search() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const [totalResult, setTotalResult] = useRecoilState(searchResultState);
  const [selectedType, setSelectedType] = useState("movies");
  const debouncedKeyword = useDebounce({ value: keyword, delay: 300 });
  const onKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    navigate(`/search/${selectedType}?keyword=${e.target.value}`);
  };

  const getKeywordResults = async (keyword: string) => {
    const response = await getSearch(keyword);
    setTotalResult(response);
    console.log(response);
  };

  const onFieldButtonClicked = (field: string) => {
    const clickedType = document.getElementById(field);
    setSelectedType(clickedType!.id);
    navigate(`/search/${clickedType?.id}?keyword=${keyword}`);
    toggleButtonClicked(clickedType!.id);
  };

  useEffect(() => {
    if (debouncedKeyword) {
      getKeywordResults(debouncedKeyword);
    } else {
      setTotalResult(null);
    }
  }, [debouncedKeyword]);

  return (
    <Wrapper>
      <Form>
        <Input type="text" value={keyword} onChange={onKeywordChange} />
      </Form>
      <p>" {debouncedKeyword} " 에 대한 검색결과입니다.</p>
      <FieldButtons>
        <button
          id="movies"
          className="actived"
          onClick={() => onFieldButtonClicked("movies")}
        >
          영화
        </button>
        <button id="tvs" onClick={() => onFieldButtonClicked("tvs")}>
          시리즈
        </button>
      </FieldButtons>
      <AnimatePresence>
        {totalResult ? (
          <Results>
            {totalResult.results
              .filter(
                (item: IData) => item.media_type == selectedType.slice(0, -1)
              )
              .map((item) => (
                <SliderBox field={selectedType} data={item} listType="" />
              ))}
          </Results>
        ) : (
          <div>검색 결과가 없습니다</div>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Search;
