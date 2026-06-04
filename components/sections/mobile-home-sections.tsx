"use client";

import { useCallback, useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { EditorialSection } from "@/components/sections/editorial-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CollectionSection } from "@/components/sections/collection-section";
import { SectionCta } from "@/components/sections/section-cta";

const MOBILE_SECTIONS = [
  {
    id: "why-direct",
    label: "Why Direct",
    title: "Marketplaces find guests. You keep the relationship.",
  },
  {
    id: "savings",
    label: "Savings",
    title: "See what platform fees cost you",
  },
  {
    id: "how-it-works",
    label: "How It Works",
    title: "Launch your direct-booking website in 4 steps",
  },
  {
    id: "features",
    label: "Features",
    title: "Built for hosts who want it all",
  },
  {
    id: "examples",
    label: "Examples",
    title: "Real property vacation rental websites",
  },
  {
    id: "about",
    label: "About",
    title: "Real hosts. Real results.",
  },
  {
    id: "pricing",
    label: "Pricing",
    title: "Simple pricing for every host",
  },
  {
    id: "faq",
    label: "FAQ",
    title: "Questions hosts ask before switching",
  },
] as const;

const SECTION_CTAS: Partial<
  Record<
    (typeof MOBILE_SECTIONS)[number]["id"],
    {
      label: string;
      href: string;
      description?: string;
      secondaryLabel?: string;
      secondaryHref?: string;
    }
  >
> = {
  "why-direct": {
    label: "Keep your guests, go direct",
    href: "#create",
    description:
      "Your official site is where repeat guests book you again—on your brand, not the platform's.",
  },
  savings: {
    label: "Create Vacation Rental Website",
    href: "#create",
    description:
      "From your existing listing in minutes, no design skills required.",
  },
  "how-it-works": {
    label: "Launch your site in minutes",
    href: "#create",
  },
  features: {
    label: "Get started for free",
    href: "#create",
  },
  examples: {
    label: "Build your site with this template",
    href: "#create",
    description:
      "Like what you see? Start from a polished layout, your listing details fill in automatically.",
  },
  about: {
    label: "Join hosts on OfficialHosts",
    href: "#create",
  },
  pricing: {
    label: "Choose your plan",
    href: "#create",
    secondaryLabel: "Compare plans",
    secondaryHref: "#pricing",
  },
};

const SECTION_IDS = MOBILE_SECTIONS.map((section) => section.id);

const DEFAULT_SECTION = MOBILE_SECTIONS[0].id;

function scrollToMobileSection(id: string) {
  window.setTimeout(() => {
    document
      .getElementById(`mobile-section-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 180);
}

function getHashSection(): string | undefined {
  const hash = window.location.hash.slice(1);
  return SECTION_IDS.includes(hash as (typeof SECTION_IDS)[number])
    ? hash
    : undefined;
}

function renderSectionContent(id: (typeof SECTION_IDS)[number]) {
  switch (id) {
    case "why-direct":
      return <PhilosophySection embedded />;
    case "savings":
      return <EditorialSection part="savings" embedded />;
    case "how-it-works":
      return <TechnologySection embedded />;
    case "features":
      return <FeaturedProductsSection embedded />;
    case "examples":
      return <GallerySection embedded />;
    case "about":
      return <TestimonialsSection embedded />;
    case "pricing":
      return <CollectionSection embedded />;
    case "faq":
      return <EditorialSection part="faq" embedded />;
    default:
      return null;
  }
}

export function MobileHomeSections() {
  const [openSection, setOpenSection] = useState<string | undefined>(
    DEFAULT_SECTION,
  );

  const openAndScroll = useCallback((id: string | undefined) => {
    setOpenSection(id);
    if (id) {
      scrollToMobileSection(id);
    }
  }, []);

  useEffect(() => {
    const syncFromHash = () => {
      const section = getHashSection();
      if (section) {
        openAndScroll(section);
      } else {
        setOpenSection(DEFAULT_SECTION);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [openAndScroll]);

  return (
    <div className="md:hidden">
      <div className="border-t border-border bg-muted/30 px-6 py-12 text-center">
        <h2 className="font-display text-[1.75rem] font-medium leading-[1.15] tracking-tight text-[var(--oh-navy)] sm:text-[2rem]">
          Everything you need to grow direct bookings
        </h2>
        <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
          Explore each section below to see how OfficialHosts helps you succeed.
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        value={openSection}
        onValueChange={(value) => {
          if (value) {
            window.history.replaceState(null, "", `#${value}`);
            openAndScroll(value);
          } else {
            window.history.replaceState(null, "", window.location.pathname);
            setOpenSection(undefined);
          }
        }}
        className="flex flex-col gap-4 border-t border-border bg-muted/30 px-4 pb-10 pt-5"
      >
        {MOBILE_SECTIONS.map((section) => (
          <AccordionItem
            key={section.id}
            value={section.id}
            id={`mobile-section-${section.id}`}
            unstyled
            className={cn(
              "scroll-mt-24 overflow-hidden rounded-xl border border-border/80 bg-[#F4F6F8]",
              "transition-[border-color,box-shadow,background-color] duration-200",
              "data-[state=open]:border-[color-mix(in_srgb,var(--oh-navy)_18%,transparent)]",
              "data-[state=open]:bg-background data-[state=open]:shadow-md",
            )}
          >
            <AccordionTrigger
              hideChevron
              className={cn(
                "group min-h-[4.5rem] items-center gap-4 rounded-none px-4 py-5 hover:no-underline",
                "bg-[#ECEFF3] data-[state=open]:bg-[#F4F6F8]",
              )}
            >
              <div className="flex min-w-0 flex-1 flex-col items-start gap-1 text-left">
                <span className="text-xl font-semibold leading-snug tracking-tight text-[var(--oh-navy)]">
                  {section.label}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {section.title}
                </span>
              </div>
              <span
                className="flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-[color-mix(in_srgb,var(--oh-navy)_12%,transparent)] bg-background text-[var(--oh-navy)] shadow-sm"
                aria-hidden
              >
                <Plus
                  className="size-6 stroke-[2.5] group-data-[state=open]:hidden"
                  strokeWidth={2.5}
                />
                <Minus
                  className="hidden size-6 stroke-[2.5] group-data-[state=open]:block"
                  strokeWidth={2.5}
                />
              </span>
            </AccordionTrigger>
            <AccordionContent className="border-t border-border bg-background px-4 pb-8 pt-5">
              {renderSectionContent(section.id)}
              {SECTION_CTAS[section.id] && (
                <SectionCta
                  {...SECTION_CTAS[section.id]}
                  className="mt-6 border-t border-border pt-6"
                />
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
