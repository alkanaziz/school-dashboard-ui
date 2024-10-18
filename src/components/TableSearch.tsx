import Image from "next/image";

const TableSearch = () => {
  return (
    <>
      <div className="flex w-full items-center justify-between gap-2 rounded-full px-2 text-xs ring-[1.5px] ring-slate-300 md:w-auto">
        <input
          className="w-[200px] bg-transparent p-2 outline-none"
          type="text"
          name=""
          id=""
          placeholder="Search..."
        />
        <Image src="/search.png" alt="search icon" width={14} height={14} />
      </div>
    </>
  );
};

export default TableSearch;
