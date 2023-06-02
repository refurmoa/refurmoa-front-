// 관리자 페이지 - 메인

import styled from 'styled-components'
import axios from "axios";
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import DailySalesChart from "./DailySalesChart";
import { MyResponsivePie } from "./piechart.js";
import TotalSalesChart from "./TotalSalesChart"
import UnAnswered from "./UnAnswered";
import AdminMemo from "./AdminMemo";

import piedata  from "./data.json"

const Admin = () => {
  const navigate = useNavigate();
  const [adminInfoCount, setAdminInfoCount] = useState();

  useEffect(()=>{
    if(window.sessionStorage.getItem("id")!=="admin"){
      navigate("/");
    }
  }, []);

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
      {/* 일별 매출, 카테고리별 매출 */}
      <DailyAndCategorySalesBox> 
        <DailySalesChart />
        <CategoryChart>
          <MyResponsivePie data={piedata} />
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
