import React, { useEffect, useState } from "react";
import { getPostByNo } from "../notice/Data";
import "./OneononeUserpost.css";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const OneononeUserpost = () => {
  const navigate = useNavigate();

  //파일첨부(재현님꺼..)
  const [showImages, setShowImages] = useState([]);

  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 3) {
      imageUrlLists = imageUrlLists.slice(0, 3);
    }

    setShowImages(imageUrlLists);
  };
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  // textarea

  const onInputHandler = (e) => {
    setInputCount(e.target.value.length);
  };

  const onTextareaHandler = (e) => {
    setInputCount(
      e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length
    );
  };
  let [inputCount, setInputCount] = useState(0);

  return (
    <>
    

      <table className="oneonone-user-post-table">
        <tr>
          <td className="oneonone-user-post-header">1:1 문의</td>
        </tr>
        <div className="oneonone-user-name">
          작성자
          <label className="oneonone-userid">이모아(lee)</label>
        </div>
        <input
          className="oneonone-user-post-title-box"
          input
          type="text"
          placeholder="제목을 입력하세요"
        ></input>
        <textarea
          onChange={onInputHandler}
          className="oneonone-user-post-content"
          input
          type="text"
          maxLength="1000"
          placeholder="내용을 입력하세요"
        />
        <p>
          <span className="oneonone-user-post-content-count">
            {inputCount} / 1000
          </span>
        </p>

        <div className="oneonone-user-post-box"></div>
        <button className="oneonone-user-post-fileupload-btn">파일 첨부</button>
        <label> 파일명.jpg</label>
        <div>
          <button
            className="oneonone-user-post-cancle-btn"
            onClick={() => navigate(-1)}
          >
            취소
          </button>
          <button className="oneonone-user-post-upload-btn">등록</button>
        </div>
      </table>
    </>
  );
};
export default OneononeUserpost;
