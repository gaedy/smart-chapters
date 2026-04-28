import { BookShelf } from "@/components/books/BookShelf";

interface Book {
  id: string | number;
  title: string;
  author: string;
  coverUrl: string | null;
  isFeatured?: boolean | null;
}

interface BooksSectionProps {
  books: Book[];
  className?: string;
}

export function CurrentReading({ books, className = "" }: BooksSectionProps) {
  if (!books || books.length === 0) {
    return null;
  }

  return (
    <BookShelf
      title="Current Reading"
      books={books}
      href="/library/currently-reading"
    />
  );
}
