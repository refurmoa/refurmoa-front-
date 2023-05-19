import React, { useEffect, useState } from "react";
import "./OneononeDetail.css";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import naver from "../../../images/naver.png";
import { Link } from "react-router-dom";

const OneononeDetail = () => {
  const location = useLocation();
  const item = location.state.item;
  const login_id = window.sessionStorage.getItem("id");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  let [inputCount, setInputCount] = useState(0);
  const onInputHandler = (e) => {
    setContent(e.target.value);
    setInputCount(e.target.value.length);
  };
  const OD_Regi = () => {
    if (window.confirm("답변을 등록하시겠습니까?")) {
      // axios
      // .post("/cs/inq/write", {
      //     ANSWER_CON: content,
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
  // const [data, setData] = useState({});

  // useEffect(() => {
  //   setData(getPostByNo(no));
  // }, []);

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
              <span className="OD-view-title">{item.INQ_TITLE} </span>
              <span className="OD-view-date">{item.INQ_DATE}</span>
              <span className="OD_member_id">
                작성자: <label>{item.MEMBER_ID}</label>
              </span>
            </span>
            <hr className="OD-title-line" />
            <div className="OD-content">{item.INQ_CON}</div>
            {item.ANSWER_CON === "" ? (
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
                <label className="OD-reply-content">{item.ANSWER_CON}</label>
                <br></br>
                <span className="OD-reply-date">
                  {item.ANSWER_date} 답변 완료
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
              <span className="OD-view-title">{item.INQ_TITLE} </span>
              <span className="OD-top-wrap">
                <span className="OD-view-date">{item.INQ_DATE}</span>
                {item.ANSWER_CON === "" &&(<button className="OD-delete-btn">삭제</button>)}
                
              </span>
            </span>
            <hr className="OD-title-line" />
            <div className="OD-content">{item.INQ_CON}</div>
            <>
              <>
                {item.ANSWER_CON !== "" && (
                  <div className="OD-content-box">
                    <span className="OD-reply-icon">A.</span>
                    <label className="OD-reply-content">
                      {item.ANSWER_CON}
                    </label>
                    <br></br>
                    <span className="OD-reply-date">
                      {item.ANSWER_date} 답변 완료
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
