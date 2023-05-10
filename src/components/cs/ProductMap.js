import { useEffect } from "react";
import marker from "./marker.json";

const { kakao } = window;

export const ProductMap = ({}) => {
  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
      level: 5,
    };
    //map
    const map = new kakao.maps.Map(container, options);

    marker.placelist.map((marker) => {
      // 마커를 생성합니다
      new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(marker.lat, marker.lng),
        //마커에 hover시 나타날 title
        title: marker.title,
      });
    });
  };

  return <div id="map" style={{ width: "520px", height: "410px" }}></div>;
};
