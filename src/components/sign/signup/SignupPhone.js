import React from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

import { useRef, useState } from "react";

function Signup_phone() {
  const certi = useRef();
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
  });
  const nameInput = useRef();
  const { name, phone } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  /*
  axios
  .post("/signup", {
    name: inputs.name,
    phone:inputs.phone,
  })
  .then((res) => {

  })
  .catch((e) => {
    console.error(e);
  });
  */
  const onClick = () => {
    alert("다음으로 넘어가시겠습니까?");
    if (inputs.name === "" || inputs.phone === "") {
      alert("정보를 모두 입력해 주세요!");

      return false;
    }

    window.sessionStorage.setItem("name", name);
    window.sessionStorage.setItem("phone", phone);
    document.location.href = "/signup/2";
  };

  return (
    <>
      <form className="SU_Phone_form">
        <div className="SU_Main_header">회원가입</div>
        <div className="SU_sub_header">
          <n className="SU_pro_now">01 본인인증 </n>&nbsp;&nbsp; 02 정보입력
          &nbsp;&nbsp; 03 약관동의 &nbsp;&nbsp; 04 가입완료
        </div>
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
                  onChange={onChange}
                  ref={nameInput}
                  value={name}
                />
                <hr className="SU_phone_line" />
              </td>
            </tr>
            <tr>
              <td>전화번호</td>
              <td>
                <input
                  className="SU_input_phone"
                  name="phone"
                  type="text"
                  placeholder="전화번호"
                  size="15"
                  maxLength="15"
                  onChange={onChange}
                  ref={nameInput}
                  value={phone}
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
        <Link to="/signup/1">
          <button className="SU_phone_btn" onClick={onClick}>
            다음
          </button>
        </Link>
      </form>
    </>
  );
}

export default Signup_phone;
