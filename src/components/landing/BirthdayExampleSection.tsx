import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import birthdayMockup from "@/assets/birthday-mockup.jpg";
import logoZolotoe from "@/assets/logos/zolotoe-yabloko.png";
import logoSunlight from "@/assets/logos/sunlight.png";
import logoPandora from "@/assets/logos/pandora.png";
import logoS7 from "@/assets/logos/s7-airlines.png";
import logoQuest from "@/assets/logos/quest-quest.png";
import logoYves from "@/assets/logos/yves-rocher.png";
import logoLetoile from "@/assets/logos/letoile.png";
import logoCoral from "@/assets/logos/coral-travel.png";

const logos = [
  { src: logoZolotoe, alt: "Золотое Яблоко" },
  { src: logoSunlight, alt: "Sunlight" },
  { src: logoPandora, alt: "Pandora" },
  { src: logoS7, alt: "S7 Airlines" },
  { src: logoQuest, alt: "Quest Quest" },
  { src: logoYves, alt: "Yves Rocher" },
  { src: logoLetoile, alt: "Л'Этуаль" },
  { src: logoCoral, alt: "Coral Travel" },
];

const BirthdayExampleSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-spacing relative" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">
          {/* Left: badge + title + mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="badge-tag mb-6 inline-block">ПРИМЕР</span>
            <h2 className="text-3xl md:text-5xl font-black leading-tight mb-10 text-foreground">
              Поздравления сотрудников с<br />Днем рождения
            </h2>
            <motion.img
              src={birthdayMockup}
              alt="Пример платформы — поздравление с Днём рождения"
              className="w-full max-w-2xl rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </motion.div>

          {/* Right: partner logos */}
          <motion.div
            className="flex flex-col gap-6 items-end pt-4"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {logos.map((logo, i) => (
              <motion.img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className="h-8 md:h-10 w-auto object-contain"
                initial={{ opacity: 0, x: 10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BirthdayExampleSection;
