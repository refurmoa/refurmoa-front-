import React from "react";
import "./Signup.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import Post from "./FindAddress";
import Modal from "react-modal";
import { noticeList } from "../../shared/AcceptText";
import axios from "axios";

const Signup_input = (props) => {
  const setMode = props.setMode;
  const setTotal_Id = props.setTotal_Id;
  const name = props.name;
  const phone = props.phone;
  const setData = props.setData;

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChk, setPasswordChk] = useState("");
  const [mail, setMail] = useState("");
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [address, setAddress] = useState("");
  const [address_detail, setAddress_detail] = useState("");
  const [birth, setBirth] = useState("");

  const [valid_date, setValid_date] = useState();

  const [chkPWmsg, setchkPWmsg] = useState("");
  const [chkIdmsg, setChkIdmsg] = useState("");
  const [chkEmailmsg, setChkEmailmsg] = useState("");
  const [PWmsg, setPWmsg] = useState("");

  const [Is_pw, setIs_pw] = useState(false);
  const [check_pw, setCheck_pw] = useState(false);
  const [check_id, setCheck_id] = useState(false);
  const [check_Email, setCheck_Email] = useState(false);
  const [check_box, setCheck_box] = useState(false);

  /*========================== */
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

  /*========================== */
  const idRef = useRef();
  const IDcheck = () => {
    if (check_id) {
      alert("O");
      console.log(idRef.current.value);

      axios
        .post("/signup/distinct", {
          memberId: idRef.current.value,
        })
        .then((res) => {
          console.log(res);
          if (res.data === 1) {
            alert("중복된 아이디 입니다.");
            setId("");
            return false;
          } else {
            alert("사용 가능한 아이디 입니다!");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      alert("X");
    }
  };
  const onClick = () => {
    if (check_pw && check_id && check_Email && Is_pw) {
      alert("다음으로 넘어가시겠습니까?");
      setMail(email + "@" + domain);
      setTotal_Id(id);
      setData({
        id: id,
        phone: phone,
        password: password,
        email: mail,
        address: address,
        address_detail: address_detail,
        birth: birth,
      });
      setMode(3);
    }
    if (!check_pw) {
      alert("비밀번호를 입력해주세요!");
      return false;
    }
    if (!check_id) {
      alert("아이디를 입력해주세요!");
      return false;
    }
    if (!check_Email) {
      alert("이메일을 입력해주세요!");
      return false;
    }

    console.log({ valid_date });

    window.sessionStorage.setItem("id", id);
  };
  const onIdCHK = (e) => {
    setId(e.target.value);
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;

    if (id === "") {
      setChkIdmsg("아이디 입력은 필수입니다!");
      setCheck_id(false);
    } else if (!idRegExp.test(id)) {
      setChkIdmsg("4-12사이 대소문자 또는 숫자만 입력해 주세요!");
      setCheck_id(false);
    } else {
      setChkIdmsg("올바른 아이디 형식입니다 :)");
      setCheck_id(true);
    }
  };
  const onChangePassword = (e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPWmsg("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
      setIs_pw(false);
    } else {
      setPWmsg("안전한 비밀번호에요 : )");
      setIs_pw(true);
    }
  };
  const onPwCHK = (e) => {
    setPasswordChk(e.target.value);
    if (password === e.target.value) {
      setchkPWmsg("비밀번호가 일치합니다!");
      setCheck_pw(true);
    } else {
      setchkPWmsg("비밀번호가 일치하지 않습니다!");
      setCheck_pw(false);
    }
  };
  const onEmailCHK = (e) => {
    setDomain(e.target.value);
    if (email === "" || e.target.value === "") {
      setChkEmailmsg("Email 정보를 모두 입력해주세요!");
      setCheck_Email(false);
    } else {
      setChkEmailmsg("");
      setCheck_Email(true);
    }
  };
  const onCHKbox = (e) => {
    if (e.target.checked) {
      setCheck_box(true);
    } else {
      setCheck_box(false);
    }
  };
  return (
    <>
      <div className="SU_input_form">
        <div className="SU_Main_header">회원가입</div>
        <div className="SU_sub_header">
          01 본인인증 &nbsp;&nbsp;
          <n className="SU_pro_now">02 정보입력</n>
          &nbsp;&nbsp; 03 약관동의 &nbsp;&nbsp; 04 가입완료
        </div>
        <div className="form_wrap">
          <table className="SU_input_table">
            <tr>
              <td>이름</td>
              <td className="prev_value">{name}</td>
            </tr>
            <tr>
              <td>전화번호</td>
              <td className="prev_value">{phone}</td>
            </tr>
            <tr>
              <td>아이디</td>
              <td>
                <input
                  className="address_input"
                  name="MEMBER_ID"
                  id="MEMBER_ID"
                  type="text"
                  maxLength="15"
                  placeholder="아이디"
                  ref={idRef}
                  onChange={onIdCHK}
                />
                <button className="SU_find_address" onClick={IDcheck}>
                  중복확인
                </button>
                <hr className="SU_input_line" />
                {check_id ? (
                  <span className="SU_ok_chk">{chkIdmsg}</span>
                ) : (
                  <span className="SU_not_chk">{chkIdmsg}</span>
                )}
              </td>
            </tr>

            <tr>
              <td>비밀번호</td>
              <td>
                <input
                  name="password"
                  type="password"
                  placeholder="비밀번호"
                  maxLength="20"
                  value={password}
                  onChange={onChangePassword}
                />
                <hr className="SU_input_line" />
                {Is_pw ? (
                  <span className="SU_ok_chk">{PWmsg}</span>
                ) : (
                  <span className="SU_not_chk">{PWmsg}</span>
                )}
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>
                <input
                  name="passwordChk"
                  type="password"
                  placeholder="비밀번호 확인"
                  maxLength="20"
                  value={passwordChk}
                  onChange={onPwCHK}
                />

                <hr className="SU_input_line" />
                {password !== "" && password === passwordChk ? (
                  <span className="SU_ok_chk">{chkPWmsg}</span>
                ) : (
                  <span className="SU_not_chk">{chkPWmsg}</span>
                )}
              </td>
            </tr>

            <tr>
              <td>이메일</td>
              <td>
                <input
                  className="email_input"
                  name="email"
                  type="text"
                  placeholder="이메일"
                  maxLength="15"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                @ &nbsp;
                <input
                  className="email_input"
                  name="domain"
                  id="domain-txt"
                  type="text"
                  placeholder="직접 입력"
                  value={domain}
                  onChange={onEmailCHK}
                  maxLength="15"
                />
                <select
                  class="box"
                  id="domain-list"
                  name="domain"
                  onChange={onEmailCHK}
                >
                  <option value={domain}>직접 입력</option>
                  <option value="naver.com">naver.com</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="hanmail.net">hanmail.net</option>
                  <option value="nate.com">nate.com</option>
                  <option value="kakao.com">kakao.com</option>
                </select>
                <hr className="SU_input_line" />
                {check_Email ? (
                  <span className="SU_ok_chk">{chkEmailmsg}</span>
                ) : (
                  <span className="SU_not_chk">{chkEmailmsg}</span>
                )}
              </td>
            </tr>
            <tr>
              <td>주소</td>
              <td>
                <input
                  className="address_input"
                  name="address"
                  type="text"
                  size="100"
                  placeholder="주소"
                  value={address}
                  required={true}
                  maxLength="50"
                />
                <button className="SU_find_address" onClick={ChangePopUP}>
                  주소찾기
                </button>
                <Modal
                  style={{
                    overlay: {
                      position: "fixed",
                      backgroundColor: "rgba(0, 0, 0, 0.75)",
                    },
                    content: {
                      position: "absolute",
                      top: "25%",
                      width: "450px",
                      height: "430px",
                      left: "40px",
                      right: "40px",
                      bottom: "40px",
                      border: "1px solid #ccc",
                      background: "#fff",
                      overflow: "auto",
                      WebkitOverflowScrolling: "touch",
                      borderRadius: "4px",
                      outline: "none",
                      padding: "20px",
                    },
                  }}
                  isOpen={modal}
                >
                  <div className="close_modal">
                    <button onClick={close_modal}>
                      <b>X</b>
                    </button>
                  </div>
                  <div>
                    {popup && (
                      <Post
                        address={address}
                        setAddress={setAddress}
                        setMdoal={setModal}
                      ></Post>
                    )}
                  </div>
                </Modal>
                <hr className="SU_input_line" />
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>
                <input
                  name="address_detail"
                  type="text"
                  placeholder="상세 주소"
                  maxLength="50"
                  value={address_detail}
                  onChange={(e) => setAddress_detail(e.target.value)}
                />
                <hr className="SU_input_line" />
              </td>
            </tr>
            <tr>
              <td>생년월일</td>
              <td>
                <input
                  className={birth === "" ? "SU_birth" : "active"}
                  name="birth"
                  type="date"
                  size="100"
                  placeholder="생년월일"
                  value={birth}
                  onChange={(e) => setBirth(e.target.value)}
                />
                <hr className="SU_input_line" />
              </td>
            </tr>
          </table>
        </div>

        <button className="SU_input_btn" onClick={onClick}>
          다음
        </button>
      </div>
    </>
  );
};

export default Signup_input;
