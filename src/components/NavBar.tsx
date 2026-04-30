import { auth } from "auth";
import SearchBar from "./Search/searchBar";
import { NavUser } from "./Sidebar/nav-user";
import { SidebarTrigger } from "./Sidebar/sidebar";
import { QuickSettingsDropdown } from "./settings/QuickSettingsDropdown";

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
    <div className="flex h-12 px-2 md:px-0 items-center justify-between gap-2">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div className="block md:hidden">
          <SidebarTrigger
            aria-label="Open sidebar"
            className="size-9 shrink-0 place-self-center rounded-full bg-foreground text-muted-foreground hover:bg-foreground hover:text-primary"
          />
        </div>

        <div className="w-full max-w-md">
          <SearchBar />
        </div>
      </div>
      <QuickSettingsDropdown />
      <div className="flex items-center">
        <NavUser onlyAvatar={true} user={data.user} />
      </div>
    </div>
  );
}
