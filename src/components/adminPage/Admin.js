// 관리자 페이지 - 메인
import { MyResponsivePie } from "./piechart.js";
import  data  from "./data.json"
import React from 'react'
import styled from 'styled-components'
import TotalSalesChart from "./TotalSalesChart"

const Admin = () => {

    return (
        <MyResponsivePie data={data} />
      <TotalSalesBox> 
        <TotalSalesChart />
      </TotalSalesBox>
    );
};
export default Admin;
const TotalSalesBox = styled.div`
  margin: 0 auto 40px;
  width: 1200px;
  height: 450px;
  display: flex;
  justify-content: space-between;
`;
