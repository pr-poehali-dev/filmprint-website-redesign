import Icon from "@/components/ui/icon";
import { useInView } from "./useInView";
import { SERVICES, PRICING, PORTFOLIO_ITEMS } from "./data";

interface ServicesSectionProps {
  activeService: number | null;
  setActiveService: (v: number | null) => void;
  scrollTo: (href: string) => void;
}

export default function ServicesSection({ activeService, setActiveService, scrollTo }: ServicesSectionProps) {
  const servicesSection = useInView(0.1);
  const pricingSection = useInView(0.1);
  const portfolioSection = useInView(0.1);

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
                className={`relative group rounded-sm overflow-hidden p-8 card-hover cursor-pointer min-h-[280px] flex flex-col justify-end ${servicesSection.inView ? `animate-fade-up animate-delay-${(i + 1) * 100}` : "opacity-0"} ${activeService === i ? "ring-2 ring-fp-red shadow-lg shadow-fp-red/10" : ""}`}
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
                  <div className="w-12 h-12 rounded-sm bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4">
                    <Icon name={service.icon} size={24} className="text-fp-red" />
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
              <span>Обсудить проект</span>
            </button>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #E0292D 0%, transparent 70%)" }} />
        <div ref={pricingSection.ref} className="max-w-7xl mx-auto px-6">
          <div className={`mb-16 ${pricingSection.inView ? "animate-fade-up" : "opacity-0"}`}>
            <div className="section-label mb-4">Прозрачные цены</div>
            <h2 className="font-oswald font-bold text-5xl md:text-6xl text-fp-black uppercase">
              Прайс-<span className="text-gradient-red">лист</span>
            </h2>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${pricingSection.inView ? "animate-fade-up animate-delay-200" : "opacity-0"}`}>
            {PRICING.map((item) => (
              <div key={item.name} className="bg-white rounded-sm border border-gray-100 p-6 flex items-start justify-between gap-4 card-hover group">
                <div className="flex-1">
                  <div className="font-golos font-semibold text-fp-black mb-1">{item.name}</div>
                  <div className="text-gray-400 text-sm">{item.note}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-oswald font-bold text-fp-red text-lg whitespace-nowrap">{item.price}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-10 p-6 border border-fp-red/20 bg-fp-red/5 rounded-sm ${pricingSection.inView ? "animate-fade-up animate-delay-400" : "opacity-0"}`}>
            <p className="text-gray-500 text-sm text-center">
              * Итоговая стоимость зависит от объёма, материалов и сложности. Свяжитесь с нами для точного расчёта.
            </p>
          </div>

          <div className={`mt-8 text-center ${pricingSection.inView ? "animate-fade-up animate-delay-500" : "opacity-0"}`}>
            <button className="btn-red" onClick={() => scrollTo("#contacts")}>
              <span>Получить точный расчёт</span>
            </button>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-fp-black relative overflow-hidden">
        <div ref={portfolioSection.ref} className="max-w-7xl mx-auto px-6">
          <div className={`mb-16 ${portfolioSection.inView ? "animate-fade-up" : "opacity-0"}`}>
            <div className="section-label mb-4">Наши работы</div>
            <h2 className="font-oswald font-bold text-5xl md:text-6xl text-white uppercase">
              Порт<span className="text-gradient-red">фолио</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO_ITEMS.map((item, i) => (
              <div
                key={item.title}
                className={`relative group rounded-sm overflow-hidden cursor-pointer ${portfolioSection.inView ? `animate-fade-up animate-delay-${(i + 1) * 100}` : "opacity-0"}`}
              >
                <div className={`h-64 bg-gradient-to-br ${item.color} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "repeating-linear-gradient(45deg, #E0292D 0px, #E0292D 1px, transparent 1px, transparent 20px)" }} />
                  <div className="text-center z-10">
                    <Icon name="Image" size={48} className="text-white/20 mx-auto mb-3" />
                    <div className="font-oswald font-semibold text-white/60 text-sm uppercase tracking-wider">{item.category}</div>
                  </div>
                  <div className="absolute inset-0 bg-fp-red/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center">
                      <h3 className="font-oswald font-bold text-white text-xl uppercase mb-2">{item.title}</h3>
                      <div className="text-white/70 text-sm">{item.category}</div>
                      <div className="mt-4 w-10 h-10 rounded-full border-2 border-white flex items-center justify-center mx-auto">
                        <Icon name="Plus" size={20} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-fp-red text-xs font-oswald uppercase tracking-wider">{item.category}</div>
                  <h3 className="font-oswald font-semibold text-white text-base">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}