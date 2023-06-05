// 개인정보 수정 페이지

import "../sign/Sign.css";
import "../sign/signin/Login.css";
import "../sign/signup/SignupInput.css";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import SignVerification from "../sign/SignVerification";
import Post from "../shared/FindAddress";
import arrow_icon from "../../images/arrow_icon_brown-240.png";
import cancel from "../../images/cancel.png";


const User_update = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [member_id, setMember_id] = useState("");
  const [name, setName] = useState("");
  const [prev_phone, setPrev_phone] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChk, setPasswordChk] = useState("");
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [prev_address, setPrev_address] = useState(""); // 이전 주소
  const [address, setAddress] = useState(" "); // 변경 주소
  const [address_detail, setAddress_detail] = useState(" ");
  const [birth, setBirth] = useState("");
  const [accept_alarm, setAccept_alarm] = useState(true);
  const [accept_location, setAccept_location] = useState(true);
  const [phone_modal, setPhone_modal] = useState(false);
  const [certiChk, setCertiChk] = useState(false); // 본인인증 요청
  const [certi, setCerti] = useState(false); // 본인인증 확인

  const [domainSelect, setDomainSelect] = useState("write"); // 도메인 선택
  const [domainSelectOn, setDomainSelectOn] = useState(false); // 도메인 선택 열기/닫기

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/; // PW 검사

  // =====================================================

  useEffect(() => {
    if (window.sessionStorage.getItem("id") === null) {
      navigate("/");
    } else if (window.sessionStorage.getItem("id") !== "admin") {
      setId(window.sessionStorage.getItem("id"));
    } else if (location.state.id !== null) {
      setId(location.state.id);
    }
  }, []);

  useEffect(() => {
    axios
      .post("/user/info", { memberId: id })
      .then((res) => {
        setMember_id(res.data.memberId);
        setName(res.data.name);
        setPrev_phone(res.data.phone);
        setEmail(res.data.email.split("@")[0]);
        setDomain(res.data.email.split("@")[1]);
        setPrev_address(res.data.address);
        setAddress(res.data.address);
        setAddress_detail(res.data.detailAddress);
        setBirth(res.data.birth);
        setAccept_alarm(res.data.acceptAlarm);
        setAccept_location(res.data.acceptLocation);
      })
      .catch((e) => {
        // console.error(e);
      });
  }, [id]);

  // 주소 변경(상세주소 clear)
  useEffect(() => {
    if (prev_address !== address)
      setAddress_detail("");
  }, [address])

  /*========================== */

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

  /*========================== */

  // 전화번호 변경
  const phoneClick = () => {
    if (phone === "") {
      alert("전화번호를 입력해주세요");
    } else {
      setCertiChk(true);
    }
  }
  useEffect(() => {
    if (certi && phone !== "")
      setPrev_phone(phone);
      setPhone_modal(false);
  }, [certi])

  // 개인정보 수정 axios
  const onClick = () => {
    if (password === "" || passwordChk === "") {
      alert("비밀번호를 입력해주세요!");
      return false;
    } else if (!passwordRegex.test(password)) {
      alert("비밀번호를 확인해주세요!");
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
      const confirm = window.confirm("회원정보를 수정하시겠습니까?");
      if (confirm) {
        axios
          .post(`/user/update`, {
            memberId: id,
            password: password,
            name: name,
            phone: prev_phone,
            email: email + "@" + domain,
            address: address,
            detailAddress: address_detail,
            birth: birth,
            acceptAlarm: accept_alarm,
            acceptLocation: accept_location
          })
          .then((res) => {
            alert("수정되었습니다.");
            navigate(-1);
          })
          .catch((e) => {
            alert("실패하였습니다. 다시 시도해주세요.");
            // console.error(e);
          });
      }
    }
  };

  // 회원 탈퇴 axios
  const userDelete = () => {
    const confirm = window.confirm("탈퇴하시면 개인 정보가 삭제되며, 복구할 수 없습니다.\n정말로 탈퇴하시겠습니까?");
      if (confirm) {
        axios
          .post("/user/delete", {
            memberId: member_id,
          })
          .then(() => {
            alert("회원탈퇴가 완료되었습니다.");
            if (sessionStorage.getItem("id") !== "admin") {
              window.sessionStorage.clear();
              document.location.href = "/";
            } else navigate(-1);
          })
          .catch((e) => {
            alert("실패하였습니다. 다시 시도해주세요.");
            // console.error(e);
          });
      };
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

  // const onChangePassword = (e) => {
  //   const passwordRegex =
  //     /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  //   const passwordCurrent = e.target.value;
  //   setPassword(passwordCurrent);

  //   if (!passwordRegex.test(passwordCurrent)) {
  //     setPWmsg("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
  //     setIs_pw(false);
  //   } else {
  //     setPWmsg("안전한 비밀번호에요 : )");
  //     setIs_pw(true);
  //   }
  // };
  // const onPwCHK = (e) => {
  //   setPasswordChk(e.target.value);
  //   if (password === e.target.value) {
  //     setchkPWmsg("비밀번호가 일치합니다!");
  //     setCheck_pw(true);
  //   } else {
  //     setchkPWmsg("비밀번호가 일치하지 않습니다!");
  //     setCheck_pw(false);
  //   }
  // };


  return (
    <div className="Sign_wrap Signup_Input_wrap">
      <div className="Sign_header Signup_header" style={{ marginBottom: '60px' }}>회원정보 수정</div>

      <div className="Signup_form_line_long">
        <label className="Sign_form_text" htmlFor="name">이름</label>
        <input className="Sign_input_long Singup_input_none"
          name="name" type="text" value={name} readOnly required />
      </div>
      <div className="Signup_form_line_long Signup_check_line">
        <label className="Sign_form_text" htmlFor="phone">전화번호</label>
        <input className="Sign_input_long Singup_input_none"
          name="phone" type="text" value={prev_phone} readOnly required />
        <span className="Sign_phone_btn Signup_input_check" onClick={() => {setPhone_modal(true);}}>번호 변경</span>
      </div>
      <div className="Signup_form_line_long">
        <label className="Sign_form_text" htmlFor="name">아이디</label>
        <input className="Sign_input_long Singup_input_none"
          name="name" type="text" value={member_id} readOnly required />
      </div>
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

      {/* 본인인증 모달 */}
      { phone_modal &&
        <div className="Login_modal_overlay">
          <div className="Login_modal">
            <div className="Login_find_wrap">
              <div className="Sign_header Signup_header" style={{ marginBottom: '60px' }}>전화번호 변경</div>
              <SignVerification update={true} name={name} setName={setName} phone={phone} setPhone={setPhone} setCerti={setCerti} certiChk={certiChk} setCertiChk={setCertiChk} />
              <div className="Sign_btn" onClick={() => phoneClick()}>변경</div>
              <img className="Sign_modal_close" alt="창 닫기" src={cancel} onClick={() => {setPhone_modal(false);}} />
            </div>
          </div>
        </div>
      }

      {/* 주소 API */}
      <Modal style={{ overlay: { position: "fixed", backgroundColor: "rgba(0, 0, 0, 0.75)" },
        content: { position: "absolute", top: "25%", bottom: "40px", left: "40px", right: "40px",
          width: "450px", height: "430px", border: "1px solid #ccc", padding: "20px" } }}
        isOpen={modal} >
        <img className="Sign_modal_close" alt="창 닫기" src={cancel} onClick={closeModal} />
        { popup && <Post address={address} setAddress={setAddress} setMdoal={setModal} /> }
      </Modal>
      
      <div className="Sign_btn Signup_input_btn" onClick={onClick}>수정</div>
      <div style={{textDecoration: 'underline', textAlign: 'center', cursor: 'pointer'}} onClick={userDelete}>회원탈퇴</div>
    </div>
  );
};

export default User_update;
