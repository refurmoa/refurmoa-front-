import React, { useEffect, useState } from "react";
// import "./Post.css";
import "./NoticeView.css";
import Data from "./Data.json";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import naver from "../../../images/iu.jpg";
import { Link } from "react-router-dom";

const NoticeView = () => {
  const location = useLocation();
  const ListDetail = location.state.ListDetail;
  const id = window.sessionStorage.getItem("id"); // 세션 ID

  const navigate = useNavigate();

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
      <div className="NV-board-wrap" key={ListDetail.notiNum}>
        <div className="NV-title-wrap">
          <span className="NV-board-title">{ListDetail.notiTitle}</span>
          <span className="NV-date">{ListDetail.notiDate.substr(0, 10)}</span>
        </div>
        <hr className="NV-title-line" />
        <div className="NV-info">{ListDetail.notiInf}</div>
      </div>
      <div className="NV-btn-wrap">
        <span className="NV-go-list-btn" onClick={() => navigate(-1)}>
          목록
        </span>
        {id === "admin" && (
          <>
            <Link
              to={`/cs/notice/write`}
              className="NV-edit-btn"
              state={{ ListDetail: ListDetail, PageState: 1 }}
            >
              수정
            </Link>
            <span className="NV-delete-btn" onClick={deleteList}>
              삭제
            </span>
          </>
        )}
      </div>
    </span>
  );
};
export default NoticeView;
