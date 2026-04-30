// components/ui/ActionButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { LucideIcon } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

type ActionButtonProps = {
  label?: string;
  color?: string;
  activeColor?: string;
  icon?: LucideIcon;
  href?: string;
} & ComponentProps<typeof Button>;

export function ActionButton({
  label,
  color = "bg-foreground text-primary/80 hover:bg-foreground-dark hover:text-primary",
  activeColor = "bg-theme-accent text-theme-accent-foreground hover:bg-theme-accent/90",
  icon: IconComponent,
  href,
  className,

  ...props
}: ActionButtonProps) {
  const pathname = usePathname();
  const isActive = href && pathname === href;
  const content = (
    <>
      {IconComponent && <IconComponent className="mr-0 h-5 w-5" />}
      {label}
    </>
  );

  return (
    <Button
      asChild={Boolean(href)}
      variant={isActive ? "default" : "secondary"}
      size="lg"
      className={cn(
        "w-full cursor-pointer rounded-full",
        isActive ? activeColor : color,
        className
      )}
      {...props}
    >
      {href ? <Link href={href}>{content}</Link> : content}
    </Button>
  );
}
