"use client";

import Link from "next/link";
import { ArrowRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "4.9", label: "Average host rating" },
  { value: "500+", label: "Properties launched" },
  { value: "98%", label: "Would recommend" },
] as const;

const testimonials = [
  {
    quote:
      "I pasted my Airbnb link and had a gorgeous direct-booking site live the same afternoon. We've already saved thousands in OTA fees.",
    initials: "SM",
    name: "Sarah Mitchell",
    property: "Oceanview Villa · Maui, HI",
    badge: "Verified Host",
    featured: true,
  },
  {
    quote:
      "The AI copy nailed our amenities and house rules. Guests pay through Stripe on our site—we finally control the full booking experience.",
    initials: "JC",
    name: "James Chen",
    property: "Downtown Loft · Austin, TX",
    badge: "Direct Bookings",
    featured: false,
  },
  {
    quote:
      "Premium templates made us look like a boutique hotel brand. Inquiries are up and managing two listings from one dashboard is effortless.",
    initials: "ER",
    name: "Elena Rodriguez",
    property: "Coastal Cottage · San Diego, CA",
    badge: "Multi-Listing",
    featured: false,
  },
  {
    quote:
      "Setup took minutes, not weeks. We share a private guest code with repeat visitors and skip commission on every return booking.",
    initials: "MW",
    name: "Marcus Wright",
    property: "Lake House Retreat · Vermont",
    badge: "Repeat Guests",
    featured: false,
  },
  {
    quote:
      "Custom domain, free SSL, and PayPal for deposits—everything worked out of the box. OfficialHosts feels built for serious hosts.",
    initials: "PK",
    name: "Priya Kapoor",
    property: "Desert Oasis · Scottsdale, AZ",
    badge: "Custom Domain",
    featured: false,
  },
];

const press = [
  "Vacation Rental Weekly",
  "Host Success Podcast",
  "Direct Booking Co.",
  "Coastal Host Magazine",
];

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="size-3.5 fill-foreground text-foreground"
          aria-hidden
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  item,
  className = "",
}: {
  item: (typeof testimonials)[number];
  className?: string;
}) {
  return (
    <article
      className={`group flex flex-col rounded-2xl border p-6 transition-colors md:p-8 ${
        item.featured
          ? "border-foreground/20 bg-foreground/5 shadow-sm"
          : "border-border hover:border-foreground/15 hover:bg-muted/30"
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <Quote
          className="size-8 shrink-0 text-foreground/15 transition-colors group-hover:text-foreground/25"
          aria-hidden
        />
        <StarRating />
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground md:text-base md:leading-relaxed">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <footer className="mt-8 flex items-center gap-4 border-t border-border pt-6">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background">
          {item.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-foreground">{item.name}</p>
          <p className="truncate text-sm text-muted-foreground">
            {item.property}
          </p>
        </div>
        {/* <span className="hidden shrink-0 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground sm:inline-block">
          {item.badge}
        </span> */}
      </footer>
      {/* <p className="mt-3 text-xs font-medium uppercase tracking-widest text-muted-foreground sm:hidden">
        {item.badge}
      </p> */}
    </article>
  );
}

export function TestimonialsSection() {
  const featured = testimonials.find((t) => t.featured)!;
  const rest = testimonials.filter((t) => !t.featured);

  return (
    <section id="about" className="bg-background">
      <div className="px-6 pt-12 pb-20 text-center md:px-12 md:pt-16 md:pb-28 lg:px-20 lg:pt-20 lg:pb-32">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Trusted by hosts
        </p>
        <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Real hosts. Real results.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
          See why vacation rental owners switch to OfficialHosts for faster
          launches, lower fees, and better guest relationships.
        </p>

        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-full border border-border bg-muted/40 px-5 py-2.5 text-sm"
            >
              <span className="font-medium text-foreground">{stat.value}</span>
              <span className="text-muted-foreground"> · {stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-12 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          <TestimonialCard
            item={featured}
            className="lg:col-span-2 lg:row-span-1"
          />
          {rest.slice(0, 1).map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-6 lg:grid-cols-3 lg:gap-6">
          {rest.slice(1).map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </div>
      </div>

      <div className="border-t border-border px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground">
            As featured in
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {press.map((name) => (
              <span
                key={name}
                className="text-sm font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground md:text-base"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border px-6 pb-12 pt-12 md:px-12 lg:px-20 lg:pb-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl text-center sm:text-left">
            <p className="font-display text-xl leading-[1.2] tracking-tight text-foreground sm:text-2xl md:text-[1.65rem]">
              Ready to launch
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Create your official direct-booking vacation rental website,
              reduce platform dependence, and keep more booking revenue.
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-3 sm:shrink-0 sm:flex-row sm:items-center">
            <Button
              className="group h-12 shrink-0 rounded-full border-0 bg-[var(--oh-gold)] px-7 text-[15px] font-semibold tracking-tight text-[var(--oh-navy)] shadow-[0_2px_14px_rgba(197,160,89,0.4)] transition-all hover:-translate-y-0.5 hover:bg-[var(--oh-gold-hover)] hover:shadow-[0_6px_24px_rgba(197,160,89,0.5)] md:h-14 md:px-9 md:text-base"
              size="lg"
              asChild
            >
              <Link href="#pricing">
                Start Free Trial
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
              <Link href="/dashboard/add">Create Your Website</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
