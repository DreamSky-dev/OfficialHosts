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

const faqItems = [
  {
    question: "Is OfficialHosts for single-property owners?",
    answer:
      "Yes. Many hosts start with one cabin, condo, or home. OfficialHosts is built for owners who want a professional direct-booking site without enterprise complexity.",
  },
  {
    question:
      "Why do I need my own vacation rental website if I already use Airbnb or Vrbo?",
    answer:
      "OTAs are great for discovery, but they own the guest relationship and charge fees on every booking. Your official site gives repeat guests a direct path to book with you again, on your brand, without marketplace commission.",
  },
  {
    question: "Do I have to stop using Airbnb or Vrbo?",
    answer:
      "No. Many hosts use OfficialHosts alongside OTAs. Keep your listings where guests discover you, and use your official site for repeat guests, private links, and direct payments.",
  },
  {
    question: "Can guests book directly?",
    answer:
      "Yes. With Pro, you can accept inquiries and take deposits or full payments through Stripe or PayPal on your vacation rental website.",
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
  {
    question: "Can I turn my vacation rental website on or off?",
    answer:
      "Yes. Toggle each listing's visibility from your dashboard in seconds.",
  },
  {
    question: "Can I add rental agreements later?",
    answer:
      "Yes. You can add agreements and policies as your direct-booking workflow matures.",
  },
  {
    question: "Can I add video to my property vacation rental website?",
    answer:
      "Yes. Enrich your property pages with video and gallery content as you customize your site.",
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

export function EditorialSection() {
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

  return (
    <section className="bg-background">
      {/* Savings calculator */}
      <div
        id="savings"
        className="border-t border-border px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36"
      >
        <div className="mx-auto max-w-6xl">
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

          <div className="mt-12 overflow-hidden rounded-2xl border border-border lg:mt-16">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
              {/* Controls */}
              <div className="space-y-8 border-b border-border p-6 md:p-8 lg:border-b-0 lg:border-r">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Your booking profile
                </p>

                <div>
                  <label
                    htmlFor="nightly-rate"
                    className="text-sm font-medium text-foreground"
                  >
                    Nightly rate
                  </label>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">$</span>
                    <Input
                      id="nightly-rate"
                      type="number"
                      min={50}
                      max={2000}
                      value={nightlyRate}
                      onChange={(e) =>
                        setNightlyRate(
                          Math.min(
                            2000,
                            Math.max(50, Number(e.target.value) || 50),
                          ),
                        )
                      }
                      className="h-11 border-border bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <label className="text-sm font-medium text-foreground">
                      Nights booked per month
                    </label>
                    <span className="tabular-nums text-sm font-medium text-foreground">
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
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <label className="text-sm font-medium text-foreground">
                      Platform service fee
                    </label>
                    <span className="tabular-nums text-sm font-medium text-foreground">
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
                  />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Typical OTA host fees range from 3%–25% depending on
                    platform and pricing model.
                  </p>
                </div>
              </div>

              {/* Results */}
              <div className="flex flex-col bg-muted/20">
                <div className="grid flex-1 gap-px bg-border sm:grid-cols-2">
                  {/* Marketplace column */}
                  <div className="flex flex-col bg-background p-6 md:p-8">
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      Marketplace
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">
                      Airbnb &amp; Vrbo
                    </p>
                    <ul className="mt-6 flex-1 space-y-3 text-sm text-muted-foreground">
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
                    <div className="mt-6 border-t border-border pt-4">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        Net income
                      </p>
                      <p className="mt-1 text-2xl font-medium tabular-nums tracking-tight text-foreground">
                        {formatCurrency(savings.platformNet)}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {savings.feeShare.toFixed(0)}% lost to fees
                      </p>
                    </div>
                  </div>

                  {/* OfficialHosts column */}
                  <div className="flex flex-col border-t border-border bg-foreground/5 p-6 sm:border-t-0 sm:border-l md:p-8">
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      Direct booking
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">
                      OfficialHosts
                    </p>
                    <ul className="mt-6 flex-1 space-y-3 text-sm text-muted-foreground">
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
                    <div className="mt-6 border-t border-foreground/10 pt-4">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        Net income
                      </p>
                      <p className="mt-1 text-2xl font-medium tabular-nums tracking-tight text-foreground">
                        {formatCurrency(savings.monthlyRevenue)}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        100% of booking revenue
                      </p>
                    </div>
                  </div>
                </div>

                {/* Savings highlight */}
                <div className="border-t border-border bg-foreground px-6 py-8 text-background md:px-8">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-background/70">
                        You keep with direct bookings
                      </p>
                      <p className="mt-2 text-4xl font-medium tabular-nums tracking-tight md:text-5xl">
                        {formatCurrency(savings.monthlySavings)}
                        <span className="text-lg font-normal text-background/70">
                          {" "}
                          / month
                        </span>
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-sm text-background/70">
                        Annual savings
                      </p>
                      <p className="mt-1 text-xl font-medium tabular-nums">
                        {formatCurrency(savings.annualSavings)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats band */}
      <div className="grid grid-cols-2 border-t border-border md:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={cn(
              "border-b border-r border-border p-8 text-center md:border-b-0",
              index % 2 === 1 && "border-r-0 md:border-r",
              index === stats.length - 1 && "border-r-0",
            )}
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-3 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div
        id="faq"
        className="border-t border-border px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-16 lg:items-start">
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

            <Accordion
              type="single"
              collapsible
              className="flex flex-col gap-3"
            >
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`item-${index}`}
                  className={cn(
                    "overflow-hidden rounded-2xl border border-border bg-background px-5 md:px-6",
                    "border-b border-border transition-[border-color,box-shadow] duration-200",
                    "data-[state=open]:border-foreground/15 data-[state=open]:shadow-sm",
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
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

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

          {/* CTA */}
          <div className="mt-20 overflow-hidden rounded-2xl border border-border bg-foreground md:mt-28">
            <div className="grain-overlay relative grid gap-10 px-8 py-14 text-background md:px-12 md:py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-12 lg:py-20">
              <div className="text-left">
                <p className="text-xs font-medium uppercase tracking-widest text-background/60">
                  Your brand, your guests
                </p>
                <h3 className="mt-4 max-w-xl text-2xl font-medium tracking-tight md:text-3xl lg:text-[2.125rem] lg:leading-tight">
                  Don&apos;t build Airbnb&apos;s brand. Build your own.
                </h3>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-background/75">
                  Launch your official property vacation rental website, welcome
                  direct inquiries, and keep more of every booking you earn.
                </p>
                <p className="mt-6 text-sm text-background/55">
                  Airbnb and Vrbo help you find guests. OfficialHosts helps you
                  keep them.
                </p>
              </div>

              <div className="flex flex-col gap-4 lg:items-stretch">
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-12 w-full rounded-full px-8"
                  asChild
                >
                  <Link href="#create">
                    Start building your official site
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full rounded-full border-background/25 bg-transparent text-background hover:bg-background/10"
                  asChild
                >
                  <Link href="#pricing">Compare plans</Link>
                </Button>
                <ul className="mt-2 grid gap-2 border-t border-background/15 pt-6 text-sm text-background/65 sm:grid-cols-2 lg:grid-cols-1">
                  {faqHighlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2">
                      <Check
                        className="size-4 shrink-0 text-background/80"
                        aria-hidden
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
