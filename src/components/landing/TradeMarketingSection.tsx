import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import seasonAnalysis from "@/assets/season-analysis.jpg";

const seasons = [
  { label: "23 февраля", color: "bg-pink-200" },
  { label: "8 марта", color: "bg-yellow-200" },
  { label: "Новый Год", color: "bg-sky-200" },
];

const TradeMarketingSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-spacing relative" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="badge-tag mb-6 inline-block">ПИКОВЫЙ СЕЗОН</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-8 text-foreground">
              Пиковый сезон без паники. <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 bg-clip-text text-transparent">Инвестируйте в сроки.</span>
            </h2>

            <div className="space-y-3 mb-8">
              {seasons.map((s) => (
                <div key={s.label} className={`${s.color} rounded-xl px-6 py-3 font-heading font-bold text-foreground text-center max-w-xs`}>
                  {s.label}
                </div>
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Закупите Мультикарты сейчас — избежите сезонных наценок и суеты перед праздниками.
            </p>
          </motion.div>

          {/* Right: Visual placeholder for chart */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <img
              src={seasonAnalysis}
              alt="Периоды высокой активности — анализ сезонности"
              className="w-full max-w-xl rounded-2xl shadow-lg"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TradeMarketingSection;
