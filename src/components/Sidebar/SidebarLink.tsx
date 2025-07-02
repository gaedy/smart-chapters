import Link from "next/link";
import React from "react";

export default function SidebarLink({
  href,
  icon: Icon,
  label,
  active,
  collapsed = false,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}) {
  return (
    <Link href={href}>
      <button
        className={`p-2 w-full px-2.5 rounded-lg active:bg-foregroundClicked 
          hover:bg-foreground transition-transform active:scale-95 cursor-pointer 
          flex items-center gap-2 ${active && "bg-foreground"}`}
      >
        <Icon size={22} />
        {!collapsed && <p>{label}</p>}
        {/* <p className="ml-auto">number</p> */}
      </button>
    </Link>
  );
}
