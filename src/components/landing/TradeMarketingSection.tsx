import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, FileText, Building, ArrowRight } from "lucide-react";

const legalItems = [
  { icon: Shield, label: "152-ФЗ", tag: "LEGAL SAFE" },
  { icon: FileText, label: "Договор услуг", tag: "LEGAL SAFE" },
  { icon: Building, label: "НДФЛ уплачен", tag: "LEGAL SAFE" },
];

const TradeMarketingSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-spacing relative" ref={ref}>
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full opacity-10 blur-[120px]" style={{ background: "hsl(210 100% 56%)" }} />

      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="badge-tag mb-6 inline-block">НДФЛ 0%</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Ваш легальный налоговый щит.{" "}
            <span className="gradient-text">Вы проводите промо — мы платим НДФЛ.</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Запускайте B2B и B2C акции без раздувания юридического штата. Мы выступаем
            налоговым агентом, собираем паспорта и платим 13% НДФЛ за победителей.
          </p>
        </motion.div>

        {/* Architecture diagram */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {["Пользователь", "Мультикарта", "ФНС"].map((step, i) => (
            <div key={step} className="relative flex flex-col items-center">
              <div className="glass-panel-strong rounded-2xl p-8 w-full text-center">
                <div className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: "hsl(210 100% 56% / 0.15)" }}>
                  {i === 0 && <Shield className="w-7 h-7 text-neon-blue" />}
                  {i === 1 && <FileText className="w-7 h-7 text-neon-blue" />}
                  {i === 2 && <Building className="w-7 h-7 text-neon-blue" />}
                </div>
                <p className="font-heading font-bold text-lg">{step}</p>
              </div>
              {i < 2 && (
                <div className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Legal badges */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {legalItems.map((item) => (
            <div key={item.label} className="bento-card flex items-center gap-4">
              <item.icon className="w-8 h-8 text-muted-foreground flex-shrink-0" />
              <div>
                <span className="badge-tag text-[10px] mb-1 inline-block">{item.tag}</span>
                <p className="font-heading font-bold">{item.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Case highlight */}
        <motion.div
          className="mt-8 glass-panel-strong rounded-2xl p-6 border-l-4"
          style={{ borderLeftColor: "hsl(210 100% 56%)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <p className="text-muted-foreground">
            <span className="font-heading font-bold text-foreground">Кейс «Макфа» и «Коровка из Кореновки».</span>{" "}
            Полная юридическая чистота.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TradeMarketingSection;
