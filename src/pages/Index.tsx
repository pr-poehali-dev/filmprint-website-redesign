import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_LINKS } from "@/components/sections/constants";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactsSection from "@/components/sections/ContactsSection";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-fp-black/95 backdrop-blur-md shadow-lg shadow-black/30" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => scrollTo("#hero")}>
            <img
              src="https://cdn.poehali.dev/projects/4ad21e29-4473-4b81-8b05-cac2fefa8718/bucket/logo-transparent.png"
              alt="FilmPrint"
              className="h-12 w-auto object-contain"
              style={{
                filter: "drop-shadow(0 0 1px rgba(255,255,255,0.8)) drop-shadow(0 0 1.5px rgba(255,255,255,0.5)) drop-shadow(0 2px 8px rgba(0,0,0,0.5))"
              }}
            />
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button key={link.href} onClick={() => scrollTo(link.href)} className="nav-link text-white/70 hover:text-white">
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+79999999999" className="text-white/70 hover:text-white transition-colors text-sm font-golos">
              +7 (999) 999-99-99
            </a>
            <button className="btn-red text-sm py-3 px-6" onClick={() => scrollTo("#contacts")}>
              <span>Получить расчёт</span>
            </button>
          </div>

          <button className="lg:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-fp-black/98 backdrop-blur-md border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <button key={link.href} onClick={() => scrollTo(link.href)} className="nav-link text-white/70 hover:text-white text-left py-2">
                  {link.label}
                </button>
              ))}
              <button className="btn-red text-sm mt-2 w-full" onClick={() => scrollTo("#contacts")}>
                <span>Получить расчёт</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <HeroSection scrollTo={scrollTo} />
      <ServicesSection scrollTo={scrollTo} />
      <AboutSection scrollTo={scrollTo} />
      <ContactsSection scrollTo={scrollTo} />
    </div>
  );
}
