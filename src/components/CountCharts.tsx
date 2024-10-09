"use client";

import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Total",
    count: 103,
    fill: "white",
  },
  {
    name: "Girls",
    count: 50,
    fill: "#FAE27C",
  },
  {
    name: "Boys",
    count: 53,
    fill: "#C3EBFA",
  },
];

const style = {
  top: "50%",
  right: 0,
  transform: "translate(0, -50%)",
  lineHeight: "24px",
};

const CountCharts = () => {
  return (
    <div className="size-full rounded-xl bg-white p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Students</h3>
        <Image src="/moreDark.png" alt="more icon" width={20} height={20} />
      </div>
      <div className="chart relative h-[75%] w-full">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image src="/maleFemale.png" alt="male female icon" width={50} height={50} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="size-5 rounded-full bg-privatSky"></div>
          <p className="font-bold">1234</p>
          <p className="text-sm text-slate-400">Boys (55%)</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="size-5 rounded-full bg-privatYellow"></div>
          <p className="font-bold">1234</p>
          <p className="text-sm text-slate-400">Girls (45%)</p>
        </div>
      </div>
    </div>
  );
};

export default CountCharts;
