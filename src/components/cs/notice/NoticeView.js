import React, { useEffect, useState } from "react";
// import "./Post.css";
import "./NoticeView.css";
import Data from "./Data.json";
import { useNavigate, useParams } from "react-router-dom";
import naver from "../../../images/iu.jpg";
import { Link } from "react-router-dom";

const NoticeView = () => {
  //admin 관리자페이지에서 수정,삭제
  const loginid = "admin";

  const noticeid = useParams().noticeid;
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setDataList(Data);
  }, []);
  // const [data, setData] = useState({});

  // useEffect(() => {
  //   setData(getPostByNo(no));
  // }, []);
  console.log(noticeid);
  // console.log(noticeList);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  // 현재 페이지에 해당하는 데이터 추출

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataList.slice(indexOfFirstItem, indexOfLastItem);

  // 삭제
  const deleteList = (e) => {
    e.stopPropagation();
  };

  return (
    <span className="NV-wrap">
      <div className="NV-header">
        <span className="NV-title">공지사항</span>
      </div>
      <hr className="NV-line" />
      {currentItems.map((list) => {
        return (
          <div className="NV-board-wrap" key={list.noti_num}>
            <div className="NV-title-wrap">
              <span className="NV-board-title">{list.noti_title}</span>
              <span className="NV-date">{list.noti_date}</span>
            </div>
            <hr className="NV-title-line" />
            <div className="NV-info">{list.noti_inf}</div>

            <img className="NV-img" src={naver} alt="naver" />

            <div>
              <div className="NV-btn-wrap">
                <span className="NV-go-list-btn" onClick={() => navigate(-1)}>
                  목록
                </span>
                {loginid === "admin" && (
                  <>
                    <span
                      className="NV-edit-btn"
                      onClick={() => {
                        navigate("/cs/notice/update");
                      }}
                    >
                      수정
                    </span>
                    <span className="NV-delete-btn" onClick={deleteList}>
                      삭제
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </span>
  );
};
export default NoticeView;
