"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateCurrentPage } from "@/lib/actions/book.actions";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { ActionButton } from "@/components/ui/actionButton";
import { BookOpenCheck } from "lucide-react";

interface Props {
  currentPage: number;
  pageCount: number;
  bookId: string;
  userId: string;
}

export function BookProgressBox({
  currentPage,
  pageCount,
  bookId,
  userId,
}: Props) {
  const [page, setPage] = useState<number>(currentPage);
  const [isPending, startTransition] = useTransition();

  const handleUpdate = () => {
    if (page < 0 || page > pageCount) {
      toast.error("Page out of range");
      return;
    }

    startTransition(() => {
      updateCurrentPage({ userId, bookId, currentPage: page }).then((res) => {
        if (res.error) {
          toast.error("Update failed", {
            description:
              typeof res.error === "string" ? res.error : "Unknown error",
          });
        } else {
          toast.success("Progress updated", {
            description: `Now on page ${page}`,
          });
        }
      });
    });
  };

  return (
    <aside className="flex h-fit w-full flex-col gap-5 rounded-3xl bg-background p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-foreground p-3 text-muted-foreground">
          <BookOpenCheck className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-semibold">Reading progress</h2>
          <p className="text-sm text-muted-foreground">
            Keep your current page up to date.
          </p>
        </div>
      </div>

      <Progress value={pageCount ? Math.round((page / pageCount) * 100) : 0} />

      <div className="flex rounded-2xl bg-foreground p-4 text-sm">
        <div className="flex w-full items-center justify-between gap-4">
          <p className="text-muted-foreground">Current page</p>
          <p className="font-medium">
            {page}/{pageCount}
          </p>
        </div>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <ActionButton
            className="w-full rounded-full"
            label="Update progress"
          />
        </PopoverTrigger>
        <PopoverContent className="rounded-3xl bg-background">
          <div className="flex flex-col gap-4 p-4 w-full">
            <p className="font-medium">Current page</p>
            <div className="flex justify-start gap-2 text-sm items-center">
              <input
                type="number"
                value={page}
                onChange={(e) => setPage(Number(e.target.value))}
                min={0}
                max={pageCount}
                className="w-24 rounded-full border bg-foreground px-3 py-2"
              />

              <p>/{pageCount}</p>
            </div>

            <ActionButton
              label={isPending ? "Updating..." : "Update"}
              onClick={handleUpdate}
              disabled={isPending}
              color="bg-theme-accent text-theme-accent-foreground hover:bg-theme-accent/90"
              className="rounded-full"
            />
          </div>
        </PopoverContent>
      </Popover>
    </aside>
  );
}
