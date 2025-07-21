import BookCard from "@/components/BookCard";
import { getBooks } from "@/lib/actions/book.actions";
import { auth } from "../../../auth";

export default async function Home() {
  const books = await getBooks();
  const session = await auth();

  return (
    <>
      <div className="flex flex-col w-full h-full gap-10">
        <div className="flex flex-col gap-4 ">
          <p className="text-2xl font-medium">{`Welcome Back, ${
            session?.user?.name?.split(" ")[0]
          }!`}</p>

          <p className="">Ready to dive into your next adventure? </p>
        </div>

        <div className="flex flex-col gap-4">
          <p>Currently Reading</p>

          <div className="flex gap-4 ">
            {books.map((book) => (
              <div key={book.id}>
                {book.isFeatured && (
                  <BookCard
                    key={book.id}
                    title={book.title}
                    author={book.author}
                    coverUrl={book.coverUrl}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p>Books You Might Like</p>

          <div className="flex gap-4 ">
            {books.map((book) => (
              <BookCard
                key={book.id}
                title={book.title}
                author={book.author}
                coverUrl={book.coverUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
