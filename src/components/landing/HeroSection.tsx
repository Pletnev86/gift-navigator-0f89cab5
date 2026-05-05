import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, X } from "lucide-react";
import { useState } from "react";
import RequestFormDialog from "./RequestFormDialog";

import ozonLogo from "@/assets/logos/ozon.png";
import wbLogo from "@/assets/logos/wildberries.png";
import letoileLogo from "@/assets/logos/letoile-hero.png";
import zolotoeYablokoLogo from "@/assets/logos/zolotoe-yabloko.png";
import yvesRocherLogo from "@/assets/logos/yves-rocher.png";
import gulliverLogo from "@/assets/logos/gulliver.png";

const floatAnimation = {
  y: [0, -16, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const brandLogos = [
  { src: ozonLogo, alt: "Ozon", right: -30, top: 30 },
  { src: wbLogo, alt: "Wildberries", right: -50, top: 120 },
  { src: letoileLogo, alt: "Л'Этуаль", right: -20, top: 210 },
  { src: zolotoeYablokoLogo, alt: "Золотое Яблоко", right: -60, top: 300 },
  { src: yvesRocherLogo, alt: "Yves Rocher", right: -10, top: 380 },
  { src: gulliverLogo, alt: "Gulliver Market", right: -40, top: 450 },
];

const HeroSection = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
    <section className="pt-14 pb-7 md:pt-20 md:pb-10 lg:pt-24 lg:pb-12 px-4 md:px-8 min-h-screen flex items-center relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-[hsl(var(--lime)/0.08)] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] rounded-full bg-[hsl(var(--lime)/0.05)] blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="badge-tag inline-block">Мультикарта За!Подарком</span>
              <span className="text-muted-foreground font-heading font-semibold text-sm">Дарить — это легко!</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-4">
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 bg-clip-text text-transparent">400+ брендов</span>
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-4 text-foreground">
              Одна карта
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-4">
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">100% попадание</span>
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-8 text-foreground">
              0 рисков
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
              Мультикарта — корпоративный инструмент мотивации без логистического ада
              и скрытых комиссий. Доставим эмоции тысячам сотрудников за 1&nbsp;минуту.
            </p>
            <div className="flex items-center gap-6">
              <motion.button
                className="cta-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFormOpen(true)}
              >
                Оставить заявку
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              {/* QR with arrow */}
              <div className="hidden md:flex items-center gap-3">
                <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="text-muted-foreground -mr-1">
                  <path d="M2 12h32m0 0l-8-8m8 8l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="flex flex-col items-center">
                  <img src="/qr-code1.gif" alt="QR-код" className="w-[104px] h-[104px] rounded-lg" />
                  <p className="text-[11px] text-muted-foreground font-heading mt-1">Протестируй</p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-muted-foreground text-sm font-heading">
              За!Подарком | zapodarkom.ru
            </p>
          </motion.div>

          {/* Right: Floating phone */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div className="relative" animate={floatAnimation}>
              {/* Phone shadow on "ground" */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-6 rounded-full bg-foreground/10 blur-xl" />

              {/* Phone body */}
              <div className="w-72 md:w-80 h-[500px] md:h-[540px] rounded-[2.5rem] bg-gradient-to-b from-[hsl(0,0%,12%)] to-[hsl(0,0%,8%)] flex items-center justify-center overflow-hidden relative shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] border-[5px] border-[hsl(0,0%,20%)]">
                {/* Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-[hsl(0,0%,4%)] rounded-full z-20" />
                
                {/* Screen glow */}
                <div className="absolute inset-[5px] rounded-[2rem] bg-gradient-to-br from-[hsl(220,60%,15%)] via-[hsl(260,40%,12%)] to-[hsl(220,50%,10%)]" />

                <div className="relative z-10 flex flex-col items-center gap-5 px-5 w-full">
                  {/* Gift card */}
                  <motion.div
                    className="w-full max-w-[256px] h-40 rounded-2xl shadow-2xl p-5 flex flex-col justify-between text-white relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, hsl(220, 80%, 55%), hsl(260, 70%, 50%))" }}
                    whileHover={{ rotate: 0 }}
                    initial={{ rotate: -3 }}
                  >
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-60" />
                    <div className="relative z-10">
                      <p className="font-heading font-black text-[10px] tracking-[0.2em] opacity-70">МУЛЬТИКАРТА</p>
                      <p className="font-heading font-black text-3xl mt-1">400+</p>
                      <p className="font-heading font-bold text-xs opacity-60">БРЕНДОВ</p>
                    </div>
                    <div className="flex justify-between items-end relative z-10">
                      <p className="font-heading font-bold text-xs opacity-50">За!Подарком</p>
                      <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-white/20" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Holiday chips inside phone */}
                  <div className="flex flex-wrap justify-center gap-2 px-2">
                    {["🎄 Новый год", "🌷 8 марта", "💪 23 февраля", "🎂 День рождения"].map((h) => (
                      <span
                        key={h}
                        className="bg-white/8 backdrop-blur-sm text-white/70 px-3 py-1.5 rounded-full text-[11px] font-heading font-semibold border border-white/10"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  <p className="text-white/30 text-[11px] font-heading tracking-wide">Подарок под каждый праздник</p>
                </div>
              </div>

              {/* Play button overlay on phone */}
              <motion.button
                onClick={() => setVideoOpen(true)}
                className="absolute inset-0 z-30 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl" style={{ background: "hsl(var(--lime))" }}>
                  <Play className="w-8 h-8 text-foreground fill-foreground ml-0.5" />
                </div>
              </motion.button>
            </motion.div>

            {/* Floating brand logos around phone */}
            {brandLogos.map((brand, i) => (
              <motion.div
                key={brand.alt}
                className="absolute bg-background/90 backdrop-blur-sm shadow-lg p-2 rounded-2xl border border-border"
                style={{
                  right: `${brand.right}px`,
                  top: `${brand.top}px`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -8 + (i % 3) * 4, 0],
                }}
                transition={{
                  opacity: { delay: 0.8 + i * 0.12 },
                  scale: { delay: 0.8 + i * 0.12, type: "spring" },
                  y: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
                }}
              >
                <img src={brand.src} alt={brand.alt} className="w-[74px] h-[46px] object-contain" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>

    {/* Video Modal */}
    <AnimatePresence>
      {videoOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setVideoOpen(false)}
        >
          <motion.div
            className="relative w-[90vw] max-w-4xl aspect-video"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <iframe
              src="https://vk.com/video_ext.php?oid=-227352514&id=456239020&autoplay=1&muted=0"
              className="w-full h-full rounded-2xl"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    <RequestFormDialog
      open={formOpen}
      onOpenChange={setFormOpen}
      sourceId="hero-cta"
      section="hero"
      buttonLabel="Оставить заявку"
      formType="purchase_request"
    />
    </>
  );
};

export default HeroSection;
