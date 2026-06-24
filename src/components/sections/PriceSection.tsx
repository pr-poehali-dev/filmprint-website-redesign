import { useInView } from "./useInView";
import Icon from "@/components/ui/icon";

const PRICE_ITEMS = [
  { name: "Широкоформатная печать на фасадной сетке", price: "550 ₽", icon: "Grid3x3" },
  { name: "Печать на фотобумаге (220 гр/м²)", price: "1 100 ₽", icon: "Image" },
  { name: "Печать с вырезанием по контуру", price: "1 980 ₽", icon: "Scissors" },
  { name: "Плоттерная резка виниловой плёнки с нанесением монтажной плёнки", price: "1 800 ₽", icon: "Layers" },
  { name: "Интерьерная печать на натуральном холсте с натяжкой на подрамник", price: "3 850 ₽", icon: "Frame" },
  { name: "Интерьерная печать на натуральном холсте", price: "1 850 ₽", icon: "Palette" },
  { name: "Широкоформатная печать на литом баннере", price: "720 ₽", icon: "Flag" },
  { name: "Интерьерная печать на литом баннере", price: "850 ₽", icon: "Bookmark" },
  { name: "Интерьерная печать на постерной бумаге 160 гр/м²", price: "920 ₽", icon: "FileImage" },
  { name: "Интерьерная печать с накаткой на пенокартон 5 мм", price: "2 550 ₽", icon: "Square" },
  { name: "Интерьерная печать с накаткой на ПВХ 5 мм", price: "3 300 ₽", icon: "Box" },
  { name: "Интерьерная печать с накаткой на ПВХ 3 мм", price: "2 750 ₽", icon: "BoxSelect" },
  { name: "Интерьерная печать на плёнке с ламинацией (УФ/сольвент)", price: "1 320 ₽", icon: "Shield" },
];

interface PriceSectionProps {
  scrollTo: (href: string) => void;
}

export default function PriceSection({ scrollTo }: PriceSectionProps) {
  const section = useInView(0.05);

  return (
    <section id="price" className="py-24 bg-fp-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, #222a2d 0px, #222a2d 1px, transparent 1px, transparent 80px)" }} />
      <div ref={section.ref} className="max-w-7xl mx-auto px-6 relative">
        <div className={`mb-16 ${section.inView ? "animate-fade-up" : "opacity-0"}`}>
          <div className="section-label mb-4">Стоимость услуг</div>
          <h2 className="font-oswald font-bold text-3xl sm:text-5xl md:text-6xl uppercase text-fp-black">
            прайс-лист
          </h2>
          <p className="text-fp-black/50 font-golos mt-4 max-w-xl">
            Цены указаны за 1 м². Точную стоимость рассчитаем после уточнения деталей заказа.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${section.inView ? "animate-fade-up animate-delay-200" : "opacity-0"}`}>
          {PRICE_ITEMS.map((item, i) => (
            <div
              key={item.name}
              className="group flex items-center gap-4 p-5 bg-white border border-fp-black/5 rounded-sm hover:border-fp-red/30 hover:shadow-lg hover:shadow-fp-red/5 transition-all duration-300"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div className="w-10 h-10 rounded-sm bg-fp-red/10 border border-fp-red/20 flex items-center justify-center flex-shrink-0 group-hover:bg-fp-red/20 transition-colors">
                <Icon name={item.icon} size={18} className="text-fp-red" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-fp-black font-golos text-sm leading-snug">{item.name}</div>
              </div>
              <div className="font-oswald font-bold text-lg text-fp-red whitespace-nowrap pl-3">
                {item.price}
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-12 flex flex-col sm:flex-row items-center gap-6 justify-center ${section.inView ? "animate-fade-up animate-delay-400" : "opacity-0"}`}>
          <button className="btn-red py-[11px] my-0 mx-0 px-[77px] text-base rounded-[4px] bg-transparent"
            onClick={() => scrollTo("#contacts")}
            className="btn-red px-8 py-4 text-base flex items-center justify-center"
          >
            Рассчитать заказ
          </button>

        </div>
      </div>
    </section>
  );
}