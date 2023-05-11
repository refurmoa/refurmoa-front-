import { useEffect } from "react";

const { kakao } = window;

export const ProductMap = ({ markers, data, currLocation }) => {
  useEffect(() => {
    mapscript();
  }, [data]);

  const mapscript = () => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(data[0], data[1]),
      level: 7,
    };
    //map
    const map = new kakao.maps.Map(container, options);
    const geocoder = new kakao.maps.services.Geocoder();
    // geocoder.coord2RegionCode(
    //   currLocation.longitude.getLng(),
    //   currLocation.latitude.getLat()
    // );

    markers.placelist.map((marker) => {
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
