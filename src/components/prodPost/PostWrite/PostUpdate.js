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
  const [auc_price, setAuc_price] = useState("");
  const [del_price, setDel_price] = useState("");
  const [as_date, setAs_date] = useState("");
  const [guarantee, setGuarantee] = useState("");
  const [sell_type, setSell_type] = useState("");
  const [auction, setAuction] = useState(false);
  const [direct, setDirect] = useState(false);
  const [defect_text, setDefect_text] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [reg_date, setReg_date] = useState("");
  const [prod_state, setProd_state] = useState("");
  const [showImages, setShowImages] = useState([]);

  let now = new Date();
  var fileList = []; // 업로드 할 파일 리스트 저장
  /*===============================================*/

  useEffect(() => {
    console.log(board_num);
    /*
    axios
      .get("/post/update", {
        board_num: board_num,
      })
      .then((res) => {})
      .catch((e) => {
        console.error(e);
      });
    */
    const ex_data = {
      product_code: "1",
      com_num: "6",
      category_code: "SF",
      category: "funbed",
      main_image: "",
      prod_com: "에이스",
      prod_name: "침대",
      prod_grade: "S",
      guarantee: false,
      org_price: "3000000",
      Deffect_text: "모서리 스크래치",
      affect_text: "모서리 스크래치",
      dir_price: "100000",
      auc_price: "50000",
      del_price: "10000",
      as_date: "1",
      start_date: "2023-03-12T19:30",
      end_date: "2023-04-12T08:30",
      sell_type: "3",
      image: process.env.PUBLIC_URL + "/images/prod/image02.png",
      deffect_image1: process.env.PUBLIC_URL + "/images/prod/image03.png",
      deffect_image2: process.env.PUBLIC_URL + "/images/prod/image04.png",
      deffect_image3: process.env.PUBLIC_URL + "/images/prod/image05.png",
    };
    setData(ex_data);
    if (ex_data.sell_type === "1") {
      setAuction(true);
      setDirect(false);
    } else if (ex_data.sell_type === "2") {
      setAuction(false);
      setDirect(true);
    } else {
      setAuction(true);
      setDirect(true);
    }

    setDir_price(ex_data.dir_price);
    setAuc_price(ex_data.auc_price);
    setDel_price(ex_data.del_price);
    setAs_date(ex_data.as_date);
    setStart_date(ex_data.start_date);
    setEnd_date(ex_data.end_date);
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
    if (
      productData.category === "funliving" ||
      productData.category === "funbed" ||
      productData.category === "funoffice"
    ) {
      setFuniture(true);
      setAppliance(false);
      setCate("funiture");
    } else {
      setFuniture(false);
      setAppliance(true);
      setCate("appliance");
    }
    let imageUrlLists = [];
    imageUrlLists.push(productData.deffect_image1);
    imageUrlLists.push(productData.deffect_image2);
    imageUrlLists.push(productData.deffect_image3);
    setShowImages(imageUrlLists);
    setCate_code(productData.category);
    setCode(productData.category_code);
    setSearchCompany(productData.com_num);
    setProd_com(productData.prod_com);
    setProd_name(productData.prod_name);
    setOrg_price(productData.org_price);
    setMainImg(productData.image);
    if (productData.prod_grade === "S") onCHKS();
    else if (productData.prod_grade === "A") onCHKA();
    else if (productData.prod_grade === "B") onCHKB();

    setGuarantee(productData.guarantee);
    setDefect_text(productData.Deffect_text);
    setInputCount(productData.Deffect_text.length);
  };
  /*===============================================*/

  /*=================샘플 데이터 이미지는 백엔드에서=========================*/

  /*===============================================*/

  const [file, setFile] = useState(null);
  const [listFile, setListfile] = useState();
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
  /*===============================================*/

  const Product_write = (e) => {
    const formData = new FormData(); // <form></form> 형식의 데이터를 전송하기 위해 주로 사용.
    console.log("fileList=>" + listFile);

    listFile.forEach((file) => {
      formData.append("uploadfiles", file);
    });

    console.log(formData);
    if (listFile.length === 0) {
      alert("상품 사진을 하나 이상 등록해 주세요.");
    }

    axios
      .post("/product/update", {
        CATEGORY_CODE: code,
        CATEGORY: cate_code,
        MAIN_IMAGE: main_Image,
        PROD_COM: prod_com,
        PROD_NAME: prod_name,
        PROD_GRADE: prod_Grade,
        ORG_PRICE: org_price,
        GUARANTEE: guarantee,
        DEFFECT_TEXT: defect_text,
        DEFFECT_IMAGE1: showImages[0],
        DEFFECT_IMAGE2: showImages[1],
        DEFFECT_IMAGE3: showImages[2],
        REG_DATE: new Date(),
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        console.log("upload request");
      })
      .catch((e) => {
        console.error(e);
      })
      .then(() => {
        // 동작 안되면 "/uploadfile" 로 수정하세요
        axios
          .post("/uploadfile", formData)
          .then((res) => {
            console.log("uploadfile request");
            alert("작성이 완료되었습니다!");
            setFileDataList(res.data);
          })
          .catch((e) => {
            console.error(e);
          });
      });
  };

  return (
    <div className="PW_form">
      <div className="PW_header">
        <div className="PR_title">판매글 작성</div>
        <div className="PW_button">
          <button className="PW_list_btn">취소</button>
          <button className="PW_wrie_btn" onClick={Product_write}>
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
            setAs_date={setAs_date}
            auc_price={auc_price}
            del_price={del_price}
            start_date={start_date}
            end_date={end_date}
            as_date={as_date}
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
            setAs_date={setAs_date}
            dir_price={dir_price}
            auc_price={auc_price}
            del_price={del_price}
            start_date={start_date}
            end_date={end_date}
            as_date={as_date}
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
            dir_price={dir_price}
            del_price={del_price}
            as_date={as_date}
          />
        )}
      </div>
    </div>
  );
}

export default PostUpdate;
