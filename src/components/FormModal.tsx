"use client";

import Image from "next/image";
import { useState } from "react";
import TeacherForm from "./forms/TeacherForm";

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}) => {
  const size = type === "create" ? "size-8" : "size-7";
  const bgColor =
    type === "create"
      ? "bg-privatYellow"
      : type === "update"
        ? "bg-privatSky"
        : "bg-privatPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === "delete" && id ? (
      <form className="flex flex-col gap-4 p-4">
        <span className="text-center font-medium">
          All data will be lost. Are you sure to delete this {table}?
        </span>
        <button className="w-max self-center rounded-md border-none bg-red-700 px-4 py-2 font-medium text-white hover:bg-red-600">
          Delete
        </button>
      </form>
    ) : (
      <TeacherForm type="create" />
    );
  };
  return (
    <>
      <button
        className={`${size} ${bgColor} flex items-center justify-center rounded-full`}
        onClick={() => setOpen(true)}
      >
        <Image
          src={`/${type}.png`}
          alt={`${type} button`}
          width={16}
          height={16}
        />
      </button>
      {open && (
        <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-slate-950 bg-opacity-60">
          <div className="relative max-h-[90vh] w-[90%] overflow-y-auto rounded-md bg-white p-4 md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image
                src="/close.png"
                alt="close button"
                width={14}
                height={14}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
