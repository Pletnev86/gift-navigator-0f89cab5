import { useLocation, Link } from "react-router-dom";
import { Building2 } from "lucide-react";
import { useFormContext } from "@/context/FormContext";

/**
 * Задача 2: Липкая шапка с кнопкой «Для бизнеса».
 *
 * Логика кнопки:
 *  - На странице /business/ → открывает модальное окно «Корпоративный заказ»
 *    через глобальный FormContext (страница уже загружена, ссылка на себя не нужна).
 *  - На любой другой странице → обычная ссылка <Link to="/business/">.
 */
const SiteHeader = () => {
  const { pathname } = useLocation();
  const { openForm } = useFormContext();
  const isOnBusinessPage = pathname === "/business/" || pathname === "/business";

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto max-w-7xl flex items-center justify-between h-14 px-4">
        {/* Логотип / название */}
        <Link
          to="/"
          className="font-heading font-black text-lg tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          За!Подарком
        </Link>

        {/* Кнопка «Для бизнеса» */}
        {isOnBusinessPage ? (
          <button
            type="button"
            onClick={() => openForm("purchase_request")}
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 px-4 py-1.5 text-sm font-heading font-semibold text-emerald-600 hover:bg-emerald-500/10 transition-colors"
          >
            <Building2 className="w-4 h-4" />
            Корпоративный заказ
          </button>
        ) : (
          <Link
            to="/business/"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 px-4 py-1.5 text-sm font-heading font-semibold text-emerald-600 hover:bg-emerald-500/10 transition-colors"
          >
            <Building2 className="w-4 h-4" />
            Для бизнеса
          </Link>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;
