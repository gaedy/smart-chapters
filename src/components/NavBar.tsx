import { auth } from "auth";
import SearchBar from "./Search/searchBar";
import { NavUser } from "./Sidebar/nav-user";
import { SidebarMenuButton, SidebarTrigger } from "./Sidebar/sidebar";
import NavHeader from "./Navheader";

export default async function Navbar() {
  const session = await auth();

  const data = {
    user: {
      name: session?.user?.name ?? "Guest",
      email: session?.user?.email ?? "guest@example.com",
      avatar: session?.user?.image ?? "/avatar.jpg",
    },
  };

  return (
    <div className="h-12 flex justify-between  gap-2 items-center">

      {/* <div className="block md:hidden">
        <SidebarMenuButton asChild>
          <SidebarTrigger />
        </SidebarMenuButton>
      </div> */}

      {/* <NavHeader
        defaultText={`Welcome Back, ${session?.user?.name?.split(" ")[0]}!`}
      /> */}

      <div className="w-sm ">
        <SearchBar />
      </div>

      <div>
        <NavUser onlyAvatar={true} user={data.user} />
      </div>
    </div>
  );
}
