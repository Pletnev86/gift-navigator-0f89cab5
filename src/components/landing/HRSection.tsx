import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Package, Mail, ShieldCheck, Award } from "lucide-react";

const features = [
  { icon: Package, title: "Больше никаких гор коробок в офисе", desc: "Полностью цифровая доставка без физической логистики." },
  { icon: Mail, title: "Доставка за 1 мин по SMS/Email", desc: "Моментальная рассылка тысячам получателей одним кликом." },
  { icon: ShieldCheck, title: "Отключение алкоголя и табака", desc: "В 1 клик. Идеально для детских акций и kids-safe витрин." },
];

const HRSection = () => {
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
          <span className="badge-tag mb-6 inline-block">Для HR</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight max-w-4xl mx-auto">
            Снимите логистическое проклятие.{" "}
            <span className="gradient-text">15&nbsp;000 подарков по филиалам в 1&nbsp;клик.</span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="bento-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "hsl(82 85% 55% / 0.15)" }}>
                <f.icon className="w-6 h-6 text-neon-green" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-3">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Case study badge */}
        <motion.div
          className="mt-12 glass-panel-strong rounded-2xl p-8 glow-green relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-[80px]" style={{ background: "hsl(82 85% 55%)" }} />
          <div className="flex items-start gap-4 relative z-10">
            <Award className="w-8 h-8 text-neon-green flex-shrink-0 mt-1" />
            <div>
              <span className="badge-tag mb-3 inline-block text-[10px]">Кейс</span>
              <h3 className="font-heading font-bold text-xl mb-2">ПАО «Билайн»</h3>
              <p className="text-muted-foreground leading-relaxed">
                Менее чем за сутки вручили 15&nbsp;000 карт. Настроена kids-safe витрина. Логистика: <span className="font-bold text-neon-green">0₽</span>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HRSection;
