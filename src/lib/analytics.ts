/**
 * analytics.ts v2.0 — отправка заявок на Yandex Cloud Function.
 * Полный JSON payload: 7 блоков аналитики.
 */

import type { UtmData } from "@/hooks/use-utm";

const API_ENDPOINT = "https://functions.yandexcloud.net/d4egoeg3pj9n6tvunkrq";

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
}

/** Полный payload JSON v2.0 */
export interface LeadPayload {
  _version: "2.0";

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

  // Блок 4: Расширенная классификация источника
  channel_group: string;   // online | offline
  channel_type:  string;   // paid_search | qr_exhibition | ...
  channel_label: string;   // читаемое название для CRM
  platform:      string;   // yandex | google | vk | none | ...

  // Блок 5: Устройство
  device_type: string;     // desktop | mobile | tablet

  // Блок 6: Технический контекст
  referrer:     string;
  page_url:     string;
  user_agent:   string;
  submitted_at: string;

  // Блок 7: Битрикс24
  bitrix_lead_source: string;
  bitrix_channel:     string;
  bitrix_pipeline:    string;
  bitrix_tag:         string;
}

export async function submitLead(
  meta:    FormMeta,
  contact: ContactData,
  utm:     UtmData
): Promise<{ ok: boolean }> {
  const payload: LeadPayload = {
    _version: "2.0",

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
  };

  if (import.meta.env.DEV) {
    console.groupCollapsed(`[analytics v2] submitLead → ${meta.form_id}`);
    console.log(JSON.stringify(payload, null, 2));
    console.groupEnd();
  }

  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "no body");
    throw new Error(`API ${response.status}: ${text}`);
  }

  return { ok: true };
}
