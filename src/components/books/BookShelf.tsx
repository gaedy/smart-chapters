import Link from "next/link";
import BookCard from "@/components/Book/BookCard";
import { SectionHeader } from "@/components/layout/SectionHeader";

export interface ShelfBook {
  id: string | number;
  title: string;
  author: string;
  coverUrl?: string | null;
  status?: string | null;
}

interface BookShelfProps {
  title: string;
  description?: string;
  books: ShelfBook[];
  href?: string;
  limit?: number;
}

export function BookShelf({
  title,
  description,
  books,
  href,
  limit,
}: BookShelfProps) {
  const visibleBooks = limit ? books.slice(0, limit) : books;

  if (visibleBooks.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-4">
      <SectionHeader title={title} description={description} href={href} />
      <div className="-mx-1 overflow-x-auto px-1 pb-2">
        <div className="flex w-max gap-4">
          {visibleBooks.map((book) => (
            <Link href={`/book/${book.id}`} key={book.id}>
              <BookCard
                title={book.title}
                author={book.author}
                coverUrl={book.coverUrl}
                status={book.status}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
