import "./AsStore.css";
import { ProductMap } from "./ProductMap";
import { Link } from "react-router-dom";
import marker from "./marker.json";
import { useState } from "react";

const AsStore = () => {
  const countries = [
    {
      name: "서울특별시",
      states: [
        { name: "강남구" },
        { name: "강동구" },
        { name: "강북구" },
        { name: "강서구" },
        { name: "관악구" },
        { name: "광진구" },
        { name: "구로구" },
        { name: "금천구" },
        { name: "노원구" },
        { name: "도봉구" },
        { name: "동대문구" },
        { name: "동작구" },
        { name: "마포구" },
        { name: "서대문구" },
        { name: "서초구" },
        { name: "성동구" },
        { name: "성북구" },
        { name: "송파구" },
        { name: "양천구" },
        { name: "영등포구" },
        { name: "용산구" },
        { name: "은평구" },
        { name: "종로구" },
        { name: "중구" },
        { name: "중랑구" },
      ],
    },
    {
      name: "인천광역시",
      states: [
        { name: "강화군" },
        { name: "계양구" },
        { name: "남동구" },
        { name: "동구" },
        { name: "미추홀구" },
        { name: "부평구" },
        { name: "서구" },
        { name: "연구수" },
        { name: "옹진군" },
        { name: "중구" },
      ],
    },
    {
      name: "대전광역시",
      states: [
        { name: "대덕구" },
        { name: "동구" },
        { name: "서구" },
        { name: "유성구" },
        { name: "중구" },
      ],
    },
    {
      name: "광주광역시",
      states: [
        { name: "광산구" },
        { name: "남구" },
        { name: "동구" },
        { name: "북구" },
        { name: "서구" },
      ],
    },
    {
      name: "대구광역시",
      states: [
        { name: "남구" },
        { name: "달서구" },
        { name: "달성군" },
        { name: "동구" },
        { name: "북구" },
        { name: "서구" },
        { name: "수성구" },
        { name: "중구" },
      ],
    },
    {
      name: "부산광역시",
      states: [
        { name: "강서구" },
        { name: "금정구" },
        { name: "기장군" },
        { name: "남구" },
        { name: "동구" },
        { name: "동래구" },
        { name: "부산진구" },
        { name: "북구" },
        { name: "사상구" },
        { name: "사하구" },
        { name: "서구" },
        { name: "수영구" },
        { name: "연제구" },
        { name: "영도구" },
        { name: "중구" },
        { name: "해운대구" },
      ],
    },
    {
      name: "울산광역시",
      states: [
        { name: "남구" },
        { name: "동구" },
        { name: "북구" },
        { name: "울주군" },
        { name: "중구" },
      ],
    },
    {
      name: "세종특별자치시",
      states: [{ name: "세종특별자치시" }],
    },
    {
      name: "제주특별자치도",
      states: [{ name: "서귀포시" }, { name: "제주시" }],
    },
    {
      name: "강원도",
      states: [
        { name: "강릉시" },
        { name: "고성군" },
        { name: "동해시" },
        { name: "삼척시" },
        { name: "속초시" },
        { name: "양구군" },
        { name: "양양군" },
        { name: "영월군" },
        { name: "원주시" },
        { name: "인제군" },
        { name: "정선군" },
        { name: "철원군" },
        { name: "춘천시" },
        { name: "태백시" },
        { name: "평창군" },
        { name: "홍천군" },
        { name: "화천군" },
        { name: "횡성군" },
      ],
    },
    {
      name: "경기도",
      states: [
        { name: "가평군" },
        { name: "고양시 덕양구" },
        { name: "고양시 일산동구" },
        { name: "고양시 일산서구" },
        { name: "과천시" },
        { name: "광명시" },
        { name: "광주시" },
        { name: "구리시" },
        { name: "군포시" },
        { name: "김포시" },
        { name: "남양주시" },
        { name: "동두천시" },
        { name: "부천시" },
        { name: "성남시" },
        { name: "성남시 분당구" },
        { name: "성남시 수정구" },
        { name: "성남시 중원구" },
        { name: "수원시" },
        { name: "수원시 권선구" },
        { name: "수원시 영통구" },
        { name: "수원시 장안구" },
        { name: "수원시 팔달구" },
        { name: "시흥시" },
        { name: "안산시" },
        { name: "안산시 단원구" },
        { name: "안산시 상록구" },
        { name: "안성시" },
        { name: "안양시" },
        { name: "안양시 동안구" },
        { name: "안양시 만안구" },
        { name: "양주시" },
        { name: "양평군" },
        { name: "여주시" },
        { name: "연천군" },
        { name: "오산시" },
        { name: "용인시" },
        { name: "용인시 기흥구" },
        { name: "용신시 수지수" },
        { name: "용인시 처인구" },
        { name: "의왕시" },
        { name: "의정부시" },
        { name: "이천시" },
        { name: "파주시" },
        { name: "평택시" },
        { name: "포천시" },
        { name: "하남시" },
        { name: "화성시" },
      ],
    },
    {
      name: "경상남도",
      states: [
        { name: "거제시" },
        { name: "거창군" },
        { name: "고성군" },
        { name: "김해시" },
        { name: "남해군" },
        { name: "밀양시" },
        { name: "사천시" },
        { name: "산청군" },
        { name: "양산시" },
        { name: "의령군" },
        { name: "진주시" },
        { name: "창녕군" },
        { name: "창원시" },
        { name: "창원시 마산합포구" },
        { name: "창원시 마산회원구" },
        { name: "창원시 성산구" },
        { name: "창원기 의창구" },
        { name: "창원시 진해구" },
        { name: "통영시" },
        { name: "하동군" },
        { name: "함안군" },
        { name: "함양군" },
        { name: "합천군" },
      ],
    },
    {
      name: "경상북도",
      states: [
        { name: "경산시" },
        { name: "경주시" },
        { name: "고령군" },
        { name: "구미시" },
        { name: "군위군" },
        { name: "김천시" },
        { name: "문경시" },
        { name: "봉화군" },
        { name: "상주시" },
        { name: "성주군" },
        { name: "안동시" },
        { name: "영덕군" },
        { name: "영양군" },
        { name: "영주시" },
        { name: "영천시" },
        { name: "예천군" },
        { name: "울릉군" },
        { name: "울진군" },
        { name: "의성군" },
        { name: "청도군" },
        { name: "청송군" },
        { name: "칠곡군" },
        { name: "포항시" },
        { name: "포항시 남구" },
        { name: "포항시 북구" },
      ],
    },
    {
      name: "전라남도",
      states: [
        { name: "강진군" },
        { name: "고흥군" },
        { name: "곡성군" },
        { name: "광양시" },
        { name: "구례군" },
        { name: "나주시" },
        { name: "담양군" },
        { name: "목포시" },
        { name: "무안군" },
        { name: "보성군" },
        { name: "순천시" },
        { name: "신안군" },
        { name: "여수시" },
        { name: "영광군" },
        { name: "영암군" },
        { name: "완도군" },
        { name: "장성군" },
        { name: "장흥군" },
        { name: "진도군" },
        { name: "함평군" },
        { name: "해남군" },
        { name: "화순군" },
      ],
    },
    {
      name: "전라북도",
      states: [
        { name: "고창군" },
        { name: "군산시" },
        { name: "김제시" },
        { name: "남원시" },
        { name: "무주군" },
        { name: "부안군" },
        { name: "순창군" },
        { name: "완주군" },
        { name: "익산시" },
        { name: "임실군" },
        { name: "장수군" },
        { name: "전주시 덕진구" },
        { name: "전주시 완산구" },
        { name: "정읍시" },
        { name: "진안군" },
      ],
    },
    {
      name: "충청남도",
      states: [
        { name: "계룡시" },
        { name: "공주시" },
        { name: "금산군" },
        { name: "논산시" },
        { name: "당진시" },
        { name: "보령시" },
        { name: "부여군" },
        { name: "서산시" },
        { name: "서천군" },
        { name: "아산시" },
        { name: "연기군" },
        { name: "예산군" },
        { name: "천안시" },
        { name: "천안시 동남구" },
        { name: "천안시 서북구" },
        { name: "청양군" },
        { name: "태안군" },
        { name: "홍성군" },
      ],
    },
    {
      name: "충청북도",
      states: [
        { name: "괴산군" },
        { name: "단양군" },
        { name: "보은군" },
        { name: "영동군" },
        { name: "옥천군" },
        { name: "음성군" },
        { name: "제천시" },
        { name: "증평군" },
        { name: "진천군" },
        { name: "청원군" },
        { name: "청주시 상당구" },
        { name: "청주시 서원구" },
        { name: "청주시 청운구" },
        { name: "청주시 흥덕구" },
        { name: "충주시" },
      ],
    },
  ];

  const [country, setCountry] = useState();
  const [cities, setCity] = useState([]);
  function handleCountry(e) {
    setCountry(e.target.value);
    setCity(countries.find((sub) => sub.name === e.target.value).states);
  }
  return (
    <div>
      <topbar className="astop">
        <div className="astoptextL">고객센터</div>
        <div className="astoptextM">A/S 매장 찾기</div>
        <div className="astoptextR">서울특별시 서초구</div>
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
                <option value={main.name}>{main.name}</option>
              ))}
            </select>
            <select className="asmiddleselect">
              <option value="" disabled selected>
                시/군/구
              </option>
              {cities.map((sub) => (
                <option value={sub.name}>{sub.name}</option>
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
            {marker.placelist.map((marker) => (
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
          <ProductMap />
        </div>
      </underbar>
    </div>
  );
};
export default AsStore;
