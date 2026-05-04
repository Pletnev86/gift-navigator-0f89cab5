# GIT_WORKFLOW.md — Инструкция по работе с репозиториями

> Этот файл обязателен к прочтению перед любой работой с кодом проекта.
> Предназначен для AI-ассистентов, разработчиков и других сред.

---

## Два репозитория — разные роли

| Репозиторий | Роль | URL сайта |
|---|---|---|
| `Pletnev86/gift-navigator` | ✅ **ПРОДАКШЕН** — источник правды | `promo.zapodarkom.ru` |
| `Pletnev86/gift-navigator-0f89cab5` | 🛠 Только для **lovable.dev** | не публикуется, не индексируется |

### Главное правило
**`Pletnev86/gift-navigator` — всегда главный.**  
`gift-navigator-0f89cab5` существует только потому, что lovable.dev требует отдельный репозиторий для своего редактора. Он не является источником правды и не деплоится на боевой домен.

---

## Локальная папка

```
C:\ms\gift-navigator
```

`C:\ms` — это junction (символическая ссылка) на:
```
C:\Users\user\Desktop\Работа Маркетинг_Солюшн\gift-navigator
```

> ⚠️ Все git-команды запускать из `C:\ms\gift-navigator`.  
> Кириллический путь не работает в PowerShell и Cascade-терминале.

---

## Настроенные remotes

```
origin  → https://github.com/Pletnev86/gift-navigator.git         (ПРОДАКШЕН)
lovable → https://github.com/Pletnev86/gift-navigator-0f89cab5.git (lovable.dev)
```

Проверить:
```powershell
git remote -v
```

---

## Сценарии работы

### 1. Правки через меня (AI) или вручную → публикация на сайт

```powershell
# Шаг 1: запушить в продакшен (деплой на promo.zapodarkom.ru)
git push origin main

# Шаг 2: синхронизировать lovable.dev (чтобы не потерял изменения)
git push lovable main --force
```

### 2. Правки в lovable.dev → нужно попасть на боевой сайт

```powershell
# Шаг 1: получить изменения из lovable-репо
git pull lovable main --rebase

# Шаг 2: запушить в продакшен
git push origin main
```

### 3. Синхронизировать lovable после любых правок в продакшене

```powershell
git push lovable main --force
```

---

## Деплой на promo.zapodarkom.ru

Сайт деплоится автоматически при пуше в `Pletnev86/gift-navigator` (ветка `main`).  
Хостинг: уточнить у владельца (Render / Netlify / другой).

---

## Стек проекта

- React 18 + Vite 5 + TypeScript
- TailwindCSS + Framer Motion
- React Router DOM v6

Локальный запуск:
```powershell
cd C:\ms\gift-navigator
npm run dev   # → http://localhost:5173
```

---

## Ключевые файлы

| Файл | Назначение |
|---|---|
| `src/config/promo.ts` | Конфигурация промо-popup (текст, задержка, вкл/выкл) |
| `src/components/landing/promo/PromoPopup.tsx` | Компонент всплывающего окна с акцией |
| `src/lib/analytics.ts` | Аналитика: UTM, события Яндекс.Метрики, Bitrix24 |
| `src/hooks/use-utm.ts` | Хук UTM-параметров с автоопределением канала |
| `src/pages/Index.tsx` | Главная страница — подключение всех секций |

---

## Управление промо-popup

Чтобы **изменить текст акции** — отредактировать `src/config/promo.ts`:

```ts
export const PROMO_CONFIG = {
  enabled: true,          // false → popup не показывается вообще
  id: "promo-2026-spring-1", // смени ID → все увидят popup заново
  delayMs: 15_000,        // задержка показа в мс (15 сек)
  content: {
    badge: "Спецпредложение",
    title: "...",
    subtitle: "...",
    bullets: ["...", "..."],
    ctaLabel: "Воспользоваться",
    footnote: "Предложение действует до конца месяца",
  },
  ...
};
```

После изменения — пушить по сценарию 1.
