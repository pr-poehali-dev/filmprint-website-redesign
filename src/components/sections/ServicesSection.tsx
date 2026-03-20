import Icon from "@/components/ui/icon";
import { useInView } from "./useInView";
import { SERVICES } from "./data";

interface ServicesSectionProps {
  activeService: number | null;
  setActiveService: (v: number | null) => void;
  scrollTo: (href: string) => void;
}

export default function ServicesSection({ activeService, setActiveService, scrollTo }: ServicesSectionProps) {
  const servicesSection = useInView(0.1);


  return (
    <>
      {/* SERVICES */}
      <section id="services" className="py-24 bg-fp-white relative overflow-hidden">
        <div className="absolute left-0 top-1/4 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #E0292D 0%, transparent 70%)" }} />
        <div ref={servicesSection.ref} className="max-w-7xl mx-auto px-6">
          <div className={`mb-16 ${servicesSection.inView ? "animate-fade-up" : "opacity-0"}`}>
            <div className="section-label mb-4"></div>
            <h2 className="font-oswald font-bold text-5xl md:text-6xl text-fp-black uppercase">
              Производственные <span className="text-gradient-red">возможности</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <div
                key={service.title}
                className={`relative group rounded-2xl overflow-hidden p-8 card-hover cursor-pointer min-h-[280px] flex flex-col justify-end ${servicesSection.inView ? `animate-fade-up animate-delay-${(i + 1) * 100}` : "opacity-0"} ${activeService === i ? "ring-2 ring-fp-red shadow-lg shadow-fp-red/10" : ""}`}
                onClick={() => setActiveService(activeService === i ? null : i)}
              >
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${service.image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 group-hover:from-black/95 group-hover:via-black/70 group-hover:to-black/40 transition-all duration-300" />
                {service.tag && (
                  <div className="absolute top-4 right-4 bg-fp-red text-white text-xs font-oswald uppercase tracking-wider px-3 py-1 rounded-sm z-10">
                    {service.tag}
                  </div>
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-fp-red/20 backdrop-blur-md border border-fp-red/30 flex items-center justify-center mb-5 group-hover:bg-fp-red/30 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-fp-red/10">
                    <Icon name={service.icon} size={32} className="text-white drop-shadow-md" />
                  </div>
                  <h3 className="font-oswald font-semibold text-xl text-white mb-2 uppercase">{service.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{service.description}</p>
                  <div className="flex items-center justify-end">
                    <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:border-fp-red group-hover:bg-fp-red transition-all">
                      <Icon name="ArrowRight" size={14} className="text-white/60 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-12 text-center ${servicesSection.inView ? "animate-fade-up animate-delay-700" : "opacity-0"}`}>
            <button className="btn-red" onClick={() => scrollTo("#contacts")}>
              <span>хочу креатив!</span>
            </button>
          </div>
        </div>
      </section>

    </>
  );
}