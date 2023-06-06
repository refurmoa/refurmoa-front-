import "./Header.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../images/logo-header.svg";
import styled from "styled-components";
import { useRef } from "react";

function Header() {
  const navigate = useNavigate();
  const searchRef = useRef();

  // const login_id = window.sessionStorage.getItem("id");
  const [searchData, setSearchData] = useState(); // 검색어
  const [loginState, setLoginState] = useState();

  useEffect(() => {
    if (sessionStorage.getItem("id") === null) {
      setLoginState("not"); // 비로그인
    } else if (sessionStorage.getItem("id") !== null) {
      if (sessionStorage.getItem("id") === "admin") {
        setLoginState("admin"); // 관리자
      } else {
        setLoginState("user"); // 유저
      }
    }
  }, [sessionStorage.getItem("id")])

  // 검색기능
  const searchHandler = () => {
    // console.log(searchRef.current.value);
    if (searchRef.current.value === "") {
      return alert("검색어를 입력해 주세요.");
    }
    navigate(`/post/${searchRef.current.value}`)
  }

  // 엔터키
  const activeEnter = (e) => {
    if(e.key === "Enter") {
      searchHandler();
    }
  }

  const logoHandler = () => {
    searchRef.current.value = "";
    navigate("/");
  }

  const logoutHandler = () => {
    sessionStorage.clear("id");
    window.location.reload();
  }

  return (
    <HeaderWrapper>
      <Navbar>
        <SearchBar>
          <SearchImg onClick={() => {searchHandler()}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24">
              <path fill="#999999" d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"/>
            </svg>
          </SearchImg>
          <SearchInput>
            <input type="search" ref={searchRef} value={searchData} onChange ={(e)=> setSearchData(e.target.value)} onKeyDown={(e) => {activeEnter(e)}}/>
          </SearchInput>
          
        </SearchBar>
        <Logo onClick={() => {logoHandler()}}/>
        <ProductAndCsAndLoginBox>
          <ProductBox onClick={() => {navigate("/post")}}>상품</ProductBox>
          <CSBox onClick={() => {navigate("/cs/notice")}}>고객센터</CSBox>
          {/* 비로그인 */}
          {loginState === "not" && (
            <LoginBox onClick={() => {navigate("/login")}}>로그인</LoginBox>
          )}
          {/* 로그인(유저) */}
          {loginState === "user" && (
            <>
              <MypageBox onClick={() => {navigate("/mypage")}}>마이페이지</MypageBox>
              <LoginBox onClick={() => {logoutHandler()}}>로그아웃</LoginBox>
            </>
          )}
          {/* 로그인(관리자) */}
          {loginState === "admin" && (
            <>
              <MypageBox onClick={() => {navigate("/admin")}}>관리자페이지</MypageBox>
              <LoginBox onClick={() => {logoutHandler()}}>로그아웃</LoginBox>
            </>
          )}
        </ProductAndCsAndLoginBox>
      </Navbar>
    </HeaderWrapper>
  )
}

export default Header;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 110px;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
  box-sizing: border-box;
  background-color: #FFFFFF;
  border-bottom: 1px solid #B9A89A;
`;

const Navbar = styled.div`
  width: 85%;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  svg {
    margin-top: 15px;
    cursor: pointer;
  }
`;

// 검색창
const SearchBar = styled.div`
  margin: 0px;
  width: 320px;
  height: 30px;
  border-bottom: 1px solid #999999;
  display: flex;
`;
const SearchInput = styled.div`
  width: 84%;
  height: 75%;
  margin: 1px 5px 0px 15px;
  input {
    width: 100%;
    height: 100%;
    font-size: 15px;
    box-sizing: border-box;
    border: none;
  }
  input:focus {
    outline: none;
  }
`;
const SearchImg = styled.div`
  margin: 5px 0px 0px 10px;
  width: 17px;
  height: 17px;
  svg {
    margin-top: 0px;
    width: 100%;
    height: 100%;
    color: #999999;
  }
`;

const ProductAndCsAndLoginBox = styled.div`
  display: flex;
  margin: 0px;
  justify-content: space-between;
`;

const ProductBox = styled.div`
  margin: 0px 15px 0px 0px;
  color: #999999;
  cursor: pointer;
`;

const CSBox = styled.div`
  margin: 0px 15px 0px 0px;
  color: #999999;
  cursor: pointer;
`;

const MypageBox = styled.div`
  margin: 0px 15px 0px 0px;
  color: #999999;
  cursor: pointer;
`;

const LoginBox = styled.div`
  margin: 0px;
  color: #999999;
  cursor: pointer;
`;