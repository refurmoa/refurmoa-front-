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
import { useParams } from "react-router-dom";
import { format } from 'date-fns';

function PostUpdate() {
  const board_num = useParams().board_num;

  /*=================샘플 데이터 이미지는 백엔드에서=========================*/
  const [cate, setCate] = useState("");
  const [cate_code, setCate_code] = useState("");
  const [main_Image, setMainImg] = useState("");
  const [code, setCode] = useState("");
  const [prod_com, setProd_com] = useState("");
  const [prod_name, setProd_name] = useState("");
  const [prod_Grade, setprod_Grade] = useState("");
  const [org_price, setOrg_price] = useState("");
  const [dir_price, setDir_price] = useState("");
  const [unit_price, setUnit_price] = useState("");
  const [auc_price, setAuc_price] = useState("");
  const [del_price, setDel_price] = useState("");
  const [as_date, setAs_date] = useState("");
  const [guarantee, setGuarantee] = useState("");
  const [auction, setAuction] = useState(false);
  const [direct, setDirect] = useState(false);
  const [defect_text, setDefect_text] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [reg_date, setReg_date] = useState("");
  const [prod_state, setProd_state] = useState("");
  const [showImages, setShowImages] = useState([]);
  const [img_con, setImg_con] = useState(false);
  const [com_num, setCom_num] = useState();
  const [sell_type, setSell_type] = useState(0);
  const [prod_code, setProd_code] = useState(0)
  const[mainFile,setMainFile]=useState();
  const[detailFile,setDetailFile]=useState();
  const [deffect1, setDeffect1] = useState("");
  const [deffect2, setDeffect2] = useState("");
  const [deffect3, setDeffect3] = useState("");
  let now = new Date();
  var fileList = []; // 업로드 할 파일 리스트 저장
  /*===============================================*/

  useEffect(() => {
    console.log(board_num);
  
    axios
      .get(`/post/update/info?num=${board_num}`)
      .then((res) => {
       
        setData(res.data.prod);
        if (res.data.sell_type === "1") {
          setAuction(true);
          setDirect(false);
        } else if (res.data.sell_type === "2") {
          setAuction(false);
          setDirect(true);
        } else {
          setAuction(true);
          setDirect(true);
        }
        const start=format(new Date(res.data.start_date), "yyyy-MM-dd'T'HH:mm");
        const end=format(new Date(res.data.end_date), "yyyy-MM-dd'T'HH:mm");
        setDir_price(res.data.dir_price);
        setAuc_price(res.data.auc_price);
        setDel_price(res.data.del_price);
        setUnit_price(res.data.unit_price);
        setAs_date(res.data.as_date);
        setStart_date(start);
        setEnd_date(end);
        setDetailFile(res.data.detail);
      })
      .catch((e) => {
        console.error(e);
      });

  }, []);

  /*===============================================*/

  const [Productname, setProductname] = useState();
  const [searchProduct, setSearchProduct] = useState([]);

  const [prod_popup, setProd_Popup] = useState(false);
  const [prod_modal, setProd_Modal] = useState(false);
  const Changeprod_PopUP = () => {
    setProd_Popup(true);
    setProd_Modal(true);
  };
  const close_prod_modal = () => {
    setProd_Popup(false);
    setProd_Modal(false);
  };
  const setData = (productData) => {
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
    setDeffect1(productData.defectImage1);
    setDeffect2(productData.defectImage2);
    setDeffect3(productData.defectImage3);

    let imageUrlLists = [];
    imageUrlLists.push(`${process.env.PUBLIC_URL}/images/${productData.defectImage1}`);
    imageUrlLists.push(`${process.env.PUBLIC_URL}/images/${productData.defectImage2}`);
    imageUrlLists.push(`${process.env.PUBLIC_URL}/images/${productData.defectImage3}`);
    setReg_date(productData.regDate);
    setShowImages(imageUrlLists);
    setImg_con(true);
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

  /*=================샘플 데이터 이미지는 백엔드에서=========================*/

  /*===============================================*/


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
    if (auction) {
      const tmp = sell_type + 1;
      setSell_type(tmp);
    } else {
      const tmp = sell_type - 1;
      setSell_type(tmp);
    }
  };
  const onDirect = () => {
    setDirect(!direct);
    if (direct) {
      const tmp = sell_type + 2;
      setSell_type(tmp);
    } else {
      const tmp = sell_type - 2;
      setSell_type(tmp);
    }
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
  const addComma = (price) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
  };
  const onChangeUnit = (e) => {
    const { value } = e.target;
    let str = value.replaceAll(",", "");
    setUnit_price(str);
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

  const onChangeDel = (e) => {
    const { value } = e.target;
    let str = value.replaceAll(",", "");
    setDel_price(str);
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
  /*===============================================*/

  const Post_write = () => {
    if(defect_text===""){
      alert("하자 정보가 비었습니다.");
      return false;
    }
    else{
    const formData = new FormData(); // <form></form> 형식의 데이터를 전송하기 위해 주로 사용.
    const formimg = new FormData();

    console.log(listFile);
    
      listFile.forEach((file) => {
        formimg.append("uploadfiles", file)
      });
    
    
    
    if(auction && !direct)setSell_type(1);
    else if(!auction && direct)setSell_type(2);
    else if(auction && direct)setSell_type(3);
  
    formData.append("main_image",mainFile);
    formData.append("detailFile",detailFile);

    formData.append("product_code",prod_code);
    formData.append("category", cate_code);
    formData.append("category_code",code);
    formData.append("deffect_image1",deffect1);
    formData.append("deffect_image2",deffect2);
    formData.append("deffect_image3",deffect3);
    formData.append("prod_com", prod_com);
    formData.append("prod_name",prod_name );
    formData.append("prod_grade",prod_Grade );
    formData.append("org_price", org_price);
    formData.append("guarantee",guarantee );
    formData.append("deffect_text", defect_text);
    formData.append("reg_date",new Date(reg_date));
    formData.append("prod_state",1);
    formData.append("com_num",com_num);
    formData.append("board_num", board_num);
    formData.append("dir_price", dir_price);
    formData.append("auc_price",auc_price );
    formData.append("unit_price",unit_price );
    formData.append("del_price", del_price);
    formData.append("start_date",new Date(start_date) );
    formData.append("end_date", new Date(end_date));
    formData.append("update_date", new Date());
    formData.append("as_date",as_date );
    formData.append("readCount",0);
    formData.append("deleteCheck",false);
    formData.append("sell_type",sell_type);
 
    axios
      .post("/post/write", formData, {
        headers: {
        "Content-Type": "multipart/form-data",
        },})
      .then((res) => {
        
        const entries = Array.from(formimg.entries());
        const formDataLength = entries.length;
        console.log(formDataLength);
        if(formDataLength!==0){
        axios
          .post("/post/file", formimg)
          .then((res) => {
            console.log("uploadfile request");
            alert("파일 등록이 완료되었습니다!");
            setFileDataList(res.data);
            window.location.href="/post";
            
          })
          .catch((e) => {
            console.error(e);
          });   
        }  
        else{
          alert("작성이 완료되었습니다!");
          window.location.href="/post";
        }
      })
      .catch((e) => {
        console.error(e);
      })
    }
   
  };
  return (
    <div className="PW_form">
      <div className="PW_header">
        <div className="PR_title">판매글 작성</div>
        <div className="PW_button">
          <button className="PW_list_btn" onClick={Product_cancel}>취소</button>
          <button className="PW_wrie_btn" onClick={Post_write}>
            수정
          </button>
        </div>
      </div>
      <div className="PW_image_file">
        <div className="PW_partner">
          <div className="PW_partner_name">제휴회사명</div>
          <div className="PW_partner_serach">
            <input
              maxLength="15"
              className="PW_partner_input"
              type="text"
              placeholder="회사명"
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
                  top: "15%",
                  width: "600px",
                  height: "610px",
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
                    setProd_com={setProd_com}
                    setCom_num={setCom_num}
                    setData={setData}
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
                    searchProduct={searchProduct}
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
              <option value="funiture">가구</option>
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
            {" "}
            <input
              className="PW_product_price_input"
              type="text"
              onChange={(e) => onChangeOrg(e)}
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
              checked={auction}
              value={auction}
            />
            &nbsp; <label>경매</label>
            <input
              type="checkbox"
              className="PR_state_other"
              onClick={onDirect}
              checked={direct}
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
            onChangeUnit={onChangeUnit}
            setAs_date={setAs_date}
            auc_price={auc_price}
            del_price={del_price}
            unit_price={unit_price}
            start_date={start_date}
            end_date={end_date}
            as_date={as_date}
            setDetailFile={setDetailFile}
            setStart_date={setStart_date}
            setEnd_date={setEnd_date}
            detailFile={detailFile}
          />
        )}
        {auction && direct && (
          <PostAll
            onChangeDir={onChangeDir}
            addComma={addComma}
            onChangeUnit={onChangeUnit}
            onChangeAuc={onChangeAuc}
            onChangeDel={onChangeDel}
            setAs_date={setAs_date}
            dir_price={dir_price}
            auc_price={auc_price}
            unit_price={unit_price}
            del_price={del_price}
            start_date={start_date}
            end_date={end_date}
            as_date={as_date}
            setDetailFile={setDetailFile}
            setStart_date={setStart_date}
            setEnd_date={setEnd_date}
            detailFile={detailFile}
          />
        )}
        {!auction && direct && (
          <PostDirect
            onChangeDir={onChangeDir}
            addComma={addComma}
            onChangeAuc={onChangeAuc}
            onChangeDel={onChangeDel}
            setAs_date={setAs_date}
            unit_price={unit_price}
            dir_price={dir_price}
            del_price={del_price}
            as_date={as_date}
            setDetailFile={setDetailFile}
            detailFile={detailFile}
          />
        )}
      </div>
    </div>
  );
}

export default PostUpdate;
