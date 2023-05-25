// 로그인 페이지

import "./Login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Find from "./LoginFind";
import naver from "../../../images/naver_logo-150.png";
import kakao from "../../../images/kakao_logo-150.png";
import google from "../../../images/google_logo-150.png";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const [idModal, setIdModal] = useState(false); // ID 찾기 모달
  const [pwModal, setPwModal] = useState(false); // PW 찾기 모달

  // 로그인
  const LoginClick = () => {
    if (id === "") {
      alert("아이디를 입력해주세요");
      return false;
    } else if (password === "") {
      alert("비밀번호를 입력해주세요");
      return false;
    }

    axios
      .post("/login", {
        member_id: id,
        password: password,
      })
      .then((res) => {
        if (res.data === 1) {
          window.sessionStorage.setItem("id", id);
          if (id === "admin") navigate(-1);
          else document.location.href = "/";
        } else {
          alert("아이디, 비밀번호를 확인해주세요.");
          return false;
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // API URL
  const naver_api_url =
    "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
    process.env.REACT_APP_NAVER_CLIENT_ID +
    "&redirect_uri=" +
    encodeURI(process.env.REACT_APP_NAVER_CALLBACK_URI) +
    "&state=" +
    Math.random().toString(36).substr(3, 14);

  const kakao_api_url = `https://kauth.kakao.com/oauth/authorize?client_id=${
    process.env.REACT_APP_KAKAO_REST_API_KEY
  }&redirect_uri=${encodeURI(
    process.env.REACT_APP_KAKAO_CALLBACK_URI
  )}&response_type=code`;


  return (
    <div className="Login_wrap">
      <div className="Login_header">로그인</div>

      {/* 로그인 폼 */}
      <div className="Login_form">
        <div className="Login_form_line">
          <label className="Login_form_text" htmlFor="id">아이디</label>
          <input className="Login_input"
            name="id" type="text" placeholder="아이디" maxLength="15"
            value={id} onChange={(e)=>setId(e.target.value)} />
        </div>
        <div className="Login_form_line">
          <label className="Login_form_text" htmlFor="password">비밀번호</label>
          <input className="Login_input"
            name="password" type="password" maxLength="20" placeholder="비밀번호"
            value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
      </div>
      <div className="Login_btn" onClick={LoginClick}>LOGIN</div>

      {/* ID 찾기, PW 찾기, 회원가입 */}
      <div className="Login_detail">
        <span className="Login_detail_text" onClick={() => {setIdModal(true)}}>아이디 찾기</span>
        <span className="Login_detail_text">|</span>
        <span className="Login_detail_text" onClick={() => {setPwModal(true)}}>비밀번호 찾기</span>
        <span className="Login_detail_text">|</span>
        <Link to="/signup" className="Login_detail_text">회원가입</Link>
      </div>

      {/* ID, PW 찾기 모달 창*/}
      { idModal &&
        <div className="Login_modal_overlay">
          <div className="Login_modal">
            <Find modal="id" setModal={setIdModal} />
          </div>
        </div>
      }
      { pwModal &&
        <div className="Login_modal_overlay">
          <div className="Login_modal">
            <Find modal="pw" setModal={setPwModal} />
          </div>
        </div>
      }

      {/* 소셜 로그인 */}
      <div className="Login_social">
        <Link to={naver_api_url} className="Login_social_btn">
          <img className="Login_social_logo" src={naver} alt="naver" />
        </Link>
        <Link to={kakao_api_url} className="Login_social_btn">
            <img className="Login_social_logo" src={kakao} alt="kakao" />
        </Link>
        <Link href="" className="Login_social_btn">
        <img className="Login_social_logo" src={google} alt="google" />
        </Link>
      </div>
    </div>
  );
}

export default Login;
