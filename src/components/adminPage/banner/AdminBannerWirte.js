import "./AdminBannerWrite.css";
import { useEffect, useState } from "react";
import alt_img from "../../../images/picture-icon-240.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AdminBannerWirte = () => {
  const navigate = useNavigate();
  // 미리보기 이미지
  const [main_Image, setMainImg] = useState("");
  // 폼데이터 전송 이미지데이터
  const [uploadFile, setUploadFile] = useState();
  // 배너 정보
  const [startDate, setStartDate] = useState();
  const [endtDate, setEndDate] = useState();
  const [bannerLink, setBannerLink] = useState();
  const [bannerCom, setBannerCom] = useState();
  const [bannerPhone, setBannerPhone] = useState();
  const [bannerNotes, setBannerNotes] = useState();

  // 미리보기 이미지
  const setPreviewImg = (e) => {
    if (e.target.files.length > 0) {
      var reader = new FileReader();
      reader.onload = function (e) {
        setMainImg(e.target.result);
      };
      setUploadFile(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setMainImg("");
    }
  };

  const BannerInput = () => {
    if (startDate > endtDate) {
      alert("날짜 오류입니다.");
      return false;
    }
    if (bannerLink === "" || bannerLink === undefined) {
      alert("배너 링크를 입력하세요!!!");
      return false;
    }
    if (bannerCom === "" || bannerCom === undefined) {
      alert("업체명을 입력하세요!!!");
      return false;
    }
    if (bannerPhone === "" || bannerPhone === undefined) {
      alert("연락처를 입력하세요!!!");
      return false;
    }

    // formData 객체 만들어서 데이터 삽입
    const formData = new FormData(); 
    formData.append("banner_img", uploadFile);
    formData.append("seller_name", bannerCom);
    formData.append("seller_phone", bannerPhone);
    formData.append("bann_link", bannerLink);
    formData.append("bann_ref", bannerNotes);
    formData.append("bann_start", new Date(startDate));
    formData.append("bann_end", new Date(endtDate));

    axios
      .post("/admin/banner/write", formData, {
        headers: {
        "Content-Type": "multipart/form-data",
        },})
      .then((res) => {
        if (res.data === 1) {
          navigate("/admin/banner");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="ABAll">
      <div className="ABHeader">배너 등록</div>
      <div className="ABHeaderLine"></div>
      <div className="ABMiddle">
        <div className="ABMFileInput">
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={setPreviewImg}
          />
          <div className="ABMSelectLocation">
            <select>
              <option>&nbsp;메인배너</option>
              <option>&nbsp;광고배너</option>
            </select>
          </div>
        </div>
        <div className="ABMImgView">
          {main_Image === "" ? (
            <div className="ABMImgNone">
              <img alt="메인사진" src={alt_img} />
            </div>
          ) : (
            <div className="ABMImgShow">
              <img alt="메인사진" src={main_Image} />
            </div>
          )}
        </div>
        <div className="ABinfo">
          <div className="ABMiddleLtext">게시일</div>
          <div className="ABCal">
            <input
              className="ABCal1"
              type="datetime-local"
              data-placeholder="시작일"
              onChange={(e) => setStartDate((e.target.value).replace("T", " "))}
            />
            ~
            <input
              className="ABCal2"
              type="datetime-local"
              data-placeholder="종료일"
              onChange={(e) => setEndDate((e.target.value).replace("T", " "))}
            />
          </div>
        </div>
        <div className="ABinfo">
          <div className="ABMiddleLtext">배너 링크</div>
          <input
            className="ABInputText"
            type="text"
            placeholder="연결 링크"
            onChange={(e) => setBannerLink(e.target.value)}
          />
        </div>
        <div className="ABinfo">
          <div className="ABMiddleLtext">업체명</div>
          <input
            className="ABInputText"
            type="text"
            placeholder="업체명"
            onChange={(e) => setBannerCom(e.target.value)}
          />
        </div>
        <div className="ABinfo">
          <div className="ABMiddleLtext">연락처</div>
          <input
            className="ABInputText"
            type="text"
            placeholder="연락처"
            onChange={(e) => setBannerPhone(e.target.value)}
          />
        </div>
      </div>
      <form className="ABTextBox">
        <textarea
          className="ABInputTextBox"
          placeholder="참고사항을 입력하세요"
          onChange={(e) => setBannerNotes(e.target.value)}
        />
      </form>
      <div className="ABUnderButton">
        <input type="button" value="취소" onClick={() => {navigate(-1)}} />
        <input type="button" value="등록" onClick={BannerInput} />
      </div>
    </div>
  );
};
export default AdminBannerWirte;
