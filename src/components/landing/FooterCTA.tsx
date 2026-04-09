import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const FooterCTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-spacing relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 blur-[150px]" style={{ background: "hsl(210 100% 56%)" }} />
      </div>

      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="glass-panel-strong rounded-3xl p-10 md:p-16 text-center glow-blue relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-black leading-tight mb-6">
            Опередите конкурентов.{" "}
            <span className="gradient-text">Демо-витрина за наш счёт.</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-neon-green" />
              <span>Бесплатно соберём витрину в ваших цветах</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-neon-green" />
              <span>Точный расчёт проекта за 30 минут</span>
            </div>
          </div>

          <motion.button
            className="btn-glow text-primary-foreground flex items-center gap-3 mx-auto text-xl px-12 py-5 animate-pulse-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Запросить демо-сборку
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>

        <div className="text-center mt-12 text-muted-foreground text-sm font-heading">
          © {new Date().getFullYear()} За!Подарком. Все права защищены.
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;
