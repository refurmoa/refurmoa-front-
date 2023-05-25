import "./AdminBannerWrite.css";
import { useState } from "react";
import alt_img from "../../../images/picture-icon-240.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminBannerWirte = () => {
  let [main_Image, setMainImg] = useState("");
  const fileList = []; // 업로드 할 파일 리스트 저장
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

  const navigate = useNavigate();
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
      alert("연라처를 입력하세요!!!");
      return false;
    }
    // const formData = new FormData(); // <form></form> 형식의 데이터를 전송하기 위해 주로 사용
    // fileList.forEach((file) => {
    //   formData.append("uploadfiles", file);
    // });
    // axios
    //   .post("/admin/banner/write", {
    //     startDate: startDate,
    //     endtDate: endtDate,
    //     bannerLink: bannerLink,
    //     bannerCom: bannerCom,
    //     bannerPhone: bannerPhone,
    //     formData: formData,
    //   })
    //   .then((res) => {
    //     // AdminBanner에서 배너 목록 불러오는 함수 이름
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    navigate(`/admin/banner`);
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
      <div className="ABUnderButton">
        <input type="button" value="취소" onClick={BannerCancle} />
        <input type="button" value="등록" onClick={BannerInput} />
      </div>
    </div>
  );
};
export default AdminBannerWirte;
