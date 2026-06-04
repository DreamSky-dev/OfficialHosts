import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { EditorialSection } from "@/components/sections/editorial-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CollectionSection } from "@/components/sections/collection-section";
import { FooterSection } from "@/components/sections/footer-section";
import { MobileHomeSections } from "@/components/sections/mobile-home-sections";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <div className="hidden md:block">
        <div id="why-direct" className="scroll-mt-24">
          <PhilosophySection />
        </div>
        <EditorialSection />
        <div id="how-it-works" className="scroll-mt-24">
          <TechnologySection />
        </div>
        <div id="features" className="scroll-mt-24">
          <FeaturedProductsSection />
        </div>
        <div id="examples" className="scroll-mt-24">
          <GallerySection />
        </div>
        <div id="about" className="scroll-mt-24">
          <TestimonialsSection />
        </div>
        <div id="pricing" className="scroll-mt-24">
          <CollectionSection />
        </div>
      </div>
      <MobileHomeSections />
      <FooterSection />
    </main>
  );
}
