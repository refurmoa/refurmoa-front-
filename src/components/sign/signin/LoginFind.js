// ID, PW 찾기 모달

import React, { useState } from "react";
import axios from "axios";
import cancel from "../../../images/cancel.png";

const LoginFind = (props) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [certi, setCerti] = useState("");

  // 인증번호 전송
  const certifyClick = () => {

  }
  
  // ID, PW 찾기 버튼 클릭 시
  const findLogin = () => {
    if (props.modal === "pw" && id === "") {
      alert("아이디를 입력해주세요");
      return false;
    } else if (name === "") {
      alert("이름을 입력해주세요");
      return false;
    } else if (phone === "") {
      alert("전화번호를 입력해주세요");
      return false;
    } else if (certi === "") {
      alert("인증번호를 입력해주세요");
      return false;
    }
    props.modal === "id" ? findID() : findPW();
  }

  // ID, PW 찾기 성공 팝업 창
  const loginPopup = (res) => {
    const width = 300;
    const height = 200;
    const top = window.innerHeight / 2 - height / 2 + window.screenY;
    const left = window.innerWidth / 2 - width / 2 + window.screenX;
    const popupStyle = `width=${width},height=${height},left=${left},top=${top}`;
  
    const popup = window.open('', '', popupStyle);
    popup.document.write(`
        <html>
            <head>
                <title>${props.modal === "id" ? "아이디 찾기" : "비밀번호 찾기"}</title>
            </head>
            <script>
              function closePopup() {
                window.opener.location.href = "/login";
                window.close();
              }
            </script>
            <body>
              <div style="margin: 25px auto 0; text-align: center;">
                ${props.modal === "id" ? "아이디" : "비밀번호"} 확인 결과
                <br />
                <div style="font-weight: bold; margin: 8px auto 8px;">${res}</div>
                <br />
                로그인 하시겠습니까?
              </div>
              <div style="text-align: center;">
                <button onClick="closePopup()" style="margin: 15px auto; background-color: #B9A89A; color: #FFFFFF; padding: 5px 10px; border: none; cursor: pointer;">
                  확인
                </a>
              </div>
            </body>
        </html>
    `);
    popup.document.close();
  }

  // ID 찾기
  const findID = () => {
    axios
      .post("/findid", {
        name: name,
        phone: phone
      })
      .then((res) => {
        if (res.data === "") {
          alert("입력하신 정보와 일치하는 아이디가 없습니다.");
        } else {
          loginPopup(res.data);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  // PW 찾기
  const findPW = () => {
    axios
      .post("/findpw", {
        memberId: id,
        name: name,
        phone: phone
      })
      .then((res) => {
        if (res.data === null) {
          alert("입력하신 정보와 일치하는 비밀번호가 없습니다.");
        } else {
          console.log(res.data);
          loginPopup(res.data);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  
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
      <div className="Login_btn" onClick={() => {findLogin()}}>{props.modal === "id" ? "아이디 찾기" : "비밀번호 찾기"}</div>
      <img className="Login_modal_close" alt="창 닫기" src={cancel} onClick={() => {props.setModal(false);}} />
    </div>
  );
};

export default LoginFind;
