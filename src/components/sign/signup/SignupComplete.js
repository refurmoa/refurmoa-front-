import React from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import Logo_com from "../../../images/signup.png";
// id, password, passwordChk(비밀번호확인), name, tel 기본값 호출
function Signup_complete() {
  // 제출버튼을 누르면 변경된 파라미터 값 전달함(추후 수정 필요)
  const name = window.sessionStorage.getItem("name");
  const id = window.sessionStorage.getItem("id");
  const onClick = () => {
    window.sessionStorage.clear();
  };

  return (
    <>
      <wrap>
        <form className="Signup_compelte_form">
          <div className="SU_Main_header">회원가입</div>
          <div className="SU_sub_header">
            01 본인인증 &nbsp;&nbsp; 02 정보입력 &nbsp;&nbsp; 03 약관동의
            &nbsp;&nbsp; <n className="SU_pro_now">04 가입완료</n>
          </div>

          <div>
            <img className="Signup_logo" src={Logo_com} alt="Logo_com" />
          </div>
          <div className="signup_info">
            {name}({id})
            <span className="info_detail">
              {" "}
              님의 회원가입이
              <br />
              성공적으로 완료되었습니다.
            </span>
          </div>
          <div className="signup_detail">
            * 회원가입 내역 확인 및 수정은
            <br />
            <b>마이페이지 &gt; 개인정보수정</b>에서 가능합니다.
          </div>
          <Link to="/login">
            <button className="SU_input_btn" onClick={onClick}>
              로그인 하러 가기
            </button>
          </Link>
        </form>
      </wrap>
    </>
  );
}

export default Signup_complete;
