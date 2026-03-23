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
                6 лет <span className="text-gradient-red">экспертизы</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">ФильмПринт — производство полного цикла. Мы не просто печатаем — мы создаём решения. За 6 лет работы мы стали для клиентов не просто подрядчиком, а надёжным партнёром, крепким тылом в производстве.</p>
              <p className="text-gray-600 leading-relaxed mb-8">Руководитель мастерской лично сопровождает проекты от концептуальной разработки до финального воплощения каждой детали. Это позволяет предвидеть возможные риски и получить предсказуемый результат.</p>

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
                <img src={HERO_IMAGE} alt="Производство ФильмПринт" className="w-full h-[500px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-fp-black/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-fp-red text-white p-6 rounded-sm shadow-xl animate-pulse-glow">
                <div className="font-oswald font-bold text-4xl">6+</div>
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
          <div className={`mt-24 ${aboutSection.inView ? "animate-fade-up animate-delay-500" : "opacity-0"}`}>
            <h3 className="font-oswald font-bold text-3xl md:text-4xl text-fp-black uppercase mb-12 text-center">
              Почему клиенты <span className="text-gradient-red">выбирают нас</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "Clock", title: "Сроки от 1 дня", desc: "Ходовые материалы всегда в наличии — запускаем производство сразу после согласования." },
                { icon: "ShieldCheck", title: "Гарантия качества", desc: "Контроль на каждом этапе: от допечатной подготовки до финальной проверки изделия." },
                { icon: "Handshake", title: "Индивидуальный подход", desc: "Подбираем оптимальное решение под задачу и бюджет, помогаем с макетами." },
                { icon: "Truck", title: "Доставка по России", desc: "Отправляем заказы транспортными компаниями в любой город страны." },
              ].map((item) => (
                <div key={item.title} className="bg-gray-50 rounded-xl p-6 text-center group hover:bg-fp-red/5 transition-colors">
                  <div className="w-14 h-14 rounded-xl bg-fp-red/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-fp-red/20 transition-colors">
                    <Icon name={item.icon} size={28} className="text-fp-red" />
                  </div>
                  <h4 className="font-oswald font-semibold text-fp-black text-lg uppercase mb-2">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}