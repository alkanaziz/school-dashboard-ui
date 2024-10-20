"use client";

import Image from "next/image";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 92, fill: "#C3EBFA" },
  { name: "Group B", value: 8, fill: "#FAE27C" },
];

const Performance = () => {
  return (
    <div className="relative mt-4 h-80 rounded-md bg-white p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Performance</h3>
        <Image src="/moreDark.png" alt="moreDark icon" width={16} height={16} />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
        <p className="text-3xl font-bold">9.2</p>
        <p className="text-sm text-gray-500">of 10 max TS</p>
      </div>
      <h4 className="absolute bottom-16 left-0 right-0 text-center font-medium">
        1st Semester - 2nd Semester
      </h4>
    </div>
  );
};

export default Performance;
