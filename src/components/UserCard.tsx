import Image from "next/image";

const UserCard = ({ type }: { type: string }) => {
  return (
    <div className="flex min-w-[130px] flex-1 flex-col gap-6 rounded-2xl p-4 odd:bg-privatPurple even:bg-privatYellow">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-slate-100 px-2 py-1 text-sm text-slate-600">
          2024/25
        </span>
        <Image src="/more.png" alt="more icon" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold">3545</h1>
      <h2 className="text-sm font-medium capitalize text-slate-500">{type}s</h2>
    </div>
  );
};

export default UserCard;
