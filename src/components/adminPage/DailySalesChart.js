import React from 'react'
import styled from 'styled-components'
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const DailySalesChart = () => {
  const [dailyData, setDailyData] = useState();

  const getData = () => {
    axios.get("/admin/sales/daily")
    .then((res) => {
      const { data } = res;
      setDailyData(data.daily_sales);
    })
    .catch((e) => {
      console.error(e);
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const CombinedChart = () => (
    <ComposedChart width={560} height={300} data={dailyData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
      <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
      <Tooltip />
      <Legend wrapperStyle={{ fontSize: 12 }} 
        payload={[
          { value: '경매', type: 'rect', color: 'rgb(204, 235, 197)' },
          { value: '즉시구매', type: 'rect', color: 'rgb(179, 205, 227)' },
          { value: '취소', type: 'rect', color: 'rgb(251, 180, 174)' },
          { value: '판매건수', type: 'line', color: 'rgb(254, 217, 166)' },
        ]}
      />

      <Bar dataKey="auction" stackId="bar" yAxisId="left" fill="rgb(204, 235, 197)" />
      <Bar dataKey="direct" stackId="bar" yAxisId="left" fill="rgb(179, 205, 227)" />
      <Bar dataKey="cancel" yAxisId="left" fill="rgb(251, 180, 174)" />

      <Line type="monotone" dataKey="count" yAxisId="right" stroke="rgb(254, 217, 166)" strokeWidth="2" />
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