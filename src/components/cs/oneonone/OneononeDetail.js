import React, { useEffect, useState } from "react";
import { getPostByNo } from "./OneononeData";
// import "./Post.css";
import "./OneononeDetail.css";
import { inquiryList } from "./OneononeData";
import { useNavigate, useParams } from "react-router-dom";
import naver from "../../images/naver.png";
import { Link } from "react-router-dom";
import CsNavbar from "./CsNavbar";

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
      <CsNavbar />
      <table className="oneonone-detail-table">
        <thead>
          <tr>
            <th className="oneonone-detail-header">1:1 문의</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <div className="oneonone-detail-view-title">
                    <label>{item.title}</label>

                    <div>
                      <label className="oneonone-detail-view-date">
                        {item.date}
                      </label>
                      <button className="oneonone-detail-delete-btn">
                        삭제
                      </button>
                    </div>
                  </div>

                  <div className="oneonone-detail-content">{item.content}</div>
                  <div>
                    <div className="oneonone-content-box">
                      <span className="oneonone-reply-icon">A.</span>
                      <label className="oneonone-reply-content">
                        {item.answer} <br></br>
                        <img src={naver} alt="naver" />
                      </label>
                      <br></br>
                      <label className="oneonone-reply-date">
                        {item.answerdate}
                      </label>
                    </div>
                    <button
                      className="oneonone-view-go-list-btn"
                      onClick={() => navigate(-1)}
                    >
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default OneononeDetail;
