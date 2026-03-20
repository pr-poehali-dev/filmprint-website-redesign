import Icon from "@/components/ui/icon";
import { useInView } from "./useInView";
import { REVIEWS } from "./data";

interface ReviewsCtaSectionProps {
  scrollTo: (href: string) => void;
}

export default function ReviewsCtaSection({ scrollTo }: ReviewsCtaSectionProps) {
  const reviewsSection = useInView(0.1);

  return (
    <>
      {/* REVIEWS */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div ref={reviewsSection.ref} className="max-w-7xl mx-auto px-6">
          <div className={`mb-16 text-center ${reviewsSection.inView ? "animate-fade-up" : "opacity-0"}`}>
            <div className="section-label mb-4 text-center">Что говорят клиенты</div>
            <h2 className="font-oswald font-bold text-5xl md:text-6xl text-fp-black uppercase">
              От<span className="text-gradient-red">зывы</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <div
                key={review.name}
                className={`bg-white rounded-sm p-8 card-hover border border-gray-100 ${reviewsSection.inView ? `animate-fade-up animate-delay-${(i + 1) * 200}` : "opacity-0"}`}
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: review.stars }).map((_, j) => (
                    <Icon key={j} name="Star" size={16} className="text-fp-red" style={{ fill: "#E0292D" }} />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-fp-red/10 flex items-center justify-center">
                    <Icon name="User" size={18} className="text-fp-red" />
                  </div>
                  <div>
                    <div className="font-golos font-semibold text-fp-black text-sm">{review.name}</div>
                    <div className="text-gray-400 text-xs">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 bg-gradient-red relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 30px)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 hidden lg:flex flex-col opacity-20">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="flex-1 border-b border-white/30 flex items-center justify-center">
              <div className="w-4 h-8 rounded-sm bg-white/30" />
            </div>
          ))}
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-oswald font-bold text-5xl md:text-6xl text-white uppercase mb-6">
            Готовы обсудить<br />ваш проект?
          </h2>
          <p className="text-white/80 text-xl mb-10 font-golos">
            Расскажите задачу — подберём материал, рассчитаем стоимость и сроки
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              className="bg-white text-fp-red font-oswald font-semibold uppercase tracking-wider px-10 py-4 rounded-sm hover:bg-fp-black hover:text-white transition-all duration-300 text-base"
              onClick={() => scrollTo("#contacts")}
            >
              Написать нам
            </button>
            <a href="tel:+79999999999" className="btn-outline-white text-base">
              Позвонить
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
