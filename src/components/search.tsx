import { SearchIcon } from "lucide-react";

export default function Search() {
  return (
    <div className="flex justify-between items-center bg-[#FFE99A] p-3 rounded-lg text-sm ">
      <div className="opacity-50">Search</div>
      <SearchIcon size={20} />
    </div>
  );
}
