import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../notice/NoticeList.css";
import "../CsNavbar.css";
import "./FAQ.css";

function FAQUpdate() {
  const location = useLocation();
  const item = location.state.item;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCatrgory] = useState(0);
  // const logId= window.sessionStorage.getItem("id")

  useEffect(() => {
    setTitle(item.title);
    setContent(item.content);
    setInputCount(item.content.length);
    setCatrgory(item.FAQ_cate);
  }, []);
  let [inputCount, setInputCount] = useState(0);
  const onInputHandler = (e) => {
    setContent(e.target.value);
    setInputCount(e.target.value.length);
  };

  const FAQcancel = () => {
    if (window.confirm("수정을 취소하시겠습니까?")) {
      document.location.href = "/cs/faq";
    } else {
      return false;
    }
  };
  const FAQregi = () => {
    if (window.confirm("수정을 완료하시겠습니까?")) {
      // axios
      // .post("/cs/faq/write", {
      //     title: title,
      //     content: content,
      //     category:category,
      //     date: new Date(),
      // })
      // .then((res) => {
      //   if (res.data === 1) {
      //     alert("성공적으로 등록되었습니다.");
      //   } else {
      //     alert("등록에 실패했습니다.");
      //   }
      // })
      // .catch((e) => {
      //   console.error(e);
      // });
      alert("등록이 완료되었습니다.");
      document.location.href = "/cs/faq";
    } else {
      return false;
    }
  };
  return (
    <div className="FAQ-List-form">
      <div className="FAQTitle">
        <div className="FAQTitleHead">FAQ</div>
      </div>
      <hr className="FAQnavline" />
      <div className="FAQ-Writecategory">
        <button
          className={category === 1 ? "active" : ""}
          onClick={() => setCatrgory(1)}
        >
          주문/결제
        </button>
        <button
          className={category === 2 ? "active" : ""}
          onClick={() => setCatrgory(2)}
        >
          배송
        </button>
        <button
          className={category === 3 ? "active" : ""}
          onClick={() => setCatrgory(3)}
        >
          취소/환불/교환
        </button>
        <button
          className={category === 4 ? "active" : ""}
          onClick={() => setCatrgory(4)}
        >
          회원
        </button>
        <button
          className={category === 5 ? "active" : ""}
          onClick={() => setCatrgory(5)}
        >
          경매/낙찰
        </button>
        <button
          className={category === 6 ? "active" : ""}
          onClick={() => setCatrgory(6)}
        >
          기타
        </button>
      </div>
      <div className="FAQ_Title_input">
        <input
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(title)}
          maxLength="20"
        />
      </div>
      <div className="FAQ_Text_input">
        <textarea
          className="FAQ_Text_content"
          type="text"
          placeholder="제품 하자 내용"
          onChange={onInputHandler}
          maxLength="500"
          value={content}
        />
        <span className="FAQ_Text_countInput">{inputCount}/500</span>
      </div>
      <div className="FAQ_button">
        <button className="FAQ_button_cancel" onClick={FAQcancel}>
          취소
        </button>
        <button className="FAQ_button_regi" onClick={FAQregi}>
          수정
        </button>
      </div>
    </div>
  );
}
export default FAQUpdate;
