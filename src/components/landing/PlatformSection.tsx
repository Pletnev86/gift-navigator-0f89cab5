import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, ArrowLeftRight, Wallet, Layers, ArrowRightLeft, Mail } from "lucide-react";
import platformCatalog from "@/assets/platform-catalog.jpg";

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
            Преимущества использования<br /><span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 bg-clip-text text-transparent">платформы За!Подарком</span>
          </h2>
        </motion.div>

        {/* Laptop mockup with platform screenshot */}
        <motion.div
          className="mb-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="relative w-full max-w-sm">
            {/* Laptop body */}
            <div className="relative rounded-t-2xl border-[12px] border-[hsl(0,0%,15%)] bg-[hsl(0,0%,15%)] shadow-2xl">
              {/* Camera notch */}
              <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[hsl(0,0%,25%)] z-10" />
              {/* Screen */}
              <div className="relative w-full overflow-hidden rounded-sm bg-white">
                <img
                  src={platformCatalog}
                  alt="Каталог электронных сертификатов платформы За!Подарком"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            {/* Laptop base */}
            <div className="relative mx-auto h-4 bg-gradient-to-b from-[hsl(0,0%,20%)] to-[hsl(0,0%,28%)] rounded-b-lg" style={{ width: "110%" , marginLeft: "-5%" }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-[hsl(0,0%,35%)] rounded-b-lg" />
            </div>
          </div>
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
