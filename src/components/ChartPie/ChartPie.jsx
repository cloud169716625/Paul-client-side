import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';



const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


export  class ChartPie extends PureComponent {  
  
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width="100%" height="100%">
          <Pie
            data={this.props.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={45}
            fill="#8884d8"
            stroke="#1E1E2D"
            strokeWidth={3}
            dataKey="value"
            startAngle={90}
            endAngle={450}
          >
            {this.props.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={this.props.colors[index % this.props.colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
