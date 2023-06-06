// ID, PW 찾기 모달

import React, { useState } from "react";
import axios from "axios";
import SignVerification from "../SignVerification";
import cancel from "../../../images/cancel.png";
import { useEffect } from "react";

const LoginFind = (props) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [certiChk, setCertiChk] = useState(false);
  const [certi, setCerti] = useState(false);

  useEffect(() => {
    if (certi) props.modal === "id" ? findID() : findPW();
  }, [certi]);
  
  // ID, PW 찾기 버튼 클릭 시
  const findLogin = () => {
    if (props.modal === "pw" && id === "") {
      alert("아이디를 입력해주세요");
    } else if (name === "") {
      alert("이름을 입력해주세요");
    } else if (phone === "") {
      alert("전화번호를 입력해주세요");
    } else {
      setCertiChk(true);
    }
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
      <div className="Sign_header Login_header">{props.modal === "id" ? "아이디 찾기" : "비밀번호 찾기"}</div>
      { props.modal === "pw" &&
        <div className="Sign_form_line">
          <label className="Sign_form_text" htmlFor="id">아이디</label>
          <input className="Sign_input"
            name="id" type="text" placeholder="아이디" maxLength="15"
            value={id} onChange={(e) => setId(e.target.value)} required />
        </div>
      }
      <SignVerification name={name} setName={setName} phone={phone} setPhone={setPhone} setCerti={setCerti} findLogin={findLogin}certiChk={certiChk} setCertiChk={setCertiChk} />
      <div className="Sign_btn Login_btn" onClick={() => {findLogin()}}>{props.modal === "id" ? "아이디 찾기" : "비밀번호 찾기"}</div>
      <img className="Sign_modal_close" alt="창 닫기" src={cancel} onClick={() => {props.setModal(false);}} />
    </div>
  );
};

export default LoginFind;
