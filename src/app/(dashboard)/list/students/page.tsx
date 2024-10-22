import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { role, studentsData } from "@/lib/data";
import Link from "next/link";
import FormModal from "@/components/FormModal";

type Student = {
  id: number;
  studentId: string;
  name: string;
  email?: string;
  photo: string;
  grade: number;
  class: string;
  phone?: string;
  address: string;
};

const columns = [
  { header: "Info", accessor: "info" },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  { header: "Actions", accessor: "actions" },
];

const StudentListPage = () => {
  const renderRow = (student: Student) => (
    <tr
      className="border-b border-gray-300 text-sm even:bg-slate-100 hover:bg-privatPurpleLight"
      key={student.id}
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={student.photo}
          alt={student.name}
          width={40}
          height={40}
          className="size-10 rounded-full object-cover md:hidden xl:block"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{student.name}</h3>
          <span className="text-sm text-gray-500">{student?.class}</span>
        </div>
      </td>
      <td className="hidden md:table-cell">
        <span>{student.studentId}</span>
      </td>
      <td className="hidden md:table-cell">
        <span>{student.grade}</span>
      </td>
      <td className="hidden lg:table-cell">
        <span>{student.phone}</span>
      </td>
      <td className="hidden lg:table-cell">
        <span>{student.address}</span>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${student.studentId}`}>
            <button className="flex size-7 items-center justify-center rounded-full bg-privatSky">
              <Image src="/view.png" alt="view icon" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            // <button className="flex size-7 items-center justify-center rounded-full bg-privatPurple">
            //   <Image
            //     src="/delete.png"
            //     alt="delete icon"
            //     width={16}
            //     height={16}
            //   />
            // </button>
            <FormModal table="student" type="delete" id={student.id} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="m-4 mt-0 flex-1 rounded-md bg-white p-4">
      {/* TOP SECTION */}
      <div className="flex justify-between">
        <h1 className="hidden text-lg font-semibold md:block">All Students</h1>
        <div className="flex w-full flex-col items-center justify-center gap-4 md:w-auto md:flex-row">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="rounded-full bg-privatYellow p-2">
              <Image
                src="/filter.png"
                alt="filter icon"
                width={16}
                height={16}
              />
            </button>
            <button className="rounded-full bg-privatYellow p-2">
              <Image src="/sort.png" alt="sort icon" width={16} height={16} />
            </button>
            {role === "admin" && (
              // <button className="rounded-full bg-privatYellow p-2">
              //   <Image src="/plus.png" alt="plus icon" width={16} height={16} />
              // </button>
              <FormModal table="student" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={studentsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default StudentListPage;
