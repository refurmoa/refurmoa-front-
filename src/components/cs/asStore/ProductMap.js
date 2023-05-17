import { useEffect } from "react";

const { kakao } = window;

export const ProductMap = ({ markers, data, currLocation }) => {
  useEffect(() => {
    mapscript();
  }, [data]);

  const mapscript = () => {
    const mapContainer = document.getElementById("map");
    const mapOptions = {
      center: new kakao.maps.LatLng(data[0], data[1]),
      level: 7,
    };
    //지도 생성
    const map = new kakao.maps.Map(mapContainer, mapOptions);

    markers.placelist.map((marker) => {
      const position = new kakao.maps.LatLng(marker.latitude, marker.longitude);

      const marker1 = new kakao.maps.Marker({
        position: position,
        clickable: true,
      });

      marker1.setMap(map);

      const InfoWindow = new kakao.maps.InfoWindow({
        content: marker.store_addr,
        removable: true,
      });

      kakao.maps.event.addListener(marker1, "click", function () {
        InfoWindow.open(map, marker1);
      });
    });
  };

  return <div id="map" style={{ width: "520px", height: "410px" }}></div>;
};
