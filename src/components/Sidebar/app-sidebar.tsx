"use client";
import * as React from "react";
import {
  Earth,
  Heart,
  House,
  Library,
  NotepadText,
  PieChart,
  Settings,
  UserRound,
} from "lucide-react";
import { NavMain } from "@/components/Sidebar/nav-main";
import { NavProjects } from "@/components/Sidebar/nav-projects";
import { NavSecondary } from "@/components/Sidebar/nav-secondary";
import { NavUser } from "@/components/Sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/Sidebar/sidebar";
import { usePathname } from "next/navigation";

import { useSession } from "next-auth/react";
import Logo from "../ui/Logo";

export function AppSidebar({
  libraryCount = 0,
  initialUser,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  libraryCount?: number;
  initialUser?: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { state, isMobile } = useSidebar();

  const pathname = usePathname();

  const { data: session } = useSession();
  const user = {
    name: session?.user?.name ?? initialUser?.name ?? "Guest",
    email: session?.user?.email ?? initialUser?.email ?? "guest@example.com",
    avatar: session?.user?.image ?? initialUser?.avatar ?? "/avatar.jpg",
  };

  const data = {
    user,
    navMain: [
      {
        title: "Home",
        url: "/",
        icon: House,
        isActive: pathname === "/",
      },

      {
        title: "Explore",
        url: "/explore",
        icon: Earth,
        isActive: pathname.startsWith("/explore"),
      },

      {
        title: "Library",

        url: "/library",
        icon: Library,
        count: libraryCount,
        isActive: pathname.startsWith("/library"),
      },
    ],
    navSecondary: [
      {
        title: "My Account",
        url: "/account",
        isActive: pathname === "/account",
        icon: UserRound,
      },
      {
        title: "Settings",
        url: "/settings",
        isActive: pathname === "/settings",
        icon: Settings,
      },
    ],
    projects: [
      {
        name: "Notes & Quotes",
        url: "/notes",
        isActive: pathname === "/notes",
        icon: NotepadText,
      },
      {
        name: "Statistics",
        url: "/stats",
        isActive: pathname === "/stats",
        icon: PieChart,
      },
      {
        name: "Favorites",
        url: "/favorites",
        isActive: pathname === "/favorites",
        icon: Heart,
      },
    ],
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="p-0">
        <div
          className={`grid h-12 items-center rounded-lg px-2 transition-[width,grid-template-columns] duration-300 ease-in-out ${
            state === "collapsed" && !isMobile
              ? "mx-auto w-12 grid-cols-[0rem_2rem] justify-center px-0"
              : "w-full grid-cols-[minmax(0,1fr)_2rem] gap-2"
          }`}
        >
          <div
            className={`min-w-0 overflow-hidden text-sm leading-tight transition-[opacity,transform] duration-200 ease-out ${
              state === "collapsed" && !isMobile
                ? "-translate-x-1 opacity-0"
                : "translate-x-0 opacity-100 delay-75"
            }`}
            aria-hidden={state === "collapsed" && !isMobile}
          >
            <Logo className="block whitespace-nowrap" />
          </div>

          <SidebarTrigger
            aria-label={
              isMobile
                ? "Close sidebar"
                : state === "collapsed"
                  ? "Expand sidebar"
                  : "Collapse sidebar"
            }
            className="size-9 shrink-0 place-self-center rounded-full text-muted-foreground hover:bg-foreground-dark hover:text-primary md:size-9"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
