import { ReactNode } from "react";
import { BookOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex min-h-64 w-full flex-col items-center justify-center gap-4 rounded-3xl bg-background p-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-muted-foreground">
        <BookOpen className="h-5 w-5" />
      </div>
      <div className="flex max-w-md flex-col gap-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}
