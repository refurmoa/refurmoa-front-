import React from 'react'
import styled from 'styled-components'
import { BarChart,  Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const TotalSalesChart = () => {

    const data =[
        { name: 'Jan', value: 12 },
        { name: 'Feb', value: 1 },
        { name: 'Mar', value: 2 },
        { name: 'Apr', value: 3 },
        { name: 'May', value: 15 },
        { name: 'Jun', value: 12 },
        { name: 'Jul', value: 16 },
        { name: 'Aug', value: 12 },
        { name: 'Sep', value: 14 },
        { name: 'Oct', value: 15 },
        { name: 'Nov', value: 17 },
        { name: 'Dec', value: 12 },
    ]
  
  const CombinedChart = () => (
    <BarChart  width={1200} height={250}  data={data} margin={{rgiht:0 ,left:0 }}>
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar barSize={30} dataKey="value" fill="#8884d8" />
     </BarChart>      
  );

  return (
    <TotalSizeWrapper>
      <SalesTitleBox><span>Refurmoa 매출 현황</span></SalesTitleBox>
      <CombinedChart />
    </TotalSizeWrapper>
  )
}

export default TotalSalesChart

const TotalSizeWrapper = styled.div`
  margin: 40px 0px 0px 0px;
  width: 1200px;
  height: 300px;
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
