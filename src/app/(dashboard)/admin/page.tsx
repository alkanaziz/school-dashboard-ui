import UserCard from "@/components/UserCard";

const AdminPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4 lg:flex-row">
      {/* LEFT */}
      <div className="lg:w-2/3">
        {/* USER CARD */}
        <div className="flex justify-between gap-4 flex-wrap">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="staff" />
        </div>
      </div>
      {/* RIGHT */}
      <div className="bg-blue-200 lg:w-1/3">r</div>
    </div>
  );
};

export default AdminPage;
