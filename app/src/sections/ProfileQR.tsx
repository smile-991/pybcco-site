import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";

const SITE = "https://www.pybcco.com";
const PDF_URL = "/company-profile.pdf"; // موجود داخل public

export default function ProfileQR() {
  const track = (event: string) => {
    try {
      // GA4 عبر gtag (إذا مركّبه)
      // @ts-ignore
      if (typeof window !== "undefined" && window.gtag) {
        // @ts-ignore
        window.gtag("event", event, { page: "profile_qr" });
      }
    } catch {}
  };

  const onDownload = () => track("profile_pdf_download");
  const onCall = () => track("profile_call_click");
  const onWhatsApp = () => track("profile_whatsapp_click");
  const onWebsite = () => track("profile_website_click");

  return (
    <main dir="rtl" className="min-h-screen bg-white">
      <SeoHead
        title="بروفايل الشركة | بنيان الهرم للمقاولات"
        description="تحميل بروفايل شركة بنيان الهرم للمقاولات (PYBCCO) + تواصل مباشر."
        canonical={`${SITE}/profile`}
      />

      <section className="pt-28 pb-14">
        <div className="container-custom max-w-2xl">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 md:p-8">
            <div className="text-center">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-gray-900/5 flex items-center justify-center">
                <span className="text-xl font-black text-gray-900">PY</span>
              </div>

              <h1 className="mt-4 text-2xl md:text-3xl font-extrabold text-gray-900">
                بروفايل الشركة
              </h1>

              <p className="mt-2 text-gray-600 leading-relaxed">
                بنيان الهرم للمقاولات — الرياض
                <br />
                حمّل البروفايل أو تواصل معنا مباشرة.
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              <a href={PDF_URL} download onClick={onDownload}>
                <Button className="w-full h-12 text-base font-bold">
                  تحميل Company Profile PDF
                </Button>
              </a>

              <a href="tel:+966550604837" onClick={onCall}>
                <Button variant="outline" className="w-full h-12 text-base font-bold">
                  اتصال مباشر: 0550604837
                </Button>
              </a>

              <a
                href="https://wa.me/966550604837?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A8%D8%B1%D9%88%D9%81%D8%A7%D9%8A%D9%84%20%D8%A7%D9%84%D8%B4%D8%B1%D9%83%D8%A9%20%D9%88%D8%B9%D8%B1%D8%B6%20%D8%B3%D8%B9%D8%B1."
                target="_blank"
                rel="noreferrer"
                onClick={onWhatsApp}
              >
                <Button variant="outline" className="w-full h-12 text-base font-bold">
                  واتساب سريع
                </Button>
              </a>

              <a href={SITE} target="_blank" rel="noreferrer" onClick={onWebsite}>
                <Button variant="ghost" className="w-full h-12 text-base font-bold">
                  زيارة الموقع الكامل
                </Button>
              </a>
            </div>

            <div className="mt-6 text-center text-xs text-gray-400">
              © {new Date().getFullYear()} PYBCCO — Bunian AlHaram Contracting
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}