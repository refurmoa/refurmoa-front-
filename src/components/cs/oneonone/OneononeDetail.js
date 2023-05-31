import React, { useEffect, useState } from "react";
import "./OneononeDetail.css";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const OneononeDetail = () => {
  const location = useLocation();
  const item = location.state.item;
  const login_id = window.sessionStorage.getItem("id");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  let [inputCount, setInputCount] = useState(0);

  //파일 다운로드
  const downloadImage = async (filename) => {
    const url =process.env.PUBLIC_URL+"/images/"+filename;
    const download = document.createElement('a');
    download.href = url;
    download.setAttribute('download', filename);
    download.setAttribute('type', 'application/json');
    download.click();
}
  const onInputHandler = (e) => {
    setContent(e.target.value);
    setInputCount(e.target.value.length);
  };
  const OD_Regi = () => {
    if (window.confirm("답변을 등록하시겠습니까?")) {
      // axios
      // .post("/cs/inq/write", {
      //     answerCon: content,
      //     ANSWER_DATE:new Date();
      // })
      // .then((res) => {
      //   if (res.data === 1) {
      //     alert("성공적으로 등록되었습니다.");
      //   } else {
      //     alert("등록에 실패했습니다.");
      //   }
      // })
      // .catch((e) => {
      //   console.error(e);
      // });
      return true;
    } else {
      alert("답변이 취소되었습니다.");
      return false;
    }
  };
  const [data, setData] = useState({});

  useEffect(() => {
    axios
    .get(`/cs/inquiry/detail?num=${item}`)
    .then((res) => {
      setData(res.data);
    })
    .catch((e) => {
      // console.error(e);
    });
  }, []);

  return (
    <>
      <span className="OD-wrap">
        <div className="OD-header">
          <span className="OD-title"> 1:1 문의</span>
        </div>
        <hr className="OD-line" />

        {login_id === "admin" ? (
          <div>
            <span>
              <span className="OD-view-title">{data.inqTitle} </span>
              <span className="OD-view-date">{moment(data.inqDate).format("YYYY-MM-DD")}</span>
              <span className="OD_member_id">
                작성자: <label>{data.memberId}</label>
              </span>
            </span>
            <hr className="OD-title-line" />
            <div className="OD-content">{data.inqCon}</div>
            {data.inqOrgImg!==null&&<div className="OD-filename">
            <span className="OD-file-title" >첨부파일:</span><span onClick={() => downloadImage(item.inqImg)}> {data.inqOrgImg}</span>
            </div>}
            {data.answerCon === null ? (
              <div className="OD_text_box">
                <div className="OD_text_indside">
                  <textarea
                    className="OD_text_content"
                    placeholder="답변을 입력하세요"
                    onChange={onInputHandler}
                    value={content}
                    maxLength="500"
                  />
                  <span>{inputCount}/500</span>
                </div>
                <button onClick={OD_Regi}>등록</button>
              </div>
            ) : (
              <div className="OD-content-box">
                <span className="OD-reply-icon">A.</span>
                <label className="OD-reply-content">{data.answerCon}</label>
                <br></br>
                <span className="OD-reply-date">
                  {moment(data.answerDate).format("YYYY-MM-DD")} 답변 완료
                </span>
              </div>
            )}
            <button className="OD-go-list-btn" onClick={() => navigate(-1)}>
              목록
            </button>
          </div>
        ) : (
          <div>
            <span>
              <span className="OD-view-title">{data.inqTitle} </span>
              <span className="OD-top-wrap">
                <span className="OD-view-date">{moment(data.inqDate).format("YYYY-MM-DD")}</span>
                {item.answerCon === "" &&(<button className="OD-delete-btn">삭제</button>)}
                
              </span>
            </span>
            <hr className="OD-title-line" />
            <div className="OD-content">{data.inqCon}</div>
            <>
              <>
                {data.answerCon !== null && (
                  <div className="OD-content-box">
                    <span className="OD-reply-icon">A.</span>
                    <label className="OD-reply-content">
                      {data.answerCon}
                    </label>
                    <br></br>
                    <span className="OD-reply-date">
                      {moment(data.answerDate).format("YYYY-MM-DD")} 답변 완료
                    </span>
                  </div>
                )}
              </>
              <button className="OD-go-list-btn" onClick={() => navigate(-1)}>
                목록
              </button>
            </>
          </div>
        )}
      </span>
    </>
  );
};
export default OneononeDetail;
