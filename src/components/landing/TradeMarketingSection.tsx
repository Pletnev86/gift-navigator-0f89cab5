import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
              Пиковый сезон без паники. Инвестируйте в сроки.
            </h2>

            <div className="space-y-3 mb-8">
              {seasons.map((s) => (
                <div key={s.label} className={`${s.color} rounded-xl px-6 py-3 font-heading font-bold text-foreground text-center max-w-xs`}>
                  {s.label}
                </div>
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Закупите Мультикарты сейчас — избежите сезонных наценок и суеты в последние дни декабря.
            </p>
          </motion.div>

          {/* Right: Visual placeholder for chart */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="light-card w-full max-w-md p-8">
              <h4 className="font-heading font-bold text-sm text-foreground mb-4 uppercase tracking-wide">
                Периоды высокой активности
              </h4>
              <div className="flex items-end gap-2 h-40">
                {[3, 5, 4, 6, 3, 7, 8, 10, 6, 4, 5, 9].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t transition-all"
                    style={{
                      height: `${h * 10}%`,
                      background: i >= 9 ? "hsl(var(--lime))" : "hsl(0 0% 85%)",
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-muted-foreground font-heading">
                <span>Янв</span>
                <span>Мар</span>
                <span>Июн</span>
                <span>Сен</span>
                <span>Дек</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TradeMarketingSection;
