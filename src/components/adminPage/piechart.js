import { ResponsivePie } from '@nivo/pie'
import styled from 'styled-components';

export const MyResponsivePie = ({ data /* see data tab */ }) => (
  <CircleWrapper>
    <ChartTitleBox>카테고리별 매출 비율</ChartTitleBox>
    <div style={{ width: '460px', height: '300px'}}>
      <ResponsivePie 
        data={data}
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
  </CircleWrapper>
)

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