"use client";
import {
  BookHeart,
  ChartNoAxesCombined,
  EarthIcon,
  House,
  LibraryBig,
  NotepadText,
  Settings,
  PanelRightOpen,
  PanelRightClose,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Search from "../search";
import SidebarLink from "./SidebarLink";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Profile from "../profile";
import { Separator } from "../ui/separator";

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`sm:flex flex-col hidden ${
        isCollapsed ? "items-center" : ""
      } h-full bg-background  relative`}
      style={{ width: isCollapsed ? "3.5rem " : "16rem" }}
    >
      {/* Title and Toggle Button */}
      <div className="flex items-center justify-between mb-4 min-h-[2rem]">
        <div className={` overflow-hidden ${isCollapsed ? "hidden " : "flex"}`}>
          <p className="font-bold font-libre text-lg whitespace-nowrap">
            Smart Chapters
          </p>
        </div>

        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={toggleSidebar}
              className="flex-shrink-0 p-2 cursor-pointer active:scale-95 rounded-lg hover:bg-foreground transition-colors duration-200 ml-auto"
            >
              {isCollapsed ? (
                <PanelRightClose size={20} />
              ) : (
                <PanelRightOpen size={20} />
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {isCollapsed ? "Open Sidebar" : "Close Sidebar"}
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Search */}
      <div
        className={` overflow-hidden ${
          isCollapsed ? " mb-4" : "max-h-20 opacity-100 mb-4"
        }`}
      >
        <Search isIcon={isCollapsed ? true : false} />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col  text-sm flex-1  overflow-y-auto">
        <div className="flex gap-1 flex-col font-medium">
          <SidebarLink
            href="/"
            icon={House}
            label="Home"
            active={pathname === "/"}
            collapsed={isCollapsed}
          />
          <SidebarLink
            href="/explore"
            icon={EarthIcon}
            label="Explore"
            active={pathname === "/explore"}
            collapsed={isCollapsed}
          />
          <SidebarLink
            href="/library"
            icon={LibraryBig}
            label="Library"
            active={pathname === "/library"}
            collapsed={isCollapsed}
          />

          {/* Animated Divider */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isCollapsed ? "mx-2 my-1" : "mx-5 my-2"
            }`}
          >
           <Separator />
          </div>

          <SidebarLink
            href="/notes"
            icon={NotepadText}
            label="Notes"
            active={pathname === "/notes"}
            collapsed={isCollapsed}
          />
          <SidebarLink
            href="/stats"
            icon={ChartNoAxesCombined}
            label="Stats"
            active={pathname === "/stats"}
            collapsed={isCollapsed}
          />
          <SidebarLink
            href="/favorites"
            icon={BookHeart}
            label="Favorites"
            active={pathname === "/favorites"}
            collapsed={isCollapsed}
          />

          {/* Animated Divider */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isCollapsed ? "mx-2 my-1" : "mx-5 my-2"
            }`}
          >
           
            <Separator />
          </div>

          <SidebarLink
            href="/settings"
            icon={Settings}
            label="Settings"
            active={pathname === "/settings"}
            collapsed={isCollapsed}
          />
        </div>
      </div>

      {/* Profile Section */}
      <div
        className={`overflow-hidden mt-auto ${
          isCollapsed ? "opacity-0" : " opacity-100 "
        }`}
      >
        <Profile />
      </div>
    </div>
  );
}
