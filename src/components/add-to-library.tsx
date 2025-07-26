"use client";

import { addBookToLib } from "@/lib/actions/book.actions";
import type { BookType } from "@/types";
import { TrackingStatus } from "@prisma/client";
import { toast } from "sonner";
import { ActionButton } from "./ui/button-book";

interface AddToLibraryProps {
  item: BookType;
  status: TrackingStatus;
  label?: string;
}

function AddToLibrary({ item, status, label = "Button" }: AddToLibraryProps) {
  const handleClick = async () => {
    const res = await addBookToLib(item, status);
    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(
      `${item.title} Added to "${status
        .toLowerCase()
        .replace(/_/g, " ")}"${" "}List`
    );
  };

  return (
    <ActionButton onClick={handleClick} label={label}>
      {label ?? `Add to ${status.toLowerCase().replace(/_/g, " ")}`}
    </ActionButton>
  );
}
export default AddToLibrary;
