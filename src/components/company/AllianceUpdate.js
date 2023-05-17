import React, { useEffect } from "react";
import "./AllianceForm.css";
import "../sign/signup/Signup.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Post from "../sign/signup/FindAddress";
import Modal from "react-modal";

const AllianceUpdate = (props) => {
  const mail = props.mail.split("@");
  const [name, setName] = useState(props.name);
  const [ceo, setCeo] = useState(props.ceo);
  const [phone, setPhone] = useState(props.phone);
  const [email, setEmail] = useState(mail[0]);
  const [domain, setDomain] = useState(mail[1]);
  const [address, setAddress] = useState(props.address);
  const [address_detail, setAddress_detail] = useState(props.address_detail);
  const [chkEmailmsg, setChkEmailmsg] = useState("");
  const [status, setStatus] = useState(props.status);
  const [check_Email, setCheck_Email] = useState(false);

  const update_setModal = props.update_setModal;
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

  const onClick = () => {
    if (check_Email) {
      alert("다음으로 넘어가시겠습니까?");
      setEmail(email.concat("@", domain));

      /*
         axios
        .post("/company", {
          com_name: name,
          com_ceo:ceo
          com_phone:phone,
          com_email:email,
          com_addr:address
          com_detail_addr:address_detail
          com_status: status
        })
        .then((res) => {
         
          }
         
        })
        .catch((e) => {
          console.error(e);
        });


      */
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

  return (
    <>
      <div className="SU_Main_header">파트너 정보 수정</div>
      <div className="form_wrap">
        <table className="SU_input_table">
          <tr>
            <td>업체명</td>
            <td>
              <input
                name="name"
                type="text"
                placeholder="업체명"
                value={name}
                maxLength="15"
                onChange={(e) => setName(e.target.value)}
              />
              <hr className="SU_input_line" />
            </td>
          </tr>
          <tr>
            <td>대표명</td>
            <td>
              <input
                name="name"
                type="text"
                placeholder="대표명"
                value={ceo}
                maxLength="10"
                onChange={(e) => setCeo(e.target.value)}
              />
              <hr className="SU_input_line" />
            </td>
          </tr>
          <tr>
            <td>연락처</td>
            <td>
              <input
                name="name"
                type="text"
                placeholder="연락처"
                value={phone}
                maxLength="20"
                onChange={(e) => setPhone(e.target.value)}
              />
              <hr className="SU_input_line" />
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
                maxLength="15"
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
                className="address_input"
                name="address"
                type="text"
                size="100"
                placeholder="주소"
                maxLength="50"
                value={address}
                required={true}
              />
              <button className="SU_find_address" onClick={ChangePopUP}>
                주소찾기
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
                value={address_detail}
                maxLength="50"
                onChange={(e) => setAddress_detail(e.target.value)}
              />
              <hr className="SU_input_line" />
            </td>
          </tr>
        </table>
      </div>

      <button className="PT_input_btn" onClick={update_setModal}>
        다음
      </button>
    </>
  );
};

export default AllianceUpdate;
