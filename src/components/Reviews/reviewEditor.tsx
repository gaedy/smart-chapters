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
    <div className="flex flex-col gap-3">
      <span>Write your review</span>

      <div className="flex items-start gap-2 ">
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
            className="min-h-24 bg-background rounded-2xl"
          />
          <ActionButton
            onClick={handleSubmit}
            disabled={loading}
            className="w-fit"
            label={loading ? "Submitting..." : "Submit"}
          />
        </div>
      </div>
    </div>
  );
}
