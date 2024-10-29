"use client";

import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter();
  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <div className="flex items-center justify-between p-4 text-slate-500">
      <button
        {...(page === 1 && { disabled: true })}
        className="rounded-md bg-slate-200 px-4 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => changePage(page - 1)}
      >
        Prev
      </button>
      <div className="flex items-center justify-center gap-2 text-sm">
        {Array.from({ length: Math.ceil(count / ITEM_PER_PAGE) }).map(
          (_, i) => {
            const pageIndex = i + 1;
            return (
              <button
                key={i + 1}
                className={`rounded-md px-2 ${page === i + 1 ? "bg-privatSky" : ""}`}
                onClick={() => changePage(pageIndex)}
              >
                {i + 1}
              </button>
            );
          },
        )}
      </div>
      <button
        {...(page === Math.ceil(count / ITEM_PER_PAGE) && { disabled: true })}
        onClick={() => changePage(page + 1)}
        className="rounded-md bg-slate-200 px-4 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
