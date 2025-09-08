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
    <div className="flex flex-col items-center w-full gap-4 ">
      <span className="self-start">Your Reading Progress</span>

      <Progress value={pageCount ? Math.round((page / pageCount) * 100) : 0} />

      <div className="flex bg-background text-sm rounded-2xl gap-4 flex-col p-4 w-full h-fit">
        <div className="flex justify-between items-center"> 
          <p>Current Page</p>
          <p>
            {page}/{pageCount}
          </p>
        </div>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <ActionButton className="w-fit" label="Update your progress" />
        </PopoverTrigger>
        <PopoverContent className="bg-background rounded-2xl font-merriweather">
          <div className="flex flex-col gap-4 p-4 w-full">
            <p>Current Page</p>
            <div className="flex justify-start gap-2 text-sm items-center">
              <input
                type="number"
                value={page}
                onChange={(e) => setPage(Number(e.target.value))}
                min={0}
                max={pageCount}
                className="border rounded-md p-1 px-2 w-24"
              />

              <p>/{pageCount}</p>
            </div>

            <ActionButton
              label={isPending ? "Updating..." : "Update"}
              onClick={handleUpdate}
              disabled={isPending}
              className="bg-foreground hover:bg-foreground"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
