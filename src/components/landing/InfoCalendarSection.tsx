import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Snowflake, Gift, Flower2, Shield, Flame, HardHat, Heart, Truck } from "lucide-react";

import oilDayImg from "@/assets/cards/oil-day.jpg";
import builderDayImg from "@/assets/cards/builder-day.png";
import medicDayImg from "@/assets/cards/medic-day.jpg";
import transportDayImg from "@/assets/cards/transport-day.jpg";
import birthdayImg from "@/assets/cards/birthday.jpg";
import feb23Img from "@/assets/cards/feb23.jpg";
import march8Img from "@/assets/cards/march8.jpg";
import newyearImg from "@/assets/cards/newyear.jpg";

const events = [
  { season: "СЕНТЯБРЬ", title: "День нефтяника", subtitle: "«Энергия ваших достижений»", icon: Flame, color: "from-amber-800/80 to-amber-900/80", cardImg: oilDayImg },
  { season: "АВГУСТ", title: "День строителя", subtitle: "«Фундамент вашего будущего»", icon: HardHat, color: "from-orange-800/80 to-orange-900/80", cardImg: builderDayImg },
  { season: "ИЮНЬ", title: "День медработника", subtitle: "«Героям в белых халатах»", icon: Heart, color: "from-teal-800/80 to-teal-900/80", cardImg: medicDayImg },
  { season: "ОКТЯБРЬ", title: "Транспорт и логистика", subtitle: "«Верный курс на успех»", icon: Truck, color: "from-slate-700/80 to-slate-800/80", cardImg: transportDayImg },
  { season: "КРУГЛЫЙ ГОД", title: "День рождения", subtitle: "Персональный подарок", icon: Gift, color: "from-purple-800/80 to-purple-900/80", cardImg: birthdayImg },
  { season: "ЗИМА", title: "23 февраля", subtitle: "День защитника Отечества", icon: Shield, color: "from-indigo-800/80 to-indigo-900/80", cardImg: feb23Img },
  { season: "ВЕСНА", title: "8 марта", subtitle: "Международный женский день", icon: Flower2, color: "from-pink-700/80 to-pink-800/80", cardImg: march8Img },
  { season: "ЗИМА", title: "Новый Год", subtitle: "Главный праздник года", icon: Snowflake, color: "from-blue-800/80 to-blue-900/80", cardImg: newyearImg },
];

const FlipCard = ({ event, i, inView }: { event: typeof events[0]; i: number; inView: boolean }) => {
  const [flipped, setFlipped] = useState(false);
  const Icon = event.icon;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    if (flipped) {
      setFlipped(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      setFlipped(true);
      timerRef.current = setTimeout(() => setFlipped(false), 10000);
    }
  };

  return (
    <motion.div
      className="cursor-pointer"
      style={{ perspective: 800 }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: i * 0.08 }}
      onClick={handleClick}
    >
      <motion.div
        className="relative min-h-[180px] md:min-h-[200px]"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${event.color} p-5 flex flex-col justify-between border border-white/5`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <Icon className="w-7 h-7 text-white/60 mb-4" />
          <div>
            <p className="text-[10px] font-heading font-bold tracking-[0.15em] text-white/50 mb-1">
              {event.season}
            </p>
            <p className="font-heading font-bold text-sm text-white">{event.title}</p>
            {event.subtitle && (
              <p className="text-[11px] text-white/40 mt-0.5">{event.subtitle}</p>
            )}
          </div>
          <p className="text-[9px] text-white/30 mt-2 font-heading">👆 нажмите</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <img
            src={event.cardImg}
            alt={event.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {events.map((event, i) => (
            <FlipCard key={event.title} event={event} i={i} inView={inView} />
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
