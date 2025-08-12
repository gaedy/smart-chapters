"use client";

import React, { useState, useEffect } from "react";
import { X, Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceTime?: number;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search here ...",
  debounceTime = 300,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query.trim());
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [query, debounceTime, onSearch]);

  return (
    <div className="bg-background p-2 px-2.5 flex gap-2 text-sm justify-center w-full items-center rounded-lg">
      <Search size={20} className="shrink-0" />
      <input
        className="w-full outline-none  bg-transparent"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
      />
      {query && (
  <X
    size={20}
    className="cursor-pointer"
    onClick={() => {
      setQuery("");
      onSearch(""); // <- clear results
    }}
  />
)}
    </div>
  );
}
