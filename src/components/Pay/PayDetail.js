import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import detaildata from "./paydetail.json";

// 이미지파일
import deliveryIcon from "../../images/delivery_icon.png";
import trackingStateIcon1 from "../../images/delivery_icon1.png";
import trackingStateIcon2 from "../../images/delivery_icon2.png";
import trackingStateIcon3 from "../../images/delivery_icon3.png";
import trackingStateIcon4 from "../../images/delivery_icon4.png";
import trackingStateIcon5 from "../../images/delivery_icon5.png";

const PayDetail = () => {
  const board_num = useParams().board_num;
  const apiKey = process.env.REACT_APP_SWEETTRACKER_API_KEY;
  const [payDetailData, setPayDetailData] = useState();
  const [trackingData, setTrackingData] = useState();
  console.log(board_num);

  // 현재 위치 조회
  const trackingHandler = () => {
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
      "t_invoice": `${payDetailData.deli_num}`,
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

  // 상품 결제상세 데이터 가져오기
  const getPayDetail = () => {
    
    // FIXME: 백엔드 구현 후 지우기
    let paydata = detaildata;

    // let paydata = null;
    // 결제상세 정보 받아오기
    // axios.post("/api/paydetail", board_num)
    // .then((res) => {
    //   paydata = res.data;
    //   setPayDetailData(paydata);
    // })
    // .catch((e) => {
    //   console.error(e);
    // })
    // 결제상세 정보에 송장번호(deli_num)이 있으면 배송상태 정보 받아와서 trackingData에 저장
    // if(paydata.deli_num !== null) {
    //   axios.get(`https://info.sweettracker.co.kr/api/v1/trackingInfo?t_code=04&t_invoice=${paydata.deli_num}&t_key=${apiKey}`)
    // .then((res) => {
    //   const { data } = res;
    //   console.log(data);
    //   setTrackingData(data);
    // })
    // .catch((e) => {
    //   console.error(e);
    // })
    // }
  setPayDetailData(detaildata);
  }

  useEffect(() => {
    getPayDetail();
  }, [])

  return (
  <>
    <MainTitleWrapper>
      <MainTitle>주문 상세 정보</MainTitle>
      <ProductCode>{payDetailData?.pay_num}</ProductCode>
    </MainTitleWrapper>
    <ProductInfoWrapper>
      <ProductInfoBox>
        <ProductInfoImageAndNameBox>
          <ProductInfoImage>
            {payDetailData && <img src={`/images/prod/${payDetailData.main_image}`} alt="productimage" />}
          </ProductInfoImage>
          <ProductInfoName>
            <ProductCom>{payDetailData?.prod_com}</ProductCom>  
            <ProductName>[{payDetailData?.prod_grade}급]{payDetailData?.prod_name}</ProductName>
          </ProductInfoName>
        </ProductInfoImageAndNameBox>
        <ProductInfoPriceBox>
          <ProductInfoDelivery><img src={deliveryIcon} alt="deliveryicon" />{payDetailData?.delivery_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</ProductInfoDelivery>
          <ProductInfoPrce>{payDetailData?.prod_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</ProductInfoPrce>
        </ProductInfoPriceBox>
      </ProductInfoBox>
    </ProductInfoWrapper>
    <DeliveryAndPayInfoWrapper>
      <DeliveryAndPayInfoBox>
        <DeliveryInfoBox>
          <DeliveryTitle>배송지 정보</DeliveryTitle>
          <DeliveryInfoDetailBox>
            <DeliverySubTitle>수령인</DeliverySubTitle>
            <DeliveryUserInfo>{payDetailData?.recipt_name}</DeliveryUserInfo>
          </DeliveryInfoDetailBox>
          <DeliveryInfoDetailBox>
            <DeliverySubTitle>연락처</DeliverySubTitle>
            <DeliveryUserInfo>{payDetailData?.recipt_phone}</DeliveryUserInfo>
          </DeliveryInfoDetailBox>
          <DeliveryInfoDetailBox>
            <DeliverySubTitleAddr>주소</DeliverySubTitleAddr>
            <UserAddrBox>
              <DeliveryUserInfo>{payDetailData?.recipt_addr}</DeliveryUserInfo>
              <DeliveryUserInfo>{payDetailData?.recipt_detail}</DeliveryUserInfo>
            </UserAddrBox>
          </DeliveryInfoDetailBox>
          <DeliveryInfoDetailBox>
            <DeliverySubTitleReq>배송 요청사항</DeliverySubTitleReq>
            <DeliveryUserInfo>{payDetailData?.recipt_req}</DeliveryUserInfo>
          </DeliveryInfoDetailBox>
        </DeliveryInfoBox>
        <PayInfoBox>
          <PayTitle>결제 정보</PayTitle>
          <PayInfoDetailBox>
            <PaySubTitle>상품금액</PaySubTitle>
            <PayUserInfo>{payDetailData?.prod_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</PayUserInfo>
          </PayInfoDetailBox>
          <PayInfoDetailBox>
            <PaySubTitle>배송설치비</PaySubTitle>
            {/* null일 경우 0원 아닐경우 "+ 12345원" */}
            <PayUserInfo>{payDetailData?.delivery_price === null ? 
               "0원"
              : `+ ${payDetailData?.delivery_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}
            </PayUserInfo>
          </PayInfoDetailBox>
          <PayInfoDetailBox>
            <PaySubTitle>쿠폰 할인</PaySubTitle>
            <PayUserInfo>{payDetailData?.coupon_price === null ? 
               "0원"
              : `- ${payDetailData?.coupon_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}</PayUserInfo>
          </PayInfoDetailBox>
          <PayInfoDetailBox>
            <PaySubTitle>마일리지 사용</PaySubTitle>
            <PayUserInfo>{payDetailData?.mile_use === null ? 
               "0원"
              : `- ${payDetailData?.mile_use.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}</PayUserInfo>
          </PayInfoDetailBox>
          <PayAmountBox>
            <PaySubAmount>총 결제금액</PaySubAmount>
            <PayUserAmount>{payDetailData?.pay_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</PayUserAmount>
          </PayAmountBox>
          <PayCompleteBox>
            <PaySubComplete>결제 완료</PaySubComplete>
            <PayUserComplete>
              {payDetailData?.buy_method === "simple" && "간편결제"}
              {payDetailData?.buy_method === "card" && "신용/체크"}
              {payDetailData?.buy_method === "phone" && "휴대폰결제"}
              {payDetailData?.buy_method === "account" && "계좌이체"}
              </PayUserComplete>
          </PayCompleteBox>
        </PayInfoBox>
      </DeliveryAndPayInfoBox>
    </DeliveryAndPayInfoWrapper>
    <TrackingWrapper>
      <TrackingTitleAndNumberBox>
        <TrackingTitle>배송 조회</TrackingTitle>
        {payDetailData?.deli_num !== null ? 
        (<TrackingNumber>송장번호 {payDetailData?.deli_num}</TrackingNumber>) :
        (<></>) }
      </TrackingTitleAndNumberBox>
      <TrackingStateBox>
        <TrackingStateImgAndTextBox>
          <TrackingStateItem>
          {/* 송장번호가 null 값일 때 상품 준비 중 */}
            <TrackingStateImg state={payDetailData?.deli_num === null}><img src={trackingStateIcon1} alt="deliveryicon" /></TrackingStateImg>
            <TrackingStateText state={payDetailData?.deli_num === null}>상품 준비 중</TrackingStateText>
          </TrackingStateItem>
          <TrackingStateItem>
          {/* FIXME: 송장번호가 null 값이 아니고 스마트택배 API 배송상태에 따른 렌더링 */}
            <TrackingStateImg state={!!((payDetailData?.deli_num !== null) & (trackingData?.level === 1))}><img src={trackingStateIcon2} alt="deliveryicon" /></TrackingStateImg>
            <TrackingStateText state={!!((payDetailData?.deli_num !== null) & (trackingData?.level === 1))}>배송 준비 중</TrackingStateText>
          </TrackingStateItem>
          <TrackingStateItem>
            <TrackingStateImg state={!!((payDetailData?.deli_num !== null) & (trackingData?.level === 2))}><img src={trackingStateIcon3} alt="deliveryicon" /></TrackingStateImg>
            <TrackingStateText state={!!((payDetailData?.deli_num !== null) & (trackingData?.level === 2))}>배송 출발</TrackingStateText>
          </TrackingStateItem>
          <TrackingStateItem>
            <TrackingStateImg state={!!((payDetailData?.deli_num !== null) & (trackingData?.level >= 3) & (trackingData?.level <= 5))}><img src={trackingStateIcon4} alt="deliveryicon" /></TrackingStateImg>
            <TrackingStateText state={!!((payDetailData?.deli_num !== null) & (trackingData?.level >= 3) & (trackingData?.level <= 5))}>배송 중</TrackingStateText>
          </TrackingStateItem>
          <TrackingStateItem>
            <TrackingStateImg state={!!((payDetailData?.deli_num !== null) & (trackingData?.level === 6))}><img src={trackingStateIcon5} alt="deliveryicon" /></TrackingStateImg>
            <TrackingStateText state={!!((payDetailData?.deli_num !== null) & (trackingData?.level === 6))}>배송 완료</TrackingStateText>
          </TrackingStateItem>
        </TrackingStateImgAndTextBox>
        <TrackingStateBar>
          <TrackingStateLine />
          {/* 송장번호가 null 값일 때 상품 준비 중 */}
          <TrackingStateCircle state={payDetailData?.deli_num === null} />
          <TrackingStateCircle state={!!((payDetailData?.deli_num !== null) & (trackingData?.level === 1))} />
          <TrackingStateCircle state={!!((payDetailData?.deli_num !== null) & (trackingData?.level === 2))} />
          <TrackingStateCircle state={!!((payDetailData?.deli_num !== null) & (trackingData?.level >= 3) & (trackingData?.level <= 5))} />
          <TrackingStateCircle state={!!((payDetailData?.deli_num !== null) & (trackingData?.level === 6))} />
        </TrackingStateBar>
      </TrackingStateBox>
      <TrackingNowLocationBtn onClick={() => {trackingHandler()}}><span>현재 위치 조회</span></TrackingNowLocationBtn>
    </TrackingWrapper>
  </>
  )
}

export default PayDetail

// 주문 상세 정보
const MainTitleWrapper = styled.div`
  width: 1200px;
  margin: 70px auto 0px;
  border-bottom: 2px solid #514438;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
`;
const MainTitle = styled.div`
  margin: 0px 0px 13px 30px;
  height: 30px;

  font-weight: 700;
  font-size: 28px;
  line-height: 30px;
  color: #514438;
`;
const ProductCode = styled.div`
  margin: 0px 30px 13px 0px;
  height: 30px;

  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #514438;
`;

// 상품정보
const ProductInfoWrapper = styled.div`
  width: 1200px;
  height: 250px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  
  border-bottom: 3px solid rgba(185, 168, 154, 0.1);;
`;
const ProductInfoBox = styled.div`
  width: 1100px;
  height: 150px;
  display: flex;
  justify-content: space-between;

  margin: 0px auto;
`;
const ProductInfoImageAndNameBox = styled.div`
  margin: 0px;
  display: flex;
  align-items: center;
`;
const ProductInfoImage = styled.div`
  width: 150px;
  height: 150px;
  margin-right: 70px;
  img {
    border-radius: 100px;
    width: 100%;
    height: 100%;
  }
`;
const ProductInfoName = styled.div`

`;
const ProductCom = styled.div`
  height: 25px;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  color: #666666;
`;
const ProductName = styled.div`
  width: 500px;
  height: 35px;
  font-weight: 400;
  font-size: 25px;
  line-height: 35px;
  color: #000000;
`;
const ProductInfoPriceBox = styled.div`
  width: 300px;
  height: 35px;
  margin: 65px 0px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ProductInfoDelivery = styled.div`
  margin: 0px;
  display: flex;
  text-align: left;
  color: #777777;

  img {
    margin-right: 4px;
    width: 25px;
    height: 25px;
    line-height: 25px;
    color: #777777;
  }
`;
const ProductInfoPrce = styled.div`
  margin: 0px;
  text-align: right;
  height: 35px;

  font-weight: 700;
  font-size: 25px;
  line-height: 35px;
  color: #514438;
`;

// 배송지, 결제정보
const DeliveryAndPayInfoWrapper = styled.div`
  width: 1200px;
  height: 355px;
  box-sizing: border-box;

  display: flex;
  align-items: center;

  border-bottom: 3px solid rgba(185, 168, 154, 0.1);
`;
const DeliveryAndPayInfoBox = styled.div`
  width: 1120px;
  height: 295px;
  display: flex;
  margin: 0px 50px 0px 30px;
`;

// 배송지정보
const DeliveryInfoBox = styled.div`
  width: 515px;
  margin: 0px;
  text-align: left;
  box-sizing: border-box;
  border-right: 3px solid rgba(185, 168, 154, 0.1);;
`;
const DeliveryTitle = styled.div`
  margin-bottom: 30px;
  height: 30px;

  font-weight: 600;
  font-size: 25px;
  line-height: 30px;
  color: rgba(81, 68, 56, 0.8);
`;
const DeliveryInfoDetailBox= styled.div`
  display: flex;
  margin-bottom: 15px;
`;
const DeliverySubTitle = styled.div`
  width: 80px;
  height: 35px;
  margin: 0px;

  font-weight: 500;
  font-size: 20px;
  line-height: 35px;

  color: #777777;
`;
const DeliverySubTitleAddr = styled.div`
  width: 80px;
  height: 85px;
  margin: 0px;

  font-weight: 500;
  font-size: 20px;
  line-height: 35px;

  color: #777777;
`;
const UserAddrBox = styled.div`
  margin: 0px;
  div:first-child {
    margin-bottom: 15px;
  }
`;
const DeliverySubTitleReq = styled.div`
  width: 140px;
  height: 35px;
  margin: 0px;

  font-weight: 500;
  font-size: 20px;
  line-height: 35px;

  color: #777777;
`;
const DeliveryUserInfo = styled.div`
  height: 35px;
  margin: 0px;

  font-weight: 400;
  font-size: 20px;
  line-height: 35px;
  color: #000000;
`;


// 결제정보
const PayInfoBox = styled.div`
  width: 550px;
  margin: 0px 0px 0px 55px;
`;
const PayTitle= styled.div`
  margin-bottom: 30px;
  height: 30px;

  font-weight: 600;
  font-size: 25px;
  line-height: 30px;
  color: rgba(81, 68, 56, 0.8);
`;
const PayInfoDetailBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const PaySubTitle = styled.div`
  width: 110px;
  height: 25px;
  margin: 0px;

  text-align: left;
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  color: #000000;
`;
const PayUserInfo = styled.div`
  margin: 0px;
  height: 25px;

  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  color: #000000;
`;
const PayAmountBox = styled.div`
  margin: 5px 0px 25px;
  display: flex;
  justify-content: space-between;
`;
const PaySubAmount = styled.div`
  margin: 0px;
  height: 30px;

  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: #000000;
`;
const PayUserAmount = styled.div`
  margin: 0px;
  height: 30px;

  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
  color: #514438;
`;
const PayCompleteBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PaySubComplete = styled.div`
  margin: 0px;
  height: 30px;

  font-weight: 400;
  font-size: 23px;
  line-height: 30px;
  color: #514438;
`;
const PayUserComplete = styled.div`
  margin: 0px;
  height: 30px;

  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: #514438;
`;


// 배송조회
const TrackingWrapper = styled.div`
  width: 1200px;
  height: 385px;

  margin: 0px auto 100px;
`;
const TrackingTitleAndNumberBox = styled.div`
  margin-bottom: 35px;
  width: 1200px;
  height: 60px;
  display: flex;
  justify-content: space-between;
`;
const TrackingTitle = styled.div`
  margin: 30px 0px 0px 30px;
  height: 30px;

  font-weight: 600;
  font-size: 25px;
  line-height: 30px;
  color: rgba(81, 68, 56, 0.8);
`;
const TrackingNumber = styled.div`
  margin: 30px 40px 0px 0px;
  height: 30px;

  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: #333333;
`;
const TrackingStateBox = styled.div`
  width: 1020px;
  height: 215px;
  margin: 0px auto;
  background: rgba(185, 168, 154, 0.15);
  border-radius: 15px;
`;
const TrackingStateImgAndTextBox = styled.div`
  width: 910px;
  height: 125px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const TrackingStateItem = styled.div`
  width: 110px;
  height: 85px;
  margin: 40px 0px 0px 0px;
  text-align: center;
`;
const TrackingStateImg = styled.div`
  width: 50px;
  height: 50px;
  margin-bottom: 5px;
  img {
    width: 100%;
    height: 100%;
    opacity: ${(props) => props.state === true ? "1" : "0.5"};
  }
`;
const TrackingStateText = styled.div`
  width: 110px;
  height: 30px;

  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: ${(props) => props.state === true ? "#514438" : "rgba(81, 68, 56, 0.5)"};
`;
const TrackingStateBar = styled.div`
  width: 820px;
  height: 20px;
  margin: 0px auto;
  
  position: relative;

  div:last-child {
    margin: 0px;
  }
`;
const TrackingStateCircle = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 180px;
  display: inline-block;
  border-radius: 100px;
  /* background: #514438; */
  background: ${(props) => props.state === true ? "#514438" : "#B9A89A"};
`;
const TrackingStateLine = styled.div`
  margin-right: 0px;
  width: 800px;
  height: 0px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #B8A89A;
  z-index: -1;
`;

const TrackingNowLocationBtn = styled.div`
  margin: 25px auto 0px;
  width: 300px;
  height: 50px;

  border: 2px solid rgba(185, 168, 154, 0.6);
  border-radius: 10px;

  display: flex;
  align-items: center;

  font-weight: 700;
  font-size: 20px;
  span {
    color: rgba(81, 68, 56, 0.8);
  }
  :hover {
    cursor: pointer;
  }
`;