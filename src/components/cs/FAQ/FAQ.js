import React, { useState, useEffect } from "react";
import { FAQList } from "./FAQList";
import FAQPOST from "./FAQPost";
import { Link, useLocation } from "react-router-dom";
import "../notice/NoticeList.css";
import "../CsNavbar.css";
import "./FAQ.css";
import searchIcon from "../../../images/search.png";
function FAQ() {
  const [dataList, setDataList] = useState([]);
  const [popup, setPopup] = useState();
  const [searchFAQ, setSearchFAQ] = useState();
  const [category, setCatrgory] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const logId = window.sessionStorage.getItem("id");
  // const logId= window.sessionStorage.getItem("id")

  useEffect(() => {
    // axios
    // .get("/cs/faq/", {
    //
    // })
    // .then((res) => {
    //   setDataList(res.data);
    // })
    // .catch((e) => {
    //   console.error(e);
    // });
    setDataList(FAQList);
    pageCount();
  }, []);

  const FAQRegi = () => {
    document.location.href = "/cs/faq/write";
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // 현재 페이지에 해당하는 데이터 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = FAQList.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 번호 클릭 이벤트 핸들러
  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };
  const pageCount = () => {
    setTotalPage(5);
  };
  // 페이지 번호 버튼 생성
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(FAQList.length / itemsPerPage); i++) {
    pageNumbers.push(
      <button key={i} id={i} onClick={handleClick}>
        {i}
      </button>
    );
  }

  // 조회수
  const changeCate = (item) => {
    setCatrgory(item);
    if (item !== 0) {
      // axios
      // .get("/cs/faq/", {
      //    cate:category
      // })
      // .then((res) => {
      //   setDataList(res.data);
      // })
      // .catch((e) => {
      //   console.error(e);
      // });
      return true;
    }
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
            />
          </div>
        </div>
      )}

      <hr className="FAQnavline" />
      <div className="FAQ-category">
        <button
          className={category === 0 ? "active" : ""}
          onClick={() => changeCate(0)}
        >
          전체
        </button>
        <button
          className={category === 1 ? "active" : ""}
          onClick={() => changeCate(1)}
        >
          주문/결제
        </button>
        <button
          className={category === 2 ? "active" : ""}
          onClick={() => changeCate(2)}
        >
          배송
        </button>
        <button
          className={category === 3 ? "active" : ""}
          onClick={() => changeCate(3)}
        >
          취소/환불/교환
        </button>
        <button
          className={category === 4 ? "active" : ""}
          onClick={() => changeCate(4)}
        >
          회원
        </button>
        <button
          className={category === 5 ? "active" : ""}
          onClick={() => changeCate(5)}
        >
          경매/낙찰
        </button>
        <button
          className={category === 6 ? "active" : ""}
          onClick={() => changeCate(6)}
        >
          기타
        </button>
      </div>

      {currentItems.map((item) => (
        <FAQPOST logId={logId} item={item} />
      ))}

      {totalPage > 1 && (
        <div className="NL-page">
          {currentPage === 1 ? (
            <span className="NL-page_prev_gray">&lt;</span>
          ) : (
            <span
              className="NL-page_prev"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              &lt;
            </span>
          )}
          <span className="NL-page_now">{currentPage}</span>
          &nbsp;&nbsp;/&nbsp;&nbsp;
          <span className="NL-page_total">{totalPage}</span>
          {currentPage === totalPage ? (
            <span className="NL-page_next_gray">&gt;</span>
          ) : (
            <span
              className="NL-page_next"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              &gt;
            </span>
          )}
        </div>
      )}
    </div>
  );
}
export default FAQ;
