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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state, isMobile } = useSidebar();

  const pathname = usePathname();

  const { data: session } = useSession();

  const data = {
    user: {
      name: session?.user?.name ?? "Guest",
      email: session?.user?.email ?? "guest@example.com",
      avatar: session?.user?.image ?? "/avatar.jpg",
    },
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
      <SidebarHeader className="px-2 pt-2">
        <div
          className={`grid h-12 items-center rounded-lg transition-[width,grid-template-columns] duration-300 ease-in-out ${
            state === "collapsed" && !isMobile
              ? "mx-auto w-8 grid-cols-[0rem_2rem]"
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
            className="shrink-0 rounded-full bg-foreground text-muted-foreground hover:bg-foreground hover:text-primary"
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
