import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FAQPOST from "./FAQPost";
import "../notice/NoticeList.css";
import "../CsNavbar.css";
import "./FAQ.css";

// 더미데이터
import { FAQList } from "./FAQList";
// 이미지파일
import searchIcon from "../../../images/search.png";

function FAQ() {
  const logId = window.sessionStorage.getItem("id");
  const [dataList, setDataList] = useState([]);
  const [searchFAQ, setSearchFAQ] = useState();

  const [category, setCatrgory] = useState(0);

  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
    .get(`/cs/faq?faq_cate=${category}&page=${currentPage-1}&size=10`)
    .then((res) => {
      const { data } = res;
      console.log(data);
      setDataList(data.content);
      setTotalPage(data.totalPages);
    })
    .catch((e) => {
      console.error(e);
    });
  }, [category, currentPage]);

  const changeCate = (item) => {
    setCatrgory(item);
    setCurrentPage(0);
  };

  return (
    <div className="FAQ-List-form">
      {logId === "admin" ? (
        <div className="FAQTitle">
          <div className="FAQTitleHead">FAQ</div>
          <div className="FAQSearchAdimin">
            <input type="text" placeholder="검색어를 입력하세요"></input>
            <img
              className="FAQSearchIcon"
              src={searchIcon}
              value={searchFAQ}
              onChange={(e) => setSearchFAQ(e.target.value)}
              alt="searchbutton"
            />
          </div>
          <div className="FAQRegi">
            <Link to="/cs/faq/write">
              <span>등록</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="FAQTitle">
          FAQ
          <div className="FAQSearch">
            <input type="text" placeholder="검색어를 입력하세요"></input>
            <img
              className="FAQSearchIcon"
              src={searchIcon}
              value={searchFAQ}
              onChange={(e) => setSearchFAQ(e.target.value)}
              alt="searchbutton"
            />
          </div>
        </div>
      )}

      <hr className="FAQnavline" />

      <div className="FAQ-category">
        <button className={category === 0 ? "active" : ""} onClick={() => changeCate(0)} >전체</button>
        <button className={category === 1 ? "active" : ""} onClick={() => changeCate(1)} >주문/결제</button>
        <button className={category === 2 ? "active" : ""} onClick={() => changeCate(2)} >배송</button>
        <button className={category === 3 ? "active" : ""} onClick={() => changeCate(3)} >취소/환불/교환</button>
        <button className={category === 4 ? "active" : ""} onClick={() => changeCate(4)} >회원</button>
        <button className={category === 5 ? "active" : ""} onClick={() => changeCate(5)} >경매/낙찰</button>
        <button className={category === 6 ? "active" : ""} onClick={() => changeCate(6)} >기타</button>
      </div>

      {dataList?.map((item, index) => (
        <FAQPOST logId={logId} item={item} key={index} />
      ))}

      {/* 총 페이지 수가 1보다 클 때 */}
      {totalPage > 1 && (
        <div className="NL-page">
          {currentPage === 1 ? (
            <span className="NL-page_prev_gray">&lt;</span>
          ) : (
            <span className="NL-page_prev" onClick={() => setCurrentPage(currentPage - 1)}>&lt;</span>
          )}

          <span className="NL-page_now">{currentPage}</span>
          &nbsp;&nbsp;/&nbsp;&nbsp;
          <span className="NL-page_total">{totalPage}</span>

          {currentPage === totalPage ? (
            <span className="NL-page_next_gray">&gt;</span>
          ) : (
            <span className="NL-page_next" onClick={() => setCurrentPage(currentPage + 1)}>&gt;</span>
          )}
        </div>
      )}
    </div>
  );
}
export default FAQ;
