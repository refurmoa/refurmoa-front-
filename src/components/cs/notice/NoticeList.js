import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NoticeList.css";
import { noticeList } from "../../components/cs/Data";
import "./CsNavbar.css";
import CsNavbar from "./CsNavbar";

const NoticeList = () => {
  //admin 관리자페이지에서 수정,삭제
  const loginid = "admin";

  // 데이터를 페이지 단위로 나누기 위한 변수들
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setDataList(noticeList);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

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
    <div className="CS-wrap">
      <CsNavbar />
      <span className="noticelist-main">
          <div className="noticelist-header">
            <span className="noticelist-title">공지사항</span>
            <span className="noticelist-admin-post">
              {loginid === "admin" && (
                <Link to="/notice/post" className="admin-post-btn">
                  등록
                </Link>
              )}
            </span>
          </div>
         <hr className="noticelist-line" />
         <div className="noticelist-wrap">
           <div>
              {currentItems.map((item, index) => {
              return (    
                  <div key={index} className="noticelist-post">
                    <span className="noticelist-title-wrap">                     
                          <Link to={`/notice/detail/${item.noti_num}`} onClick={readcountup}>
                            {item.title}
                          </Link>
                      </span>
                    <span className="noticelist-admin">
                      {loginid === "admin" && (
                        <>
                          <span>
                            <Link to={`/notice/update/${item.noti_num}`} className="noticelist-admin-edit-btn">
                              수정
                            </Link>
                          </span>
                          <span>
                            <button className="noticelist-admin-delete-btn">삭제</button>
                          </span>
                        </>
                      )}
                      <span className="noticelist-post-date">{item.date}</span>
                    </span>
                  </div>
                );
              })}        
            </div>
        </div>

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
      </span>
    </div>
  );
};

export default NoticeList;
