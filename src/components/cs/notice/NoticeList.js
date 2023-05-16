// 공지사항 목록 페이지

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NoticeList.css";
import Data from "./Data.json";

const NoticeList = () => {
// const login_id = window.sessionStorage.getItem("member_id"); // 세션 ID
const [dataList, setDataList] = useState([]);
const [totalPage, setTotalPage] = useState(1); // 총 페이지 수
const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

const login_id = "admin";

useEffect(() => {
  setDataList(Data);

  pageCount(); // 문의 글 수 조회
}, []);

// 문의 글 목록 조회
const ListSearch = () => {

}

// 조회수
const readcountUp = (e) => {

}

// 삭제
const deleteList = (e) => {
  e.stopPropagation();
}

// 문의 글 수 조회
const pageCount = () => {
  setTotalPage(5);
}

return (
  <span className="NL-wrap">
    <div className="NL-header">
      <span className="NL-title">공지사항</span>
      {login_id === "admin" && 
        <Link to="/cs/notice/write" className="NL-post-btn">등록</Link>
      }
    </div>
    <hr className="NL-line" />

    {/* 리스트 출력 */}
    <div className="NL-list_wrap">
        {dataList.map((list) => (
          <div className="NL-list" key={list.noti_num}>
            <Link className="NL-list_title" to={`/cs/notice/detail/${list.noti_num}`} onClick={readcountUp}>
              {list.noti_title}
            </Link>
            <span className="NL-list_right_wrap">
              {login_id === "admin" && (
                <span className="NL-list_admin_btn_wrap">
                  <Link to={`/cs/notice/update/${list.noti_num}`} className="NL-list_btn">
                    수정
                  </Link>
                  <span className="NL-list_btn" onClick={deleteList}>삭제</span>
                </span>
              )}
              <span className="NL-list-date">{list.noti_date}</span>
            </span>
          </div>
        ))}
    </div>

    {/* 페이지 출력 */}
    { totalPage > 1 &&
      <div className="NL-page">
        { currentPage === 1 ? <span className="NL-page_prev_gray">&lt;</span>
          : <span className="NL-page_prev" onClick={() => setCurrentPage(currentPage - 1)}>&lt;</span>
        }
        <span className="NL-page_now">{currentPage}</span>
        &nbsp;&nbsp;/&nbsp;&nbsp;
        <span className="NL-page_total">{totalPage}</span>
        { currentPage === totalPage ? <span className="NL-page_next_gray">&gt;</span>
          : <span className="NL-page_next" onClick={() => setCurrentPage(currentPage + 1)}>&gt;</span>
        }
      </div>
    }
  </span>
);
};

export default NoticeList;
