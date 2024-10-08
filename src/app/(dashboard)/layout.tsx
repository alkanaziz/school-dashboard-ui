import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      {/* LEFT */}
      <div className="w-[14%] overflow-scroll no-scrollbar md:w-[8%] lg:w-1/6 xl:w-[14%]">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 p-4 lg:justify-start"
        >
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block">School MS</span>
        </Link>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-[86%] overflow-scroll no-scrollbar bg-slate-100 md:w-[92%] lg:w-5/6 xl:w-[86%]">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
