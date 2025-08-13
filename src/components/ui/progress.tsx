"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const safeValue = value ?? 0;

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-background h-8 relative w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <div className="h-full w-full p-1 ">
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="bg-progress h-full rounded-full transition-all "
          style={{
            width: `${safeValue}%`,
            minWidth: safeValue > 0 && safeValue < 10 ? "10%" : undefined,
          }}
        />
      </div>

      <span className="absolute inset-0 flex items-center justify-start px-2.5 text-sm font-medium text-accent-foreground">
        {value}%
      </span>
    </ProgressPrimitive.Root>
  );
}

export { Progress };
