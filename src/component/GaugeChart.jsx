import React from "react";
import { BsPeople } from "react-icons/bs";
import { PieChart, Pie, Cell, Label } from "recharts";

// Data and colors
const data = [
  { name: "Low", value: 400 },
  { name: "Medium", value: 300 },
  { name: "High", value: 300 },
];
const COLORS = ["#27B3FF", "#FA5503", "#00B252"]; //colors
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, payload }) => {
  // Access the data from the label object
  const { name } = payload;

  // Calculate the radius and position of the label
  const radius = outerRadius + 10; // Adjust the radius to position the label outside
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Customize the label content
  const labelText = `${name}`;

  return (
    <text
      x={x}
      y={y}
      fill="#555555"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {labelText}
    </text>
  );
};

export default function GaugeChart({ icon, text }) {
  return (
    <div className="flex flex-col items-center justify-center relative pb-12">
      <PieChart width={550} height={200}>
        <Pie
          data={data}
          cx={275}
          cy={200}
          startAngle={180}
          endAngle={0}
          labelLine={false}
          label={renderCustomizedLabel}
          innerRadius={100} // Adjust for background track width
          outerRadius={120}
          fill="#ccc" // Light gray color for background track
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>

      <div className="text-center mt-4 flex flex-col items-center absolute bottom-0 py-4">
        <div className="py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7"
            height="43"
            viewBox="0 0 7 43"
            fill="none"
          >
            <path
              d="M0.349558 39.457L4.24242 0L6.77986 39.5673C6.89909 41.4265 5.42327 43 3.56022 43C1.65321 43 0.162319 41.3548 0.349558 39.457Z"
              fill="#D9D9D9"
            />
          </svg>
        </div>
        <div>{icon}</div>
        <div className="text-[#888] text-sm font-medium mt-2">{text}</div>
      </div>
    </div>
  );
}
