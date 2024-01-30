import styled from "styled-components";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { IForm } from "../../types/component";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { keywordState } from "../../recoil/atom";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function HeaderSearch() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [searchOpen, setSearchOpen] = useState(false);
  const setKeyword = useSetRecoilState(keywordState);
  const navigate = useNavigate();
  const openSearch = () => setSearchOpen((prev) => !prev);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const onValid = (data: IForm) => {
    setKeyword(data.keyword);
    setSearchOpen(false);
    setValue("keyword", "");
    navigate(`/search?keyword=${data.keyword}`);
  };

  const searchIconAnimationValue = isMobile
    ? { x: searchOpen ? -143 : 0 }
    : { x: searchOpen ? -225 : 0 };

  return (
    <HeaderSearchLayout onSubmit={handleSubmit(onValid)}>
      <motion.div
        onClick={openSearch}
        animate={searchIconAnimationValue}
        transition={{ type: "linear" }}
      >
        <FaSearch />
      </motion.div>
      <SearchInput
        {...register("keyword", { required: true, minLength: 1 })}
        placeholder="검색어를 입력하세요"
        transition={{ type: "linear" }}
        animate={{ scaleX: searchOpen ? 1 : 0 }}
      />
    </HeaderSearchLayout>
  );
}

const HeaderSearchLayout = styled(motion.form)`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchInput = styled(motion.input)`
  @media all and (max-width: 767px) {
    width: 170px;
    padding: 8px;
    padding-left: 40px;
  }
  width: 250px;
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 10px;
  padding-left: 40px;
  z-index: -1;
  color: ${(props) => props.theme.white.lighter};
  font-size: 12px;
  background-color: rgba(20, 20, 20, 0.9);
  border: 1px solid ${(props) => props.theme.white.lighter};
`;
