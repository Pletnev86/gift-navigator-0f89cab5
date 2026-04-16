import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, ArrowLeftRight, Wallet, Layers, ArrowRightLeft, Mail } from "lucide-react";
import placeholderPlatform from "@/assets/placeholder-platform.jpg";

const features = [
  { icon: Monitor, title: "Персональная витрина в вашем стиле", desc: "Брендированный интерфейс, который идеально отображается как на компьютере, так и на смартфоне" },
  { icon: ArrowLeftRight, title: "Мульти-обмен", desc: "Распределяйте номинал между любыми сертификатами из каталога" },
  { icon: Wallet, title: "Умный баланс", desc: "Все подаренные сертификаты автоматически суммируются в Личном кабинете, формируя единый бюджет на покупки*" },
  { icon: Layers, title: "Свобода выбора и гибкость", desc: "Вы можете обменять всю сумму целиком или использовать баланс по частям, выбирая разные бренды одновременно" },
  { icon: ArrowRightLeft, title: "Честный обмен 1:1", desc: "Номинал Мультикарты полностью переходит в номинал выбранного бренда без скрытых комиссий и потерь*" },
  { icon: Mail, title: "Подарки всегда под рукой", desc: "Заказанные сертификаты мгновенно приходят на электронную почту и всегда доступны для скачивания в Личном кабинете" },
];

const PlatformSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-spacing relative" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight text-foreground">
            Преимущества использования<br />платформы ЗА!Подарком
          </h2>
        </motion.div>

        {/* Platform screenshot — замените на свой скриншот */}
        <motion.div
          className="mb-16 rounded-2xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <img
            src={placeholderPlatform}
            alt="Скриншот платформы ЗА!Подарком — замените на свой креатив"
            className="w-full h-auto object-cover"
            loading="lazy"
            width={800}
            height={600}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="light-card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="font-heading font-bold text-base mb-2 text-foreground">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-8">
          Обмен 1:1, номинал на номинал * — Определяются условиями контракта
        </p>
      </div>
    </section>
  );
};

export default PlatformSection;
