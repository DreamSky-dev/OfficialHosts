"use client";

import { Quote, Star } from "lucide-react";

const stats = [
  { value: "4.9", label: "Average host rating", shortLabel: "Avg. rating" },
  { value: "500+", label: "Properties launched", shortLabel: "Launched" },
  { value: "98%", label: "Would recommend", shortLabel: "Recommend" },
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

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="size-3 fill-foreground text-foreground md:size-3.5"
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
      className={`group flex flex-col rounded-xl border p-4 transition-colors md:rounded-2xl md:p-8 ${
        item.featured
          ? "border-foreground/20 bg-foreground/5 shadow-sm"
          : "border-border hover:border-foreground/15 hover:bg-muted/30"
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3 md:gap-4">
        <Quote
          className="size-6 shrink-0 text-foreground/15 transition-colors group-hover:text-foreground/25 md:size-8"
          aria-hidden
        />
        <StarRating />
      </div>
      <blockquote className="mt-3 flex-1 text-sm leading-snug text-foreground md:mt-4 md:text-base md:leading-relaxed">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <footer className="mt-4 flex items-center gap-3 border-t border-border pt-4 md:mt-8 md:gap-4 md:pt-6">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-medium text-background md:size-11 md:text-sm">
          {item.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground md:text-base">
            {item.name}
          </p>
          <p className="truncate text-xs text-muted-foreground md:text-sm">
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

type TestimonialsSectionProps = {
  embedded?: boolean;
};

export function TestimonialsSection({
  embedded = false,
}: TestimonialsSectionProps) {
  const featured = testimonials.find((t) => t.featured)!;
  const rest = testimonials.filter((t) => !t.featured);
  const mobileTestimonials = testimonials.slice(0, 3);

  return (
    <section className="bg-background">
      {!embedded && (
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

        <div className="mx-auto mt-8 grid max-w-sm grid-cols-3 gap-4 md:hidden">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-medium tabular-nums tracking-tight text-foreground">
                {stat.value}
              </p>
              <p className="mt-1 text-xs leading-snug text-muted-foreground">
                {stat.shortLabel}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 hidden max-w-3xl flex-wrap items-center justify-center gap-3 md:flex">
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
      )}

      <div
        className={
          embedded
            ? "mx-auto max-w-7xl"
            : "mx-auto max-w-7xl px-6 pb-12 md:px-12 lg:px-20"
        }
      >
        {embedded && (
          <div className="mb-4 grid max-w-sm grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-medium tabular-nums tracking-tight text-foreground">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                  {stat.shortLabel}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Mobile: top 3 reviews */}
        <div className="grid grid-cols-1 gap-3 md:hidden">
          {mobileTestimonials.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </div>

        {/* Tablet and up: full review grid */}
        <div className="hidden md:grid md:grid-cols-1 md:gap-4 lg:grid-cols-3 lg:gap-6">
          <TestimonialCard
            item={featured}
            className="lg:col-span-2 lg:row-span-1"
          />
          {rest.slice(0, 1).map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </div>
        <div className="mt-4 hidden gap-4 md:grid md:grid-cols-2 lg:mt-6 lg:grid-cols-3 lg:gap-6">
          {rest.slice(1).map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
