import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem("cookie_consent");
    if (!hasConsent) {
      // Small delay so it slides in nicely after load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-card/95 backdrop-blur shadow-2xl border border-border p-4 md:p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm md:text-base text-foreground/80 flex-1">
            Мы используем Cookie и Яндекс Метрику для того, чтобы сделать сайт лучше.{" "}
            <Link to="/privacy" className="text-primary hover:underline underline-offset-4 whitespace-nowrap">
              Подробнее в политике конфиденциальности.
            </Link>
          </p>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={acceptCookies}
              className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors flex-1 md:flex-none text-sm"
            >
              Согласен
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors shrink-0"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
