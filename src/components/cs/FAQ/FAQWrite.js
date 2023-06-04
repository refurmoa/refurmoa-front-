import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../notice/NoticeList.css";
import "../CsNavbar.css";
import "./FAQ.css";

function FAQWrite() {
  const navigate = useNavigate();
  const location = useLocation();

  // faq 게시글 데이터를 담기 위한 변수
  const [category, setCatrgory] = useState(0);
  const titleRef = useRef();
  const contentRef = useRef();

  // textarea 카운트 상태변수
  const [inputCount, setInputCount] = useState(0);

  // 게시글 등록, 수정 상태변수
  const [formState, setFormState] = useState("");

  // 취소 버튼
  const FAQcancel = () => {
    if (window.confirm(`${formState}을 취소하시겠습니까?`)) {
      document.location.href = "/cs/faq";
    } else {
      return false;
    }
  };

  // 등록 or 수정 버튼
  const FAQregi = () => {
    if (category === 0) {
      return alert("카테고리를 선택해주세요.");
    }
    if (titleRef.current.value==="") {
      return alert("제목을 작성해주세요.");
    }
    if (contentRef.current.value==="") {
      return alert("내용을 작성해주세요.");
    }
    if (window.confirm(`${formState}을 완료하시겠습니까?`)) {
      if (formState === "등록") { // formState가 등록인경우
        const writeData = {
          faq_cate: category,
          faq_title: titleRef.current.value,
          faq_content: contentRef.current.value,
          faq_date: new Date(),
        }
        axios
        .post("/cs/faq/write", writeData)
        .then((res) => {
          if (res.data === 1) {
            alert(`게시글 ${formState}완료`);
            navigate(-1);
          } else {
            alert(`게시글 ${formState}실패`);
          }
        })
        .catch((e) => {
          console.error(e);
        });
      } else if (formState === "수정") {  // formState가 수정인경우
        const updateData = {
          faq_num: location.state.item.faq_num,
          faq_cate: category,
          faq_title: titleRef.current.value,
          faq_content: contentRef.current.value
        }
        axios
        .post("/cs/faq/update", updateData)
        .then((res) => {
          if (res.data === 1) {
            alert(`게시글 ${formState}완료`);
            navigate(-1);
          } else {
            alert(`게시글 ${formState}실패`);
          }
        })
      .catch((e) => {
        console.error(e);
      });
      }
    }
  };

  useEffect(() => {
    if ((sessionStorage.getItem("id") !== "admin") && (sessionStorage.getItem("id") !== null)) {
      return navigate("/");
    } else if (sessionStorage.getItem("id") === null) {
      return navigate("/login");
    };
    if (location.state) {
      setFormState("수정");
      const { item } = location.state;
      console.log(item);
      setCatrgory(item.faq_cate);
      titleRef.current.value = item.faq_title;
      contentRef.current.value = item.faq_content;
    } else {
      setFormState("등록");
    }
  }, []);

  return (
    <div className="FAQ-List-form">
      <div className="FAQTitle">
        <div className="FAQTitleHead">FAQ</div>
      </div>
      <hr className="FAQnavline" />
      <div className="FAQ-Writecategory">
        <button className={category === 1 ? "active" : ""} onClick={() => setCatrgory(1)}>주문/결제</button>
        <button className={category === 2 ? "active" : ""} onClick={() => setCatrgory(2)}>배송</button>
        <button className={category === 3 ? "active" : ""} onClick={() => setCatrgory(3)}>취소/환불/교환</button>
        <button className={category === 4 ? "active" : ""} onClick={() => setCatrgory(4)}>회원</button>
        <button className={category === 5 ? "active" : ""} onClick={() => setCatrgory(5)}>경매/낙찰</button>
        <button className={category === 6 ? "active" : ""} onClick={() => setCatrgory(6)}>기타</button>
      </div>
      <div className="FAQ_Title_input">
        <input placeholder="제목을 입력하세요" ref={titleRef} maxLength="50"/>
      </div>
      <div className="FAQ_Text_input">
        <textarea className="FAQ_Text_content" type="text" placeholder="내용을 입력하세요." ref={contentRef} onChange={(e) => {setInputCount(e.target.value.length)}} maxLength="500"/>
        <span className="FAQ_Text_countInput">{inputCount}/500</span>
      </div>
      <div className="FAQ_button">
        <button className="FAQ_button_cancel" onClick={FAQcancel}>취소</button>
        <button className="FAQ_button_regi" onClick={FAQregi}>{formState}</button>
      </div>
    </div>
  );
}
export default FAQWrite;
