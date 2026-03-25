import Image from "next/image";
import AttendanceChart from "./AttendanceChart";
import prisma from "@/lib/prisma";

const AttendanceChartContainer = async () => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysSinceMonday);

  console.log({today, dayOfWeek, daysSinceMonday, lastMonday})
  const data = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastMonday,
        lte: today,
      }
    },
    select: {
      date: true,
      present: true,
    }
  })
  console.log(data)
  return (
    <div className="h-full rounded-xl bg-white p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Attendance</h3>
        <Image src="/moreDark.png" alt="more dot icon" width={20} height={20} />
      </div>
      <AttendanceChart />
    </div>
  );
};

export default AttendanceChartContainer;
