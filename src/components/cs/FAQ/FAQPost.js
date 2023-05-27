import React, { useState, useEffect } from "react";
import "../notice/NoticeList.css";
import arrow from "../../../images/arrow_icon_brown-240.png";
import "./FAQ.css";
import { Link } from "react-router-dom";
import axios from "axios";

const FAQPOST = ({ logId, item, getList }) => {
  const [cate, setCate] = useState("");
  const [mode, setMode] = useState(true);

  const deleteHandler = (faq_num) => {
    axios.get(`/cs/faq/delete?faq_num=${faq_num}`)
    .then((res) => {
      if (res.data === 1) {
        window.location.reload();
      }
    })
    .catch((e) => {
      console.error(e);
    })
  }

  useEffect(() => {
    setMode(true);
    if (item.faq_cate === 1) setCate("주문/결제");
    else if (item.faq_cate === 2) setCate("배송");
    else if (item.faq_cate === 3) setCate("취소/환불/교환");
    else if (item.faq_cate === 4) setCate("회원");
    else if (item.faq_cate === 5) setCate("경매/낙찰");
    else if (item.faq_cate === 6) setCate("기타");
  }, [item]);

  return (
    <>
      {logId === "admin" ? (
        <>
          {mode && (
            <div className="FAQ_List_post">
              <div className="FAQPostCate">{cate}</div>
              <div className="FAQAdminTitle" onClick={() => setMode(false)}>{item.faq_title}</div>
              <Link to="/cs/faq/update" state={{ item: item }}>
                <button className="FAQAdminUpdate">수정</button>
              </Link>
              <button className="FAQAdminDelete" onClick={() => {deleteHandler(item.faq_num)}}>삭제</button>
              <img className="FAQArrowRotate" src={arrow} onClick={() => setMode(false)} alt="arrow" />
            </div>
          )}
          {!mode && (
            <>
              <div className="FAQ_List_post">
                <div className="FAQPostCate">{cate}</div>
                <div className="FAQAdminTitle" onClick={() => setMode(true)}>{item.faq_title}</div>
                <Link to="/cs/faq/update" state={{ item: item }}>
                  <button className="FAQAdminUpdate">수정</button>
                </Link>
                <button className="FAQAdminDelete">삭제</button>
                <img className="FAQArrow" src={arrow} onClick={() => setMode(true)} alt="arrow" />
              </div>

              <div className="FAQ_content">
                <div className="FAQ_post_content">{item.faq_content}</div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {mode && (
            <div className="FAQ_List_post">
              <div className="FAQPostCate">{cate}</div>
              <div className="FAQPostTitle" onClick={() => setMode(false)}>{item.faq_title}</div>
              <img className="FAQArrowRotate" src={arrow} onClick={() => setMode(false)} alt="arrow" />
            </div>
          )}
          {!mode && (
            <>
              <div className="FAQ_List_post">
                <div className="FAQPostCate">{cate}</div>
                <div className="FAQPostTitle" onClick={() => setMode(true)}>{item.faq_title}</div>
                <img className="FAQArrow" src={arrow} onClick={() => setMode(true)} alt="arrow" />
              </div>
              <div className="FAQ_content">
                <div className="FAQ_post_content">{item.faq_content}</div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default FAQPOST;
