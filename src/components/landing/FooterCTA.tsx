import { motion, useInView } from "framer-motion";
import { useRef, useCallback, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

import qrFooter from "@/assets/qr-footer.png";
import girlCard from "@/assets/girl-card.jpg";
import catChest from "@/assets/cat-chest.png";
import RequestFormDialog from "./RequestFormDialog";

const FooterCTA = () => {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [videoFailed, setVideoFailed] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  // Start muted for autoplay, unmute on first user interaction
  useEffect(() => {
    const video = videoRef.current;
    if (video && inView) {
      video.muted = true;
      video.volume = 0.85;
      video.play().catch(() => {});

      const unmute = () => {
        video.muted = false;
        document.removeEventListener("click", unmute);
        document.removeEventListener("touchstart", unmute);
      };
      document.addEventListener("click", unmute, { once: true });
      document.addEventListener("touchstart", unmute, { once: true });

      return () => {
        document.removeEventListener("click", unmute);
        document.removeEventListener("touchstart", unmute);
      };
    }
  }, [inView]);

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
              Дарить подарки <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 bg-clip-text text-transparent">легко!</span>
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
                onClick={() => setFormOpen(true)}
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

          {/* Right: Girl video/image */}
          <motion.div
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0, x: 80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <div
              className="w-72 h-72 md:w-[22rem] md:h-[22rem] rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl cursor-pointer"
              onClick={handleVideoClick}
            >
              {videoFailed ? (
                <img
                  src={girlCard}
                  alt="Девушка с подарочной картой"
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  ref={videoRef}
                  src="/girl-animation.mp4"
                  muted
                  playsInline
                  onError={() => setVideoFailed(true)}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Cat with chest + CTA button */}
            <div className="flex items-center gap-4">
              <img
                src={catChest}
                alt="Кот с сундуком"
                loading="lazy"
                width={120}
                height={120}
                className="w-24 h-24 md:w-[120px] md:h-[120px] object-contain"
              />
              <motion.button
                className="inline-flex items-center gap-3 rounded-2xl px-10 py-5 font-heading font-bold text-lg tracking-wide transition-all duration-300 text-foreground"
                style={{ background: "linear-gradient(135deg, hsl(40, 85%, 55%), hsl(30, 90%, 50%))" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setFormOpen(true)}
              >
                Посмотреть сундук
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="text-center mt-20 text-muted-foreground text-sm font-heading">
          © {new Date().getFullYear()} За!Подарком. Все права защищены.
        </div>
      </div>
      <RequestFormDialog open={formOpen} onOpenChange={setFormOpen} />
    </section>
  );
};

export default FooterCTA;
