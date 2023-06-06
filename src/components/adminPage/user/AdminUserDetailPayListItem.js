import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios';

// 이미지파일
import cancelicon from "../../../images/cancel.png";

const AdminUserDetailPayListItem = ({ data, index, getPayList }) => {
	const invoiceRef = useRef();
	const navigate = useNavigate();
	const apiKey = process.env.REACT_APP_SWEETTRACKER_API_KEY;
	const [invoiceInputState, setInvoiceInputState] = useState(false);
  console.log("dddddddddd", data);
	// 입찰취소
	const bidCancelHandler = (data) => {
    const requestData = { id: data.member_id, board_num: data.board_num }
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

	// 주문취소
	const orderCancelHandler = (data) => {
    const requestData = { id: data.member_id, board_num: data.board_num }
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

	// 결제취소
	const payCancelHandler = (data) => {
    if (window.confirm("결제 취소하시겠습니까?")) {
      axios.post("/pay/cancel",{ 
        payNum: data.pay_num,
        productCode: data.product_code,
      })
      .then((res) => {
        alert("결제 취소되었습니다.");
        getPayList();
      })
      .catch((e) => {
        console.error(e);
      })
    }
	}

	// 구매확정
	const purchaseConfirmHandler = (data) => {
    const requestData = { id: data.member_id, product_code: data.product_code }
    if (window.confirm("구매 확정 하시겠습니까?")) {
      console.log("구매확정");
      axios
      .post("/user/payment/confirm", requestData)
      .then((res) => {
        getPayList();
      })
      .catch((e) => {
        console.error(e);
      });
    }
  }

	// 송장번호 인풋박스 렌더링
	const invoiceBtnHandler = () => {
		setInvoiceInputState(!invoiceInputState)
	}

	// 엔터키
  const activeEnter = (e, data) => {
    if(e.key === "Enter") {
			if (invoiceRef.current.value !== "") {
				const requestData = {
					payNum: data.pay_num,
					deli_num: invoiceRef.current.value
				}
				axios.post("/admin/pay/delinum", requestData)
				.then(() => {
					getPayList();
				})
				.catch((e) => {
					console.error(e);
				})
				setInvoiceInputState(false);
			} else {
				alert("송장번호를 입력해주세요");
			}
    }
  }

	// 배송조회
	const trackingHandler = (data) => {
		// 팝업창 크기 및 위치 설정
		const width = 500;
		const height = 600;
		const top = window.innerHeight / 2 - height / 2 + window.screenY;
		const left = window.innerWidth / 2 - width / 2 + window.screenX;
		const popupStyle = `width=${width},height=${height},left=${left},top=${top}`;

		// 폼데이터
		const formData = {
			"t_key": `${apiKey}`,
			"t_code": "04",
			"t_invoice": `${data.deli_num}`,
		}

		// 폼 객체 만들어서 데이터 넣기
		const form = document.createElement("form");
		for (let key in formData) {
			const input = document.createElement("input");
			input.type = "hidden";
			input.name = key;
			input.value = formData[key];
			form.appendChild(input);
		}

		// 팝업창
		window.open("", "tracking", `${popupStyle}`);
		// 폼 데이터 팝업창으로 전송
		form.target = "tracking";
		form.method = "POST";
		form.action = "http://info.sweettracker.co.kr/tracking/4";

		document.body.appendChild(form);
		form.submit();
  }

  return (
		<PayListItemBox key={index}>
			<PayListItemInner>
				<ButtonBox>
					{/* 입금대기 */}
					{((data.pay_state === 0) & (data.sell_type === 1)) ? (
					<><Button possible onClick={() => {bidCancelHandler(data)}}>입찰 취소</Button>
					<Button>배송 조회</Button>
					<Button>송장 입력</Button>
					<Button>구매 확정</Button></>) : (<></>)}
					{((data.pay_state === 0) & (data.sell_type === 2)) ? (
					<><Button possible onClick={() => {orderCancelHandler(data)}}>주문 취소</Button>
					<Button>배송 조회</Button>
					<Button>송장 입력</Button>
					<Button>구매 확정</Button></>) : (<></>)}
					{/* 상품준비중 */}
					{data.pay_state === 1 && (
					<><Button possible onClick={() => {payCancelHandler(data)}}>결제 취소</Button>
					<Button>배송 조회</Button>
					<Button possible onClick={() => {invoiceBtnHandler()}}>송장 입력</Button>
					<Button>구매 확정</Button></>)}
					{/* 배송중 */}
					{data.pay_state === 2 && (
					<><Button>결제 취소</Button>
					<Button possible onClick={() => {trackingHandler(data)}}>배송 조회</Button>
					<Button>송장 입력</Button>
					<Button>구매 확정</Button></>)}
					{/* 배송완료 */}
					{data.pay_state === 3 && (
					<><Button>결제 취소</Button>
					<Button possible onClick={() => {trackingHandler(data)}}>배송 조회</Button>
					<Button>송장 입력</Button>
					<Button possible onClick={() => {purchaseConfirmHandler(data)}}>구매 확정</Button></>)}
					{/* 구매확정 */}
					{data.pay_state === 4 && (
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
							{data.pay_state === 0 && (<SellStatus textcolor="red">입금대기</SellStatus>)}
							{data.pay_state === 1 && (<SellStatus textcolor="red">상품준비중</SellStatus>)}
							{data.pay_state === 2 && (<SellStatus textcolor="green">배송중</SellStatus>)}
							{data.pay_state === 3 && (<SellStatus textcolor="green">배송완료</SellStatus>)}
							{data.pay_state === 4 && (<SellStatus textcolor="black">구매확정</SellStatus>)}
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
			{data.pay_state === 1 && (
			<InvoiceInputBox state={invoiceInputState}>
				<input type="text" ref={invoiceRef} onKeyDown={(e) => {activeEnter(e, data)}}/>
				<InvoiceCancelBtn onClick={() => {setInvoiceInputState(false)}}><img src={cancelicon} alt="cancel" /></InvoiceCancelBtn>
			</InvoiceInputBox>
			)}
		</PayListItemBox>
  )
}

export default AdminUserDetailPayListItem

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
  color: ${(props) => props.textcolor && props.textcolor};
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
	:hover {
		cursor: pointer;
	}
`;
