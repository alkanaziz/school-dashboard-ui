import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { role, announcementsData } from "@/lib/data";
import FormModal from "@/components/FormModal";

type Announcement = {
  id: number;
  title: string;
  class: string;
  date: string;
};

const columns = [
  { header: "Title", accessor: "title" },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  { header: "Actions", accessor: "actions" },
];

const AnnouncementsListPage = () => {
  const renderRow = (item: Announcement) => (
    <tr
      className="border-b border-gray-300 text-sm even:bg-slate-100 hover:bg-privatPurpleLight"
      key={item.id}
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-semibold">{item.title}</h3>
      </td>
      <td>
        <span>{item.class}</span>
      </td>
      <td className="hidden md:table-cell">
        <span>{item.date}</span>
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
              <FormModal table="announcement" type="update" data={item} />
              <FormModal table="announcement" type="delete" id={item.id} />
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
        <h1 className="hidden text-lg font-semibold md:block">
          All Announcements
        </h1>
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
              <FormModal table="announcement" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={announcementsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default AnnouncementsListPage;
