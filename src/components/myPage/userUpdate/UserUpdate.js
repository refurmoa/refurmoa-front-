import React from "react";
import "../../sign/signup/Signup.css";
import "./UserUpdate.css";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import Update_phone from "./UserUpdatePhone";
import Post from "../../shared/FindAddress";
import axios from "axios";
import { useLocation } from "react-router-dom";

const User_update = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChk, setPasswordChk] = useState("");
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [emailFinal, setEmailFinal] = useState("");
  const [address, setAddress] = useState(" ");
  const [update_address, setupdate_address] = useState("");
  const [address_detail, setAddress_detail] = useState(" ");
  const [birth, setBirth] = useState("");
  const [chkPWmsg, setchkPWmsg] = useState("");
  const [chkEmailmsg, setChkEmailmsg] = useState("");
  const [PWmsg, setPWmsg] = useState("");
  const [Is_pw, setIs_pw] = useState(false);
  const [check_pw, setCheck_pw] = useState(false);
  const [check_Email, setCheck_Email] = useState(false);
  const [id, setId] = useState();
  const location = useLocation();

  // =====================================================

  function idConfirm() {
    if (window.sessionStorage.getItem("id") !== "admin") {
      setId(window.sessionStorage.getItem("id"));
    } else setId(location.state.id);
  }

  useEffect(() => {
    idConfirm();
    axios
      .post("/user/info", {
        memberId: id,
      })
      .then((res) => {
        const { data } = res; // data = res.data
        console.log(res);
        const mail = data[0].email.split("@");
        setName(data[0].name);
        setPhone(data[0].phone);
        setPassword(data[0].password);
        setEmail(mail[0]);
        setDomain(mail[1]);
        setAddress(data[0].address);
        setAddress_detail(data[0].detailAddress);
        setBirth(data[0].birth);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [id]);

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
  const [Phone_popup, setPhone_Popup] = useState(false);
  const [Phone_modal, setPhone_Modal] = useState(false);
  const Phone_ChangePopUP = () => {
    setPhone_Popup(true);
    setPhone_Modal(true);
  };
  const Phone_close_modal = () => {
    setPhone_Popup(false);
    setPhone_Modal(false);
  };

  /*========================== */
  const onClick = () => {
    if (check_pw) {
      alert("회원정보를 수정하시겠습니까?");

      axios
        .post(`/user/update`, {
          memberId: id,
          password: password,
          phone: phone,
          email: emailFinal,
          address: address,
          detailAddress: address_detail,
        })
        .then((res) => {
          alert("성공적으로 수정되었습니다.");
          document.location.href = "/mypage";
        })
        .catch((e) => {
          console.error(e);
        });
    }
    if (!check_pw) {
      alert("비밀번호를 입력해주세요!");
      return false;
    }
  };

  const userDelete = () => {
    axios
      .post("/user/delete", {
        memberId: id,
      })
      .then(() => {
        alert("회원탈퇴가 완료되었습니다.");
        document.location.href = "/";
      })
      .catch((e) => {
        console.error(e);
      });
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
      setEmailFinal(email + "@" + e.target.value);
    }
  };

  return (
    <>
      <form className="UU_input_form">
        <div className="SU_Main_header">회원정보 수정</div>

        <div className="form_wrap">
          <table className="SU_input_table">
            <tr>
              <td>이름</td>
              <td className="prev_value">{name}</td>
            </tr>
            <tr>
              <td>전화번호</td>
              <td className="prev_value">
                {phone}
                <button className="UU_change_phone" onClick={Phone_ChangePopUP}>
                  전화번호 변경
                </button>
                <Modal
                  style={{
                    overlay: {
                      position: "fixed",
                      backgroundColor: "rgba(0, 0, 0, 0.75)",
                    },
                    content: {
                      position: "absolute",
                      top: "18%",
                      width: "600px",
                      height: "550px",
                      left: "40px",
                      right: "40px",
                      bottom: "40px",
                      border: "1px solid #ccc",
                      background: "#fff",
                      overflow: "auto",
                      WebkitOverflowScrolling: "touch",
                      borderRadius: "15px",
                      outline: "none",
                      padding: "30px",
                    },
                  }}
                  isOpen={Phone_modal}
                >
                  <div className="close_modal">
                    <button onClick={Phone_close_modal}>
                      <b>X</b>
                    </button>
                  </div>
                  <div>
                    {Phone_popup && (
                      <Update_phone
                        name={name}
                        setPhone={setPhone}
                        setPhone_Modal={setPhone_Modal}
                      ></Update_phone>
                    )}
                  </div>
                </Modal>
              </td>
            </tr>
            <tr>
              <td>아이디</td>
              <td className="prev_value">{id}</td>
            </tr>

            <tr>
              <td>비밀번호</td>
              <td>
                <input
                  name="password"
                  type="password"
                  placeholder="비밀번호"
                  maxLength="20"
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
                  value={email}
                  maxLength="15"
                  onChange={(e) => setEmail(e.target.value)}
                />
                @ &nbsp;
                <input
                  className="email_input"
                  name="domain"
                  id="domain-txt"
                  type="text"
                  maxLength="15"
                  placeholder="직접 입력"
                  value={domain}
                  onChange={onEmailCHK}
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
                  className="UU_address_input"
                  name="address"
                  type="text"
                  size="50"
                  maxLength="50"
                  placeholder={address}
                  value={update_address}
                  required={true}
                />
                <button className="SU_find_address" onClick={ChangePopUP}>
                  주소변경
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
                      borderRadius: "15px",
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
                        address={update_address}
                        setAddress={setupdate_address}
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
                  size="50"
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
                  name="birth"
                  type="date"
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
          정보수정
        </button>
        <div>
          <button className="UU_user_delete_btn" onClick={userDelete}>
            회원탈퇴
          </button>
        </div>
      </form>
    </>
  );
};

export default User_update;
