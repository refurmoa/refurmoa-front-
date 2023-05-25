import React from 'react';

function PortonePay(props) {
  function onClickPayment() {
    const IMP = window.IMP;
    IMP.init('imp36704883'); // 가맹점 식별코드

    // 결제창 호출
    IMP.request_pay({
      pg: 'kcp.INIpayTest',
      pay_method: 'card',                           // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
      name: '아임포트 결제 데이터 분석',                  // 주문명
      amount: 0,                                 // 결제금액
      buyer_name: '홍길동',                           // 구매자 이름
      buyer_tel: '01012341234',                     // 구매자 전화번호
      buyer_email: 'example@example',               // 구매자 이메일
      buyer_addr: '신사동 661-16',                    // 구매자 주소
      buyer_postcode: '06018',                      // 구매자 우편번호
    }, function (rsp) { // 결제 결과 (callback)
        if (rsp.success) {
            alert("결제 성공");
        } else {
            alert("결제 실패");
        }
    });
  }

  return (<button onClick={onClickPayment}>결제하기</button>);
}

export default PortonePay;