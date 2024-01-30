import { useState } from "react";
import styled from "styled-components";
import { Itype } from "../../types/data";
import { useRecoilState } from "recoil";
import { keywordState } from "../../recoil/atom";
import { useNavigate } from "react-router-dom";
import { ISearchListInput } from "../../types/component";

export default function SearchListInput({
  selectedType,
  setSelectedType,
}: ISearchListInput) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const [inputKeyword, setInputKeyword] = useState(keyword);

  const typeList = [
    { name: "전체", type: "total" },
    { name: "영화", type: "movies" },
    { name: "시리즈", type: "tvs" },
  ];

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

  return (
    <SearchListInputLayout>
      <SearchListFilterBox>
        <button onClick={onChangeIsExpanded}>{selectedType.name + "▾"}</button>
        {isExpanded && (
          <ExpandedButtons onClick={onChangeIsExpanded}>
            {typeList.map((type) => (
              <button key={type.type} onClick={() => onChangeSearchType(type)}>
                {type.name}
              </button>
            ))}
          </ExpandedButtons>
        )}
      </SearchListFilterBox>
      <Input
        type="text"
        value={inputKeyword}
        onChange={onInputKeywordChange}
        onKeyDown={handleOnEnterPress}
      />
    </SearchListInputLayout>
  );
}

const SearchListInputLayout = styled.div`
  position: relative;
`;

const SearchListFilterBox = styled.div`
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
