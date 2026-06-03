"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const examples = [
  { src: "/images/example-1.webp", alt: "Example vacation rental website" },
  { src: "/images/example-2.webp", alt: "Example vacation rental website" },
  { src: "/images/example-3.webp", alt: "Example vacation rental website" },
  { src: "/images/example-4.webp", alt: "Example vacation rental website" },
  { src: "/images/example-5.webp", alt: "Example vacation rental website" },
  { src: "/images/example-6.webp", alt: "Example vacation rental website" },
];

export function GallerySection() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState("100vh");
  const [translateX, setTranslateX] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const calculateHeight = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const totalHeight = viewportHeight + (containerWidth - viewportWidth);
      setSectionHeight(`${totalHeight}px`);
    };

    const timer = setTimeout(calculateHeight, 100);
    window.addEventListener("resize", calculateHeight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  const updateTransform = useCallback(() => {
    if (!galleryRef.current || !containerRef.current) return;

    const rect = galleryRef.current.getBoundingClientRect();
    const containerWidth = containerRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    const totalScrollDistance = containerWidth - viewportWidth;
    const scrolled = Math.max(0, -rect.top);
    const progress = Math.min(1, scrolled / totalScrollDistance);
    setTranslateX(progress * -totalScrollDistance);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateTransform);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransform();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateTransform]);

  return (
    <section id="examples" className="relative bg-background">
      <div className="px-6 pt-20 pb-8 md:px-12 lg:px-20">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Live examples
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Example property vacation rental websites, not just luxury mansions
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Cabins, city condos, beach houses, and family rentals all deserve an
          official site. You do not need a beach mansion to benefit from
          OfficialHosts.
        </p>
      </div>

      <div
        ref={galleryRef}
        className="relative"
        style={{ height: sectionHeight }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="flex h-full items-center">
            <div
              ref={containerRef}
              className="flex gap-6 px-6"
              style={{
                transform: `translate3d(${translateX}px, 0, 0)`,
                WebkitTransform: `translate3d(${translateX}px, 0, 0)`,
              }}
            >
              {examples.map((example, index) => (
                <div
                  key={example.src}
                  className="relative h-[65vh] w-[85vw] flex-shrink-0 overflow-hidden rounded-2xl md:w-[55vw] lg:w-[40vw]"
                >
                  <Image
                    src={example.src}
                    alt={example.alt}
                    fill
                    className="object-cover"
                    priority={index < 3}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-6 pb-12 pt-12 md:px-12 lg:px-20 lg:pb-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl text-center sm:text-left">
            <p className="font-display text-xl leading-[1.2] tracking-tight text-foreground sm:text-2xl md:text-[1.65rem]">
              Your property, your site
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Cabins, condos, and beach houses all get the same polished
              direct-booking experience, built from your listing in minutes.
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
    </section>
  );
}
