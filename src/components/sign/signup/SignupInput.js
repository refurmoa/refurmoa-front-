// 회원가입 정보입력 (2)

import "./SignupInput.css";
import { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Post from "../../shared/FindAddress";
import arrow_icon from "../../../images/arrow_icon_brown-240.png";
import cancel from "../../../images/cancel.png";

const Signup_input = (props) => { // props.id, props.name, props.phone

  const [password, setPassword] = useState("");
  const [passwordChk, setPasswordChk] = useState("");
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [address, setAddress] = useState("");
  const [address_detail, setAddress_detail] = useState("");
  const [birth, setBirth] = useState("");
  const [checkId, setCheckId] = useState(false); // ID 중복 확인
  const [domainSelect, setDomainSelect] = useState("write"); // 도메인 선택
  const [domainSelectOn, setDomainSelectOn] = useState(false); // 도메인 선택 열기/닫기

  const idRegExp = /^[a-zA-z0-9]{4,12}$/; // ID 검사
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/; // PW 검사

  // 주소 API 모달
  const [modal, setModal] = useState(false);
  const [popup, setPopup] = useState(false);
  const ChangePopUP = () => {
    setPopup(true);
    setModal(true);
  };
  const closeModal = () => {
    setPopup(false);
    setModal(false);
  };

  // ID 중복 검사
  const IDcheck = () => {
    if (!idRegExp.test(props.id)) {
      alert("사용 불가능한 아이디입니다.");
    } else if (props.id !== "") {
      axios
        .post("/signup/distinct", {
          memberId: props.id,
        })
        .then((res) => {
          if (res.data === 1) {
            alert("중복된 아이디입니다.");
            props.setId("");
          } else {
            alert("사용 가능한 아이디입니다!");
            setCheckId(true);
          }
        })
        .catch((e) => {
          // console.error(e);
        });
    } else {
      alert("아이디를 입력해주세요.");
    }
  };

  // 다음 버튼 클릭
  const onClick = () => {
    if (props.id === "") {
      alert("아이디를 입력해주세요!");
      return false;
    } else if (!idRegExp.test(props.id) || !checkId) {
      alert("아이디를 확인해주세요!");
      return false;
    } else if (password === "" || passwordChk === "") {
      alert("비밀번호를 입력해주세요!");
      return false;
    } else if (email === "" || domain === "") {
      alert("이메일 입력해주세요!");
      return false;
    } else if (address === "") {
      alert("주소를 입력해주세요!");
      return false;
    } else if (address_detail === "") {
      alert("상세주소를 입력해주세요!");
      return false;
    } else if (birth === "") {
      alert("생년월일을 입력해주세요!");
      return false;
    } else {
      props.setData({
        password: password,
        email: email + "@" + domain,
        address: address,
        address_detail: address_detail,
        birth: birth,
      });
      props.setMode(3);
    }
  };

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


  return (
    <div className="Sign_wrap Signup_Input_wrap">
      <div className="Sign_header Signup_header">회원가입</div>
      <div className="Signup_sub">
        <span className="Signup_sub_text">01 본인인증</span>
        <span className="Signup_sub_text Signup_sub_text_main">02 정보입력</span>
        <span className="Signup_sub_text">03 약관동의</span>
        <span className="Signup_sub_text">04 가입완료</span>
      </div>

      <div className="Signup_form_line_long">
        <label className="Sign_form_text" htmlFor="name">이름</label>
        <input className="Sign_input_long Singup_input_none"
          name="name" type="text" value={props.name} readOnly required />
      </div>
      <div className="Signup_form_line_long">
        <label className="Sign_form_text" htmlFor="phone">전화번호</label>
        <input className="Sign_input_long Singup_input_none"
          name="phone" type="text" value={props.phone} readOnly required />
      </div>
      <div className={`Signup_form_line_long Signup_check_line ${props.id !== "" && !idRegExp.test(props.id) && "Signup_chkmsg_line"}`}>
        <label className="Sign_form_text" htmlFor="id">아이디</label>
        <input className="Sign_input_long Signup_check" id="member_id"
          name="member_id" type="text" placeholder="아이디" maxLength="15"
          value={props.id} onChange={(e)=>props.setId(e.target.value)} required />
        <span className="Sign_phone_btn Signup_input_check" onClick={IDcheck}>중복확인</span>
      </div>
      { props.id !== "" && !idRegExp.test(props.id) &&
        <div className="Signup_chkmsg">4-12사이 대소문자 또는 숫자만 입력해주세요!</div> }
      <div className={`Signup_form_line_long ${password !== "" && !passwordRegex.test(password) && "Signup_chkmsg_line"}`}>
        <label className="Sign_form_text" htmlFor="password">비밀번호</label>
        <input className="Sign_input_long" id="password"
          name="password" type="password" placeholder="비밀번호" maxLength="20"
          value={password} onChange={(e)=>setPassword(e.target.value)} required />
      </div>
      { password !== "" && !passwordRegex.test(password) &&
        <div className="Signup_chkmsg">숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!</div> }
      <div className={`Signup_form_line_long ${passwordChk !== "" && password !== passwordChk && "Signup_chkmsg_line"}`}>
        <input className="Sign_input_long" id="passwordChk"
          name="passwordChk" type="password" placeholder="비밀번호 확인" maxLength="20"
          value={passwordChk} onChange={(e)=>setPasswordChk(e.target.value)} required />
      </div>
      { passwordChk !== "" && password !== passwordChk &&
        <div className="Signup_chkmsg">비밀번호가 일치하지 않습니다!</div> }
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
      <div className="Signup_form_line_long">
        <label className="Sign_form_text" htmlFor="birth">생년월일</label>
        <input className={`Sign_input_long ${birth === "" ? "Signup_input_birth" : "Signup_input_birth_on"}`}
          id="birth" name="birth" type="date"
          value={birth} onChange={(e)=>setBirth(e.target.value)} required />
      </div>

      {/* 주소 API */}
      <Modal style={{ overlay: { position: "fixed", backgroundColor: "rgba(0, 0, 0, 0.75)" },
        content: { position: "absolute", top: "25%", bottom: "40px", left: "40px", right: "40px",
          width: "450px", height: "430px", border: "1px solid #ccc",padding: "20px" } }}
        isOpen={modal} >
        <img className="Sign_modal_close" alt="창 닫기" src={cancel} onClick={closeModal} />
        { popup && <Post address={address} setAddress={setAddress} setMdoal={setModal} /> }
      </Modal>
      
      <div className="Sign_btn Signup_input_btn" onClick={onClick}>다음</div>
    </div>
  );
};

export default Signup_input;
