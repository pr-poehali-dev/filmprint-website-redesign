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
                  { icon: "Printer", label: "Профессиональное оборудование" },
                  { icon: "Gem", label: "Качественные материалы" },
                  { icon: "Users", label: "Опытная команда" },
                  { icon: "Layers", label: "Работаем с любыми объёмами" },
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
                { num: "01", icon: "Flame", title: "Уверенность в горящих сроках", desc: "Аврал для нас — штатная ситуация. Мы принимаем вызовы с критическими дедлайнами, обеспечивая высокую скорость и предсказуемый результат." },
                { num: "02", icon: "MessageCircleHeart", title: "Никаких сложностей в общении", desc: "Сразу забираем задачу, помогаем править макеты, уточняем детали и погружаемся в проект. Вам не нужно оправдываться — мы просто делаем работу." },
                { num: "03", icon: "Target", title: "Единая точка ответственности", desc: "Вам больше не нужно координировать армию подрядчиков. Мы выступаем единым архитектором проекта: обеспечиваем бесшовную интеграцию всех процессов." },
                { num: "04", icon: "Eye", title: "Реально смотрим на вещи", desc: "Не ищем оправданий, а признаем ошибки. Готовы переделать, если сами допустили ошибку." },
              ].map((item, index) => (
                <div key={item.title} className="relative bg-white border border-gray-100 rounded-sm p-7 group hover:border-fp-red/30 hover:shadow-xl transition-all duration-500 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fp-red to-fp-red/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                  <div className="absolute top-4 right-4 font-oswald font-black text-5xl text-gray-100 group-hover:text-fp-red/10 transition-colors duration-500 leading-none select-none">{item.num}</div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-sm bg-fp-black flex items-center justify-center mb-5 group-hover:bg-fp-red transition-colors duration-300">
                      <Icon name={item.icon} size={22} className="text-white" />
                    </div>
                    <h4 className="font-oswald font-bold text-fp-black text-base uppercase mb-3 leading-tight">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}