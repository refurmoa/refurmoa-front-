import "./AdminUserDetailPayList.css";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";

// 이미지파일
import cancelicon from "../../../images/cancel.png";

// 더미데이터
import dummydata from "./AdminUserDetailPayList.json"
import { useNavigate } from "react-router-dom";

export const AdminUserDetailPayList = ({ setPageNum }) => {
  const navigate = useNavigate();
  const [payListData, setPayListData] = useState();
  const [invoiceInputState, setInvoiceInputState] = useState(false);
  
  const changePage = () => {
    setPageNum(0);
  };

  const SearchBidList = useRef();
  // const [userlist, setUserlist] = useState();
  const AUDsearch = () => {
    if (
      SearchBidList.current.value === "" ||
      SearchBidList.current.value === undefined
    ) {
      alert("내용을 입력하세요!!");
      SearchBidList.current.focus();
      return false;
    }

    // axios
    //   .post(`/api/searchlocation`, {
    //     searchData,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     setUserlist();
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
  };

  const bidCancelHandler = (data) => {
    const requestData = { member_id: data.member_id, board_num: data.board_num }
    if (window.confirm("입찰 취소하시겠습니까?")) {
      console.log("입찰취소");
      // axios.post("/api/admin/bidcancel", requestData)
      // .then((res) => {
      //   alert("입찰 취소되었습니다.");
      //   getPayList();
      // })
      // .catch((e) => {
      //   console.error(e);
      // })
    }
  }

  const orderCancelHandler = (data) => {
    const requestData = { member_id: data.member_id, board_num: data.board_num }
    if (window.confirm("주문 취소하시겠습니까?")) {
      console.log("주문취소");
      // axios.post("/api/admin/ordercancel", requestData)
      // .then((res) => {
      //   alert("주문 취소되었습니다.");
      //   getPayList();
      // })
      // .catch((e) => {
      //   console.error(e);
      // })
    }
  }

  const payCancelHandler = (data) => {
    const requestData = { member_id: data.member_id, board_num: data.board_num }
    if (window.confirm("결제 취소하시겠습니까?")) {
      console.log("결제취소");
      // axios.post("/api/admin/paycancel", requestData)
      // .then((res) => {
      //   alert("주문 취소되었습니다.");
      //   getPayList();
      // })
      // .catch((e) => {
      //   console.error(e);
      // })
    }
  }

  const setinputHandler = () => {
    setInvoiceInputState(!invoiceInputState);
  }

  const inputinvoiceHandler = (data) => {
    const requestData = { member_id: data.member_id, board_num: data.board_num, invoice: "송장번호" }
    axios.post("/api/admin/inputinvoice", requestData)
    .then((res) => {
      getPayList();
    })
    .catch((e) => {
      console.error(e);
    })
  }

  const trackingHandler = (data) => {

  }

  const purchaseConfirmHandler = (data) => {
    const requestData = { member_id: data.member_id, board_num: data.board_num }
    if (window.confirm("구매 확정 하시겠습니까?")) {
      console.log("구매확정");
      // axios.post("/api/admin/purchaseconfirm", requestData)
      // .then((res) => {
      //   alert("구매 확정되었습니다.");
      //   getPayList();
      // })
      // .catch((e) => {
      //   console.error(e);
      // })
    }
  }

  const getPayList = () => {
    const requestData = { member_id: "userid" }
    // axios.post("/api/admin/paylist", requestData)
    // .then((res) => {
    //   const { data } = res;
    //   setPayListData(data);
    // })
    // .catch((e) => {
    //   console.error(e);
    // })

    // 백엔드구현후 지우기
    setPayListData(dummydata);
  }

  useEffect(() => {
    getPayList();
  }, [])

  return (
    <div>
      <top className="AUDPayList">
        <div className="AUDPayListL">결제 내역</div>
        <div className="AUDPayListM" onClick={() => {changePage()}}>
          입찰 내역
        </div>
        <div className="AUDinput">
          <input className="AUDsearchbox" type="text"></input>
          <input
            className="AUDsearchboxbutton"
            type="button"
            onClick={AUDsearch}
            ref={SearchBidList}
          ></input>
        </div>
      </top>
      {payListData?.length === 0 ? (
        <NoPayList>
          결제내역이 없습니다.
        </NoPayList>
      ) : (
        <PayList>
          {payListData?.map((data, index) => (
            <PayListItemBox key={index}>
                <PayListItemInner>
                <ButtonBox>
                  {/* 입금대기 */}
                  {((data.sell_status === 0) & (data.sell_type === 1)) ? (
                  <><Button possible onClick={() => {bidCancelHandler(data)}}>입찰 취소</Button>
                  <Button>배송 조회</Button>
                  <Button>송장 입력</Button>
                  <Button>구매 확정</Button></>) : (<></>)}
                  {((data.sell_status === 0) & (data.sell_type === 2)) ? (
                  <><Button possible onClick={() => {orderCancelHandler(data)}}>주문 취소</Button>
                  <Button>배송 조회</Button>
                  <Button>송장 입력</Button>
                  <Button>구매 확정</Button></>) : (<></>)}
                  {/* 상품준비중 */}
                  {data.sell_status === 1 && (
                  <><Button possible onClick={() => {payCancelHandler(data)}}>결제 취소</Button>
                  <Button>배송 조회</Button>
                  <Button possible onClick={() => {setinputHandler(data)}}>송장 입력</Button>
                  <Button>구매 확정</Button></>)}
                  {/* 배송중 */}
                  {data.sell_status === 2 && (
                  <><Button>결제 취소</Button>
                  <Button possible onClick={() => {trackingHandler(data)}}>배송 조회</Button>
                  <Button>송장 입력</Button>
                  <Button>구매 확정</Button></>)}
                  {/* 배송완료 */}
                  {data.sell_status === 3 && (
                  <><Button>결제 취소</Button>
                  <Button possible onClick={() => {trackingHandler(data)}}>배송 조회</Button>
                  <Button>송장 입력</Button>
                  <Button possible onClick={() => {purchaseConfirmHandler(data)}}>구매 확정</Button></>)}
                  {/* 구매확정 */}
                  {data.sell_status === 4 && (
                  <><Button>결제 취소</Button>
                  <Button>배송 조회</Button>
                  <Button>송장 입력</Button>
                  <Button>구매 확정</Button></>)}
                </ButtonBox>
                <ItemInfoBox onClick={() => {navigate(`/post/detail/${data.board_num}`)}}>
                  <InfoImgBox><img src={`/images/prod/${data.main_image}`} alt="mainimage" /></InfoImgBox>
                  <InfoBox>
                    <PaynumAndSellstatusAndPriceBox>
                      <PaynumAndsellstatusBox>
                        <Paynum>{data.pay_num}</Paynum>
                          {data.sell_status === 0 && (<SellStatus red>입금대기</SellStatus>)}
                          {data.sell_status === 1 && (<SellStatus red>상품준비중</SellStatus>)}
                          {data.sell_status === 2 && (<SellStatus green>배송중</SellStatus>)}
                          {data.sell_status === 3 && (<SellStatus green>배송완료</SellStatus>)}
                          {data.sell_status === 4 && (<SellStatus black>구매확정</SellStatus>)}
                      </PaynumAndsellstatusBox>
                      <SelltypeAndPriceBox>
                        <Selltype>{data.sell_type === 1 ? "경매" : "즉시구매"}</Selltype>
                        <Price>{data.prod_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Price>
                      </SelltypeAndPriceBox>
                    </PaynumAndSellstatusAndPriceBox>
                    <Prodcom>{data.prod_com}</Prodcom>
                    <ProdName>{data.prod_name}</ProdName>
                  </InfoBox>
                </ItemInfoBox>
              </PayListItemInner>
              {data.sell_status === 1 && (
                <InvoiceInputBox state={invoiceInputState}>
                  <input type="text" />
                  <InvoiceCancelBtn><img src={cancelicon} alt="cancel" /></InvoiceCancelBtn>
                </InvoiceInputBox>
              )}
            </PayListItemBox>
          ))}
        </PayList>
      )}
        
    </div>
  );
};

const NoPayList = styled.div`
  width: 100%;
  height: 123px;

  text-align: center;
  line-height: 117px;
  font-size: 18px;
  color: #777777;

  box-sizing: border-box;
  border-bottom: 2px solid rgba(185, 168, 154, 0.3);
`;

const PayList = styled.div`
  height: 925px;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background: #D9D9D9;
  }
`;

const PayListItemBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-bottom: 2px solid rgba(185, 168, 154, 0.3);
`;
const PayListItemInner = styled.div`
  margin: 20px auto;
  width: 840px;
  height: 83px;
  display: flex;
`;
const ButtonBox = styled.div`
  margin: 0px 15px 0px 0px;
  width: 217px;
  height: 85px;
`;
const Button = styled.div`
  margin: 0px;
  width: 101px;
  height: 35px;
  display: inline-block;
  background-color: ${(props) => props.possible ? "#B9A89A" : "#DDDDDD"};

  text-align: center;
  font-weight: 400;
  font-size: 18px;
  line-height: 35px;
  color: #FFFFFF;
  :first-child {
    margin: 0px 15px 15px 0px;
  }
  :last-child {
    margin: 0px 0px 0px 15px;
  }
  :hover {
    cursor: ${(props) => props.possible ? "pointer" : "default"};
  }
`;
const ItemInfoBox = styled.div`
  margin: 0px;
  display: flex;
  :hover {
    cursor: pointer;
  }
`;
const InfoImgBox = styled.div`
  margin: 0px 15px 0px 0px;
  width: 85px;
  height: 85px;
  img {
    width: 100%;
    height: 100%;
  }
`;
const InfoBox = styled.div`
  width: 508px;
  height: 85px;
`;
const PaynumAndSellstatusAndPriceBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PaynumAndsellstatusBox = styled.div`
  margin: 0px;
  display: flex;
`;
const Paynum = styled.div`
  margin-right: 5px;
  height: 25px;
  font-weight: 600;
  font-size: 17px;
  line-height: 25px;
  color: #000000;
`;
const SellStatus = styled.div`
  height: 25px;
  font-weight: 600;
  font-size: 15px;
  line-height: 25px;
  color: ${(props) => props.red && "#FF0000"};
  color: ${(props) => props.green && "#7D9E8C"};
  color: ${(props) => props.black && "#000000"};
`;
const SelltypeAndPriceBox = styled.div`
  margin: 0px;
  display: flex;
`;
const Selltype = styled.div`
  margin-right: 10px;
  height: 30px;
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  color: #000000;
`;
const Price = styled.div`
  height: 30px;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #000000;
`;
const Prodcom = styled.div`
  margin-top: 5px;
  height: 20px;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: #777777;
`;
const ProdName = styled.div`
  margin: 0px;
  width: 500px;
  height: 30px;

  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  color: #000000;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const InvoiceInputBox = styled.div`
  margin: -15px 0px 0px 10px;
  float: left;
  width: 250px;
  height: 30px;

  display: ${(props) => props.state ? "flex" : "none"};

  box-sizing: border-box;
  border: 1px solid #B9A89A;
  background-color: #FFFFFF;
  input {
    margin: 0px 0px 0px 7px;
    width: 210px;
    border: none;
  }
  input:focus {
    outline: none;
  }
`;
const InvoiceCancelBtn = styled.div`
  width: 10px;
  height: 10px;
  img {
    margin-top: 3px;
    width: 100%;
    height: 100%;
  }
`;
