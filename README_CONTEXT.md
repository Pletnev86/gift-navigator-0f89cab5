# PROJECT CONTEXT: Gift Navigator API & Legal Integration

## 📌 Overview
This project is a B2B landing page for **Zakazpodarka (Gift Navigator)**.
The primary goal is capturing leads and transmitting them to a **Yandex Cloud Function**, which then integrates with **Bitrix24** and **1C**.

## 🛠 Tech Stack
- **Frontend**: Vite + React + TypeScript + Framer Motion.
- **Backend (Proxy)**: Express.js server (`server.js`) deployed on **Render**.
- **Data Pipeline**: 
  - Frontend sends POST to `/api/lead`.
  - Express Proxy injects `X-API-Key` and forwards to Yandex Cloud Function.
  - Yandex Function processes the JSON and creates leads in Bitrix24.

## 🚀 Current Status (Last Updated: 2026-04-21)
1. **Proxy Fix (CRITICAL)**: 
   - Replaced `http-proxy-middleware` with a native `fetch` implementation in `server.js`.
   - **Reason**: The middleware was causing `204 No Content` and blocking the POST body. 
   - **Encoding**: Specified `charset=utf-8` in both `server.js` and `analytics.ts`. This is mandatory for Cyrillic characters. DO NOT REVERT to standard middleware without verifying it handles bodies correctly.
2. **Bitrix24 Integration**:
   - The JSON payload v2.1 acts as a contract with the Yandex Function.
   - Fields `bitrix_lead_source`, `bitrix_channel`, `bitrix_pipeline` (`b2b_inbound`), and `bitrix_tag` are mandatory for CRM mapping.
   - New `consents` block added to comply with Law 152-FZ.
3. **Domain Integration**: Configured `promo.zapodarkom.ru`. SSL (HTTPS) active.
4. **Legal Compliance**: Checkboxes for Offer/Privacy/Marketing added to all forms. Cookie banner active.

## 📋 What's Next / Pending
- [ ] **Final Text for Documents**: Replace placeholders in `src/pages/Offer.tsx` and `src/pages/Privacy.tsx`.
- [ ] **CRM Validation**: Verify that Ananyev's function correctly reads the new `consent_` fields and maps them to Bitrix24 custom fields.
- [ ] **SEO**: Currently the site is hidden from search engines (`noindex`). If ready for production, remove the meta tag in `index.html`.

## 📂 Key Files
- `server.js`: The "brain" of the proxy server. Handles API keys and headers.
- `src/lib/analytics.ts`: Defines the v2.1 JSON payload structure and submission logic.
- `src/components/landing/RequestFormDialog.tsx`: Main lead capture form.
- `src/components/landing/ChestRaffleDialog.tsx`: Secondary lead capture (test certificate raffle).
- `src/components/CookieBanner.tsx`: Legal cookie notification.

---
*Created for: Antigravity / Windsurf / Claude AI. Use this as a starting point for any new session.*
