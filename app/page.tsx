/* eslint-disable @next/next/no-img-element */
import LeadForm from "@/components/LeadForm";
import VideoCarousel from "@/components/VideoCarousel";
import BottomBar from "@/components/BottomBar";
import {
  EVENT,
  CONTACT,
  PRICE,
  HERO_PROMISES,
  BIO,
  PROJECT_LOGOS,
  PROBLEMS,
  DAY_PROGRAM,
} from "@/lib/content";

const Check = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
    <circle cx="13" cy="13" r="13" fill="#E8CB8E" />
    <path d="M7.5 13.5l4 4 7-8.5" fill="none" stroke="#052D27" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Pin = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#E8CB8E" d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
  </svg>
);

export default function Home() {
  const datesLine = EVENT.cities.map((c) => `${c.city}: ${c.date}`).join(" · ") + ` · ${EVENT.time}`;

  return (
    <>
      {/* ───── HEADER ───── */}
      <header className="top">
        <div className="wrap">
          <a href="#" aria-label="Bobur Mirzo Akademiyasi">
            <img src="/assets/web/logo.webp" alt="Bobur Mirzo Akademiyasi logosi" width={64} height={54} />
          </a>
          <a className="tel" href={`tel:${CONTACT.tel}`} aria-label={`Qo'ng'iroq qilish: ${CONTACT.phone}`}>
            <svg viewBox="0 0 34 34" aria-hidden="true">
              <circle cx="17" cy="17" r="16" fill="none" stroke="#E8CB8E" strokeOpacity=".55" strokeWidth="1.4" />
              <path
                transform="translate(8 8) scale(.75)"
                fill="#E8CB8E"
                d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
              />
            </svg>
            {CONTACT.phone}
          </a>
        </div>
      </header>

      <main>
        {/* ───── HERO ───── */}
        <section className="hero">
          <div className="wrap">
            <h1>
              AI (sun&apos;iy intellekt) xodimlar
              <br />
              orqali <em>biznesni oson boshqaring!</em>
            </h1>
            <figure className="ph">
              <img src="/assets/web/spiker.webp" alt="Bobur Mirzo Yo'ldoshboyev" fetchPriority="high" width={720} height={900} />
            </figure>
            <div className="hero-tx">
              <p className="sub">
                BU SIZ O&apos;YLAGANCHALIK <s>QIYIN</s> OSON
              </p>
              <p className="lead">
                Siz <em>jaydari tadbirkor</em> bo&apos;lsangiz ham, endi bemalol:
              </p>
              <ul className="prom">
                {HERO_PROMISES.map((p) => (
                  <li key={p}>
                    <Check />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="facts">
                {EVENT.cities.map((c) => (
                  <div className="fc" key={c.city}>
                    <p className="fc-c">
                      <Pin />
                      {c.city}
                    </p>
                    <dl>
                      <dt>KUNI</dt>
                      <dd>
                        {c.date}
                        <small>{c.weekday}</small>
                      </dd>
                      <dt>VAQTI</dt>
                      <dd>{EVENT.time}</dd>
                    </dl>
                  </div>
                ))}
              </div>
              <a className="btn" id="hero-btn" href="#yozilish">
                Intensivga yozilish
              </a>
            </div>
          </div>
        </section>

        {/* ───── SPIKER ───── */}
        <section className="s white">
          <div className="wrap bio">
            <img src="/assets/web/spiker2.webp" alt="Bobur Mirzo Yo'ldoshboyev rasmi" loading="lazy" decoding="async" width={720} height={900} />
            <div>
              <p>
                Assalomu alaykum, mening ismim <mark>Bobur Mirzo</mark> va men quyidagi faoliyatlar bilan shug&apos;ullanaman:
              </p>
              <ul>
                {BIO.map((b) => (
                  <li key={b}>{b}</li>
                ))}
                <li>
                  Xodimlarni boshqarish va biznesni tizimlashtirish bo&apos;yicha <b>10 yillik</b> tajribaga ega mutaxassis
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ───── LOYIHALAR ───── */}
        <section className="s">
          <div className="wrap">
            <h2 className="plain">
              Oxirgi yilda <b>Surxondaryo</b> viloyatida bir nechta loyihalar bilan ishladim:
            </h2>
            <div className="logos" aria-label="Loyihalar logolari">
              <div className="logos-t">
                {[...PROJECT_LOGOS, ...PROJECT_LOGOS].map((l, i) => (
                  <img key={i} src={l.src} alt={i < PROJECT_LOGOS.length ? l.alt : ""} aria-hidden={i >= PROJECT_LOGOS.length || undefined} width={118} height={118} loading="lazy" decoding="async" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── VIDEOLAR ───── */}
        <section className="s white">
          <div className="wrap">
            <h2 className="plain">
              Shu yilning o&apos;zida <b>ikki oy</b> davomida <b>Denov</b> tumanida tadbirkorlar uchun o&apos;quv kursi tashkil etib, ular bilan
              konsultant sifatida ishladim
            </h2>
            <VideoCarousel />
          </div>
        </section>

        {/* ───── MUAMMOLAR ───── */}
        <section className="s">
          <div className="wrap">
            <h2>Va, Surxondaryo tadbirkorlarida quyidagi umumiy muammolarni ko&apos;rdim:</h2>
            <ul className="prob">
              {PROBLEMS.map((p, i) => (
                <li key={p.title}>
                  <div className="num">{i + 1}</div>
                  <div>
                    <b>{p.title}</b>
                    <span>{p.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───── KIMLAR UCHUN ───── */}
        <section className="s band">
          <div className="wrap">
            <h2 className="plain">
              Surxondaryoda faqat <b>TADBIRKOR</b> va <b>BIZNES EGALARI</b> uchun 1 kunlik intensiv-trening tashkil qilyapmiz.
            </h2>
            <p className="cap">SODDA, ANIQ va LO&apos;NDA tilda.</p>
          </div>
        </section>

        {/* ───── DASTUR ───── */}
        <section className="s white">
          <div className="wrap">
            <h2>Intensiv kun dasturi</h2>
            <p className="note">Darsning o&apos;zida o&apos;z biznesingiz uchun birinchi AI xodimni yasab chiqasiz.</p>
            <ol className="prog">
              {DAY_PROGRAM.map((p) => (
                <li key={p.time} className={p.hl ? "hl" : undefined}>
                  <time>{p.time}</time>
                  <div>
                    <b>{p.title}</b>
                    {p.text && <span>{p.text}</span>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───── FORMA ───── */}
        <section className="s buy" id="yozilish">
          <div className="wrap pay">
            <div>
              <h2>Intensiv kursda ishtirok narxi</h2>
              <div className="price">
                {PRICE.value} <small>{PRICE.currency}</small>
              </div>
              <p className="dates">{datesLine}</p>
              <p className="note">Joylar soni cheklangan. Ariza qoldiring, menejer siz bilan bog&apos;lanib, aniq manzilni aytadi.</p>
            </div>
            <div>
              <LeadForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap">
          Bobur Mirzo Akademiyasi · <a href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a>
        </div>
      </footer>

      <BottomBar price={`${PRICE.value} ${PRICE.currency}`} />
    </>
  );
}
