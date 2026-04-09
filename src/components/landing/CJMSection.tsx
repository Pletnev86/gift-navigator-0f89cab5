import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { QrCode, Store, Barcode } from "lucide-react";

const steps = [
  { icon: QrCode, num: "01", title: "Активация", desc: "Сканирование QR-кода с карты или из SMS." },
  { icon: Store, num: "02", title: "Выбор", desc: "Выбор любимого бренда на персональной витрине." },
  { icon: Barcode, num: "03", title: "Покупка", desc: "Моментальное получение штрих-кода или пин-кода." },
];

const CJMSection = () => {
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
          <span className="badge-tag mb-6 inline-block">CJM</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight">
            3 касания до любимого бренда.{" "}
            <span className="gradient-text">Идеальный UX.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-24 left-[16%] right-[16%] h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(210 100% 56% / 0.3), transparent)" }} />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="bento-card text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center glow-blue" style={{ background: "hsl(210 100% 56% / 0.15)" }}>
                <step.icon className="w-8 h-8 text-neon-blue" />
              </div>
              <span className="text-5xl font-heading font-black text-muted-foreground/20">{step.num}</span>
              <h3 className="font-heading font-bold text-xl mt-2 mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CJMSection;
