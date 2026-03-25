import Icon from "@/components/ui/icon";
import { useInView } from "./useInView";
import { PORTFOLIO_ITEMS } from "./data";

export default function PortfolioSection() {
  const portfolioSection = useInView(0.1);

  return (
    <section id="portfolio" className="py-24 bg-fp-black relative overflow-hidden">
      <div ref={portfolioSection.ref} className="max-w-7xl mx-auto px-6">
        <div className={`mb-16 ${portfolioSection.inView ? "animate-fade-up" : "opacity-0"}`}>
          <div className="section-label mb-4">Наши работы</div>
          <h2 className="font-oswald font-bold text-5xl md:text-6xl text-white uppercase">портфолио</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PORTFOLIO_ITEMS.map((item, i) => (
            <div
              key={item.title}
              className={`relative group rounded-sm overflow-hidden cursor-pointer ${
                i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              } ${portfolioSection.inView ? `animate-fade-up animate-delay-${(i + 1) * 100}` : "opacity-0"}`}
            >
              <div className={`${i === 0 ? "h-[420px] sm:h-full" : "h-64"} relative overflow-hidden`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-fp-red/80 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center px-4">
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
  );
}
