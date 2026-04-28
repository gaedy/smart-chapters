"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { searchBarBooks } from "@/lib/actions/searchbar.actions";
import { SearchIcon, XIcon } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (query.length < 1) {
        setResults([]);
        setOpen(false);
        return;
      }

      const res = await searchBarBooks(query, 5);
      setResults(res);
      setOpen(true);
    }, 200);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative w-full max-w-md ">
      <div className="relative w-full max-w-md">
        <div className="relative">
          <SearchIcon
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          ></SearchIcon>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or author..."
            className="w-full rounded-full border px-10 text-sm py-2 pr-10  bg-foreground"
          />

          {query && (
            <XIcon
              size={18}
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground "
            ></XIcon>
          )}
        </div>
      </div>

      {open && (
        <div className="absolute p-2 z-50 mt-2 w-full rounded-xl border bg-background shadow-lg">
          {results.length > 0 ? (
            results.map((b) => (
              <Link
                key={b.id}
                href={`/book/${b.id}`}
                className="flex items-center rounded-md gap-3 p-3 hover:bg-muted/20 transition"
              >
                {b.coverUrl && (
                  <Image
                    src={b.coverUrl}
                    alt={b.title}
                    width={32}
                    height={48}
                    className="rounded"
                  />
                )}
                <div>
                  <p className="font-medium text-sm">{b.title}</p>
                  <p className="text-xs text-muted-foreground">{b.author}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="p-3 text-sm text-muted-foreground text-center">
              مفيش كتب بالاسم ده
            </p>
          )}
        </div>
      )}
    </div>
  );
}
