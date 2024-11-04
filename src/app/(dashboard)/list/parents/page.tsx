import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { role, parentsData } from "@/lib/data";
import Link from "next/link";
import FormModal from "@/components/FormModal";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Parent, Prisma, Student } from "@prisma/client";

type ParentList = Parent & { students: Student[] };

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

const renderRow = (item: ParentList) => (
  <tr
    className="border-b border-gray-300 text-sm even:bg-slate-100 hover:bg-privatPurpleLight"
    key={item.id}
  >
    <td className="flex items-center gap-4 p-4">
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <span className="text-sm text-gray-500">{item?.email}</span>
      </div>
    </td>
    <td className="hidden md:table-cell">
      <span>{item.students.map((student) => student.name).join(", ")}</span>
    </td>
    <td className="hidden lg:table-cell">
      <span>{item.phone}</span>
    </td>
    <td className="hidden lg:table-cell">
      <span>{item.address}</span>
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
            <FormModal table="parent" type="update" data={item} />
            <FormModal table="parent" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const ParentsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL QUERY PARAMS CONDITION
  const query: Prisma.ParentWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (!value) {
        delete queryParams[key];
      } else {
        switch (key) {
          case "search": {
            query.OR = [
              {
                name: {
                  contains: value,
                  mode: "insensitive",
                },
              },
              {
                username: {
                  contains: value,
                  mode: "insensitive",
                },
              },
              {
                email: {
                  contains: value,
                  mode: "insensitive",
                },
              },
              {
                phone: {
                  contains: value,
                  mode: "insensitive",
                },
              },
              {
                students: {
                  some: {
                    name: {
                      contains: value,
                      mode: "insensitive",
                    },
                  },
                },
              },
            ];
            break;
          }
        }
      }
    }
  }

  const [parents, count] = await prisma.$transaction([
    prisma.parent.findMany({
      where: query,
      include: {
        students: true,
      },
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
    }),
    prisma.parent.count({
      where: query,
    }),
  ]);

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
      <Table columns={columns} renderRow={renderRow} data={parents} />
      {/* PAGINATION */}
      <Pagination count={count} page={p} />
    </div>
  );
};

export default ParentsListPage;
