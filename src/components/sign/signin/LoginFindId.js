import React from "react";
import "../signup/Signup.css";
import { Link } from "react-router-dom";

import { useRef, useState } from "react";

const LoginFindId = (props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [certi, setCerti] = useState("");
  const setMdoal = props.setModal;
  const onChangeID = (e) => {
    setMdoal(false);
  };
  /*
  axios
        .get("/findid", {
          name: name,
          phone: phone,
        })
        .then((res) => {
          if (res.data === 1) {
            alert("{name}님의 ID : {res.data}");
          } else {
            alert("해당 정보의 아이디는 존재하지 않습니다! 아이디 입니다!");
          }
        })
        .catch((e) => {
          console.error(e);
        });

  */
  return (
    <>
      <div classname="SU_phone_div">
        <div className="LG_Find_header">ID 찾기</div>
        <div className="SU_phone_div">
          <table className="SU_Find_input">
            <tr>
              <td>이름</td>
              <td>
                <input
                  className="input_normal"
                  name="name"
                  type="text"
                  placeholder="이름"
                  maxLength="10"
                  onChange={(e) => setName(e.target.value)}
                />
                <hr className="SU_phone_line" />
              </td>
            </tr>
            <tr>
              <td>전화번호</td>
              <td>
                <input
                  className="input_phone"
                  name="phone"
                  type="text"
                  placeholder="전화번호"
                  size="15"
                  maxLength="15"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <button className="SU_cert_num">인증번호 전송</button>
                <hr className="SU_phone_line" />
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>
                <input
                  type="text"
                  placeholder="인증번호 입력"
                  onChange={(e) => setCerti(e.target.value)}
                />
                <hr className="SU_phone_line" />
              </td>
            </tr>
          </table>
        </div>
        <div className="signup_indivation">
          본인인증 시 제공되는 정보는 해당 인증기관에서 직접 수집하며,
          <br />
          인증 이외의 용도로 이용 또는 저장되지 않습니다.
        </div>
        <div className="UU_button_div">
          <button className="UU_input_btn">ID 찾기</button>
        </div>
      </div>
    </>
  );
};

export default LoginFindId;
