"use client";

import { removeBookFromLib } from "@/lib/actions/book.actions";

import { toast } from "sonner";
import { ActionButton } from "../ui/actionButton";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
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

  const updateRemove = useRouter();

  const handleRemove = async () => {
    const res = await removeBookFromLib(bookId);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success("Book Removed From Your Library");
    updateRemove.refresh();
  };

  return (
    <ActionButton
      className="bg-red-400 hover:text-accent dark:text-primary-foreground hover:bg-red-400"
      onClick={handleRemove}
      label={label}
      icon={icon}
    >
      {label}
    </ActionButton>
  );
}
export default RemoveFromLibrary;
