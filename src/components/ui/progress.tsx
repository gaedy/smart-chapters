"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

function Progress({
  className,
  indicatorClassName,
  value,
  showLabel = true,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  indicatorClassName?: string;
  showLabel?: boolean;
}) {
  const safeValue = value ?? 0;

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-foreground h-8 relative w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <div className="h-full w-full p-1 ">
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            "bg-progress h-full rounded-full transition-all",
            indicatorClassName,
          )}
          style={{
            width: `${safeValue}%`,
            minWidth: safeValue > 0 && safeValue < 10 ? "10%" : undefined,
          }}
        />
      </div>

      {showLabel && (
        <span className="absolute inset-0 flex items-center justify-start px-2.5 text-sm font-medium text-accent-foreground">
          {value}%
        </span>
      )}
    </ProgressPrimitive.Root>
  );
}

export { Progress };
