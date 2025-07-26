import { AppSidebar } from "@/components/app-sidebar";
import { NavUser } from "@/components/nav-user";

import { SidebarTrigger } from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};
export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="top-0 p-2 md:hidden  sticky overflow-hidden flex justify-between items-center">
        <div>
          <SidebarTrigger className="hover:bg-foreground" />
        </div>

        {/* <div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate text-lg font-medium font-libre">
              Smart Chapters
            </span>
          </div>
        </div> */}

        <div>
          <NavUser user={data.user} />
        </div>
      </div>

      <div className="flex justify-between w-full h-screen overflow-hidden bg-background ">
        {/* Sidebar */}
        <div>
          <AppSidebar />
        </div>

        {/* main content */}
        <div className="flex flex-col flex-1 py-2 md:pr-2 md:px-0 px-2  overflow-x-hidden overflow-y-auto">
          <div
            className="sticky top-0 bg-foreground overflow-x-hidden overflow-auto 
            font-libre p-4 rounded-xl flex-1 flex flex-col"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
