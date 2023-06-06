import React from "react";
import "./AllianceForm.css";
import "../sign/signup/Signup.css";
import { useState } from "react";
import Post from "../shared/FindAddress";
import Modal from "react-modal";
import Update from "./AllianceUpdate";
import axios from "axios";
import cancel from "../../images/cancel.png";
import arrow_icon from "../../images/arrow_icon_brown-240.png";

const AllianceForm = () => {
  const [name, setName] = useState("");
  const [ceo, setCeo] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [address, setAddress] = useState("");
  const [address_detail, setAddress_detail] = useState("");
  const [domainSelect, setDomainSelect] = useState("write"); // 도메인 선택
  const [domainSelectOn, setDomainSelectOn] = useState(false); // 도메인 선택 열기/닫기
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
    // 도메인 선택
    const selectChange = (domain) => {
      if (domain === "open") {
        if (!domainSelectOn) setDomainSelectOn(true);
        else setDomainSelectOn(false);
      }
      else {
        setDomainSelectOn(false);
        setDomainSelect(domain);
        domain === "write" ? setDomain("") : setDomain(domain);
      }
  }
  /*========================== */

  const Register_partner = () => {
      alert("다음으로 넘어가시겠습니까?");
         axios
        .post("/partnership ", {
          comNum:null,
          comName: name,
          comCeoName: ceo,
          comPhone: phone,
          comEmail: email.concat("@", domain),
          comAddr: address,
          comDetailAddr: address_detail,
          comStatus:0
        })
        .then((res) => {
          alert("작성이 완료되었습니다.")
          window.location.href="/";
        })
        .catch((e) => {
          console.error(e);
        });
  };
  return (
    <>
      <div className="AF_input_form">
      <div className="AF_header">파트너 제휴 신청</div>

      <div className="Signup_form_line_long">
        <label className="Sign_form_text" htmlFor="name">업체명</label>
        <input className="Sign_input_long"
          name="name" type="text" value={name} maxLength="15"
          placeholder="업체명"
          onChange={(e) => setName(e.target.value)}required />
      </div>
      <div className="Signup_form_line_long">
        <label className="Sign_form_text" htmlFor="name">대표명</label>
        <input className="Sign_input_long"
          name="name" type="text" placeholder="대표명"
          value={ceo}  maxLength="10"
          onChange={(e) => setCeo(e.target.value)}required />
      </div>
      <div className="Signup_form_line_long">
        <label className="Sign_form_text" htmlFor="phone">연락처</label>
        <input className="Sign_input_long"
          name="phone" type="text"  placeholder="연락처"
          value={phone} maxLength="20"
          onChange={(e) => setPhone(e.target.value)} required />
      </div>   
      <div className="Signup_form_line_long Signup_email_line">
        <label className="Sign_form_text" htmlFor="password">이메일</label>
        <span className="Signup_email_input">
          <input className="Signup_email" id="email1"
          name="email1" type="text" placeholder="이메일" maxLength="15"
          value={email} onChange={(e)=>setEmail(e.target.value)} required />
          @
          { domainSelect === "write" ?
            <input className="Signup_email Signup_domain" id="email2"
            name="email2" type="text" placeholder="직접 입력" maxLength="15"
            value={domain} onChange={(e)=>setDomain(e.target.value)} />
            : <input className="Signup_email Signup_domain" id="email2"
            name="email2" type="text" maxLength="15"
            value={domain} readOnly />
          }
          <img className="Signup_select_icon" alt="도메인 선택" src={arrow_icon} onClick={()=>selectChange("open")} />
          { domainSelectOn &&
            <div className="Signup_email_select">
              <div className="Signup_email_option" onClick={()=>selectChange("naver.com")}>naver.com</div>
              <div className="Signup_email_option" onClick={()=>selectChange("gmail.com")}>gmail.com</div>
              <div className="Signup_email_option" onClick={()=>selectChange("hanmail.com")}>hanmail.com</div>
              <div className="Signup_email_option" onClick={()=>selectChange("nate.com")}>nate.com</div>
              <div className="Signup_email_option" onClick={()=>selectChange("kakao.com")}>kakao.com</div>
              <div className="Signup_email_option" onClick={()=>selectChange("write")}>직접 입력</div>
            </div>
          }
        </span>
      </div>
      <div className="Signup_form_line_long Signup_check_line">
        <label className="Sign_form_text" htmlFor="address">주소</label>
        <input className="Sign_input_long Signup_check" id="address"
          name="address" type="text" placeholder="주소" maxLength="50"
          value={address} readOnly required />
        <span className="Sign_phone_btn Signup_input_check" onClick={ChangePopUP}>주소 찾기</span>
      </div>
      <div className="Signup_form_line_long">
        <input className="Sign_input_long" id="address_detail"
          name="address_detail" type="text" placeholder="상세주소" maxLength="50"
          value={address_detail} onChange={(e)=>setAddress_detail(e.target.value)} required />
      </div>

      {/* 주소 API */}
      <Modal style={{ overlay: { position: "fixed", backgroundColor: "rgba(0, 0, 0, 0.75)" },
        content: { position: "absolute", top: "25%", bottom: "40px", left: "40px", right: "40px",
          width: "450px", height: "430px", border: "1px solid #ccc", padding: "20px" } }}
        isOpen={modal} >
        <img className="Sign_modal_close" alt="창 닫기" src={cancel} onClick={close_modal} />
        { popup && <Post address={address} setAddress={setAddress} setMdoal={setModal} /> }
      </Modal>
      
      <div className="Sign_btn Signup_input_btn" onClick={Register_partner}>신청</div>
    </div>
    </>
  );
};
export default AllianceForm;
