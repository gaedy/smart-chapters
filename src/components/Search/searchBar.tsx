"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import {
  searchBarBooks,
  type SearchFilter,
} from "@/lib/actions/searchbar.actions";
import { CheckIcon, SearchIcon, SlidersHorizontal, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SearchResult = {
  id: string;
  title: string;
  author: string;
  coverUrl: string | null;
};

const filterOptions: { value: SearchFilter; label: string }[] = [
  { value: "all", label: "All books" },
  { value: "title", label: "Title" },
  { value: "author", label: "Author" },
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<SearchFilter>("all");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length > 0;
  const activeFilterLabel =
    filterOptions.find((option) => option.value === filter)?.label ?? "All";

  useEffect(() => {
    let cancelled = false;

    const handler = setTimeout(async () => {
      if (!trimmedQuery) {
        setResults([]);
        setOpen(false);
        return;
      }

      const res = await searchBarBooks(trimmedQuery, 5, filter);
      if (cancelled) return;

      setResults(res);
      setOpen(true);
    }, 200);

    return () => {
      cancelled = true;
      clearTimeout(handler);
    };
  }, [trimmedQuery, filter]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setOpen(false);
  };

  const closeResults = () => {
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative w-full">
      <div className="flex h-11 p-1 w-full items-center gap-1 rounded-full bg-foreground transition-colors duration-200 focus-within:bg-foreground-dark ">
        <SearchIcon
          size={20}
          className="pointer-events-none text-secondary ml-3"
        />

        <div className="relative min-w-0 flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (hasQuery) setOpen(true);
            }}
            placeholder="Search by title or author..."
            className="h-10 w-full rounded-full px-2 pr-10 text-sm text-primary outline-none placeholder:text-secondary/70"
          />

          {hasQuery && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Clear search"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 size-7 -translate-y-1/2 rounded-full text-secondary hover:bg-background/80 hover:text-primary"
            >
              <XIcon className="size-4" />
            </Button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              aria-label={`Search filter: ${activeFilterLabel}`}
              className="h-full shrink-0 rounded-full bg-background/55 px-3 text-xs font-medium text-secondary shadow-none hover:bg-accent hover:text-primary"
            >
              <SlidersHorizontal className="size-4" />
              <span className="hidden sm:inline">{activeFilterLabel}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-40 rounded-xl border-background bg-foreground p-1.5"
          >
            {filterOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => setFilter(option.value)}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-secondary focus:bg-background focus:text-primary"
              >
                {option.label}
                {filter === option.value && <CheckIcon className="size-4 " />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {open && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-2xl bg-foreground-dark p-2">
          {results.length > 0 ? (
            results.map((b) => (
              <Link
                key={b.id}
                href={`/book/${b.id}`}
                onClick={closeResults}
                className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-foreground focus-visible:bg-foreground focus-visible:outline-none"
              >
                <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-md bg-foreground shadow-sm">
                  <Image
                    src={b.coverUrl || "/book_cover1.jpg"}
                    alt={`${b.title} book cover`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-primary">
                    {b.title}
                  </p>
                  <p className="truncate text-xs leading-5 text-secondary">
                    {b.author}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="p-4 text-center text-sm text-secondary">
              No books found
            </p>
          )}
        </div>
      )}
    </div>
  );
}
