// components/ui/ActionButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ActionButtonProps = {
  label: string;
  color?: string; // Tailwind color class e.g., 'bg-green-300'
  activeColor?: string; // Tailwind color class for active state
  icon?: LucideIcon; // Properly typed Lucide icon component
  href?: string; // Optional Next.js route link
} & ComponentProps<typeof Button>;

export function ActionButton({
  label,
  color = "bg-secondary text-black  hover:bg-secondary",
  activeColor = "bg-primary text-primary-foreground",
  icon: IconComponent,
  href,
  className,
  ...props
}: ActionButtonProps) {
  const pathname = usePathname();
  const isActive = href && pathname === href;

  const buttonContent = (
    <Button
      variant="default"
      size="lg"
      className={cn(
        "w-full rounded-full cursor-pointer active:scale-100 hover:scale-105 hover:shadow-lg transition-all duration-200",
        isActive ? activeColor : color,
        className
      )}
      {...props}
    >
      {IconComponent && <IconComponent className="mr-2 h-5 w-5" />}
      {label}
    </Button>
  );

  return href ? <Link href={href}>{buttonContent}</Link> : buttonContent;
}
