import Icon from "@/components/ui/icon";
import { useInView } from "./useInView";
import { HERO_IMAGE, NAV_LINKS, STATS, USPS } from "./data";

interface HeroSectionProps {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  scrolled: boolean;
  scrollTo: (href: string) => void;
}

export default function HeroSection({ menuOpen, setMenuOpen, scrolled, scrollTo }: HeroSectionProps) {
  const heroSection = useInView(0.1);
  const statsSection = useInView(0.2);

  return (
    <>
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

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center bg-gradient-hero bg-noise overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMAGE} alt="FilmPrint производство" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-fp-black via-fp-black/80 to-transparent" />
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-24 hidden lg:flex flex-col opacity-30">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex-1 border-b border-fp-red/30 flex items-center justify-center">
              <div className="w-2 h-6 rounded-sm bg-fp-red/40" />
            </div>
          ))}
        </div>

        <div ref={heroSection.ref} className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <div className={`mb-6 ${heroSection.inView ? "animate-fade-up" : "opacity-0"}`}>
              <span className="text-sm font-oswald uppercase tracking-[0.3em] font-medium" style={{ fontStretch: "condensed", background: "linear-gradient(to right, #E0292D, rgba(224,41,45,0.65))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>От визиток и наклеек до арт-объектов и сложной бутафории.</span>
            </div>

            <h1 className={`font-oswald font-black text-[1.75rem] sm:text-4xl md:text-6xl lg:text-8xl uppercase leading-none mb-6 ${heroSection.inView ? "animate-fade-up animate-delay-100" : "opacity-0"}`}>
              <span style={{ background: "linear-gradient(to right, #ffffff, rgba(255,255,255,0.35))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Filprint</span><br />
              <span style={{ background: "linear-gradient(to right, #E0292D, rgba(224,41,45,0.35))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ваше единое окно</span><br />
              <span style={{ background: "linear-gradient(to right, #ffffff, rgba(255,255,255,0.35))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>в мире производства</span>
            </h1>

            <div className={`text-white/60 text-xl md:text-2xl font-golos leading-relaxed mb-10 max-w-xl flex flex-col gap-1 ${heroSection.inView ? "animate-fade-up animate-delay-200" : "opacity-0"}`}>
              <p>Один подрядчик.</p>
              <p>Одна ответственность.</p>
              <p>Бесшовный результат.</p>
            </div>

            <div className={`flex flex-wrap gap-4 mb-16 ${heroSection.inView ? "animate-fade-up animate-delay-300" : "opacity-0"}`}>
              <button className="btn-red text-base" onClick={() => scrollTo("#contacts")}>
                <span>запросить кп</span>
              </button>
              <button className="btn-outline text-base" onClick={() => scrollTo("#portfolio")}>
                <span>Смотреть работы</span>
              </button>
            </div>

            <div className={`grid grid-cols-3 gap-4 ${heroSection.inView ? "animate-fade-up animate-delay-400" : "opacity-0"}`}>
              {USPS.map((usp) => (
                <div key={usp.title} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-fp-red/10 border border-fp-red/20 flex items-center justify-center flex-shrink-0">
                    <Icon name={usp.icon} size={18} className="text-fp-red" />
                  </div>
                  <div>
                    <div className="font-oswald font-semibold text-white text-base">{usp.title}</div>
                    <div className="text-white/50 text-sm">{usp.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-white/30" />
        </div>
      </section>

      {/* STATS */}
      <section className="bg-fp-black border-b border-white/5">
        <div ref={statsSection.ref} className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center ${statsSection.inView ? `animate-fade-up animate-delay-${(i + 1) * 100}` : "opacity-0"}`}
              >
                <div className="font-oswald font-bold text-4xl md:text-5xl text-fp-red mb-2">{stat.value}</div>
                <div className="text-white/40 text-sm font-golos uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}