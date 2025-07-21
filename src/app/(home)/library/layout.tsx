import Link from "next/link";

export default function LibraryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full h-full flex-col flex  gap-4">
        <p className="text-2xl">Library</p>

        <div className="flex flex-col gap-2">
          <p>Bookshelves</p>
          <div className=" text-sm gap-2 flex w-full flex-wrap ">
            <Link href="/library">
              <div className="bg-background shadow-lg p-2 rounded-full px-2.5">
                All Books
              </div>
            </Link>

            <Link href="/library/want-to-read">
              <div
                className="bg-green-300 p-2 rounded-full px-2.5 cursor-pointer 
            hover:bg-green-400 transition-colors duration-300"
              >
                Want to Read
              </div>
            </Link>

            <Link href="/library/currently-reading">
              <div className="bg-blue-300 p-2 rounded-full px-2.5">
                Currently Reading
              </div>
            </Link>

            <Link href="/library/finished">
              <div className="bg-red-300 p-2 rounded-full px-2.5">Finished</div>
            </Link>
          </div>
        </div>
        <div className="  flex  h-full w-full gap-4 justify-center items-start flex-wrap">
          {children}
        </div>
      </div>
    </>
  );
}
