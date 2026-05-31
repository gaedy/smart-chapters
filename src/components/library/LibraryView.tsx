"use client";

import Link from "next/link";
import { BookPlus, Plus } from "lucide-react";
import { BookGrid } from "@/components/books/BookGrid";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AddCustomBookDialog } from "@/components/Sidebar/add-custom-book-dialog";

type StatusFilter = "all" | "READING" | "FINISHED" | "WANT_TO_READ";
type SortKey = "updated" | "title" | "author" | "rating" | "progress";

interface LibraryBook {
  id: string;
  title: string;
  author: string;
  coverUrl?: string | null;
  genre?: string | null;
  pageCount?: number | null;
  bookTrackings: {
    status: StatusFilter;
    currentPage?: number | null;
    rating?: number | null;
    updatedAt?: Date | string | null;
    createdAt?: Date | string | null;
  }[];
}

interface LibraryViewProps {
  books: LibraryBook[];
  status?: StatusFilter;
  query?: string;
  sort?: SortKey;
}

const tabs: { label: string; status: StatusFilter; href: string }[] = [
  { label: "All Books", status: "all", href: "/library" },
  {
    label: "Want to Read",
    status: "WANT_TO_READ",
    href: "/library/want-to-read",
  },
  {
    label: "Currently Reading",
    status: "READING",
    href: "/library/currently-reading",
  },
  { label: "Finished", status: "FINISHED", href: "/library/finished" },
];

function asTime(value?: Date | string | null) {
  if (!value) return 0;
  return new Date(value).getTime();
}

export function LibraryView({
  books,
  status = "all",
  query = "",
  sort = "updated",
}: LibraryViewProps) {
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = books
    .filter((book) => {
      const tracking = book.bookTrackings[0];
      const matchesStatus = status === "all" || tracking?.status === status;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        book.title.toLowerCase().includes(normalizedQuery) ||
        book.author.toLowerCase().includes(normalizedQuery) ||
        book.genre?.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    })
    .sort((a, b) => {
      const aTracking = a.bookTrackings[0];
      const bTracking = b.bookTrackings[0];

      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "author") return a.author.localeCompare(b.author);
      if (sort === "rating")
        return (bTracking?.rating ?? 0) - (aTracking?.rating ?? 0);
      if (sort === "progress") {
        const aProgress = a.pageCount
          ? (aTracking?.currentPage ?? 0) / a.pageCount
          : 0;
        const bProgress = b.pageCount
          ? (bTracking?.currentPage ?? 0) / b.pageCount
          : 0;
        return bProgress - aProgress;
      }

      return asTime(bTracking?.updatedAt) - asTime(aTracking?.updatedAt);
    });

  const countLabel = `${filtered.length} ${filtered.length === 1 ? "book" : "books"}`;
  const counts = books.reduce<Record<StatusFilter, number>>(
    (acc, book) => {
      acc.all += 1;
      const trackingStatus = book.bookTrackings[0]?.status;

      if (trackingStatus) {
        acc[trackingStatus] += 1;
      }

      return acc;
    },
    { all: 0, READING: 0, FINISHED: 0, WANT_TO_READ: 0 },
  );

  return (
    <div className="flex w-full flex-col gap-8">
      <PageHeader
        title="Library"
        description="Search, sort, and move through every book you are tracking."
        action={
          <div className="flex flex-wrap items-center gap-2">
            <AddCustomBookDialog
              compactOnCollapse={false}
              triggerClassName="mx-0 min-h-10 rounded-full px-4"
              triggerLabel="Add Custom Book"
              triggerIcon={Plus}
            />
            {/* <Badge variant="outline" className="px-3 py-1 text-sm">
              {countLabel}
            </Badge> */}
          </div>
        }
      />

      <div className="flex flex-col gap-4 rounded-2xl bg-background p-2 sm:rounded-3xl sm:p-4">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 py-2">
          {tabs.map((tab) => (
            <Button
              asChild
              key={tab.status}
              size="lg"
              className={`group shrink-0 rounded-full shadow-none ${
                status === tab.status
                  ? "bg-theme-accent text-theme-accent-foreground hover:bg-theme-accent/90"
                  : "bg-foreground text-primary/80 hover:bg-foreground-dark hover:text-primary"
              }`}
            >
              <Link href={tab.href}>
                <span>{tab.label}</span>
                <span
                  className={`ml-1.5 text-sm font-medium tabular-nums ${
                    status === tab.status
                      ? "text-primary bg-theme-accent-soft p-1 px-2.5 rounded-full text-xs"
                      : "text-secondary group-hover:text-primary text-xs"
                  }`}
                >
                  {counts[tab.status]}
                </span>
              </Link>
            </Button>
          ))}
        </div>

        {/* <form className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              defaultValue={query}
              placeholder="Search your library..."
              className="rounded-full bg-foreground pl-9  "
            />
          </div>
          <select
            name="sort"
            defaultValue={sort}
            className="h-10 rounded-full border border-input bg-foreground px-4 text-sm"
          >
            <option value="updated">Recently updated</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="rating">Rating</option>
            <option value="progress">Progress</option>
          </select>
          <Button type="submit" className="rounded-full">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Apply
          </Button>
        </form> */}
      </div>

      <BookGrid
        books={filtered.map((book) => ({
          ...book,
          status: book.bookTrackings[0]?.status,
          currentPage: book.bookTrackings[0]?.currentPage,
        }))}
        showProgress={status === "READING"}
        emptyTitle="No books in this shelf"
        emptyDescription="Try another shelf or adjust your search to find the book you want."
      />
    </div>
  );
}
