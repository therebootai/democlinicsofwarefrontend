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
  const { name } = payload;
  const radius = outerRadius + 10;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#555555"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="xlg:text-xs text-[10px]"
    >
      {name}
    </text>
  );
};

export default function GaugeChart({ icon, text }) {
  return (
    <div className="flex flex-col items-center justify-center relative">
      <PieChart width={300} height={150}>
        {" "}
        {/* Reduce chart size */}
        <Pie
          data={data}
          cx={150}
          cy={120}
          startAngle={180}
          endAngle={0}
          labelLine={false}
          label={renderCustomizedLabel}
          innerRadius={80}
          outerRadius={93}
          fill="#ccc"
          dataKey="value"
          className=" !outline-none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>

      <div className="text-center mt-2 flex flex-col items-center absolute bottom-0 pb-2">
        {" "}
        {/* Adjust padding */}
        <div className="pb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="40" // Reduce the size of the gauge needle
            viewBox="0 0 7 40"
            fill="none"
          >
            <path
              d="M0.349558 39.457L4.24242 0L6.77986 39.5673C6.89909 41.4265 5.42327 43 3.56022 43C1.65321 43 0.162319 41.3548 0.349558 39.457Z"
              fill="#D9D9D9"
            />
          </svg>
        </div>
        <div>{icon}</div>
        <div className="text-[#888] text-xs font-medium mt-1">{text}</div>{" "}
        {/* Adjust text size */}
      </div>
    </div>
  );
}
