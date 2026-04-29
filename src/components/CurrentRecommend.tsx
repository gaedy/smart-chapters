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

export async function CurrentRecommend({
  books,
  className = "",
}: BooksSectionProps) {
  if (!books || books.length === 0) {
    return null;
  }

  return (
    <BookShelf
      title="Recommended For You"
      description="A quieter shelf of books that match your reading mood."
      books={books}
      itemClassName="basis-[10.75rem]"
    />
  );
}
