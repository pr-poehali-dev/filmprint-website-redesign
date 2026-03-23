import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";
import { useInView } from "./useInView";
import { REVIEWS } from "./data";

interface ReviewsCtaSectionProps {
  scrollTo: (href: string) => void;
}

export default function ReviewsCtaSection({ scrollTo }: ReviewsCtaSectionProps) {
  const reviewsSection = useInView(0.1);
  const [current, setCurrent] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const total = REVIEWS.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isAutoplay, next]);

  const handleDotClick = (index: number) => {
    setCurrent(index);
    setIsAutoplay(false);
  };

  const handleArrowClick = (direction: "prev" | "next") => {
    if (direction === "prev") { prev(); } else { next(); }
    setIsAutoplay(false);
  };

  return (
    <>
      {/* REVIEWS */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div ref={reviewsSection.ref} className="max-w-7xl mx-auto px-6">
          <div className={`mb-16 text-center ${reviewsSection.inView ? "animate-fade-up" : "opacity-0"}`}>
            <div className="section-label mb-4 text-center">Что говорят клиенты</div>
            <h2 className="font-oswald font-bold text-5xl md:text-6xl text-fp-black uppercase">отзывы</h2>
          </div>

          <div className={`relative ${reviewsSection.inView ? "animate-fade-up animate-delay-300" : "opacity-0"}`}>
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {REVIEWS.map((review) => (
                  <div key={review.name} className="w-full flex-shrink-0 px-2">
                    <div className="bg-white rounded-sm border border-gray-200 flex flex-col md:flex-row overflow-hidden">
                      <div className="md:w-56 flex-shrink-0 bg-fp-red flex flex-col items-center justify-center p-8 text-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                          <span className="text-white font-oswald font-bold text-2xl">
                            {review.name.charAt(0)}
                          </span>
                        </div>
                        <div className="font-oswald font-semibold text-white text-base">{review.name}</div>
                        <div className="flex gap-1 mt-3">
                          {Array.from({ length: review.stars }).map((_, j) => (
                            <Icon key={j} name="Star" size={14} className="text-white" style={{ fill: "#fff" }} />
                          ))}
                        </div>
                      </div>
                      <div className="flex-1 p-8 md:p-10 flex flex-col justify-center relative">
                        <div className="absolute top-6 right-8 text-fp-red/10">
                          <Icon name="Quote" size={48} />
                        </div>
                        <p className="text-gray-600 text-base leading-relaxed relative z-10">{review.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 mt-10">
              <button
                onClick={() => handleArrowClick("prev")}
                className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-fp-red hover:text-fp-red transition-colors"
                aria-label="Предыдущий отзыв"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>

              <div className="flex gap-2">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDotClick(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current ? "w-8 bg-fp-red" : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Отзыв ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => handleArrowClick("next")}
                className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-fp-red hover:text-fp-red transition-colors"
                aria-label="Следующий отзыв"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            </div>
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