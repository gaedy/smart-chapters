import { auth } from "auth";
import SearchBar from "./Search/searchBar";
import { NavUser } from "./Sidebar/nav-user";
import { SidebarTrigger } from "./Sidebar/sidebar";

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
    <div className="h-12 flex justify-between gap-2 items-center">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div className="block md:hidden">
          <SidebarTrigger
            aria-label="Open sidebar"
            className="rounded-full bg-foreground text-muted-foreground hover:bg-foreground hover:text-primary"
          />
        </div>

        <div className="w-sm max-w-full">
          <SearchBar />
        </div>
      </div>

      <div>
        <NavUser onlyAvatar={true} user={data.user} />
      </div>
    </div>
  );
}
