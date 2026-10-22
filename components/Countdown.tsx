"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");

export default function Countdown({ to }: { to: string }) {
  const target = new Date(to).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = now === null ? 0 : Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);

  const cells = [
    { v: d, l: "kun" },
    { v: h, l: "soat" },
    { v: m, l: "daqiqa" },
    { v: s, l: "soniya" },
  ];

  return (
    <div className="countdown" aria-label="Intensiv boshlanishiga qolgan vaqt">
      {cells.map((c) => (
        <div key={c.l}>
          <b suppressHydrationWarning>{now === null ? "––" : pad(c.v)}</b>
          <span>{c.l}</span>
        </div>
      ))}
    </div>
  );
}
