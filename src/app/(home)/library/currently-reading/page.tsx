import BookCard from "@/components/Book/BookCard";
import { getReadingBooks } from "@/lib/data/book.data";
import Link from "next/link";
import { auth } from "../../../../../auth";

export default async function ReadingPage() {
  const session = await auth();

  if (!session || !session.user?.id) {
    return (
      <p className="text-center">
        Please sign in to view your Currently Reading books.
      </p>
    );
  }

  const books = await getReadingBooks(session.user.id);

  if (books.length === 0) {
    return <p className="text-center">No books added to this list yet.</p>;
  }

  return (
    <div className="flex justify-center w-full  gap-4 flex-wrap break-words">
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
  );
}
