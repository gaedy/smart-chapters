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
import { cn } from "@/lib/utils";

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
        className={cn(
          "flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm transition-all duration-200 hover:shadow-md active:scale-100",
          isTracked &&
            "bg-green-color-1  hover:bg-green-color-1/80"
        )}
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

      <DialogContent className="rounded-3xl bg-background">
        <DialogHeader className="flex gap-4">
          <DialogTitle>Choose a shelf</DialogTitle>
          <DialogDescription className="flex flex-col self-center gap-3 min-w-1/2 max-w-72">
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
                  ? "bg-green-color-1  pointer-events-none"
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
                  ? "bg-green-color-1 pointer-events-none"
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
                  ? "bg-green-color-1  pointer-events-none"
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
