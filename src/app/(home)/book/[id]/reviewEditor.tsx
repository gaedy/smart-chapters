"use client";

import { ActionButton } from "@/components/ui/actionButton";

import { Textarea } from "@/components/ui/textarea";
import { addReview, deleteReview } from "@/lib/actions/book.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ReviewEditor({ bookId }: { bookId: string }) {
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const refresh = useRouter();

  async function handleSubmit() {
    if (!reviewText.trim()) return;

    try {
      setLoading(true);
      await addReview(bookId, reviewText);
      setReviewText("");
    } catch (err) {
      toast.error("Error adding review:");
      console.error("Error adding review:", err);
    } finally {
      setLoading(false);
      refresh.refresh();
      toast.success("Added Review successfully");
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <span>Write your review</span>
      <Textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        className="min-h-24 bg-background rounded-2xl"
      />
      <ActionButton
        onClick={handleSubmit}
        disabled={loading}
        className="w-fit"
        label={loading ? "Submitting..." : "Submit"}
      />
    </div>
  );
}
