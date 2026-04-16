import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const industries = [
  {
    title: "День нефтяника",
    subtitle: "«Энергия ваших достижений»",
    date: "6 Сентября",
    desc: "Матовый металл и «золотое» тиснение, подчеркивающее статус лидеров рынка. Подпись на карте: «Энергия недр».",
  },
  {
    title: "День строителя",
    subtitle: "«Фундамент вашего будущего»",
    date: "09 Августа",
    desc: "Фактурная упаковка с элементами чертежей и структурным дизайном. Подпись на карте: «Архитектура успеха».",
  },
  {
    title: "День медицинского работника",
    subtitle: "«Героям в белых халатах»",
    date: "21 Июня",
    desc: "Чистый, минималистичный цифровой дизайн с акцентом на заботу и человечность. Подпись на карте: «Сердце под защитой».",
  },
  {
    title: "Транспорт и логистика",
    subtitle: "«Верный курс на успех»",
    date: "25 Октября",
    desc: "Износостойкий пластик для тех, кто всегда в движении, или цифровой формат с мгновенным доступом. Подпись на карте: «Свобода движения».",
  },
];

const CalendarSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-spacing relative" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="badge-tag mb-6 inline-block">КАЛЕНДАРЬ ОТРАСЛЕВЫХ РЕШЕНИЙ</span>
            <h2 className="text-3xl md:text-5xl font-black leading-tight mb-6 text-foreground">
              Сильные решения для сильных профи
            </h2>
            <h3 className="text-2xl md:text-3xl font-black text-foreground mb-8">
              Сюжет в каждом подарке
            </h3>
          </motion.div>

          {/* Right: Industry cards */}
          <div className="space-y-4">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.title}
                className="light-card"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.12 }}
              >
                <h4 className="font-heading font-bold text-base text-foreground mb-1">
                  {ind.title}: {ind.subtitle}
                </h4>
                <p className="text-xs text-muted-foreground mb-2">
                  <strong>Дата:</strong> {ind.date}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;
