import { useInView } from "./useInView";
import { PORTFOLIO_ITEMS } from "./data";

export default function PortfolioSection() {
  const portfolioSection = useInView(0.1);

  return (
    <section id="portfolio" className="py-24 bg-fp-black relative overflow-hidden">
      <div ref={portfolioSection.ref} className="max-w-5xl mx-auto px-6">
        <div className={`mb-16 ${portfolioSection.inView ? "animate-fade-up" : "opacity-0"}`}>
          <div className="section-label mb-4">Наши работы</div>
          <h2 className="font-oswald font-bold text-3xl sm:text-5xl md:text-6xl text-white uppercase">портфолио</h2>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ${portfolioSection.inView ? "animate-fade-up animate-delay-200" : "opacity-0"}`}
        >
          {PORTFOLIO_ITEMS.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                <div className="text-[11px] uppercase tracking-widest text-fp-red">{item.category}</div>
                <div className="font-oswald text-white text-lg leading-tight mt-1">{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}