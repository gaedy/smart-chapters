import {
  BookHeart,
  ChartNoAxesCombined,
  EarthIcon,
  House,
  LibraryBig,
  NotepadText,
  Settings,
 
} from "lucide-react";
import Search from "./search";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className=" w-1/5 min-w-52 flex-col gap-2 flex ">
      <div className="flex justify-center items-center p-4 font-medium text-lg">
        <p>Smart Chapters</p>
      </div>
      <Search />
      <div className="flex flex-col text-sm mt-6">
        <div className="flex gap-1 flex-col font-medium">


          <Link href="/">
            <button className="p-2 px-2.5 w-full transition-colors active:bg-foregroundClicked rounded-lg hover:bg-[#FFE99A] cursor-pointer flex items-center gap-2">
              <House size={22} />
              <p>Home</p>
            </button>
          </Link>

          <Link href="/explore">
            <button className="p-2 w-full px-2.5 rounded-lg  hover:bg-[#FFE99A] cursor-pointer flex items-center gap-2">
              <EarthIcon size={22} />
              <p>Explore</p>
            </button>
          </Link>

          <Link href="/library">
            <button className="p-2 w-full px-2.5 rounded-lg  hover:bg-[#FFE99A] cursor-pointer flex items-center gap-2">
              <LibraryBig size={22} />
              <p>Library</p>
            </button>
          </Link>

          <hr className="my-2 opacity-20 mx-5" />

          <Link href="/notes">
            <button className="p-2 w-full px-2.5 rounded-lg  hover:bg-[#FFE99A] cursor-pointer flex items-center gap-2">
              <NotepadText size={22} />
              <p>Notes</p>
            </button>
          </Link>

          <Link href="/stats">
            <button className="p-2 w-full px-2.5 rounded-lg  hover:bg-[#FFE99A] cursor-pointer flex items-center gap-2">
              <ChartNoAxesCombined size={22} />
              <p>Stats</p>
            </button>
          </Link>

          <Link href="/favorites">
            <button className="p-2 px-2.5 rounded-lg hover:bg-[#FFE99A] cursor-pointer flex items-center gap-2">
              <BookHeart size={22} />
              <p>Favorites</p>
            </button>
          </Link>
          <hr className="my-2 opacity-20 mx-5" />

          <Link href="/settings">
            <button className="p-2 px-2.5 rounded-lg hover:bg-[#FFE99A] cursor-pointer flex items-center gap-2">
              <Settings size={22} />
              <p>Settings</p>
            </button>
          </Link>
        </div>
      </div>

      <p className="mt-auto h-14 bg-fuchsia-400 rounded-lg">profile</p>
    </div>
  );
}
