import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FAQPOST from "./FAQPost";
import "../notice/NoticeList.css";
import "../CsNavbar.css";
import "./FAQ.css";

// 이미지파일
import searchIcon from "../../../images/search.png";

function FAQ() {
  const logId = window.sessionStorage.getItem("id");
  const nanigate = useNavigate();
  const [searchword, setSearchword] = useState();

  const searchRef = useRef();
  const [dataList, setDataList] = useState([]);

  const [category, setCatrgory] = useState(0);

  // 페이징기능
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getFaqList = () => {
    axios
    .get(`/cs/faq?faq_cate=${category}&page=${currentPage-1}&size=10&sort=faqNum,desc`)
    .then((res) => {
      const { data } = res;
      setDataList(data.content);
      setTotalPage(data.totalPages);
    })
    .catch((e) => {
      console.error(e);
    });
  }

  // 검색기능
  // 엔터키
  const activeEnter = (e) => {
    if(e.key === "Enter") {
      searchHandler();
    }
  }
  const searchHandler = () => {
    setSearchword(searchRef.current.value);
  }
  const getSearchList = () => {
    axios
    .get(`/cs/faq/search?search=${searchword}&faq_cate=${category}&page=${currentPage-1}&size=10&sort=faqNum,desc`)
    .then((res) => {
      const { data } = res;
      setDataList(data.content);
      setTotalPage(data.totalPages);
    })
    .catch((e) => {
      console.error(e);
    });
  }

  useEffect(() => {
    if (searchword === undefined) {
      getFaqList();
    } else {
      getSearchList();
    }
  }, [searchword, category, currentPage]);

  const changeCate = (item) => {
    setCatrgory(item);
    setCurrentPage(1);
  };

  return (
    <div className="FAQ-List-form">
      {logId === "admin" ? (
        <div className="FAQTitle">
          <div className="FAQTitleHead">FAQ</div>
          <div className="FAQSearchAdimin">
            <input type="text" placeholder="검색어를 입력하세요" ref={searchRef} onKeyDown={(e) => {activeEnter(e)}}/>
            <img className="FAQSearchIcon" src={searchIcon} alt="searchbutton" onClick={() => {searchHandler()}}/>
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
            <input type="text" placeholder="검색어를 입력하세요" ref={searchRef} />
            <img className="FAQSearchIcon" src={searchIcon} alt="searchbutton"/>
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
        <FAQPOST logId={logId} item={item} key={index} getList={getFaqList} />
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
