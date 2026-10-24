import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

type LeadBody = {
  name?: string;
  phone?: string;
  city?: string;
  business?: string;
  eventId?: string;
  fbp?: string;
  fbc?: string;
  pageUrl?: string;
  utm?: Record<string, string>;
  website?: string; // honeypot
};

const sha256 = (v: string) => crypto.createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c] as string));

function normalizePhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.length === 9) d = "998" + d;
  return d;
}

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { skipped: true };
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
  });
  return { ok: res.ok };
}

async function sendCrm(lead: { name: string; phone: string; creative: string; note: string }) {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return { skipped: true };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(8000), // CRM sekin bo'lsa ham javob kutib qolmaymiz
  });
  return { ok: res.ok };
}

async function sendCapi(params: {
  eventId: string;
  phone: string;
  name: string;
  city: string;
  fbp?: string;
  fbc?: string;
  ip?: string;
  ua?: string;
  url?: string;
}) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) return { skipped: true };

  const firstName = params.name.split(/\s+/)[0] || params.name;
  const user_data: Record<string, unknown> = {
    ph: [sha256(params.phone)],
    fn: [sha256(firstName)],
    ct: [sha256(params.city.replace(/\s+/g, ""))],
    country: [sha256("uz")],
    external_id: [sha256(params.phone)],
    client_ip_address: params.ip,
    client_user_agent: params.ua,
  };
  if (params.fbp) user_data.fbp = params.fbp;
  if (params.fbc) user_data.fbc = params.fbc;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: params.eventId,
        action_source: "website",
        event_source_url: params.url,
        user_data,
        custom_data: { content_name: "AI xodimlar intensivi", city: params.city },
      },
    ],
  };
  if (process.env.META_TEST_EVENT_CODE) payload.test_event_code = process.env.META_TEST_EVENT_CODE;

  const res = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return { ok: res.ok };
}

export async function POST(req: NextRequest) {
  let body: LeadBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Noto'g'ri so'rov" }, { status: 400 });
  }

  // Bot himoyasi: yashirin maydon to'ldirilgan bo'lsa, jim qabul qilamiz
  if (body.website) return NextResponse.json({ ok: true });

  const name = (body.name || "").trim().slice(0, 80);
  const phone = normalizePhone(body.phone || "");
  const city = (body.city || "").trim().slice(0, 40);
  const business = (body.business || "").trim().slice(0, 120);
  const eventId = (body.eventId || crypto.randomUUID()).slice(0, 64);

  if (name.length < 2) return NextResponse.json({ ok: false, error: "Ismingizni kiriting" }, { status: 422 });
  if (!/^998\d{9}$/.test(phone)) return NextResponse.json({ ok: false, error: "Telefon raqam noto'g'ri" }, { status: 422 });
  if (!city) return NextResponse.json({ ok: false, error: "Shaharni tanlang" }, { status: 422 });

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || undefined;
  const ua = req.headers.get("user-agent") || undefined;
  const url = body.pageUrl || process.env.NEXT_PUBLIC_SITE_URL;

  const utm = body.utm || {};
  const utmLine = Object.entries(utm)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${esc(String(v)).slice(0, 80)}`)
    .join("\n");

  const pretty = `+${phone.slice(0, 3)} ${phone.slice(3, 5)} ${phone.slice(5, 8)} ${phone.slice(8, 10)} ${phone.slice(10)}`;
  const text =
    `🟡 <b>Yangi lid — AI xodimlar intensivi</b>\n\n` +
    `👤 <b>Ism:</b> ${esc(name)}\n` +
    `📞 <b>Telefon:</b> ${pretty}\n` +
    `📍 <b>Shahar:</b> ${esc(city)}\n` +
    (business ? `💼 <b>Biznes:</b> ${esc(business)}\n` : "") +
    (utmLine ? `\n📊 <b>Manba</b>\n${utmLine}\n` : "") +
    `\n🕒 ${new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })}`;

  const creative = utm.utm_content || utm.utm_campaign || utm.utm_source || "Sayt";
  const note = [
    `Shahar: ${city}`,
    business && `Biznes: ${business}`,
    ...Object.entries(utm).filter(([, v]) => v).map(([k, v]) => `${k}: ${String(v).slice(0, 80)}`),
  ]
    .filter(Boolean)
    .join("\n");

  // Har biri mustaqil: CRM yiqilsa ham Telegram va CAPI ishlayveradi
  const [tg, capi, crm] = await Promise.allSettled([
    sendTelegram(text),
    sendCapi({ eventId, phone, name, city, fbp: body.fbp, fbc: body.fbc, ip, ua, url }),
    sendCrm({ name, phone: `+${phone}`, creative: String(creative).slice(0, 80), note }),
  ]);

  if (tg.status === "rejected") console.error("Telegram xatosi:", tg.reason);
  if (capi.status === "rejected") console.error("CAPI xatosi:", capi.reason);
  if (crm.status === "rejected") console.error("CRM xatosi:", crm.reason);
  else if (crm.value.ok === false) console.error("CRM javobi muvaffaqiyatsiz");

  return NextResponse.json({ ok: true, eventId });
}
