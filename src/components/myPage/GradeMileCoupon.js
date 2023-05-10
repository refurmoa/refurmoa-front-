import React from "react";
import styled from "styled-components";

const GradeMileCoupon = () => {
  return (
    <MemberGradeMileCouponWrapper>
      <MemberGradeMileCouponBox>
        <MemberGradeBox>
          <GradeTitleAndInfoBox>
            <GradeTitle>회원등급</GradeTitle>
            <GradeInfo>
              <img src="/images/mypage/info_icon.png" alt="gradeinfo" />
            </GradeInfo>
          </GradeTitleAndInfoBox>
          <GradeBox>
            <Grade>GOLD</Grade>
          </GradeBox>
        </MemberGradeBox>
        <VerticalLine></VerticalLine>
        <MemberMileBox>
          <MileTitleAndAmountBox>
            <MileTitleAndInfoBox>
              <MileTitle>마일리지</MileTitle>
              <MileInfo>
                <img src="/images/mypage/info_icon.png" alt="gradeinfo" />
              </MileInfo>
            </MileTitleAndInfoBox>
            <MileAmount>32,556</MileAmount>
          </MileTitleAndAmountBox>
          <MileDetailBox>
            <MileName>상품 구매</MileName>
            <MilePoint>+ 22,300</MilePoint>
          </MileDetailBox>
          <MileDetailBox>
            <MileName>상품 구매</MileName>
            <MilePoint>- 2,000</MilePoint>
          </MileDetailBox>
          <MileDetailBox>
            <MileName>GOLD 승급</MileName>
            <MilePoint>+ 5,000</MilePoint>
          </MileDetailBox>
        </MemberMileBox>
        <VerticalLine></VerticalLine>
        <MemberCouponBox>
          <CouponTitle>보유중인 쿠폰</CouponTitle>
          <CouponDetailBox>
            <CouponName>배송 연기 보상 쿠폰</CouponName>
            <CouponPoint>25,000원</CouponPoint>
          </CouponDetailBox>
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
  margin-left: 10px;
`;

const GradeBox = styled.div``;

const Grade = styled.div`
  font-weight: 700;
  font-size: 30px;
  line-height: 40px;
  margin-left: 5px;
  color: #b9a89a;
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
  margin-left: 10px;
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
