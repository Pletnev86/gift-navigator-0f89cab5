import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="section-spacing min-h-screen flex items-center relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="badge-tag mb-6 inline-block">Мультикарта ЗА!Подарком</span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-4 text-foreground">
              400+ брендов
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-4 text-foreground">
              Одна карта
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-4 text-foreground">
              100% попадание
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-8 text-foreground">
              0 рисков
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
              Мультикарта — корпоративный инструмент мотивации без логистического ада
              и скрытых комиссий. Доставим эмоции тысячам сотрудников за 1&nbsp;минуту.
            </p>
            <motion.button
              className="cta-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Оставить заявку
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <p className="mt-6 text-muted-foreground text-sm font-heading">
              За!Подарком | zapodarkom.ru
            </p>
          </motion.div>

          {/* Right: Visual placeholder — card + brand cloud */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Phone with card */}
              <div className="w-80 h-[520px] rounded-[2.5rem] bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center overflow-hidden relative shadow-2xl border-[6px] border-gray-700">
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-900 rounded-b-2xl z-20" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                <div className="relative z-10 flex flex-col items-center gap-6 px-4">
                  {/* Card visual */}
                  <div className="w-64 h-40 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] shadow-2xl p-5 flex flex-col justify-between text-white transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div>
                      <p className="font-heading font-black text-xs tracking-widest opacity-80">МУЛЬТИКАРТА</p>
                      <p className="font-heading font-black text-2xl mt-1">400+ <span className="text-sm font-bold">БРЕНДОВ</span></p>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="font-heading font-bold text-sm opacity-70">За!Подарком</p>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm" />
                    </div>
                  </div>
                  {/* App UI hint */}
                  <div className="flex gap-2">
                    {["Ozon", "WB", "Lamoda"].map((b) => (
                      <span key={b} className="bg-white/10 backdrop-blur-sm text-white/80 px-3 py-1 rounded-full text-xs font-heading font-semibold">{b}</span>
                    ))}
                  </div>
                  <p className="text-white/50 text-xs font-heading">Выбирайте из 400+ брендов</p>
                </div>
              </div>

              {/* Floating brand pills */}
              {["Ozon", "WB", "Lamoda", "Л'Этуаль", "DNS", "М.Видео"].map((brand, i) => (
                <motion.div
                  key={brand}
                  className="absolute bg-background shadow-md px-3 py-1.5 rounded-full font-heading font-semibold text-xs text-foreground"
                  style={{
                    right: `${-20 + (i % 3) * 40}px`,
                    top: `${20 + i * 55}px`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.15, type: "spring" }}
                >
                  {brand}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
