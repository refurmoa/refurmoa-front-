import "./AsStore.css";
import { ProductMap } from "./ProductMap";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import location_icon from "../../../images/location_icon.png";
import LocationData from "./CountryCity.json";
import customerinfo from "./customer.json";
import markers from "./marker.json";
import axios from "axios";

const AsStore = () => {
  const [marker, setMarker] = useState();
  // const [searchData, setSeatchData] = useState();

  const asDetail = (store_name) => {
    // axios
    //   .get(`/api/getproducts?store_name=${store_name}`)
    //   .then((res) => {
    //     const { data } = res;
    //     setMarker(data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });

    const data = markers.placelist;
    setMarker(data);
  };

  function searchlocationtext(e) {
    // setSeatchData(e.target.value);
  }

  const BigCity = useRef();
  const SmallCity = useRef();
  const SearchCom = useRef();

  const searchlocation = () => {
    if (BigCity.current.value === "" || BigCity.current.value === undefined) {
      alert("광역시를 정해주세요!!");
      BigCity.current.focus();
      return false;
    }
    if (
      SmallCity.current.value === "" ||
      SmallCity.current.value === undefined
    ) {
      alert("시군구를 정해주세요!!");
      SmallCity.current.focus();
      return false;
    }
    if (
      SearchCom.current.value === "" ||
      SearchCom.current.value === undefined
    ) {
      alert("내용을 입력하세요!!");
      SearchCom.current.focus();
      return false;
    }

    // axios
    //   .post(`/api/searchlocation`, {
    //     searchData,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     setMarker();
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
  };

  const [country, setCountry] = useState();
  const [data, setData] = useState([37.624915253753194, 127.15122688059974]);
  function handleCountry(e) {
    setCountry(e.target.value);
  }

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

  const [currLocation, setCurrLocation] = useState({});

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrLocation({ latitude, longitude });
    });
  };

  const [myplace, setMyplace] = useState();
  const { kakao } = window;
  const geocoder = new kakao.maps.services.Geocoder();
  const callback = function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      setMyplace(result[0].address_name);
    }
  };

  geocoder.coord2RegionCode(
    currLocation.longitude,
    currLocation.latitude,
    callback
  );

  return (
    <div>
      <topbar className="astop">
        <div className="astoptextL">고객센터</div>
        <div className="astoptextM">A/S 매장 찾기</div>
        {customerinfo.map((cus) => (
          <div className="astoptextR">
            {cus.accept_location === 0 ? (
              <div>
                <img alt="" src={location_icon} />
                {cus.address}
              </div>
            ) : cus.accept_location === 1 ? (
              <div>
                <img alt="" src={location_icon} />
                {myplace}
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </topbar>
      <div className="astopbar"></div>
      <underbar className="asunder">
        {/* 왼쪽 메뉴바 */}
        <div className="asleft">
          <Link to="/cs/notice">
            <div className="asunderrest">공지사항</div>
          </Link>
          <Link to="/cs/faq">
            <div className="asunderrest">FAQ</div>
          </Link>
          <Link to="/cs/inquiry">
            <div className="asunderrest">1:1 문의하기</div>
          </Link>
          <div className="asundertopic">A/S 매장 찾기</div>
        </div>
        {/* 가운데 정보 */}
        <div className="asmiddle">
          <div className="asmiddlelocation">지역 검색</div>
          <div>
            <select
              className="asmiddleselect"
              onChange={handleCountry}
              ref={BigCity}
            >
              <option value="" disabled selected>
                광역시/도
              </option>
              {LocationData.cities.map((main) => (
                <option value={main.name}>{main.name}</option>
              ))}
            </select>
            <select
              className="asmiddleselect"
              onChange={handleCity}
              ref={SmallCity}
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
                  onChange={searchlocationtext}
                  ref={SearchCom}
                ></input>
                <input
                  className="asmiddlesearchboxbutton"
                  type="button"
                  onClick={searchlocation}
                ></input>
              </div>
            </div>
          </div>
          <div className="asmiddlelistfull">
            {markers.placelist.map((marker) => (
              <div
                className="asmiddlelist"
                key={marker.store_name}
                onClick={() => asDetail(marker.store_name)}
              >
                <div className="asmiddlelisttop">
                  <div className="aslistname">{marker.store_name}</div>
                  <div className="aslistphone">{marker.store_phone}</div>
                </div>
                <div className="aslistaddr">{marker.store_addr}</div>
                <div className="aslistone">1:1 상담</div>
              </div>
            ))}
          </div>
        </div>
        {/* 지도 부분 */}
        <div className="asright">
          <ProductMap
            markers={markers}
            data={data}
            currLocation={currLocation}
          />
        </div>
      </underbar>
    </div>
  );
};
export default AsStore;
