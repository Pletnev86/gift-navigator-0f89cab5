/**
 * useUtm — читает UTM-параметры из URL и вычисляет источник трафика
 * для аналитики и Битрикс24.
 */

export type TrafficSource =
  | "yandex_direct"
  | "yandex_organic"
  | "google_ads"
  | "google_organic"
  | "qr_pdf"
  | "qr_exhibition"
  | "qr_handout"
  | "email"
  | "social_vk"
  | "social_tg"
  | "direct"
  | "unknown";

export const BITRIX_LEAD_SOURCE: Record<TrafficSource, string> = {
  yandex_direct:  "AD_YANDEX_DIRECT",
  yandex_organic: "ORGANIC_YANDEX",
  google_ads:     "AD_GOOGLE",
  google_organic: "ORGANIC_GOOGLE",
  qr_exhibition:  "QR_EXHIBITION",
  qr_pdf:         "QR_PDF",
  qr_handout:     "QR_HANDOUT",
  email:          "EMAIL_CAMPAIGN",
  social_vk:      "SOCIAL_VK",
  social_tg:      "SOCIAL_TG",
  direct:         "DIRECT",
  unknown:        "UNKNOWN",
};

export interface UtmData {
  utm_source:   string;
  utm_medium:   string;
  utm_campaign: string;
  utm_content:  string;
  utm_term:     string;
  referrer:     string;
  page_url:     string;
  user_agent:   string;
  traffic_source:     TrafficSource;
  bitrix_lead_source: string;
  bitrix_pipeline:    string;
  bitrix_tag:         string;
}

function detectTrafficSource(
  source: string,
  medium: string,
  referrer: string
): TrafficSource {
  const s = source.toLowerCase();
  const m = medium.toLowerCase();
  const r = referrer.toLowerCase();

  // QR-коды — определяем по medium
  if (m === "qr_exhibition") return "qr_exhibition";
  if (m === "qr_pdf")        return "qr_pdf";
  if (m === "qr_handout")    return "qr_handout";

  // Платная реклама
  if (s === "yandex" && (m === "cpc" || m === "display")) return "yandex_direct";
  if (s === "google" && (m === "cpc" || m === "display")) return "google_ads";

  // Email
  if (m === "email" || s === "email") return "email";

  // Соцсети
  if (s === "vk"       || m === "social_vk") return "social_vk";
  if (s === "telegram" || m === "social_tg" || s === "tg") return "social_tg";

  // Органика: определяем по referrer если нет utm
  if (!s && r.includes("yandex.ru")) return "yandex_organic";
  if (!s && r.includes("google."))   return "google_organic";
  if (s === "yandex" && !m)          return "yandex_organic";
  if (s === "google" && !m)          return "google_organic";

  // Прямой заход
  if (!s && !r) return "direct";

  return "unknown";
}

export function useUtm(): UtmData {
  const params   = new URLSearchParams(window.location.search);
  const referrer = document.referrer || "";

  const utm_source   = params.get("utm_source")   || "";
  const utm_medium   = params.get("utm_medium")   || "";
  const utm_campaign = params.get("utm_campaign") || "";
  const utm_content  = params.get("utm_content")  || "";
  const utm_term     = params.get("utm_term")     || "";

  const traffic_source = detectTrafficSource(utm_source, utm_medium, referrer);
  const bitrix_lead_source = BITRIX_LEAD_SOURCE[traffic_source];

  // Тег для фильтрации в Битрикс24: campaign > source > traffic_source
  const bitrix_tag = utm_campaign || utm_source || traffic_source;

  return {
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
    referrer,
    page_url:    window.location.href,
    user_agent:  navigator.userAgent,
    traffic_source,
    bitrix_lead_source,
    bitrix_pipeline: "b2b_inbound",
    bitrix_tag,
  };
}
