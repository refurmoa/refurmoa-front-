import React from "react";
import { useState, useEffect, useRef } from "react";
import "../../product/ProductWrite.css";
import "./PostWrite.css";
import searchIcon from "../../../images/search.png";
import alt_img from "../../../images/alt_image1.png";
import axios from "axios";
import Modal from "react-modal";
import FindCompany from "../../product/FindCompany";
import PostAll from "./PostAll";
import PostAuction from "./PostAuction";
import PostDirect from "./PostDirect";
import FindProduct from "./FindProduct";
import cancel from "../../../images/cancel.png";

function PostWrite(props) {
  const code_param = new URLSearchParams(window.location.search).get('product_code'); // 상품 목록 페이지에서 보내는 파라미터
  const product_num = props;

  /*=================샘플 데이터 이미지는 백엔드에서=========================*/
  const [cate, setCate] = useState("");
  const [cate_code, setCate_code] = useState("");
  const [main_Image, setMainImg] = useState("");
  const [code, setCode] = useState("");
  const [prod_com, setProd_com] = useState("");
  const [prod_name, setProd_name] = useState("");
  const [prod_Grade, setprod_Grade] = useState("");
  const [org_price, setOrg_price] = useState(0);
  const [dir_price, setDir_price] = useState(0);
  const [unit_price, setUnit_price] = useState(0);
  const [auc_price, setAuc_price] = useState(0);
  const [del_price, setDel_price] = useState(0);
  const [as_date, setAs_date] = useState("");
  const [guarantee, setGuarantee] = useState("");
  const [auction, setAuction] = useState(false);
  const [direct, setDirect] = useState(false);
  const [defect_text, setDefect_text] = useState("");
  const [start_date, setStart_date] = useState(null);
  const [end_date, setEnd_date] = useState(null);
  const [reg_date, setReg_date] = useState("");
  const [prod_state, setProd_state] = useState("");
  const [showImages, setShowImages] = useState([]);
  const [img_con, setImg_con] = useState(false);
  const [com_num, setCom_num] = useState();
  const [sell_type, setSell_type] = useState(0);
  const [prod_code, setProd_code] = useState(0)
  const[mainFile,setMainFile]=useState();
  const[detailFile,setDetailFile]=useState();
  const [deffect1, setDeffect1] = useState();
  const [deffect2, setDeffect2] = useState();
  const [deffect3, setDeffect3] = useState();
  var fileList = []; // 업로드 할 파일 리스트 저장
  /*===============================================*/
  const [Productname, setProductname] = useState("");
  const [searchProduct, setSearchProduct] = useState([]);
  
  const [prod_popup, setProd_Popup] = useState(false);
  const [prod_modal, setProd_Modal] = useState(false);
 /*===============================================*///sell_type 설정
  useEffect(()=>{
    if(auction && !direct)setSell_type(1);
    else if(!auction && direct)setSell_type(2);
    else if(auction && direct)setSell_type(3);
  },[auction,direct])

  /*===============================================*///modal 설정
  const Changeprod_PopUP = () => {
    setProd_Popup(true);
    setProd_Modal(true);
  };
  const close_prod_modal = () => {
    setProd_Popup(false);
    setProd_Modal(false);
  };
   /*===============================================*///modal 설정
  const setData = (productData) => {
    console.log(productData);
    setProd_code(productData.productCode);
    if (
      productData.category === "furliving" ||
      productData.category === "furbed" ||
      productData.category === "furoffice"
    ) {
      setFuniture(true);
      setAppliance(false);
      setCate("furniture");
    } else {
      setFuniture(false);
      setAppliance(true);
      setCate("appliance");
    }
    let imageUrlLists = [];
    if(productData.defectImage1!==null)imageUrlLists.push(`/images/prod/${productData.defectImage1}`);
    if(productData.defectImage2!==null)imageUrlLists.push(`/images/prod/${productData.defectImage2}`);
    if(productData.defectImage3!==null)imageUrlLists.push(`/images/prod/${productData.defectImage3}`);
    setDeffect1(productData.defectImage1);
    setDeffect2(productData.defectImage2);
    setDeffect3(productData.defectImage3);
    setReg_date(productData.regDate);
    setShowImages(imageUrlLists);
    if(imageUrlLists.length!==0)setImg_con(true);
    setCate_code(productData.category);
    setCode(productData.categoryCode);
    setCom_num(productData.com_num);
    setSearchCompany(productData.com_name);
    setProd_com(productData.prodCom);
    setProd_name(productData.prodName);
    setOrg_price(productData.orgPrice);
    setMainImg(`/images/prod/${productData.mainImage}`);
    if (productData.prodGrade === "S") onCHKS();
    else if (productData.prodGrade === "A") onCHKA();
    else if (productData.prodGrade === "B") onCHKB();

    setGuarantee(productData.guarantee);
    setDefect_text(productData.defectText);
    setInputCount(productData.defectText.length);
  };
  /*===============================================*/
  //목록 클릭시 데이터 저장
  useEffect(()=>{
    if(code_param!==null){
     
        axios
          .get(`/post/write/prod?prod=${code_param}`)
          .then((res) => {
            setData(res.data);     
          })
          .catch((e) => {       
          })     
    }
  },[])
  /*=================샘플 데이터 이미지는 백엔드에서=========================*/

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
  const onAuction = () => {
    setAuction(!auction);
  };
  const onDirect = () => {
    setDirect(!direct);
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
  const onChangeOrg = (e) => {
    const { value } = e.target;
    let str = value.replaceAll(",", "");
    setOrg_price(str);
  };
  const onChangeDir = (e) => {
    const { value } = e.target;
    let str = value.replaceAll(",", "");
    setDir_price(str);
  };
  const onChangeAuc = (e) => {
    const { value } = e.target;
    let str = value.replaceAll(",", "");
    setAuc_price(str);
  };
  const onChangeUnit = (e) => {
    const { value } = e.target;
    let str = value.replaceAll(",", "");
    setUnit_price(str);
  };
  const onChangeDel = (e) => {
    const { value } = e.target;
    let str = value.replaceAll(",", "");
    setDel_price(str);
  };
  /*===============================================*/

  const Post_write = () => {
    if(defect_text===""){
      alert("하자 정보가 비었습니다.");
      return false;
    }
    if(detailFile===null){
      alert("상세 정보 이미지가 비었습니다.");
      return false;
    }
    else{
    const formData = new FormData(); // <form></form> 형식의 데이터를 전송하기 위해 주로 사용.
    const formimg = new FormData();

    listFile.forEach((file) => {
      formimg.append("uploadfiles", file)
    });

    formData.append("main_image",mainFile);
    formData.append("detailFile",detailFile);
    formData.append("product_code",prod_code);
    formData.append("category", cate_code);
    formData.append("category_code",code);
    if(deffect1!==null)formData.append("deffect_image1",deffect1);
    if(deffect2!==null)formData.append("deffect_image2",deffect2);
    if(deffect3!==null)formData.append("deffect_image3",deffect3);
    formData.append("prod_com", prod_com);
    formData.append("prod_name",prod_name );
    formData.append("prod_grade",prod_Grade );
    formData.append("org_price", org_price);
    formData.append("guarantee",guarantee );
    formData.append("deffect_text", defect_text);
    formData.append("reg_date",new Date(reg_date));
    formData.append("prod_state",1);
    formData.append("com_num",com_num);
    formData.append("dir_price", dir_price);
    formData.append("auc_price",auc_price );
    formData.append("unit_price",unit_price );
    formData.append("del_price", del_price);
    if (start_date !== null) formData.append("start_date", new Date(start_date));
    if (end_date !== null) formData.append("end_date", new Date(end_date));
    formData.append("as_date",as_date );
    formData.append("sell_type",sell_type);
 
    axios
      .post("/post/write", formData, {
        headers: {
        "Content-Type": "multipart/form-data",
        },})
      .then((res) => {
        
        const entries = Array.from(formimg.entries());
        const formDataLength = entries.length;
        if(formDataLength!==0){
        axios
          .post("/post/file", formimg)
          .then((res) => {
            console.log("uploadfile request");
            alert("판매글 등록이 완료되었습니다!");
            setFileDataList(res.data);
            window.location.href="/post";
            
          })
          .catch((e) => {
            alert("판매글 등록에 실패했습니다.");
            console.error(e);
          });   
        }  
        else{
          alert("작성이 완료되었습니다!");
          window.location.href="/post";
        }
      })
      .catch((e) => {
        alert("판매글 등록에 실패했습니다.");
        console.error(e);
      })
    }
   
  };
  const Product_cancel=(e)=>{
    if(window.confirm("취소하시겠습니까?"))
    {
      window.location.href="/post";
    }
    else{
      return false;
    }
  }

  return (
    <div className="PW_form">
      <div className="PW_header">
        <div className="PR_title">판매글 작성</div>
        <div className="PW_button">
          <button className="PW_list_btn" onClick={Product_cancel}>취소</button>
          <button className="PW_wrie_btn" onClick={Post_write}>등록</button>
        </div>
      </div>
      <div className="PW_image_file">
        <div className="PW_partner">
          <div className="PW_partner_name">제휴회사명</div>
          <div className="PW_partner_serach">
            <input className="PW_partner_input" type="text" placeholder="회사명" maxLength="15"
              value={searchCompany} onChange={(e) => setSearchCompany(e.target.value)} />
            <img className="PW_search_logo" src={searchIcon} alt="검색" onClick={ChangePopUP} />
            <Modal
              style={{
                overlay: {
                  position: "fixed",
                  backgroundColor: "rgba(0, 0, 0, 0.75)"
                },
                content: {
                  position: "absolute",
                  top: "15%",
                  width: "700px",
                  height: "610px",
                  left: "40px",
                  right: "40px",
                  bottom: "40px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "20px"
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
                    setProd_com={setProd_com}    
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
      <div className="PR_product_input">
        <div className="PR_product_info">
          <div className="PR_product_info_title">상품정보</div>
          <div className="PR_product_info_search">
            <input
              className="PR_search_input"
              placeholder="상품 검색"
              maxLength="30"
              value={Productname}
              onChange={(e) => setProductname(e.target.value)}
            />
            <img
              className="PR_search_logo"
              src={searchIcon}
              onClick={Changeprod_PopUP}
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
                  width: "1100px",
                  height: "660px",
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
              isOpen={prod_modal}
            >
              <div className="close_modal">
                <button onClick={close_prod_modal}>
                  <b>X</b>
                </button>
              </div>
              <div className="PW_company_modal">
                {prod_popup && (
                  <FindProduct
                    setMainImg={setMainImg}
                    searchProduct={Productname}
                    setProductname={setProductname}
                    setData={setData}
                    close_prod_modal={close_prod_modal}
                  ></FindProduct>
                )}
              </div>
            </Modal>
          </div>
        </div>
        <div className="PW_product_category">
          <div className="PW_product_input_header">분류</div>
          <div className="PW_product_input_select">
            <select className="PW_category" value={cate} onChange={chageCate}>
              <option>카테고리 선택</option>
              <option value="furniture">가구</option>
              <option value="appliance">가전</option>
            </select>
            <select
              className="PW_detail_category"
              onChange={(e) => setCate_code(e.target.value)}
              value={cate_code}
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
              value={code}
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
              onChange={(e) => setProd_com(e.target.value)}
            />
          </div>
          <div>
            {" "}
            <input
              className="PW_product_name_input"
              type="text"
              maxLength="30"
              placeholder="제품명"
              value={prod_name}
              onChange={(e) => setProd_name(e.target.value)}
            />
          </div>
        </div>
        <div className="PW_product_category">
          <div className="PW_product_input_header">원가</div>
          <div className="PW_product_price">
            <div className="PW_product_price_inside">
              {" "}
              <input
                className="PW_product_price_input"
                type="text"
                onChange={(e) => onChangeOrg(e)}
                value={addComma(org_price) || ""}
              />
              &nbsp; 원
            </div>
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
              checked={guarantee !== "" && guarantee}
            />
            &nbsp; <label>있음</label>
            <input
              type="checkbox"
              className="PW_state_other"
              onClick={onNotExist}
              checked={guarantee !== "" && !guarantee}
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
              {showImages?.map((image, id) => (
                <div key={id}>
                  <img
                    className="PW_defect_img"
                    src={image}
                    alt={alt_img}
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
        <div className="PW_product_category">
          <div className="PR_product_info_title">판매 정보</div>
          <div className="PR_product_state">
            <input
              type="checkbox"
              className="PR_state"
              onClick={onAuction}
              value={auction}
            />
            &nbsp; <label>경매</label>
            <input
              type="checkbox"
              className="PR_state_other"
              onClick={onDirect}
              value={direct}
            />
            &nbsp;<label className="PR_state_other_label">즉시 구매</label>
          </div>
        </div>
        {auction && !direct && (
          <PostAuction
            addComma={addComma}
            onChangeAuc={onChangeAuc}
            onChangeDel={onChangeDel}
            setAs_date={setAs_date}
            auc_price={auc_price}
            del_price={del_price}
            unit_price={unit_price}
            start_date={start_date}
            end_date={end_date}
            onChangeUnit={onChangeUnit}
            as_date={as_date}
            detailFile={detailFile}
            setDetailFile={setDetailFile}
            setStart_date={setStart_date}
            setEnd_date={setEnd_date}
          />
        )}
        {auction && direct && (
          <PostAll
            onChangeDir={onChangeDir}
            addComma={addComma}
            onChangeAuc={onChangeAuc}
            onChangeDel={onChangeDel}
            onChangeUnit={onChangeUnit}
            setAs_date={setAs_date}
            dir_price={dir_price}
            auc_price={auc_price}
            unit_price={unit_price}
            del_price={del_price}
            start_date={start_date}
            detailFile={detailFile}
            end_date={end_date}
            as_date={as_date}
            setDetailFile={setDetailFile}
            setStart_date={setStart_date}
            setEnd_date={setEnd_date}
            
          />
        )}
        {!auction && direct && (
          <PostDirect
            onChangeDir={onChangeDir}
            addComma={addComma}
            onChangeAuc={onChangeAuc}
            onChangeDel={onChangeDel}
            setAs_date={setAs_date}
            setDetailFile={setDetailFile}
            detailFile={detailFile}
            dir_price={dir_price}
            del_price={del_price}
            as_date={as_date}
           
          />
        )}
      </div>
    </div>
  );
}

export default PostWrite;
