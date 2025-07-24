"use client";

import * as React from "react";
import {
  Earth,
  Heart,
  House,
  Library,
  NotepadText,
  PieChart,
  Send,
  Settings,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Add this import

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state, open, isMobile } = useSidebar();

  const pathname = usePathname();

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
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
        isActive: pathname === "/explore",
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
        title: "Settings",
        url: "/settings",
        isActive: pathname === "/settings",
        icon: Settings,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
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
      <SidebarHeader>
        <SidebarMenu>
          {state !== "collapsed" || isMobile ? (
            <div className="flex justify-between w-full items-center relative">
              <SidebarMenuItem>
                <SidebarMenuButton className="" size="lg" asChild>
                  <Link href="/">
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate text-lg font-medium font-libre">
                        Smart Chapters
                      </span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarTrigger className="absolute right-0 hover:bg-foreground" />
            </div>
          ) : (
            <>
              <div className="flex justify-center items-center">
                <SidebarTrigger className="hover:bg-foreground" />
              </div>
            </>
          )}
        </SidebarMenu>
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
