import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Package, Palette } from "lucide-react";
import hrCertificates from "@/assets/hr-certificates.jpg";

const features = [
  { icon: Mail, text: "Доставка электронного сертификата по Email" },
  { icon: Package, text: "Больше никаких гор коробок в офисе" },
  { icon: Palette, text: "Создавайте уникальные подборки брендов, идеально подходящие под повод: от профессиональных праздников до «Kids-safe» витрин для детей сотрудников." },
];

const HRSection = () => {
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
            <span className="badge-tag mb-6 inline-block">ДЛЯ HR</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-8 text-foreground">
              Электронная Мультикарта<br />
              15 000 подарков в 1 клик
            </h2>

            <ul className="space-y-4 mb-10">
              {features.map((f, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.15 }}
                >
                  <f.icon className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                  <span className="text-foreground leading-relaxed">{f.text}</span>
                </motion.li>
              ))}
            </ul>

            {/* Case */}
            <motion.div
              className="case-card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <span className="badge-tag text-[10px] mb-3 inline-block">КЕЙС</span>
              <h3 className="font-heading font-bold text-lg mb-2 text-foreground">
                Крупнейший федеральный телеком-оператор
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                15 000 Мультикарт для детей за сутки.<br />
                Индивидуальная Kids-safe витрина.<br />
                Логистика: <span className="font-bold text-foreground">0₽</span>.
              </p>
            </motion.div>
          </motion.div>

          {/* Right visual — замените на свой креатив */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-lg w-full max-w-md">
              <img
                src={hrCertificates}
                alt="Электронный сертификат и каталог подарков За!Подарком"
                className="w-full h-auto object-cover"
                loading="lazy"
                width={800}
                height={600}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HRSection;
