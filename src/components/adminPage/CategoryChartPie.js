import { ResponsivePie } from '@nivo/pie'
import styled from 'styled-components';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Data from "./data.json";
const CategoryChartPie = () => {
  const [categoryData, setCategoryData] = useState();
  console.log(Data);
  const getCategoryData = () => {
    axios.get("/admin/sales/category")
    .then((res) => {
      const { data } = res;
      // 전체 매출 합계 계산
      const totalSales = data.category_countList.reduce((sum, item) => sum + item.value, 0);

      const categoryMap = {
        appkitchen : '주방',
        applife : '생활',
        appelec : '전자기기',
        furliving : '거실/주방',
        furbed : '침실',
        furoffice : '사무실',
      };

      // 비율로 변환된 데이터 생성
      const ratioData = data.category_countList.map(item => ({
        id: categoryMap[item.id], // 카테고리 한글로 변환
        label: categoryMap[item.label], // 카테고리 한글로 변환
        value: Math.round((item.value / totalSales) * 100), // 매출 비율 계산
      }));
      setCategoryData(ratioData);
    })
    .catch((e) => {
      console.error(e);
    })
  }

  useEffect(() => {
    getCategoryData();
  }, [])

  return (
  <CircleWrapper>
    <ChartTitleBox>카테고리별 매출 비율</ChartTitleBox>
    {categoryData !== undefined && (
      <div style={{ width: '460px', height: '300px'}}>
      <ResponsivePie 
        data={Data}
        margin={{ top: 5, right: 160, bottom: 5, left: 5 }}
        innerRadius={0.2}
        padAngle={2}
        cornerRadius={3}
        activeOuterRadiusOffset={5}
        colors={{ scheme: 'pastel1' }}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              0.2
            ]
          ]
        }}
        arcLinkLabelsSkipAngle={1000}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={1}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              2
            ]
          ]
        }}
        legends={[
          {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 152,
            translateY: 0,
            itemWidth: 100,
            itemHeight: 20,
            itemsSpacing: 15,
          symbolSize: 15,
          itemDirection: 'left-to-right',
          }
        ]}
      />
    </div>
      )}
  </CircleWrapper>
  )
}

export default CategoryChartPie

const CircleWrapper = styled.div`
  margin: 0px 0px 0px 0px;
  width: 580px;
  height: 450px; 
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