/**
 * analytics.ts — отправка заявок на Yandex Cloud Function (webhook).
 * Вся аналитика собирается здесь в единый JSON payload версии 1.0.
 */

import type { UtmData } from "@/hooks/use-utm";

const API_ENDPOINT = "https://functions.yandexcloud.net/d4egoeg3pj9n6tvunkrq";

export type FormType = "purchase_request" | "test_access";

export interface FormMeta {
  form_type:    FormType;
  form_id:      string;   // уникальный ID кнопки/формы
  section:      string;   // раздел лендинга: hero | footer | hr | trade | calendar
  button_label: string;   // текст кнопки (для читаемости в CRM)
}

export interface ContactData {
  name:  string;
  phone: string;
  email: string;
}

/** Полный payload — JSON v1.0 */
export interface LeadPayload {
  _version: "1.0";

  // Блок 1: Идентификация формы
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

  // Блок 4: Расчётный источник трафика
  traffic_source: string;

  // Блок 5: Технический контекст
  referrer:     string;
  page_url:     string;
  user_agent:   string;
  submitted_at: string;

  // Блок 6: Битрикс24
  bitrix_lead_source: string;
  bitrix_pipeline:    string;
  bitrix_tag:         string;
}

/**
 * Собирает payload и отправляет POST на API.
 * Возвращает { ok: true } или бросает ошибку.
 */
export async function submitLead(
  meta: FormMeta,
  contact: ContactData,
  utm: UtmData
): Promise<{ ok: boolean; message?: string }> {
  const payload: LeadPayload = {
    _version: "1.0",

    // Форма
    form_type:    meta.form_type,
    form_id:      meta.form_id,
    section:      meta.section,
    button_label: meta.button_label,

    // Контакт
    name:  contact.name.trim(),
    phone: contact.phone.trim(),
    email: contact.email.trim(),

    // UTM
    utm_source:   utm.utm_source,
    utm_medium:   utm.utm_medium,
    utm_campaign: utm.utm_campaign,
    utm_content:  utm.utm_content,
    utm_term:     utm.utm_term,

    // Источник
    traffic_source: utm.traffic_source,

    // Техника
    referrer:     utm.referrer,
    page_url:     utm.page_url,
    user_agent:   utm.user_agent,
    submitted_at: new Date().toISOString(),

    // Битрикс24
    bitrix_lead_source: utm.bitrix_lead_source,
    bitrix_pipeline:    utm.bitrix_pipeline,
    bitrix_tag:         utm.bitrix_tag,
  };

  // Логируем в dev-режиме для отладки
  if (import.meta.env.DEV) {
    console.groupCollapsed(`[analytics] submitLead → ${meta.form_id}`);
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
