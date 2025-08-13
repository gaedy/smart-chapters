import BookCard from "@/components/Book/BookCard";
import { getWantToReadBooks } from "@/lib/actions/book.actions";
import Link from "next/link";
import { auth } from "../../../../../auth";
export default async function WantToReadPage() {
  const session = await auth();

  if (!session || !session.user?.id) {
    return (
      <p className="text-center">
        Please sign in to view your Want To Read books.
      </p>
    );
  }

  const books = await getWantToReadBooks(session.user.id);

  if (books.length === 0) {
    return <p className="text-center">No books added to this list yet.</p>;
  }

  return (
    <div>
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
