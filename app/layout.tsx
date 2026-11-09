import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";


const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "30 kunda AI jamoa | AI xodimlar orqali biznesni tizimlashtirish kursi",
  description:
    "Bir oyda o'z biznesingiz uchun AI xodimlar jamoasini o'z qo'lingiz bilan qurasiz. 7 dars, oflayn, kichik guruhlarda. Darslar 14-noyabrdan.",
  openGraph: {
    title: "30 kunda AI jamoa",
    description: "AI xodimlar orqali biznesni tizimlashtirish kursi. Muallif: Bobur Mirzo Yo'ldoshboyev.",
    images: ["/aj/web/cover.webp"],
    locale: "uz_UZ",
    type: "website",
  },
  icons: { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='%230b1f1a'/><text x='16' y='22' font-size='16' text-anchor='middle' fill='%23d9b46a' font-family='serif' font-weight='700'>BM</text></svg>" },
};

export const viewport: Viewport = { themeColor: "#031A16", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <head>
        <link rel="preload" as="image" href="/aj/web/cover.webp" fetchPriority="high" />
        <link rel="preload" as="font" type="font/woff2" href="/aj/fonts/oswald.woff2" crossOrigin="" />
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
