import BookCard from "@/components/BookCard";
import { getBooks } from "@/lib/actions/book.actions";

async function page() {
  const books = await getBooks();
  return (
    <>
      <div className="w-full h-full flex-col flex gap-4">
        <p className="text-2xl">Library</p>

        <div className="flex flex-col gap-2">
          <p>Bookshelves</p>
          <div className=" text-sm gap-2 flex w-fit ">
            <p className="bg-background p-2 rounded-full px-2.5">All Books</p>
            <p className="bg-green-300 p-2 rounded-full px-2.5">Want to Read</p>
            <p className="bg-blue-300 p-2 rounded-full px-2.5">
              Currently Reading
            </p>
            <p className="bg-red-300 p-2 rounded-full px-2.5">Finished</p>
          </div>
        </div>
        <div className="flex gap-4">
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
    </>
  );
}
export default page;
