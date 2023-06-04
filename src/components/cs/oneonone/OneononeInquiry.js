import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./OneononeInquiry.css";
import OneononeData from "./OneononeData.json";
import axios from "axios";
import moment from "moment";

const InquiryList = () => {
  const loginid = window.sessionStorage.getItem("id"); // 세션 ID
  const [dataList, setDataList] = useState([]);
  const [totalPage, setTotalPage] = useState(1); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  var num=1;

  //목록 조회
  const setList = () => { 
    axios
      .get(`/cs/inquiry?id=${loginid}&page=${currentPage}&size=15&sort=answerCon,ASC&sort=inqDate,ASC`)
      .then((res) => {
        setDataList(res.data.content);
        setTotalPage(res.data.totalPages); 
      })
      .catch((e) => {
        // console.error(e);
      });
  }
  useEffect(() => {
    setList();
  }, [currentPage])

  // 조회수
  const readcountup = (e) => {};

  // 문의 글 삭제
  const deletePlInquiry = (num) => {
    const deleteQ = window.confirm("정말 삭제하시겠습니까?");
    if (deleteQ) {
      axios
      .get(`/cs/inquiry/delete?num=${num}`)
      .then((res) => {
          window.location.reload();
      })
      .catch((e) => {
        // console.error(e);
      });

    }
  };

  return (
    <>
      <span className="OI-table">
        <div className="OI-header">
          <span className="OI-title"> 1:1 문의</span>

          {loginid !== "admin" && (
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
                  to="/cs/inquiry/detail"
                  state={{ item: item.num }}
                  onClick={readcountup}
                >
                  {num++}
                </Link>
                <span>
                  {loginid === "admin" && (
                    <span className="OI-answer-wrap">
                      {item.answerState === 0 ? (
                        <span className="OI-answer-n">
                          &nbsp;&nbsp;미답변&nbsp;&nbsp;
                        </span>
                      ) : (
                        <span className="OI-answer-y">답변완료</span>
                      )}
                    </span>
                  )}
                </span>
                <Link
                  className="OI-board-title"
                  to="/cs/inquiry/detail"
                  state={{ item: item.num }}
                  onClick={readcountup}
                >
                  {item.inqTitle}
                </Link>
              </span>
              <span className="OI-board-right-wrap">
                <span className="OI-answer-state">
                  {loginid === "admin" ? (
                    <>
                      <span className="OI-memberid">{item.memberId}</span>
                      <span className="OI-memberid">{moment(item.inqDate).format("YYYY-MM-DD")}</span>
                    </>
                  ) : (
                    <>
                      {item.answerState !== 0  && (
                        <>
                          <span className="OI-answer-yes">답변완료</span>
                        </>
                      )}
                    </>
                  )}
                  {loginid !== "admin" && (
                    <span className="inquirylist-post-date">
                      {moment(item.inqDate).format("YYYY-MM-DD")}
                    </span>
                  )}
                  {loginid !== "admin" && (
                    <>
                      {item.answerState === 0 && (
                        <>
                          <span
                            className="OI-delete-btn"
                            onClick={()=>deletePlInquiry(item.num)}
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
        { totalPage > 1 &&
        <div className="PI-page">
          { currentPage === 0 ? <span className="PI-page_prev_gray">&lt;</span>
            : <span className="PI-page_prev" onClick={() => setCurrentPage(currentPage-1)}>&lt;</span>
          }
          <span className="PI-page_now">{currentPage+1}</span>
          &nbsp;&nbsp;/&nbsp;&nbsp;
          <span className="PI-page_total">{totalPage}</span>
          { currentPage+1 === totalPage ? <span className="PI-page_next_gray">&gt;</span>
            : <span className="PI-page_next" onClick={() => setCurrentPage(currentPage+1)}>&gt;</span>
          }
        </div>
      }

      </span>
    </>
  );
};

export default InquiryList;
