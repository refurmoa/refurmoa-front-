import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";

const FindStoreAddress = (props) => {
  const store_addr = props.store_addr;
  const setStore_addr = props.setStore_addr;
  const setLattitude = props.setLattitude;
  const setLongitude = props.setLongitude;
  const setMdoal = props.setMdoal;

  const onCompletePost = (data) => {
    console.log(data);
    setStore_addr(data.address);
    convertAddressToCoords(data.address);
    setMdoal(false);
  };
  const convertAddressToCoords = (address) => {
    // 다음 주소 API의 좌표 변환 API를 사용하여 주소를 좌표로 변환합니다.
    // API 호출 및 좌표 정보를 받아오는 로직을 구현해야 합니다.
    // 이 코드는 예시로 작성되었으며, 실제 API 호출 및 응답 처리를 위한 코드를 작성해야 합니다.
    const apiUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
      address
    )}`;

    // fetch 또는 axios 등을 사용하여 API를 호출합니다.
    fetch(apiUrl, {
      headers: {
        Authorization: `KakaoAK 91e05f07bc37801301fc0cb1340d8de5`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.documents.length > 0) {
          const coords = data.documents[0].address;
          console.log(coords);
          setLattitude(coords.y);
          setLongitude(coords.x);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const postCodeStyle = {
    display: "block",
    position: "fixed",
    width: "440px",
    padding: "0px",
    zIndex: 100,
  };

  return (
    <>
      <DaumPostcode
        style={postCodeStyle}
        autoClose
        onComplete={onCompletePost}
      />
    </>
  );
};

export default FindStoreAddress;
