"use client";

import { usePathname } from "next/navigation";

interface PageTitleProps {
  defaultText?: string;
}

export default function NavHeader({ defaultText }: PageTitleProps) {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname.startsWith("/explore")) return "Explore New Books";
    if (pathname.startsWith("/library")) return "Library";
    if (pathname.startsWith("/account")) return "My Account";
    return defaultText || "Welcome Back!";
  };

  return <p className="text-xl font-medium hidden md:flex">{getTitle()}</p>;
}
