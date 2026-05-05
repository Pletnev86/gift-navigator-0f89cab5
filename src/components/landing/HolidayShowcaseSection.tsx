import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ─── Данные праздников (локальная копия из multicard-partner-landing) ────────

interface HolidayConfig {
  key: string;
  label: string;
  emoji: string;
  from: string;
  via: string;
  to: string;
  accent: string;
  heroTagline: string;
}

const HOLIDAYS: HolidayConfig[] = [
  {
    key: "newyear",
    label: "Новый Год",
    emoji: "🎄",
    from: "#1e3a5f",
    via: "#2d1b69",
    to: "#0f172a",
    accent: "#c9a84c",
    heroTagline: "Главный праздник года — подарок который точно понравится",
  },
  {
    key: "valentine",
    label: "День Валентина",
    emoji: "💝",
    from: "#be123c",
    via: "#e11d48",
    to: "#9f1239",
    accent: "#fda4af",
    heroTagline: "14 февраля — подарок от всего сердца",
  },
  {
    key: "march8",
    label: "8 марта",
    emoji: "🌸",
    from: "#ec4899",
    via: "#f43f5e",
    to: "#db2777",
    accent: "#f9a8d4",
    heroTagline: "Международный женский день — забота в каждом подарке",
  },
  {
    key: "feb23",
    label: "23 февраля",
    emoji: "🎖️",
    from: "#1e40af",
    via: "#1e3a5f",
    to: "#334155",
    accent: "#60a5fa",
    heroTagline: "День защитника Отечества — сильный подарок для сильных людей",
  },
  {
    key: "birthday",
    label: "День рождения",
    emoji: "🎂",
    from: "#7c3aed",
    via: "#9333ea",
    to: "#6d28d9",
    accent: "#c084fc",
    heroTagline: "Персональное поздравление — подарок который выбирают сами",
  },
  {
    key: "oilday",
    label: "День нефтяника",
    emoji: "⛽",
    from: "#92400e",
    via: "#b45309",
    to: "#78350f",
    accent: "#fbbf24",
    heroTagline: "6 сентября — «Энергия ваших достижений»",
  },
  {
    key: "builderday",
    label: "День строителя",
    emoji: "🏗️",
    from: "#9a3412",
    via: "#c2410c",
    to: "#7c2d12",
    accent: "#fb923c",
    heroTagline: "9 августа — «Фундамент вашего будущего»",
  },
  {
    key: "medicday",
    label: "День медработника",
    emoji: "🏥",
    from: "#0f766e",
    via: "#0d9488",
    to: "#134e4a",
    accent: "#2dd4bf",
    heroTagline: "21 июня — «Героям в белых халатах»",
  },
  {
    key: "transport",
    label: "Транспорт и логистика",
    emoji: "🚛",
    from: "#1e293b",
    via: "#334155",
    to: "#0f172a",
    accent: "#94a3b8",
    heroTagline: "25 октября — «Верный курс на успех»",
  },
  {
    key: "default",
    label: "Универсальный",
    emoji: "🎁",
    from: "#10b981",
    via: "#14b8a6",
    to: "#0ea5e9",
    accent: "#10b981",
    heroTagline: "400+ брендов — подарок который выбирает получатель",
  },
];

// ─── Card Mockup ─────────────────────────────────────────────────────────────

function CardMockup({ cfg }: { cfg: HolidayConfig }) {
  return (
    <div
      className="relative w-full max-w-[340px] aspect-[1.586/1] rounded-2xl shadow-2xl overflow-hidden select-none"
      style={{ background: `linear-gradient(135deg, ${cfg.from}, ${cfg.via}, ${cfg.to})` }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-10 text-white text-[120px]">
        {cfg.emoji}
      </div>
      <div className="absolute top-5 left-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-black">
            М
          </div>
          <span className="text-white font-heading font-black text-sm tracking-wide opacity-90">Мультикарта</span>
        </div>
      </div>
      <div className="absolute top-5 right-5">
        <span className="text-white/70 text-xs font-heading font-bold tracking-widest uppercase">{cfg.label}</span>
      </div>
      <div className="absolute bottom-10 left-5 right-5">
        <p className="text-white/40 text-[10px] font-heading tracking-widest mb-1">НОМЕР КАРТЫ</p>
        <p className="text-white font-heading font-bold text-base tracking-[0.2em]">•••• •••• •••• 7742</p>
      </div>
      <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end">
        <p className="text-white/50 text-[9px] font-heading">400+ брендов · Kids-safe</p>
        <p className="text-white/50 text-[9px] font-heading">zapodarkom.ru</p>
      </div>
    </div>
  );
}

// ─── Postcard Mockup ──────────────────────────────────────────────────────────

function PostcardMockup({ cfg }: { cfg: HolidayConfig }) {
  const steps = [
    { n: "1", text: "Зайдите на сайт zapodarkom.ru и введите номер карты" },
    { n: "2", text: "Выберите желаемый магазин из каталога сертификатов" },
    { n: "3", text: "Подарочный сертификат придёт на Email за 1 минуту" },
    { n: "4", text: "Используйте подарочный сертификат выбранного магазина" },
  ];

  return (
    <div
      className="relative w-full max-w-[440px] rounded-2xl shadow-2xl overflow-hidden p-6 select-none"
      style={{ background: `linear-gradient(135deg, ${cfg.from}ee, ${cfg.via}cc, ${cfg.to}ee)` }}
    >
      <div className="absolute top-2 right-8 text-white/20 text-4xl">{cfg.emoji}</div>
      <div className="absolute bottom-2 left-6 text-white/10 text-5xl">{cfg.emoji}</div>
      <h3
        className="font-heading font-black text-white text-lg mb-5 relative z-10"
        style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
      >
        Как воспользоваться картой:
      </h3>
      <div className="grid grid-cols-2 gap-4 relative z-10 mb-5">
        {steps.map((s) => (
          <div key={s.n} className="flex gap-2.5">
            <span
              className="font-heading font-black text-2xl leading-none"
              style={{ color: cfg.accent, textShadow: "0 0 10px rgba(255,255,255,0.3)" }}
            >
              {s.n}.
            </span>
            <p className="text-white/85 text-xs leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>
      <div className="absolute right-5 bottom-5 bg-white rounded-xl p-3 w-20 h-20 flex flex-col items-center justify-center shadow-lg">
        <div className="grid grid-cols-3 gap-0.5 w-12 h-12 mb-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className={`rounded-sm ${[0, 1, 3, 5, 7, 8].includes(i) ? "bg-gray-800" : "bg-gray-200"}`} />
          ))}
        </div>
        <p className="text-[7px] text-gray-500 font-heading font-bold text-center leading-tight">Наведите камеру</p>
      </div>
      <div className="relative z-10 pr-24">
        <p className="text-white/60 text-[10px] font-heading font-bold tracking-widest uppercase mb-0.5">
          Отсканируйте код
        </p>
        <p className="font-heading font-bold text-xs" style={{ color: cfg.accent }}>
          zapodarkom.ru
        </p>
      </div>
    </div>
  );
}

// ─── Landing Mockup ───────────────────────────────────────────────────────────

function LandingMockup({ cfg }: { cfg: HolidayConfig }) {
  return (
    <div className="relative w-full max-w-[440px] select-none">
      <div className="relative">
        <div className="bg-gray-800 rounded-xl p-2 shadow-2xl">
          <div className="bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: "16/10" }}>
            <div
              className="w-full h-full flex flex-col"
              style={{ background: `linear-gradient(160deg, ${cfg.from}, ${cfg.via}88, ${cfg.to}44)` }}
            >
              <div className="flex items-center justify-between px-3 py-1.5 bg-black/20">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-white/20 flex items-center justify-center text-white text-[6px] font-black">
                    М
                  </div>
                  <span className="text-white/80 text-[7px] font-heading font-bold">Мультикарта</span>
                </div>
                <div className="text-white/50 text-[6px] font-heading">400+ брендов</div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
                <div className="text-3xl mb-1">{cfg.emoji}</div>
                <h3 className="text-white font-heading font-black text-[10px] leading-tight mb-1.5">{cfg.label}</h3>
                <p className="text-white/70 text-[7px] leading-snug max-w-[160px] mb-3">{cfg.heroTagline}</p>
                <div className="bg-white/15 backdrop-blur-sm rounded-lg p-2 w-full max-w-[140px]">
                  <p className="text-white/60 text-[6px] font-heading mb-1">Активация</p>
                  <div className="bg-white/20 rounded text-[6px] text-white/50 px-1.5 py-0.5 mb-1">Номер карты</div>
                  <div
                    className="rounded text-[6px] text-center py-0.5 font-heading font-bold text-white"
                    style={{ background: cfg.accent }}
                  >
                    ВОЙТИ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-700 rounded-b-xl h-2 mx-4 shadow-lg" />
      </div>
      <div
        className="absolute -bottom-4 -left-6 bg-gray-900 rounded-2xl p-1 shadow-xl border border-gray-700"
        style={{ width: "72px" }}
      >
        <div className="rounded-xl overflow-hidden" style={{ aspectRatio: "9/19" }}>
          <div
            className="w-full h-full flex flex-col items-center justify-center p-1.5 text-center"
            style={{ background: `linear-gradient(160deg, ${cfg.from}, ${cfg.to})` }}
          >
            <div className="text-lg mb-1">{cfg.emoji}</div>
            <p className="text-white font-heading font-black text-[5px] leading-tight mb-2">
              {cfg.label.toUpperCase()}
            </p>
            <div className="bg-white/20 rounded w-full px-1 py-0.5 mb-1">
              <p className="text-white/60 text-[4px]">Номер карты</p>
            </div>
            <div
              className="rounded w-full py-0.5 text-[4px] font-heading font-bold text-white"
              style={{ background: cfg.accent }}
            >
              ВОЙТИ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

const HolidayShowcaseSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [currentKey, setCurrentKey] = useState("oilday");
  const current = HOLIDAYS.find((h) => h.key === currentKey) ?? HOLIDAYS[0];

  return (
    <section className="section-spacing bg-background" ref={ref}>
      <div className="container mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-tag mb-6 inline-block">🎨 ПРИМЕРЫ ОФОРМЛЕНИЯ</span>
          <h2 className="text-3xl md:text-5xl font-black leading-tight text-foreground">
            Готовый продукт под{" "}
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 bg-clip-text text-transparent">
              каждый праздник
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Карта, открытка и посадочная страница меняют стиль под выбранный праздник
          </p>

          {/* Active theme badge */}
          <div
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-heading font-bold text-white shadow-lg"
            style={{ background: `linear-gradient(90deg, ${current.from}, ${current.to})` }}
          >
            {current.emoji} Тема: {current.label}
          </div>

          {/* Holiday switcher */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {HOLIDAYS.map((h) => (
              <button
                key={h.key}
                onClick={() => setCurrentKey(h.key)}
                className={`px-3 py-1.5 rounded-lg font-heading font-bold text-xs transition-all duration-200 border-2 ${
                  current.key === h.key
                    ? "border-foreground/30 text-foreground shadow scale-105"
                    : "border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
                style={current.key === h.key ? { background: "hsl(var(--lime))" } : {}}
              >
                {h.emoji} {h.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Three mockups grid */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-6 items-start">

          {/* Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`card-${current.key}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="text-center mb-2">
                <span className="text-xs font-heading font-bold uppercase tracking-widest text-muted-foreground">
                  Дизайн карты
                </span>
              </div>
              <CardMockup cfg={current} />
              <div className="text-center max-w-[280px]">
                <p className="text-sm font-heading font-bold text-foreground">{current.label}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Пластиковая карта с праздничным дизайном и номиналом от 500 ₽
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Postcard */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`postcard-${current.key}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="text-center mb-2">
                <span className="text-xs font-heading font-bold uppercase tracking-widest text-muted-foreground">
                  Открытка-инструкция
                </span>
              </div>
              <PostcardMockup cfg={current} />
              <div className="text-center max-w-[320px]">
                <p className="text-sm font-heading font-bold text-foreground">Как воспользоваться</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Открытка с 4 шагами активации и QR-кодом на zapodarkom.ru
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Landing */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`landing-${current.key}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="text-center mb-2">
                <span className="text-xs font-heading font-bold uppercase tracking-widest text-muted-foreground">
                  Посадочная страница
                </span>
              </div>
              <LandingMockup cfg={current} />
              <div className="text-center max-w-[320px] mt-6">
                <p className="text-sm font-heading font-bold text-foreground">Активация сертификата</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Брендированная страница для ввода номера карты и выбора подарка
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer note */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <p className="text-muted-foreground text-sm font-heading">
            ✨ Все материалы разрабатываются под ваш логотип и корпоративные цвета
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HolidayShowcaseSection;
