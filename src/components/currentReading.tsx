import Link from "next/link";
import { Card } from "@/components/ui/card";
import BookCard from "./Book/BookCard";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

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
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className=" text-xl">Current Reading</p>
         <Link href="/library/currently-reading">
            <Button
              variant="ghost"
              size="sm"
              className="border-primary/30 text-muted-foreground hover:text-primary cursor-pointer hover:bg-primary/10 bg-transparent"
            >
              View More
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
      </div>
      

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
