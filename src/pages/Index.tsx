import { useEffect, useState } from "react";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ReviewsCtaSection from "@/components/sections/ReviewsCtaSection";
import ContactsSection from "@/components/sections/ContactsSection";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-fp-white font-golos overflow-x-hidden">
      <HeroSection
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrolled={scrolled}
        scrollTo={scrollTo}
      />
      <ServicesSection
        activeService={activeService}
        setActiveService={setActiveService}
        scrollTo={scrollTo}
      />
      <AboutSection scrollTo={scrollTo} />
      <PortfolioSection />
      <ReviewsCtaSection scrollTo={scrollTo} />
      <ContactsSection scrollTo={scrollTo} activeService={activeService} />
    </div>
  );
}