import Image from "next/image";
import LeadForm from "@/components/LeadForm";
import { EVENT } from "@/lib/content";

export default function Home() {
  return (
    <main>
      {/* ───── NAV ───── */}
      <header className="nav">
        <div className="wrap nav__in">
          <a href="#" className="brand" aria-label="Bobur Mirzo Akademiyasi">
            <Image src="/logo.png" alt="Bobur Mirzo Akademiyasi" width={147} height={256} className="brand__logo" priority />
          </a>
        </div>
      </header>

      {/* ───── HERO + FORMA ───── */}
      <section className="hero" id="royxat">
        <div className="hero__glow" aria-hidden />
        <div className="wrap hero__in">
          <div className="hero__copy">
            <h1>
              <span>AI xodimlar</span> orqali biznesni <em>oson boshqaring</em>
            </h1>
            <p className="lead">{EVENT.subtitle}</p>
            <span className="chip">Intensiv kurs · {EVENT.region}</span>
          </div>

          <div className="reg__card">
            <h3>Joyingizni band qiling</h3>
            <p className="muted">Ma&apos;lumot qoldiring — menejerimiz qo&apos;ng&apos;iroq qilib, manzil va shartlarni aytadi.</p>
            <LeadForm />
          </div>
        </div>
      </section>
    </main>
  );
}
