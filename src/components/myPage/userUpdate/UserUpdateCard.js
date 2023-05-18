import React from "react";
import "../../sign/signup/Signup.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { noticeList } from "../../shared/AcceptText";
const Update_card = (props) => {
  const setCard_num = props.setCard_num;
  const setValid_date = props.setValid_date;
  const setCvc = props.setCvc;
  const setCard_pw1 = props.setCard_pw1;
  const setCard_pw2 = props.setCard_pw2;
  const setCard_Modal = props.setCard_Modal;
  const setCheck_box = props.setCheck_box;
  const text = noticeList[4].content;

  const onChangeCard = (e) => {
    setCard_Modal(false);
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
      <div className="SU_card_header">결제수단</div>
      <div className="form_wrap">
        <table className="SU_input_table">
          <tr>
            <td>
              <b>카드번호</b>
            </td>
            <td>
              <input
                name="card_num"
                type="text"
                maxlength="20"
                placeholder="0000-0000-0000-0000"
                onChange={(e) => setCard_num(e.target.value)}
              />
              <hr className="SU_input_line" />
            </td>
          </tr>
          <tr>
            <td>
              <b>유효기간</b>
            </td>
            <td>
              <input
                name="valid_date"
                type="month"
                placeholder="0000-0000-0000-0000"
                maxLength="150"
                onChange={(e) => setValid_date(e.target.value)}
              />
              <hr className="SU_input_line" />
            </td>
          </tr>
          <tr>
            <td>
              <b>CVC</b>
            </td>
            <td>
              <input
                name="cvc"
                type="text"
                placeholder="카드 뒷면 3자리 숫자"
                maxlength="3"
                onChange={(e) => setCvc(e.target.value)}
              />
              <hr className="SU_input_line" />
            </td>
          </tr>
          <tr>
            <td className="card_pw_header">
              <b>카드 비밀번호</b>
            </td>
            <td>
              <input
                className="card_pw"
                name="card_pw1"
                type="password"
                placeholder="*"
                maxlength="1"
                onChange={(e) => setCard_pw1(e.target.value)}
              />
              <input
                className="card_pw"
                name="card_pw2"
                type="password"
                placeholder="*"
                maxlength="1"
                onChange={(e) => setCard_pw2(e.target.value)}
              />
              *&nbsp;*
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="accept">
              <input type="checkbox" className="accept" onClick={onCHKbox} />
              개인(신용)정보 수집 및 이용 동의
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <textarea className="terms" value={text} />
            </td>
          </tr>
        </table>
      </div>
      <div className="UU_button_div">
        <button className="UU_input_btn" onClick={onChangeCard}>
          다음
        </button>
      </div>
    </>
  );
};

export default Update_card;
