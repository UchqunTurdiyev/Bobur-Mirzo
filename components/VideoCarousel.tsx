"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { DENOV_VIDEOS } from "@/lib/content";

const CARD_SEC = 2; // bitta video shuncha soniyada o'tadi
const PAUSE_MS = 1500;
const ITEMS = [...DENOV_VIDEOS, ...DENOV_VIDEOS];

// Denovdagi kurs videolari: o'zi silliq aylanadi, bosilganda video yuklanib ijro etiladi
export default function VideoCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const playing = useRef<HTMLVideoElement | null>(null);
  const resumeAt = useRef(0);

  const hold = (ms: number) => {
    resumeAt.current = performance.now() + ms;
  };

  useEffect(() => {
    const vids = ref.current;
    if (!vids || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let pos = 0, last = 0, loop = 0, inView = false, raf = 0;
    const n = DENOV_VIDEOS.length;
    const measure = () => {
      const a = vids.children[0] as HTMLElement, b = vids.children[n] as HTMLElement;
      loop = b.offsetLeft - a.offsetLeft;
    };
    const roll = (t: number) => {
      if (!inView) return;
      const dt = Math.min(t - last, 50) / 1000;
      last = t;
      if (t < resumeAt.current || playing.current) pos = vids.scrollLeft;
      else {
        pos += (loop / n / CARD_SEC) * dt;
        if (pos >= loop) pos -= loop;
        vids.scrollLeft = pos;
      }
      raf = requestAnimationFrame(roll);
    };
    const io = new IntersectionObserver(([e]) => {
      const was = inView;
      inView = e.isIntersecting;
      if (inView && !was) {
        measure();
        last = performance.now();
        raf = requestAnimationFrame(roll);
      }
    });
    io.observe(vids);
    addEventListener("resize", measure);
    return () => {
      io.disconnect();
      removeEventListener("resize", measure);
      cancelAnimationFrame(raf);
    };
  }, []);

  const slide = (dir: number) => {
    const vids = ref.current;
    if (!vids) return;
    hold(PAUSE_MS);
    vids.scrollBy({ left: dir * ((vids.firstElementChild as HTMLElement).offsetWidth + 12) * 2, behavior: "smooth" });
  };

  return (
    <>
      <div
        className="vids"
        ref={ref}
        tabIndex={0}
        aria-label="Denovdagi kurs videolari"
        onPointerDown={() => hold(1e9)}
        onTouchStart={() => hold(1e9)}
        onPointerUp={() => hold(PAUSE_MS)}
        onPointerCancel={() => hold(PAUSE_MS)}
        onTouchEnd={() => hold(PAUSE_MS)}
        onTouchCancel={() => hold(PAUSE_MS)}
      >
        {ITEMS.map((i, k) => {
          const n = String(i).padStart(2, "0");
          return (
            <div className="v" key={k}>
              {active === k ? (
                <video
                  src={`/assets/videolar/denov-${n}.mp4`}
                  poster={`/assets/videolar/denov-${n}.webp`}
                  controls
                  playsInline
                  autoPlay
                  onPlay={(e) => {
                    playing.current = e.currentTarget;
                  }}
                  onPause={(e) => {
                    if (playing.current === e.currentTarget) playing.current = null;
                  }}
                />
              ) : (
                <button
                  type="button"
                  aria-label={`${(k % DENOV_VIDEOS.length) + 1}-videoni ko'rish`}
                  onClick={() => {
                    playing.current = null;
                    setActive(k);
                  }}
                >
                  <img src={`/assets/videolar/denov-${n}.webp`} alt="" loading="lazy" decoding="async" width={270} height={480} />
                  <i />
                </button>
              )}
            </div>
          );
        })}
      </div>
      <p className="vhint">Videoni ko&apos;rish uchun bosing, keyingisiga o&apos;tish uchun yon tomonga suring.</p>
      <div className="vnav">
        <button type="button" aria-label="Oldingi videolar" onClick={() => slide(-1)}>
          ←
        </button>
        <button type="button" aria-label="Keyingi videolar" onClick={() => slide(1)}>
          →
        </button>
      </div>
    </>
  );
}
