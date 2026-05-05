import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";

const PRESENTCARD_URL =
  "https://presentcard.ru/?utm_source=promo_zapodarkom&utm_medium=site_referral&utm_campaign=header_nav&utm_content=btn_dlya_biznesa";

const SiteHeader = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto max-w-7xl flex items-center justify-between h-14 px-4">
        {/* Логотип */}
        <Link to="/" className="hover:opacity-80 transition-opacity flex items-center">
          <img
            src="/zapodarkom-logo.png"
            alt="За!Подарком"
            className="h-8 w-auto"
            loading="eager"
          />
        </Link>

        {/* Кнопка «Для бизнеса» → presentcard.ru */}
        <a
          href={PRESENTCARD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 px-4 py-1.5 text-sm font-heading font-semibold text-emerald-600 hover:bg-emerald-500/10 transition-colors"
        >
          <Building2 className="w-4 h-4" />
          Для бизнеса
        </a>
      </div>
    </header>
  );
};

export default SiteHeader;
