"use client";

import { removeBookFromLib } from "@/lib/actions/book.actions";

import { toast } from "sonner";
import { ActionButton } from "./ui/button-book";

function RemoveFromLibrary({
  bookId,
  label,
}: {
  bookId: string;
  label: string;
}) {
  const handleRemove = async () => {
    const res = await removeBookFromLib(bookId);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success("Book removed from your library");
  };

  return (
    <ActionButton onClick={handleRemove} label={label}>
      {label}
    </ActionButton>
  );
}
export default RemoveFromLibrary;
