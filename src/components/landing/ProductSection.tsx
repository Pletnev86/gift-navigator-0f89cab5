import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import placeholderBrands from "@/assets/placeholder-brands.jpg";
import qrCode from "@/assets/qr-code.png";

const ProductSection = () => {
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
            <span className="badge-tag mb-6 inline-block">БРЕНДЫ</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-foreground">
              Одна карта
            </h2>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-8 text-foreground">
              400+ брендов
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Получатель Мультикарты сам решает, на что потратить номинал:
              от премиальной косметики до оплаты подписок.
              Забудьте о ситуации «подарили не то».
              Единое цифровое решение с покрытием по всей РФ.
            </p>
          </motion.div>

          {/* Brand cards image — замените на свой креатив */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <img
              src={placeholderBrands}
              alt="Подарочные карты брендов — замените на свой креатив"
              className="w-full h-auto object-cover rounded-2xl"
              loading="lazy"
              width={800}
              height={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl" />
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {[
            { value: "400+", label: "брендов" },
            { value: "1 мин", label: "доставка" },
            { value: "0₽", label: "логистика" },
          ].map((stat) => (
            <div key={stat.label} className="pt-6 border-t border-border">
              <div className="stat-value mb-2">{stat.value}</div>
              <div className="text-muted-foreground font-heading text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductSection;
