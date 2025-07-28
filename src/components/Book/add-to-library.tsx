"use client";

import { addBookToLib } from "@/lib/actions/book.actions";
import type { BookType } from "@/types";
import { TrackingStatus } from "@prisma/client";
import { toast } from "sonner";
import { ActionButton } from "../ui/actionButton";
import { Check } from "lucide-react";
import { Bookmark, BookOpenCheck, BookOpenText } from "lucide-react";

const iconMap = {
  reading: BookOpenText,
  wantToRead: Bookmark,
  finished: BookOpenCheck,
  check: Check,
};

interface AddToLibraryProps {
  item: BookType;
  status: TrackingStatus;
  label?: string;
  color?: string;
  className?: string;

  iconName?: keyof typeof iconMap;
}

function AddToLibrary({
  item,
  status,
  label = "Button",
  color,

  className,
  iconName,
}: AddToLibraryProps) {
  const icon = iconName ? iconMap[iconName] : undefined;

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
    <ActionButton
      onClick={handleClick}
      className={className}
      color={color}
      label={label}
      icon={icon}
    >
      {label ?? `Add to ${status.toLowerCase().replace(/_/g, " ")}`}
    </ActionButton>
  );
}
export default AddToLibrary;
