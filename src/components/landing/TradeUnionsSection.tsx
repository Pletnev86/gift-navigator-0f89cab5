import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CreditCard, Award } from "lucide-react";

const TradeUnionsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-spacing relative" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Card visual */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              {/* Stacked cards effect */}
              <div className="absolute top-6 left-6 w-72 h-44 rounded-2xl rotate-6 opacity-30" style={{ background: "linear-gradient(135deg, hsl(210 100% 40%), hsl(210 100% 56%))" }} />
              <div className="absolute top-3 left-3 w-72 h-44 rounded-2xl rotate-3 opacity-50" style={{ background: "linear-gradient(135deg, hsl(210 100% 45%), hsl(210 100% 56%))" }} />
              <div className="relative w-72 h-44 rounded-2xl glow-blue overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(210 100% 50%), hsl(270 80% 60%))" }}>
                <div className="absolute inset-0 opacity-20" style={{ background: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)" }} />
                <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                  <div>
                    <p className="font-heading font-black text-sm tracking-widest text-primary-foreground/80">МУЛЬТИКАРТА</p>
                    <p className="font-heading font-black text-2xl text-primary-foreground">&gt;150 <span className="text-sm font-bold">БРЕНДОВ</span></p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary-foreground/70" />
                    <span className="font-heading font-bold text-primary-foreground/70 text-sm">За!Подарком</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="badge-tag mb-6 inline-block">Физический пластик</span>
            <h2 className="text-3xl md:text-5xl font-black leading-tight mb-6">
              Физическая Мультикарта.{" "}
              <span className="gradient-text">Премиум, который дешевле картона.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Для консервативных коллективов. Физический пластик, дизайнерская упаковка
              и печать брендированных конвертов в&nbsp;3 раза дешевле рынка.
            </p>

            {/* Case */}
            <div className="glass-panel-strong rounded-2xl p-6 glow-blue">
              <div className="flex items-start gap-4">
                <Award className="w-7 h-7 text-neon-blue flex-shrink-0 mt-1" />
                <div>
                  <span className="badge-tag text-[10px] mb-2 inline-block">Кейс</span>
                  <h3 className="font-heading font-bold text-lg mb-1">Газпром</h3>
                  <p className="text-muted-foreground text-sm">
                    Контракты на 6–8 млн руб., безукоризненная полиграфия.
                  </p>
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
