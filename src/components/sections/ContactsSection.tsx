import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useInView } from "./useInView";
import { NAV_LINKS, SERVICES } from "./data";

const SEND_CONTACT_URL = "https://functions.poehali.dev/77139f1c-eecb-4bb1-b009-103947a29122";

interface ContactsSectionProps {
  scrollTo: (href: string) => void;
  activeService?: number | null;
}

export default function ContactsSection({ scrollTo, activeService }: ContactsSectionProps) {
  const contactsSection = useInView(0.1);
  const [formData, setFormData] = useState({ name: "", contact: "", service: "", message: "" });

  useEffect(() => {
    if (activeService !== null && activeService !== undefined && SERVICES[activeService]) {
      setFormData((prev) => ({ ...prev, service: SERVICES[activeService].title }));
      setSent(false);
    }
  }, [activeService]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.contact.trim()) {
      setError("Заполните имя и контакт");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch(SEND_CONTACT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      setFormData({ name: "", contact: "", service: "", message: "" });
    } catch {
      setError("Не удалось отправить. Позвоните нам: +7 (965) 354-82-82");
    } finally {
      setSending(false);
    }
  };

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
                  { icon: "Phone", label: "Телефон", value: "+7 (965) 354-82-82", href: "tel:+79653548282" },
                  { icon: "Mail", label: "Email", value: "zakaz@filmprint.ru", href: "mailto:zakaz@filmprint.ru" },
                  { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Краснобогатырская, д. 2. 2 стр. 53", href: null },
                  { icon: "Clock", label: "График работы", value: "Пн–Пт: 10:00–20:00, Сб–Вс: выходной", href: null },
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
                href="https://t.me/filmprintmsk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-sm hover:border-fp-red/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-sm bg-fp-red/20 border border-fp-red/30 flex items-center justify-center">
                  <Icon name="Send" size={22} className="text-fp-red" />
                </div>
                <div>
                  <div className="text-white font-oswald font-semibold uppercase tracking-wider py-0 rounded-none">Telegram</div>
                  <div className="text-white/40 text-sm">Скорость ответа - до 3 мин</div>
                </div>
                <Icon name="ArrowRight" size={18} className="text-white/30 group-hover:text-fp-red transition-colors ml-auto" />
              </a>

              <a
                href="https://t.me/filmprintmsk"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block"
              >
                <img
                  src="https://cdn.poehali.dev/projects/4ad21e29-4473-4b81-8b05-cac2fefa8718/bucket/137b650c-11e2-4c5d-be9c-3792cea80ee2.png"
                  alt="QR-код Telegram @filmprintmsk"
                  className="w-44 h-44 py-0 my-[100px] object-cover rounded-0 mx-0"
                />
              </a>
            </div>

            <div className={contactsSection.inView ? "animate-fade-up animate-delay-300" : "opacity-0"}>
              <div className="bg-white/5 border border-white/10 rounded-sm p-8">
                <h3 className="font-oswald font-semibold text-white uppercase mb-6 text-xl">Оставьте заявку</h3>

                {sent ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                      <Icon name="Check" size={32} className="text-green-400" />
                    </div>
                    <p className="text-white font-golos font-semibold text-lg mb-2">Заявка отправлена!</p>
                    <p className="text-white/50 font-golos text-sm">Мы свяжемся с вами в ближайшее время</p>
                    <button className="btn-red mt-6 text-sm py-2 px-6" onClick={() => setSent(false)}>
                      <span>Отправить ещё</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">Ваше имя</label>
                      <input
                        type="text"
                        placeholder="Иван Иванов"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-fp-red transition-colors font-golos"
                      />
                    </div>
                    <div>
                      <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">Телефон или Email</label>
                      <input
                        type="text"
                        placeholder="+7 (___) ___-__-__"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-fp-red transition-colors font-golos"
                      />
                    </div>
                    <div>
                      <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">Услуга</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white/60 focus:outline-none focus:border-fp-red transition-colors font-golos appearance-none"
                      >
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
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-fp-red transition-colors resize-none font-golos"
                      />
                    </div>
                    {error && <p className="text-red-400 text-sm font-golos">{error}</p>}
                    <button className="btn-red w-full text-base mt-2" onClick={handleSubmit} disabled={sending}>
                      <span>{sending ? "Отправка..." : "Отправить заявку"}</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-6 bg-white/5 border border-white/10 rounded-sm p-6">
                <h4 className="font-oswald font-semibold text-white uppercase tracking-wider mb-4 text-2xl">Реквизиты</h4>
                <div className="space-y-3 text-sm font-golos">
                  <div>
                    <span className="text-slate-400 text-base">Наименование организации:</span>
                    <p className="text-lg text-slate-200">ИП Якубов Айвар Дамирович</p>
                  </div>
                  <div>
                    <span className="text-base text-slate-400">ИНН:</span>
                    <p className="text-lg text-slate-200">771475423846</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-base">ОГРН ИП:</span>
                    <p className="text-lg text-slate-200">311774623600930, выдан 24 августа 2011</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-base">Юридический адрес:</span>
                    <p className="text-slate-200 text-lg">143968, Россия, Московская область, город Реутов, улица Реутовских ополченцев, дом 14, кв 311</p>
                  </div>
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
            <div>© 2026 ФильмПринт</div>
            <div>ИП Якубов Айвар Дамирович, ОГРНИП 311774623600930, ИНН 771475423846</div>
            <div className="flex gap-4">
              <Link to="/oferta" className="hover:text-white transition-colors">Договор оферты</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}