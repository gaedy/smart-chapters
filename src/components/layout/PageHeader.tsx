import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex max-w-2xl flex-col gap-2">
        <h1 className="text-pretty text-2xl font-medium leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="flex min-w-0 items-center sm:shrink-0">{action}</div>
      )}
    </div>
  );
}
