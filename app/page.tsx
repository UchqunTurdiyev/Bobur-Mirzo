import Image from "next/image";
import LeadForm from "@/components/LeadForm";
import Countdown from "@/components/Countdown";
import Reveal from "@/components/Reveal";
import { EVENT, SPEAKER, PAINS, AI_PERKS, OUTCOMES, PROGRAM, INDUSTRIES, FAQ } from "@/lib/content";

const IG = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/boburmirzo_expert/";
const TG = process.env.NEXT_PUBLIC_TELEGRAM_URL;
const PHONE = process.env.NEXT_PUBLIC_PHONE;

export default function Home() {
  return (
    <main>
      <Reveal />

      {/* ───── NAV ───── */}
      <header className="nav">
        <div className="wrap nav__in">
          <a href="#" className="brand" aria-label="Bobur Mirzo Akademiyasi">
            <span className="brand__mark">BM</span>
            <span className="brand__txt">
              Bobur Mirzo<small>Akademiyasi</small>
            </span>
          </a>
          <nav className="nav__links">
            <a href="#muammo">Muammo</a>
            <a href="#dastur">Dastur</a>
            <a href="#spiker">Spiker</a>
            <a href="#savollar">Savollar</a>
          </nav>
          <a href="#royxat" className="btn btn--gold btn--sm">Joy band qilish</a>
        </div>
      </header>

      {/* ───── HERO ───── */}
      <section className="hero">
        <div className="hero__glow" aria-hidden />
        <div className="wrap hero__in">
          <div className="hero__copy">
            <span className="chip">Intensiv kurs · {EVENT.region}</span>
            <h1>
              <span>AI xodimlar</span> orqali biznesni <em>oson boshqaring</em>
            </h1>
            <p className="lead">{EVENT.subtitle}</p>

            <div className="dates">
              {EVENT.cities.map((c) => (
                <div className="date" key={c.city}>
                  <b>{c.city}</b>
                  <span>{c.date}, {c.weekday}</span>
                  <small>{EVENT.time}</small>
                </div>
              ))}
            </div>

            <div className="hero__cta">
              <a href="#royxat" className="btn btn--gold">Joyni band qilish</a>
              <a href="#dastur" className="btn btn--ghost">Kun dasturi</a>
            </div>

            <div className="hero__timer">
              <span>Denovdagi intensivgacha:</span>
              <Countdown to={EVENT.cities[0].iso} />
            </div>
          </div>

          <div className="hero__photo">
            <Image src="/bobur-mirzo.jpg" alt={SPEAKER.name} width={1100} height={1375} priority sizes="(max-width: 900px) 100vw, 46vw" />
            <div className="hero__badge">
              <b>{SPEAKER.name}</b>
              <span>HR va biznesni tizimlashtirish bo&apos;yicha 10 yillik tajriba</span>
            </div>
          </div>
        </div>

        <div className="wrap strip">
          <span>Darsning o&apos;zida birinchi AI xodim</span>
          <i />
          <span>Jonli demo: sahnada AI menejer</span>
          <i />
          <span>Amaliyotda yordamchilar</span>
          <i />
          <span>Joylar cheklangan</span>
        </div>
      </section>

      {/* ───── PAINS ───── */}
      <section className="sec" id="muammo">
        <div className="wrap">
          <div className="sec__head reveal">
            <span className="eyebrow">Tanish holatmi?</span>
            <h2>Viloyatda biznes yuritayotgan tadbirkorning <em>4 ta og&apos;rig&apos;i</em></h2>
          </div>
          <div className="pains">
            {PAINS.map((p) => (
              <article className="pain reveal" key={p.tag}>
                <span className="pain__n">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───── SOLUTION ───── */}
      <section className="sec sec--alt">
        <div className="wrap split">
          <div className="reveal">
            <span className="eyebrow">Yechim</span>
            <h2>Xodim qidirmang — <em>AI xodimga</em> topshiring</h2>
            <p className="muted big">
              Ko&apos;pchilik sun&apos;iy intellektni ChatGPT bilan gaplashish deb biladi. Aslida bu uning atigi 5 foizi. AI bugun
              matn yozadi, gapiradi, rasm va video yasaydi, hisob qiladi, dastur tuzadi — ya&apos;ni haqiqiy xodim kabi ishlaydi.
            </p>
          </div>
          <div className="perks">
            {AI_PERKS.map((p) => (
              <div className="perk reveal" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── OUTCOMES ───── */}
      <section className="sec">
        <div className="wrap">
          <div className="sec__head reveal">
            <span className="eyebrow">Natija</span>
            <h2>Intensivdan siz bilan <em>nima chiqib ketadi</em></h2>
          </div>
          <ol className="outcomes">
            {OUTCOMES.map((o, i) => (
              <li className="reveal" key={o}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p>{o}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───── PROGRAM ───── */}
      <section className="sec sec--alt" id="dastur">
        <div className="wrap">
          <div className="sec__head reveal">
            <span className="eyebrow">Kun dasturi · 240 daqiqa</span>
            <h2>8 blok: ishonchdan — <em>o&apos;z AI xodimingizgacha</em></h2>
          </div>
          <div className="program">
            {PROGRAM.map((b, i) => (
              <article className={`block reveal${b.title === "Coffee break" ? " block--break" : ""}`} key={b.title}>
                <div className="block__time">
                  <b>{b.time}</b>
                  <span>{b.dur} daq</span>
                </div>
                <div className="block__body">
                  <span className="block__n">{i + 1}-blok</span>
                  <h3>{b.title}</h3>
                  <ul>
                    {b.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <p className="block__res">→ {b.result}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───── INDUSTRIES ───── */}
      <section className="sec">
        <div className="wrap">
          <div className="sec__head reveal">
            <span className="eyebrow">“AI mening sohamga to&apos;g&apos;ri kelmaydi”mi?</span>
            <h2>Har bir soha uchun <em>aniq AI xodim</em></h2>
          </div>
          <div className="inds">
            {INDUSTRIES.map((x) => (
              <div className="ind reveal" key={x.name}>
                <h3>{x.name}</h3>
                <p>{x.ai}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── SPEAKER ───── */}
      <section className="sec sec--speaker" id="spiker">
        <div className="wrap">
          <div className="speaker">
            <div className="speaker__photo reveal">
              <Image src="/bobur-mirzo.jpg" alt={SPEAKER.name} width={1100} height={1375} sizes="(max-width: 900px) 100vw, 40vw" />
            </div>
            <div className="speaker__copy">
              <span className="eyebrow reveal">Spiker</span>
              <h2 className="reveal">
                Bobur Mirzo <em>Yo&apos;ldoshboyev</em>
              </h2>
              <p className="muted big reveal">{SPEAKER.role}</p>
              <blockquote className="reveal">{SPEAKER.quote}</blockquote>

              <div className="stats reveal">
                {SPEAKER.stats.map((s) => (
                  <div key={s.label}>
                    <b>{s.value}</b>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>

              <div className="speaker__cols">
                <div className="reveal">
                  <h4>Hozirgi faoliyati</h4>
                  <ul className="dots">
                    {SPEAKER.now.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
                <div className="reveal">
                  <h4>Mualliflik kurslari</h4>
                  <ol className="courses">
                    {SPEAKER.courses.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="path reveal">
            <h4>Tajriba yo&apos;li</h4>
            <div className="path__grid">
              {SPEAKER.path.map((p) => (
                <div key={p.text}>
                  <b>{p.years}</b>
                  <span>{p.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── FORMAT ───── */}
      <section className="sec">
        <div className="wrap">
          <div className="format reveal">
            <div>
              <span className="eyebrow">Format</span>
              <h3>{EVENT.format}</h3>
              <p className="muted">Coffee break bilan. Amaliyotda har 10–15 ishtirokchiga bitta yordamchi.</p>
            </div>
            <div>
              <span className="eyebrow">Kimlar uchun</span>
              <h3>Biznesni o&apos;zi boshqarayotgan tadbirkorlar</h3>
              <p className="muted">Dasturlash bilimi shart emas — hammasi tayyor shablon bo&apos;yicha.</p>
            </div>
            <div>
              <span className="eyebrow">O&apos;zingiz bilan</span>
              <h3>Zaryadlangan telefon va Telegram</h3>
              <p className="muted">Biznesingiz haqidagi asosiy ma&apos;lumot yetarli. A4 shablon zalda beriladi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="sec sec--alt" id="savollar">
        <div className="wrap narrow">
          <div className="sec__head reveal">
            <span className="eyebrow">Savol-javob</span>
            <h2>Ko&apos;p beriladigan <em>savollar</em></h2>
          </div>
          <div className="faq">
            {FAQ.map((f, i) => (
              <details className="reveal" key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───── REGISTER ───── */}
      <section className="sec sec--cta" id="royxat">
        <div className="wrap reg">
          <div className="reg__copy reveal">
            <span className="eyebrow">Ro&apos;yxatdan o&apos;tish</span>
            <h2>
              Raqobatchilaringizdan <em>birinchi bo&apos;lib</em> boshlang
            </h2>
            <p className="muted big">
              Surxondaryoda AI xodimlarni hali deyarli hech kim qo&apos;llamayapti. Kim birinchi boshlasa — raqobatda oldinga chiqadi.
            </p>
            <div className="reg__dates">
              {EVENT.cities.map((c) => (
                <div key={c.city}>
                  <b>{c.city}</b>
                  <span>{c.date} · {EVENT.time}</span>
                </div>
              ))}
            </div>
            <div className="hero__timer">
              <span>Denovgacha qoldi:</span>
              <Countdown to={EVENT.cities[0].iso} />
            </div>
          </div>
          <div className="reg__card reveal">
            <h3>Joyingizni band qiling</h3>
            <p className="muted">Ma&apos;lumot qoldiring — menejerimiz qo&apos;ng&apos;iroq qilib, manzil va shartlarni aytadi.</p>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="foot">
        <div className="wrap foot__in">
          <div className="brand">
            <span className="brand__mark">BM</span>
            <span className="brand__txt">
              Bobur Mirzo<small>Akademiyasi</small>
            </span>
          </div>
          <div className="foot__links">
            <a href={IG} target="_blank" rel="noopener noreferrer">Instagram</a>
            {TG && TG !== "https://t.me/" && (
              <a href={TG} target="_blank" rel="noopener noreferrer">Telegram</a>
            )}
            {PHONE && <a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a>}
          </div>
          <small>© {new Date().getFullYear()} Bobur Mirzo Akademiyasi</small>
        </div>
      </footer>

      <a href="#royxat" className="sticky-cta">Joyni band qilish</a>
    </main>
  );
}
