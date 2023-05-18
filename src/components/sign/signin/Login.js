import React from "react";
import "../signup/Signup.css";
import "./Login.css";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import google from "../../../images/google.png";
import kakao from "../../../images/kakao.png";
import naver from "../../../images/naver.png";
import { useRef, useState, useEffect } from "react";
import FindID from "./LoginFindId";
import FindPW from "./LoginFindPw";
// id, password, passwordChk(비밀번호확인), name, tel 기본값 호출
function Login() {
  // 제출버튼을 누르면 변경된 파라미터 값 전달함(추후 수정 필요)
  const navigate = useNavigate();
  const id = useRef();
  const password = useRef();
  const onClick = () => {
    if (id.current.value === "") {
      alert("아이디를 입력해주세요");
      return false;
    } else if (password.current.value === "") {
      alert("비밀번호를 입력해주세요");
      return false;
    }
    window.sessionStorage.setItem("id", id.current.value);
    navigate(-1);
  };

  /*
  axios
        .get("/login", {
          id: id,
          password: password,
        })
        .then((res) => {
          if (res.data === 1) {
            window.sessionStorage.setItem("id", id);
          } else {
            alert("해당 정보의 아이디는 존재하지 않습니다! 아이디 입니다!");
          }
        })
        .catch((e) => {
          console.error(e);
        });

  */

  const [popup, setPopup] = useState(false);
  const [modal, setModal] = useState(false);
  const ChangePopUP = () => {
    setPopup(true);
    setModal(true);
  };
  const close_modal = () => {
    setPopup(false);
    setModal(false);
  };
  /*=========================================================== */
  const [Pw_popup, setPw_Popup] = useState(false);
  const [Pw_modal, setPw_Modal] = useState(false);
  const ChangePw_PopUP = () => {
    setPw_Popup(true);
    setPw_Modal(true);
  };
  const Pw_close_modal = () => {
    setPw_Popup(false);
    setPw_Modal(false);
  };
  /*=========================================================== */
  let naver_api_url =
    "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
    process.env.REACT_APP_NAVER_CLIENT_ID +
    "&redirect_uri=" +
    encodeURI(process.env.REACT_APP_NAVER_CALLBACK_URI) +
    "&state=" +
    Math.random().toString(36).substr(3, 14);

  let kakao_api_url = `https://kauth.kakao.com/oauth/authorize?client_id=${
    process.env.REACT_APP_KAKAO_REST_API_KEY
  }&redirect_uri=${encodeURI(
    process.env.REACT_APP_KAKAO_CALLBACK_URI
  )}&response_type=code`;
  return (
    <>
      <wrap>
        <div className="Login_form">
          <div className="LG_Main_header">로그인</div>
          <div className="SU_phone_form">
            <table className="LG_login_input">
              <tr>
                <td>아이디</td>
                <td>
                  <input
                    name="id"
                    type="text"
                    placeholder="아이디"
                    maxLength="15"
                    ref={id}
                  />
                  <hr className="SU_phone_line" />
                </td>
              </tr>

              <tr>
                <td>비밀번호</td>
                <td>
                  <input
                    name="password"
                    type="password"
                    maxLength="20"
                    placeholder="비밀번호"
                    ref={password}
                  />
                  <hr className="SU_phone_line" />
                </td>
              </tr>
            </table>
          </div>
          <button className="login_btn" onClick={onClick}>
            LOGIN
          </button>
          <div className="login_detail">
            <button className="login_find" onClick={ChangePopUP}>
              아이디 찾기
            </button>
            <Modal
              style={{
                overlay: {
                  position: "fixed",
                  backgroundColor: "rgba(255, 255, 255, 0.75)",
                },
                content: {
                  position: "absolute",
                  top: "40px",
                  width: "600px",
                  height: "540px",
                  left: "40px",
                  right: "40px",
                  bottom: "40px",
                  border: "1px solid #ccc",
                  background: "#fff",
                  overflow: "auto",
                  WebkitOverflowScrolling: "touch",
                  borderRadius: "15px",
                  outline: "none",
                  padding: "20px",
                },
              }}
              isOpen={modal}
            >
              <div className="close_modal">
                <button type="button" onClick={close_modal}>
                  <b>X</b>
                </button>
              </div>
              <div>{popup && <FindID setModal={setModal}></FindID>}</div>
            </Modal>
            &nbsp; |&nbsp;
            <button className="login_find" onClick={ChangePw_PopUP}>
              비밀번호 찾기
            </button>
            <Modal
              style={{
                overlay: {
                  position: "fixed",
                  backgroundColor: "rgba(255, 255, 255, 0.75)",
                },
                content: {
                  position: "absolute",
                  top: "40px",
                  width: "600px",
                  height: "600px",
                  left: "40px",
                  right: "40px",
                  bottom: "40px",
                  border: "1px solid #ccc",
                  background: "#fff",
                  overflow: "auto",
                  WebkitOverflowScrolling: "touch",
                  borderRadius: "15px",
                  outline: "none",
                  padding: "20px",
                },
              }}
              isOpen={Pw_modal}
            >
              <div className="close_modal">
                <button type="button" onClick={Pw_close_modal}>
                  <b>X</b>
                </button>
              </div>
              <div>
                {Pw_popup && <FindPW setPw_Modal={setPw_Modal}></FindPW>}
              </div>
            </Modal>
            &nbsp; |&nbsp;
            <a href="/signup">회원가입</a>
          </div>
          <div className="SU_social_btn">
            <button type="button" className="SU_naver">
              <a href={naver_api_url}>
                <img src={naver} alt="naver" />
              </a>
            </button>
            <button type="button" className="SU_kakao">
              <a href={kakao_api_url}>
                <img src={kakao} alt="kakao" className="SU_kakao_img" />
              </a>
            </button>

            <button type="button" className="SU_google">
              <a>
                <img src={google} alt="google" />
              </a>
            </button>
          </div>
        </div>
      </wrap>
    </>
  );
}

export default Login;
