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

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <PhilosophySection />
      <EditorialSection />
      <TechnologySection />
      <FeaturedProductsSection />
      <GallerySection />
      <TestimonialsSection />
      <CollectionSection />
      <FooterSection />
    </main>
  );
}
