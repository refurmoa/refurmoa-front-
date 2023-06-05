// 공지사항 목록 페이지

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NoticeList.css";
import axios from "axios";

const NoticeList = () => {
  const login_id = window.sessionStorage.getItem("id"); // 세션 ID
  const [dataList, setDataList] = useState([]);
  const [totalPage, setTotalPage] = useState(1); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [PageState, setPageState] = useState(0);

  useEffect(() => {
    NoticeList(); // 문의 글 수 조회
  }, [currentPage]);

  // 문의 글 목록 조회
  const NoticeList = () => {
    axios
      .get(`/cs/notice?page=${currentPage - 1}&size=10&sort=notiNum,desc`)
      .then((res) => {
        setDataList(res.data.content);
        setTotalPage(res.data.totalPages);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 삭제하기
  const deleteList = (list) => {
    axios
      .post("/cs/notice/delete", {
        notiNum: list.notiNum,
      })
      .then(() => {
        alert("삭제가 완료되었습니다.");
        NoticeList();
      })
      .catch((e) => {
        alert("실패하였습니다. 다시 시도해주세요.");
        console.error(e);
      });
  };

  return (
    <span className="NL-wrap">
      <div className="NL-header">
        <span className="NL-title">공지사항</span>
        {login_id === "admin" && (
          <Link
            to="/cs/notice/write"
            className="NL-post-btn"
            state={{ PageState: 0 }}
          >
            등록
          </Link>
        )}
      </div>
      <hr className="NL-line" />

      {/* 리스트 출력 */}
      <div className="NL-list_wrap">
        {dataList.map((list) => (
          <div className="NL-list" key={list.notiNum}>
            <Link
              className="NL-list_title"
              to={`/cs/notice/detail`}
              state={{ ListDetail: list }}
            >
              {list.notiTitle}
            </Link>
            <span className="NL-list_right_wrap">
              {login_id === "admin" && (
                <span className="NL-list_admin_btn_wrap">
                  <Link
                    to={`/cs/notice/write`}
                    className="NL-list_btn"
                    state={{ ListDetail: list, PageState: 1 }}
                  >
                    수정
                  </Link>
                  <span
                    className="NL-list_btn"
                    onClick={() => deleteList(list)}
                  >
                    삭제
                  </span>
                </span>
              )}
              <span className="NL-list-date">
                {list.notiDate.substr(0, 10)}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* 페이지 출력 */}
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
    </span>
  );
};

export default NoticeList;
