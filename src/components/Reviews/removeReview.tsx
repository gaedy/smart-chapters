"use client";

import { deleteReview } from "@/lib/actions/book.actions";
import { useTransition } from "react";
import { ActionButton } from "../ui/actionButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Ellipsis, Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

export default function RemoveReviewButton({ bookId }: { bookId: string }) {
  const [isPending, startTransition] = useTransition();
  const refresh = useRouter();
  const handleRemove = () => {
    startTransition(async () => {
      try {
        await deleteReview(bookId);
      } catch (error) {
        console.error(error);
      } finally {
        toast.success("Removed Review successfully");
        refresh.refresh();
      }
    });
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Ellipsis className="cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent className="bg-background w-full flex flex-col  rounded-2xl font-merriweather">
          {/* <ActionButton
            className="w-fit bg-red-500 hover:bg-red-600"
            label={isPending ? "Removing..." : "Remove"}
            icon={Trash}
            onClick={handleRemove}
            disabled={isPending}
          /> */}

          <Button onClick={handleRemove} disabled={isPending} variant="ghost">
            {isPending ? "Removing..." : "Remove"}
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
}
