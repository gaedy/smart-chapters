import { ActionButton } from "@/components/ui/actionButton";
import React from "react";

export default function LibraryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full h-full flex-col flex gap-8">
        <p className="text-2xl">Library</p>

        <div className="flex flex-col items-center  gap-2">
          {/* <p>Bookshelves</p> */}
          <div className=" bg-background text-sm p-2 rounded-full w-fit gap-2 flex ">
            <ActionButton
              className="hover:scale-100 shadow-none hover:shadow-none"
              label="All Books"
              href="/library"
            />
            <ActionButton
              className="hover:scale-100 shadow-none hover:shadow-none"
              label="Want to Read"
              href="/library/want-to-read"
            />
            <ActionButton
              label="Currently Reading"
              href="/library/currently-reading"
              className="hover:scale-100 shadow-none hover:shadow-none"
            />
            <ActionButton
              label="Finished"
              href="/library/finished"
              className="hover:scale-100 shadow-none hover:shadow-none"
            />
          </div>
        </div>
        <div className="flex h-full w-full gap-4 justify-center items-start flex-wrap">
          {children}
        </div>
      </div>
    </>
  );
}
