import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import qrCode from "@/assets/qr-code.png";

const steps = [
  { num: "01", desc: "Выбираете формат — Электронный сертификат или Пластик" },
  { num: "02", desc: "Согласовываем дизайн (цвета, логотип, слоган)" },
  { num: "03", desc: "Электронный сертификат придёт на e-mail, а пластиковая карта будет торжественно вручена" },
  { num: "04", desc: "Активация карты пользователем" },
  { num: "05", desc: "Выбор подходящего подарка и получение" },
];

const HowItWorksSection = () => {
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
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight text-foreground inline-block px-6 py-2 rounded-2xl" style={{ background: "hsl(var(--lime))" }}>
            Как работает?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {steps.slice(0, 3).map((step, i) => (
            <motion.div
              key={step.num}
              className="light-card relative"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.15 }}
            >
              <span className="olive-number text-4xl mb-4 block">{step.num}</span>
              <p className="text-foreground leading-relaxed text-sm">{step.desc}</p>
              {i < 2 && (
                <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.slice(3).map((step, i) => (
            <motion.div
              key={step.num}
              className="light-card relative"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: (i + 3) * 0.15 }}
            >
              <span className="olive-number text-4xl mb-4 block">{step.num}</span>
              <p className="text-foreground leading-relaxed text-sm">{step.desc}</p>
              {i === 0 && (
                <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
          {/* QR placeholder */}
          <motion.div
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <img src={qrCode} alt="QR-код для тестирования платформы" className="w-32 h-32 rounded-2xl" />
            <p className="text-sm text-muted-foreground font-heading text-center">
              Отсканируй QR и<br />протестируй платформу
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
