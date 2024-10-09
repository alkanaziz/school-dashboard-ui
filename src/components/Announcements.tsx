import Image from "next/image";

const Announcements = () => {
  return (
    <div className="h-full rounded-lg bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Announcements</h2>
        <span className="text-sm text-slate-400">View All</span>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <div className="rounded-md bg-privatSkyLight p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Lorem, ipsum dolor.</h3>
            <span className="rounded-md bg-white p-1 text-xs text-slate-400">
              2025-01-01
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            consequatur?
          </p>
        </div>
        <div className="rounded-md bg-privatPurpleLight p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Lorem, ipsum dolor.</h3>
            <span className="rounded-md bg-white p-1 text-xs text-slate-400">
              2025-01-01
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            consequatur?
          </p>
        </div>
        <div className="rounded-md bg-privatYellowLight p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Lorem, ipsum dolor.</h3>
            <span className="rounded-md bg-white p-1 text-xs text-slate-400">
              2025-01-01
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            consequatur?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
