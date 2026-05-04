/**
 * analytics.ts v2.1 — отправка заявок на Yandex Cloud Function (webhook).
 * Полный JSON payload v2.1: 7 блоков аналитики + click_id + search_query.
 */

import type { UtmData } from "@/hooks/use-utm";

const API_ENDPOINT = "/api/lead";

export type FormType = "purchase_request" | "test_access";

export interface FormMeta {
  form_type:    FormType;
  form_id:      string;
  section:      string;
  button_label: string;
}

export interface ContactData {
  name:  string;
  phone: string;
  email: string;
  consents: {
    offer: boolean;
    privacy: boolean;
    marketing: boolean;
  };
}

/** Полный payload JSON v2.1 */
export interface LeadPayload {
  _version: "2.1";

  // Блок 1: Форма
  form_type:    FormType;
  form_id:      string;
  section:      string;
  button_label: string;

  // Блок 2: Контакт
  name:  string;
  phone: string;
  email: string;

  // Блок 3: UTM
  utm_source:   string;
  utm_medium:   string;
  utm_campaign: string;
  utm_content:  string;
  utm_term:     string;

  // Блок 4: Click ID от рекламных систем
  click_id:      string;   // yclid / gclid / vk_clickid / ""
  click_id_type: string;   // "yclid" | "gclid" | "vk_clickid" | "none"
  search_query:  string;   // поисковый запрос (если есть)

  // Блок 5: Расширенная классификация источника
  channel_group: string;   // online | offline
  channel_type:  string;   // paid_search | qr_exhibition | ...
  channel_label: string;   // читаемое название для CRM
  platform:      string;   // yandex | google | vk | none | ...

  // Блок 6: Устройство и техника
  device_type:  string;    // desktop | mobile | tablet
  referrer:     string;
  page_url:     string;
  user_agent:   string;
  submitted_at: string;

  // Блок 7: Битрикс24
  bitrix_lead_source: string;
  bitrix_channel:     string;
  bitrix_pipeline:    string;
  bitrix_tag:         string;

  // Блок 8: Юридические согласия
  consent_offer:      boolean;
  consent_privacy:    boolean;
  consent_marketing:  boolean;
}

export async function submitLead(
  meta:    FormMeta,
  contact: ContactData,
  utm:     UtmData
): Promise<{ ok: boolean }> {
  const payload: LeadPayload = {
    _version: "2.1",

    form_type:    meta.form_type,
    form_id:      meta.form_id,
    section:      meta.section,
    button_label: meta.button_label,

    name:  contact.name.trim(),
    phone: contact.phone.trim(),
    email: contact.email.trim(),

    utm_source:   utm.utm_source,
    utm_medium:   utm.utm_medium,
    utm_campaign: utm.utm_campaign,
    utm_content:  utm.utm_content,
    utm_term:     utm.utm_term,

    click_id:      utm.click_id,
    click_id_type: utm.click_id_type,
    search_query:  utm.search_query,

    channel_group: utm.channel_group,
    channel_type:  utm.channel_type,
    channel_label: utm.channel_label,
    platform:      utm.platform,

    device_type: utm.device_type,

    referrer:     utm.referrer,
    page_url:     utm.page_url,
    user_agent:   utm.user_agent,
    submitted_at: new Date().toISOString(),

    bitrix_lead_source: utm.bitrix_lead_source,
    bitrix_channel:     utm.bitrix_channel,
    bitrix_pipeline:    utm.bitrix_pipeline,
    bitrix_tag:         utm.bitrix_tag,

    consent_offer:      contact.consents.offer,
    consent_privacy:    contact.consents.privacy,
    consent_marketing:  contact.consents.marketing,
  };

  const body = JSON.stringify(payload);

  if (import.meta.env.DEV) {
    console.groupCollapsed(`[analytics v2] submitLead → ${meta.form_id}`);
    console.log(body);
    console.groupEnd();
  }

  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "no body");
    throw new Error(`API ${response.status}: ${text}`);
  }

  return { ok: true };
}

// ─── Промо-события (pop-up акции) ───────────────────────────────────────────
// Не лид: просто маячок в Я.Метрику / GA / dataLayer + dev-лог.

export type PromoEventName =
  | "promo_shown"
  | "promo_closed"
  | "promo_cta_click";

export interface PromoEventPayload {
  event: PromoEventName;
  promo_id: string;
  /** Сколько мс окно было видно до взаимодействия (для closed/cta_click). */
  visible_ms?: number;
  /** Любые UTM-поля прокинуть сюда — необязательно. */
  utm?: Partial<UtmData>;
}

export function trackPromoEvent(p: PromoEventPayload): void {
  if (import.meta.env.DEV) {
    console.log("[analytics] promo:", p);
  }

  // Yandex.Metrika
  const ym = (window as unknown as { ym?: (id: number, m: string, n: string, params?: object) => void }).ym;
  const ymId = (window as unknown as { __YM_ID__?: number }).__YM_ID__;
  if (typeof ym === "function" && ymId) {
    ym(ymId, "reachGoal", p.event, { promo_id: p.promo_id, visible_ms: p.visible_ms });
  }

  // dataLayer (GA4 / GTM)
  const dl = (window as unknown as { dataLayer?: object[] }).dataLayer;
  if (Array.isArray(dl)) {
    dl.push({ ...p });
  }
}
