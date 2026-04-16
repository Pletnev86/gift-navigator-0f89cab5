import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ProductSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-spacing relative" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="badge-tag mb-6 inline-block">БРЕНДЫ</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-foreground">
              Ваша команда заслуживает выбора
            </h2>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-8 text-foreground">
              Мы даём 400+ вариантов
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Получатель Мультикарты сам решает, на что потратить номинал:
              от премиальной косметики до оплаты подписок.
              Забудьте о ситуации «подарили не то».
              Единое цифровое решение с покрытием по всей РФ.
            </p>
          </motion.div>

          {/* Brand cloud placeholder */}
          <motion.div
            className="flex flex-wrap gap-3 justify-center items-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {["Л'Этуаль", "Рив Гош", "Золотое Яблоко", "Спортмастер", "re:Store", "OZON", "М.Видео", "Wildberries", "Lamoda", "ВкусВилл", "Flowwow", "Hoff", "ivi"].map((brand) => (
              <div key={brand} className="bg-muted rounded-full px-4 py-2 font-heading font-semibold text-sm text-foreground">
                {brand}
              </div>
            ))}
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
          ].map((stat, i) => (
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
