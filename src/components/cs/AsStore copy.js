import "./AsStore.css";
import { ProductMap } from "./ProductMap";
import { Link } from "react-router-dom";
import markers from "./marker.json";
import { useEffect, useState } from "react";
import location_icon from "../../images/location_icon.png";

const AsStore = () => {
  // const [markers, setMarker] = useState();

  // const getMarkerData = () => {
  //   axios.get(`/api/getMarkerData`)
  //   .then((res) => {
  //     const { data } = res;
  //     setProdData(data);
  //   })
  //   .catch((e) => {
  //     console.error(e);
  //   })
  //   const data = markers.placelist;
  //   setMarker(data);
  // };

  const countries = [
    {
      section: "서울특별시",
      section_detail: "강동구",
      latitude: "37.530126",
      longitude: "127.1237708",
    },
    {
      section: "서울특별시",
      section_detail: "송파구",
      latitude: "37.5145636",
      longitude: "127.1059186",
    },
    {
      section: "서울특별시",
      section_detail: "강남구",
      latitude: "37.517305",
      longitude: "127.047502",
    },
    {
      section: "서울특별시",
      section_detail: "서초구",
      latitude: "37.483569",
      longitude: "127.032598",
    },
    {
      section: "서울특별시",
      section_detail: "관악구",
      latitude: "37.4781549",
      longitude: "126.9514847",
    },
  ];

  // const [section, setSection] = useState();
  const [country, setCountry] = useState();
  const [cities, setCity] = useState([]);
  const [data, setData] = useState([37.624915253753194, 127.15122688059974]);
  function handleCountry(e) {
    setCountry(e.target.value);
    // setCity(
    //   countries.find((sub) => sub.section_detail === e.target.value).states
    // );
    console.log(country);
  }

  return (
    <div>
      <topbar className="astop">
        <div className="astoptextL">고객센터</div>
        <div className="astoptextM">A/S 매장 찾기</div>
        <div className="astoptextR">
          <img alt="" src={location_icon} />
          서울특별시 서초구
        </div>
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
              {countries.map((main) => (
                <option value={main.section}>{main.section}</option>
              ))}
            </select>
            <select className="asmiddleselect">
              <option value="" disabled selected>
                시/군/구
              </option>
              {countries
                .filter((li) => li.section === { country } && li.section_detail)
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
          <ProductMap markers={markers} data={data} />
        </div>
      </underbar>
    </div>
  );
};
export default AsStore;
