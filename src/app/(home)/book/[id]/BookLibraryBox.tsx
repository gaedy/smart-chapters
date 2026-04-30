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
import { Button } from "@/components/ui/button";
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
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className={`w-full cursor-pointer rounded-full ${
            isTracked ? "bg-green-color-1 hover:bg-green-color-1/80" : ""
          }`}
        >
          {isTracked ? (
            <>
              <Check className="w-5" />
              <span>Added to Library</span>
            </>
          ) : (
            <>
              <Plus className="w-5" />
              <span>Add to Library</span>
            </>
          )}
        </Button>
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
