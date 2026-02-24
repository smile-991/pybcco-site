import { Button } from "@/components/ui/button";

const PDF_URL = "/profile/profile-25.pdf";
const PHONE_TEL = "+966550604837";
const PHONE_TEXT = "0550604837";

export default function ProfileQR() {
  return (
    <section className="pt-6 pb-14">
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
            <a href={PDF_URL} target="_blank" rel="noreferrer">
              <Button className="w-full h-12 text-base font-bold">
                تحميل Company Profile PDF
              </Button>
            </a>

            <a href={`tel:${PHONE_TEL}`}>
              <Button variant="outline" className="w-full h-12 text-base font-bold">
                اتصال مباشر: {PHONE_TEXT}
              </Button>
            </a>

            <a
              href="https://wa.me/966550604837?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A8%D8%B1%D9%88%D9%81%D8%A7%D9%8A%D9%84%20%D8%A7%D9%84%D8%B4%D8%B1%D9%83%D8%A9%20%D9%88%D8%B9%D8%B1%D8%B6%20%D8%B3%D8%B9%D8%B1."
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="outline" className="w-full h-12 text-base font-bold">
                واتساب سريع
              </Button>
            </a>

            <a href="https://www.pybcco.com" target="_blank" rel="noreferrer">
              <Button variant="ghost" className="w-full h-12 text-base font-bold">
                زيارة الموقع الكامل
              </Button>
            </a>
          </div>

          <div className="mt-6 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} PYBCCO
          </div>
        </div>
      </div>
    </section>
  );
}