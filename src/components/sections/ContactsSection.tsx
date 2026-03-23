import Icon from "@/components/ui/icon";
import { useInView } from "./useInView";
import { NAV_LINKS, SERVICES } from "./data";

interface ContactsSectionProps {
  scrollTo: (href: string) => void;
}

export default function ContactsSection({ scrollTo }: ContactsSectionProps) {
  const contactsSection = useInView(0.1);

  return (
    <>
      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-fp-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, #E0292D 0px, #E0292D 1px, transparent 1px, transparent 60px)" }} />
        <div ref={contactsSection.ref} className="max-w-7xl mx-auto px-6">
          <div className={`mb-16 ${contactsSection.inView ? "animate-fade-up" : "opacity-0"}`}>
            <div className="section-label mb-4">Свяжитесь с нами</div>
            <h2 className="font-oswald font-bold text-5xl md:text-6xl uppercase text-red-700">контакты</h2>
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
                  <div className="text-white font-oswald font-semibold uppercase tracking-wider rounded-0 py-0">Telegram</div>
                  <div className="text-white/40 text-sm">Скорость ответа - до 3 мин</div>
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
                alt="ФильмПринт"
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
            <div>© 2026 ФильмПринт. </div>
            <div>ИП Иванов И.И., ОГРНИП 123456789012345, ИНН 123456789012</div>
            <div>г. Москва, ул. Краснобогатырская, д. 2. 2 стр. 53</div>
          </div>
        </div>
      </footer>
    </>
  );
}