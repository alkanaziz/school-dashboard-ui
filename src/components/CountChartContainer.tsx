import Image from "next/image";
import CountCharts from "./CountCharts";
import prisma from "@/lib/prisma";

const CountChartContainer = async () => {
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });

  const boys = data.find((d) => d.sex === "MALE")?._count || 0;
  const girls = data.find((d) => d.sex === "FEMALE")?._count || 0;

  return (
    <div className="size-full rounded-xl bg-white p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Students</h3>
        <Image src="/moreDark.png" alt="more icon" width={20} height={20} />
      </div>
      <CountCharts boys={boys} girls={girls} />
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="size-5 rounded-full bg-privatSky"></div>
          <p className="font-bold">{boys}</p>
          <p className="text-sm text-slate-400">
            Boys ({Math.round((boys / (boys + girls)) * 100)}%)
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="size-5 rounded-full bg-privatYellow"></div>
          <p className="font-bold">{girls}</p>
          <p className="text-sm text-slate-400">
            Girls ({Math.round((girls / (boys + girls)) * 100)}%)
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountChartContainer;
