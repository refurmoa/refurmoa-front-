import { useEffect } from "react";

const { kakao } = window;

export const ProductMap = ({ markers, data, currLocation, asComNum }) => {
  useEffect(() => {
    mapscript();
  }, [asComNum]);
  // console.log(markers);
  // console.log(data);

  const mapscript = () => {
    const mapContainer = document.getElementById("map");
    const mapOptions = {
      center: new kakao.maps.LatLng(data[0], data[1]),
      level: 7,
    };
    //지도 생성
    const map = new kakao.maps.Map(mapContainer, mapOptions);

    markers.placelist.map((markers) => {
      const position = new kakao.maps.LatLng(
        markers.latitude,
        markers.longitude
      );

      const marker1 = new kakao.maps.Marker({
        position: position,
        clickable: true,
      });

      marker1.setMap(map);

      let iwContent = document.createElement("div");

      let companyName = document.createElement("div");
      companyName.textContent = `회사명 : ${markers.store_name}`;

      let time = document.createElement("div");
      time.textContent = `회사주소 : ${markers.store_addr}`;

      let monthlyWage = document.createElement("div");
      monthlyWage.textContent = `전화번호 : ${markers.store_phone}`;

      iwContent.append(companyName, time, monthlyWage);

      const InfoWindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: true,
      });

      kakao.maps.event.addListener(marker1, "click", function click() {
        InfoWindow.open(map, marker1);
      });
    });
  };

  return <div id="map" style={{ width: "520px", height: "410px" }}></div>;
};
