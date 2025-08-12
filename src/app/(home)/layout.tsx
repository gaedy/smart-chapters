import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { NavUser } from "@/components/Sidebar/nav-user";

import {
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/Sidebar/sidebar";
import { auth } from "auth";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const data = {
    user: {
      name: session?.user?.name ?? "Guest",
      email: session?.user?.email ?? "guest@example.com",
      avatar: session?.user?.image ?? "/avatar.jpg",
    },
  };
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="top-0 p-2 md:hidden  sticky overflow-hidden flex justify-between items-center">
        <div>
          <SidebarMenuButton asChild>
            <SidebarTrigger className="hover:bg-foreground" />
          </SidebarMenuButton>
        </div>

        <div>
          <NavUser onlyAvatar={true} user={data.user} />
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
            className="sticky font-merriweather top-0 bg-foreground overflow-x-hidden overflow-auto 
             p-4 rounded-xl flex-1 flex flex-col"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
