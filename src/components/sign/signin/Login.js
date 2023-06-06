// 로그인 페이지

import "./Login.css";
import "../Sign.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Find from "./LoginFind";
function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const [idModal, setIdModal] = useState(false); // ID 찾기 모달
  const [pwModal, setPwModal] = useState(false); // PW 찾기 모달

  useEffect(() => {
    if (sessionStorage.getItem("id") !== null) navigate("/");
  }, []);

  // 로그인
  const LoginClick = () => {
    if (id === "") {
      alert("아이디를 입력해주세요.");
      return false;
    } else if (password === "") {
      alert("비밀번호를 입력해주세요.");
      return false;
    }

    axios
      .post("/login", {
        memberId: id,
        password: password,
      })
      .then((res) => {
        if (res.data === 1) {
          window.sessionStorage.setItem("id", id);
          if (document.referrer.includes('/signup')) navigate("/");
          else navigate(-1);
        } else {
          alert("아이디 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.");
        }
      })
      .catch((e) => {
        // console.error(e);
      });
  };

  return (
    <div className="Sign_wrap Login_wrap">
      <div className="Sign_header Login_header">로그인</div>

      {/* 로그인 폼 */}
      <div className="Login_form">
        <div className="Sign_form_line">
          <label className="Sign_form_text" htmlFor="id">아이디</label>
          <input className="Sign_input"
            name="id" type="text" placeholder="아이디" maxLength="15"
            value={id} onChange={(e)=>setId(e.target.value)} required />
        </div>
        <div className="Sign_form_line">
          <label className="Sign_form_text" htmlFor="password">비밀번호</label>
          <input className="Sign_input"
            name="password" type="password" maxLength="20" placeholder="비밀번호"
            value={password} onChange={(e)=>setPassword(e.target.value)} required
            onKeyDown={(e) => {e.key === 'Enter' && LoginClick()}} />
        </div>
      </div>
      <div className="Sign_btn Login_btn" onClick={LoginClick}>LOGIN</div>

      {/* ID 찾기, PW 찾기, 회원가입 */}
      <div className="Login_detail">
        <span className="Login_detail_text" onClick={() => {setIdModal(true)}}>아이디 찾기</span>
        <span className="Login_detail_text">|</span>
        <span className="Login_detail_text" onClick={() => {setPwModal(true)}}>비밀번호 찾기</span>
        <span className="Login_detail_text">|</span>
        <Link to="/signup" className="Login_detail_text">회원가입</Link>
      </div>

      {/* ID, PW 찾기 모달 창*/}
      { idModal &&
        <div className="Login_modal_overlay">
          <div className="Login_modal">
            <Find modal="id" setModal={setIdModal} />
          </div>
        </div>
      }
      { pwModal &&
        <div className="Login_modal_overlay">
          <div className="Login_modal">
            <Find modal="pw" setModal={setPwModal} />
          </div>
        </div>
      }

     
    </div>
  );
}

export default Login;
