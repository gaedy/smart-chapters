import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium shadow-none transition-colors duration-200 active:brightness-95 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default:
          "bg-theme-accent text-theme-accent-foreground hover:bg-theme-accent/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "bg-background text-primary hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-foreground text-primary hover:bg-foreground-dark",
        ghost: "bg-transparent text-primary hover:bg-foreground hover:text-primary",
        link: "bg-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 md:h-9 has-[>svg]:px-3",
        sm: "h-9 rounded-md gap-1.5 px-3 md:h-8 has-[>svg]:px-2.5",
        lg: "h-11 rounded-md px-6 md:h-10 has-[>svg]:px-4",
        icon: "size-10 md:size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
