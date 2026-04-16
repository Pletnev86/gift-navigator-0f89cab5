import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CreditCard } from "lucide-react";

const TradeUnionsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-spacing relative" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="badge-tag mb-6 inline-block">ДЛЯ ПРОФСОЮЗОВ</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-foreground">
              Пластиковая Мультикарта
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4">
              Премиальный подарок, который приятно держать в руках
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              Премиальный пластик. Лимитированная дизайнерская упаковка.
            </p>

            {/* Case */}
            <div className="case-card">
              <span className="badge-tag text-[10px] mb-3 inline-block">КЕЙС</span>
              <h3 className="font-heading font-bold text-lg mb-1 text-foreground">Газпром</h3>
              <p className="text-muted-foreground text-sm">
                Контракты на 6–8 млн руб.<br />
                Безукоризненная полиграфия.
              </p>
            </div>
          </motion.div>

          {/* Right: Card visual */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              {/* Stacked cards */}
              <div className="absolute top-4 left-4 w-72 h-44 rounded-2xl rotate-3 bg-amber-100 shadow-sm" />
              <div className="relative w-72 h-44 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-xl overflow-hidden p-5 flex flex-col justify-between text-white">
                <div>
                  <p className="font-heading font-black text-xs tracking-widest opacity-80">МУЛЬТИКАРТА</p>
                  <p className="font-heading font-black text-2xl mt-1">&gt;150 <span className="text-sm font-bold">БРЕНДОВ</span></p>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 opacity-70" />
                  <span className="font-heading font-bold text-sm opacity-70">За!Подарком</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TradeUnionsSection;
