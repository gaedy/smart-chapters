"use client";
import {
  BookHeart,
  ChartNoAxesCombined,
  EarthIcon,
  House,
  LibraryBig,
  NotepadText,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Search from "../search";
import SidebarLink from "./SidebarLink";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Profile from "../profile";

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
      className={`flex flex-col ${
        isCollapsed ? "items-center" : ""
      } h-full bg-background  transition-all duration-300 ease-in-out relative`}
      style={{ width: isCollapsed ? "4.5rem " : "16rem" }}
    >
      {/* Title and Toggle Button */}
      <div className="flex items-center justify-between mb-4 min-h-[2rem]">
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isCollapsed ? "w-0 opacity-0" : "w-full opacity-100"
          }`}
        >
          <p className="font-bold font-libre text-lg whitespace-nowrap">
            Smart Chapters
          </p>
        </div>

        <button
          onClick={toggleSidebar}
          className="flex-shrink-0 p-1 rounded hover:bg-foreground transition-colors duration-200 ml-auto"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Search */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isCollapsed ? "max-h-0 opacity-0 mb-0" : "max-h-20 opacity-100 mb-4"
        }`}
      >
        <Search />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col text-sm flex-1">
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
            <hr className="opacity-20" />
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
            <hr className="opacity-20" />
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
        className={`transition-all duration-300 ease-in-out overflow-hidden mt-auto ${
          isCollapsed ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
        }`}
      >
        <Profile />
      </div>
    </div>
  );
}
