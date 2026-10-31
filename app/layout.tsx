import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@fontsource/oswald/400.css";
import "@fontsource/oswald/500.css";
import "@fontsource/oswald/600.css";
import "@fontsource/oswald/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./globals.css";


const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "AI xodimlar orqali biznesni oson boshqaring — Bobur Mirzo Yo'ldoshboyev intensivi",
  description:
    "Surxondaryo tadbirkorlari uchun 4 soatlik oflayn intensiv. Denov — 7-noyabr, Termiz — 8-noyabr, 14:00–18:00. Darsning o'zida birinchi AI xodimingizni yasab chiqasiz.",
  openGraph: {
    title: "AI xodimlar orqali biznesni oson boshqaring",
    description: "Denov — 7-noyabr · Termiz — 8-noyabr · 14:00–18:00. Spiker: Bobur Mirzo Yo'ldoshboyev.",
    images: ["/og.jpg"],
    locale: "uz_UZ",
    type: "website",
  },
  icons: { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='%230b1f1a'/><text x='16' y='22' font-size='16' text-anchor='middle' fill='%23d9b46a' font-family='serif' font-weight='700'>BM</text></svg>" },
};

export const viewport: Viewport = { themeColor: "#052D27", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        {PIXEL && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL}');fbq('track','PageView');`}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://www.facebook.com/tr?id=${PIXEL}&ev=PageView&noscript=1`} />
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}
