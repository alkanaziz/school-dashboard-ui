import Image from "next/image"

const UserCard = ({type}:{type:string}) => {
  return (
    <div className='rounded-2xl odd:bg-privatPurple flex flex-col gap-6 even:bg-privatSky flex-1 p-4 min-w-[130px]'>
      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded-full">2024/25</span>
        <Image src="/more.png" alt="more icon" width={20} height={20} />
      </div>
      <h1 className="text-2xl">3545</h1>
      <h2 className="capitalize text-sm font-medium text-slate-500">{type}s</h2>
    </div>
  )
}

export default UserCard