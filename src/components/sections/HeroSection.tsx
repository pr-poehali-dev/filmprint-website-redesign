import Icon from "@/components/ui/icon";
import { HERO_IMAGE, STATS, USPS } from "./constants";
import { useInView } from "./useInView";

interface HeroSectionProps {
  scrollTo: (href: string) => void;
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  const heroSection = useInView(0.1);
  const statsSection = useInView(0.2);

  return (
    <>
      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center bg-gradient-hero bg-noise overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMAGE} alt="FilmPrint производство" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-fp-black via-fp-black/80 to-transparent" />
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-8 hidden lg:flex flex-col overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex-1 border-b border-fp-red/30 flex items-center justify-center">
              <div className="w-2 h-4 rounded-sm bg-fp-red/40" />
            </div>
          ))}
        </div>

        <div ref={heroSection.ref} className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <div className="max-w-3xl">
            <div className={`mb-6 ${heroSection.inView ? "animate-fade-up" : "opacity-0"}`}>
              <span className="section-label">Профессиональная типография</span>
            </div>
            <h1 className={`font-oswald font-bold text-6xl md:text-8xl text-white uppercase leading-none mb-8 ${heroSection.inView ? "animate-fade-up animate-delay-100" : "opacity-0"}`}>
              Печать<br />
              <span className="text-gradient-red">любого</span><br />
              масштаба
            </h1>
            <p className={`text-white/60 text-xl md:text-2xl font-golos leading-relaxed mb-12 max-w-xl ${heroSection.inView ? "animate-fade-up animate-delay-200" : "opacity-0"}`}>
              От визиток до кинодекораций. Быстро, точно, с гарантией качества.
            </p>

            <div className={`flex flex-wrap gap-4 mb-16 ${heroSection.inView ? "animate-fade-up animate-delay-300" : "opacity-0"}`}>
              <button className="btn-red text-base" onClick={() => scrollTo("#contacts")}>
                <span>Получить расчёт</span>
              </button>
              <button className="btn-outline text-base" onClick={() => scrollTo("#services")}>
                <span>Наши услуги</span>
              </button>
            </div>

            <div className={`flex flex-wrap gap-8 ${heroSection.inView ? "animate-fade-up animate-delay-400" : "opacity-0"}`}>
              {USPS.map((usp) => (
                <div key={usp.title} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-fp-red/20 border border-fp-red/30 flex items-center justify-center">
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