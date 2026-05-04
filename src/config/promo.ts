/**
 * Конфигурация промо-акций (pop-up окно).
 *
 * Как пользоваться — см. src/components/landing/promo/README.md
 *
 * Главное правило: при запуске НОВОЙ акции — поменяйте `id`.
 * Это сбросит localStorage-флаг "уже видел" для всех посетителей.
 */

export interface PromoConfig {
  /** Глобальный включатель модуля. false → pop-up не рендерится вообще. */
  enabled: boolean;

  /**
   * Уникальный ID акции (slug).
   * Используется как ключ localStorage и как form_id в аналитике.
   * При смене ID все пользователи увидят pop-up заново.
   */
  id: string;

  /** Через сколько миллисекунд после загрузки страницы показать окно. */
  delayMs: number;

  /** Контент окна. */
  content: {
    /** Маленький бейдж над заголовком, напр. "Акция" */
    badge?: string;
    /** Главный заголовок (поддерживает HTML внутри <strong>/<span>) */
    title: string;
    /** Подзаголовок / описание */
    subtitle: string;
    /** Список буллетов (необязательно) */
    bullets?: string[];
    /** Текст на основной CTA-кнопке, напр. "Воспользоваться" */
    ctaLabel: string;
    /** Мелкий текст под кнопкой (например условия, дедлайн) */
    footnote?: string;
  };

  /**
   * Аналитика. section/buttonLabel прокидываются в форму заявки,
   * которая открывается после клика на CTA.
   */
  analytics: {
    section: string;     // напр. "promo_popup"
    buttonLabel: string; // дублирует ctaLabel, но можно переопределить
  };
}

export const PROMO_CONFIG: PromoConfig = {
  enabled: true,
  id: "promo-2026-spring-1",
  delayMs: 15_000,

  content: {
    badge: "Спецпредложение",
    title: 'Соберём вашу витрину <span class="text-emerald-500">бесплатно</span>',
    subtitle: "Оставьте заявку до конца месяца — и мы подготовим персональную витрину подарков под ваш бюджет без предоплаты.",
    bullets: [
      "Расчёт проекта за 30 минут",
      "Подбор подарков под ваш бюджет",
      "Без предоплаты и скрытых платежей",
    ],
    ctaLabel: "Воспользоваться",
    footnote: "Предложение действует до конца месяца",
  },

  analytics: {
    section: "promo_popup",
    buttonLabel: "Воспользоваться (промо)",
  },
};
