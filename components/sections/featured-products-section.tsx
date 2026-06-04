"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { FadeImage } from "@/components/fade-image";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "AI Vacation Rental Website Generation",
    titleShort: "AI site generation",
    description:
      "Generate property copy, amenities, and house rules from your listing. Build photo galleries and page layouts in just a click. Refine tone and sections with AI suggestions before you publish.",
    descriptionShort:
      "Generate copy, galleries, and layouts from your listing in one click.",
    image: "/images/feature-1.webp",
    tag: "AI Generation",
  },
  {
    title: "Multiple Premium Templates",
    titleShort: "Premium templates",
    description:
      "Choose designer templates built for luxury coastal and urban rentals. Swap themes without rebuilding your content from scratch.",
    descriptionShort:
      "Designer themes for coastal and urban rentals—swap without rebuilding content.",
    image: "/images/feature-2.webp",
    tag: "Templates",
  },
  {
    title: "Custom Domains & SSL",
    titleShort: "Custom domains & SSL",
    description:
      "Connect your own domain with automatic SSL included. Run multiple branded URLs when you need more than one address.",
    descriptionShort:
      "Connect your domain with automatic SSL and multiple branded URLs.",
    image: "/images/feature-3.webp",
    tag: "Branding",
  },
  {
    title: "Direct Booking & Payments",
    titleShort: "Direct booking & payments",
    description:
      "Accept deposits or full payment with Stripe and PayPal. Keep guests on your site from inquiry through checkout.",
    descriptionShort:
      "Stripe and PayPal checkout—guests stay on your site start to finish.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200",
    tag: "Payments",
  },
  {
    title: "Dashboard & Listings Management",
    titleShort: "Owner dashboard",
    description:
      "Manage every property from one clean owner dashboard. Toggle site visibility and status per listing in seconds.",
    descriptionShort:
      "Manage every listing and toggle site visibility from one dashboard.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
    tag: "Dashboard",
  },
  {
    title: "Private Sharing & Guest Codes",
    titleShort: "Private sharing & codes",
    description:
      "Share private links that bypass public OTA search. Give repeat guests a property code to open your site instantly.",
    descriptionShort:
      "Private links and guest codes for repeat bookings off the OTAs.",
    image: "/images/feature-6.webp",
    tag: "Sharing",
  },
];

type Feature = (typeof features)[number];

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="group">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <FadeImage
          src={feature.image}
          alt={feature.title}
          fill
          className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
        />
      </div>
      <div className="py-6">
        <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
          {feature.tag}
        </p>
        <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

function MobileFeatureCard({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-background">
      <div className="relative aspect-[16/10] overflow-hidden">
        <FadeImage
          src={feature.image}
          alt={feature.title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
          fadeDelay={index < 2 ? index * 80 : 160}
        />
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          {feature.tag}
        </p>
        <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-foreground">
          {feature.titleShort}
        </h3>
        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {feature.descriptionShort}
        </p>
      </div>
    </article>
  );
}

function MobileFeaturesList({ embedded = false }: { embedded?: boolean }) {
  const [showAll, setShowAll] = useState(!embedded);
  const visibleFeatures =
    embedded && !showAll ? features.slice(0, 3) : features;
  const hiddenCount = features.length - 3;

  return (
    <>
      <ul
        className={
          embedded
            ? "flex flex-col gap-4 md:hidden"
            : "flex flex-col gap-4 px-6 pb-12 md:hidden"
        }
      >
        {visibleFeatures.map((feature, index) => (
          <li key={feature.title}>
            <MobileFeatureCard feature={feature} index={index} />
          </li>
        ))}
      </ul>

      {embedded && !showAll && hiddenCount > 0 && (
        <Button
          type="button"
          variant="outline"
          className="mt-2 h-11 w-full rounded-full border-border text-sm font-medium"
          onClick={() => setShowAll(true)}
        >
          See all {features.length} features
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      )}
    </>
  );
}

type FeaturedProductsSectionProps = {
  embedded?: boolean;
};

export function FeaturedProductsSection({
  embedded = false,
}: FeaturedProductsSectionProps) {
  return (
    <section className="bg-background">
      {!embedded && (
      <div className="px-6 pt-8 pb-10 text-center md:px-12 md:pt-10 md:pb-28 lg:px-20 lg:pt-12 lg:pb-20">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Platform Features
        </p>
        <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Built for hosts who want it all
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
          OfficialHosts is the easiest, most professional way to launch a
          direct-booking vacation rental website with the tools you need to look
          premium and get paid on your terms.
        </p>
      </div>
      )}

      <MobileFeaturesList embedded={embedded} />

      <div className="hidden gap-4 px-6 pb-12 md:grid md:grid-cols-3 md:px-12 lg:px-20">
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </section>
  );
}
