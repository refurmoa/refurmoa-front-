import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";

const Find_address = (props) => {
  const address = props.address;
  const setAddress = props.setAddress;
  const setMdoal = props.setMdoal;
  const onCompletePost = (data) => {
    console.log(data.address);
    setMdoal(false);
    setAddress(data.address);
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

export default Find_address;
