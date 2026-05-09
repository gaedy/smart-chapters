import Link from "next/link";
import BookCard from "@/components/Book/BookCard";
import { EmptyState } from "@/components/layout/EmptyState";

interface GridBook {
  id: string | number;
  title: string;
  author: string;
  coverUrl?: string | null;
  status?: string | null;
  pageCount?: number | null;
  currentPage?: number | null;
}

interface BookGridProps {
  books: GridBook[];
  emptyTitle?: string;
  emptyDescription?: string;
  showProgress?: boolean;
}

export function BookGrid({
  books,
  emptyTitle = "No books found",
  emptyDescription = "Try changing your filters or add more books to your library.",
  showProgress = false,
}: BookGridProps) {
  if (books.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="grid w-full grid-cols-2 justify-items-center gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {books.map((book) => (
        <Link href={`/book/${book.id}`} key={book.id}>
          <BookCard
            title={book.title}
            author={book.author}
            coverUrl={book.coverUrl}
            status={book.status}
            progressPercent={
              showProgress && book.pageCount
                ? ((book.currentPage ?? 0) / book.pageCount) * 100
                : null
            }
          />
        </Link>
      ))}
    </div>
  );
}
