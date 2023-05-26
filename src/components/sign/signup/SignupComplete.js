// 회원가입 완료 (4)

import React from "react";
import { Link } from "react-router-dom";
import complete_icon from "../../../images/signup_check_icon-240.png";

function Signup_complete(props) {

  return (
    <div className="Sign_wrap Signup_Complete_wrap">
      <div className="Sign_header Signup_header">회원가입</div>
      <div className="Signup_sub">
        <span className="Signup_sub_text">01 본인인증</span>
        <span className="Signup_sub_text">02 정보입력</span>
        <span className="Signup_sub_text">03 약관동의</span>
        <span className="Signup_sub_text Signup_sub_text_main">04 가입완료</span>
      </div>
      <div className="Signup_icon_wrap">
        <img className="Signup_icon" src={complete_icon} alt="회원가입 완료" />
      </div>
      <div className="Signup_complete_text">
        <span>{props.name}({props.id})</span>님의 회원가입이
        <br/>
        성공적으로 완료되었습니다.
      </div>
      <div className="Signup_detail_text">
        * 회원가입 내역 확인 및 수정은
        <br />
        <b>마이페이지 &gt; 개인정보수정</b>에서 가능합니다.
      </div>
      <Link to="/login" className="Sign_btn Sign_complete_btn">로그인 하러 가기</Link>
    </div>
  );
}

export default Signup_complete;
