import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";

const Header = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 35px;
  margin-left: 5px;
`;

const Find_address = (props) => {
  const setAddress = props.setAddress;
  const setModoal = props.setMdoal;

  const onCompletePost = (data) => {
    setAddress(data.address);
    setModoal(false);
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
      <Header>주소 찾기</Header>
      <DaumPostcode
        style={postCodeStyle}
        autoClose
        onComplete={onCompletePost}
      />
    </>
  );
};

export default Find_address;
