import React, { useState, useEffect } from "react";
import "../notice/NoticeList.css";
import arrow from "../../../images/arrow_icon_brown-240.png";
import "./FAQ.css";
import userEvent from "@testing-library/user-event";
import { Link, useLocation } from "react-router-dom";
const FAQPOST = (props) => {
  const item = props.item;
  const logId = props.logId;
  const [cate, setCate] = useState("");
  const [mode, setMode] = useState(true);
  useEffect(() => {
    console.log(item.FAQ_cate);
    if (item.FAQ_cate === 1) setCate("주문/결제");
    else if (item.FAQ_cate === 2) setCate("배송");
    else if (item.FAQ_cate === 3) setCate("취소/환불/교환");
    else if (item.FAQ_cate === 4) setCate("회원");
    else if (item.FAQ_cate === 5) setCate("경매/낙찰");
    else if (item.FAQ_cate === 6) setCate("기타");
  }, []);

  return (
    <>
      {logId === "admin" ? (
        <>
          {mode && (
            <div className="FAQ_List_post">
              <div className="FAQPostCate">{cate}</div>
              <div className="FAQAdminTitle" onClick={() => setMode(false)}>
                {item.title}
              </div>
              <Link to="/cs/faq/update" state={{ item: item }}>
                <button className="FAQAdminUpdate">수정</button>
              </Link>
              <button className="FAQAdminDelete">삭제</button>
              <img
                className="FAQArrowRotate"
                src={arrow}
                onClick={() => setMode(false)}
              />
            </div>
          )}
          {!mode && (
            <>
              <div className="FAQ_List_post">
                <div className="FAQPostCate">{cate}</div>
                <div className="FAQAdminTitle" onClick={() => setMode(true)}>
                  {item.title}
                </div>
                <Link to="/cs/faq/update" state={{ item: item }}>
                  <button className="FAQAdminUpdate">수정</button>
                </Link>
                <button className="FAQAdminDelete">삭제</button>
                <img
                  className="FAQArrow"
                  src={arrow}
                  onClick={() => setMode(true)}
                />
              </div>

              <div className="FAQ_content">
                <div className="FAQ_post_content">{item.content}</div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {mode && (
            <div className="FAQ_List_post">
              <div className="FAQPostCate">{cate}</div>
              <div className="FAQPostTitle" onClick={() => setMode(false)}>
                {item.title}
              </div>
              <img
                className="FAQArrowRotate"
                src={arrow}
                onClick={() => setMode(false)}
              />
            </div>
          )}
          {!mode && (
            <>
              <div className="FAQ_List_post">
                <div className="FAQPostCate">{cate}</div>
                <div className="FAQPostTitle" onClick={() => setMode(true)}>
                  {item.title}
                </div>
                <img
                  className="FAQArrow"
                  src={arrow}
                  onClick={() => setMode(true)}
                />
              </div>
              <div className="FAQ_content">
                <div className="FAQ_post_content">{item.content}</div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default FAQPOST;
