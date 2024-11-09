import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { role, classesData } from "@/lib/data";
import Link from "next/link";
import FormModal from "@/components/FormModal";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Prisma, Teacher } from "@prisma/client";

type ClassList = Class & { supervisor: Teacher };

const columns = [
  { header: "Class Name", accessor: "item" },
  {
    header: "Capacity",
    accessor: "capacity",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "hidden md:table-cell",
  },
  { header: "Actions", accessor: "actions" },
];

const renderRow = (item: ClassList) => (
  <tr
    className="border-b border-gray-300 text-sm even:bg-slate-100 hover:bg-privatPurpleLight"
    key={item.id}
  >
    <td className="flex items-center gap-4 p-4">
      <h3 className="font-semibold">{item.name}</h3>
    </td>
    <td>
      <span>{item.capacity}</span>
    </td>
    <td className="hidden md:table-cell">
      <span>{item.name[0]}</span>
    </td>
    <td className="hidden md:table-cell">
      <span>{item.supervisor.name + " " + item.supervisor.surname}</span>
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
            <FormModal table="class" type="update" data={item} />
            <FormModal table="class" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const ClassListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL QUERY PARAMS CONDITION
  const query: Prisma.ClassWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (!value) {
        delete queryParams[key];
      } else {
        switch (key) {
          case "supervisorId":
            query.supervisorId = value;
            break;
          case "search":
            {
              query.OR = [
                {
                  name: {
                    contains: value,
                    mode: "insensitive",
                  },
                },
                {
                  supervisor: {
                    OR: [
                      { name: { contains: value, mode: "insensitive" } },
                      { surname: { contains: value, mode: "insensitive" } },
                    ],
                  },
                },
              ];
            }
            break;
          default:
            break;
        }
      }
    }
  }

  const [classes, count] = await prisma.$transaction([
    prisma.class.findMany({
      where: query,
      include: {
        supervisor: true,
      },
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
    }),
    prisma.class.count({
      where: query,
    }),
  ]);
  return (
    <div className="m-4 mt-0 flex-1 rounded-md bg-white p-4">
      {/* TOP SECTION */}
      <div className="flex justify-between">
        <h1 className="hidden text-lg font-semibold md:block">All Classes</h1>
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
              <FormModal table="class" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={classes} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default ClassListPage;
