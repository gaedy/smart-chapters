"use client";
import * as React from "react";
import {
  Earth,
  Heart,
  House,
  Library,
  Loader,
  NotepadText,
  PieChart,
  Search,
  Send,
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
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/Sidebar/sidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "../Search/searchBar";
import { getBooksByTitle } from "@/lib/actions/book.actions";

import BookCardSearch from "../Search/bookCardSearch";
import { useSession } from "next-auth/react";
import Logo from "../ui/Logo";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state, isMobile } = useSidebar();

  type Book = Awaited<ReturnType<typeof getBooksByTitle>>[number];

  const [results, setResults] = React.useState<Book[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isSearchResult, setIsSearchResult] = React.useState(false);
  const [isBookSearched, setIsBookSearched] = React.useState(false);

  const pathname = usePathname();

  const handleSearch = React.useCallback(async (query: string) => {
    setResults([]);
    setIsBookSearched(false); // reset flag
    setIsSearchResult(true); // show loader

    if (!query) {
      setIsSearchResult(false);
      return;
    }

    const data = await getBooksByTitle(query);

    setResults(data);
    setIsBookSearched(true); // only mark search as done if query was valid
    setIsSearchResult(false);
  }, []);

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
      <SidebarHeader>
        <SidebarMenu>
          {state !== "collapsed" || isMobile ? (
            <div className="flex justify-between w-full items-center relative">
              <SidebarMenuButton size="lg" asChild>
                <Link href="/">
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <Logo />
                  </div>
                </Link>
              </SidebarMenuButton>

              <SidebarTrigger className="absolute right-0 " />
            </div>
          ) : (
            <>
              <div className="flex justify-center items-center">
                <SidebarTrigger />
              </div>
            </>
          )}
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {!session || !session.user?.id ? (
          ""
        ) : (
          <SidebarGroup>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <SidebarMenuButton
                  className="text-muted-foreground bg-foreground  cursor-pointer transition-colors"
                  tooltip="Search"
                >
                  <Search />
                  <span>Search Books</span>
                </SidebarMenuButton>
              </DialogTrigger>

              <DialogContent className="gap-4">
                <DialogHeader>
                  <DialogTitle>
                    Search Books by title, author, or keyword
                  </DialogTitle>
                </DialogHeader>
                <SearchBar onSearch={handleSearch} />

                <div className="mt-4 flex flex-col gap-2 max-h-64 relative overflow-auto">
                  {results.length !== 0 && isBookSearched && (
                    <div className=" text-sm flex text-muted-foreground justify-between bg-foreground p-1 items-center sticky top-0">
                      <span>Search results</span>
                      <span>{results.length}</span>
                    </div>
                  )}

                  {isSearchResult ? (
                    <div className="flex justify-center items-center overflow-hidden">
                      <Loader className="animate-spin" />
                    </div>
                  ) : results.length === 0 && isBookSearched ? (
                    <span className="flex justify-center items-center">
                      No Book Found
                    </span>
                  ) : (
                    results.map((book) => (
                      <BookCardSearch
                        key={book.id}
                        book={book}
                        href={`/book/${book.id}`}
                        onClick={() => setIsDialogOpen(false)}
                      />
                    ))
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </SidebarGroup>
        )}{" "}
        {}
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
