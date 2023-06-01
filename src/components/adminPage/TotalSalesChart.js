import React from 'react'
import styled from 'styled-components'
import { BarChart,  Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const TotalSalesChart = () => {

    const data =[
        { name: '23-01', 매출액: 1200 },
        { name: '23-02', 매출액: 900 },
        { name: '23-03', 매출액: 600 },
        { name: '23-04', 매출액: 1400 },
        { name: '23-05', 매출액: 1500 },
        { name: '23-06', 매출액: 1200 },
        { name: '23-07', 매출액: 1600 },
        { name: '23-08', 매출액: 1200 },
        { name: '23-09', 매출액: 1400 },
        { name: '23-10', 매출액: 1500 },
        { name: '23-11', 매출액: 1007 },
        { name: '23-12', 매출액: 1002 },
    ]
  
  const CombinedChart = () => (
    <BarChart  width={1200} height={230}  data={data} margin={{rgiht:0 ,left:0 }}>
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis dataKey="name" />
      <Tooltip />
      <YAxis />
      <Bar barSize={30} dataKey="매출액" fill="rgb(179, 205, 227)" />
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
