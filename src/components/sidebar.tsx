import { LayoutGrid } from "lucide-react";
import Search from "./search";

export default function Sidebar() {
  return (
    <div className=" w-1/5 min-w-52 flex-col gap-2 flex">
      <div className="flex justify-center items-center p-4 font-medium text-lg">
        <p>Smart Chapters</p>
      </div>
      <Search />
      <div className="flex flex-col text-sm mt-6">
        <div className="flex gap-1 flex-col">
          <button className="p-2 px-2.5 rounded-lg hover:bg-[#FFE99A] cursor-pointer flex items-center gap-2">
            <LayoutGrid size={20} />
            <p>Dashboard</p>
          </button>
        </div>
      </div>

      <p className="mt-auto h-14 bg-fuchsia-400 rounded-lg">profile</p>
    </div>
  );
}
