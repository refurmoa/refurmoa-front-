import React, { useEffect, useState } from "react";
import "./OneononeUserpost.css";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CsNavbar from "../CsNavbar";
import axios from "axios";

const NoticePost = () => {
  //파일첨부(재현님꺼..)
  const id = window.sessionStorage.getItem("id");
  const [name, setName] = useState(""); //axios로 받아올 예정.
  
  useEffect(() => {
    axios
      .get(`/cs/inquiry/name?id=${window.sessionStorage.getItem("id")}`)
      .then((res) => {
        setName(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
    
  }, []);

  const [inq_title, setInq_title] = useState("");
  const [inq_con, setInq_con] = useState("");
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

  const INQ_regi = () => {
    if (window.confirm("등록을 완료하시겠습니까?")) {
      // axios
      // .post("/cs/inq/write", {
      //     inq_title: inq_title,
      //     inq_con: inq_con,
      //     inq_date:new Date(),
      //     member_id: id,
      //      INQ_IMG:showImages[0]
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
      alert("등록이 완료되었습니다.");
      document.location.href = "/cs/inquiry";
    } else {
      alert("등록이 취소되었습니다.");
      return false;
    }
  };
  const INQ_cancel = () => {
    if (window.confirm("등록을 취소하시겠습니까?")) {
      document.location.href = "/cs/inquiry";
    } else {
      return false;
    }
  };
  return (
    <div className="CS-wrap">
      <span className="OU-table">
        <tr>
          <td className="OU-header">1:1 문의</td>
        </tr>
        <hr className="OU-line" />
        <div className="OU-username">
          작성자
          <label className="OU-userid">
            {name}({id})
          </label>
        </div>
        <input
          className="OU-title-box"
          input
          type="text"
          placeholder="제목을 입력하세요"
          value={inq_title}
          onChangeCapture={(e) => setInq_title(e.target.value)}
        ></input>
        <textarea
          onChange={onInputHandler}
          className="OU-content"
          input
          type="text"
          maxLength="1000"
          value={inq_con}
          onChangeCapture={(e) => setInq_con(e.target.value)}
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
                readonly
                onChange={handleAddImages}
              />
            </div>
          </div>
        </div>
        <div className="OU-btn">
          <button className="OU-cancle-btn" onClick={INQ_cancel}>
            취소
          </button>
          <button className="OU-upload-btn" onClick={INQ_regi}>
            등록
          </button>
        </div>
      </span>
    </div>
  );
};
export default NoticePost;
