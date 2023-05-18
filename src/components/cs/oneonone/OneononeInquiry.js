import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./OneononeInquiry.css";
import OneononeData from "./OneononeData.json";

const InquiryList = () => {
  //admin 관리자페이지에서 수정,삭제
  const loginid = "admin";

  // const login_id = window.sessionStorage.getItem("member_id"); // 세션 ID
  const [dataList, setDataList] = useState([]);
  const [totalPage, setTotalPage] = useState(1); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  useEffect(() => {
    setDataList(OneononeData);

    pageCount(); // 문의 글 수 조회
  }, []);

  // 문의 글 수 조회
  const pageCount = () => {
    setTotalPage(5);
  };

  // 문의 글 목록 조회
  const ListSearch = () => {};

  // 조회수
  const readcountup = (e) => {};

  // 문의 글 삭제
  const deletePlInquiry = (e) => {
    e.stopPropagation();
    const deleteQ = window.confirm("정말 삭제하시겠습니까?");
    if (deleteQ) {
    }
  };

  return (
    <>
      <span className="OI-table">
        <div className="OI-header">
          <span className="OI-title"> 1:1 문의</span>

          {loginid === "" && (
            <Link to={`/cs/inquiry/write`} className="OI-post-btn">
              문의하기
            </Link>
          )}
        </div>
        <hr className="OI-line" />

        {/* 리스트 출력 */}
        <div className="OI-list_wrap">
          {dataList.map((item) => (
            <div className="OI-list" key={item.num}>
              <span className="OI-board-left-wrap">
                <Link
                  className="OI-board-num"
                  to={`/cs/inquiry/detail/${item.num}`}
                  onClick={readcountup}
                >
                  {item.num}
                </Link>
                <span>
                  {loginid === "admin" && (
                    <span className="OI-answer-wrap">
                      {item.ANSWER_STATE === "미답변" && (
                        <span className="OI-answer-n">
                          &nbsp;&nbsp;미답변&nbsp;&nbsp;
                        </span>
                      )}
                      {item.ANSWER_STATE === "답변" && (
                        <span className="OI-answer-y">답변완료</span>
                      )}
                    </span>
                  )}
                </span>
                <Link
                  className="OI-board-title"
                  to={`/cs/inquiry/detail`}
                  onClick={readcountup}
                >
                  {item.INQ_TITLE}
                </Link>
              </span>
              <span className="OI-board-right-wrap">
                <span className="OI-answer-state">
                  {loginid === "admin" && (
                    <>
                      <span className="OI-memberid">{item.MEMBER_ID}</span>
                    </>
                  )}
                  {loginid === "" && (
                    <>
                      {item.ANSWER_STATE === "답변" && (
                        <>
                          <span className="OI-answer-yes">답변완료</span>
                        </>
                      )}
                    </>
                  )}
                  <span className="inquirylist-post-date">{item.INQ_DATE}</span>
                  {loginid === "" && (
                    <>
                      {item.ANSWER_STATE === "미답변" && (
                        <>
                          <span
                            className="OI-delete-btn"
                            onClick={deletePlInquiry}
                          >
                            삭제
                          </span>
                        </>
                      )}
                    </>
                  )}
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* 페이지 출력 */}
        {totalPage > 1 && (
          <div className="OI-page">
            {currentPage === 1 ? (
              <span className="OI-page_prev_gray">&lt;</span>
            ) : (
              <span
                className="OI-page_prev"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                &lt;
              </span>
            )}
            <span className="OI-page_now">{currentPage}</span>
            &nbsp;&nbsp;/&nbsp;&nbsp;
            <span className="OI-page_total">{totalPage}</span>
            {currentPage === totalPage ? (
              <span className="OI-page_next_gray">&gt;</span>
            ) : (
              <span
                className="OI-page_next"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                &gt;
              </span>
            )}
          </div>
        )}
      </span>
    </>
  );
};

export default InquiryList;
