import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
// import { role, resultsData } from "@/lib/data";
import Link from "next/link";
import FormModal from "@/components/FormModal";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { currentUserId, role } from "@/lib/utils";

type ResultList = {
  id: number;
  title: string;
  class: string;
  teacher: string;
  student: string;
  startTime: Date;
  type: "exam" | "assignment";
  score: number;
};

const columns = [
  { header: "Title", accessor: "title" },
  {
    header: "Student",
    accessor: "student",
    className: "hidden md:table-cell",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  ...(role === "admin" || role === "teacher"
    ? [
        {
          header: "Actions",
          accessor: "actions",
        },
      ]
    : []),
];

const renderRow = (item: ResultList) => (
  <tr
    className="border-b border-gray-300 text-sm even:bg-slate-100 hover:bg-privatPurpleLight"
    key={item.id}
  >
    <td className="flex items-center gap-4 p-4">
      <h3 className="font-semibold">{item.title}</h3>
    </td>
    <td className="hidden md:table-cell">
      <span>{item.student}</span>
    </td>
    <td className="hidden md:table-cell">
      <span>{item.score}</span>
    </td>
    <td className="hidden md:table-cell">
      <span>{item.teacher}</span>
    </td>
    <td className="hidden md:table-cell">
      <span>{item.class}</span>
    </td>
    <td className="hidden md:table-cell">
      <span>{new Intl.DateTimeFormat("de-De").format(item.startTime)}</span>
    </td>
    <td>
      <div className="flex items-center gap-2">
        {(role === "admin" || role === "teacher") && (
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
            <FormModal table="result" type="update" data={item} />
            <FormModal table="result" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const ResultsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL QUERY PARAMS CONDITION
  const query: Prisma.ResultWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (!value) {
        delete queryParams[key];
      } else {
        switch (key) {
          case "studentId":
            query.studentId = value;
            break;
          case "search":
            query.OR = [
              {
                exam: {
                  OR: [
                    { title: { contains: value, mode: "insensitive" } },
                    {
                      lesson: {
                        teacher: {
                          OR: [
                            { name: { contains: value, mode: "insensitive" } },
                            {
                              surname: { contains: value, mode: "insensitive" },
                            },
                          ],
                        },
                      },
                    },
                  ],
                },
              },
              {
                assignment: {
                  OR: [
                    { title: { contains: value, mode: "insensitive" } },
                    {
                      lesson: {
                        teacher: {
                          OR: [
                            { name: { contains: value, mode: "insensitive" } },
                            {
                              surname: { contains: value, mode: "insensitive" },
                            },
                          ],
                        },
                      },
                    },
                  ],
                },
              },
              {
                student: {
                  name: { contains: value, mode: "insensitive" },
                },
              },
            ];
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
        { exam: { lesson: { teacherId: currentUserId! } } },
        { assignment: { lesson: { teacherId: currentUserId! } } },
      ];
      break;
    case "student":
      query.studentId = currentUserId!;
      break;
    case "parent":
      query.student = { parentId: currentUserId! };
      break;
    default:
      break;
  }

  const [dataRes, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        exam: {
          include: {
            lesson: {
              select: {
                subject: { select: { name: true } },
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              select: {
                subject: { select: { name: true } },
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
        student: {
          select: { name: true, surname: true },
        },
      },
      take: ITEM_PER_PAGE,
      skip: (p - 1) * ITEM_PER_PAGE,
    }),
    prisma.result.count({
      where: query,
    }),
  ]);

  const data = dataRes.map((item) => {
    const assessment = item.exam || item.assignment;

    if (!assessment) return null;

    const isExam = "startTime" in assessment;

    return {
      id: item.id,
      title: assessment.title,
      student: `${item.student.name} ${item.student.surname}`,
      teacher: `${assessment.lesson.teacher.name} ${assessment.lesson.teacher.surname}`,
      score: item.score,
      class: assessment.lesson.class.name,
      startTime: isExam ? assessment.startTime : assessment.startDate,
    };
  });

  return (
    <div className="m-4 mt-0 flex-1 rounded-md bg-white p-4">
      {/* TOP SECTION */}
      <div className="flex justify-between">
        <h1 className="hidden text-lg font-semibold md:block">All Results</h1>
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
            {(role === "admin" || role === "teacher") && (
              // <button className="rounded-full bg-privatYellow p-2">
              //   <Image src="/plus.png" alt="plus icon" width={16} height={16} />
              // </button>
              <FormModal table="result" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default ResultsListPage;
