import React from "react";
import "../sign/signup/Signup.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Update_card = (props) => {
  const setCard_num = props.setCard_num;
  const setValid_date = props.setValid_date;
  const setCvc = props.setCvc;
  const setCard_pw1 = props.setCard_pw1;
  const setCard_pw2 = props.setCard_pw2;
  const setCard_Modal = props.setCard_Modal;
  const setCheck_box = props.setCheck_box;
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
                maxlength="16"
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
                maxLength={"16"}
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
              <textarea className="terms">
                리퍼모아(주)는 「개인정보보호법」 제15조 및 제22조, 제24조,
                「신용정보의 이용 및 보호에 관한 법률」 제33조 및 제34조에 따라
                귀하의 개인(신용)정보를 수집ㆍ이용하고자 합니다. ①수집ㆍ이용
                목적 서비스의 등록, 제공, 유지, 관리, 개선 서비스 분석을 위한
                자료 활용, 전화 상담, 민원 분쟁 해결, 법령상 의무 이행 본인 여부
                확인, 부정사용 예방 및 조사 관리 서비스 이용 내역 및 관련 서비스
                확인 ② 수집ㆍ이용할 정보의 내용 개인식별 정보 : 성명, 생년월일,
                성별, 내외국인구분, CI, 휴대폰번호, 이메일(E-mail), 비씨카드
                웹회원 아이디(ID)/비밀번호(PASSWORD), 직장명, 부서명,
                연락처(직장, 자택), 주소(직장, 자택) 결제정보 : 결제시간,
                카드사구분, 발행사구분, 구입상품, 결제금액,
                할부(할부여부,할부개월수) 접속 관련 정보 : IP주소, 웹브라우저
                정보, OS 정보, 방문일시, 접속로그, 개인방화벽 설정, 운영체계
                보안패치 여부, 쿠키정보, 원격접속 설정, 키보드 타입 기기 및 접속
                정보 1) PC N/W정보 : IP주소 2) 모바일 기본정보 : UUID, 푸시토큰
                H/W정보 : 단말기ID(IMEI) 등 기기고유값 ③ 보유 및 이용 기간
                개인(신용)정보는 개인(신용)정보의 수집 및 이용 목적이 달성되면
                지체 없이 파기됩니다. 단, 회원으로부터 사전에 동의를 받은 경우
                또는 상법 등 관련 법규에 의하여 다음과 같이 거래관련 권리 의무
                관계의 확인 등을 이유로 일정기간 보유해야 할 필요성이 있을 경우
                회사는 다음과 같이 일정기간 보유합니다. 회원가입을 탈회하거나
                회원에서 제명된 경우 권리침해/명예훼손 분쟁 및 수사협조 의뢰에
                대비하여 이용계약 해지일로부터 5년 동안 개인(신용)정보를
                보존합니다. 계약 또는 청약철회 등에 관한 기록 : 5년 대금결제 및
                재화 등의 공급에 관한 기록 : 5년 소비자의 불만 또는 분쟁처리에
                관한 기록 : 3년 기타 고객의 동의를 받은 경우 : 동의를 받은
                기간까지 ※ 귀하는 개인(신용)정보의 수집ㆍ이용에 대한 동의를
                거부할 수 있습니다. 다만, 본 동의는 비씨카드 서비스 제공을 위한
                필수 동의로 귀하가 이에 동의하지 않을 경우 서비스의 이용이
                불가능하오니 이점 유의하여 주시기 바랍니다.
              </textarea>
            </td>
          </tr>
        </table>
      </div>

      <button className="UU_input_btn" onClick={onChangeCard}>
        다음
      </button>
    </>
  );
};

export default Update_card;
