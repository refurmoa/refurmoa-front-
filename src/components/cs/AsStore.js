import "./AsStore.css";
import { KakaoMap } from "./ProductMap";
import marker from "./marker.json";

const MyPage_detail = () => {
  return (
    <div>
      <topbar className="astop">
        <div className="astoptextL">고객센터</div>
        <div className="astoptextM">A/S 매장 찾기</div>
        <div className="astoptextR">서울특별시 서초구</div>
      </topbar>
      <underbar className="asunder">
        <div>공지사항</div>
        <div>FAQ</div>
        <div>1:1 문의하기</div>
        <div>A/S 매장 찾기</div>
      </underbar>
      {marker.placelist.map((marker) => {
        return <KakaoMap marker={marker} />;
      })}
    </div>
  );
};
export default MyPage_detail;
