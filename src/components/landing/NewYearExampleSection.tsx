import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import newyearMockup from "@/assets/newyear-mockup.jpg";
import logoDrKoffer from "@/assets/logos/dr-koffer.png";
import logoLetoile from "@/assets/logos/letoile2.png";
import logoSunlight from "@/assets/logos/sunlight2.png";
import logoRendezvous from "@/assets/logos/rendezvous.png";
import logoZolotoe from "@/assets/logos/zolotoe2.png";
import logoYandex from "@/assets/logos/yandex-afisha.png";
import logoCoral from "@/assets/logos/coral2.png";

const logos = [
  { src: logoDrKoffer, alt: "Dr.Koffer", top: "2%", right: "8%", floatDelay: 0 },
  { src: logoLetoile, alt: "Л'Этуаль", top: "5%", right: "-5%", floatDelay: 0.7 },
  { src: logoSunlight, alt: "Sunlight", top: "22%", right: "2%", floatDelay: 1.3 },
  { src: logoRendezvous, alt: "Rendez-Vous", top: "38%", right: "-3%", floatDelay: 0.4 },
  { src: logoZolotoe, alt: "Золотое Яблоко", top: "52%", right: "5%", floatDelay: 1.0 },
  { src: logoYandex, alt: "Яндекс Афиша", top: "65%", right: "-2%", floatDelay: 1.6 },
  { src: logoCoral, alt: "Coral Travel", top: "78%", right: "8%", floatDelay: 0.3 },
];

const NewYearExampleSection = () => {
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
            Новогодние подарки
          </h2>
        </motion.div>

        <div className="relative max-w-4xl">
          <motion.img
            src={newyearMockup}
            alt="Пример платформы — Новогодние подарки"
            className="w-full max-w-2xl rounded-2xl relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          {logos.map((logo, i) => (
            <motion.img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="absolute h-[2.6rem] md:h-[3.25rem] w-auto object-contain z-20 hidden lg:block"
              style={{ top: logo.top, right: logo.right }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? {
                opacity: 1,
                scale: 1,
                y: [0, -8, 0],
              } : {}}
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

export default NewYearExampleSection;
