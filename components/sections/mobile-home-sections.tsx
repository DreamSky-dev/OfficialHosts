"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    label: "Create Vacation Rental Website",
    href: "#create",
  },
  savings: {
    label: "Start keeping more of every booking",
    href: "#create",
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
      <div className="border-t border-border px-6 py-10">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Explore OfficialHosts
        </p>
        <h2 className="mt-3 text-2xl font-medium tracking-tight text-foreground">
          Tap a section to dive in
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Keep all the details, open one topic at a time and jump straight to
          what matters.
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
        className="border-t border-border"
      >
        {MOBILE_SECTIONS.map((section) => (
          <AccordionItem
            key={section.id}
            value={section.id}
            id={`mobile-section-${section.id}`}
            className="scroll-mt-24 border-b border-border px-6 last:border-b-0"
          >
            <AccordionTrigger className="items-center py-5 hover:no-underline">
              <div className="flex flex-1 flex-col items-start gap-1.5 pr-2 text-left">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {section.label}
                </span>
                <span className="text-base font-medium leading-snug text-foreground">
                  {section.title}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-8 pt-1">
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
