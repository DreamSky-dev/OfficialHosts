"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Link2, Sparkles } from "lucide-react";
import { ListingUrlInput } from "@/components/listing-url-input";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const sideImages = [
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000",
    alt: "Luxury vacation home exterior",
    position: "left",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1000",
    alt: "Pool and palm trees at rental property",
    position: "left",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000",
    alt: "Modern vacation rental living space",
    position: "right",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000",
    alt: "Coastal vacation home",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [listingMode, setListingMode] = useState<"paste" | "fresh">("paste");

  useEffect(() => {
    if (isMobile) {
      setScrollProgress(0);
      return;
    }

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  const overlayOpacity = isMobile
    ? 1
    : Math.max(0, 1 - scrollProgress / 0.2);
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  const layoutProgress = isMobile ? 0 : imageProgress;
  const centerWidth = 100 - layoutProgress * 58;
  const centerHeight = 100 - layoutProgress * 30;
  const sideWidth = layoutProgress * 22;
  const sideOpacity = layoutProgress;
  const sideTranslateLeft = -100 + layoutProgress * 100;
  const sideTranslateRight = 100 - layoutProgress * 100;
  const borderRadius = layoutProgress * 24;
  const gap = layoutProgress * 16;
  const sideTranslateY = -(layoutProgress * 15);

  return (
    <section id="create" ref={sectionRef} className="relative bg-background">
      <div className="relative h-screen overflow-hidden md:sticky md:top-0">
        <div className="flex h-full w-full items-center justify-center">
          <div
            className="relative flex h-full w-full items-stretch justify-center"
            style={{
              gap: `${gap}px`,
              paddingTop: isMobile ? 0 : `${layoutProgress * 16}px`,
              paddingRight: isMobile ? 0 : `${layoutProgress * 16}px`,
              paddingLeft: isMobile ? 0 : `${layoutProgress * 16}px`,
              paddingBottom: isMobile ? "60px" : `${60 + layoutProgress * 40}px`,
            }}
          >
            <div
              className="hidden flex-col will-change-transform md:flex"
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
                    />
                  </div>
                ))}
            </div>

            <div
              className="relative overflow-hidden will-change-transform"
              style={
                isMobile
                  ? {
                      width: "100%",
                      height: "100%",
                      flex: "0 0 auto",
                    }
                  : {
                      width: `${centerWidth}%`,
                      height: `${centerHeight}%`,
                      flex: "0 0 auto",
                      borderRadius: `${borderRadius}px`,
                    }
              }
            >
              <Image
                src="/images/hero-5.webp"
                alt="Modern vacation home with pool and palm trees"
                fill
                className="object-cover"
                priority
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/50 transition-opacity duration-500"
                style={{ opacity: overlayOpacity }}
                aria-hidden
              />
            </div>

            <div
              className="hidden flex-col will-change-transform md:flex"
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
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Hero overlay: centered stack (title → subtext → toggle → hint → input) */}
        <div
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6"
          style={{ opacity: overlayOpacity }}
        >
          <div className="pointer-events-auto flex w-full max-w-2xl flex-col items-center pt-24 text-center md:pt-28">
            <h1 className="max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.75rem]">
              Keep your guests. Skip the commission.
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl md:mt-6 md:text-2xl">
              Airbnb and Vrbo help you find guests. OfficialHosts helps you keep
              them with your own direct-booking site.
            </p>

            <div className="mt-8 flex w-full max-w-md rounded-full border border-white/25 bg-white/10 p-1 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setListingMode("paste")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${listingMode === "paste" ? "bg-white text-foreground shadow-sm" : "text-white/80 hover:text-white"}`}
              >
                <Link2 className="size-4 shrink-0" aria-hidden />
                Paste Links
              </button>
              <button
                type="button"
                onClick={() => setListingMode("fresh")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${listingMode === "fresh" ? "bg-white text-foreground shadow-sm" : "text-white/80 hover:text-white"}`}
              >
                <Sparkles className="size-4 shrink-0" aria-hidden />
                Start Fresh
              </button>
            </div>

            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/70 md:text-[15px]">
              {listingMode === "paste" ? (
                <>
                  <span className="md:hidden">
                    Paste your Airbnb, Vrbo, or Booking.com URL. We&apos;ll
                    build your direct-booking site.
                  </span>
                  <span className="hidden md:inline">
                    Paste your Airbnb, Vrbo, or Booking.com listing URL. We
                    help you build a direct-booking site for{" "}
                    <span className="font-medium text-white">
                      single-property owners and OTA hosts
                    </span>
                    , no marketplace required.
                  </span>
                </>
              ) : (
                <>
                  <span className="md:hidden">
                    Start fresh with AI—no listing needed.{" "}
                    <span className="font-medium text-white">
                      Build your site in minutes.
                    </span>
                  </span>
                  <span className="hidden md:inline">
                    Start from scratch with AI-assisted content generation, no
                    existing listing required.{" "}
                    <span className="font-medium text-white">
                      Build your vacation rental website in minutes.
                    </span>
                  </span>
                </>
              )}
            </p>

            {listingMode === "paste" ? (
              <ListingUrlInput
                variant="hero"
                showLabel={false}
                className="mt-6 w-full max-w-2xl"
                placeholder="Paste your listing URL, then press Enter"
              />
            ) : (
              <Button
                type="button"
                size="lg"
                className="mt-6 h-12 rounded-full bg-white px-8 text-base font-medium text-foreground hover:bg-white/90 md:h-14 md:px-10"
              >
                Get Start Fresh Now
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="hidden h-[180vh] md:block" />

      <div className="hidden px-6 pt-24 pb-20 md:block md:px-12 md:pt-32 md:pb-28 lg:px-20 lg:pt-40">
        <p className="mx-auto max-w-3xl text-center text-xl leading-relaxed text-muted-foreground md:text-2xl lg:text-[1.75rem] lg:leading-snug">
          Create your official property vacation rental website, collect direct
          inquiries, offer direct payment options, and reduce dependence on
          third-party platforms.
        </p>
      </div>
    </section>
  );
}
