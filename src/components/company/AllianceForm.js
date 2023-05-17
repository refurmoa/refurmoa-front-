import React from "react";
import "./AllianceForm.css";
import "../sign/signup/Signup.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Post from "../sign/signup/FindAddress";
import Modal from "react-modal";
import Update from "./AllianceUpdate";

const AllianceForm = () => {
  const [name, setName] = useState("");
  const [ceo, setCeo] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [mail, setMail] = useState("");
  const [address, setAddress] = useState("");
  const [address_detail, setAddress_detail] = useState("");
  const [chkEmailmsg, setChkEmailmsg] = useState("");
  const [status, setStatus] = useState(0);
  const [check_Email, setCheck_Email] = useState(false);

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

  const [update_popup, setUpdate_popup] = useState(false);
  const [update_modal, update_setModal] = useState(false);
  const update_ChangePopUP = () => {
    setUpdate_popup(true);
    update_setModal(true);
  };
  const update_close_modal = () => {
    setUpdate_popup(false);
    update_setModal(false);
  };
  /*========================== */

  const Register_partner = () => {
    if (check_Email) {
      alert("다음으로 넘어가시겠습니까?");
      setMail(email.concat("@", domain));
      update_ChangePopUP();

      /*
         axios
        .post("/company", {
          com_name: name,
          com_ceo:ceo
          com_phone:phone,
          com_mail:mail,
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
      <div className="AF_input_form">
        <div className="SU_Main_header">파트너 제휴 신청</div>
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

        <button className="SU_input_btn" /*onClick={Register_partner}*/>
          다음
        </button>
        <Modal
          style={{
            overlay: {
              position: "fixed",

              backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
            content: {
              position: "absolute",
              top: "10%",
              width: "900px",
              height: "700px",
              left: "40px",
              right: "40px",
              bottom: "40px",
              border: "1px solid #ccc",
              background: "#fff",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "10px",
              outline: "none",
              padding: "20px",
            },
          }}
          isOpen={update_modal}
        >
          <div className="close_modal">
            <button onClick={update_close_modal}>
              <b>X</b>
            </button>
          </div>
          <div>
            {update_popup && (
              <Update
                name={name}
                ceo={ceo}
                phone={phone}
                mail={mail}
                address={address}
                address_detail={address_detail}
                status={status}
                update_setModal={update_setModal}
              ></Update>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AllianceForm;
