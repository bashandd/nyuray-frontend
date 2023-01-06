import React from 'react';
// import { Interaction, PieChart } from 'bizcharts';
import { Card } from 'antd';

const pieData = [
  {
    type: 'IBM',
    value: 27,
  },
  {
    type: 'TCS',
    value: 25,
  },
  {
    type: 'Wipro',
    value: 18,
  },
  {
    type: 'TechMahindra',
    value: 15,
  },
  {
    type: 'ABC',
    value: 10,
  },
  {
    type: 'NyuRay',
    value: 5,
  },
];

function ProductPieChart() {
  return (
    <Card bordered={false}>
      <PieChart
        forceFit
        height={250}
        data={pieData}
        radius={0.8}
        angleField="value"
        colorField="type"
        label={{
          visible: true,
          type: 'outer',
          offset: 20,
          formatter: val => `${val.type} - ${val.value}%`,
        }}
      >
        <Interaction type="element-single-selected" />
      </PieChart>
    </Card>
  );
}

export default ProductPieChart;
