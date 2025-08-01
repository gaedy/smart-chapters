"use client";

import AddToLibrary from "@/components/Book/add-to-library";
import RemoveFromLibrary from "@/components/Book/removeFromLibrary";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, Plus } from "lucide-react";

interface Props {
  isTracked: boolean;
  status?: "WANT_TO_READ" | "READING" | "FINISHED";
  book: {
    id: string;
    title: string;
    author: string;
  };
}

export function BookLibraryBox({ isTracked, status, book }: Props) {
  return (
    <Dialog>
      <DialogTrigger
        className={`flex justify-center gap-1 items-center bg-background p-2.5 text-[13px] 
        rounded-full cursor-pointer active:scale-100 hover:scale-105 hover:shadow-lg 
        transition-all duration-200 ${
          isTracked ? "bg-library-color-1 text-accent-foreground" : ""
        }`}
      >
        {isTracked ? (
          <>
            <Check className="w-5" />
            <p>Added to Library</p>
          </>
        ) : (
          <>
            <Plus className="w-5" />
            <p>Add to Library</p>
          </>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="flex gap-4">
          <DialogTitle>Choose a List for this book</DialogTitle>
          <DialogDescription className="flex flex-col self-center gap-2 min-w-1/2 max-w-72">
            <AddToLibrary
              iconName={status === "WANT_TO_READ" ? "check" : "wantToRead"}
              item={{
                title: book.title,
                author: book.author,
              }}
              status="WANT_TO_READ"
              label="Want to Read"
              className={`${
                status === "WANT_TO_READ"
                  ? "bg-library-color-1 text-primary pointer-events-none"
                  : ""
              }`}
            />

            <AddToLibrary
              iconName={status === "READING" ? "check" : "reading"}
              item={{
                title: book.title,
                author: book.author,
              }}
              status="READING"
              label="Currently Reading"
              className={`${
                status === "READING"
                  ? "bg-library-color-1 text-primary pointer-events-none"
                  : ""
              }`}
            />

            <AddToLibrary
              iconName={status === "FINISHED" ? "check" : "finished"}
              item={{
                title: book.title,
                author: book.author,
              }}
              status="FINISHED"
              label="Finished"
              className={`${
                status === "FINISHED"
                  ? "bg-library-color-1 text-primary pointer-events-none"
                  : ""
              }`}
            />

            {isTracked && (
              <RemoveFromLibrary
                iconName="remove"
                bookId={book.id}
                label="Remove from Library"
              />
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
