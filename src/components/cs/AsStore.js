import "./AsStore.css";
import { ProductMap } from "./ProductMap";
import { Link } from "react-router-dom";
import marker from "./marker.json";

const AsStore = () => {
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
            <select className="asmiddleselect">
              <option value="전체">전체</option>
              <option value="서울">서울</option>
              <option value="경기">경기</option>
            </select>
            <select className="asmiddleselect">
              <option value="3">전체</option>
              <option value="6">6개월</option>
              <option value="12">12개월</option>
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
