"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LogIn, Menu, X } from "lucide-react";

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

  const headerBarStyle = isScrolled
    ? "rounded-full bg-background/80 backdrop-blur-md"
    : "bg-transparent";

  const headerBarShadow = isScrolled
    ? "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px"
    : "none";

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[95%] max-w-6xl -translate-x-1/2">
      <div
        className={`flex items-center justify-between gap-3 px-2 py-2.5 pl-3 transition-all duration-300 sm:py-2 sm:pl-4 ${headerBarStyle}`}
        style={{ boxShadow: headerBarShadow }}
      >
        <Link href="/" className="relative flex shrink-0 items-center">
          <Image
            src={isScrolled ? "/logo_dark.png" : "/logo.png"}
            alt={BRAND_ALT}
            width={isScrolled ? 592 : 411}
            height={isScrolled ? 134 : 125}
            className="h-8 w-auto sm:h-9 md:h-10"
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
            className="rounded-full bg-[var(--oh-blue)] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[var(--oh-blue-hover)]"
          >
            Get Started
          </Link>
        </div>

        <div className="relative md:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`transition-colors ${isScrolled ? "text-foreground" : "text-white"}`}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {isMenuOpen && (
            <nav
              className="absolute top-full right-0 z-50 mt-4 min-w-[11rem] overflow-hidden rounded-xl border border-border/60 bg-background py-1 shadow-lg"
              aria-label="Account menu"
            >
              <Link
                href="#login"
                className="flex items-center gap-3 px-4 py-3 text-sm text-foreground transition-colors hover:bg-muted/50"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="size-4 shrink-0 text-muted-foreground" />
                Login
              </Link>
              <div className="mx-3 border-t border-border" role="separator" />
              <Link
                href="#create"
                className="flex items-center gap-3 px-4 py-3 text-sm text-foreground transition-colors hover:bg-muted/50"
                onClick={() => setIsMenuOpen(false)}
              >
                <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                Get Started
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
