import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import Performance from "@/components/Performance";
import Image from "next/image";
import Link from "next/link";

const SingleStudentPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* USER INFO CARD  */}
          <div className="flex flex-1 gap-4 rounded-md bg-privatSky px-4 py-6">
            <div className="flex w-1/3 items-center justify-center">
              <Image
                src="https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200"
                className="size-36 rounded-full object-cover"
                alt="user icon"
                width={144}
                height={144}
              />
            </div>
            <div className="flex w-2/3 flex-col justify-center gap-4">
              <h1 className="text-xl font-semibold">John Doe</h1>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Excepturi, totam.
              </p>
              <div className="flex flex-wrap justify-between gap-2 text-xs font-medium">
                <div className="flex w-full items-center gap-2 md:w-1/3 lg:w-full 2xl:w-[48%]">
                  <Image
                    src="/blood.png"
                    alt="blood icon"
                    width={16}
                    height={16}
                    className="size-4"
                  />
                  <span>A+</span>
                </div>
                <div className="flex w-full items-center gap-2 md:w-1/3 lg:w-full 2xl:w-[48%]">
                  <Image
                    src="/date.png"
                    alt="date icon"
                    width={16}
                    height={16}
                    className="size-4"
                  />
                  <span>January 2025</span>
                </div>
                <div className="flex w-full items-center gap-2 md:w-1/3 lg:w-full 2xl:w-[48%]">
                  <Image
                    src="/mail.png"
                    alt="email icon"
                    width={16}
                    height={16}
                    className="size-4"
                  />
                  <span>johndoe@mail.de</span>
                </div>
                <div className="flex w-full items-center gap-2 md:w-1/3 lg:w-full 2xl:w-[48%]">
                  <Image
                    src="/phone.png"
                    alt="phone icon"
                    width={16}
                    height={16}
                    className="size-4"
                  />
                  <span>+49 123 456 789</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS  */}
          <div className="flex flex-1 flex-wrap justify-between gap-4">
            <div className="flex w-full gap-4 rounded-md bg-white p-4 md:w-[48%] lg:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleAttendance.png"
                alt="attendance icon"
                width={24}
                height={24}
                className="size-6"
              />
              <div className="">
                <span className="text-xl font-semibold">90%</span>
                <h2 className="text-sm text-gray-500">Attendance</h2>
              </div>
            </div>
            <div className="flex w-full gap-4 rounded-md bg-white p-4 md:w-[48%] lg:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleBranch.png"
                alt="attendance icon"
                width={24}
                height={24}
                className="size-6"
              />
              <div className="">
                <span className="text-xl font-semibold">6th</span>
                <h2 className="text-sm text-gray-500">Grade</h2>
              </div>
            </div>
            <div className="flex w-full gap-4 rounded-md bg-white p-4 md:w-[48%] lg:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleLesson.png"
                alt="attendance icon"
                width={24}
                height={24}
                className="size-6"
              />
              <div className="">
                <span className="text-xl font-semibold">18</span>
                <h2 className="text-sm text-gray-500">Lessons</h2>
              </div>
            </div>
            <div className="flex w-full gap-4 rounded-md bg-white p-4 md:w-[48%] lg:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleClass.png"
                alt="attendance icon"
                width={24}
                height={24}
                className="size-6"
              />
              <div className="">
                <span className="text-xl font-semibold">6A</span>
                <h2 className="text-sm text-gray-500">Class</h2>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM - TEACHER SCHEDULE */}
        <div className="mt-4 h-[800px] rounded-md bg-white p-4">
          <h2>Student`s Schedule</h2>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3">
        {/* Shortcuts */}
        <div className="rounded-md bg-white p-4">
          <h3 className="text-xl font-semibold">Shortcuts</h3>
          <div className="mt-4 flex flex-wrap gap-4 text-xs">
            <Link
              className="rounded-md bg-privatSkyLight p-3 text-gray-500"
              href={`/list/lessons?classId=${3}`}
            >
              Student's Lessons
            </Link>
            <Link
              className="rounded-md bg-privatPurpleLight p-3 text-gray-500"
              href={`/list/teachers?classId=${2}`}
            >
              Student's Teachers
            </Link>
            <Link
              className="rounded-md bg-red-100 p-3 text-gray-500"
              href="/dashboard/list/teachers"
            >
              Student's Exams
            </Link>
            <Link
              className="rounded-md bg-privatSkyLight p-3 text-gray-500"
              href="/dashboard/list/teachers"
            >
              Student's Assignments
            </Link>
            <Link
              className="rounded-md bg-privatYellowLight p-3 text-gray-500"
              href="/dashboard/list/teachers"
            >
              Student's Results
            </Link>
          </div>
        </div>
        {/* Performance */}
        <Performance />
        {/* Announcement */}
        <div className="mt-4">
          <Announcements />
        </div>
      </div>
    </div>
  );
};

export default SingleStudentPage;
