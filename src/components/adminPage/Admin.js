// 관리자 페이지 - 메인
import { MyResponsivePie } from "./piechart.js";
import  data  from "./data.json"
import React from 'react'
import styled from 'styled-components'
import TotalSalesChart from "./TotalSalesChart"
import DailySalesChart from "./DailySalesChart";
import UnAnswered from "./UnAnswered";
import AdminMemo from "./AdminMemo";
import {useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(window.sessionStorage.getItem("id")!=="admin"){
      navigate("/");
    }
  },[]);

  return (
    <>
      {/* 일별 매출, 카테고리별 매출 */}
      <DailyAndCategorySalesBox> 
        <DailySalesChart />
        <MyResponsivePie data={data} />
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

const DailyAndCategorySalesBox = styled.div`
  margin: 0 auto 40px;
  width: 1200px;
  height: 450px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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