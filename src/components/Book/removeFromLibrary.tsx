"use client";

import { removeBookFromLib } from "@/lib/actions/book.actions";

import { toast } from "sonner";
import { ActionButton } from "../ui/actionButton";
import { Trash } from "lucide-react";
const iconMap = {
  remove: Trash,
};
function RemoveFromLibrary({
  bookId,
  label,
  iconName,
}: {
  bookId: string;
  label: string;
  iconName?: keyof typeof iconMap;
}) {
  const icon = iconName ? iconMap[iconName] : undefined;

  const handleRemove = async () => {
    const res = await removeBookFromLib(bookId);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success("Book removed from your library");
  };

  return (
    <ActionButton
      className="bg-red-300 dark:text-primary-foreground hover:bg-red-400"
      onClick={handleRemove}
      label={label}
      icon={icon}
    >
      {label}
    </ActionButton>
  );
}
export default RemoveFromLibrary;
