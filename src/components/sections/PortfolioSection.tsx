import { useInView } from "./useInView";
import { PORTFOLIO_ITEMS } from "./data";

export default function PortfolioSection() {
  const portfolioSection = useInView(0.1);

  return (
    <section id="portfolio" className="py-24 bg-fp-black relative overflow-hidden">
      <div ref={portfolioSection.ref} className="max-w-5xl mx-auto px-6">
        <div className={`mb-16 ${portfolioSection.inView ? "animate-fade-up" : "opacity-0"}`}>
          <div className="section-label mb-4">Наши работы</div>
          <h2 className="font-oswald font-bold text-5xl md:text-6xl text-white uppercase">портфолио</h2>
        </div>

        <div
          className={`${portfolioSection.inView ? "animate-fade-up animate-delay-200" : "opacity-0"}`}
          style={{
            columnCount: 3,
            columnGap: 0,
          }}
        >
          {PORTFOLIO_ITEMS.map((item) => (
            <div
              key={item.title}
              style={{
                breakInside: "avoid",
                margin: 0,
                padding: 0,
                lineHeight: 0,
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  margin: 0,
                  padding: 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
