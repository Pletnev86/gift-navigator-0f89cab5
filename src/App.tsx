import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Offer from "./pages/Offer.tsx";
import Privacy from "./pages/Privacy.tsx";
import CookieBanner from "./components/CookieBanner.tsx";
import { FormProvider, useFormContext } from "./context/FormContext.tsx";
import RequestFormDialog from "./components/landing/RequestFormDialog.tsx";
import type { FormType } from "./lib/analytics.ts";

const queryClient = new QueryClient();

/**
 * Задача 4: Обработчик параметра form=open / form=test в URL.
 * Монтируется один раз, парсит URLSearchParams, открывает нужную форму,
 * затем удаляет параметр form из адресной строки (UTM-метки сохраняются).
 */
function FormUrlHandler() {
  const { openForm } = useFormContext();

  useEffect(() => {
    /**
     * Читаем form= из URL и открываем форму.
     * URL НЕ очищается — это позволяет форме открываться:
     *  • при каждой свежей навигации по QR-ссылке
     *  • при восстановлении страницы из bfcache (iOS Safari)
     */
    function tryOpen() {
      const params = new URLSearchParams(window.location.search);
      const formParam = params.get("form");
      if (formParam !== "open" && formParam !== "test") return;
      const type: FormType =
        formParam === "test" ? "test_access" : "purchase_request";
      setTimeout(() => openForm(type), 600);
    }

    tryOpen();

    const onPageShow = (e: PageTransitionEvent) => { if (e.persisted) tryOpen(); };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

/**
 * Глобальное модальное окно, управляемое через FormContext.
 * Рендерится поверх всего приложения.
 */
function GlobalFormDialog() {
  const { formType, closeForm } = useFormContext();

  if (!formType) return null;

  return (
    <RequestFormDialog
      open
      onOpenChange={(open) => { if (!open) closeForm(); }}
      sourceId="url-param-form"
      section="url_trigger"
      buttonLabel={
        formType === "test_access"
          ? "Получить тестовый сертификат"
          : "Оставить заявку"
      }
      formType={formType}
    />
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <FormProvider>
        <BrowserRouter>
          <FormUrlHandler />
          <GlobalFormDialog />
          <CookieBanner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/offer" element={<Offer />} />
            <Route path="/privacy" element={<Privacy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FormProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
