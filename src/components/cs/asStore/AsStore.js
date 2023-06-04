import "./AsStore.css";
import { ProductMap } from "./ProductMap";
import { useState, useRef, useEffect } from "react";
import location_icon from "../../../images/home.png";
import LocationData from "./CountryCity.json";
import markers from "./marker.json";
import axios from "axios";
import kakaoQR from "../../../images/kakaotalkQR.png";

const AsStore = () => {
  const [qrModal, setQrModal] = useState(0); // 비즈니스 문의 모달 창
  const [dataList, setDataList] = useState([]);
  const [customerinfo, setCustomerInfo] = useState("");
  const [textstyle, setTextstyle] = useState("locationstyle");
  const [country, setCountry] = useState("");
  const [data, setData] = useState([37.503937534848404, 127.04281232332467]);
  const id = window.sessionStorage.getItem("id");
  const [myplace, setMyplace] = useState();
  const [myplace2, setMyplace2] = useState(0);
  const [message, setMessage] = useState();

  useEffect(() => {
    aslist();
    customerInfo();
  }, []);

  // 회원 주소 데이터 가져오기============================================================================

  const customerInfo = () => {
    axios
      .post("/cs/as/user/addr", {
        memberId: id,
        acceptLocation: false,
      })
      .then((res) => {
        const { data } = res; // data = res.data
        setCustomerInfo(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 데이터 가져오기============================================================================

  const aslist = () => {
    axios
      .get("/cs/as", {})
      .then((res) => {
        const { data } = res; // data = res.data
        setDataList(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // =============================================================================================

  // 기업 filtering===============================================================================
  const [asComNum, setAsComNum] = useState();
  const [cityFirstWord, setCityFirstWord] = useState();

  function searchCity(e) {
    axios
      .post("/cs/as/search/city", {
        storeAddr: e.target.value,
        storeDetail: cityFirstWord,
      })
      .then((res) => {
        const { data } = res; // data = res.data
        setDataList(data);
        handleCity(e);
        inputDefault();
      })
      .catch((e) => {
        console.error(e);
      });
  }
  useEffect(() => {
    setCityFirstWord(country.substr(0, 1));
  }, [country]);

  function inputDefault() {
    setMessage("");
  }

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  // ==============================================================================================
  function handleCity(e) {
    setData([
      LocationData.countries.find(
        (sub) => sub.section_detail === e.target.value
      ).latitude,
      LocationData.countries.find(
        (sub) => sub.section_detail === e.target.value
      ).longitude,
    ]);
  }

  // 광역시 시 군 구 구하기=========================================================================

  const searchpartRef = useRef();

  function searchCityText() {
    axios
      .post("/cs/as/search/text", {
        storeName: searchpartRef.current.value,
      })
      .then((res) => {
        const { data } = res; // data = res.data
        setDataList(data);
        selectDefault();
      })
      .catch((e) => {
        console.error(e);
      });
  }

  function selectDefault() {
    document.getElementById("city").selectedIndex = 0;
    document.getElementById("country").selectedIndex = 0;
  }

  // ==========================================================================================

  //현재 위치 찾기=============================================================================
  const [currLocation, setCurrLocation] = useState({});
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrLocation({ latitude, longitude });
    });
    setData([currLocation.latitude, currLocation.longitude]);
    setTextstyle("mylocationcursor");
    setMyplace2(1);
    selectDefault();
    aslist();
    inputDefault();
  };

  const { kakao } = window;
  const geocoder = new kakao.maps.services.Geocoder();
  const callback = function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      setMyplace(result[0].address_name);
    }
  };

  function handleCountry(e) {
    setCountry(e.target.value);
    setMyplace2(0);
    setTextstyle("locationstyle");
  }

  geocoder.coord2RegionCode(
    currLocation.longitude,
    currLocation.latitude,
    callback
  );
  // ====================================================================================================
  console.log(dataList);

  function clickList(marker) {
    setDataList(marker);
    setData([marker[0].latitude, marker[0].longitude]);
  }

  return (
    <div>
      <topbar className="astop">
        <div className="astoptextM">A/S 매장 찾기</div>
        <div className="astoptextR">
          {customerinfo !== 0 ? (
            <div className="astoptextRlocation">
              {customerinfo}
              <img alt="" src={location_icon} />
            </div>
          ) : customerinfo === 0 ? (
            <div
              className={textstyle}
              onClick={() => {
                getLocation();
              }}
            >
              {myplace2 === 0 ? "현재 위치" : myplace}
              <img alt="" src={location_icon} />
            </div>
          ) : (
            ""
          )}
        </div>
      </topbar>
      <div className="astopbar"></div>
      <underbar className="asunder">
        {/* 가운데 정보 */}
        <div className="asmiddle">
          <div className="asmiddlelocation">지역 검색</div>
          <div>
            <select
              className="asmiddleselect"
              onChange={handleCountry}
              required
              id="city"
            >
              <option value="" disabled selected>
                시/도
              </option>
              {LocationData.cities.map((main) => (
                <option value={main.name}>{main.name}</option>
              ))}
            </select>
            <select
              className="asmiddleselect"
              onChange={searchCity}
              required
              id="country"
            >
              <option value="" disabled selected>
                시/군/구
              </option>
              {LocationData.countries
                .filter((li) => li.section === country)
                .map((sub) => (
                  <option value={sub.section_detail}>
                    {sub.section_detail}
                  </option>
                ))}
            </select>

            <div className="asmiddlecompany">매장명 검색</div>
            <div>
              <div className="asmiddleinput">
                <input
                  className="asmiddlesearchbox"
                  type="text"
                  placeholder="매장명"
                  ref={searchpartRef}
                  value={message}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchCityText();
                  }}
                ></input>
                <input
                  className="asmiddlesearchboxbutton"
                  type="button"
                  onClick={searchCityText}
                ></input>
              </div>
            </div>
          </div>
          <div className="asmiddlelistfull">
            {dataList.length === 0 ? (
              <div className="asNoList">매장이 없습니다.</div>
            ) : (
              <div>
                {dataList.map((marker) => (
                  <div
                    className="asmiddlelist"
                    onClick={() => clickList([marker])}
                  >
                    <div className="asmiddlelisttop">
                      <div className="aslistname">{marker.storeName}</div>
                      <div className="aslistphone">{marker.storePhone}</div>
                    </div>
                    <div className="aslistaddr">
                      {marker.storeAddr}
                      {marker.storeDetail}
                    </div>
                    <div
                      className="aslistone"
                      onClick={() => {
                        setQrModal(1);
                      }}
                    >
                      1:1 상담
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* 지도 부분 */}
        <div className="asright">
          <ProductMap
            markers={dataList}
            data={data}
            currLocation={currLocation}
            asComNum={asComNum}
          />
        </div>
      </underbar>
      {qrModal === 1 && (
        <div
          className="F-QRModal_wrap"
          onClick={() => {
            setQrModal(0);
          }}
        >
          <img className="F-QRModal" alt="찜하기" src={kakaoQR}></img>
        </div>
      )}
    </div>
  );
};

export default AsStore;
