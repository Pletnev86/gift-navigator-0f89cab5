import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { TrendingUp, CircleCheckBig, ArrowRight } from "lucide-react";
import { useFormContext } from "@/context/FormContext";

// Статическая тема (в gift-navigator нет HolidayThemeContext)
const THEME = {
  from:   "#10b981",
  to:     "#0ea5e9",
  accent: "#10b981",
  label:  "Универсальный",
};

const SWEETS = [
  { id: "chocolate", emoji: "🍫", label: "Шоколад", desc: "Шоколад, трюфели, батончики" },
  { id: "candies",   emoji: "🍬", label: "Конфеты",  desc: "Конфетное ассорти" },
  { id: "jelly",     emoji: "🍭", label: "Мармелад", desc: "Мармелад, желе, жевачки" },
  { id: "mix",       emoji: "🎁", label: "Микс",     desc: "Сладкий подарочный микс" },
];

const SETS = [
  {
    id: "classic",
    label: "Классика",
    emoji: "🍫",
    name: "Сладкий набор + Карта",
    items: ["Шоколад, конфеты, сладости", "Мультикарта в кардхолдере"],
    desc: "Базовый формат: корпоративный сладкий набор дополняется физической картой с номиналом. Никаких изменений в логистике.",
    margin: "+15%",
  },
  {
    id: "postcard",
    label: "С открыткой",
    emoji: "💌",
    name: "Набор + Карта + Открытка",
    items: ["Шоколад, конфеты, сладости", "Мультикарта в кардхолдере", "Праздничная открытка-инструкция"],
    desc: "Открытка с 4 шагами активации и QR-кодом. Дизайн открытки и карты меняется под выбранный праздник.",
    margin: "+20%",
  },
  {
    id: "premium",
    label: "Премиум",
    emoji: "🎁",
    name: "Фирменная коробка + Карта + Открытка",
    items: ["Фирменная коробка с логотипом", "Мультикарта с праздничным дизайном", "Именная открытка с QR-кодом", "Кардхолдер с подписью"],
    desc: "Полный фирменный комплект с праздничным дизайном. Подходит для ключевых клиентов и крупных тендеров.",
    margin: "+30%",
  },
  {
    id: "digital",
    label: "Цифровой",
    emoji: "📲",
    name: "Цифровая карта + Email-открытка",
    items: ["Цифровой код на email за 1 минуту", "Брендированная посадочная страница", "Email-открытка с праздничным дизайном"],
    desc: "Мгновенная доставка на email. Подходит для удалённых сотрудников и больших географически распределённых команд.",
    margin: "+25%",
  },
];

const benefits = [
  "Увеличение суммы контракта без затрат на закупку, хранение и сборку",
  "Ребёнок получает конфеты + возможность выбрать подарок в 400+ брендах",
  "100% попадание в ожидания каждого получателя",
  "Физический пластик в фирменном кардхолдере — премиальный вид",
];

function SetMockup({ setId, sweetId }: { setId: string; sweetId: string }) {
  const sweet = SWEETS.find((s) => s.id === sweetId) ?? SWEETS[0];
  const showPostcard = setId === "postcard" || setId === "premium";
  const isDigital = setId === "digital";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={setId}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35 }}
        className="space-y-3"
      >
        {/* Sweet / digital row */}
        {!isDigital ? (
          <div className="bg-background rounded-2xl p-4 shadow-sm border border-border flex items-center gap-4">
            <span className="text-3xl">{setId === "premium" ? "📦" : sweet.emoji}</span>
            <div>
              <p className="font-heading font-bold text-sm text-foreground">
                {setId === "premium" ? "Фирменная коробка" : sweet.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {setId === "premium" ? "Шоколад, конфеты, сладости" : sweet.desc}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-background rounded-2xl p-4 shadow-sm border border-border flex items-center gap-4">
            <span className="text-3xl">📲</span>
            <div>
              <p className="font-heading font-bold text-sm text-foreground">Email-доставка</p>
              <p className="text-xs text-muted-foreground">Мгновенно на почту сотрудника</p>
            </div>
          </div>
        )}

        {/* Card mockup */}
        <div
          className="rounded-2xl p-4 shadow-md relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${THEME.from}, ${THEME.to})` }}
        >
          <div className="relative z-10 flex items-start justify-between mb-4">
            <div>
              <p className="text-white/60 text-[9px] font-heading font-bold uppercase tracking-widest">Мультикарта</p>
              <p className="text-white font-heading font-bold text-xs mt-0.5">{THEME.label}</p>
            </div>
            <div className="bg-white/20 rounded-lg px-2 py-1 text-white text-[9px] font-heading font-bold">
              {setId === "digital" ? "Цифровая" : "Физическая"}
            </div>
          </div>
          <div className="relative z-10 flex items-end justify-between">
            <p className="text-white/40 text-[10px] font-mono tracking-wider">•••• •••• •••• 7742</p>
            <p className="font-heading font-bold text-sm text-emerald-300">500–5 000 ₽</p>
          </div>
        </div>

        {/* Postcard mockup */}
        {showPostcard && (
          <div
            className="rounded-2xl p-4 border relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${THEME.from}22, ${THEME.to}11)`,
              borderColor: `${THEME.from}40`,
            }}
          >
            <p className="font-heading font-black text-xs text-foreground mb-2 relative z-10">
              Как воспользоваться картой:
            </p>
            <div className="grid grid-cols-2 gap-2 relative z-10">
              {["Зайти на zapodarkom.ru", "Выбрать магазин", "Получить сертификат на email", "Использовать подарок"].map(
                (step, n) => (
                  <div key={n} className="flex gap-1.5 items-start">
                    <span className="font-heading font-black text-sm leading-none text-emerald-500">{n + 1}.</span>
                    <p className="text-[10px] text-muted-foreground leading-snug">{step}</p>
                  </div>
                )
              )}
            </div>
            <p className="text-[9px] text-muted-foreground mt-2 font-heading relative z-10">
              zapodarkom.ru · QR-код на открытке
            </p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

const UpsellSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { openForm } = useFormContext();
  const [activeSet, setActiveSet] = useState("postcard");
  const [selectedSweet, setSelectedSweet] = useState("chocolate");
  const set = SETS.find((s) => s.id === activeSet) ?? SETS[1];

  return (
    <section
      id="upsell"
      className="section-spacing relative"
      ref={ref}
      style={{
        background: "linear-gradient(160deg, hsl(var(--background)) 0%, rgba(16,185,129,0.06) 50%, rgba(14,165,233,0.03) 100%)",
      }}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Visual column */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Set picker tabs */}
            <div className="flex flex-wrap gap-2 mb-3">
              {SETS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSet(s.id)}
                  style={activeSet === s.id ? { background: "hsl(var(--lime))" } : {}}
                  className={`px-4 py-2 rounded-xl text-sm font-heading font-bold transition-all duration-200 border-2 ${
                    activeSet === s.id
                      ? "text-foreground border-foreground/30 scale-105 shadow"
                      : "bg-background text-muted-foreground border-border hover:border-emerald-500 hover:text-emerald-600"
                  }`}
                >
                  {s.emoji} {s.label}
                </button>
              ))}
            </div>

            {/* Sweet sub-selector — only for Классика */}
            {activeSet === "classic" && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex flex-wrap gap-2 mb-4 pl-1"
              >
                <span className="text-[11px] text-muted-foreground font-heading font-bold self-center mr-1 uppercase tracking-wide">
                  Состав:
                </span>
                {SWEETS.map((sw) => (
                  <button
                    key={sw.id}
                    onClick={() => setSelectedSweet(sw.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-heading font-bold transition-all duration-200 border ${
                      selectedSweet === sw.id
                        ? "text-white border-transparent shadow-sm scale-105"
                        : "bg-background/70 text-muted-foreground border-border hover:border-muted-foreground"
                    }`}
                    style={selectedSweet === sw.id ? { background: THEME.accent } : {}}
                  >
                    {sw.emoji} {sw.label}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Set description card */}
            <div
              className="rounded-3xl p-6 mb-5 border"
              style={{
                background: `linear-gradient(135deg, ${THEME.from}12, ${THEME.to}08)`,
                borderColor: `${THEME.from}25`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-heading font-black text-base text-foreground">{set.name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{set.desc}</p>
                </div>
                <div
                  className="ml-4 shrink-0 rounded-xl px-3 py-2 text-center min-w-[64px]"
                  style={{ background: "hsl(var(--lime))" }}
                >
                  <p className="font-heading font-black text-lg text-foreground leading-none">{set.margin}</p>
                  <p className="text-[9px] text-foreground/60 font-heading font-bold leading-tight">к марже</p>
                </div>
              </div>

              <ul className="space-y-1.5 mb-5">
                {set.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: THEME.accent }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <SetMockup setId={activeSet} sweetId={selectedSweet} />
            </div>

            {/* Case badge */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
              <p className="text-[10px] text-emerald-600 uppercase tracking-widest mb-1 font-bold">Реальный кейс</p>
              <p className="font-heading font-bold text-foreground">ГК «Выбор»</p>
              <p className="text-sm text-muted-foreground mt-1">
                Успешная интеграция Мультикарт в тендерные сладкие наборы.
                Увеличение среднего чека контракта без расширения склада.
              </p>
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/12">
                <TrendingUp size={20} className="text-emerald-500" />
              </div>
              <span className="badge-tag !mb-0">СЛАДКИЙ НАБОР + КАРТА</span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight text-foreground">
              «Сладости +{" "}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 bg-clip-text text-transparent">
                Свобода выбора»
              </span>
            </h2>

            <p className="font-heading font-bold text-lg mt-2 text-emerald-500">
              Увеличение среднего чека
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-4">
              Повысьте ценность вашего базового набора, вложив в него физическую
              Мультикарту (номиналом от 500 до 5 000 ₽). Никаких затрат на
              закупку дополнительных физических игрушек.
            </p>

            <ul className="mt-8 space-y-4">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CircleCheckBig size={20} className="mt-0.5 shrink-0 text-emerald-500" />
                  <span className="text-muted-foreground">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="light-card text-center">
                <div className="text-4xl font-black font-heading text-emerald-500">+20%</div>
                <div className="text-sm text-muted-foreground font-heading mt-1">к маржинальности контракта</div>
              </div>
              <div className="light-card text-center">
                <div className="text-4xl font-black font-heading text-emerald-500">400+</div>
                <div className="text-sm text-muted-foreground font-heading mt-1">брендов для получателя</div>
              </div>
            </div>

            <motion.button
              className="cta-btn mt-8"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openForm("purchase_request")}
            >
              Обсудить интеграцию
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default UpsellSection;
