import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
// import { role, eventsData } from "@/lib/data";
import Link from "next/link";
import FormModal from "@/components/FormModal";
import { Class, Event, Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { currentUserId, role } from "@/lib/utils";

type EventList = Event & { class: Class };

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
  {
    header: "Start Time",
    accessor: "startTime",
    className: "hidden md:table-cell",
  },
  {
    header: "End Time",
    accessor: "endTime",
    className: "hidden md:table-cell",
  },
  ...(role === "admin"
    ? [
        {
          header: "Actions",
          accessor: "actions",
        },
      ]
    : []),
];

console.log(role);

const renderRow = (item: EventList) => (
  <tr
    className="border-b border-gray-300 text-sm even:bg-slate-100 hover:bg-privatPurpleLight"
    key={item.id}
  >
    <td className="flex items-center gap-4 p-4">
      <h3 className="font-semibold">{item.title}</h3>
    </td>
    <td>
      <span>{item.class?.name || "-"}</span>
    </td>
    <td className="hidden md:table-cell">
      <span>{new Intl.DateTimeFormat("de-DE").format(item.startTime)}</span>
    </td>
    <td className="hidden md:table-cell">
      <span>
        {item.startTime.toLocaleTimeString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </span>
    </td>
    <td className="hidden md:table-cell">
      <span>
        {item.endTime.toLocaleTimeString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </span>
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
            <FormModal table="event" type="update" data={item} />
            <FormModal table="event" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const EventsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  console.log(searchParams);
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL QUERY PARAMS CONDITION
  const query: Prisma.EventWhereInput = {};
  query.class = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (!value) {
        delete queryParams[key];
      } else {
        switch (key) {
          case "search":
            {
              query.OR = [
                {
                  title: {
                    contains: value,
                    mode: "insensitive",
                  },
                },
                {
                  class: {
                    name: {
                      contains: value,
                      mode: "insensitive",
                    },
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

  // ROLE CONDITION
  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.OR = [
        { classId: null },
        { class: { lessons: { some: { teacherId: currentUserId! } } } },
      ];
      break;
    case "student":
      query.OR = [
        { classId: null },
        { class: { students: { some: { id: currentUserId! } } } },
      ];
      break;
    case "parent":
      query.OR = [
        { classId: null },
        { class: { students: { some: { parentId: currentUserId! } } } },
      ];
      break;
    default:
      break;
  }

  // const roleConditions = {
  //   teacher: { class: { lessons: { some: { teacherId: currentUserId! } } } },
  //   student: { class: { students: { some: { id: currentUserId! } } } },
  //   parent: { class: { students: { some: { parentId: currentUserId! } } } },
  // };

  // query.OR = [
  //   { classId: null },
  //   roleConditions[role as keyof typeof roleConditions] || {},
  // ];

  const [events, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
    }),
    prisma.event.count({
      where: query,
    }),
  ]);

  return (
    <div className="m-4 mt-0 flex-1 rounded-md bg-white p-4">
      {/* TOP SECTION */}
      <div className="flex justify-between">
        <h1 className="hidden text-lg font-semibold md:block">All Events</h1>
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
              <FormModal table="event" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={events} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default EventsListPage;
