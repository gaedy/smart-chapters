import BookCard from "@/components/BookCard";
import { getBooks } from "@/lib/actions/book.actions";
import Link from "next/link";

async function page() {
  const books = await getBooks();
  return (
    <>
      {books.map((book) => (
        <Link href={`/book/${book.id}`} key={book.id}>
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            coverUrl={book.coverUrl}
          />
        </Link>
      ))}
    </>
  );
}
export default page;
