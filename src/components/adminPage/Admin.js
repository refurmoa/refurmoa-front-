// 관리자 페이지 - 메인
import { MyResponsivePie } from "./piechart.js";
import  data  from "./data.json"
import React from 'react'
import styled from 'styled-components'
import TotalSalesChart from "./TotalSalesChart"
import DailySalesChart from "./DailySalesChart";
import UnAnswered from "./UnAnswered";
import AdminMemo from "./AdminMemo";


const Admin = () => {
  return (
    <>
      {/* 일별 매출, 카테고리별 매출 */}
      <DailyAndCategorySalesBox> 
        <DailySalesChart />
      </DailyAndCategorySalesBox>

      {/* 매출 현황 */}
      <CurrentSituationBox>

      </CurrentSituationBox>

      {/* 미답변 상품 문의, MEMO */}
      <UnansweredAndMemoBox>
        <UnAnswered />
        <AdminMemo />
      </UnansweredAndMemoBox>
    </>

      <MyResponsivePie data={data} />
      <TotalSalesBox> 
        <TotalSalesChart />
      </TotalSalesBox>
    );
};

export default Admin;

const DailyAndCategorySalesBox = styled.div`
  margin: 0 auto 40px;
  width: 1200px;
  height: 450px;
  display: flex;
  justify-content: space-between;
`;

const CurrentSituationBox = styled.div`
  margin: 0px auto 50px;
  width: 1200px;
  height: 300px;

  background: #D9D9D9; // 임시
`;

const UnansweredAndMemoBox = styled.div`
  margin: 0 auto;
  width: 1200px;
  height: 700px;

  display: flex;
  justify-content: space-between;
`;

const TotalSalesBox = styled.div`
  margin: 0 auto 40px;
  width: 1200px;
  height: 450px;
  display: flex;
  justify-content: space-between;
`;

