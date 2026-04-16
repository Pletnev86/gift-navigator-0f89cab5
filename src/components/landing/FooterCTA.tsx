import { motion, useInView } from "framer-motion";
import { useRef, useCallback, useState } from "react";
import { ArrowRight } from "lucide-react";

import qrFooter from "@/assets/qr-footer.png";
import girlCard from "@/assets/girl-card.jpg";

const FooterCTA = () => {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [videoFailed, setVideoFailed] = useState(false);

  const handleVideoClick = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play();
    }
  }, []);

  return (
    <section className="section-spacing relative" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-10 text-foreground italic">
              Дарить подарки легко!
            </h2>

            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-foreground flex-shrink-0 mt-2" />
                <span className="text-foreground text-lg">Оставьте заявку сегодня</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-foreground flex-shrink-0 mt-2" />
                <span className="text-foreground text-lg">Мы соберём витрину под ваш запрос</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-foreground flex-shrink-0 mt-2" />
                <span className="text-foreground text-lg">Подготовим прозрачный расчёт проекта за 30 минут</span>
              </li>
            </ul>

            <div className="flex items-center gap-6 flex-wrap">
              <motion.button
                className="cta-btn text-xl px-12 py-6"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Оставить заявку
                <ArrowRight className="w-6 h-6" />
              </motion.button>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <img src={qrFooter} alt="QR-код" className="w-32 h-32 rounded-xl" />
                <p className="text-xs text-muted-foreground font-heading text-center mt-1">Отсканируй QR</p>
              </motion.div>
            </div>

            <p className="mt-8 text-muted-foreground font-heading">
              За!Подарком | zapodarkom.ru
            </p>
          </motion.div>

          {/* Right: Girl peeking from behind QR */}
          <motion.div
            className="flex justify-center items-end relative"
            initial={{ opacity: 0, x: 80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <img
              src={girlCard}
              alt="Девушка с подарочной картой"
              className="w-80 md:w-96 object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>

        <div className="text-center mt-20 text-muted-foreground text-sm font-heading">
          © {new Date().getFullYear()} За!Подарком. Все права защищены.
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;
