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
    <div
      className={` ${className}`}
    >
      <BookShelf
        title="Currently Reading"
        description="Your active shelf, ready to pick up where you left off."
        books={books}
        href="/library/currently-reading"
        // itemClassName="basis-[11.75rem] sm:basis-[12.5rem]"
        featured
      />
    </div>
  );
}
