"use client";

import {
  BadgeCheck,
  BookPlus,
  ChevronsUpDown,
  LogIn,
  LogOut,
  Settings,
} from "lucide-react";
import { useState } from "react";

import { AddCustomBookDialog } from "@/components/Sidebar/add-custom-book-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/Sidebar/sidebar";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export function SignOutButton() {}

export function NavUser({
  user,
  onlyAvatar,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  onlyAvatar?: boolean;
}) {
  const { isMobile, state } = useSidebar();
  const { data: session, status } = useSession();
  const displayUser = {
    name: session?.user?.name ?? user.name,
    email: session?.user?.email ?? user.email,
    avatar: session?.user?.image ?? user.avatar,
  };
  const hasInitialUser = user.email !== "guest@example.com";
  const isSignedIn =
    status === "authenticated" || (status === "loading" && hasInitialUser);
  const showMobileNavbarActions = Boolean(onlyAvatar && isMobile);
  const [addBookOpen, setAddBookOpen] = useState(false);

  if (!isSignedIn) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link href="/sign-in">
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent cursor-pointer data-[state=open]:text-sidebar-accent-foreground"
                >
                  <LogIn />
                  Sign in
                </SidebarMenuButton>
              </Link>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <AddCustomBookDialog
          hideTrigger
          open={addBookOpen}
          onOpenChange={setAddBookOpen}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {onlyAvatar ? (
              <SidebarMenuButton
                size="lg"
                className="flex size-11 cursor-pointer items-center justify-center rounded-full p-0 md:size-9"
              >
                <Avatar className="size-11 rounded-full md:size-9">
                  <AvatarImage src={displayUser.avatar} alt={displayUser.name} />
                  <AvatarFallback>{getInitials(displayUser.name)}</AvatarFallback>
                </Avatar>
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton
                size="lg"
                className={`data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground 
        ${state === "collapsed" && !isMobile && "rounded-full"}`}
              >
                <Avatar className="rounded-full border border-border">
                  <AvatarImage src={displayUser.avatar} alt={displayUser.name} />
                  <AvatarFallback>{getInitials(displayUser.name)}</AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{displayUser.name}</span>
                  <span className="truncate text-xs">{displayUser.email}</span>
                </div>

                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 border border-border">
                  <AvatarImage src={displayUser.avatar} alt={displayUser.name} />
                  <AvatarFallback>{getInitials(displayUser.name)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{displayUser.name}</span>
                  <span className="truncate text-xs">{displayUser.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <Link href="/account">
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
              </Link>

              {/* <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem> */}
            </DropdownMenuGroup>

            {showMobileNavbarActions && (
              <>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem onSelect={() => setAddBookOpen(true)}>
                    <BookPlus />
                    Add Custom Book
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </>
            )}

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
