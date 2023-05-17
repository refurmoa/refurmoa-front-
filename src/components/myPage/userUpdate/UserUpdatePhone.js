import React from "react";
import "../../sign/signup/Signup.css";
import { Link } from "react-router-dom";

import { useRef, useState } from "react";

const Update_phone = (props) => {
  const name = props.name;
  const setPhone = props.setPhone;
  const setPhone_Mdoal = props.setPhone_Modal;
  const certi = useRef();

  const onChangePhone = (e) => {
    setPhone_Mdoal(false);
  };

  return (
    <>
      <form classname="SU_phone_form">
        <div className="SU_Main_header">전화 번호 변경</div>
        <div className="SU_phone_form">
          <table className="SU_phone_input">
            <tr>
              <td>이름</td>
              <td>
                <input
                  className="input_normal"
                  name="name"
                  type="text"
                  placeholder="이름"
                  maxLength="10"
                  value={name}
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
                  maxLength="15"
                  size="15"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <button className="SU_cert_num">인증번호 전송</button>
                <hr className="SU_phone_line" />
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>
                <input type="text" placeholder="인증번호 입력" ref={certi} />
                <hr className="SU_phone_line" />
              </td>
            </tr>
          </table>
        </div>
        <div className="signup_information">
          본인인증 시 제공되는 정보는 해당 인증기관에서 직접 수집하며,
          <br />
          인증 이외의 용도로 이용 또는 저장되지 않습니다.
        </div>
        <div className="UU_button_div">
          <button className="UU_input_btn" onClick={onChangePhone}>
            변경
          </button>
        </div>
      </form>
    </>
  );
};

export default Update_phone;
