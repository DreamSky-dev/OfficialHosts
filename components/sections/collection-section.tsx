"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    badge: null,
    description: "Best for individual hosts testing direct bookings.",
    monthlyPrice: "Free",
    yearlyPrice: "Free",
    priceNote: "No credit card required",
    features: [
      "1 property vacation rental website",
      "OfficialHosts subdomain",
      "Paste listing URL or start fresh",
      "AI-assisted content generation",
      "Basic inquiry form",
      "Listing on/off toggle",
    ],
    cta: "Start trial",
    highlighted: false,
    compareAt: null as number | null,
    amount: null as number | null,
  },
  {
    name: "Pro",
    badge: "Most Popular",
    description: "Best for serious hosts who want their own brand.",
    monthlyPrice: "$29",
    yearlyPrice: "$24",
    priceNote: "Everything you need to go live",
    features: [
      "Multiple property vacation rental websites",
      "Premium templates",
      "Custom domain support",
      "Direct inquiry forms",
      "Stripe / PayPal payment options",
      "Listing code access",
      "Dashboard management",
      "Priority AI generation",
    ],
    cta: "Start Pro trial",
    highlighted: true,
    compareAt: 29,
    amount: 29,
    yearlyAmount: 24,
  },
  {
    name: "Host Plus",
    badge: null,
    description: "Best for property managers and advanced hosts.",
    monthlyPrice: "From $49",
    yearlyPrice: "From $39",
    priceNote: "Volume pricing for teams",
    features: [
      "Unlimited or higher property limits",
      "Advanced branding",
      "Multi-listing management",
      "Custom domain for each property",
      "Advanced payment options",
      "Team / co-host access",
      "Priority support",
    ],
    cta: "Contact Us",
    highlighted: false,
    compareAt: null,
    amount: null,
  },
] as const;

type Plan = (typeof plans)[number];
type Billing = "monthly" | "yearly";

function displayPrice(plan: Plan, billing: Billing) {
  return billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
}

function showPerMonth(plan: Plan) {
  return plan.monthlyPrice !== "Free";
}

function PlanCard({
  plan,
  billing,
}: {
  plan: Plan;
  billing: Billing;
}) {
  const price = displayPrice(plan, billing);
  const isPro = plan.name === "Pro";
  const showSavings =
    billing === "yearly" &&
    isPro &&
    "yearlyAmount" in plan &&
    plan.yearlyAmount != null;

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-2xl border p-6 transition-all duration-300 md:p-8",
        plan.highlighted
          ? "z-10 border-foreground bg-foreground text-background shadow-xl md:-mt-4 md:mb-4 md:scale-[1.02]"
          : "border-border bg-card hover:border-foreground/20 hover:shadow-md",
      )}
    >
      {plan.badge && (
        <span
          className={cn(
            "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-medium uppercase tracking-widest",
            plan.highlighted
              ? "bg-background text-foreground"
              : "bg-foreground text-background",
          )}
        >
          {plan.badge}
        </span>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3
            className={cn(
              "text-xl font-semibold tracking-tight",
              plan.highlighted ? "text-background" : "text-foreground",
            )}
          >
            {plan.name}
          </h3>
          <p
            className={cn(
              "mt-2 text-sm leading-relaxed",
              plan.highlighted ? "text-background/70" : "text-muted-foreground",
            )}
          >
            {plan.description}
          </p>
        </div>
      </div>

      <div
        className={cn(
          "mt-8 border-t pt-8",
          plan.highlighted ? "border-background/20" : "border-border",
        )}
      >
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          {showSavings && plan.compareAt != null && (
            <span
              className={cn(
                "text-lg font-normal line-through",
                plan.highlighted
                  ? "text-background/50"
                  : "text-muted-foreground",
              )}
            >
              ${plan.compareAt}
            </span>
          )}
          <p
            className={cn(
              "text-4xl font-medium tracking-tight md:text-[2.75rem]",
              plan.highlighted ? "text-background" : "text-foreground",
            )}
          >
            {price}
            {showPerMonth(plan) && (
              <span
                className={cn(
                  "ml-1 text-base font-normal",
                  plan.highlighted
                    ? "text-background/60"
                    : "text-muted-foreground",
                )}
              >
                /mo
              </span>
            )}
          </p>
        </div>
        <p
          className={cn(
            "mt-2 text-sm",
            plan.highlighted ? "text-background/60" : "text-muted-foreground",
          )}
        >
          {billing === "yearly" && isPro
            ? "Billed annually · $288/year"
            : plan.priceNote}
        </p>
        {showSavings && (
          <span className="mt-3 inline-flex rounded-full bg-background/15 px-3 py-1 text-xs font-medium text-background">
            Save 17% with annual billing
          </span>
        )}
      </div>

      <ul className="mt-8 flex-1 space-y-3.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <span
              className={cn(
                "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                plan.highlighted
                  ? "bg-background/15 text-background"
                  : "bg-muted text-foreground",
              )}
            >
              <Check className="size-3" strokeWidth={2.5} aria-hidden />
            </span>
            <span
              className={cn(
                "leading-snug",
                plan.highlighted ? "text-background/85" : "text-muted-foreground",
              )}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Button
        className={cn(
          "mt-8 h-11 w-full rounded-full text-sm font-medium",
          plan.highlighted &&
            "bg-background text-foreground hover:bg-background/90",
        )}
        variant={plan.highlighted ? "secondary" : "outline"}
        asChild
      >
        <Link href="/signup" className="group/btn">
          {plan.cta}
          <ArrowRight
            className="size-4 transition-transform group-hover/btn:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </Button>
    </article>
  );
}

type CollectionSectionProps = {
  embedded?: boolean;
};

export function CollectionSection({ embedded = false }: CollectionSectionProps) {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section className="bg-background">
      {!embedded && (
      <div className="px-6 pt-12 pb-20 text-center md:px-12 md:pt-16 md:pb-28 lg:px-20 lg:pt-20 lg:pb-32">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Pricing
        </p>
        <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Simple pricing for every host
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
          Whether you own one property or manage multiple rentals, OfficialHosts
          gives you the tools to build your own brand and accept direct bookings.
        </p>

        <div className="mx-auto mt-10 flex flex-col items-center gap-3">
          <div
            className="inline-flex items-center rounded-full border border-border bg-muted/40 p-1"
            role="group"
            aria-label="Billing period"
          >
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              aria-pressed={billing === "monthly"}
              className={cn(
                "rounded-full px-6 py-2.5 text-sm font-medium transition-all",
                billing === "monthly"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("yearly")}
              aria-pressed={billing === "yearly"}
              className={cn(
                "flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all",
                billing === "yearly"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Yearly
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                  billing === "yearly"
                    ? "bg-background/20 text-background"
                    : "bg-foreground/10 text-foreground",
                )}
              >
                Save 17%
              </span>
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            Switch anytime · Cancel when you want
          </p>
        </div>
      </div>
      )}

      {embedded && (
        <div className="mb-6 flex flex-col items-center gap-3">
          <div
            className="inline-flex items-center rounded-full border border-border bg-muted/40 p-1"
            role="group"
            aria-label="Billing period"
          >
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              aria-pressed={billing === "monthly"}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all",
                billing === "monthly"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("yearly")}
              aria-pressed={billing === "yearly"}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all",
                billing === "yearly"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Yearly
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                  billing === "yearly"
                    ? "bg-background/20 text-background"
                    : "bg-foreground/10 text-foreground",
                )}
              >
                Save 17%
              </span>
            </button>
          </div>
        </div>
      )}

      <div
        className={
          embedded
            ? "mx-auto max-w-6xl"
            : "mx-auto max-w-6xl px-6 pb-16 md:px-12 lg:px-20"
        }
      >
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:gap-5 lg:gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} billing={billing} />
          ))}
        </div>
      </div>

      {!embedded && (
      <div className="border-t border-border px-6 py-12 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <p className="text-sm font-medium text-foreground">
            No commission. No middleman. Your guests, your brand.
          </p>
          <p className="text-sm text-muted-foreground">
            Payments and custom domains may require a Pro plan or above. All
            plans include SSL and mobile-optimized sites.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
            {["Stripe", "PayPal", "Custom domains", "Free SSL"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-muted/30 px-4 py-1.5 text-xs font-medium text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      )}
    </section>
  );
}
