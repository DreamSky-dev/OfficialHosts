"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ctaButtonClassName } from "@/components/sections/section-cta";

const comparisonRows = [
  {
    id: "fees",
    marketplace: "15–20% service fees on every booking",
    direct: "Keep 100% of booking revenue",
  },
  {
    id: "control",
    marketplace: "Algorithm changes can cut visibility overnight",
    direct: "A direct booking path you control end to end",
  },
  {
    id: "brand",
    marketplace: "Reviews and repeat guests stay on the platform",
    direct: "A brand your guests recognize and trust",
  },
  {
    id: "repeat",
    marketplace: "Inquiries and payments on the platform's terms",
    direct: "Private links and listing codes for repeat guests",
  },
] as const;

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

type PhilosophySectionProps = {
  embedded?: boolean;
};

export function PhilosophySection({ embedded = false }: PhilosophySectionProps) {
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
    <section className="bg-background">
      <div
        ref={sectionRef}
        className="relative hidden md:block"
        style={{ height: "200vh" }}
      >
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
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

      <div
        className={
          embedded
            ? "pb-0"
            : "border-t border-border px-6 pt-20 pb-0 md:px-12 md:pt-28 lg:px-20 lg:pt-36"
        }
      >
        <div className="mx-auto max-w-6xl">
          {!embedded && (
            <div className="max-w-2xl">
              <p className="text-[0.7rem] font-medium uppercase tracking-widest text-foreground/55">
                Platform dependence
              </p>
              <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-tight">
                Marketplaces find guests. You keep the relationship.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/70 md:text-lg">
                Airbnb and Vrbo are useful for discovery, but they were never
                designed to hand you the guest for life. OfficialHosts gives you
                an official home for repeat bookings.
              </p>
            </div>
          )}

          {embedded && (
            <p className="mb-4 text-sm leading-relaxed text-foreground/70">
              Airbnb and Vrbo are great for discovery. OfficialHosts is where you
              keep the guest for life.
            </p>
          )}

          <div
            className={
              embedded
                ? "overflow-hidden rounded-2xl border border-border"
                : "mt-12 overflow-hidden rounded-2xl border border-border lg:mt-16"
            }
          >
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
                <div
                  className="flex flex-1 flex-col p-6 md:p-8"
                  aria-label="Marketplace drawbacks"
                >
                  <p className="text-[0.7rem] font-medium uppercase tracking-widest text-foreground/55">
                    Marketplace
                  </p>
                  <p className="mt-2 text-lg font-semibold text-foreground">
                    Airbnb &amp; Vrbo
                  </p>
                  <ul className="mt-6 flex-1 space-y-5">
                    {comparisonRows.map((row) => (
                      <li
                        key={row.id}
                        className="flex items-start gap-3 text-sm leading-[1.6] text-foreground/70"
                      >
                        <Minus
                          className="mt-0.5 size-4 shrink-0 text-destructive"
                          aria-hidden
                        />
                        <span>{row.marketplace}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto border-t border-border pt-5">
                    <p className="text-[0.7rem] font-medium uppercase tracking-widest text-foreground/55">
                      Guest relationship
                    </p>
                    <p className="mt-2 inline-flex rounded-full border border-destructive/20 bg-destructive/5 px-3 py-1.5 text-sm font-medium text-foreground">
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
                <div
                  className="flex flex-1 flex-col p-6 md:p-8"
                  aria-label="Direct booking benefits"
                >
                  <p className="text-[0.7rem] font-medium uppercase tracking-widest text-foreground/55">
                    Direct booking
                  </p>
                  <p className="mt-2 text-lg font-semibold text-foreground">
                    OfficialHosts
                  </p>
                  <ul className="mt-6 flex-1 space-y-5">
                    {comparisonRows.map((row) => (
                      <li
                        key={row.id}
                        className="flex items-start gap-3 text-sm leading-[1.6] text-foreground/70"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-emerald-600"
                          strokeWidth={2.5}
                          aria-hidden
                        />
                        <span>{row.direct}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto border-t border-foreground/10 pt-5">
                    <p className="text-[0.7rem] font-medium uppercase tracking-widest text-foreground/55">
                      Guest relationship
                    </p>
                    <p className="mt-2 inline-flex rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-800">
                      Owned by you
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!embedded && (
            <div className="mt-12 flex flex-col gap-8 border-y border-border py-12 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="font-display text-xl leading-[1.2] tracking-tight text-foreground sm:text-2xl md:text-[1.65rem]">
                  Create your official direct-booking vacation rental website
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  From your existing listing in minutes, no design skills required.
                </p>
              </div>
              <Button className={ctaButtonClassName} size="lg" asChild>
                <Link href="#create">
                  Create Vacation Rental Website
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
