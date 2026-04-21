import BookCard from "@/components/Book/BookCard";
import { getAllTrackedBooks } from "@/lib/data/book.data";
import Link from "next/link";
import { auth } from "../../../../auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library - Smart Chapters",
};

async function page() {
  const session = await auth();

  if (!session || !session.user?.id) {
    return (
      <p className="text-center">
        Please sign in to add Books to your Library.
      </p>
    );
  }

  const books = await getAllTrackedBooks(session.user.id);

  if (books.length === 0) {
    return <p className="text-center">No books added yet.</p>;
  }

  return (
    <>
      {books.map((book) => {
        const status = book.bookTrackings[0]?.status ?? "WANT_TO_READ";
        return (
          <Link href={`/book/${book.id}`} key={book.id}>
            <BookCard
              title={book.title}
              author={book.author}
              coverUrl={book.coverUrl}
              status={status}
            />
          </Link>
        );
      })}
    </>
  );
}
export default page;
