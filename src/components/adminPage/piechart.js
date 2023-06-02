import { ResponsivePie } from '@nivo/pie'


// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const MyResponsivePie = ({ data /* see data tab */ }) => (
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
)
