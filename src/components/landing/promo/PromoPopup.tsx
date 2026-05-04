import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";

import { PROMO_CONFIG } from "@/config/promo";
import { trackPromoEvent } from "@/lib/analytics";
import { useUtm } from "@/hooks/use-utm";
import RequestFormDialog from "../RequestFormDialog";

const STORAGE_PREFIX = "promo_seen_";

const PromoPopup = () => {
  const cfg = PROMO_CONFIG;
  const utm = useUtm();
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const shownAt = useRef<number>(0);
  const interactedRef = useRef(false);

  // Запуск таймера показа
  useEffect(() => {
    if (!cfg.enabled) return;
    if (typeof window === "undefined") return;

    const key = STORAGE_PREFIX + cfg.id;
    try {
      if (localStorage.getItem(key)) return; // уже видел
    } catch {
      // localStorage может быть недоступен (приватный режим) — всё равно покажем 1 раз за сессию
    }

    const t = setTimeout(() => {
      setOpen(true);
      shownAt.current = Date.now();
      try { localStorage.setItem(key, String(Date.now())); } catch { /* noop */ }
      trackPromoEvent({ event: "promo_shown", promo_id: cfg.id, utm });
    }, cfg.delayMs);

    return () => clearTimeout(t);
  }, [cfg, utm]);

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
    setFormOpen(true);
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

      <RequestFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        sourceId={cfg.id}
        section={cfg.analytics.section}
        buttonLabel={cfg.analytics.buttonLabel}
        formType="purchase_request"
      />
    </>
  );
};

export default PromoPopup;
