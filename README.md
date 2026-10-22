# Bobur Mirzo — AI xodimlar intensivi (landing)

Next.js 14 (App Router, TypeScript). Lidlar Telegram botga tushadi, Meta Pixel + Conversions API (Lead) ulanadi.

## Ishga tushirish

```bash
npm install
cp .env.example .env.local   # qiymatlarni to'ldiring
npm run dev                  # http://localhost:3000
```

## Sozlamalar (.env.local)

| O'zgaruvchi | Vazifasi |
|---|---|
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | Lid xabari yuboriladigan bot va chat/guruh |
| `NEXT_PUBLIC_META_PIXEL_ID` | Pixel (PageView + Lead) |
| `META_CAPI_TOKEN` | Server tomondan Lead (CAPI) |
| `META_TEST_EVENT_CODE` | Faqat test paytida |
| `NEXT_PUBLIC_SITE_URL` | Domen (OG, event_source_url) |
| `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_TELEGRAM_URL`, `NEXT_PUBLIC_PHONE` | Footer havolalari |

## CAPI tafsilotlari

- Brauzer `fbq('track','Lead', …, {eventID})` va server bir xil `event_id` yuboradi — Meta takrorni o'zi olib tashlaydi.
- `ph`, `fn`, `ct`, `country`, `external_id` — SHA-256; `fbp`/`fbc` cookie'dan, `fbclid` bo'lsa `fbc` yasaladi.
- IP va User-Agent so'rov sarlavhalaridan olinadi.

## Matnni o'zgartirish

Barcha matnlar — `lib/content.ts`. Rasm — `public/bobur-mirzo.jpg`.

## Deploy

Vercel: repo'ni ulang, Environment Variables'ga `.env.local` qiymatlarini kiriting, Deploy.
# Bobur-Mirzo
