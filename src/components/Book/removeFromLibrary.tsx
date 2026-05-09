"use client";

import { removeBookFromLib } from "@/lib/actions/book.actions";

import { toast } from "sonner";
import { ActionButton } from "../ui/actionButton";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTransition } from "react";

const iconMap = {
  remove: Trash,
};
function RemoveFromLibrary({
  bookId,
  label,
  iconName,
  className,
}: {
  bookId: string;
  label: string;
  iconName?: keyof typeof iconMap;
  className?: string;
}) {
  const icon = iconName ? iconMap[iconName] : undefined;

  const updateRemove = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    startTransition(async () => {
      const res = await removeBookFromLib(bookId);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success("Book Removed From Your Library");
      updateRemove.refresh();
    });
  };

  return (
    <ActionButton
      className={cn(
        "rounded-full bg-destructive text-white hover:bg-destructive/90",
        className,
      )}
      onClick={handleRemove}
      disabled={isPending}
      label={label}
      icon={icon}
    >
      {label}
    </ActionButton>
  );
}
export default RemoveFromLibrary;
