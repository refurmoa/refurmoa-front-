// 회원가입 약관동의 (3)

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { noticeList } from "../../shared/AcceptText";

const Signup_accept = (props) => {
  const navigate = useNavigate();
  const [check_ALL, setCheck_ALL] = useState(false);
  const [check_box1, setCheck_box1] = useState(false);
  const [check_box2, setCheck_box2] = useState(false);
  const [check_box3, setCheck_box3] = useState(false);
  const [check_box4, setCheck_box4] = useState(false);

  // 약관 전체 동의
  const onCHKALL = (e) => {
    if (e.target.checked) {
      setCheck_ALL(true);
      setCheck_box1(true);
      setCheck_box2(true);
      setCheck_box3(true);
      setCheck_box4(true);
    } else {
      setCheck_ALL(false);
      setCheck_box1(false);
      setCheck_box2(false);
      setCheck_box3(false);
      setCheck_box4(false);
    }
  };

  // 약관 동의
  const onCHKBOX = (event, num) => {
    if (num === 1) event.target.checked ? setCheck_box1(true) : setCheck_box1(false);
    else if (num === 2) event.target.checked ? setCheck_box2(true) : setCheck_box2(false);
    else if (num === 3) event.target.checked ? setCheck_box3(true) : setCheck_box3(false);
    else if (num === 4) event.target.checked ? setCheck_box4(true) : setCheck_box4(false);
  };

  // 회원가입
  const onClick = () => {
    if (check_box1 && check_box2) {
      axios
        .post("/signup", {
          memberId: props.id,
          password: props.data.password,
          name: props.name,
          phone: props.phone,
          email: props.data.email,
          address: props.data.address,
          detailAddress: props.data.address_detail,
          birth: props.data.birth,
          acceptLocation: check_box3,
          acceptAlarm: check_box4
        })
        .then(() => {
            props.setMode(4);
        })
        .catch((e) => {
          alert("회원가입에 실패하였습니다. 다시 시도해주세요.");
          navigate("/signup");
        });
    } else {
      alert("필수 약관 동의에 체크해주세요.");
    }
  };

  return (
    <div className="Sign_wrap Signup_Accept_wrap">
      <div className="Sign_header Signup_header">회원가입</div>
      <div className="Signup_sub">
        <span className="Signup_sub_text">01 본인인증</span>
        <span className="Signup_sub_text">02 정보입력</span>
        <span className="Signup_sub_text Signup_sub_text_main">03 약관동의</span>
        <span className="Signup_sub_text">04 가입완료</span>
      </div>

      <div className="Signup_Accept">
        <div className="Signup_Accept_title">
          <input type="checkbox" id="all" name="all" onClick={onCHKALL} checked={check_ALL} />
          <label htmlFor="all">약관 전체 동의</label>
        </div>
        <div className="Signup_Accept_title">
          <input type="checkbox" id="one" name="one" onClick={(e) => {onCHKBOX(e, 1)}} checked={check_box1} />
          <label htmlFor="one">이용약관 동의 <span>(필수)</span></label>
        </div>
        <textarea className="Signup_Accept_content" value={noticeList[0].content} />
        <div className="Signup_Accept_title">
          <input type="checkbox" id="two" name="two" onClick={(e) => {onCHKBOX(e, 2)}} checked={check_box2} />
          <label htmlFor="two">개인정보 수집 및 이용 동의 <span>(필수)</span></label>
        </div>
        <textarea className="Signup_Accept_content" value={noticeList[1].content} />
        <div className="Signup_Accept_title">
          <input type="checkbox" id="three" name="three" onClick={(e) => {onCHKBOX(e, 3)}} checked={check_box3} />
          <label htmlFor="three">위치기반 서비스 이용약관 동의 <span>(선택)</span></label>
        </div>
        <textarea className="Signup_Accept_content" value={noticeList[2].content} />
        <div className="Signup_Accept_title">
          <input type="checkbox" id="four" name="four" onClick={(e) => {onCHKBOX(e, 4)}} checked={check_box4} />
          <label htmlFor="four">알림서비스 수신 동의 <span>(선택)</span></label>
        </div>
        <textarea className="Signup_Accept_content" value={noticeList[3].content} />
      </div>

      <div className="Sign_btn Signup_Accept_btn" onClick={onClick}>회원가입</div>
    </div>
  );
};

export default Signup_accept;
