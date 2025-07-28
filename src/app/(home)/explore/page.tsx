import { getBooks } from "@/lib/actions/book.actions";
import { auth } from "../../../../auth";
import Link from "next/link";
import BookCard from "@/components/Book/BookCard";

async function Explore() {
  const session = await auth();

  if (!session || !session.user?.id) {
    return <p className="text-center">Please sign in to Views Books.</p>;
  }

  const books = await getBooks();

  return (
    <div className="flex flex-col w-full h-full gap-10">
      <div className="flex flex-col gap-4 ">
        <p className="text-2xl font-medium">Explore New Books</p>

        <p className="">Search books, authors, or genres... </p>
      </div>

      <div className="flex flex-col gap-4">
        <p>Trending Books</p>
      </div>

      <div className="flex flex-col gap-4">
        <p>Browse By Genre</p>

        <div className=" flex  h-full w-full gap-4 items-start flex-wrap">
          {books.map((book) => {
            return (
              <Link href={`/book/${book.id}`} key={book.id}>
                <BookCard
                  title={book.title}
                  author={book.author}
                  coverUrl={book.coverUrl}
                />
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p>New Releases</p>
      </div>

      <div className="flex flex-col gap-4">
        <p>Staff Picks</p>
      </div>
    </div>
  );
}
export default Explore;
