import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BarChart,  Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import axios from 'axios';

const TotalSalesChart = () => {

  const [dailyData, setDailyData] = useState();

  const getData = () => {
    axios.get("/admin/sales/monthly ")
    .then((res) => {
      const { data } = res;
      setDailyData(data.month_sales);
    })
    .catch((e) => {
      console.error(e);
    })
  }

  useEffect(() => {
    getData()
  }, [])
  
  const CombinedChart = () => (
    <BarChart  width={1200} height={230}  data={dailyData} margin={{rgiht:0 ,left:0 }}>
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis dataKey="date" />
      <Tooltip />
      <YAxis />
      <Bar barSize={30} dataKey="sales" fill="rgb(179, 205, 227)" />
     </BarChart>      
  );

  return (
    <TotalSizeWrapper>
      <SalesTitleBox><span>Refurmoa 매출 현황</span></SalesTitleBox>
      <CombinedChart />
      <LabelBox>
        (만원)
      </LabelBox>
    </TotalSizeWrapper>
  )
}

export default TotalSalesChart

const TotalSizeWrapper = styled.div`
  margin: 0px;
  width: 1200px;
  height: 315px;
  position: relative;
`;

const SalesTitleBox = styled.div`
  width: 100%;
  height: 50px;
  font-weight: 700;
  font-size: 20px;
  line-height: 50px;
  margin-bottom: 30px;
  border-bottom: 1px solid #000000;
  span {
    margin-left: 15px;
  }
`;

const LabelBox = styled.div`
  font-size: 14px;
  margin:0px;
  background-color: #ffffff;
  color: #666666;
  position: absolute;
  left: 20px;
  bottom: 25px;
`;
