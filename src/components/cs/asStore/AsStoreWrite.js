import React, { useState, useEffect, useRef } from "react";
import search_logo from "../../../images/search.png";
import { Link } from "react-router-dom";
import "../notice/NoticeList.css";
import "../CsNavbar.css";
import "../FAQ/FAQ.css";
import "./AsStoreWrite.css";
import markers from "./marker.json";
import CountryCity from "./CountryCity.json";
import Post from "./FindStoreAddress";
import Modal from "react-modal";
import axios from "axios";

function AsStoreWrite() {
  const [city, setCity] = useState();
  const [store_num, setStore_num] = useState();
  const [store_name, setStore_name] = useState();
  const [store_phone, setStore_phone] = useState();
  const [store_addr, setStore_addr] = useState();
  const [store_detail, setStore_detail] = useState();
  const [lattitude, setLattitude] = useState();
  const [longitude, setLongitude] = useState();
  const [find_name, setFind_name] = useState();
  const [dataList, setDataList] = useState([]);
  const [actionMode, setActionMode] = useState(0);
  const [item, setItem] = useState([]);
  const searchpartRef = useRef();

  useEffect(() => {
    aslist();
  }, []);

  const aslist = () => {
    axios
      .get("/cs/as", {})
      .then((res) => {
        // res : 서버의 응답 결과 저장
        console.log("res ==>", res);
        const { data } = res; // data = res.data
        console.log("data ==>", data);
        setDataList(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // 현재 페이지에 해당하는 데이터 추출

  // 페이지 번호 클릭 이벤트 핸들러
  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataList.slice(indexOfFirstItem, indexOfLastItem);
  // 페이지 번호 버튼 생성
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dataList.length / itemsPerPage); i++) {
    pageNumbers.push(
      <button key={i} id={i} onClick={handleClick}>
        {i}
      </button>
    );
  }
  console.log(dataList.length);
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

  const StoreRegi = () => {
    if (window.confirm("등록을 완료하시겠습니까?")) {
      axios
        .post("/cs/as/admin/write", {
          storeName: store_name,
          storePhone: store_phone,
          storeAddr: store_addr,
          storeDetail: store_detail,
          latitude: lattitude,
          longitude: longitude,
        })
        .then((res) => {
          console.log("길이는", res.data);
          alert("성공적으로 등록되었습니다.");
          aslist();
          document.location.href = "/cs/as/write";
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      return false;
    }
  };

  const StoreUpdate = () => {
    if (window.confirm("수정을 완료하시겠습니까?")) {
      axios
        .post(`/cs/as/admin/update/${store_num}`, {
          storeNum: store_num,
          storeName: store_name,
          storePhone: store_phone,
          storeAddr: store_addr,
          storeDetail: store_detail,
          latitude: lattitude,
          longitude: longitude,
        })
        .then((res) => {
          alert("성공적으로 수정되었습니다.");
          // aslist();
          document.location.href = "/cs/as/admin";
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      return false;
    }
  };

  const updateChange = (e) => {
    setStore_num(dataList[e.target.id - 1].storeNum);
    setStore_name(dataList[e.target.id - 1].storeName);
    setStore_phone(dataList[e.target.id - 1].storePhone);
    setStore_addr(dataList[e.target.id - 1].storeAddr);
    setStore_detail(dataList[e.target.id - 1].storeDetail);
    setLattitude(dataList[e.target.id - 1].latitude);
    setLongitude(dataList[e.target.id - 1].longitude);
    console.log("number", store_name);
    setActionMode(1);
  };

  const asDelete = (e) => {
    axios
      .post("/cs/as/admin/delete", {
        storeNum: e.target.id,
      })
      .then((res) => {
        aslist();
        alert("삭제가 완료되었습니다.");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  function searchCity(e) {
    console.log(e.target.value);
    axios
      .post("/cs/as/search", {
        storeAddr: e.target.value,
      })
      .then((res) => {
        const { data } = res; // data = res.data
        setDataList(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  function searchCityText() {
    console.log(searchpartRef.current.value);
    axios
      .post("/cs/as/search2", {
        storeName: searchpartRef.current.value,
      })
      .then((res) => {
        const { data } = res; // data = res.data
        setDataList(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <>
      <div className="FAQ-List-form">
        <div className="FAQTitle">
          <div className="AsStoreTitleHead">A/S 매장 관리</div>
        </div>
        <hr className="FAQnavline" />
        <div className="AsStore_Regi_form">
          <div className="AsStore_info_form">
            <div className="AsStore_name_form">
              <div className="AsStore_name_title">매장명</div>
              <div className="AsStore_name_input">
                <input
                  placeholder="이름"
                  maxLength="20"
                  value={store_name}
                  onChange={(e) => setStore_name(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="AsStore_phone_form">
              <div className="AsStore_name_title">연락처</div>
              <div className="AsStore_name_input">
                <input
                  placeholder="연락처"
                  maxLength="15"
                  value={store_phone}
                  onChange={(e) => setStore_phone(e.target.value)}
                ></input>
              </div>
            </div>
          </div>

          <div className="AsStore_addr_form">
            <div className="AsStore_addr_find">
              <div className="AsStore_addr_header">주소</div>
              <div className="AsStore_addr_input">
                <input
                  name="address"
                  type="text"
                  size="100"
                  maxLength="100"
                  placeholder="주소"
                  required={true}
                  value={store_addr}
                />
              </div>
              <div className="AsStore_addr_logo">
                <img src={search_logo} onClick={ChangePopUP} />
              </div>
              <Modal
                style={{
                  overlay: {
                    position: "fixed",
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                  },
                  content: {
                    position: "absolute",
                    top: "25%",
                    width: "450px",
                    height: "430px",
                    left: "40px",
                    right: "40px",
                    bottom: "40px",
                    border: "1px solid #ccc",
                    background: "#fff",
                    overflow: "auto",
                    WebkitOverflowScrolling: "touch",
                    borderRadius: "4px",
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
                <div>
                  {popup && (
                    <Post
                      store_addr={store_addr}
                      setStore_addr={setStore_addr}
                      setLattitude={setLattitude}
                      setLongitude={setLongitude}
                      setMdoal={setModal}
                    ></Post>
                  )}
                </div>
              </Modal>
            </div>
            <div className="AsStore_addr_detail">
              <div className="AsStore_addr_header">&nbsp;</div>
              <div className="AsStore_addr_detail_form">
                <input
                  type="text"
                  size="100"
                  maxLength="100"
                  placeholder=" 상세 주소"
                  value={store_detail}
                  onChange={(e) => setStore_detail(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <div className="AsStore_regi_btn">
            {actionMode === 0 ? (
              <button onClick={StoreRegi}>등록</button>
            ) : (
              <button onClick={StoreUpdate}>수정</button>
            )}
          </div>
        </div>
        <div className="AsStore_List">
          <div className="AsStore_List_Category">
            <div className="AsStore_Category_base">
              <select onChange={(e) => setCity(e.target.value)}>
                <option>전체</option>
                {CountryCity.cities.map((cities) => (
                  <option vlaue={cities.name}>{cities.name}</option>
                ))}
              </select>
            </div>
            <div className="AsStore_Category_base">
              <select onChange={searchCity}>
                <option>전체</option>
                {CountryCity.countries.map((countries) =>
                  city === countries.section ? (
                    <option>{countries.section_detail}</option>
                  ) : (
                    <></>
                  )
                )}
              </select>
            </div>
            <div className="AsStore_Name_find">
              <input
                type="text"
                maxLength="30"
                placeholder="매장명"
                value={find_name}
                ref={searchpartRef}
              ></input>
              <div className="AsStore_addr_logo">
                <img src={search_logo} onClick={searchCityText} />
              </div>
            </div>
          </div>
        </div>
        {currentItems.map((marker, index) => (
          <div className="AsStore_Post_List">
            <div className="AsStore_Post_Header">
              <div className="AsStore_Post_Title">{marker.storeName}</div>
              <div className="AsStore_Post_phone">{marker.storePhone}</div>
              <div className="AsStore_Post_button">
                <span id={marker.storeNum} onClick={updateChange}>
                  수정
                </span>
                &nbsp;|&nbsp;
                <span id={marker.storeNum} onClick={asDelete}>
                  삭제
                </span>
              </div>
            </div>
            <div className="AsStore_Post_Detail">
              {marker.storeAddr}&nbsp;
              {marker.storeDetail}
            </div>
          </div>
        ))}
        <div className="company-pagination">
          <div>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            {pageNumbers}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(dataList.length / itemsPerPage)
              }
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default AsStoreWrite;
