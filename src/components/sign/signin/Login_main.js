import React from "react";
import "../Signup/Signup.css";
import "./login.css";
import { Link } from "react-router-dom";
import google from "../images/google.PNG";
import kakao from "../images/kakao.PNG";
import naver from "../images/naver.PNG";
import { useRef, useState, useEffect } from "react";
// id, password, passwordChk(비밀번호확인), name, tel 기본값 호출
function Signup_main() {
  // 제출버튼을 누르면 변경된 파라미터 값 전달함(추후 수정 필요)

  const onClick = () => {
    alert("다음으로 넘어가시겠습니까?");
  };
  const id = useRef();
  const password = useRef();
  let naver_api_url =
    "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
    process.env.REACT_APP_NAVER_CLIENT_ID +
    "&redirect_uri=" +
    encodeURI(process.env.REACT_APP_NAVER_CALLBACK_URI) +
    "&state=" +
    Math.random().toString(36).substr(3, 14);

  let kakao_api_url = `https://kauth.kakao.com/oauth/authorize?client_id=${
    process.env.REACT_APP_KAKAO_REST_API_KEY
  }&redirect_uri=${encodeURI(
    process.env.REACT_APP_KAKAO_CALLBACK_URI
  )}&response_type=code`;
  return (
    <>
      <wrap>
        <form className="Signup_form">
          <div className="LG_Main_header">로그인</div>
          <div className="SU_phone_form">
            <table className="LG_login_input">
              <tr>
                <td>아이디</td>
                <td>
                  <input name="id" type="text" placeholder="아이디" ref={id} />
                  <hr className="SU_phone_line" />
                </td>
              </tr>

              <tr>
                <td>비밀번호</td>
                <td>
                  <input
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                    ref={password}
                  />
                  <hr className="SU_phone_line" />
                </td>
              </tr>
            </table>
          </div>
          <button className="login_btn" onClick={onClick}>
            LOGIN
          </button>
          <div className="login_detail">
            <a>아이디 찾기</a>&nbsp; |&nbsp;<a>비밀번호 찾기</a>&nbsp; |&nbsp;
            <a href="/">회원가입</a>
          </div>
          <div className="SU_social_btn">
            <button type="button" className="SU_naver">
              <a href={naver_api_url}>
                <img src={naver} alt="naver" />
              </a>
            </button>
            <button type="button" className="SU_kakao">
              <a href={kakao_api_url}>
                <img src={kakao} alt="kakao" />
              </a>
            </button>

            <button type="button" className="SU_google">
              <a>
                <img src={google} alt="google" />
              </a>
            </button>
          </div>
        </form>
      </wrap>
    </>
  );
}

export default Signup_main;
