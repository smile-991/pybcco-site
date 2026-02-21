import { Link, useLocation } from "react-router-dom";
import SeoHead from "@/components/SeoHead";

export default function NotFound() {
  const loc = useLocation();
  const canonical = `https://pybcco.com${loc.pathname || "/"}`;

  return (
    <main dir="rtl" className="pt-28 pb-16 bg-white">
      <SeoHead
        title="الصفحة غير موجودة | بنيان الهرم للمقاولات"
        description="الصفحة المطلوبة غير موجودة. يمكنك العودة للصفحة الرئيسية أو التواصل معنا مباشرة."
        canonical={canonical}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "404 - الصفحة غير موجودة",
          url: canonical,
        }}
      />

      <div className="container-custom">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-extrabold text-gray-900">الصفحة غير موجودة</h1>
          <p className="mt-3 text-gray-600 leading-8">
            يبدو أن الرابط غير صحيح أو تم تغيير الصفحة.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/"
              className="px-5 py-3 rounded-xl bg-gold text-black font-bold hover:bg-gold/90 transition"
            >
              العودة للرئيسية
            </Link>

            <a
              href="https://wa.me/966550604837"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-black text-white font-bold hover:bg-black/90 transition"
            >
              تواصل واتساب
            </a>

            <a
              href="tel:+966550604837"
              className="px-5 py-3 rounded-xl border border-gray-200 text-gray-900 font-bold hover:bg-gray-50 transition"
            >
              اتصال
            </a>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            الرابط الحالي: <span dir="ltr">{loc.pathname}</span>
          </p>
        </div>
      </div>
    </main>
  );
}