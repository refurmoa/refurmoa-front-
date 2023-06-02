// 관리자 페이지 - 메인
import { MyResponsivePie } from "./piechart.js";
import  data  from "./data.json"
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TotalSalesChart from "./TotalSalesChart"
import DailySalesChart from "./DailySalesChart";
import UnAnswered from "./UnAnswered";
import AdminMemo from "./AdminMemo";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Admin = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(window.sessionStorage.getItem("id")!=="admin"){
      navigate("/");
    }
  },[]) 
  const [adminInfoCount, setAdminInfoCount] = useState();

  const dummydata = {
    "yet": 3,
    "ingauction": 5,
    "ingdirect": 5,
    "waitpay": 3,
    "prepare": 5,
    "shipping": 3,
    "completed": 6,
    "productInquiry": 3,
    "oneononeInquiry": 4,
    "partnership": 5
  }

  const getAdminInfo = () => {
    // axios.get("/admin/info/count")
    // .then((res) => {
    //   const { data } = res;
    //   setAdminInfoCount(data);
    // })
    // .catch((e) => {
    //   console.error(e);
    // })
    setAdminInfoCount(dummydata)
  }

  useEffect(() => {
    getAdminInfo();
  }, [])

  return (
    <>
      {/* 관리자페이지 상단 NavBar */}
      <AdminInfoNavBox>
        <InfoNavBox>
          <NavTopBox>
            <NavItem>판매예정<CountSpan> {adminInfoCount?.yet}</CountSpan></NavItem>
            <NavItem>판매중<SmallSpan>(경매)</SmallSpan><CountSpan> {adminInfoCount?.ingauction}</CountSpan></NavItem>
            <NavItem>판매중<SmallSpan>(즉시구매)</SmallSpan><CountSpan> {adminInfoCount?.ingdirect}</CountSpan></NavItem>
            <NavItem>입금대기<SmallSpan>(경매)</SmallSpan><CountSpan> {adminInfoCount?.waitpay}</CountSpan></NavItem>
            <NavItem>상품준비중<CountRedSpan> {adminInfoCount?.prepare}</CountRedSpan></NavItem>
          </NavTopBox>
          <NavBottomBox>
            <NavItem>배송중<CountRedSpan> {adminInfoCount?.shipping}</CountRedSpan></NavItem>
            <NavItem>배송완료<CountSpan> {adminInfoCount?.completed}</CountSpan></NavItem>
            <NavItem>상품문의<CountRedSpan> {adminInfoCount?.productInquiry}</CountRedSpan></NavItem>
            <NavItem>1:1문의<CountRedSpan> {adminInfoCount?.oneononeInquiry}</CountRedSpan></NavItem>
            <NavItem>제휴신청<CountSpan> {adminInfoCount?.partnership}</CountSpan></NavItem>
          </NavBottomBox>
        </InfoNavBox>
      </AdminInfoNavBox>
      {/* 일별 매출, 카테고리별 매출 */}
      <DailyAndCategorySalesBox> 
        <DailySalesChart />
        <CategoryChart>
          <MyResponsivePie data={data} />
        </CategoryChart>
      </DailyAndCategorySalesBox>

      {/* 매출 현황 */}
      <CurrentSituationBox>
        <TotalSalesBox> 
          <TotalSalesChart />
        </TotalSalesBox>
      </CurrentSituationBox>

      {/* 미답변 상품 문의, MEMO */}
      <UnansweredAndMemoBox>
        <UnAnswered />
        <AdminMemo />
      </UnansweredAndMemoBox>
    </>
  );
};

export default Admin;

const AdminInfoNavBox = styled.div`
  margin: 0px auto 40px;
  width: 1200px;
  height: 115px;

  box-sizing: border-box;
  border-top: 2px solid #B9A89A;
  border-bottom: 2px solid #B9A89A;
`;

const InfoNavBox = styled.div`
  margin: 20px 0px 0px 25px;
  width: 1105px;
  height: 75px;
`;

const NavTopBox = styled.div`
  margin-bottom: 21px;
  height: 25px;
  display: flex;
`;

const NavBottomBox = styled.div`
  height: 25px;
  display: flex;
`;

const NavItem = styled.div`
  width: 221px;
  height: 25px;
  font-size: 20px;
  line-height: 25px;
`;

const SmallSpan = styled.span`
  font-size: 16px;
`;

const CountSpan = styled.span`
  height: 25px;
  font-size: 20px;
  line-height: 25px;
  color: #000000;
`;

const CountRedSpan = styled.span`
  height: 25px;
  font-size: 20px;
  line-height: 25px;
  color: #FF0000;
`;

const DailyAndCategorySalesBox = styled.div`
  margin: 0px auto 40px;
  width: 1200px;
  height: 450px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CategoryChart = styled.div`
  margin: 0px;
  width: 580px;
  height: 450px;
`;

const CurrentSituationBox = styled.div`
  margin: 0px auto 70px;
  width: 1200px;
  height: 315px;
`;

const TotalSalesBox = styled.div`
  margin: 0 auto;
  width: 1200px;
  height: 315px;
`;

const UnansweredAndMemoBox = styled.div`
  margin: 0px auto;
  width: 1200px;
  height: 700px;

  display: flex;
  justify-content: space-between;
`;