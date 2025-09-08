"use client";

import { useEffect, useState } from "react";
import {
  getBooks,
  getBooksByGenre,
  getGenres,
} from "@/lib/actions/book.actions";
import Link from "next/link";
import BookCard from "@/components/Book/BookCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export default function ExploreBooks() {
  const [genres, setGenres] = useState<{ genre: string | null }[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("ALL");

  useEffect(() => {
    async function fetchInitialData() {
      const [fetchedGenres, fetchedBooks] = await Promise.all([
        getGenres(),
        getBooks(),
      ]);
      setGenres(fetchedGenres);
      setBooks(fetchedBooks);
      setLoading(false);
    }

    fetchInitialData();
  }, []);

  async function handleGenreChange(value: string) {
    setSelectedGenre(value);
    setLoading(true);

    if (value === "ALL") {
      const allBooks = await getBooks();
      setBooks(allBooks);
    } else {
      const booksByGenre = await getBooksByGenre(value);
      setBooks(booksByGenre);
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-6">

        <p>Browse By Genres</p>
      <Select onValueChange={handleGenreChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Books</SelectItem>
          <SelectSeparator />
          {genres.map((item) =>
            item.genre ? (
              <SelectItem key={item.genre} value={item.genre}>
                {item.genre}
              </SelectItem>
            ) : null
          )}
        </SelectContent>
      </Select>

      {loading ? (
        <div className="w-full flex justify-center py-10">
          <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
        </div>
      ) : books.length === 0 ? (
        <p className="text-center text-muted-foreground">No books found.</p>
      ) : (
        <div className="flex flex-wrap md:justify-start justify-center gap-4">
          {books.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`}>
              <BookCard
                title={book.title}
                author={book.author}
                coverUrl={book.coverUrl}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
