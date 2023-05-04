import React, { useEffect, useState } from "react";
import { getPostByNo } from "../../components/cs/Data";
// import "./Post.css";
import "./NoticeView.css";
import { noticeList } from "../../components/cs/Data";
import { useNavigate, useParams } from "react-router-dom";

const NoticeView = () => {
  const noticeid = useParams().noticeid;
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setDataList(noticeList);
  }, []);
  // const [data, setData] = useState({});

  // useEffect(() => {
  //   setData(getPostByNo(no));
  // }, []);
  console.log(noticeid);
  console.log(noticeList);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  // 현재 페이지에 해당하는 데이터 추출

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = noticeList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <table className="noticelist-table">
        <tr>
          <td className="noticelist-header">공지사항</td>
        </tr>
        {currentItems.map((item, index) => {
          return (
            <tr key={index}>
              <div className="noticelist-view-title">
                <label>{item.title}</label>

                <div className="noticelist-view-date">
                  <label>{item.date}</label>
                </div>
              </div>
              <div>{item.content}</div>
              <div className="post-view-wrapper">
                <div className="content-box">
                  <label>사진?</label>
                </div>
                <button
                  className="post-view-go-list-btn"
                  onClick={() => navigate(-1)}
                >
                  목록
                </button>
              </div>
            </tr>
          );
        })}
      </table>
    </>
  );
};
export default NoticeView;
