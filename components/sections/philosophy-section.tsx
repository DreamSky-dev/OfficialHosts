"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

const platformIssues = [
  "You do not own the guest relationship on Airbnb or Vrbo",
  "Platform service fees reduce your profit on every booking",
  "Algorithm and policy changes can affect your visibility overnight",
  "Reviews and repeat guests stay tied to the platform, not your brand",
];

const officialHostsBenefits = [
  "Your own brand guests recognize and trust",
  "A direct booking path you control end to end",
  "A repeat-guest channel with listing codes and private links",
  "Inquiries and payments on your terms, not a marketplace's",
];

/** Replace `src` with `/images/platform-marketplace.jpg` and `/images/platform-direct-booking.jpg` after generating assets (see prompts in project chat). */
const platformComparisonImages = {
  marketplace: {
    src: "/images/past-method.webp",
    alt: "Guest browsing vacation rentals on a marketplace app, relationship stays with the platform",
    label: "Marketplace booking",
  },
  direct: {
    src: "/images/new-method.webp",
    alt: "Guest booking on a host's branded direct vacation rental website",
    label: "Direct booking site",
  },
} as const;

export function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [alpineTranslateX, setAlpineTranslateX] = useState(-100);
  const [forestTranslateX, setForestTranslateX] = useState(100);
  const [titleOpacity, setTitleOpacity] = useState(1);
  const rafRef = useRef<number | null>(null);

  const updateTransforms = useCallback(() => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = sectionRef.current.offsetHeight;
    const scrollableRange = sectionHeight - windowHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableRange));

    setAlpineTranslateX((1 - progress) * -100);
    setForestTranslateX((1 - progress) * 100);
    setTitleOpacity(1 - progress);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateTransforms);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransforms();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateTransforms]);

  return (
    <section id="why-direct" className="bg-background">
      <div ref={sectionRef} className="relative" style={{ height: "200vh" }}>
        <div className="sticky top-0 flex h-screen items-center justify-center">
          <div className="relative w-full">
            <div
              className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
              style={{ opacity: titleOpacity }}
            >
              <h2 className="px-6 text-center text-[10vw] font-medium leading-[0.95] tracking-tighter text-foreground md:text-[8vw] lg:text-[6vw]">
                Stop renting your <br />
                guest relationships
              </h2>
            </div>

            <div className="relative z-10 grid grid-cols-1 gap-4 px-6 md:grid-cols-2 md:px-12 lg:px-20">
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                style={{
                  transform: `translate3d(${alpineTranslateX}%, 0, 0)`,
                  WebkitTransform: `translate3d(${alpineTranslateX}%, 0, 0)`,
                }}
              >
                <Image
                  src="/images/past-method.webp"
                  alt="Airbnb and Vrbo marketplace listings"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6">
                  <span className="rounded-full bg-[rgba(255,255,255,0.2)] px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                    Airbnb &amp; Vrbo
                  </span>
                </div>
              </div>

              <div
                className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                style={{
                  transform: `translate3d(${forestTranslateX}%, 0, 0)`,
                  WebkitTransform: `translate3d(${forestTranslateX}%, 0, 0)`,
                }}
              >
                <Image
                  src="/images/new-method.webp"
                  alt="OfficialHosts direct booking vacation rental website"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6">
                  <span className="rounded-full bg-[rgba(255,255,255,0.2)] px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                    OfficialHosts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-6 pt-20 pb-0 md:px-12 md:pt-28 lg:px-20 lg:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Platform dependence
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Marketplaces find guests. You keep the relationship.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              Airbnb and Vrbo are useful for discovery, but they were never
              designed to hand you the guest for life. OfficialHosts gives you
              an official home for repeat bookings.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-border lg:mt-16">
            <div className="grid md:grid-cols-2">
              <div className="flex flex-col border-b border-border md:border-b-0 md:border-r">
                <div className="relative aspect-[5/3] w-full bg-muted">
                  <Image
                    src={platformComparisonImages.marketplace.src}
                    alt={platformComparisonImages.marketplace.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                    {platformComparisonImages.marketplace.label}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Marketplace
                  </p>
                  <p className="mt-2 text-lg font-semibold text-foreground">
                    Airbnb &amp; Vrbo
                  </p>
                  <ul className="mt-6 flex-1 space-y-4">
                    {platformIssues.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <Minus
                          className="mt-0.5 size-3.5 shrink-0 text-destructive"
                          aria-hidden
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      Guest relationship
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      Owned by the platform
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bg-foreground/5">
                <div className="relative aspect-[5/3] w-full bg-muted">
                  <Image
                    src={platformComparisonImages.direct.src}
                    alt={platformComparisonImages.direct.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                    {platformComparisonImages.direct.label}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Direct booking
                  </p>
                  <p className="mt-2 text-lg font-semibold text-foreground">
                    OfficialHosts
                  </p>
                  <ul className="mt-6 flex-1 space-y-4">
                    {officialHostsBenefits.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <Check
                          className="mt-0.5 size-3.5 shrink-0 text-foreground"
                          aria-hidden
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 border-t border-foreground/10 pt-4">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      Guest relationship
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      Owned by you
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-8 border-y border-border py-12 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <p className="font-display text-xl leading-[1.2] tracking-tight text-foreground sm:text-2xl md:text-[1.65rem]">
                Create your official direct-booking vacation rental website
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                From your existing listing in minutes, no design skills required.
              </p>
            </div>
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
          </div>
        </div>
      </div>
    </section>
  );
}
