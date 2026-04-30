import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SectionHeaderProps {
  title: string;
  description?: string;
  href?: string;
  actionLabel?: string;
}

export function SectionHeader({
  title,
  description,
  href,
  actionLabel = "View all",
}: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {href && (
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="shrink-0 rounded-full bg-transparent text-muted-foreground shadow-none hover:bg-accent hover:text-primary"
        >
          <Link href={href}>
            {actionLabel}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  );
}
