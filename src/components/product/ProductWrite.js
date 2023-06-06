import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductWrite.css";
import searchIcon from "../../images/search.png";
import alt_img from "../../images/picture-icon-240.png";
import axios from "axios";
import Modal from "react-modal";
import FindCompany from "./FindCompany";

function ProductWrite() {
  
  const navigate = useNavigate();
  useEffect(()=>{
    if(window.sessionStorage.getItem("id")!=="admin"){
      navigate("/");
    }
  },[]);
  const [cate, setCate] = useState("");
  const [cate_code, setCate_code] = useState("");
  let [main_Image, setMainImg] = useState("");
  const [com_num, setCom_num] = useState();
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
  const [img_con, setImg_con] = useState(false);
  const[mainFile,setMainFile]=useState();
  let now = new Date();
  var fileList = []; // 업로드 할 파일 리스트 저장
  /*===============================================*/

  const [file, setFile] = useState(null);
  const [listFile, setListfile] = useState([]);
  const [fileDataList, setFileDataList] = useState(); // 서버에 업로드 된 파일 리스트

  let [inputCount, setInputCount] = useState(0);
  const onInputHandler = (e) => {
    setDefect_text(e.target.value);
    setInputCount(e.target.value.length);
  };
  /*===============================================*/
  const [searchCompany, setSearchCompany] = useState("");

  const [popup, setPopup] = useState(false);
  const [modal, setModal] = useState(false);
  const ChangePopUP = () => {
    setPopup(true);
    setModal(true);
  };
  const close_modal = () => {
    setPopup(false);
    setModal(false);
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
  const onExist = () => {
    setGuarantee(true);
  };
  const onNotExist = () => {
    setGuarantee(false);
  };
  /*===============================================*/
  const [funiture, setFuniture] = useState(false);
  const [appliance, setAppliance] = useState(false);
  const chageCate = (e) => {
    setCate(e.target.value);
    if (e.target.value === "furniture") {
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
    
    reader.onload = function (e) {
      setMainImg(e.target.result);
    };
    setMainFile(e.target.files[0]);
    
     // console.log("fileList=>" + fileList);
    
    reader.readAsDataURL(e.target.files[0]);
  };
  /*===============================================*/

  const handleAddImages = (event) => {
    setImg_con(true);
    const uploadFiles =Array.prototype.slice.call(event.target.files);
    uploadFiles.forEach((uploadFile) => {
      console.log("bbb :" + uploadFile);
      fileList.push(uploadFile); // 배열에 push
      setListfile(list=>[...list,uploadFile]);
    });
   
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 3) {
      imageUrlLists = imageUrlLists.slice(0, 3);
    }
    console.log(imageUrlLists);
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

  const Product_write = (e) => {

    if(defect_text===""){
      alert("하자 정보가 비었습니다.");
      return false;
    }
    else{
    const formData = new FormData(); // <form></form> 형식의 데이터를 전송하기 위해 주로 사용.
    const formimg = new FormData();

    listFile.forEach((file) => {
      formimg.append("uploadfiles", file)
    });

    formData.append("main_image",mainFile);
    formData.append("product_code",0);
    formData.append("category_code",code);
    formData.append("category", cate_code);
    formData.append("prod_com", prod_com);
    formData.append("prod_name",prod_name );
    formData.append("prod_grade",prod_Grade );
    formData.append("org_price", org_price);
    formData.append("guarantee",guarantee );
    formData.append("deffect_text", defect_text);
    formData.append("reg_date",new Date() );
    formData.append("prod_state",0);
    formData.append("com_num",com_num);
   
    axios
      .post("/prod/write", formData, {
        headers: {
        "Content-Type": "multipart/form-data",
        },})
      .then((res) => {
        
        const entries = Array.from(formimg.entries());
        const formDataLength = entries.length;
        console.log(formDataLength);
        if(formDataLength!==0){
        axios
          .post("/prod/file", formimg)
          .then((res) => {
            alert("상픔 등록이 완료되었습니다!");
            setFileDataList(res.data);
            window.location.href="/prod";
          })
          .catch((e) => {
            alert("상픔 등록에 실패했습니다.");
            console.error(e);
          });   
        }  
        else{
          alert("작성이 완료되었습니다!");
          window.location.href="/prod";
        }
      })
      .catch((e) => {
        alert("상픔 등록에 실패했습니다.");
        console.error(e);
      })
    }
  };

  return (
    
     
    <div className="PW_form">
      <div className="PW_header">
        <div className="PW_title">상품 등록</div>
        <div className="PW_button">
          <button className="PW_list_btn"><a href="/prod">목록</a></button>
          <button className="PW_wrie_btn" onClick={Product_write}>
            등록
          </button>
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
              maxLength="15"
              value={searchCompany}
              onChange={(e) => setSearchCompany(e.target.value)}
            />
            <img
              className="PW_search_logo"
              src={searchIcon}
              onClick={ChangePopUP}
            />
            <Modal
              style={{
                overlay: {
                  position: "fixed",
                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                },
                content: {
                  position: "absolute",
                  top: "10%",
                  width: "900px",
                  height: "700px",
                  left: "40px",
                  right: "40px",
                  bottom: "40px",
                  border: "1px solid #ccc",
                  background: "#fff",
                  overflow: "auto",
                  WebkitOverflowScrolling: "touch",
                  borderRadius: "10px",
                  outline: "none",
                  padding: "20px",
                },
              }}
              isOpen={modal}
            >
              <div className="close_modal">
                <button onClick={close_modal}>
                  <b>X</b>
                </button>
              </div>
              <div className="PW_company_modal">
                {popup && (
                  <FindCompany
                    searchCompany={searchCompany}
                    setSearchCompany={setSearchCompany}
                    setCom_num={setCom_num}
                    close_modal={close_modal}
                  ></FindCompany>
                )}
              </div>
            </Modal>
          </div>
        </div>
        <div className="PW_image_input">
          {main_Image === "" ? (
            <div className="PW_image_none">
              <img alt="메인사진" src={alt_img} />
            </div>
          ) : (
            <div className="PW_image_show">
              <img alt="메인사진" src={main_Image} />
            </div>
          )}

          <div className="PW_main_input">
            <input
              type="file"
              id="image"
              accept="image/*"
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
              <option value="furniture">가구</option>
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
                  <option value="furliving">거실&주방</option>
                  <option value="furbed">침실 </option>
                  <option value="furoffice">사무실</option>
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
              maxLength="15"
              placeholder="제품회사명"
              value={prod_com}
              onChange={(e)=>setProd_com(e.target.value)}
            />
          </div>
          <div>
            {" "}
            <input
              className="PW_product_name_input"
              type="text"
              placeholder="제품명"
              maxLength="30"
              value={prod_name}
              onChange={(e)=>setProd_name(e.target.value)}
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
            &nbsp; <label>S급</label>
            <input
              type="checkbox"
              className="PW_state_other"
              onClick={onCHKA}
              checked={A}
            />
            &nbsp; <label>A급</label>
            <input
              type="checkbox"
              className="PW_state_other"
              onClick={onCHKB}
              checked={B}
            />
            &nbsp; <label>B급</label>
          </div>
        </div>
        <div className="PW_product_category">
          <div className="PW_product_input_header">보증서</div>
          <div className="PW_product_state">
            <input
              type="checkbox"
              className="PW_state"
              onClick={onExist}
              checked={guarantee}
            />
            &nbsp; <label>있음</label>
            <input
              type="checkbox"
              className="PW_state_other"
              onClick={onNotExist}
              checked={guarantee===""?false:!guarantee}
            />
            &nbsp;<label>없음</label>
          </div>
        </div>
        <div className="PW_product_category">
          <div className="PW_product_input_header">하자정보</div>
          <input
            type="file"
            className="PW_defect_image"
            id="input-file"
            accept="image/*"
            multiple
            readonly
            onChange={handleAddImages}
          />
        </div>
        <div className="PW_product_defect">
          {img_con && (
            <div className="PW_product_imgList">
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
          )}
          <div className="PW_defect_content">
            <textarea
              className="PW_product_defect_content"
              type="text"
              placeholder="제품 하자 내용"
              onChange={onInputHandler}
              maxLength="200"
              value={defect_text}
            />
            <span className="PW_countInput">{inputCount}/200</span>
          </div>
        </div>
      </div>
    </div>
    


    
  )
}

export default ProductWrite;
