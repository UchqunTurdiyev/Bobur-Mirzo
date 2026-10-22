"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/lib/content";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const getCookie = (n: string) =>
  typeof document === "undefined"
    ? undefined
    : document.cookie.split("; ").find((c) => c.startsWith(n + "="))?.split("=")[1];

function formatPhone(input: string) {
  let d = input.replace(/\D/g, "");
  if (d.startsWith("998")) d = d.slice(3);
  d = d.slice(0, 9);
  const p = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean);
  return p.join(" ");
}

export default function LeadForm({ compact = false }: { compact?: boolean }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState(EVENT.cities[0].city);
  const [business, setBusiness] = useState("");
  const [hp, setHp] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [utm, setUtm] = useState<Record<string, string>>({});

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
    const u: Record<string, string> = {};
    keys.forEach((k) => {
      const v = sp.get(k);
      if (v) u[k] = v;
    });
    setUtm(u);
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (name.trim().length < 2) return setError("Ismingizni kiriting");
    if (phone.replace(/\D/g, "").length !== 9) return setError("Telefon raqamni to'liq kiriting");

    setState("loading");
    const eventId = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now());

    let fbc = getCookie("_fbc");
    const fbclid = new URLSearchParams(window.location.search).get("fbclid");
    if (!fbc && fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: "998" + phone.replace(/\D/g, ""),
          city,
          business,
          eventId,
          fbp: getCookie("_fbp"),
          fbc,
          pageUrl: window.location.href,
          utm,
          website: hp,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Xatolik");
      window.fbq?.("track", "Lead", { content_name: "AI xodimlar intensivi", city }, { eventID: eventId });
      setState("done");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Xatolik yuz berdi. Qayta urinib ko'ring.");
    }
  }

  if (state === "done") {
    return (
      <div className="form-done" role="status">
        <div className="form-done__icon" aria-hidden>✓</div>
        <h3>Joyingiz band qilindi</h3>
        <p>
          Rahmat, {name.split(" ")[0]}! Menejerimiz tez orada <b>+998 {phone}</b> raqamiga qo&apos;ng&apos;iroq qilib,
          tafsilotlarni aytadi.
        </p>
      </div>
    );
  }

  return (
    <form className={`lead-form${compact ? " lead-form--compact" : ""}`} onSubmit={submit} noValidate>
      <label className="field">
        <span>Ismingiz</span>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ism va familiya" autoComplete="name" required />
      </label>

      <label className="field">
        <span>Telefon raqamingiz</span>
        <div className="phone">
          <em>+998</em>
          <input
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="90 123 45 67"
            inputMode="tel"
            autoComplete="tel-national"
            required
          />
        </div>
      </label>

      <fieldset className="field">
        <span>Qaysi shaharda qatnashasiz?</span>
        <div className="city-pick">
          {EVENT.cities.map((c) => (
            <label key={c.city} className={city === c.city ? "on" : ""}>
              <input type="radio" name="city" value={c.city} checked={city === c.city} onChange={() => setCity(c.city)} />
              <b>{c.city}</b>
              <small>{c.date}</small>
            </label>
          ))}
        </div>
      </fieldset>

      {!compact && (
        <label className="field">
          <span>Biznesingiz sohasi <i>(ixtiyoriy)</i></span>
          <input value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="Masalan: mebel savdosi" />
        </label>
      )}

      <input className="hp" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} aria-hidden name="website" />

      {error && <p className="form-error" role="alert">{error}</p>}

      <button className="btn btn--gold btn--block" type="submit" disabled={state === "loading"}>
        {state === "loading" ? "Yuborilmoqda…" : "Joyni band qilish"}
      </button>
      <p className="form-note">Joylar cheklangan · Ma&apos;lumotlaringiz uchinchi shaxslarga berilmaydi</p>
    </form>
  );
}
