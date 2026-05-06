import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

import oilDayImg from "@/assets/cards/oil-day.jpg";
import builderDayImg from "@/assets/cards/builder-day.png";
import medicDayImg from "@/assets/cards/medic-day.jpg";
import transportDayImg from "@/assets/cards/transport-day.jpg";
import feb23Img from "@/assets/cards/feb23.jpg";
import march8Img from "@/assets/cards/march8.jpg";
import birthdayImg from "@/assets/cards/birthday.jpg";
import newyearImg from "@/assets/cards/newyear.jpg";

const events = [
  { emoji: "⛽",  title: "День нефтяника",       subtitle: "«Энергия ваших достижений»",   date: "6 сент.",     sign: "«Энергия недр»",         desc: "Матовый металл и «золотое» тиснение, подчёркивающее статус лидеров рынка.",      color: "from-amber-50 to-orange-50",  border: "border-amber-200", cardImg: oilDayImg },
  { emoji: "🏗️", title: "День строителя",        subtitle: "«Фундамент вашего будущего»",  date: "9 авг.",      sign: "«Архитектура успеха»",     desc: "Фактурная упаковка с элементами чертежей и структурным дизайном.",            color: "from-orange-50 to-red-50",    border: "border-orange-200", cardImg: builderDayImg },
  { emoji: "🏥",  title: "День медработника",     subtitle: "«Героям в белых халатах»",     date: "21 июн.",     sign: "«Сердце под защитой»",    desc: "Чистый, минималистичный дизайн с акцентом на заботу и человечность.",         color: "from-teal-50 to-emerald-50",  border: "border-teal-200", cardImg: medicDayImg },
  { emoji: "🚛",  title: "Транспорт и логистика", subtitle: "«Верный курс на успех»",       date: "25 окт.",     sign: "«Свобода движения»",      desc: "Износостойкий пластик или цифровой формат с мгновенным доступом.",            color: "from-slate-50 to-gray-100",   border: "border-slate-200", cardImg: transportDayImg },
  { emoji: "🎖️", title: "23 февраля",             subtitle: "День защитника Отечества",    date: "23 фев.",     sign: "«Сила и честь»",          desc: "Строгий мужской дизайн с патриотическими акцентами.",                        color: "from-blue-50 to-indigo-50",   border: "border-blue-200", cardImg: feb23Img },
  { emoji: "🌸",  title: "8 марта",               subtitle: "Международный женский день",  date: "8 мар.",      sign: "«С заботой о вас»",       desc: "Нежный цветочный дизайн с весенними цветами.",                               color: "from-pink-50 to-rose-50",     border: "border-pink-200", cardImg: march8Img },
  { emoji: "🎂",  title: "День рождения",         subtitle: "Персональный подарок",        date: "Круглый год", sign: "«Твой особенный день»",   desc: "Яркий праздничный дизайн с именными вариантами оформления.",                 color: "from-purple-50 to-violet-50", border: "border-purple-200", cardImg: birthdayImg },
  { emoji: "🎄",  title: "Новый Год",             subtitle: "Главный праздник года",       date: "31 дек.",     sign: "«Пусть мечты сбываются»", desc: "Зимний новогодний дизайн с анимацией снежинок.",                             color: "from-sky-50 to-blue-50",      border: "border-sky-200", cardImg: newyearImg },
];

const FlipCard = ({ ev, i, inView }: { ev: typeof events[0]; i: number; inView: boolean }) => {
  const [flipped, setFlipped] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    if (flipped) {
      setFlipped(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      setFlipped(true);
      timerRef.current = setTimeout(() => setFlipped(false), 5000);
    }
  };

  return (
    <motion.div
      className="cursor-pointer"
      style={{ perspective: 800 }}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: i * 0.06 }}
      onClick={handleClick}
    >
      <motion.div
        className="relative min-h-[220px]"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Front — новый светлый дизайн */}
        <div
          className={`absolute inset-0 rounded-2xl border p-5 flex flex-col gap-3 bg-gradient-to-br ${ev.color} ${ev.border}`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex items-start justify-between gap-2">
            <span className="text-2xl leading-none">{ev.emoji}</span>
            <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-gray-400 bg-white/60 rounded-full px-2 py-0.5 whitespace-nowrap">
              {ev.date}
            </span>
          </div>
          <div>
            <p className="font-heading font-black text-sm leading-tight text-gray-900">{ev.title}</p>
            <p className="text-xs text-gray-500 mt-0.5 italic">{ev.subtitle}</p>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed flex-1">{ev.desc}</p>
          <div className="text-[11px] font-heading font-bold text-gray-400 border-t border-gray-200/60 pt-2 mt-auto">
            Подпись: <span className="text-gray-900">{ev.sign}</span>
          </div>
          <p className="text-[9px] text-gray-400 font-heading text-center">👆 нажмите</p>
        </div>

        {/* Back — изображение карты */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border border-gray-200"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <img src={ev.cardImg} alt={ev.title} className="w-full h-full object-cover" loading="lazy" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const InfoCalendarSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-spacing bg-background" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-tag mb-6 inline-block">📅 КАЛЕНДАРЬ</span>
          <h2 className="text-3xl md:text-5xl font-black leading-tight text-foreground">
            Календарь инфоповодов.{" "}
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 bg-clip-text text-transparent">
              Забота круглый год.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {events.map((ev, i) => (
            <FlipCard key={ev.title} ev={ev} i={i} inView={inView} />
          ))}
        </div>

        <motion.p
          className="text-center text-muted-foreground text-sm mt-8 font-heading"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          ✨ Зафиксируйте бюджет до роста сезонных цен!
        </motion.p>
      </div>
    </section>
  );
};

export default InfoCalendarSection;
