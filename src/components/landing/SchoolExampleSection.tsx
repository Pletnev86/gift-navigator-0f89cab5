import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import schoolMockup from "@/assets/school-mockup.jpg";
import logoMybook from "@/assets/logos/mybook.png";
import logoNetologia from "@/assets/logos/netologia.png";
import logoLenovo from "@/assets/logos/lenovo.png";
import logoSkyeng from "@/assets/logos/skyeng.png";
import logoAikraft from "@/assets/logos/aikraft.png";
import logoChitaiGorod from "@/assets/logos/chitai-gorod.png";
import logoBukvoed from "@/assets/logos/bukvoed.png";
import logoMoskva from "@/assets/logos/moskva-kniga.png";

const logos = [
  { src: logoMybook, alt: "MyBook", top: "3%", right: "12%", floatDelay: 0.2 },
  { src: logoNetologia, alt: "Нетология", top: "12%", right: "-2%", floatDelay: 0.9 },
  { src: logoLenovo, alt: "Lenovo", top: "5%", right: "-8%", floatDelay: 0.5 },
  { src: logoSkyeng, alt: "Skyeng", top: "28%", right: "0%", floatDelay: 1.2 },
  { src: logoAikraft, alt: "Айкрафт", top: "42%", right: "5%", floatDelay: 0.7 },
  { src: logoChitaiGorod, alt: "Читай-город", top: "55%", right: "-3%", floatDelay: 1.5 },
  { src: logoBukvoed, alt: "Буквоед", top: "68%", right: "8%", floatDelay: 0.3 },
  { src: logoMoskva, alt: "Москва", top: "80%", right: "0%", floatDelay: 1.0 },
];

const SchoolExampleSection = () => {
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
            День знаний
          </h2>
        </motion.div>

        <div className="relative max-w-4xl">
          <motion.img
            src={schoolMockup}
            alt="Пример платформы — День знаний"
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
className="absolute h-[3.74rem] md:h-[4.68rem] w-auto object-contain z-20 hidden lg:block cursor-pointer transition-transform duration-300 hover:translate-x-4 hover:scale-110"
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

export default SchoolExampleSection;
