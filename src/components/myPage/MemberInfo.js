import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import infodata from "./memberinfo.json";
import { useNavigate } from 'react-router-dom';

// 이미지
import member from "../../images/member.png";
import card from "../../images/card.png";
import list from "../../images/list.png";
import star from "../../images/star.png";


const MemberInfo = () => {
  const navigate = useNavigate();
  const [memberInfo, setMemberInfo] = useState();


  const dataProcess = (data) => {
    // 회원등급 데이터 가공
    let grade = data.grade;
    
    switch (data.grade) {
      case 1:
        grade = "SILVER";
        break;
      case 2:
        grade = "GOLD";
        break;
      case 3:
        grade = "VIP";
        break;
      case 4:
        grade = "VVIP";
        break;
      default:
        grade = "BRONZE";
        break;
    };

    // 세션에서 회원아이디 받아오기
    // let id = sessionStorage.getItem("id");
    // return data = { ...data, grade: grade, id: id};
    let id = "leemoa";
    return data = { ...data, grade: grade, id: id };
  };

  const getMemberInfo = () => {
    const memberinforequest = { id: "유저정보" };
    // axios.post("/api/memberinfo", memberinforequest)
    // .then((res) => {
    //   const { data } = res;
    //   setMemberInfo(dataProcess(data));
    // })
    // .catch((e) => {
    //   console.error(e);
    // })
    let data = infodata;
    setMemberInfo(dataProcess(data));
    // console.log(data);
  }

  useEffect(() => {
    getMemberInfo();
  }, [])

  return (
    <MemberInfoWrapper>
      <MemberInfoBox>
        {/* 등급, 이름, 아이디, 개인정보 수정 시작 */}
        <PersonalInfoBox>
          <PersonalGrade>
            <PersonalGradeImg>
              <img src={member} alt="membericon" />
            </PersonalGradeImg>
            <PersonalGradeText>
              {memberInfo?.grade}
            </PersonalGradeText>
          </PersonalGrade>
          <PersonalName>{memberInfo?.name}({memberInfo?.id})</PersonalName>
          <PersonalInfoEdit onClick={() => {navigate("/userupdate")}}>개인정보 수정</PersonalInfoEdit>
        </PersonalInfoBox>
        {/* 등급, 이름, 아이디, 개인정보 수정 끝 */}

        <VerticalLine />

        {/* 결제 · 배송 시작 */}
        <PayAndShipBox>
          <PayAndShipText>결제 · 배송</PayAndShipText>
          <ImgAndCount onClick={() => {navigate("/mypage/payment")}}>
            <ImgBox><img src={card} alt="cardicon" /></ImgBox>
            <CountBox>
              {memberInfo?.payandship}
            </CountBox>
          </ImgAndCount>
        </PayAndShipBox>
        {/* 결제 · 배송 끝 */}

        <VerticalLine />

        {/* 입찰 내역 시작 */}
        <BidBox>
          <BidText>입찰 내역</BidText>
          <ImgAndCount onClick={() => {navigate("/mypage/bidlist")}}>
            <ImgBox><img src={list} alt="cardicon" /></ImgBox>
            <CountBox>
              {memberInfo?.bid}
            </CountBox>
          </ImgAndCount>
        </BidBox>
        {/* 입찰 내역 끝 */}

        <VerticalLine />

        {/* 찜한 상품 시작 */}
        <BookmarkBox>
          <BookmarkText>찜한 상품</BookmarkText>
          <ImgAndCount onClick={() => {navigate("/mypage")}}>
            <ImgBox><img src={star} alt="cardicon" /></ImgBox>
            <CountBox>
              {memberInfo?.bookmark}
            </CountBox>
          </ImgAndCount>
        </BookmarkBox>
        {/* 찜한 상품 끝 */}
      </MemberInfoBox>
    </MemberInfoWrapper>
  )
}

export default MemberInfo;

const MemberInfoWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  border-top: 2px solid #B9A89A;
  border-bottom: 2px solid #B9A89A;
`;

const MemberInfoBox = styled.div`
  width: 1200px;
  height: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PersonalInfoBox = styled.div`
  width: 300px;
  height: 200px;
`;

const PersonalGrade = styled.div`
  height: 80px;
  width: 80px;
  margin: 30px auto 10px;
  
  position: relative;
`;

const PersonalGradeImg = styled.div`
  width: 80px;
  height: 80px;
  img {
    width: 100%;
    height: 100%;
    opacity: 0.7;
  }
`;

const PersonalGradeText = styled.div`
  margin: 0px auto;
  line-height: 80px;

  text-align: center;
  font-weight: 700;
  font-size: 30px;
  color: #514438;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate( -50%, -50% );
`;

const PersonalName = styled.div`
  height: 25px;
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  color: #514438;
  margin-bottom: 5px;
`;

const PersonalInfoEdit = styled.div`
  width: 140px;
  height: 30px;
  margin: 0px auto;
  color: #FFFFFF;

  text-align: center;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;

  border-radius: 7px;
  background-color: #B9A89A;
  :hover {
    cursor: pointer;
  }
`;


// 결제·배송
const PayAndShipBox = styled.div`
  width: 300px;
  height: 200px;
`;

const PayAndShipText = styled.div`
  margin: 48px auto 12px;

  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  text-align: center;
  color: #514438;
`;

// 입찰 내역
const BidBox = styled.div`
  width: 300px;
  height: 200px;
`;

const BidText = styled.div`
  margin: 48px auto 12px;

  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  text-align: center;
  color: #514438;
`;

// 찜한 상품
const BookmarkBox = styled.div`
  width: 300px;
  height: 200px;
`;

const BookmarkText = styled.div`
  margin: 48px auto 12px;

  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  text-align: center;
  color: #514438;
`;

// 결제·배송, 입찰내역, 찜한상품 icon, count 겹치기
const ImgAndCount = styled.div`
  height: 80px;
  width: 80px;
  margin: 0px auto 35px;
  
  position: relative;
  :hover{
    cursor: pointer;
  }
`;
const ImgBox = styled.div`
  img {
    width: 100%;
    height: 100%;
    opacity: 0.4;
  }
`;
const CountBox = styled.div`
  height: 60px;

  font-weight: 700;
  font-size: 50px;
  line-height: 60px;
  text-align: center;
  color: #514438;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate( -50%, -50% );
`;

const VerticalLine = styled.div`
  margin: 0px;
  height: 100px;
  border-right: 2px solid rgba(185, 168, 154, 0.5);
`;