import { SearchIcon } from "lucide-react";

export default function Search() {
  return (
    <div
      className="flex justify-between gap-2 px-3 transition-all duration-300 
    hover:shadow-xl focus-within:shadow-xl focus-within:bg-foregroundClicked items-center bg-foreground w-full h-10 rounded-lg text-sm "
    >
      <input
        className="w-full h-full p-1 outline-0"
        placeholder="Search here"
      ></input>
      {/* <div className="opacity-50">Search</div> */}
      <SearchIcon size={24} className="cursor-pointer" />
    </div>
  );
}
