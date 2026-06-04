"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Minus, Plus, Check, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { SectionCta } from "@/components/sections/section-cta";

const faqItems = [
  {
    question: "Is OfficialHosts for single-property owners?",
    answer:
      "Yes. Many hosts start with one cabin, condo, or home. OfficialHosts is built for owners who want a professional direct-booking site without enterprise complexity.",
    featured: true,
  },
  {
    question:
      "Why do I need my own vacation rental website if I already use Airbnb or Vrbo?",
    answer:
      "OTAs are great for discovery, but they own the guest relationship and charge fees on every booking. Your official site gives repeat guests a direct path to book with you again, on your brand, without marketplace commission.",
    featured: true,
  },
  {
    question: "Do I have to stop using Airbnb or Vrbo?",
    answer:
      "No. Many hosts use OfficialHosts alongside OTAs. Keep your listings where guests discover you, and use your official site for repeat guests, private links, and direct payments.",
    featured: true,
  },
  {
    question: "Can guests book directly?",
    answer:
      "Yes. With Pro, you can accept inquiries and take deposits or full payments through Stripe or PayPal on your vacation rental website.",
    featured: true,
  },
  {
    question: "Can I collect inquiries before taking payments?",
    answer:
      "Yes. Start with a basic inquiry form on the free Starter plan, then add payment options when you are ready.",
  },
  {
    question: "When do I need to pay?",
    answer:
      "Starter is free. Pro and Host Plus trials let you explore premium features before committing to a paid plan.",
    featured: true,
  },
  {
    question: "Can I use a custom domain?",
    answer:
      "Yes, on Pro and Host Plus. Connect your own domain with automatic SSL so guests see your brand in the browser bar.",
  },
  {
    question: "What is a listing code?",
    answer:
      "A short code like OH-7K2M9 that opens your private direct-booking site, ideal for repeat guests, QR codes, emails, and business cards.",
  },
];

const faqHighlights = [
  "Free Starter plan, no credit card to begin",
  "$0 guest booking commission on every direct booking",
  "Works alongside Airbnb, Vrbo, and your existing listings",
] as const;

const stats = [
  { label: "Average rating", value: "4.9" },
  { label: "Properties launched", value: "500+" },
  { label: "Guest booking commission", value: "$0" },
  { label: "Setup time", value: "Minutes" },
] as const;

/** Hidden snap stops for platform fee (no tick UI) */
const FEE_STEPS = [3, 5, 8, 12, 15, 20, 25] as const;

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

type EditorialSectionProps = {
  embedded?: boolean;
  part?: "full" | "savings" | "faq";
};

export function EditorialSection({
  embedded = false,
  part = "full",
}: EditorialSectionProps) {
  const [nightlyRate, setNightlyRate] = useState(250);
  const [nightsPerMonth, setNightsPerMonth] = useState(12);
  const [feeIndex, setFeeIndex] = useState(() => FEE_STEPS.indexOf(15));

  const platformFeePercent = FEE_STEPS[feeIndex];

  const savings = useMemo(() => {
    const monthlyRevenue = nightlyRate * nightsPerMonth;
    const platformFees = Math.round(
      monthlyRevenue * (platformFeePercent / 100),
    );
    const platformNet = monthlyRevenue - platformFees;
    const monthlySavings = platformFees;
    const annualSavings = monthlySavings * 12;
    const feeShare =
      monthlyRevenue > 0 ? (platformFees / monthlyRevenue) * 100 : 0;
    return {
      monthlyRevenue,
      platformFees,
      platformNet,
      monthlySavings,
      annualSavings,
      feeShare,
    };
  }, [nightlyRate, nightsPerMonth, platformFeePercent]);

  const showSavings = part === "full" || part === "savings";
  const showFaq = part === "full" || part === "faq";

  return (
    <section className="bg-background">
      {showSavings && (
      <div
        id={part === "full" ? "savings" : undefined}
        className={
          embedded
            ? "pb-0"
            : "border-t border-border px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28 lg:px-20 lg:py-36"
        }
      >
        <div className="mx-auto max-w-6xl">
          {!embedded && (
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Savings calculator
              </p>
              <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-tight">
                See what platform fees cost you
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                Compare marketplace take rates with direct bookings on your
                official site. OfficialHosts charges $0 in guest booking
                commissions.
              </p>
            </div>
          )}

          <div
            className={
              embedded
                ? "overflow-hidden rounded-2xl border border-border"
                : "mt-10 overflow-hidden rounded-2xl border border-border sm:mt-12 lg:mt-16"
            }
          >
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
              {/* Results — shown first on mobile so the comparison is visible without scrolling */}
              <div className="order-1 flex flex-col bg-muted/20 lg:order-2">
                {/* Savings highlight — pinned to top on mobile */}
                <div className="border-b border-border bg-foreground px-4 py-5 text-background sm:px-6 sm:py-8 md:px-8 lg:border-b-0 lg:border-t">
                  <div className="flex items-end justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[0.65rem] uppercase tracking-widest text-background/70 sm:text-xs">
                        You keep with direct bookings
                      </p>
                      <p className="mt-1 text-3xl font-medium tabular-nums tracking-tight sm:mt-2 sm:text-4xl md:text-5xl">
                        {formatCurrency(savings.monthlySavings)}
                        <span className="text-sm font-normal text-background/70 sm:text-lg">
                          {" "}
                          / mo
                        </span>
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[0.65rem] text-background/70 sm:text-sm">
                        Annual
                      </p>
                      <p className="mt-0.5 text-base font-medium tabular-nums sm:mt-1 sm:text-xl">
                        {formatCurrency(savings.annualSavings)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid flex-1 grid-cols-2 gap-px bg-border">
                  {/* Marketplace column */}
                  <div className="flex flex-col bg-background p-4 sm:p-6 md:p-8">
                    <p className="text-[0.65rem] font-medium uppercase tracking-widest text-muted-foreground sm:text-xs">
                      Marketplace
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-snug text-foreground sm:mt-2 sm:text-lg">
                      Airbnb &amp; Vrbo
                    </p>
                    <ul className="mt-4 hidden flex-1 space-y-3 text-sm text-muted-foreground sm:mt-6 sm:block">
                      <li className="flex items-start justify-between gap-4">
                        <span>Gross revenue</span>
                        <span className="shrink-0 font-medium tabular-nums text-foreground">
                          {formatCurrency(savings.monthlyRevenue)}
                        </span>
                      </li>
                      <li className="flex items-start justify-between gap-4">
                        <span className="flex items-center gap-1.5">
                          <Minus
                            className="size-3.5 shrink-0 text-destructive"
                            aria-hidden
                          />
                          Service fees
                        </span>
                        <span className="shrink-0 font-medium tabular-nums text-destructive">
                          −{formatCurrency(savings.platformFees)}
                        </span>
                      </li>
                    </ul>
                    <div className="mt-3 border-t border-border pt-3 sm:mt-6 sm:pt-4">
                      <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground sm:text-xs">
                        Net income
                      </p>
                      <p className="mt-0.5 text-xl font-medium tabular-nums tracking-tight text-foreground sm:mt-1 sm:text-2xl">
                        {formatCurrency(savings.platformNet)}
                      </p>
                      <p className="mt-0.5 text-[0.65rem] text-destructive sm:mt-1 sm:text-xs sm:text-muted-foreground">
                        <span className="sm:hidden">
                          −{formatCurrency(savings.platformFees)} fees
                        </span>
                        <span className="hidden sm:inline">
                          {savings.feeShare.toFixed(0)}% lost to fees
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* OfficialHosts column */}
                  <div className="flex flex-col border-l border-border bg-foreground/5 p-4 sm:p-6 md:p-8">
                    <p className="text-[0.65rem] font-medium uppercase tracking-widest text-muted-foreground sm:text-xs">
                      Direct booking
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-snug text-foreground sm:mt-2 sm:text-lg">
                      OfficialHosts
                    </p>
                    <ul className="mt-4 hidden flex-1 space-y-3 text-sm text-muted-foreground sm:mt-6 sm:block">
                      <li className="flex items-start justify-between gap-4">
                        <span>Gross revenue</span>
                        <span className="shrink-0 font-medium tabular-nums text-foreground">
                          {formatCurrency(savings.monthlyRevenue)}
                        </span>
                      </li>
                      <li className="flex items-start justify-between gap-4">
                        <span className="flex items-center gap-1.5">
                          <Check
                            className="size-3.5 shrink-0 text-foreground"
                            aria-hidden
                          />
                          Booking commission
                        </span>
                        <span className="shrink-0 font-medium tabular-nums text-foreground">
                          $0
                        </span>
                      </li>
                    </ul>
                    <div className="mt-3 border-t border-foreground/10 pt-3 sm:mt-6 sm:pt-4">
                      <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground sm:text-xs">
                        Net income
                      </p>
                      <p className="mt-0.5 text-xl font-medium tabular-nums tracking-tight text-foreground sm:mt-1 sm:text-2xl">
                        {formatCurrency(savings.monthlyRevenue)}
                      </p>
                      <p className="mt-0.5 text-[0.65rem] text-muted-foreground sm:mt-1 sm:text-xs">
                        <span className="sm:hidden">$0 commission</span>
                        <span className="hidden sm:inline">
                          100% of booking revenue
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="order-2 space-y-5 border-t border-border p-4 sm:space-y-8 sm:p-6 md:p-8 lg:order-1 lg:border-r lg:border-t-0">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Adjust your numbers
                </p>

                <div className="flex items-center justify-between gap-4">
                  <label
                    htmlFor="nightly-rate"
                    className="shrink-0 text-sm font-medium text-foreground"
                  >
                    Nightly rate
                  </label>
                  <div className="flex w-28 items-center gap-1.5 sm:w-auto sm:gap-3">
                    <span className="text-sm text-muted-foreground">$</span>
                    <Input
                      id="nightly-rate"
                      type="number"
                      min={50}
                      max={2000}
                      inputMode="numeric"
                      value={nightlyRate}
                      onChange={(e) =>
                        setNightlyRate(
                          Math.min(
                            2000,
                            Math.max(50, Number(e.target.value) || 50),
                          ),
                        )
                      }
                      className="h-10 border-border bg-background sm:h-11"
                    />
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <label className="text-sm font-medium text-foreground">
                      Nights booked per month
                    </label>
                    <span className="rounded-md bg-muted px-2 py-0.5 tabular-nums text-sm font-semibold text-foreground">
                      {nightsPerMonth}
                    </span>
                  </div>
                  <Slider
                    min={1}
                    max={30}
                    step={1}
                    value={[nightsPerMonth]}
                    onValueChange={([v]) => setNightsPerMonth(v)}
                    aria-label="Nights booked per month"
                    className="py-2 [&_[data-slot=slider-thumb]]:size-5 sm:py-0 sm:[&_[data-slot=slider-thumb]]:size-4"
                  />
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <label className="text-sm font-medium text-foreground">
                      Platform service fee
                    </label>
                    <span className="rounded-md bg-muted px-2 py-0.5 tabular-nums text-sm font-semibold text-foreground">
                      {platformFeePercent}%
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={FEE_STEPS.length - 1}
                    step={1}
                    value={[feeIndex]}
                    onValueChange={([v]) => setFeeIndex(v)}
                    aria-label="Platform service fee percentage"
                    aria-valuetext={`${platformFeePercent}%`}
                    className="py-2 [&_[data-slot=slider-thumb]]:size-5 sm:py-0 sm:[&_[data-slot=slider-thumb]]:size-4"
                  />
                  <p className="hidden text-xs leading-relaxed text-muted-foreground sm:block">
                    Typical OTA host fees range from 3%–25% depending on
                    platform and pricing model.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {part === "full" && (
      <div className="hidden divide-y divide-border border-t border-border md:grid md:grid-cols-4 md:divide-y-0">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={cn(
              "flex items-baseline justify-between gap-4 px-6 py-4 md:block md:border-r md:border-border md:p-8 md:text-center",
              index === stats.length - 1 && "md:border-r-0",
            )}
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {stat.label}
            </p>
            <p className="shrink-0 text-2xl font-medium tracking-tight text-foreground md:mt-3 md:text-4xl">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      )}

      {showFaq && (
      <div
        id={part === "full" ? "faq" : undefined}
        className={
          embedded
            ? "pb-0"
            : "border-t border-border px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36"
        }
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-16 lg:items-start">
            {!embedded && (
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                FAQ
              </p>
              <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-tight">
                Questions hosts ask before switching
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                Clear answers on direct booking, OTAs, payments, and getting
                your official site live, without leaving your current channels.
              </p>

              <ul className="mt-8 space-y-3 border-t border-border pt-8">
                {faqHighlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-foreground"
                      aria-hidden
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 hidden flex-col gap-3 lg:flex">
                <Button size="lg" className="h-12 rounded-full px-8" asChild>
                  <Link href="#create">
                    Start building your site
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-full px-8"
                  asChild
                >
                  <Link href="#pricing">Compare plans</Link>
                </Button>
              </div>
            </div>
            )}

            {embedded && (
              <ul className="space-y-3 rounded-2xl border border-border bg-muted/20 p-5 lg:col-span-2">
                {faqHighlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-foreground"
                      aria-hidden
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            )}

            <Accordion
              type="single"
              collapsible
              className={cn(
                "flex flex-col gap-3",
                embedded && "lg:col-span-2",
              )}
            >
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`item-${index}`}
                  className={cn(
                    "overflow-hidden rounded-2xl border border-border bg-background px-5 md:px-6",
                    "border-b border-border transition-[border-color,box-shadow] duration-200",
                    "data-[state=open]:border-foreground/15 data-[state=open]:shadow-sm",
                    !item.featured && "hidden md:block",
                  )}
                >
                  <AccordionTrigger className="group gap-5 py-5 text-left hover:no-underline md:py-6 [&>svg]:hidden">
                    <span className="min-w-0 flex-1 text-[15px] font-medium leading-snug text-foreground md:text-base">
                      {item.question}
                    </span>
                    <span
                      className="relative flex size-9 shrink-0 items-center justify-center rounded-full text-foreground"
                      aria-hidden
                    >
                      <span className="relative flex size-4 items-center justify-center">
                        <Plus
                          className={cn(
                            "size-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                            "group-data-[state=open]:rotate-45 group-data-[state=open]:scale-75 group-data-[state=open]:opacity-0",
                          )}
                        />
                        <X
                          className={cn(
                            "absolute inset-0 size-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                            "scale-75 -rotate-45 opacity-0",
                            "group-data-[state=open]:rotate-0 group-data-[state=open]:scale-100 group-data-[state=open]:opacity-100",
                          )}
                        />
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">
                    <div className="border-t border-border pt-4 pb-5 md:pb-6">
                      {item.answer}
                      <SectionCta
                        variant="compact"
                        label="Start building your site"
                        href="#create"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {!embedded && (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:hidden">
            <Button size="lg" className="h-12 rounded-full" asChild>
              <Link href="#create">
                Start building your site
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 rounded-full"
              asChild
            >
              <Link href="#pricing">Compare plans</Link>
            </Button>
          </div>
          )}
        </div>
      </div>
      )}
    </section>
  );
}
