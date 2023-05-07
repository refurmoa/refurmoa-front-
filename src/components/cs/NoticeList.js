import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NoticeList.css";
import { noticeList } from "../../components/cs/Data";

const NoticeList = () => {
  //admin 관리자페이지에서 수정,삭제
  const loginid = "admin";

  // 데이터를 페이지 단위로 나누기 위한 변수들
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setDataList(noticeList);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // 현재 페이지에 해당하는 데이터 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = noticeList.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 번호 클릭 이벤트 핸들러
  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  // 페이지 번호 버튼 생성
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(noticeList.length / itemsPerPage); i++) {
    pageNumbers.push(
      <button key={i} id={i} onClick={handleClick}>
        {i}
      </button>
    );
  }

  // 조회수
  const readcountup = (e) => {};

  return (
    <>
      <table className="noticelist-table">
        <thead>
          <tr>
            <td className="noticelist-header">
              공지사항
              {loginid === "admin" && (
                <button className="admin-post-btn">등록</button>
              )}
            </td>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => {
            return (
              <tr key={index}>
                <td className="noticelist-post">
                  <span>
                    <Link
                      className="noticelist-post-title"
                      to={`/notice/detail/${item.noti_num}`}
                      onClick={readcountup}
                    >
                      {item.title}
                    </Link>
                  </span>
                  <span className="noticelist-admin">
                    {loginid === "admin" && (
                      <>
                        <Link
                          to={`/notice/update/${item.noti_num}`}
                          className="admin-edit-btn"
                        >
                          수정
                        </Link>
                        <button className="admin-delete-btn">삭제</button>
                      </>
                    )}

                    <div className="noticelist-post-date">{item.date}</div>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="noticelist-pagination">
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
              currentPage === Math.ceil(noticeList.length / itemsPerPage)
            }
          >
            {">"}
          </button>
        </div>
      </div>
    </>
  );
};

export default NoticeList;
