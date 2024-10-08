import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      {/* SEARCH BAR */}
      <div className="hidden items-center gap-2 rounded-full px-2 text-xs ring-[1.5px] ring-slate-300 md:flex">
        <input
          className="w-[200px] bg-transparent p-2 outline-none"
          type="text"
          name=""
          id=""
          placeholder="Search..."
        />
        <Image src="/search.png" alt="search icon" width={14} height={14} />
      </div>

      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="flex size-7 items-center justify-center rounded-full bg-slate-200">
          <Image src="/message.png" alt="message icon" width={20} height={20} />
        </div>
        <div className="relative flex size-7 items-center justify-center rounded-full bg-slate-200">
          <Image
            src="/announcement.png"
            alt="announcement icon"
            width={20}
            height={20}
          />
          <div className="absolute -right-3 -top-2 flex size-5 items-center justify-center rounded-full bg-purple-500">
            <span className="text-xs text-white">1</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold leading-3">
            John Doe
          </span>
          <span className="text-right text-[10px] text-slate-400">
            Admin
          </span>
        </div>
        <Image
          src="/avatar.png"
          alt="profile icon"
          width={36}
          height={36}
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
