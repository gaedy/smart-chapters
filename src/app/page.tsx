import BookDetails from "@/components/bookDetails";
import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <>
      <div className="flex justify-between w-full h-screen gap-2 p-2 bg-[#FAFFC5]">
        <Sidebar />
        <BookDetails />
      </div>
    </>
  );
}
