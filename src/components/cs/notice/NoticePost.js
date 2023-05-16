import React, { useEffect, useState } from "react";
import "./NoticePost.css";
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
        ></input>
        <textarea
          onChange={onInputHandler}
          className="NP-content"
          input
          type="text"
          maxLength="1000"
          placeholder="내용을 입력하세요"
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
        <div className="NP-btn">
          <button className="NP-cancle-btn">취소</button>
          <button className="NP-upload-btn">등록</button>
        </div>
      </span>
   </div>
  );
};
export default NoticePost;
