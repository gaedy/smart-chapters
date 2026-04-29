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
    <div className="flex flex-col gap-3 rounded-3xl bg-background p-5">
      <div>
        <h2 className="text-lg font-semibold">Write your review</h2>
        <p className="text-sm text-muted-foreground">
          Capture what stayed with you after reading.
        </p>
      </div>

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
            className="min-h-28 rounded-2xl bg-foreground"
          />
          <ActionButton
            onClick={handleSubmit}
            disabled={loading}
            color="bg-primary text-primary-foreground hover:bg-primary/90"
            className="w-fit rounded-full hover:scale-100 hover:shadow-md"
            label={loading ? "Submitting..." : "Submit"}
          />
        </div>
      </div>
    </div>
  );
}
