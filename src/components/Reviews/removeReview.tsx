"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { deleteReview } from "@/lib/actions/reviews.actions";

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
        toast.success("Your review has been deleted.");
        refresh.refresh();
      }
    });
  };

  return (
    <>
      <Button
        size="sm"
        onClick={handleRemove}
        disabled={isPending}
        variant="destructive"
        className="rounded-full text-white"
      >
        {isPending ? "Removing..." : "Remove"}
      </Button>
    </>
  );
}
