import { ActionButton } from "@/components/ui/button-book";
import React from "react";

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
            <ActionButton label="All" href="/library" />
            <ActionButton label="Want to Read" href="/library/want-to-read" />
            <ActionButton
              label="Currently Reading"
              href="/library/currently-reading"
            />
            <ActionButton label="Finished" href="/library/finished" />
          </div>
        </div>
        <div className=" flex  h-full w-full gap-4 items-start flex-wrap">
          {children}
        </div>
      </div>
    </>
  );
}
