"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const BRAND_ALT =
  "OfficialHosts. Your Property. Your Guests. No Commissions.";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Why Direct", href: "#why-direct" },
  { label: "Savings", href: "#savings" },
  { label: "Examples", href: "#examples" },
  { label: "FAQ", href: "#faq" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 z-50 w-[95%] max-w-6xl -translate-x-1/2 transition-all duration-300 ${isScrolled ? "rounded-full bg-background/80 backdrop-blur-md" : "bg-transparent"}`}
      style={{
        boxShadow: isScrolled
          ? "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px"
          : "none",
      }}
    >
      <div className="flex items-center justify-between gap-3 px-2 py-2 pl-3 transition-all duration-300 sm:pl-4">
        <Link href="/" className="relative flex shrink-0 items-center">
          <Image
            src={isScrolled ? "/logo_dark.png" : "/logo.png"}
            alt={BRAND_ALT}
            width={isScrolled ? 592 : 411}
            height={isScrolled ? 134 : 125}
            className="h-7 w-auto sm:h-9 md:h-10"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="#login"
            className={`text-sm transition-colors ${isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"}`}
          >
            Login
          </Link>
          <Link
            href="#create"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${isScrolled ? "bg-foreground text-background hover:opacity-80" : "bg-white text-foreground hover:bg-white/90"}`}
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`transition-colors md:hidden ${isScrolled ? "text-foreground" : "text-white"}`}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="rounded-b-2xl border-t border-border bg-background px-6 py-8 md:hidden">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#login"
              className="text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="#create"
              className="mt-2 rounded-full bg-foreground px-5 py-3 text-center text-sm font-medium text-background"
              onClick={() => setIsMenuOpen(false)}
            >
              Create Vacation Rental Website
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
