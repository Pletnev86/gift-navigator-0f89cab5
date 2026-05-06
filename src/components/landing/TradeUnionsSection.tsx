import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import plasticCardGift from "@/assets/plastic-card-gift-new.png";

const TradeUnionsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-spacing relative mt-[30%] lg:mt-0" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Card image */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-xl max-w-md scale-[1.3]">
              <img
                src={plasticCardGift}
                alt="Пластиковая Мультикарта в подарочной упаковке"
                className="w-full h-auto object-cover"
                loading="lazy"
                width={800}
                height={600}
              />
            </div>
          </motion.div>

          {/* Right: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="badge-tag mb-6 inline-block">ДЛЯ ТЕХ, КТО ДАРИТ ПОДАРКИ</span>
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
        </div>
      </div>
    </section>
  );
};

export default TradeUnionsSection;
