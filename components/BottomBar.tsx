"use client";

import { useEffect, useState } from "react";

// Pastki tugma: birinchi ekrandan keyin chiqadi, forma ko'ringanda yashirinadi
export default function BottomBar({ price }: { price: string }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const hb = document.getElementById("hero-btn");
    const form = document.getElementById("yozilish");
    if (!hb || !form) return;
    const seen = { hero: true, form: false };
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        seen[e.target === hb ? "hero" : "form"] = e.isIntersecting;
      });
      setOn(!seen.hero && !seen.form);
    });
    io.observe(hb);
    io.observe(form);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`bar${on ? " on" : ""}`}>
      <div>
        <b>{price}</b>
        <small>Joylar cheklangan</small>
      </div>
      <a className="btn" href="#yozilish">
        Yozilish
      </a>
    </div>
  );
}
