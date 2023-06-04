// 포트원 API 결제

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PortonePay(props) {
  const navigate = useNavigate();

  function onClickPayment() {
    if (props.payForm.name === "" || props.payForm.phone === "" ||
      props.payForm.address === "" || props.payForm.detail_address === "") {
      alert("배송정보를 모두 입력하세요");
      return false;
    }

    const IMP = window.IMP;
    IMP.init('imp36704883'); // 가맹점 식별코드

    // // 결제정보 사전 검증
    // axios.post("https://api.iamport.kr/payments/prepare", {
    //   headers: { "Content-Type": "application/json" }, 
    //   data: {
    //     merchant_uid: props.pay_num, // 가맹점 주문번호
    //     amount: props.payInfo.price, // 결제 예정금액
    //   }
    // });

    // 결제창 호출
    IMP.request_pay({
      pg: 'kcp.INIpayTest',
      pay_method: props.pay.buy_method, // 결제수단
      merchant_uid: props.pay_num, // 주문번호
      name: props.payInfo.prod_name, // 주문명
      amount: props.totalPrice, // 결제금액
      buyer_name: props.payForm.name, // 구매자 이름
      buyer_tel: props.payForm.phone, // 구매자 전화번호
      buyer_email: props.payForm.email, // 구매자 이메일
      buyer_addr: props.payForm.address + props.payForm.detail_address // 구매자 주소
    }, function ({ success, error_msg }) { // 결제 결과 (callback)
        if (success) {
          const insertPaymentData = axios
            .post("/pay", {
                pay_num: props.pay_num,
                member_id: sessionStorage.getItem("id"),
                board_num: props.board_num,
                product_code: props.payInfo.product_code,
                prod_price: props.payInfo.price,
                delivery_price: props.payInfo.delivery_price,
                pay_price: props.totalPrice,
                buy_method: props.pay.buy_method,
                coupon_num: props.pay.coupon_num,
                mile_use: props.pay.mile,
                receipt_name: props.payForm.name,
                receipt_phone: props.payForm.phone,
                receipt_addr: props.payForm.address,
                receipt_detail: props.payForm.detail_address,
                receipt_req: props.payForm.receipt_req
            })
            .then(() => {
              alert("결제되었습니다.");
              navigate(`/payment/detail/${props.board_num}`);
            })
            .catch((e) => {
              insertPaymentData();
              // console.error(e);
            });
        } else {
          console.log(error_msg);
          alert("결제를 실패하였습니다.");
          navigate(`/post/detail/${props.board_num}`);
        }
    });
  }

  return (<button className="PP-pay_btn" onClick={onClickPayment}>결제하기</button>);
}

export default PortonePay;