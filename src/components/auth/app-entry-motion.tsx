"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function AppEntryMotion({
  children,
  className,
  animateOnMount = true,
  offset = 0,
}: {
  children: ReactNode;
  className?: string;
  animateOnMount?: boolean;
  offset?: 0 | 2;
}) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animateOnMount && !prefersReducedMotion;
  const initial = shouldAnimate ? { opacity: 0.985, y: offset } : false;

  return (
    <motion.div
      className={cn(className)}
      initial={initial}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldAnimate ? 0.18 : 0,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        willChange: shouldAnimate ? "opacity, transform" : "auto",
      }}
    >
      {children}
    </motion.div>
  );
}
