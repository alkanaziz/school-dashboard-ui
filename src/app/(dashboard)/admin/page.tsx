import AttendanceChart from "@/components/AttendanceChart";
import CountCharts from "@/components/CountCharts";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

const AdminPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4 lg:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARD */}
        <div className="flex flex-wrap justify-between gap-4">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="staff" />
        </div>
        {/* MIDDLE CHART */}
        <div className="middle-chart flex flex-col gap-4 lg:flex-row">
          {/* COUNT CHART */}
          <div className="h-[450px] w-full lg:w-1/3">
            <CountCharts />
          </div>
          {/* ATTENDANCE CHART */}
          <div className="h-[450px] w-full lg:w-2/3">
            <AttendanceChart />
          </div>
        </div>
        {/* BOTTOM CHART */}
        <div className="bottom-chart w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      {/* RIGHT */}
      <div className="bg-blue-200 lg:w-1/3">r</div>
    </div>
  );
};

export default AdminPage;
