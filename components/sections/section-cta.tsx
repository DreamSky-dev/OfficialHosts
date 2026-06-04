import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ctaButtonClassName =
  "group h-12 shrink-0 rounded-full border-0 bg-[var(--oh-gold)] px-7 text-[15px] font-semibold tracking-tight text-[var(--oh-navy)] shadow-[0_2px_14px_rgba(197,160,89,0.4)] transition-all hover:-translate-y-0.5 hover:bg-[var(--oh-gold-hover)] hover:shadow-[0_6px_24px_rgba(197,160,89,0.5)] md:h-14 md:px-9 md:text-base";

type SectionCtaProps = {
  label?: string;
  href?: string;
  description?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: "default" | "compact";
  className?: string;
};

export function SectionCta({
  label = "Create Vacation Rental Website",
  href = "#create",
  description,
  secondaryLabel,
  secondaryHref,
  variant = "default",
  className,
}: SectionCtaProps) {
  const compact = variant === "compact";

  return (
    <div className={cn(compact ? "mt-4" : "mt-6", className)}>
      {description && (
        <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      <div
        className={cn(
          "flex flex-col gap-3",
          !compact && "sm:flex-row sm:items-center",
        )}
      >
        <Button
          className={cn(
            ctaButtonClassName,
            compact && "h-11 w-full px-6 text-sm md:h-11 md:px-6 md:text-sm",
          )}
          size="lg"
          asChild
        >
          <Link href={href}>
            {label}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </Button>
        {secondaryLabel && secondaryHref && (
          <Button
            variant="outline"
            className={cn(
              "h-12 shrink-0 rounded-full border-border px-7 text-[15px] font-medium tracking-tight transition-all hover:bg-muted/50 md:h-14 md:px-9 md:text-base",
              compact && "h-11 w-full px-6 text-sm md:h-11 md:px-6 md:text-sm",
            )}
            size="lg"
            asChild
          >
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
