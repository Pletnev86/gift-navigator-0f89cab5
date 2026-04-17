/**
 * use-utm.ts v2.1
 * Расширенная аналитика: channel_group → channel_type → platform → click_id → search_query
 */

// ─── Типы ────────────────────────────────────────────────────────────────────

/** Группа канала: онлайн или офлайн */
export type ChannelGroup = "online" | "offline";

/**
 * Тип канала (детализированный).
 * Определяется по UTM-параметрам + referrer.
 */
export type ChannelType =
  | "paid_search"       // Платный поиск (Яндекс.Директ, Google Ads)
  | "organic_search"    // Органический поиск
  | "paid_social"       // Таргетированная реклама в соцсетях
  | "organic_social"    // Посты / репосты в соцсетях
  | "email"             // Email-рассылка
  | "referral"          // Переход с другого сайта
  | "qr_pdf"            // QR-код из PDF-презентации (онлайн)
  | "qr_exhibition"     // QR-код на стенде выставки (офлайн)
  | "qr_handout"        // QR-код на флаере / раздатке (офлайн)
  | "qr_print"          // QR-код в печатной рекламе (офлайн)
  | "direct"            // Прямой ввод URL
  | "manual_entry"      // Ручной ввод менеджером
  | "unknown";

/** Рекламная платформа / поисковик */
export type Platform =
  | "yandex"
  | "google"
  | "vk"
  | "telegram"
  | "instagram"
  | "avito"
  | "2gis"
  | "email"
  | "none";

/** Тип устройства */
export type DeviceType = "desktop" | "mobile" | "tablet";

/** Код источника для Битрикс24 */
export const BITRIX_LEAD_SOURCE: Record<ChannelType, string> = {
  paid_search:    "AD_PAID_SEARCH",
  organic_search: "ORGANIC_SEARCH",
  paid_social:    "AD_PAID_SOCIAL",
  organic_social: "ORGANIC_SOCIAL",
  email:          "EMAIL_CAMPAIGN",
  referral:       "REFERRAL",
  qr_pdf:         "QR_PDF",
  qr_exhibition:  "QR_EXHIBITION",
  qr_handout:     "QR_HANDOUT",
  qr_print:       "QR_PRINT",
  direct:         "DIRECT",
  manual_entry:   "MANUAL_ENTRY",
  unknown:        "UNKNOWN",
};

/** Читабельное название источника для CRM */
export const CHANNEL_LABEL: Record<ChannelType, string> = {
  paid_search:    "Платный поиск",
  organic_search: "Органический поиск",
  paid_social:    "Реклама в соцсетях",
  organic_social: "Соцсети (органика)",
  email:          "Email-рассылка",
  referral:       "Реферальный переход",
  qr_pdf:         "QR → PDF-презентация",
  qr_exhibition:  "QR → Выставка (стенд)",
  qr_handout:     "QR → Флаер / раздатка",
  qr_print:       "QR → Печатная реклама",
  direct:         "Прямой заход",
  manual_entry:   "Ручной ввод (менеджер)",
  unknown:        "Не определён",
};

/** Тип click_id (идентификатор клика от рекламной системы) */
export type ClickIdType = "yclid" | "gclid" | "vk_clickid" | "none";

export interface UtmData {
  // UTM (из URL)
  utm_source:   string;
  utm_medium:   string;
  utm_campaign: string;
  utm_content:  string;
  utm_term:     string;

  // Click ID от рекламных систем (добавляется автоматически при клике)
  click_id:      string;       // сам ID (yclid / gclid / vk_clickid)
  click_id_type: ClickIdType;  // тип: yclid | gclid | vk_clickid | none

  // Поисковый запрос (если зашли с поиска)
  search_query: string;        // декодированный запрос из referrer

  // Технический контекст
  referrer:   string;
  page_url:   string;
  user_agent: string;

  // Расширенная классификация источника
  channel_group: ChannelGroup;
  channel_type:  ChannelType;
  channel_label: string;
  platform:      Platform;

  // Устройство
  device_type: DeviceType;

  // Битрикс24
  bitrix_lead_source: string;
  bitrix_channel:     string;
  bitrix_pipeline:    string;
  bitrix_tag:         string;
}

// ─── Вспомогательные функции ─────────────────────────────────────────────────

function detectPlatform(source: string, referrer: string): Platform {
  const s = source.toLowerCase();
  const r = referrer.toLowerCase();
  if (s === "yandex" || r.includes("yandex.ru"))  return "yandex";
  if (s === "google" || r.includes("google."))     return "google";
  if (s === "vk"     || r.includes("vk.com"))      return "vk";
  if (s === "telegram" || s === "tg")              return "telegram";
  if (s === "instagram")                           return "instagram";
  if (s === "avito"  || r.includes("avito.ru"))    return "avito";
  if (s === "2gis"   || r.includes("2gis.ru"))     return "2gis";
  if (s === "email")                               return "email";
  return "none";
}

function detectChannelType(
  source: string,
  medium: string,
  referrer: string,
  hasYclid: boolean,
  hasGclid: boolean,
): ChannelType {
  const s = source.toLowerCase();
  const m = medium.toLowerCase();
  const r = referrer.toLowerCase();

  // Ручной ввод менеджером
  if (s === "manual" || m === "manual_entry")      return "manual_entry";

  // QR-коды (офлайн и онлайн)
  if (m === "qr_exhibition")                       return "qr_exhibition";
  if (m === "qr_handout")                          return "qr_handout";
  if (m === "qr_print")                            return "qr_print";
  if (m === "qr_pdf" || (s === "qr" && m.startsWith("qr_"))) return "qr_pdf";

  // Email
  if (m === "email" || s === "email")              return "email";

  // Платный поиск — по click ID (даже если UTM не проставлены)
  if (hasYclid || hasGclid)                        return "paid_search";

  // Платный поиск — по UTM
  if (m === "cpc" || m === "ppc")                  return "paid_search";

  // Платная медийная реклама (соцсети)
  if (m === "cpm" || m === "paid_social" || m === "display") return "paid_social";

  // Органические соцсети
  if (m === "social" || m === "organic_social" ||
      s === "vk" || s === "telegram" || s === "instagram") return "organic_social";

  // Реферальный переход
  if (m === "referral" || (r && !r.includes("yandex") && !r.includes("google"))) return "referral";

  // Органический поиск (по referrer если нет utm)
  if (r.includes("yandex.ru") || r.includes("google.")) return "organic_search";

  // Прямой заход
  if (!s && !r)                                    return "direct";

  return "unknown";
}

function detectChannelGroup(channelType: ChannelType): ChannelGroup {
  const offline: ChannelType[] = ["qr_exhibition", "qr_handout", "qr_print", "manual_entry"];
  return offline.includes(channelType) ? "offline" : "online";
}

function detectDeviceType(): DeviceType {
  const ua = navigator.userAgent.toLowerCase();
  if (/tablet|ipad|playbook|silk/.test(ua))        return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|windows phone/.test(ua)) return "mobile";
  return "desktop";
}

// ─── Вспомогательные: click ID и search query ────────────────────────────────

function extractClickId(
  params: URLSearchParams
): { click_id: string; click_id_type: ClickIdType } {
  const yclid      = params.get("yclid")      || "";
  const gclid      = params.get("gclid")      || "";
  const vk_clickid = params.get("vk_clickid") || "";

  if (yclid)      return { click_id: yclid,      click_id_type: "yclid"      };
  if (gclid)      return { click_id: gclid,      click_id_type: "gclid"      };
  if (vk_clickid) return { click_id: vk_clickid, click_id_type: "vk_clickid" };
  return           { click_id: "",              click_id_type: "none"       };
}

function extractSearchQuery(referrer: string): string {
  try {
    const url    = new URL(referrer);
    const host   = url.hostname.toLowerCase();
    // Яндекс: ?text=, Google: ?q=
    if (host.includes("yandex"))  return decodeURIComponent(url.searchParams.get("text") || "");
    if (host.includes("google"))  return decodeURIComponent(url.searchParams.get("q")    || "");
  } catch {}
  return "";
}

// ─── Главный хук ─────────────────────────────────────────────────────────────

export function useUtm(): UtmData {
  const params   = new URLSearchParams(window.location.search);
  const referrer = document.referrer || "";

  const utm_source   = params.get("utm_source")   || "";
  const utm_medium   = params.get("utm_medium")   || "";
  const utm_campaign = params.get("utm_campaign") || "";
  const utm_content  = params.get("utm_content")  || "";
  const utm_term     = params.get("utm_term")     || "";

  const { click_id, click_id_type } = extractClickId(params);
  const search_query = utm_term || extractSearchQuery(referrer);

  const channel_type  = detectChannelType(
    utm_source, utm_medium, referrer,
    click_id_type === "yclid",
    click_id_type === "gclid"
  );
  const channel_group = detectChannelGroup(channel_type);
  const channel_label = CHANNEL_LABEL[channel_type];
  const platform      = detectPlatform(utm_source, referrer);
  const device_type   = detectDeviceType();

  const bitrix_lead_source = BITRIX_LEAD_SOURCE[channel_type];
  const bitrix_tag = utm_campaign || utm_source || channel_type;

  const bitrix_channel =
    channel_group === "offline" ? "OFFLINE" :
    channel_type  === "paid_search"    ? "PAID_SEARCH"    :
    channel_type  === "organic_search" ? "ORGANIC_SEARCH" :
    channel_type.toUpperCase();

  return {
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
    click_id,
    click_id_type,
    search_query,
    referrer,
    page_url:    window.location.href,
    user_agent:  navigator.userAgent,
    channel_group,
    channel_type,
    channel_label,
    platform,
    device_type,
    bitrix_lead_source,
    bitrix_channel,
    bitrix_pipeline: "b2b_inbound",
    bitrix_tag,
  };
}
