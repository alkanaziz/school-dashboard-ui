"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TableSearch = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = (e.currentTarget[0] as HTMLInputElement).value;
    console.log(value);
    const params = new URLSearchParams(window.location.search);
    params.set("search", value.toString());
    params.delete("page");
    router.push(`${window.location.pathname}?${params}`);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center justify-between gap-2 rounded-full px-2 text-xs ring-[1.5px] ring-slate-300 md:w-auto"
      >
        <input
          className="w-[200px] bg-transparent p-2 outline-none"
          type="text"
          name=""
          id=""
          placeholder="Search..."
        />
        <button type="submit">
          <Image src="/search.png" alt="search icon" width={14} height={14} />
        </button>
      </form>
    </>
  );
};

export default TableSearch;
