import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SeasonSection = () => {
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
            <span className="badge-tag mb-6 inline-block">ЛЕТО — ОСЕНЬ</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-8 text-foreground">
              Поддержка, которую почувствуют дома: Дети и Школа.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Покажите сотрудникам, что компании не всё равно. Финансовая поддержка сборов к школе без лишней бюрократии.
            </p>

            <div className="case-card">
              <span className="badge-tag text-[10px] mb-3 inline-block">КЕЙС</span>
              <h3 className="font-heading font-bold text-lg mb-2 text-foreground">
                «Портфель с пятёрками»
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Компенсация школьных расходов к 1 сентября через Мультикарты с детской витриной.
              </p>
            </div>
          </motion.div>

          {/* Right: Brand pills */}
          <motion.div
            className="flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            {["Литрес", "Lenovo", "MyBook", "Нетология", "Skyeng", "Айкрафт", "Читай-город", "Буквоед"].map((brand) => (
              <div key={brand} className="bg-muted rounded-full px-4 py-2 font-heading font-semibold text-sm text-foreground">
                {brand}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SeasonSection;
