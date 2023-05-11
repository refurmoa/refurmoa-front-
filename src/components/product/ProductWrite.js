import React from "react";
import { useState } from "react";
import "./ProductWrite.css";
import searchIcon from "../../images/serach.png";
import alt_img from "../../images/picture-icon-240.png";
import axios from "axios";
function PostWrite() {
  const [cate, setCate] = useState("");
  const [cate_code, setCate_code] = useState("");
  let [main_Image, setMainImg] = useState(alt_img);
  const [code, setCode] = useState("");
  const [prod_com, setProd_com] = useState("");
  const [prod_name, setProd_name] = useState("");
  const [prod_Grade, setprod_Grade] = useState("");
  const [org_price, setOrg_price] = useState("");
  const [guarantee, setGuarantee] = useState("");
  const [defect_text, setDefect_text] = useState("");
  const [reg_date, setReg_date] = useState("");
  const [prod_state, setProd_state] = useState("");
  const [showImages, setShowImages] = useState([]);
  var fileList = []; // 업로드 할 파일 리스트 저장
  /*===============================================*/

  const [file, setFile] = useState(null);
  const [listFile, setListfile] = useState();
  const [fileDataList, setFileDataList] = useState(); // 서버에 업로드 된 파일 리스트

  let [inputCount, setInputCount] = useState(0);
  const onInputHandler = (e) => {
    setInputCount(e.target.value.length);
  };
  /*===============================================*/
  const [S, setS] = useState(false);
  const [A, setA] = useState(false);
  const [B, setB] = useState(false);
  const onCHKS = () => {
    setS(true);
    setA(false);
    setB(false);
    setprod_Grade("S");
  };
  const onCHKA = () => {
    setS(false);
    setA(true);
    setB(false);
    setprod_Grade("A");
  };
  const onCHKB = () => {
    setS(false);
    setA(false);
    setB(true);
    setprod_Grade("B");
  };
  /*===============================================*/
  const [exist, setExist] = useState(false);
  const [notexist, setNotExist] = useState(false);
  const onExist = () => {
    setExist(true);
    setNotExist(false);
    setGuarantee(true);
  };
  const onNotExist = () => {
    setExist(false);
    setNotExist(true);
    setGuarantee(false);
  };
  /*===============================================*/
  const [funiture, setFuniture] = useState(false);
  const [appliance, setAppliance] = useState(false);
  const chageCate = (e) => {
    setCate(e.target.value);
    if (e.target.value === "funiture") {
      setFuniture(true);
      setAppliance(false);
    } else if (e.target.value === "appliance") {
      setFuniture(false);
      setAppliance(true);
    } else {
      setFuniture(false);
      setAppliance(false);
    }
  };
  /*===============================================*/

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
    setListfile(fileList); // console.log("fileList=>" + fileList);
    reader.readAsDataURL(e.target.files[0]);
  };
  /*===============================================*/

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
  /*===============================================*/

  const addComma = (price) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
  };
  const onChangePoints = (e) => {
    const { value } = e.target;
    let str = value.replaceAll(",", "");
    setOrg_price(str);
  };
  /*===============================================*/
  /*
  const onFileUpload = (e) => {
    const formData = new FormData(); // <form></form> 형식의 데이터를 전송하기 위해 주로 사용.
    console.log("fileList=>" + listFile);
    listFile.forEach((file) => {
      formData.append("uploadfiles", file);
    });

    console.log(formData);
    if (listFile.length === 0) {
      alert("상품 사진을 하나 이상 등록해 주세요.");
    }
    var boardNum = 0;

    // 프록시 문제로 URL이 전체 다 작성되어있음.
    // 동작 안되면 "http://localhost:8080" 부분 제거해 주세요
    axios
      .post("/upload", {
        id: sessionStorage.getItem("id"),
        subject: document.getElementById("title").value,
        location: document.getElementById("location").value,
        price: document.getElementById("price").value,
        content: document.getElementById("content").value,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        console.log("upload request");
        boardNum = res.data;
      })
      .catch((e) => {
        console.error(e);
      })
      .then(() => {
        // 프록시 문제로 URL이 전체 다 작성되어있음.
        // 동작 안되면 "/uploadfile" 로 수정하세요
        axios
          .post("/uploadfile", formData)
          .then((res) => {
            console.log("uploadfile request");
            alert("작성이 완료되었습니다!");
            setFileDataList(res.data);
            document.location.href = "/home";
          })
          .catch((e) => {
            console.error(e);
          });
      });
  };
  */
  return (
    <div className="PW_form">
      <div className="PW_header">
        <div className="PW_title">상품 등록</div>
        <div className="PW_button">
          <button className="PW_list_btn">목록</button>
          <button className="PW_wrie_btn">등록</button>
        </div>
      </div>
      <div className="PW_image_file">
        <div className="PW_partner">
          <div className="PW_partner_name">제휴회사명</div>
          <div className="PW_partner_serach">
            <input
              className="PW_partner_input"
              type="text"
              placeholder="회사명"
            />
            <img className="PW_search_logo" src={searchIcon} />
          </div>
        </div>
        <div className="PW_image_input">
          <div className="PW_image_show">
            {" "}
            <img
              alt="메인사진"
              src={main_Image}
              className="PW_image_show"
            ></img>
          </div>
          <div className="PW_main_input">
            {" "}
            <input
              type="file"
              id="image"
              accept="image/*"
              multiple
              onChange={setPreviewImg}
            />
          </div>
        </div>
      </div>
      <div className="PW_product_input">
        <div className="PW_product_category">
          <div className="PW_product_input_header">분류</div>
          <div className="PW_product_input_select">
            <select className="PW_category" onChange={chageCate}>
              <option>카테고리 선택</option>
              <option value="funiture">가구</option>
              <option value="appliance">가전</option>
            </select>
            <select
              className="PW_detail_category"
              onChange={(e) => setCate_code(e.target.value)}
            >
              <option>세부 카테고리 선택</option>
              {appliance && (
                <>
                  <option value="appkitchen">주방</option>
                  <option value="applife">생활</option>
                  <option value="appelec">전자기기</option>
                </>
              )}
              {funiture && (
                <>
                  <option value="funliving">거실&주방</option>
                  <option value="funbed">침실 </option>
                  <option value="funoffice">사무실</option>
                </>
              )}
            </select>
            <input
              className="PW_produce_code"
              type="text"
              placeholder="코드"
              onChange={(e) => setCode(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="PW_product_name">
          <div className="PW_product_input_header">제품명</div>
          <div>
            {" "}
            <input
              className="PW_product_name_input"
              type="text"
              placeholder="제품회사명"
            />
          </div>
          <div>
            {" "}
            <input
              className="PW_product_name_input"
              type="text"
              placeholder="제품명"
            />
          </div>
        </div>
        <div className="PW_product_category">
          <div className="PW_product_input_header">원가</div>
          <div className="PW_product_price">
            {" "}
            <input
              className="PW_product_price_input"
              type="text"
              onChange={(e) => onChangePoints(e)}
              value={addComma(org_price) || ""}
            />
            원
          </div>
        </div>
        <div className="PW_product_category">
          <div className="PW_product_input_header">상태</div>
          <div className="PW_product_state">
            <input
              type="checkbox"
              className="PW_state"
              onClick={onCHKS}
              checked={S}
            />
            &nbsp; S급
            <input
              type="checkbox"
              className="PW_state_other"
              onClick={onCHKA}
              checked={A}
            />
            &nbsp; A급
            <input
              type="checkbox"
              className="PW_state_other"
              onClick={onCHKB}
              checked={B}
            />
            &nbsp; B급
          </div>
        </div>
        <div className="PW_product_category">
          <div className="PW_product_input_header">보증서</div>
          <div className="PW_product_state">
            <input
              type="checkbox"
              className="PW_state"
              onClick={onExist}
              checked={exist}
            />
            &nbsp; 있음
            <input
              type="checkbox"
              className="PW_state_other"
              onClick={onNotExist}
              checked={notexist}
            />
            &nbsp; 없음
          </div>
        </div>
        <div className="PW_product_category">
          <div className="PW_product_input_header">하자정보</div>
          <div className="PW_product_defect">
            <input
              type="file"
              className="PW_defect_image"
              id="input-file"
              accept="image/*"
              multiple
              readonly
              onChange={handleAddImages}
            />

            {showImages.map((image, id) => (
              <div key={id}>
                <img
                  className="PW_defect_img"
                  src={image}
                  alt={`${image}-${id}`}
                  onClick={() => handleDeleteImage(id)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="PW_defect_content">
          <textarea
            className="PW_product_defect_content"
            type="text"
            placeholder="제품 하자 내용"
            onChange={onInputHandler}
            maxLength="200"
          />
          <span>{inputCount}/200</span>
        </div>
      </div>
    </div>
  );
}

export default PostWrite;