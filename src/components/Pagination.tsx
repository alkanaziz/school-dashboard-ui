import Image from "next/image";

const Pagination = () => {
  return (
    <div className="flex items-center justify-between p-4 text-slate-500">
      <button
        disabled
        className="rounded-md bg-slate-200 px-4 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50"
      >
        Prev
      </button>
      <div className="flex items-center justify-center gap-2 text-sm">
        <button className="rounded-md bg-privatSky px-2">1</button>
        <button className="rounded-md px-2">2</button>
        <button className="rounded-md px-2">3</button>
        ...
        <button className="rounded-md px-2">10</button>
      </div>
      <button className="rounded-md bg-slate-200 px-4 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50">
        Next
      </button>
    </div>
  );
};

export default Pagination;
