"use client";

import Image from "next/image";
import Link from "next/link";

const BRAND_ALT =
  "OfficialHosts. Your Property. Your Guests. No Commissions.";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Why Direct", href: "#why-direct" },
    { label: "Savings Calculator", href: "#savings" },
    { label: "Examples", href: "#examples" },
    { label: "FAQ", href: "#faq" },
    { label: "Pricing", href: "#pricing" },
  ],
  platform: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "My Listings", href: "/dashboard/sites" },
    { label: "Create Vacation Rental Website", href: "/dashboard/add" },
  ],
  company: [
    { label: "About", href: "#about" },
    { label: "Login", href: "/login" },
    { label: "Contact", href: "/contact" },
  ],
};

export function FooterSection() {
  return (
    <footer className="bg-background">
      <div className="border-t border-border px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/logo_dark.png"
                alt={BRAND_ALT}
                width={592}
                height={134}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Your official property vacation rental website builder not
              another marketplace. No commission. No middleman. Your guests,
              your brand.
            </p>
          </div>

          <div className="col-start-1 row-start-2 md:col-start-auto md:row-start-auto">
            <h4 className="mb-4 text-sm font-medium text-foreground">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-start-2 row-start-2 flex flex-col gap-12 md:contents">
            <div>
              <h4 className="mb-4 text-sm font-medium text-foreground">
                Platform
              </h4>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-medium text-foreground">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 OfficialHosts. No commission. No middleman. Your guests, your
            brand.
          </p>
          <p className="text-xs text-muted-foreground">
            Airbnb and Vrbo help you find guests. OfficialHosts helps you keep
            them.
          </p>
        </div>
      </div>
    </footer>
  );
}
