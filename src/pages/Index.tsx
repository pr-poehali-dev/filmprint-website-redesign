import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/4ad21e29-4473-4b81-8b05-cac2fefa8718/files/fabdae29-bb2d-4d89-928c-ba009b8b75a0.jpg";

const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Прайс", href: "#pricing" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "О нас", href: "#about" },
  { label: "Контакты", href: "#contacts" },
];

const STATS = [
  { value: "10+", label: "лет на рынке" },
  { value: "5 000+", label: "выполненных проектов" },
  { value: "98%", label: "довольных клиентов" },
  { value: "1 день", label: "минимальный срок" },
];

const SERVICES = [
  {
    icon: "Printer",
    title: "Широкоформатная печать",
    description: "Баннеры, плакаты, стенды, оформление мероприятий — любой масштаб.",
    price: "от 800 ₽/м²",
    tag: "Популярное",
  },
  {
    icon: "Image",
    title: "Интерьерная печать",
    description: "Печать на плёнке с ламинацией, фотообои, декоративные панели.",
    price: "от 1 320 ₽/м²",
    tag: null,
  },
  {
    icon: "Film",
    title: "Декорации и бутафория",
    description: "Декорации для кино и театра, реквизит, крупные объекты.",
    price: "по запросу",
    tag: "Кино",
  },
  {
    icon: "Layers",
    title: "3D-печать",
    description: "Прототипы, макеты, объёмные элементы декора и бутафории.",
    price: "от 2 500 ₽",
    tag: null,
  },
  {
    icon: "FileImage",
    title: "Печать плакатов",
    description: "Высококачественная печать на фотобумаге, холсте и специальных материалах.",
    price: "от 350 ₽",
    tag: null,
  },
  {
    icon: "Tag",
    title: "Таблички и наклейки",
    description: "Навигационные таблички, брендирование, оформление помещений.",
    price: "от 150 ₽",
    tag: null,
  },
];

const PRICING = [
  { name: "Интерьерная печать на плёнке с ламинацией", price: "1 320 ₽/м²", note: "Комплексная услуга — всё включено" },
  { name: "Широкоформатная печать (наружная)", price: "от 800 ₽/м²", note: "Баннеры, стенды, оформление" },
  { name: "Печать на холсте с натяжкой", price: "от 1 800 ₽/м²", note: "Подготовка + натяжка включены" },
  { name: "Фотопечать (плакаты А1–А0)", price: "от 350 ₽/шт.", note: "Матовая / глянцевая бумага" },
  { name: "Виниловые наклейки", price: "от 150 ₽/шт.", note: "Порезка по контуру" },
  { name: "Таблички (ПВХ, алюминий)", price: "от 400 ₽/шт.", note: "С монтажными отверстиями" },
  { name: "3D-печать", price: "от 2 500 ₽", note: "Зависит от сложности и размера" },
  { name: "Декорации для кино/театра", price: "по запросу", note: "Индивидуальный расчёт" },
];

const PORTFOLIO_ITEMS = [
  { title: "Кинодекорации", category: "Кино", color: "from-red-900 to-stone-900" },
  { title: "Интерьерное оформление", category: "Интерьер", color: "from-stone-800 to-red-950" },
  { title: "Выставочный стенд", category: "Выставки", color: "from-red-950 to-stone-900" },
  { title: "Брендирование офиса", category: "Корпоратив", color: "from-stone-900 to-red-900" },
  { title: "Праздничный баннер", category: "Мероприятия", color: "from-red-900 to-stone-800" },
  { title: "Фотозона для съёмки", category: "Кино", color: "from-stone-800 to-red-900" },
];

const REVIEWS = [
  {
    name: "Алексей Соколов",
    role: "Арт-директор кинопроизводства",
    text: "FilmPrint — наш постоянный партнёр по декорациям. Всегда в срок, всегда точно по макету. Рекомендую без оговорок.",
    stars: 5,
  },
  {
    name: "Марина Кузнецова",
    role: "Ивент-менеджер",
    text: "Оформили всё для нашей выставки в рекордные сроки. Качество печати просто великолепное — клиенты были в восторге.",
    stars: 5,
  },
  {
    name: "Дмитрий Орлов",
    role: "Владелец кафе",
    text: "Заказывал интерьерное оформление. Посоветовали лучший материал для кухни, помогли с макетом. Результат превзошёл ожидания.",
    stars: 5,
  },
];

const USPS = [
  { icon: "Zap", title: "Срок от 1 дня", desc: "Ходовые материалы всегда в наличии." },
  { icon: "Layers", title: "Полный цикл", desc: "От реквизитных документов до декораций." },
  { icon: "Headphones", title: "Экспертная помощь", desc: "Подбираем оптимальное решение под задачу и бюджет" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(null);

  const heroSection = useInView(0.1);
  const statsSection = useInView(0.2);
  const servicesSection = useInView(0.1);
  const pricingSection = useInView(0.1);
  const portfolioSection = useInView(0.1);
  const aboutSection = useInView(0.1);
  const reviewsSection = useInView(0.1);
  const contactsSection = useInView(0.1);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-fp-white font-golos overflow-x-hidden">

      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-fp-black/95 backdrop-blur-md shadow-lg shadow-black/30" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => scrollTo("#hero")}>
            <img
              src="https://cdn.poehali.dev/projects/4ad21e29-4473-4b81-8b05-cac2fefa8718/bucket/logo-transparent.png"
              alt="FilmPrint"
              className="h-12 w-auto object-contain"
              style={{
                filter: "drop-shadow(0 0 1px rgba(255,255,255,0.8)) drop-shadow(0 0 1.5px rgba(255,255,255,0.5)) drop-shadow(0 2px 8px rgba(0,0,0,0.5))"
              }}
            />
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button key={link.href} onClick={() => scrollTo(link.href)} className="nav-link text-white/70 hover:text-white">
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+79999999999" className="text-white/70 hover:text-white transition-colors text-sm font-golos">
              +7 (999) 999-99-99
            </a>
            <button className="btn-red text-sm py-3 px-6" onClick={() => scrollTo("#contacts")}>
              <span>Получить расчёт</span>
            </button>
          </div>

          <button className="lg:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-fp-black/98 backdrop-blur-md border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <button key={link.href} onClick={() => scrollTo(link.href)} className="nav-link text-white/70 hover:text-white text-left py-2">
                  {link.label}
                </button>
              ))}
              <button className="btn-red text-sm mt-2 w-full" onClick={() => scrollTo("#contacts")}>
                <span>Получить расчёт</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center bg-gradient-hero bg-noise overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMAGE} alt="FilmPrint производство" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-fp-black via-fp-black/90 to-transparent" />
        </div>

        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 z-0"
          style={{ background: "radial-gradient(circle, #E0292D 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full opacity-10 z-0"
          style={{ background: "radial-gradient(circle, #8D2B2C 0%, transparent 70%)" }} />

        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 hidden lg:flex flex-col">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex-1 border-b border-white/5 flex items-center justify-center">
              <div className="w-3 h-6 rounded-sm bg-fp-red/20 border border-fp-red/30" />
            </div>
          ))}
        </div>

        <div ref={heroSection.ref} className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20">
          <div className="max-w-3xl">
            <div className={`section-label mb-6 ${heroSection.inView ? "animate-fade-up" : "opacity-0"}`}>FilmPrint - надежный тыл для вашего бизнеса</div>

            <h1 className={`font-oswald font-bold text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9] uppercase mb-8 ${heroSection.inView ? "animate-fade-up animate-delay-100" : "opacity-0"}`}>
              Профессиональная<br />
              <span className="text-gradient-red">широкоформатная</span><br />
              <span className="text-white/90">печать</span>
            </h1>

            <p className={`text-white/60 text-lg md:text-xl font-golos max-w-xl mb-12 leading-relaxed ${heroSection.inView ? "animate-fade-up animate-delay-200" : "opacity-0"}`}>Ваше единое окно в мир производства. 
От наклеек до арт-объектов. 
Один подрядчик. Одна ответственность. Бесшовный результат.</p>

            <div className={`flex flex-wrap gap-4 ${heroSection.inView ? "animate-fade-up animate-delay-300" : "opacity-0"}`}>
              <button className="btn-red text-base" onClick={() => scrollTo("#contacts")}>
                <span>Запросить КП</span>
              </button>
              <button className="btn-outline-white text-base" onClick={() => scrollTo("#services")}>
                Наши услуги
              </button>
            </div>

            <div className={`mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 ${heroSection.inView ? "animate-fade-up animate-delay-400" : "opacity-0"}`}>
              {USPS.map((usp) => (
                <div key={usp.title} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-sm bg-fp-red/20 border border-fp-red/40 flex items-center justify-center flex-shrink-0">
                    <Icon name={usp.icon} size={20} className="text-fp-red" />
                  </div>
                  <div>
                    <div className="font-oswald font-semibold text-white text-base">{usp.title}</div>
                    <div className="text-white/50 text-sm">{usp.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 z-10">
          <span className="text-xs uppercase tracking-widest font-golos"></span>
          <Icon name="ChevronDown" size={20} className="animate-bounce" />
        </div>
      </section>

      {/* STATS */}
      <section className="bg-fp-black py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(90deg, #E0292D 0px, #E0292D 1px, transparent 1px, transparent 80px)" }} />
        <div ref={statsSection.ref} className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={stat.label} className={`text-center ${statsSection.inView ? `animate-count-up animate-delay-${(i + 1) * 100}` : "opacity-0"}`}>
                <div className="font-oswald font-bold text-4xl md:text-5xl text-fp-red mb-2">{stat.value}</div>
                <div className="text-white/50 text-sm uppercase tracking-wider font-golos">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-red" />
        <div ref={servicesSection.ref} className="max-w-7xl mx-auto px-6">
          <div className={`mb-16 ${servicesSection.inView ? "animate-fade-up" : "opacity-0"}`}>
            <div className="section-label mb-4">Что мы делаем</div>
            <h2 className="font-oswald font-bold text-5xl md:text-6xl text-fp-black uppercase">
              Наши <span className="text-gradient-red">услуги</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <div
                key={service.title}
                className={`relative group bg-white border border-gray-100 rounded-sm p-8 card-hover cursor-pointer ${servicesSection.inView ? `animate-fade-up animate-delay-${(i + 1) * 100}` : "opacity-0"} ${activeService === i ? "border-fp-red shadow-lg shadow-fp-red/10" : ""}`}
                onClick={() => setActiveService(activeService === i ? null : i)}
              >
                {service.tag && (
                  <div className="absolute top-4 right-4 bg-fp-red text-white text-xs font-oswald uppercase tracking-wider px-3 py-1 rounded-sm">
                    {service.tag}
                  </div>
                )}
                <div className="w-14 h-14 rounded-sm bg-fp-red/10 flex items-center justify-center mb-6 group-hover:bg-fp-red/20 transition-colors">
                  <Icon name={service.icon} size={28} className="text-fp-red" />
                </div>
                <h3 className="font-oswald font-semibold text-xl text-fp-black mb-3 uppercase">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{service.description}</p>
                <div className="flex items-center justify-between">
                  <div className="font-oswald font-bold text-fp-red text-lg">{service.price}</div>
                  <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-fp-red group-hover:bg-fp-red transition-all">
                    <Icon name="ArrowRight" size={14} className="text-gray-400 group-hover:text-white transition-colors" />
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
                    <span className="text-fp-black text-sm font-golos font-medium">{item.label}</span>
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

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-fp-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, #E0292D 0px, #E0292D 1px, transparent 1px, transparent 60px)" }} />
        <div ref={contactsSection.ref} className="max-w-7xl mx-auto px-6">
          <div className={`mb-16 ${contactsSection.inView ? "animate-fade-up" : "opacity-0"}`}>
            <div className="section-label mb-4">Свяжитесь с нами</div>
            <h2 className="font-oswald font-bold text-5xl md:text-6xl text-white uppercase">
              Конта<span className="text-gradient-red">кты</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className={contactsSection.inView ? "animate-slide-in-left" : "opacity-0"}>
              <div className="space-y-8 mb-12">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (999) 999-99-99", href: "tel:+79999999999" },
                  { icon: "Mail", label: "Email", value: "info@filmprint.ru", href: "mailto:info@filmprint.ru" },
                  { icon: "MapPin", label: "Адрес", value: "Москва, ул. Примерная, д. 1", href: null },
                  { icon: "Clock", label: "График работы", value: "Пн–Пт 9:00–20:00, Сб 10:00–18:00", href: null },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-sm bg-fp-red/20 border border-fp-red/30 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={22} className="text-fp-red" />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs uppercase tracking-wider mb-1 font-golos">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-white font-golos font-medium text-lg hover:text-fp-red transition-colors">{item.value}</a>
                      ) : (
                        <div className="text-white font-golos font-medium">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-sm hover:border-fp-red/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-sm bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                  <Icon name="Send" size={22} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-oswald font-semibold uppercase tracking-wider">Telegram</div>
                  <div className="text-white/40 text-sm">Напишите нам в мессенджер</div>
                </div>
                <Icon name="ArrowRight" size={18} className="text-white/30 group-hover:text-fp-red transition-colors ml-auto" />
              </a>
            </div>

            <div className={contactsSection.inView ? "animate-fade-up animate-delay-300" : "opacity-0"}>
              <div className="bg-white/5 border border-white/10 rounded-sm p-8">
                <h3 className="font-oswald font-semibold text-white text-xl uppercase mb-6">Оставьте заявку</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-fp-red transition-colors font-golos"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">Телефон или Email</label>
                    <input
                      type="text"
                      placeholder="+7 (999) 999-99-99"
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-fp-red transition-colors font-golos"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">Услуга</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white/60 focus:outline-none focus:border-fp-red transition-colors font-golos appearance-none">
                      <option value="" className="bg-fp-black">Выберите услугу</option>
                      {SERVICES.map(s => (
                        <option key={s.title} value={s.title} className="bg-fp-black">{s.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">Описание проекта</label>
                    <textarea
                      rows={4}
                      placeholder="Расскажите о вашей задаче..."
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-fp-red transition-colors resize-none font-golos"
                    />
                  </div>
                  <button className="btn-red w-full text-base mt-2">
                    <span>Отправить заявку</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-fp-black border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
            <div className="flex items-center">
              <img
                src="https://cdn.poehali.dev/projects/4ad21e29-4473-4b81-8b05-cac2fefa8718/bucket/logo-transparent.png"
                alt="FilmPrint"
                className="h-10 w-auto object-contain"
              />
            </div>

            <div className="flex flex-wrap gap-6">
              {NAV_LINKS.map((link) => (
                <button key={link.href} onClick={() => scrollTo(link.href)} className="text-white/40 hover:text-white text-sm font-golos transition-colors">
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/5 mb-8" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-white/30 text-xs font-golos">
            <div>© 2024 FilmPrint. Все права защищены.</div>
            <div>ИП Иванов И.И., ОГРНИП 123456789012345, ИНН 123456789012</div>
            <div>г. Москва, ул. Примерная, д. 1</div>
          </div>
        </div>
      </footer>
    </div>
  );
}