import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Smartphone, Gift } from "lucide-react";

const floatingBrands = [
  { name: "Ozon", color: "from-blue-500 to-blue-600", x: -40, y: -60, delay: 0 },
  { name: "WB", color: "from-purple-500 to-purple-600", x: 60, y: -30, delay: 0.5 },
  { name: "Apple", color: "from-gray-400 to-gray-500", x: -20, y: 80, delay: 1 },
  { name: "Л'Этуаль", color: "from-pink-400 to-pink-500", x: 70, y: 60, delay: 1.5 },
];

const HeroSection = () => {
  return (
    <section className="section-spacing min-h-screen flex items-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-[120px]" style={{ background: "hsl(210 100% 56%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full opacity-15 blur-[100px]" style={{ background: "hsl(82 85% 55%)" }} />

      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="badge-tag mb-6 inline-block">Мультикарта 2.0</span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-8">
              100% попадание.{" "}
              <span className="gradient-text">Один подарок, 400+ брендов,</span>{" "}
              0&nbsp;рисков.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
              Мультикарта — корпоративный инструмент мотивации без логистического ада
              и скрытых комиссий. Доставим эмоции тысячам сотрудников за 1&nbsp;минуту.
            </p>
            <motion.button
              className="btn-glow text-primary-foreground flex items-center gap-3 animate-pulse-glow"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Получить демо-витрину
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Right: Phone mockup */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Phone frame */}
            <div className="relative w-72 h-[560px] rounded-[3rem] glass-panel-strong glow-blue p-3 animate-float">
              <div className="w-full h-full rounded-[2.5rem] bg-gradient-to-b from-secondary to-background flex flex-col items-center justify-center overflow-hidden">
                {/* Phone UI */}
                <div className="absolute top-6 w-24 h-6 rounded-full bg-background" />
                <div className="flex flex-col items-center gap-4 p-6">
                  <Gift className="w-16 h-16 text-neon-green" />
                  <p className="font-heading font-bold text-xl text-center">Выберите бренд</p>
                  <div className="grid grid-cols-2 gap-3 w-full mt-2">
                    {["Ozon", "WB", "Л'Этуаль", "Apple"].map((brand) => (
                      <div key={brand} className="glass-panel-strong rounded-xl p-3 text-center text-sm font-heading font-semibold">
                        {brand}
                      </div>
                    ))}
                  </div>
                  <div className="w-full mt-4 rounded-xl p-3 text-center font-heading font-bold text-accent-foreground" style={{ background: "hsl(82 85% 55%)" }}>
                    Активировать
                  </div>
                </div>
              </div>
            </div>

            {/* Floating brand pills */}
            {floatingBrands.map((brand, i) => (
              <motion.div
                key={brand.name}
                className="absolute glass-panel-strong px-4 py-2 rounded-full font-heading font-semibold text-sm"
                style={{ left: `calc(50% + ${brand.x}px)`, top: `calc(50% + ${brand.y}px)` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + brand.delay, type: "spring" }}
              >
                {brand.name}
              </motion.div>
            ))}

            {/* Floating icons */}
            <motion.div
              className="absolute -left-8 top-20"
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <div className="glass-panel-strong p-3 rounded-2xl glow-green">
                <ShoppingBag className="w-6 h-6 text-neon-green" />
              </div>
            </motion.div>
            <motion.div
              className="absolute -right-8 bottom-32"
              animate={{ y: [5, -5, 5] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            >
              <div className="glass-panel-strong p-3 rounded-2xl glow-blue">
                <Smartphone className="w-6 h-6 text-neon-blue" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
