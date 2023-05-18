import "./Footer.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { noticeList } from "../shared/AcceptText";
import logo from "../../images/logo.png";
import kakaoQR from "../../images/kakaotalkQR.png";

function Footer() {
    const navigate = useNavigate();
    const [qrModal, setQrModal] = useState(0); // 비즈니스 문의 모달 창
    const text1 = noticeList[0].content; // 이용약관 텍스트
    const text2 = noticeList[1].content; // 개인정보 처리방침 텍스트

    // 팝업창 열기(1 : 이용약관, 2 : 개인정보 처리방침)
    const openPopup = (p) => {
        const text = p === 1 ? noticeList[0].content : noticeList[1].content;
        const title = p === 1 ? "(주)리퍼모아 이용약관" : "(주)리퍼모아 개인정보 처리방침";

        const width = 500;
        const height = 600;
        const top = window.innerHeight / 2 - height / 2 + window.screenY;
        const left = window.innerWidth / 2 - width / 2 + window.screenX;
        const popupStyle = `width=${width},height=${height},left=${left},top=${top}`;
        
        const popup = window.open('', '', popupStyle);
        popup.document.write(`
            <html>
                <head>
                    <title>${title}</title>
                </head>
                <body>
                    ${text}
                </body>
            </html>
        `);
        popup.document.close();
    }

    return (
      <footer className="F-wrapper">
        <hr className="F-Line" />
        <div className="F-content">
            <div className="F-top">
                <span className="F-logo_wrap">
                    <img className="F-logo" alt="로고" src={logo} onClick={() => {navigate(`/`)}}></img>
                </span>
                <span className="F-menu">
                    <span className="F-menulist" onClick={() => {openPopup(1)}}>이용약관</span>
                    &nbsp;|&nbsp;
                    <span className="F-menulist" onClick={() => {openPopup(2)}}>개인정보 처리방침</span>
                    &nbsp;|&nbsp;
                    <span className="F-menulist" onClick={() => {navigate(`/partnership`)}}>파트너 제휴</span>
                    &nbsp;|&nbsp;
                    <span className="F-menulist" onClick={() => {setQrModal(1)}}>비즈니스 문의</span>
                </span>
            </div>
            <div className="F-bottom">
                <span className="F-company_info_text">
                    <div className="F-name">(주)리퍼모아</div>
                    <div className="F-info">
                        서울특별시 강남구 언주로 508 14층(역삼동, 서울상록빌딩) <br />
                        <span className="F-info_title">사업자등록번호</span> 123-45-67890 &nbsp;&nbsp;
                        <span className="F-info_title">통신판매업신고</span> 2023-서울강남-0000
                    </div>
                    <div className="F-copyright">COPYRIGHT ⓒ REFURMOA ALL RIGHTS RESERVED</div>
                </span>
                <span className="F-service">
                    <div className="F-contact">
                        <span className="F-contact_name">고객센터</span>
                        &nbsp;1588-5188&nbsp;&nbsp;&nbsp;
                        <span className="F-contact_name">윤세진</span>
                        &nbsp;w_star25@naver.com&nbsp;&nbsp;&nbsp;
                        <span className="F-contact_name">남동희</span>
                        &nbsp;ddonhee@gmail.com<br />
                        <span className="F-contact_name">설승운</span>
                        &nbsp;sus9763@gmail.com&nbsp;&nbsp;&nbsp;
                        <span className="F-contact_name">임재현</span>
                        &nbsp;ijh4u24@gmail.com&nbsp;&nbsp;&nbsp;
                        <span className="F-contact_name">최현준</span>
                        &nbsp;sajun288@gmail.com
                    </div>
                    <div className="F-service_info">
                    (주)리퍼모아는 소비자 보호를 위한 고객센터를 운영하고 있으며,<br />
                    관련 분쟁이 발생할 경우 별도의 분쟁 처리절차에 의거 분쟁이 처리됩니다.
                    </div>
                </span>
            </div>
        </div>
        {   qrModal === 1 &&
            <div className="F-QRModal_wrap" onClick={() => {setQrModal(0)}}>
                    <img className="F-QRModal" alt="찜하기" src={kakaoQR}></img>
            </div>
        }
      </footer>
    );
}
  
export default Footer;