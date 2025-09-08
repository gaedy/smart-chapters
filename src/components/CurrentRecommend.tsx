import Link from "next/link";
import { Card } from "@/components/ui/card";
import BookCard from "./Book/BookCard";

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
    <div className="flex flex-col gap-4">
      <p className=" text-xl">Books You May Read</p>

      {/* <Card className={`p-6 border-none ${className}`}> */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 scrollbar-hide">
          {books.map((book) => (
            <Link href={`/book/${book.id}`} key={book.id}>
              <BookCard
                title={book.title}
                author={book.author}
                coverUrl={book.coverUrl}
              />
            </Link>
          ))}
        </div>
      </div>
      {/* </Card> */}
    </div>
  );
}
