import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";


// 이미지파일
import infoicon from "../../images/info_icon_brown-240.png"

const GradeMileCoupon = () => {

  const [membershipInfo, setMembershipInfo] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const [mileHovered, setMileHovered] = useState(false);
  const dataProcess = (data) => {
    // 회원등급, 등급별 최대액수 데이터 가공
    let grade = data.membergrade.grade;
    let max = null;
    let nextgrade = null;
    switch (data.membergrade.grade) {
      case 1:
        grade = "SILVER";
        nextgrade = "GOLD";
        max = 300000;
        break;
      case 2:
        grade = "GOLD";
        nextgrade = "VIP";
        max = 600000;
        break;
      case 3:
        grade = "VIP";
        nextgrade = "VVIP";
        max = 1000000;
        break;
      case 4:
        grade = "VVIP";
        max = 0;
        break;
      default:
        grade = "BRONZE";
        nextgrade = "SILVER";
        max = 100000;
        break;
    };

    // 마일리지 3자리마다 콤마
    let amount = data.mile.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let history = data.mile.history;
    for (let i=0; i < data.mile.history.length; i++) {
      history[i].point = history[i].point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      // 양수(+), 음수(-)표시
      if (history[i].point.includes("-")) {
        history[i].point = history[i].point.replace("-", "- ");
      } else if(history[i].point.includes("+")) {
      } else {
        history[i].point = "+ " + history[i].point;
      }
    };
    
    // 쿠폰 3자리마다 콤마
    let couponprice = data.coupon
    // for (let j=0; j < data.coupon.length; j++) {
    //   couponprice[j].price = couponprice[j].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // }

    let persent = Math.floor((data.membergrade.amount / max) * 100);
    data.membergrade = { ...data.membergrade, grade: grade, max: max, nextgrade: nextgrade, persent: persent};
    data.mile.amount = amount;
    data.mile.history = history;
    data.coupon = couponprice;
    return data;
  }

  const getMembershipInfo = () => {
 
    axios
    .post(`/mypage/membership?id=${window.sessionStorage.getItem("id")}`)
    .then((res) => {
      setMembershipInfo(dataProcess(res.data));
    })
    .catch((e) => {
      console.error(e);
    })
   
 
  }

  useEffect(() => {
    getMembershipInfo();
  }, [])

  return (
    <MemberGradeMileCouponWrapper>
      <MemberGradeMileCouponBox>
        <MemberGradeBox>
          <GradeTitleAndInfoBox>
            <GradeTitle>회원등급</GradeTitle>
            <GradeInfo>
              <img src={infoicon} alt="gradeinfo" onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}/>
              {isHovered && 
              <GradeInfoText > 회원 등급은 결제 금액에 따라 결정됩니다.</GradeInfoText>
              }
            </GradeInfo>
          </GradeTitleAndInfoBox>
          <GradeBox>
            <Grade grade={membershipInfo?.membergrade.grade}>{membershipInfo?.membergrade.grade}</Grade>
            <GradeBar>
              <GradeInnerBar grade={membershipInfo?.membergrade.grade} persent={membershipInfo?.membergrade.persent} />
            </GradeBar>
            {/* 회원등급이 VVIP이면 다음 등급까지 남은 액수 나타나지 않게 조건부 렌더링 */}
            {/* 등급별 최대 액수 - 현재 구매 액수 계산 후 3자리마다 콤마찍는 정규식 활용 */}
            {membershipInfo?.membergrade.grade === "VVIP" ? (
              <></>
            ) : (
              <GradeForNext>{membershipInfo?.membergrade.nextgrade}까지 남은 액수 : {(membershipInfo?.membergrade.max - membershipInfo?.membergrade.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</GradeForNext>
            )}
            
          </GradeBox>
        </MemberGradeBox>
        <VerticalLine />
        <MemberMileBox>
          <MileTitleAndAmountBox>
            <MileTitleAndInfoBox>
              <MileTitle>마일리지</MileTitle>
              <MileInfo>
                <img src={infoicon} alt="gradeinfo"onMouseEnter={() => setMileHovered(true)}
                onMouseLeave={() => setMileHovered(false)}/>
              {mileHovered && 
              <MileInfoText > 마일리지는 총 결제 금액의 1%가 적립됩니다.</MileInfoText>
              }
              </MileInfo>
            </MileTitleAndInfoBox>
            <MileAmount>{membershipInfo?.mile.amount}</MileAmount>
          </MileTitleAndAmountBox>
          {membershipInfo?.mile.history.map((data, index) => (
            <MileDetailBox key={index}>
              <MileName>{data.content}</MileName>
              <MilePoint>{data.point}</MilePoint>
            </MileDetailBox>
          ))}
        </MemberMileBox>
        <VerticalLine />
        <MemberCouponBox>
          <CouponTitle>보유중인 쿠폰</CouponTitle>
          <CouponContent>
          {membershipInfo?.coupon.map((data, index) => (
          <CouponDetailBox key={index}>
            <CouponName>{data.coupon_name}</CouponName>
            <CouponPoint>{data.sale_price}</CouponPoint>
          </CouponDetailBox>
          ))}
          </CouponContent>
        </MemberCouponBox>
      </MemberGradeMileCouponBox>
    </MemberGradeMileCouponWrapper>
  );
};

export default GradeMileCoupon;

// 회원등급 마일리지 쿠폰
const MemberGradeMileCouponWrapper = styled.div`
  font-family: 'Noto Sans';
  font-style: normal;
  width: 1200px;
  margin: 0px auto;
  border-bottom: 2px solid #B9AB9A;
  box-sizing: border-box;
`;

const MemberGradeMileCouponBox = styled.div`
  width: 1050px;
  height: 210px;
  margin: 0px auto;
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

// 회원등급
const MemberGradeBox = styled.div`
  width: 250px;
  height: 130px;
  margin: 0px 75px 0px 0px;
`;

const GradeTitleAndInfoBox = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const GradeTitle = styled.div`
  height: 25px;
  line-height: 25px;
  font-weight: 700;
  font-size: 20px;
  color: #514438;
  margin: 0px 0px 0px 5px;
`;

const GradeInfo = styled.div`
  height: 25px;
  margin-left: 10px;
  img {
    width: 25px;
    height: 25px;
  }
  position:relative;
`;
const GradeInfoText= styled.div`
  float:right;
  padding:10px;
  width: 160px;
  position:absolute;
  top:0;
  left:30px;
  background-color: #EEEEEE;
`;
const GradeBox = styled.div``;

const Grade = styled.div`
  text-align: ${(props) => props.grade === "VVIP" ? "center" : "left"};
  height: 40px;
  font-weight: 700;
  font-size: 30px;
  line-height: 40px;
  margin-left: 5px;
  color: #b9a89a;
`;

const GradeBar = styled.div`
  width: 250px;
  height: 15px;
  background-color: #EEEEEE;
  display: flex;
  margin-top: 5px;
  border-radius: 50px;
`;

const GradeInnerBar = styled.div`
  width: ${(props) => props.grade === "VVIP" ? "100" : props.persent}%;
  height: 10px;
  margin: 2.5px;
  background-color: #B9A89A;
  border-radius: 50px;
`;

const GradeForNext = styled.div`
  height: 25px;
  line-height: 25px;
  text-align: right;
  font-weight: 400;
  font-size: 15px;
  color: #514438;
`;

// 마일리지
const MemberMileBox = styled.div`
  width: 250px;
  height: 130px;
  margin: 0px 75px 0px 75px;
`;

const MileTitleAndAmountBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const MileTitleAndInfoBox = styled.div`
  display: flex;
  margin: 0px;
`;

const MileTitle = styled.div`
  height: 25px;
  line-height: 25px;
  font-weight: 700;
  font-size: 20px;
  color: #514438;
`;

const MileInfo = styled.div`
  height: 25px;
  margin-left: 10px;
  img {
    width: 25px;
    height: 25px;
  }
  position:relative;
`;
const MileInfoText= styled.div`
  float:right;
  padding:10px;
  width: 160px;
  position:absolute;
  top:0;
  left:30px;
  background-color: #EEEEEE;
`;
const MileAmount = styled.div`
  margin: 0px;
  height: 25px;
  font-weight: 700;
  font-size: 15px;
  line-height: 25px;
  color: #514438;
`;

const MileDetailBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 400;
  font-size: 15px;
  margin-bottom: 5px;
  :last-child {
    margin: 0px;
  }
`;

const MileName = styled.div`
  margin: 0px;
  height: 25px;
  line-height: 25px;
  color: #514438;
`;

const MilePoint = styled.div`
  margin: 0px;
  height: 25px;
  line-height: 25px;
  color: #514438;
`;

// 쿠폰
const MemberCouponBox = styled.div`
  width: 250px;
  height: 130px;
  margin: 0px 0px 0px 75px;
`;

const CouponTitle = styled.div`
  height: 25px;
  line-height: 25px;
  font-weight: 700;
  font-size: 20px;
  color: #514438;
  margin-bottom: 15px;
`;
const CouponContent =styled.div`
height: 90px;
overflow-y: scroll;
padding-right:5px;
&::-webkit-scrollbar {
  
  width: 5px;
}
&::-webkit-scrollbar-thumb {
  
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
&::-webkit-scrollbar-track {
  background-color: white;
}
`
 
const CouponDetailBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 400;
  font-size: 15px;
  
  margin-bottom: 5px;
  :last-child {
    margin: 0px;
  }
`;

const CouponName = styled.div`
  height: 25px;
  line-height: 25px;
  margin: 0px;
  color: #514438;
`;

const CouponPoint = styled.div`
  height: 25px;
  line-height: 25px;
  margin: 0px;
  color: #514438;
`;

const VerticalLine = styled.div`
  margin: 0px;
  height: 100px;
  border-right: 2px solid rgba(185, 168, 154, 0.5);
`;
