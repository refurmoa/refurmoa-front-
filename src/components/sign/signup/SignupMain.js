import React from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import google from "../../../images/google_logo-150.png";
import kakao from "../../../images/kakao_logo-150.png";
import naver from "../../../images/naver_logo-150.png";
// id, password, passwordChk(비밀번호확인), name, tel 기본값 호출
function Signup_main(props) {
  // 제출버튼을 누르면 변경된 파라미터 값 전달함(추후 수정 필요)
  const setMode = props.setMode;

  const onClick = () => {
    setMode(1);
  };
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
          <div className="SU_Main_header">회원가입</div>

          <div>
            <button className="SU_Nomal_btn" onClick={onClick}>
              일반 회원가입
            </button>
          </div>

          <div>
            <hr className="signup_line" />
          </div>

          <div className="SU_Signup_social">소셜계정으로 회원가입</div>
          <div className="SU_social_btn">
            <button type="button" className="SU_naver">
              <a href={naver_api_url}>
                <img src={naver} alt="naver" />
              </a>
            </button>
            <button type="button" className="SU_kakao">
              <a href={kakao_api_url}>
                <img src={kakao} alt="kakao" className="SU_kakao_img" />
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
