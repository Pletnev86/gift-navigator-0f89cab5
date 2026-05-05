import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";

import { PROMO_CONFIG } from "@/config/promo";
import { trackPromoEvent } from "@/lib/analytics";
import { useUtm } from "@/hooks/use-utm";
import { useFormContext } from "@/context/FormContext";

const STORAGE_KEY_REGULAR    = "promo_seen_";
const STORAGE_KEY_EXHIBITION = "exhibition_offer_seen";

/** Возвращает true, если utm_campaign содержит "exhibition" */
function isExhibitionVisitor(): boolean {
  try {
    const p = new URLSearchParams(window.location.search);
    return (p.get("utm_campaign") ?? "").toLowerCase().includes("exhibition");
  } catch {
    return false;
  }
}

/**
 * Возвращает true, если в URL есть ?popup=force.
 * Одновременно удаляет этот параметр из адресной строки (UTM-метки сохраняются),
 * чтобы при обновлении страницы принудительный показ не срабатывал повторно.
 */
function consumeForceShow(): boolean {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("popup") !== "force") return false;

    params.delete("popup");
    const newSearch = params.toString();
    window.history.replaceState(
      {},
      "",
      window.location.pathname + (newSearch ? `?${newSearch}` : "") + window.location.hash
    );
    return true;
  } catch {
    return false;
  }
}

const PromoPopup = () => {
  const cfg = PROMO_CONFIG;
  const utm = useUtm();
  const { openForm } = useFormContext();
  const [open, setOpen] = useState(false);
  const shownAt = useRef<number>(0);
  const interactedRef = useRef(false);
  // Захватываем popup=force ДО первого рендера — consumeForceShow удаляет параметр из URL
  const forceShow = useRef(consumeForceShow());

  // Запуск таймера показа (deps=[] — запускается ровно один раз при монтировании)
  useEffect(() => {
    if (!cfg.enabled) return;
    if (typeof window === "undefined") return;

    const exhibition = isExhibitionVisitor();
    const key   = exhibition ? STORAGE_KEY_EXHIBITION : STORAGE_KEY_REGULAR + cfg.id;
    const delay = exhibition ? cfg.exhibitionDelayMs  : cfg.delayMs;

    if (!forceShow.current) {
      // Обычный режим: пропускаем если пользователь уже видел
      try {
        if (localStorage.getItem(key)) return;
      } catch {
        // localStorage недоступен (приватный режим) — показываем один раз за сессию
      }
    }

    // forceShow = 0ms, обычный = delay из конфига
    const t = setTimeout(() => {
      setOpen(true);
      shownAt.current = Date.now();
      // Всегда ставим флаг — после принудительного показа автотаймер тоже не сработает
      try { localStorage.setItem(key, String(Date.now())); } catch { /* noop */ }
      trackPromoEvent({ event: "promo_shown", promo_id: cfg.id, utm });
    }, forceShow.current ? 0 : delay);

    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    if (!interactedRef.current) {
      trackPromoEvent({
        event: "promo_closed",
        promo_id: cfg.id,
        visible_ms: Date.now() - shownAt.current,
        utm,
      });
      interactedRef.current = true;
    }
    setOpen(false);
  };

  const handleCta = () => {
    trackPromoEvent({
      event: "promo_cta_click",
      promo_id: cfg.id,
      visible_ms: Date.now() - shownAt.current,
      utm,
    });
    interactedRef.current = true;
    setOpen(false);

    // Скролл к основной форме на странице
    const formSection = document.getElementById("footer-cta-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }

    // Открыть глобальную форму заявки
    openForm("purchase_request");
  };

  if (!cfg.enabled) return null;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="promo-title"
          >
            <motion.div
              className="relative w-full max-w-lg rounded-3xl bg-background border border-border shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* декоративная градиентная шапка */}
              <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500" />

              <button
                type="button"
                onClick={handleClose}
                aria-label="Закрыть"
                className="absolute right-4 top-6 rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 md:p-10">
                {cfg.content.badge && (
                  <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider bg-gradient-to-r from-emerald-500/15 to-sky-500/15 text-emerald-600 border border-emerald-500/20">
                    {cfg.content.badge}
                  </span>
                )}

                <h2
                  id="promo-title"
                  className="text-2xl md:text-3xl font-black italic text-foreground leading-tight mb-3"
                  // Контент заголовка контролируется разработчиком в promo.ts (не от пользователя).
                  dangerouslySetInnerHTML={{ __html: cfg.content.title }}
                />

                <p className="text-muted-foreground text-base md:text-lg mb-6">
                  {cfg.content.subtitle}
                </p>

                {cfg.content.bullets && cfg.content.bullets.length > 0 && (
                  <ul className="space-y-2.5 mb-7">
                    {cfg.content.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-foreground">
                        <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center">
                          <Check className="w-3 h-3 text-emerald-600" />
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <motion.button
                  type="button"
                  className="cta-btn w-full justify-center text-base md:text-lg py-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCta}
                >
                  {cfg.content.ctaLabel}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                {cfg.content.footnote && (
                  <p className="mt-4 text-center text-xs text-muted-foreground font-heading">
                    {cfg.content.footnote}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
};

export default PromoPopup;
