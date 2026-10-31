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
      <div className="ok" role="status">
        <b>Rahmat, {name.split(" ")[0]}! Arizangiz qabul qilindi.</b>
        <p style={{ marginTop: 6 }}>
          Menejer tez orada <b className="ok-phone">+998 {phone}</b> raqamiga qo&apos;ng&apos;iroq qilib, aniq manzilni aytadi.
        </p>
      </div>
    );
  }

  return (
    <form className={`lead-form${compact ? " lead-form--compact" : ""}`} onSubmit={submit} noValidate>
      <div>
        <label htmlFor="name">Ismingiz</label>
        <input className="in" id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
      </div>

      <div>
        <label htmlFor="phone">Telefon raqamingiz</label>
        <div className="phone">
          <span>+998</span>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="90 123 45 67"
            inputMode="numeric"
            autoComplete="tel-national"
            required
          />
        </div>
      </div>

      <fieldset>
        <legend>Qaysi shaharda qatnashasiz?</legend>
        <div className="city">
          {EVENT.cities.map((c, i) => (
            <span key={c.city} style={{ display: "contents" }}>
              <input type="radio" name="city" id={`c${i + 1}`} value={c.city} checked={city === c.city} onChange={() => setCity(c.city)} />
              <label htmlFor={`c${i + 1}`}>
                {c.city}
                <small>{c.date}</small>
              </label>
            </span>
          ))}
        </div>
      </fieldset>

      {!compact && (
        <div>
          <label htmlFor="business">
            Biznesingiz sohasi <i className="opt">(ixtiyoriy)</i>
          </label>
          <input className="in" id="business" value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="Masalan: mebel savdosi" />
        </div>
      )}

      <input className="hp" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} aria-hidden name="website" />

      {error && <p className="err" role="alert">{error}</p>}

      <button className="btn" type="submit" disabled={state === "loading"}>
        {state === "loading" ? "Yuborilmoqda…" : "Joyimni band qilish"}
      </button>
    </form>
  );
}
