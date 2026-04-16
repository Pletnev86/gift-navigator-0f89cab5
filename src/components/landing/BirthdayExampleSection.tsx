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
  { src: logoZolotoe, alt: "Золотое Яблоко", top: "5%", right: "15%", floatDelay: 0 },
  { src: logoSunlight, alt: "Sunlight", top: "18%", right: "10%", floatDelay: 0.5 },
  { src: logoPandora, alt: "Pandora", top: "35%", right: "17%", floatDelay: 1.2 },
  { src: logoS7, alt: "S7 Airlines", top: "42%", right: "3%", floatDelay: 0.8 },
  { src: logoQuest, alt: "Quest Quest", top: "50%", right: "7%", floatDelay: 1.5 },
  { src: logoYves, alt: "Yves Rocher", top: "60%", right: "15%", floatDelay: 0.3 },
  { src: logoLetoile, alt: "Л'Этуаль", top: "72%", right: "-31%", floatDelay: 1.0 },
  { src: logoCoral, alt: "Coral Travel", top: "82%", right: "17%", floatDelay: 1.8 },
];

const BirthdayExampleSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-spacing relative" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="badge-tag mb-6 inline-block">ПРИМЕР</span>
          <h2 className="text-3xl md:text-5xl font-black leading-tight mb-10 text-foreground">
            Поздравления сотрудников с<br />Днем рождения
          </h2>
        </motion.div>

        {/* Mockup + floating logos */}
        <div className="relative max-w-4xl">
          <motion.img
            src={birthdayMockup}
            alt="Пример платформы — поздравление с Днём рождения"
            className="w-full max-w-2xl rounded-2xl relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          {/* Scattered floating logos around right side */}
          {logos.map((logo, i) => (
            <motion.img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="absolute h-[3.74rem] md:h-[4.68rem] w-auto object-contain z-20 hidden lg:block cursor-pointer"
              style={{ top: logo.top, right: logo.right }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? {
                opacity: 1,
                scale: 1,
                y: [0, -8, 0],
              } : {}}
              whileHover={{ x: 20, scale: 1.15 }}
              transition={{
                opacity: { duration: 0.4, delay: 0.5 + i * 0.1 },
                scale: { duration: 0.4, delay: 0.5 + i * 0.1 },
                y: {
                  duration: 3 + logo.floatDelay,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: logo.floatDelay,
                },
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BirthdayExampleSection;
