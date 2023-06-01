import React from 'react'
import styled from 'styled-components'
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DailySalesChart = () => {

  const data = [
    { date: '05-25', 경매: 800, 즉시구매: 1000, 취소: 200, 판매건수: 1 },
    { date: '05-26', 경매: 400, 즉시구매: 400, 취소: 150, 판매건수: 3 },
    { date: '05-27', 경매: 700, 즉시구매: 1500, 취소: 500, 판매건수: 5 },
    { date: '05-28', 경매: 100, 즉시구매: 0, 취소: 100, 판매건수: 2 },
    { date: '05-29', 경매: 78, 즉시구매: 430, 취소: 0, 판매건수: 4 },
    { date: '05-30', 경매: 60, 즉시구매: 1200, 취소: 700, 판매건수: 1 },
    { date: '05-31', 경매: 400, 즉시구매: 300, 취소: 150, 판매건수: 1 },
  ];
  
  const CombinedChart = () => (
    <ComposedChart width={560} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
      <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
      <Tooltip />
      <Legend wrapperStyle={{ fontSize: 12 }} />

      <Bar dataKey="경매" stackId="bar" yAxisId="left" fill="rgb(204, 235, 197)" />
      <Bar dataKey="즉시구매" stackId="bar" yAxisId="left" fill="rgb(179, 205, 227)" />
      <Bar dataKey="취소" yAxisId="left" fill="rgb(251, 180, 174)" />

      <Line type="monotone" dataKey="판매건수" yAxisId="right" stroke="rgb(254, 217, 166)" strokeWidth="2" />
    </ComposedChart>
  );

  return (
    <BarChartWrapper>
      <ChartTitleBox><span>DAILY SALES 일별 매출</span></ChartTitleBox>
      <CombinedChart />
      <LabelBox>
        <LabelLeftBox>(천원)</LabelLeftBox>
        <LabelRightBox>(건)</LabelRightBox>
      </LabelBox>
    </BarChartWrapper>
  )
}

export default DailySalesChart

const BarChartWrapper = styled.div`
  margin: 40px 0px 0px 0px;
  width: 580px;
  height: 450px;
  position: relative;
`;

const ChartTitleBox = styled.div`
  width: 100%;
  height: 50px;
  font-weight: 700;
  font-size: 20px;
  line-height: 50px;
  margin-bottom: 55px;
  border-bottom: 1px solid #000000;
  span {
    margin-left: 15px;
  }
`;

const LabelBox = styled.div`
  width: 490px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 40px;
  top: 345px; 
  font-size: 12px;
`;

const LabelLeftBox = styled.div`
  margin:0px;
  background-color: #ffffff;
  color: #666666;
`;

const LabelRightBox = styled.div`
  margin:0px;
  background-color: #ffffff;
  color: #666666;
`;