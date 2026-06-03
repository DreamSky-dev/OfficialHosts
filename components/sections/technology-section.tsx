"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const startOffset = windowHeight * 0.9;
      const endOffset = windowHeight * 0.1;
      const totalDistance = startOffset - endOffset;
      const currentPosition = startOffset - rect.top;
      const newProgress = Math.max(
        0,
        Math.min(1, currentPosition / totalDistance),
      );
      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      className="text-3xl font-medium leading-snug tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-tight"
    >
      {words.map((word, index) => {
        const wordProgress = index / words.length;
        const isRevealed = progress > wordProgress;

        return (
          <span
            key={index}
            className="transition-colors duration-150"
            style={{
              color: isRevealed
                ? "var(--foreground)"
                : "color-mix(in oklch, var(--foreground) 18%, transparent)",
            }}
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}

const steps = [
  {
    step: "01",
    shortLabel: "Import",
    title: "Paste a Link or Start Fresh",
    detail:
      "Drop in any Airbnb, Vrbo, or Booking.com URL or upload photos and property details manually.",
    preview: "Paste URL · or upload photos & details",
  },
  {
    step: "02",
    shortLabel: "Build",
    title: "AI Builds Your Site",
    detail:
      "AI pulls your photos, amenities, rules, and copy into a polished site.",
    preview: "Generating site…",
  },
  {
    step: "03",
    shortLabel: "Publish",
    title: "Customize & Publish",
    detail: "Pick a template, tweak the copy, and publish on your domain.",
    preview: "Live",
  },
  {
    step: "04",
    shortLabel: "Get paid",
    title: "Share & Get Paid Direct",
    detail:
      "Share your link or listing code. Collect payments via Stripe or PayPal.",
    preview: "OH-7K2M9 · Direct booking received",
  },
];

const workflowWords = ["Import", "Build", "Publish", "Get Paid"] as const;

const sideImages = [
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000",
    alt: "Beach vacation rental",
    position: "left" as const,
    span: 1,
    label: "Coastal rental",
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000",
    alt: "Luxury vacation home",
    position: "left" as const,
    span: 1,
    label: "Luxury home",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000",
    alt: "Modern rental interior",
    position: "right" as const,
    span: 1,
    label: "Modern interior",
  },
  {
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1000",
    alt: "Desert vacation retreat",
    position: "right" as const,
    span: 1,
    label: "Desert retreat",
  },
];

export function TechnologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textSectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  const descriptionText =
    "Paste your Airbnb or Vrbo URL or upload photos and details manually then let AI build your property site, publish on your brand, and share a listing code for direct bookings.";

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const scrollableHeight = window.innerHeight * 2;
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
        setScrollProgress(progress);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const textOverlayOpacity = Math.max(0, 1 - scrollProgress / 0.35);
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  const centerWidth = 100 - imageProgress * 58;
  const centerHeight = 100 - imageProgress * 30;
  const sideWidth = imageProgress * 22;
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + imageProgress * 100;
  const sideTranslateRight = 100 - imageProgress * 100;
  const sideTranslateY = -(imageProgress * 15);
  const borderRadius = imageProgress * 24;
  const gap = imageProgress * 16;

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative bg-background"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          <div
            className="relative flex h-full w-full items-stretch justify-center"
            style={{
              gap: `${gap}px`,
              padding: `${imageProgress * 16}px`,
              paddingBottom: `${48 + imageProgress * 32}px`,
            }}
          >
            <div
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages
                .filter((img) => img.position === "left")
                .map((img, idx) => (
                  <div
                    key={idx}
                    className="relative overflow-hidden will-change-transform"
                    style={{
                      flex: img.span,
                      borderRadius: `${borderRadius}px`,
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 40vw, 22vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                      {img.label}
                    </span>
                  </div>
                ))}
            </div>

            <div
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: `${centerHeight}%`,
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              <Image
                src="/images/hero-5.webp"
                alt="Vacation rental property website preview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/50" />
              <span
                className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-md"
                style={{ opacity: imageProgress }}
              >
                Your direct-booking site
              </span>
            </div>

            <div
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages
                .filter((img) => img.position === "right")
                .map((img, idx) => (
                  <div
                    key={idx}
                    className="relative overflow-hidden will-change-transform"
                    style={{
                      flex: img.span,
                      borderRadius: `${borderRadius}px`,
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 40vw, 22vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                      {img.label}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6"
          style={{ opacity: textOverlayOpacity }}
        >
          <div className="max-w-4xl text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-white/60">
              How it works
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.5rem]">
              {workflowWords.map((word, index) => {
                const wordFadeStart = index * 0.07;
                const wordFadeEnd = wordFadeStart + 0.07;
                const wordProgress = Math.max(
                  0,
                  Math.min(
                    1,
                    (scrollProgress - wordFadeStart) /
                      (wordFadeEnd - wordFadeStart),
                  ),
                );
                const wordOpacity = 1 - wordProgress;
                const wordBlur = wordProgress * 10;

                return (
                  <span
                    key={word}
                    className="inline-block"
                    style={{
                      opacity: wordOpacity,
                      filter: `blur(${wordBlur}px)`,
                      marginRight: index < workflowWords.length - 1 ? "0.3em" : "0",
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
              Four steps. No OTA fees on direct bookings.
            </p>
          </div>
        </div>
      </div>

      <div className="h-[200vh]" />

      <div
        ref={textSectionRef}
        className="relative overflow-hidden border-t border-border bg-background px-6 pt-20 pb-8 md:px-12 md:pt-28 md:pb-10 lg:px-20 lg:pt-36 lg:pb-12"
      >
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Direct-booking workflow
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-tight">
              From paste or upload to live site in minutes
            </h2>
          </div>

          <div className="mt-8 max-w-4xl lg:mt-10">
            <ScrollRevealText text={descriptionText} />
          </div>

          <div className="mt-12 lg:mt-16">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Step by step
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-border">
              <div className="grid md:grid-cols-2">
                {steps.map((item, index) => (
                  <div
                    key={item.step}
                    className={cn(
                      "flex flex-col p-6 md:p-8",
                      index < 2 && "border-b border-border",
                      index % 2 === 0 && "md:border-r md:border-border",
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        Step {item.step}
                      </p>
                      <span className="rounded-full border border-border bg-background px-3 py-1 font-mono text-[11px] text-muted-foreground">
                        {item.shortLabel}
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {item.detail}
                    </p>
                    <div className="mt-6 border-t border-border pt-4">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        Preview
                      </p>
                      <p className="mt-1 font-mono text-sm text-foreground/80">
                        {item.preview}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
