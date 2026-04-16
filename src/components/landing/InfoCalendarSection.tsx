import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Rocket, Heart, Sun, GraduationCap, Snowflake, Gift, Flower2 } from "lucide-react";

const events = [
  { season: "ВЕСНА", title: "День работников культуры", icon: Star, color: "from-purple-800/80 to-purple-900/80" },
  { season: "ВЕСНА", title: "День космонавтики", icon: Rocket, color: "from-indigo-800/80 to-indigo-900/80" },
  { season: "ВЕСНА", title: "День скорой помощи", subtitle: "«Сухих рукавов»", icon: Heart, color: "from-teal-800/80 to-teal-900/80" },
  { season: "ЛЕТО", title: "День защиты детей", icon: Sun, color: "from-yellow-700/80 to-yellow-800/80" },
  { season: "ОСЕНЬ", title: "1 сентября", subtitle: "Кейс «Портфель с пятёрками»", icon: GraduationCap, color: "from-rose-800/80 to-rose-900/80" },
  { season: "ЗИМА-ПИК", title: "Новый Год", icon: Snowflake, color: "from-blue-800/80 to-blue-900/80" },
  { season: "ЗИМА", title: "23 февраля", icon: Gift, color: "from-slate-700/80 to-slate-800/80" },
  { season: "ВЕСНА", title: "8 марта", icon: Flower2, color: "from-pink-700/80 to-pink-800/80" },
];

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
          {events.map((event, i) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={event.title}
                className={`rounded-2xl bg-gradient-to-br ${event.color} p-5 flex flex-col justify-between min-h-[160px] border border-white/5`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
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
              </motion.div>
            );
          })}
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
