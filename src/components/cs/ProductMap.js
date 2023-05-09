import { useEffect } from "react";

const { kakao } = window;

export const KakaoMap = ({ marker }) => {
  useEffect(() => {
    mapscript();
  });

  const mapscript = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
      level: 5,
    };
    //map
    const map = new kakao.maps.Map(container, options);

    // 마커를 생성합니다
    new kakao.maps.Marker({
      //마커가 표시 될 지도
      map: map,
      //마커가 표시 될 위치
      position: new kakao.maps.LatLng(marker.lat, marker.lng),
    });
  };

  return <div id="map" style={{ width: "510px", height: "400px" }}></div>;
};
