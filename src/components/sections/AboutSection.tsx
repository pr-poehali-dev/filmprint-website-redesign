import Icon from "@/components/ui/icon";
import { useInView } from "./useInView";
import { HERO_IMAGE } from "./data";

interface AboutSectionProps {
  scrollTo: (href: string) => void;
}

export default function AboutSection({ scrollTo }: AboutSectionProps) {
  const aboutSection = useInView(0.1);
  return (
    <>
      {/* ABOUT */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div ref={aboutSection.ref} className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={aboutSection.inView ? "animate-slide-in-left" : "opacity-0"}>
              <div className="section-label mb-4">О компании</div>
              <h2 className="font-oswald font-bold text-5xl md:text-6xl text-fp-black uppercase mb-8">
                10 лет <span className="text-gradient-red">экспертизы</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                FilmPrint — профессиональная типография с более чем 10-летним опытом работы. Мы специализируемся на широкоформатной и интерьерной печати, производстве декораций для кино и театра, 3D-печати.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Работаем на современном европейском оборудовании, используем качественные расходные материалы. Обслуживаем киностудии, ивент-агентства, корпоративных клиентов и частных заказчиков по всей России.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-10">
                {[
                  { icon: "Monitor", label: "Европейское оборудование" },
                  { icon: "Award", label: "Сертифицированные материалы" },
                  { icon: "Users", label: "Опытная команда" },
                  { icon: "MapPin", label: "Работаем по всей России" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-fp-red/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={20} className="text-fp-red" />
                    </div>
                    <span className="text-gray-600 text-sm font-golos">{item.label}</span>
                  </div>
                ))}
              </div>

              <button className="btn-red" onClick={() => scrollTo("#contacts")}>
                <span>Связаться с нами</span>
              </button>
            </div>

            <div className={`relative ${aboutSection.inView ? "animate-fade-up animate-delay-300" : "opacity-0"}`}>
              <div className="relative rounded-sm overflow-hidden">
                <img src={HERO_IMAGE} alt="Производство FilmPrint" className="w-full h-[500px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-fp-black/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-fp-red text-white p-6 rounded-sm shadow-xl animate-pulse-glow">
                <div className="font-oswald font-bold text-4xl">10+</div>
                <div className="text-white/80 text-sm uppercase tracking-wider">лет на рынке</div>
              </div>
              <div className="absolute -right-4 top-0 bottom-0 w-8 flex flex-col overflow-hidden">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="flex-1 border-b border-fp-red/30 flex items-center justify-center">
                    <div className="w-2 h-4 rounded-sm bg-fp-red/40" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}