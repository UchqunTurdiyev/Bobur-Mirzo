import Script from "next/script";
import { SITE_BODY } from "@/lib/site-body";

export default function Page() {
  return (
    <>
      <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: SITE_BODY }} />
      <Script src="/aj/site.js" strategy="afterInteractive" />
    </>
  );
}
