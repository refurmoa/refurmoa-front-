import "./AdminBannerWrite.css";
import { useState } from "react";
import alt_img from "../../../images/picture-icon-240.png";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminBannerWirte = () => {
  let [main_Image, setMainImg] = useState("");
  var fileList = [];
  const [listFile, setListfile] = useState();
  const [img_con, setImg_con] = useState(false);

  const setPreviewImg = (e) => {
    var reader = new FileReader();
    const uploadFiles = Array.prototype.slice.call(e.target.files); // 파일 이름을 배열 형태로 저장하는 객체
    reader.onload = function (e) {
      setMainImg(e.target.result);
    };
    uploadFiles.forEach((uploadFile) => {
      console.log("bbb :" + uploadFile);
      fileList.push(uploadFile); // 배열에 push
    });
    setImg_con(true);
    setListfile(fileList); // console.log("fileList=>" + fileList);
    reader.readAsDataURL(e.target.files[0]);
  };

  const [startDate, setStartDate] = useState();
  const [endtDate, setEndDate] = useState();
  const [bannerLink, setBannerLink] = useState();
  const [bannerCom, setBannerCom] = useState();
  const [bannerPhone, setBannerPhone] = useState();
  const BannerCancle = () => {
    setStartDate();
    setEndDate();
    setBannerLink();
    setBannerCom();
    setBannerPhone();
  };

  const BannerInput = () => {
    // axios
    //   .post("/bannerinsert", {
    //     startDate: startDate,
    //     endtDate: endtDate,
    //     bannerLink: bannerLink,
    //     bannerCom: bannerCom,
    //     bannerPhone: bannerPhone,
    //   })
    //   .then((res) => {
    //     // AdminBanner에서 배너 목록 불러오는 함수 위치
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
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
              onChange={(e) => setStartDate(e.target.value)}
            />
            ~
            <input
              className="ABCal2"
              type="datetime-local"
              data-placeholder="종료일"
              onChange={(e) => setEndDate(e.target.value)}
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
        />
      </form>
      <Link to={`/admin/banner`}>
        <div className="ABUnderButton">
          <input type="button" value="취소" onClick={BannerCancle} />
          <input type="button" value="등록" onClick={BannerInput} />
        </div>
      </Link>
    </div>
  );
};
export default AdminBannerWirte;
