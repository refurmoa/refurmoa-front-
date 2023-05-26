// 회원가입 메인 (0)

import React from "react";
import { Link } from "react-router-dom";
import naver from "../../../images/naver_logo-150.png";
import kakao from "../../../images/kakao_logo-150.png";
import google from "../../../images/google_logo-150.png";

function Signup_main(props) {

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
    <div className="Sign_wrap Signup_Main_wrap">
      <div className="Sign_header Signup_Main_header">회원가입</div>
      <div className="Signup_Main_btn" onClick={() => {props.setMode(1);}}>일반 회원가입</div>
      <hr className="Signup_Main_line" />

      {/* 소셜 로그인 */}
      <div className="Signup_Main_social">소셜계정으로 회원가입</div>
      <div className="Sign_social Signup_Main_social">
        <Link to={naver_api_url} className="Sign_social_btn">
          <img className="Sign_social_logo" src={naver} alt="naver" />
        </Link>
        <Link to={kakao_api_url} className="Sign_social_btn">
            <img className="Sign_social_logo" src={kakao} alt="kakao" />
        </Link>
        <Link to="" className="Sign_social_btn">
        <img className="Sign_social_logo" src={google} alt="google" />
        </Link>
      </div>
    </div>
  );
}

export default Signup_main;
