import { auth } from "auth";
import { AddCustomBookNavbarAction } from "./AddCustomBookNavbarAction";
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
    <div className="grid w-full gap-2 px-0 sm:px-2 md:flex md:h-12 md:items-center md:justify-between md:px-0">
      <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 md:flex md:flex-1">
        <div className="block md:hidden">
          <SidebarTrigger
            aria-label="Open sidebar"
            className="size-11 shrink-0 place-self-center rounded-full bg-foreground text-muted-foreground hover:bg-foreground-dark hover:text-primary"
          />
        </div>

        <div className="min-w-0 md:w-full md:max-w-md">
          <SearchBar />
        </div>

        <div className="flex md:hidden">
          <NavUser onlyAvatar={true} user={data.user} />
        </div>
      </div>
      <div className="hidden min-w-0 items-center justify-end gap-2 md:flex md:shrink-0">
        <AddCustomBookNavbarAction />
        <QuickSettingsDropdown />
      </div>
      <div className="hidden items-center md:flex">
        <NavUser onlyAvatar={true} user={data.user} />
      </div>
    </div>
  );
}
