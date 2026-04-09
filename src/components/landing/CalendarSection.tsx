import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Flower2, Sun, Snowflake, Gift, GraduationCap, Heart, Rocket, Star } from "lucide-react";

const holidays = [
  { title: "День работников культуры", season: "Весна", icon: Star, gradient: "from-pink-500/20 to-purple-500/20", border: "border-pink-500/20" },
  { title: "День космонавтики", season: "Весна", icon: Rocket, gradient: "from-blue-500/20 to-indigo-500/20", border: "border-blue-500/20" },
  { title: "День скорой помощи", season: "Весна", icon: Heart, subtitle: "«Сухих рукавов»", gradient: "from-red-500/20 to-orange-500/20", border: "border-red-500/20" },
  { title: "День защиты детей", season: "Лето", icon: Sun, gradient: "from-yellow-500/20 to-orange-500/20", border: "border-yellow-500/20" },
  { title: "1 сентября", season: "Осень", icon: GraduationCap, subtitle: "Кейс «Портфель с пятёрками»", gradient: "from-emerald-500/20 to-teal-500/20", border: "border-emerald-500/20" },
  { title: "Новый Год", season: "Зима-Пик", icon: Snowflake, gradient: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/20" },
  { title: "23 февраля", season: "Зима", icon: Gift, gradient: "from-slate-500/20 to-gray-500/20", border: "border-slate-500/20" },
  { title: "8 марта", season: "Весна", icon: Flower2, gradient: "from-pink-500/20 to-rose-500/20", border: "border-pink-500/20" },
];

const CalendarSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-spacing relative" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="badge-tag mb-6 inline-block">
            <Calendar className="w-3 h-3 inline mr-1" />
            Календарь
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight">
            Календарь инфоповодов.{" "}
            <span className="gradient-text">Забота круглый год.</span>
          </h2>
        </motion.div>

        {/* Bento masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {holidays.map((h, i) => (
            <motion.div
              key={h.title}
              className={`bento-card bg-gradient-to-br ${h.gradient} ${h.border} ${i === 5 ? 'md:col-span-2 md:row-span-2' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <h.icon className="w-8 h-8 text-foreground/60 mb-3" />
              <p className="text-[10px] font-heading uppercase tracking-widest text-muted-foreground mb-1">{h.season}</p>
              <h3 className="font-heading font-bold text-sm md:text-base">{h.title}</h3>
              {h.subtitle && <p className="text-xs text-muted-foreground mt-1">{h.subtitle}</p>}
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-muted-foreground mt-8 font-heading text-sm"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          ⚡ Зафиксируйте бюджет до роста сезонных цен!
        </motion.p>
      </div>
    </section>
  );
};

export default CalendarSection;
