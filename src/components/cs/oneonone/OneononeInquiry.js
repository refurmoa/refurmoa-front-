import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./OneononeInquiry.css";
import { inquiryList } from "./OneononeData";

const InquiryList = () => {
  //admin 관리자페이지에서 수정,삭제
  const loginid = "";

  //답변여부에 따른 상태
  const answerstatus = "no";

  // 데이터를 페이지 단위로 나누기 위한 변수들
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setDataList(inquiryList);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // 현재 페이지에 해당하는 데이터 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inquiryList.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 번호 클릭 이벤트 핸들러
  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  // 페이지 번호 버튼 생성
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(inquiryList.length / itemsPerPage); i++) {
    pageNumbers.push(
      <button key={i} id={i} onClick={handleClick}>
        {i}
      </button>
    );
  }

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
      <table className="inquirylist-table">
        <thead>
          <tr>
            <td className="inquirylist-header">
              1:1 문의
              {loginid === "" && (
                <Link to={`/cs/inquiry/write`} className="inquiry-post-btn">
                  문의하기
                </Link>
              )}
            </td>
          </tr>
        </thead>
        <tbody className="inquirylist-tbody">
          {currentItems.map((item, index) => {
            return (
              <tr key={index}>
                <td className="inquirylist-post">
                  <span>
                    <label className="inquirylist-post-num">{item.num}</label>
                    <Link
                      className="inquirylist-post-title"
                      to={`/cs/inquiry/detail`}
                      onClick={readcountup}
                    >
                      {item.title}
                    </Link>
                  </span>
                  <span className="inquirylist-answer-status">
                    {answerstatus === "no" && <>미답변</>}
                    {answerstatus === "yes" && <>답변완료</>}
                    <div className="inquirylist-post-date">{item.date}</div>
                    {loginid === "" && (
                      <>
                        {answerstatus === "no" && (
                          <>
                            <button
                              className="inquirylist-delete-btn"
                              onClick={deletePlInquiry}
                            >
                              삭제
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="inquirylist-pagination">
        <div>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          {pageNumbers}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(inquiryList.length / itemsPerPage)
            }
          >
            {">"}
          </button>
        </div>
      </div>
    </>
  );
};

export default InquiryList;
