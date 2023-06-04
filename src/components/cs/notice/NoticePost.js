import React, { useEffect, useState } from "react";
import "./NoticePost.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import CsNavbar from "../CsNavbar";
import axios from "axios";

const NoticePost = () => {
  const location = useLocation();
  const PageState = location.state.PageState;

  const [fileDataList, setFileDataList] = useState(null); // 서버에 업로드 된 파일 리스트
  const fileList = [];
  const [notiTitle, setNotiTitle] = useState();
  const [notiText, setNotiText] = useState();
  const today = new Date().toLocaleDateString();
  const [originfilename, setOriginalfilename] = useState();
  console.log(location.state.ListDetail);

  useEffect(() => {
    if (PageState === 1) {
      setNotiTitle(location.state.ListDetail.notiTitle);
      setNotiText(location.state.ListDetail.notiInf);
      setInputCount(location.state.ListDetail.notiInf.length);
      setOriginalfilename(location.state.ListDetail.notiImage);
    }
  }, []);

  const onFileUpload = (e) => {
    // Array.prototype.slice.call() : 배열로 변경할 때 사용
    const uploadFiles = Array.prototype.slice.call(e.target.files);
    console.log("uploadFiles => " + uploadFiles);
    uploadFiles.forEach((uploadFile) => {
      fileList.push(uploadFile);
    });

    const formData = new FormData(); // <form></form> 형식의 데이터를 전송하기 위해 주로 사용
    fileList.forEach((file) => {
      formData.append("uploadfiles", file);
    });

    axios
      .post("/notice/file/upload", formData)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setFileDataList(res.data[0]);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const insertNotice = () => {
    if (fileDataList === null) {
      axios
        .post("/cs/notice/write", {
          notiTitle: notiTitle,
          notiInf: notiText,
          notiDate: today,
        })
        .then((res) => {
          alert("성공적으로 등록되었습니다.");
          document.location.href = "/cs/notice";
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      axios
        .post("/cs/notice/write", {
          notiTitle: notiTitle,
          notiInf: notiText,
          notiImage: fileDataList.storedfilename,
          notiDate: today,
        })
        .then((res) => {
          alert("성공적으로 등록되었습니다.");
          document.location.href = "/cs/notice";
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  //textarea
  const onInputHandler = (e) => {
    setInputCount(e.target.value.length);
    setNotiText(e.target.value);
  };

  let [inputCount, setInputCount] = useState(0);

  return (
    <div>
      {PageState === 0 ? (
        <div className="CS-wrap">
          <span className="NP-table">
            <tr>
              <td className="NP-header">공지사항</td>
            </tr>
            <hr className="NP-line" />
            <input
              className="NP-title-box"
              input
              type="text"
              placeholder="제목을 입력하세요"
              onChange={(e) => {
                setNotiTitle(e.target.value);
              }}
            ></input>
            <textarea
              className="NP-content"
              input
              type="text"
              maxLength="1000"
              placeholder="내용을 입력하세요"
              onChange={(e) => {
                onInputHandler(e);
              }}
            />
            <div className="NP-content-count">{inputCount} / 1000</div>
            <div className="NP-box">
              <div className="NP-fileupload-wrap">
                <div className="NP_product_defect">
                  <input
                    type="file"
                    className="NP_defect_image"
                    id="input-file"
                    accept="image/*"
                    multiple
                    readonly
                    onChange={onFileUpload}
                  />
                </div>
              </div>
            </div>
            <div className="NP-btn">
              <Link to={`/cs/notice`}>
                <button className="NP-cancle-btn">취소</button>
              </Link>
              <button className="NP-upload-btn" onClick={insertNotice}>
                등록
              </button>
            </div>
          </span>
        </div>
      ) : (
        <div className="CS-wrap">
          <span className="NP-table">
            <tr>
              <td className="NP-header">공지사항</td>
            </tr>
            <hr className="NP-line" />
            <input
              className="NP-title-box"
              type="text"
              value={notiTitle}
              onChange={(e) => {
                setNotiTitle(e.target.value);
              }}
            ></input>
            <textarea
              className="NP-content"
              input
              type="text"
              maxLength="1000"
              value={notiText}
              onChange={(e) => {
                onInputHandler(e);
              }}
            />
            <div className="NP-content-count">{inputCount} / 1000</div>
            <div className="NP-box">
              <div className="NP-fileupload-wrap">
                <div className="NP_product_defect">
                  <input
                    type="file"
                    className="NP_defect_image"
                    id="input-file"
                    accept="image/*"
                    multiple
                    readonly
                    onChange={onFileUpload}
                  />
                  <a href="#">{originfilename}</a>
                </div>
              </div>
            </div>
            <div className="NP-btn">
              <Link to={`/cs/notice`}>
                <button className="NP-cancle-btn">취소</button>
              </Link>
              <button className="NP-upload-btn" onClick={insertNotice}>
                수정
              </button>
            </div>
          </span>
        </div>
      )}
    </div>
  );
};
export default NoticePost;
