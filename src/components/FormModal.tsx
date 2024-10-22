"use client";

import Image from "next/image";
import { useState } from "react";

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
        <div className="absolute z-50 left-0 top-0 flex h-screen w-screen items-center justify-center bg-slate-950 bg-opacity-60">
          <div className="m-auto rounded-md bg-white p-2">Hello</div>
        </div>
      )}
    </>
  );
};

export default FormModal;
