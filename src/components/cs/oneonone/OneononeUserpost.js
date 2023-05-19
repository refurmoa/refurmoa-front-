import React, { useEffect, useState } from "react";
import "./OneononeUserpost.css";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CsNavbar from "../CsNavbar";
const NoticePost = () => {
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
    // 이미지 안보여도 되어서 주석처리
    // setShowImages(imageUrlLists);
  };
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  //textarea
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
    <div className="CS-wrap">
      <span className="OU-table">
        <tr>
          <td className="OU-header">1:1 문의</td>
        </tr>
        <hr className="OU-line" />
        <div className="OU-username">
          작성자
          <label className="OU-userid">이모아(lee)</label>
        </div>
        <input
          className="OU-title-box"
          input
          type="text"
          placeholder="제목을 입력하세요"
        ></input>
        <textarea
          onChange={onInputHandler}
          className="OU-content"
          input
          type="text"
          maxLength="1000"
          placeholder="내용을 입력하세요"
        />
        <div className="OU-content-count">{inputCount} / 1000</div>
        <div className="OU-box">
          <div className="OU-fileupload-wrap">
            <div className="OU_product_defect">
              <input
                type="file"
                className="OU_defect_image"
                id="input-file"
                accept="image/*"
                multiple
                readonly
                onChange={handleAddImages}
              />

              {/* {showImages.map((image, id) => (
              <div key={id}>
                <img
                  className="NP_defect_img"
                  src={image}
                  alt={`${image}-${id}`}
                  onClick={() => handleDeleteImage(id)}
                />
              </div>
            ))} */}
            </div>
          </div>
        </div>
        <div className="OU-btn">
          <button className="OU-cancle-btn">취소</button>
          <button className="OU-upload-btn">등록</button>
        </div>
      </span>
    </div>
  );
};
export default NoticePost;
