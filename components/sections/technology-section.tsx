"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Globe,
  Link2,
  Loader2,
  Palette,
  Sparkles,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type WorkflowStep = {
  step: string;
  shortLabel: string;
  title: string;
  detail: string;
  isReward?: boolean;
};

const steps: WorkflowStep[] = [
  {
    step: "01",
    shortLabel: "Import",
    title: "Import Your Property",
    detail:
      "Paste your Airbnb, Vrbo, or Booking.com link, or start from scratch with photos and details.",
  },
  {
    step: "02",
    shortLabel: "Build",
    title: "AI Builds Your Site",
    detail:
      "OfficialHosts turns your photos, amenities, rules, and copy into a polished direct-booking website.",
  },
  {
    step: "03",
    shortLabel: "Publish",
    title: "Customize & Publish",
    detail:
      "Choose a premium template, adjust your brand, and publish on your own domain.",
  },
  {
    step: "04",
    shortLabel: "Get paid",
    title: "Share & Get Paid Direct",
    detail:
      "Share your link or guest code, accept direct bookings, and collect payments through Stripe or PayPal.",
    isReward: true,
  },
];

function StepMockup({ stepId }: { stepId: string }) {
  switch (stepId) {
    case "01":
      return (
        <div
          className="rounded-xl border border-border/60 bg-muted/20 p-3"
          aria-hidden
        >
          <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-2 shadow-xs">
            <Link2 className="size-3 shrink-0 text-muted-foreground" />
            <span className="truncate text-[10px] text-foreground/65">
              airbnb.com/rooms/482910…
            </span>
          </div>
          <div className="mt-2.5 flex items-center gap-2">
            <div className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-dashed border-border/80 bg-background/70 py-2">
              <Upload className="size-3 shrink-0 text-muted-foreground" />
              <span className="text-[10px] font-medium text-muted-foreground">
                Upload photos
              </span>
            </div>
            <div className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-border">
              <Image
                src="/images/hero-5.webp"
                alt=""
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
          </div>
        </div>
      );
    case "02":
      return (
        <div
          className="rounded-xl border border-border/60 bg-muted/20 p-3"
          aria-hidden
        >
          <div className="flex items-center gap-2">
            <Sparkles className="size-3.5 shrink-0 text-[var(--oh-gold)]" />
            <span className="text-[10px] font-medium text-foreground">
              AI generating your homepage
            </span>
            <Loader2 className="ml-auto size-3 shrink-0 animate-spin text-muted-foreground/50" />
          </div>
          <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-border">
            <div className="h-full w-[72%] rounded-full bg-[var(--oh-gold)] motion-safe:animate-pulse" />
          </div>
          <ul className="mt-2.5 space-y-1.5">
            {[
              { label: "Photos imported", done: true },
              { label: "Amenities added", done: true },
              { label: "House rules", done: true },
              { label: "Copy generated", done: false },
            ].map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2 text-[10px]"
              >
                <span
                  className={cn(
                    "flex size-3.5 shrink-0 items-center justify-center rounded-full",
                    item.done
                      ? "bg-emerald-500/15 text-emerald-600"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {item.done ? (
                    <Check className="size-2" strokeWidth={3} />
                  ) : (
                    <Loader2 className="size-2 animate-spin" />
                  )}
                </span>
                <span
                  className={
                    item.done ? "text-foreground/80" : "text-muted-foreground"
                  }
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "03":
      return (
        <div
          className="rounded-xl border border-border/60 bg-muted/20 p-3"
          aria-hidden
        >
          <div className="flex gap-1.5">
            {["bg-[var(--oh-navy)]", "bg-[var(--oh-gold)]/80", "bg-muted-foreground/30"].map(
              (color, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-8 flex-1 rounded-md border",
                    color,
                    i === 0 ? "border-[var(--oh-gold)]/50 ring-1 ring-[var(--oh-gold)]/30" : "border-border/60",
                  )}
                />
              ),
            )}
          </div>
          <div className="mt-2.5 flex items-center gap-2">
            <Palette className="size-3 shrink-0 text-muted-foreground" />
            <div className="flex gap-1">
              {["#0E2A47", "#C5A059", "#FFFFFF", "#737373"].map((color) => (
                <span
                  key={color}
                  className="size-3 rounded-full border border-border/80"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5">
            <Globe className="size-3 shrink-0 text-muted-foreground" />
            <span className="truncate font-mono text-[10px] text-foreground/65">
              yourproperty.com
            </span>
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
              <span className="size-1 rounded-full bg-emerald-500" />
              Live
            </span>
          </div>
        </div>
      );
    case "04":
      return (
        <div
          className="rounded-xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/[0.1] to-emerald-500/[0.03] p-3"
          aria-hidden
        >
          <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/90 px-2.5 py-2">
            <Link2 className="size-3 shrink-0 text-muted-foreground" />
            <span className="truncate font-mono text-[10px] text-foreground/70">
              officialhosts.com/o/OH-7K2M9
            </span>
          </div>
          <div className="mt-2.5 flex items-start gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.08] p-2.5">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
              <Check className="size-3 text-emerald-600" strokeWidth={2.5} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold text-foreground">
                Direct booking received
              </p>
              <p className="mt-0.5 text-[9px] text-muted-foreground">
                Guest booked through your site · $1,240.00
              </p>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/12 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
              <Check className="size-2.5" strokeWidth={2.5} />
              Payment secured
            </span>
            <div className="flex items-center gap-1.5">
              <span className="rounded border border-border/70 bg-background px-1.5 py-0.5 text-[8px] font-medium text-muted-foreground">
                Stripe
              </span>
              <span className="rounded border border-border/70 bg-background px-1.5 py-0.5 text-[8px] font-medium text-muted-foreground">
                PayPal
              </span>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

function TimelineConnector({
  isComplete,
  orientation = "horizontal",
}: {
  isComplete: boolean;
  orientation?: "horizontal" | "vertical";
}) {
  if (orientation === "vertical") {
    return (
      <div
        className={cn(
          "mt-2 w-px min-h-6 flex-1",
          isComplete ? "bg-[var(--oh-gold)]/40" : "bg-border",
        )}
        aria-hidden
      />
    );
  }

  return (
    <div
      className="hidden shrink-0 items-center self-center px-0.5 lg:flex"
      aria-hidden
    >
      <div
        className={cn(
          "h-px w-3 xl:w-5",
          isComplete ? "bg-[var(--oh-gold)]/50" : "bg-border",
        )}
      />
      <ChevronRight
        className={cn(
          "size-4",
          isComplete ? "text-[var(--oh-gold)]" : "text-border",
        )}
        strokeWidth={1.75}
      />
    </div>
  );
}

function WorkflowStepCard({
  item,
  isActive,
  onHover,
  compact = false,
}: {
  item: WorkflowStep;
  isActive: boolean;
  onHover: () => void;
  compact?: boolean;
}) {
  const isReward = item.isReward ?? false;

  return (
    <article
      className={cn(
        "group relative flex min-w-0 flex-1 flex-col rounded-2xl border transition-all duration-300",
        compact ? "p-5" : "p-6 lg:p-5 xl:p-6",
        isReward
          ? cn(
              "border-emerald-500/30 bg-gradient-to-br from-emerald-500/[0.07] via-background to-background",
              isActive &&
                "shadow-[0_12px_40px_rgba(16,185,129,0.12)] ring-1 ring-emerald-500/20",
            )
          : cn(
              "bg-background",
              isActive
                ? "border-[var(--oh-gold)]/40 shadow-[0_8px_30px_rgba(197,160,89,0.12)]"
                : "border-border hover:border-border/80 hover:shadow-sm",
            ),
      )}
      onMouseEnter={onHover}
      onFocus={onHover}
      tabIndex={0}
      aria-label={`Step ${item.step}: ${item.title}`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Step {item.step}
        </p>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition-colors duration-300",
            isReward
              ? "bg-emerald-500/12 text-emerald-700"
              : isActive
                ? "bg-[var(--oh-gold)]/12 text-[var(--oh-navy)]"
                : "border border-border bg-background text-muted-foreground",
          )}
        >
          {item.shortLabel}
        </span>
      </div>

      <h3
        className={cn(
          "mt-3 font-semibold tracking-tight text-foreground",
          compact ? "text-base" : "text-lg lg:text-base xl:text-lg",
        )}
      >
        {item.title}
      </h3>
      <p
        className={cn(
          "mt-2 leading-relaxed text-muted-foreground",
          compact ? "text-xs" : "text-sm lg:text-xs xl:text-sm",
        )}
      >
        {item.detail}
      </p>

      <div className="mt-4 flex-1">
        <StepMockup stepId={item.step} />
      </div>
    </article>
  );
}

export function TechnologySection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="how-it-works"
      className="relative bg-background"
    >
      <div className="relative overflow-hidden border-t border-border px-6 pt-20 pb-8 md:px-12 md:pt-28 md:pb-10 lg:px-20 lg:pt-36 lg:pb-12">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              How it works
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-3xl lg:text-4xl lg:leading-tight">
              Launch your direct-booking website in 4 simple steps
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Import your property, let AI build the site, customize your
              brand, and start receiving direct bookings.
            </p>
          </div>

          {/* Desktop: connected horizontal timeline */}
          <div
            className="mt-10 hidden items-stretch lg:flex"
            onMouseLeave={() => setActiveStep(0)}
          >
            {steps.map((item, index) => (
              <div key={item.step} className="contents">
                <WorkflowStepCard
                  item={item}
                  isActive={activeStep === index}
                  onHover={() => setActiveStep(index)}
                />
                {index < steps.length - 1 && (
                  <TimelineConnector isComplete={activeStep > index} />
                )}
              </div>
            ))}
          </div>

          {/* Mobile / tablet: vertical timeline */}
          <div
            className="mt-10 space-y-0 lg:hidden"
            onMouseLeave={() => setActiveStep(0)}
          >
            {steps.map((item, index) => (
              <div key={item.step} className="relative flex gap-4 pb-6 last:pb-0">
                <div className="relative flex shrink-0 flex-col items-center self-stretch pt-1">
                  <button
                    type="button"
                    className={cn(
                      "relative z-10 flex size-8 items-center justify-center rounded-full text-[11px] font-semibold transition-all duration-300",
                      item.isReward
                        ? "bg-emerald-500/15 text-emerald-700 ring-2 ring-emerald-500/20"
                        : activeStep === index
                          ? "bg-[var(--oh-gold)] text-[var(--oh-navy)] shadow-[0_2px_10px_rgba(197,160,89,0.35)]"
                          : activeStep > index
                            ? "bg-[var(--oh-gold)]/20 text-[var(--oh-navy)]"
                            : "border border-border bg-background text-muted-foreground",
                    )}
                    onMouseEnter={() => setActiveStep(index)}
                    onFocus={() => setActiveStep(index)}
                    onClick={() => setActiveStep(index)}
                    aria-label={`Go to step ${item.step}`}
                    aria-current={activeStep === index ? "step" : undefined}
                  >
                    {item.step}
                  </button>
                  {index < steps.length - 1 && (
                    <TimelineConnector
                      isComplete={activeStep > index}
                      orientation="vertical"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1 pb-2">
                  <WorkflowStepCard
                    item={item}
                    isActive={activeStep === index}
                    onHover={() => setActiveStep(index)}
                    compact
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-8 border-t border-border pt-12 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
            <div className="max-w-xl text-center sm:text-left">
              <p className="font-display text-xl leading-[1.2] tracking-tight text-foreground sm:text-2xl md:text-[1.65rem]">
                Your property, your site
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Cabins, condos, and beach houses all get the same polished
                direct-booking experience—whether you paste a link or upload
                manually.
              </p>
            </div>
            <div className="flex flex-col items-stretch gap-3 sm:shrink-0 sm:flex-row sm:items-center">
              <Button
                className="group h-12 shrink-0 rounded-full border-0 bg-[var(--oh-gold)] px-7 text-[15px] font-semibold tracking-tight text-[var(--oh-navy)] shadow-[0_2px_14px_rgba(197,160,89,0.4)] transition-all hover:-translate-y-0.5 hover:bg-[var(--oh-gold-hover)] hover:shadow-[0_6px_24px_rgba(197,160,89,0.5)] md:h-14 md:px-9 md:text-base"
                size="lg"
                asChild
              >
                <Link href="#create">
                  Create Vacation Rental Website
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-12 shrink-0 rounded-full border-border px-7 text-[15px] font-medium tracking-tight transition-all hover:bg-muted/50 md:h-14 md:px-9 md:text-base"
                size="lg"
                asChild
              >
                <Link href="#faq">Read the FAQ</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
