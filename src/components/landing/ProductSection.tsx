import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const ProductSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-spacing relative overflow-hidden" ref={ref}>
      {/* Giant background number */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[20rem] md:text-[30rem] font-heading font-black opacity-[0.03] leading-none">
          400+
        </span>
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="badge-tag mb-6 inline-block">Продукт</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-8">
            Ваша команда заслуживает выбора.{" "}
            <span className="gradient-text">Мы даём 400&nbsp;вариантов.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Забудьте о «подарили не то». Получатель сам решает, на что потратить номинал:
            от косметики до подписок. Единое цифровое решение по всей РФ.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {[
            { value: "400+", label: "брендов" },
            { value: "1 мин", label: "доставка" },
            { value: "0₽", label: "логистика" },
          ].map((stat) => (
            <div key={stat.label} className="glass-panel-strong rounded-2xl p-6 md:p-8">
              <div className="text-3xl md:text-5xl font-heading font-black gradient-text mb-2">{stat.value}</div>
              <div className="text-muted-foreground font-heading text-sm uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductSection;
