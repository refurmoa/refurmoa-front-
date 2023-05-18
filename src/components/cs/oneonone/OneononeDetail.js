import React, { useEffect, useState } from "react";
import { getPostByNo } from "./OneononeData";
// import "./Post.css";
import "./OneononeDetail.css";
import { inquiryList } from "./OneononeData";
import { useNavigate, useParams } from "react-router-dom";
import naver from "../../../images/naver.png";
import { Link } from "react-router-dom";

const OneononeDetail = () => {
  //admin 관리자페이지에서 수정,삭제
  // const loginid = "";

  const noticeid = useParams().noticeid;
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setDataList(inquiryList);
  }, []);
  // const [data, setData] = useState({});

  // useEffect(() => {
  //   setData(getPostByNo(no));
  // }, []);
  console.log(noticeid);
  console.log(inquiryList);

  const [currentPage, setCurrentPage] = useState(2);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  // 현재 페이지에 해당하는 데이터 추출

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inquiryList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <span className="OD-wrap">
        <div className="OD-header">
          <span className="OD-title"> 1:1 문의</span>
        </div>
        <hr className="OD-line" />

        {currentItems.map((item, index) => {
          return (
            <div key={index}>
              <span>
                <span className="OD-view-title">{item.INQ_TITLE} </span>
                <span className="OD-top-wrap">
                  <span className="OD-view-date">{item.INQ_DATE}</span>
                  <button className="OD-delete-btn">삭제</button>
                </span>
              </span>
              <hr className="OD-title-line" />

              <div className="OD-content">{item.INQ_CON}</div>

              <div className="OD-content-box">
                <span className="OD-reply-icon">A.</span>
                <label className="OD-reply-content">
                  {item.ANSWER_CON} <br></br>
                  <img src={naver} alt="naver" />
                </label>
                <br></br>
                <span className="OD-reply-date">{item.ANSWER_date}</span>
              </div>
              <button className="OD-go-list-btn" onClick={() => navigate(-1)}>
                목록
              </button>
              {/* {loginid === "admin" && (
                      <>
                        <button className="oneonone-detail-edit-btn">
                          수정
                        </button>
                        
                      </>
                    )} */}
            </div>
          );
        })}
      </span>
    </>
  );
};
export default OneononeDetail;
