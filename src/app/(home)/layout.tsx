import Navbar from "@/components/NavBar";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex justify-between w-full h-screen overflow-hidden bg-background ">
        <div>
          <AppSidebar />
        </div>

        {/* main content */}
        <div className="flex flex-col gap-2  flex-1 py-2 md:py-2 md:pr-2 md:px-0 px-2 overflow-hidden">
          <Navbar />
          <div className="sticky top-0 bg-foreground overflow-y-auto rounded-3xl flex-1 flex flex-col scrollbar-overlay">
            <div className="p-4 flex flex-col gap-4 overflow-x-hidden  pr-2 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
