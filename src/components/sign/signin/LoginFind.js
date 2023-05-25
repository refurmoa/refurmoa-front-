// ID, PW 찾기 모달

import React, { useState } from "react";
import cancel from "../../../images/cancel.png";

const LoginFind = (props) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [certi, setCerti] = useState("");

  // 인증번호 전송
  const certifyClick = {

  }

  // ID, PW 찾기
  const findLogin = {
    
  }
  
  /*
  axios
        .get("/findpw", {
          name: name,
          id:id
          phone: phone,
        })
        .then((res) => {
          if (res.data === 1) {
            alert("{name}님의 비밀번호 : {res.data}");
          } else {
            alert("해당 정보는 존재하지 않습니다!");
          }
        })
        .catch((e) => {
          console.error(e);
        });

  */

  
  return (
    <div className="Login_find_wrap">
      <div className="Login_header">{props.modal === "id" ? "아이디 찾기" : "비밀번호 찾기"}</div>
      { props.modal === "pw" &&
        <div className="Login_form_line">
          <label className="Login_form_text" htmlFor="id">아이디</label>
          <input className="Login_input"
            name="id" type="text" placeholder="아이디" maxLength="15"
            value={id} onChange={(e) => setId(e.target.value)} />
        </div>
      }
      <div className="Login_form_line">
        <label className="Login_form_text" htmlFor="name">이름</label>
        <input className="Login_input"
          name="name" type="text" placeholder="이름" maxLength="10"
          value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="Login_form_line Login_phone_line">
        <label className="Login_form_text" htmlFor="phone">전화번호</label>
        <input className="Login_input Login_phone"
          name="phone" type="text" placeholder="전화번호" maxLength="15"
          value={phone} onChange={(e) => setPhone(e.target.value)} />
        <span className="Login_phone_btn" onClick={certifyClick}>인증번호 전송</span>
      </div>
      <div className="Login_form_line Login_phone_line">
        <input className="Login_input"
          name="phone" type="text" placeholder="인증번호 입력" maxLength="15"
          value={certi} onChange={(e) => setCerti(e.target.value)} />
      </div>
      <div className="Login_indivation">
        <span className="Login_indivation_left">∙</span>
        <span className="Login_indivation_right">
          본인인증 시 제공되는 정보는 해당 인증기관에서 직접 수집하며,
          <br />
          인증 이외의 용도로 이용 또는 저장되지 않습니다.
        </span>
      </div>
      <div className="Login_btn" onClick={findLogin}>{props.modal === "id" ? "아이디 찾기" : "비밀번호 찾기"}</div>
      <img className="Login_modal_close" alt="창 닫기" src={cancel} onClick={() => {props.setModal(false);}} />
    </div>
  );
};

export default LoginFind;
