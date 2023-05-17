import React, { useState, useEffect } from "react";
import search_logo from "../../../images/search.png";
import { Link, useLocation } from "react-router-dom";
import "../notice/NoticeList.css";
import "../CsNavbar.css";
import "../FAQ/FAQ.css";
import "./AsStoreWrite.css";
import markers from "./marker.json";
import CountryCity from "./CountryCity.json";
import Post from "./FindStoreAddress";
import Modal from "react-modal";

function AsStoreUpdate() {
  const location = useLocation();
  const item = location.state.marker;
  const [city, setCity] = useState();
  const [store_name, setStore_name] = useState();
  const [store_phone, setStore_phone] = useState();
  const [store_addr, setStore_addr] = useState();
  const [store_detail, setStore_detail] = useState();
  const [lattitude, setLattitude] = useState();
  const [longitude, setLongitude] = useState();
  const [find_name, setFind_name] = useState();
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setStore_name(item.store_name);
    setStore_phone(item.store_phone);
    setStore_addr(item.store_addr);
    setStore_detail(item.store_detail);
    setLattitude(item.latitude);
    setLongitude(item.longitude);
    setDataList(markers.placelist);
  }, []);

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
  for (
    let i = 1;
    i <= Math.ceil(markers.placelist.length / itemsPerPage);
    i++
  ) {
    pageNumbers.push(
      <button key={i} id={i} onClick={handleClick}>
        {i}
      </button>
    );
  }

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

  const ChangeInfo = (item) => {
    setStore_name(item.store_name);
    setStore_phone(item.store_phone);
    setStore_addr(item.store_addr);
    setStore_detail(item.store_detail);
    setLattitude(item.latitude);
    setLongitude(item.longitude);
    window.location.reload();
  };
  const FindStore = () => {
    // axios
    // .post("/cs/asstore/find", {
    //     find_name:find_name
    // })
    // .then((res) => {
    //   if (res.data === 1) {
    //     alert("성공적으로 등록되었습니다.");
    //     setDataList(res.data);
    //   } else {
    //     alert("등록에 실패했습니다.");
    //   }
    // })
    // .catch((e) => {
    //   console.error(e);
    // });
  };
  const StoreRegi = () => {
    if (window.confirm("등록을 완료하시겠습니까?")) {
      // axios
      // .post("/cs/asstore/write", {
      //     store_name: store_name,
      //     store_phone: store_phone,
      //     store_addr:store_addr,
      //     store_detail: store_detail,
      //     lattitude:lattitude,
      //     longitude:longitude,
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
      document.location.href = "/cs/as_store/write";
    } else {
      return false;
    }
  };
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
            <button onClick={StoreRegi}> 등록</button>
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
              <select>
                <option>전체</option>
                {CountryCity.countries.map((countries) =>
                  city === countries.section ? (
                    <option value={countries.section_detail}>
                      {countries.section_detail}
                    </option>
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
                onChange={(e) => setFind_name(e.target.value)}
              ></input>
              <div className="AsStore_addr_logo">
                <img src={search_logo} onClick={FindStore} />
              </div>
            </div>
          </div>
        </div>
        {currentItems.map((marker) => (
          <div className="AsStore_Post_List">
            <div className="AsStore_Post_Header">
              <div className="AsStore_Post_Title">{marker.store_name}</div>
              <div className="AsStore_Post_phone">{marker.store_phone}</div>
              <div className="AsStore_Post_button">
                <Link
                  to="/cs/as_store/update"
                  onClick={ChangeInfo}
                  state={{ marker: marker }}
                >
                  수정
                </Link>
                &nbsp;|&nbsp;
                <a>삭제</a>
              </div>
            </div>
            <div className="AsStore_Post_Detail">
              {marker.store_addr}&nbsp;
              {marker.store_detail}
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
                currentPage ===
                Math.ceil(markers.placelist.length / itemsPerPage)
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
export default AsStoreUpdate;
