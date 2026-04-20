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
1. **Proxy Fix**: Replaced `http-proxy-middleware` with a native `fetch` implementation in `server.js` to resolve the `204 No Content` issue and encoding bugs ("???"). **Lead transmission is now stable.**
2. **Domain Integration**: Configured `promo.zapodarkom.ru` via CNAME to Render. SSL (HTTPS) is verified and active.
3. **Legal Compliance (In Progress)**: 
   - Added checkboxes for **Offer**, **Privacy Policy**, and **Marketing Consent** to all forms.
   - Implemented a **Cookie Banner** with persistent state in `localStorage`.
   - Created draft pages for `/offer` and `/privacy`.
   - Updated `LeadPayload` in `analytics.ts` to include consent flags (`consent_offer`, `consent_privacy`, `consent_marketing`).

## 📋 What's Next / Pending
- [x] Integrate checkboxes into `RequestFormDialog`.
- [x] Integrate checkboxes into `ChestRaffleDialog`.
- [ ] Replace placeholder texts in `src/pages/Offer.tsx` and `src/pages/Privacy.tsx` with final legal documents.
- [ ] Final verification of the JSON payload sent from the production environment to ensure all 8 blocks (including Legal Consents) are correctly received by Bitrix24.

## 📂 Key Files
- `server.js`: The "brain" of the proxy server. Handles API keys and headers.
- `src/lib/analytics.ts`: Defines the v2.1 JSON payload structure and submission logic.
- `src/components/landing/RequestFormDialog.tsx`: Main lead capture form.
- `src/components/landing/ChestRaffleDialog.tsx`: Secondary lead capture (test certificate raffle).
- `src/components/CookieBanner.tsx`: Legal cookie notification.

---
*Created for: Antigravity / Windsurf / Claude AI. Use this as a starting point for any new session.*
