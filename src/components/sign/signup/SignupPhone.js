// 회원가입 본인인증 (1)

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignVerification from "../SignVerification";

function Signup_phone({ setMode, name, setName, phone, setPhone }) {
  const navigate = useNavigate();
  const [certi, setCerti] = useState("");

  // 다음 버튼
  const nextClick = () => {
    if (name === "") {
      alert("이름을 입력해주세요");
      return false;
    } else if (phone === "") {
      alert("전화번호를 입력해주세요");
      return false;
    } else if (certi === "") {
      alert("인증번호를 입력해주세요");
      return false;
    }

    axios
      .post("/findid", {
        name: name,
        phone: phone
      })
      .then((res) => {
        if (res.data !== "") {
          alert("이미 등록된 사용자입니다.");
          navigate("/login");
        } else {
          setMode(2);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <div className="Sign_wrap Signup_Phone_wrap">
      <div className="Sign_header Signup_header">회원가입</div>
      <div className="Signup_sub">
        <span className="Signup_sub_text Signup_sub_text_main">01 본인인증</span>
        <span className="Signup_sub_text">02 정보입력</span>
        <span className="Signup_sub_text">03 약관동의</span>
        <span className="Signup_sub_text">04 가입완료</span>
      </div>
      <SignVerification name={name} setName={setName} phone={phone} setPhone={setPhone} certi={certi} setCerti={setCerti} />
      <div className="Sign_btn" onClick={nextClick}>다음</div>
    </div>
  );
}

export default Signup_phone;
