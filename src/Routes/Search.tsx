import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useMatch } from "react-router";
import styled from "styled-components";
import { getSearch, IGetDataResult } from "../api";
import { motion, AnimatePresence } from "framer-motion";
import { makeImagePath } from "../utils/makePath";
import { useForm } from "react-hook-form";
import { IForm } from "../Components/Header";
import { useState } from "react";
import Modal from "../Components/Modal";

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
    padding: 3px;
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
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { register, handleSubmit } = useForm<IForm>({
    defaultValues: { keyword: `${keyword}` },
  });
  const navigate = useNavigate();
  const modalMatch = useMatch(`/search/:mediaType/:dataId`);

  const onValid = (data: IForm) => {
    navigate(`/search?keyword=${data.keyword}`);
  };

  const onFieldButtonClicked = (field: string) => {
    const mediaType = document.getElementById(field);

    navigate(`/search/${mediaType?.id}?keyword=${keyword}`);
    mediaType?.classList.toggle("actived");
    console.log(mediaType?.classList);
    console.log(document.getElementsByTagName("button"));
    toggleButtonClicked(mediaType!.id);
  };

  const toggleButtonClicked = (mediaType: string) => {
    const btns = document.getElementsByTagName("button");
    console.log(typeof btns);
    // for (btn of btns){

    // }
  };

  const onBoxClicked = async (dataId: number, mediaType: string) => {
    await navigate(`/search/${mediaType}/${dataId}?keyword=${keyword}`);
  };

  const { isLoading, data } = useQuery<any>(["search", keyword], () => {
    if (keyword) return getSearch(keyword);
    return null;
  });

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input {...register("keyword", { required: true, minLength: 1 })} />
      </Form>
      <p>" {keyword} " 에 대한 검색결과입니다.</p>
      <FieldButtons>
        <button id="movies" onClick={() => onFieldButtonClicked("movies")}>
          영화
        </button>
        <button id="tvs" onClick={() => onFieldButtonClicked("tvs")}>
          시리즈
        </button>
        <button id="persons" onClick={() => onFieldButtonClicked("persons")}>
          인물
        </button>
      </FieldButtons>
      <AnimatePresence>
        <Results>
          {data?.results.map((item: any) => (
            <Box
              variants={boxVariants}
              initial="normal"
              whileHover="hover"
              transition={{ type: "tween" }}
              bgPhoto={makeImagePath(item.backdrop_path, "w500")}
              onClick={() => onBoxClicked(item.id, item.media_type + "s")}
            >
              <Info variants={infoVariants}>
                <h4>
                  {item.title && item.title}
                  {item.name && item.name}
                </h4>
              </Info>
            </Box>
          ))}
        </Results>
      </AnimatePresence>
      <AnimatePresence>
        {modalMatch ? (
          <Modal
            dataId={modalMatch.params.dataId!}
            listType={modalMatch.params.mediaType!}
            field={modalMatch.params.mediaType!}
            keyword={keyword || ""}
          />
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Search;
