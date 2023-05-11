import "./AsStore.css";
import { ProductMap } from "./ProductMap";
import { Link } from "react-router-dom";
import markers from "./marker.json";
import { useEffect, useState } from "react";
import location_icon from "../../../images/location_icon.png";
import LocationData from "./CountryCity.json";

const AsStore = () => {
  // const [markers, setMarker] = useState();

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
      console.log(position);
      const { latitude, longitude } = position.coords;
      setCurrLocation({ latitude, longitude });
    });
  };

  return (
    <div>
      <topbar className="astop">
        <div className="astoptextL">고객센터</div>
        <div className="astoptextM">A/S 매장 찾기</div>
        <div className="astoptextR">
          <img alt="" src={location_icon} />
          서울특별시 서초구
        </div>
        <p>latitude : {currLocation.latitude}</p>
      </topbar>
      <div className="astopbar"></div>
      <underbar className="asunder">
        {/* 왼쪽 메뉴바 */}
        <div className="asleft">
          <Link to="/notice">
            <div className="asunderrest">공지사항</div>
          </Link>
          <Link to="/faq">
            <div className="asunderrest">FAQ</div>
          </Link>
          <Link to="/inquiry">
            <div className="asunderrest">1:1 문의하기</div>
          </Link>
          <div className="asundertopic">A/S 매장 찾기</div>
        </div>
        {/* 가운데 정보 */}
        <div className="asmiddle">
          <div className="asmiddlelocation">지역 검색</div>
          <div>
            <select className="asmiddleselect" onChange={handleCountry}>
              <option value="" disabled selected>
                광역시/도
              </option>
              {LocationData.cities.map((main) => (
                <option value={main.name}>{main.name}</option>
              ))}
            </select>
            <select className="asmiddleselect" onChange={handleCity}>
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
                ></input>
                <input
                  className="asmiddlesearchboxbutton"
                  type="button"
                ></input>
              </div>
            </div>
          </div>
          <div className="asmiddlelistfull">
            {markers.placelist.map((marker) => (
              <div className="asmiddlelist">
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
