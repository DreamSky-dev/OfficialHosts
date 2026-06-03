"use client";

import { FadeImage } from "@/components/fade-image";

const features = [
  {
    title: "AI Vacation Rental Website Generation",
    description:
      "Generate property copy, amenities, and house rules from your listing. Build photo galleries and page layouts in just a click. Refine tone and sections with AI suggestions before you publish.",
    image:
      "/images/feature-1.webp",
    tag: "AI Generation",
  },
  {
    title: "Multiple Premium Templates",
    description:
      "Choose designer templates built for luxury coastal and urban rentals. Swap themes without rebuilding your content from scratch.",
    image:
      "/images/feature-2.webp",
    tag: "Templates",
  },
  {
    title: "Custom Domains & SSL",
    description:
      "Connect your own domain with automatic SSL included. Run multiple branded URLs when you need more than one address.",
    image:
      "/images/feature-3.webp",
    tag: "Branding",
  },
  {
    title: "Direct Booking & Payments",
    description:
      "Accept deposits or full payment with Stripe and PayPal. Keep guests on your site from inquiry through checkout.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200",
    tag: "Payments",
  },
  {
    title: "Dashboard & Listings Management",
    description:
      "Manage every property from one clean owner dashboard. Toggle site visibility and status per listing in seconds.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
    tag: "Dashboard",
  },
  {
    title: "Private Sharing & Guest Codes",
    description:
      "Share private links that bypass public OTA search. Give repeat guests a property code to open your site instantly.",
    image:
      "/images/feature-6.webp",
    tag: "Sharing",
  },
];

export function FeaturedProductsSection() {
  return (
    <section id="features" className="bg-background">
      <div className="px-6 pt-8 pb-20 text-center md:px-12 md:pt-10 md:pb-28 lg:px-20 lg:pt-12 lg:pb-20">
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

      <div className="grid grid-cols-1 gap-4 px-6 pb-12 md:grid-cols-3 md:px-12 lg:px-20">
        {features.map((feature) => (
          <div key={feature.title} className="group">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <FadeImage
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover group-hover:scale-105"
              />
            </div>
            <div className="py-6">
              <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                {feature.tag}
              </p>
              <h3 className="text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
