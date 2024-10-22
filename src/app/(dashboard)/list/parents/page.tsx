import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { role, parentsData } from "@/lib/data";
import Link from "next/link";
import FormModal from "@/components/FormModal";

type Parent = {
  id: number;
  name: string;
  email?: string;
  students: string[];
  phone: string;
  address: string;
};

const columns = [
  { header: "Info", accessor: "info" },
  {
    header: "Student Names",
    accessor: "students",
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

const ParentsListPage = () => {
  const renderRow = (parent: Parent) => (
    <tr
      className="border-b border-gray-300 text-sm even:bg-slate-100 hover:bg-privatPurpleLight"
      key={parent.id}
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{parent.name}</h3>
          <span className="text-sm text-gray-500">{parent?.email}</span>
        </div>
      </td>
      <td className="hidden md:table-cell">
        <span>{parent.students.join(", ")}</span>
      </td>
      <td className="hidden lg:table-cell">
        <span>{parent.phone}</span>
      </td>
      <td className="hidden lg:table-cell">
        <span>{parent.address}</span>
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              {/* <button className="flex size-7 items-center justify-center rounded-full bg-privatSky">
                <Image src="/edit.png" alt="edit icon" width={16} height={16} />
              </button>
              <button className="flex size-7 items-center justify-center rounded-full bg-privatPurple">
                <Image
                  src="/delete.png"
                  alt="delete icon"
                  width={16}
                  height={16}
                />
              </button> */}
              <FormModal table="parent" type="update" data={parent} />
              <FormModal table="parent" type="delete" id={parent.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="m-4 mt-0 flex-1 rounded-md bg-white p-4">
      {/* TOP SECTION */}
      <div className="flex justify-between">
        <h1 className="hidden text-lg font-semibold md:block">All Parents</h1>
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
              <FormModal table="parent" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={parentsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default ParentsListPage;
