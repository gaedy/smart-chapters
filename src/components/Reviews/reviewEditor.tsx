"use client";
import { ActionButton } from "@/components/ui/actionButton";
import { Textarea } from "@/components/ui/textarea";
import { addReview } from "@/lib/actions/reviews.actions";
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
      toast.error("Failed to submit review. Please try again.");
      console.error("Failed to submit review. Please try again: ", err);
    } finally {
      setLoading(false);
      refresh.refresh();
      toast.success("Review added successfully.");
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-background p-5 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold">Write your review</h2>
        <p className="text-sm text-muted-foreground">
          Share what worked, what stayed with you, and who might enjoy it.
        </p>
      </div>

      <div className="flex items-start gap-2">
        {/* <div className="flex justify-center items-center border w-10 h-10 overflow-hidden rounded-full">
          <Image
            className=" object-cover rounded-full w-full h-full"
            alt={name || "user"}
            src={avatar || ""}
            width={96}
            height={96}
            objectFit="fill"
          ></Image>
        </div> */}
        <div className="flex-col items-end gap-2 flex w-full">
          <Textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="min-h-32 resize-none rounded-xl bg-foreground leading-7"
            placeholder="Write a few thoughts about the book..."
          />
          <ActionButton
            onClick={handleSubmit}
            disabled={loading}
            color="bg-theme-accent text-theme-accent-foreground hover:bg-theme-accent/90"
            className="w-fit rounded-full"
            label={loading ? "Submitting..." : "Submit"}
          />
        </div>
      </div>
    </div>
  );
}
