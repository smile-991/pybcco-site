import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";

const SITE_URL = "https://pybcco.com";

export default function Decor() {
  const canonical = `${SITE_URL}/decor`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE_URL + "/" },
      { "@type": "ListItem", position: 2, name: "المتجر", item: canonical },
    ],
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "المتجر | PYBCCO",
    url: canonical,
  };

  return (
    <main dir="rtl" className="bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <SeoHead
        title="المتجر | بنيان الهرم للمقاولات"
        description="مواد ديكورية محلية بالرياض: بديل خشب، بديل رخام، بديل شيبورد — توريد أو توريد + تركيب."
        canonical={canonical}
        jsonLd={[breadcrumbJsonLd, collectionJsonLd]}
      />

      <section className="pt-28 pb-12">
        <div className="container-custom">
          <h1 className="text-3xl font-extrabold text-gray-900">المتجر</h1>
          <p className="mt-3 text-gray-600 max-w-2xl">
            مواد ديكورية محلية داخل الرياض — أسعار واضحة + طلب سريع واتساب — مع خيار توريد + تركيب بإشراف مقاول.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* ===== بديل الخشب ===== */}
            <a href="/decor/wood" className="relative rounded-2xl overflow-hidden shadow-lg group h-44">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: "url('/decor/wood/F4B.webp')" }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition" />

              <div className="absolute top-4 right-4 z-10">
                <span className="text-[11px] px-2 py-1 rounded-full bg-gold/90 text-black font-extrabold whitespace-nowrap">
                  الأكثر طلباً
                </span>
              </div>

              <div className="relative p-6 text-white flex flex-col justify-end h-full">
                <div className="text-xl font-extrabold">بديل الخشب</div>
                <div className="text-sm mt-1 opacity-90">ألواح PVC — توريد + تركيب</div>
              </div>
            </a>

            {/* ===== بديل الرخام ===== */}
            <a href="/decor/marble" className="relative rounded-2xl overflow-hidden shadow-lg group h-44">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: "url('/decor/marble/K1.webp')" }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition" />

              <div className="relative p-6 text-white flex flex-col justify-end h-full">
                <div className="text-xl font-extrabold">بديل الرخام</div>
                <div className="text-sm mt-1 opacity-90">ألواح 290×120 — توريد + تركيب</div>
              </div>
            </a>

            {/* ===== بديل شيبورد ===== */}
            <a href="/decor/shipboard" className="relative rounded-2xl overflow-hidden shadow-lg group h-44">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: "url('/decor/shipboard/22A.webp')" }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition" />

              <div className="relative p-6 text-white flex flex-col justify-end h-full">
                <div className="text-xl font-extrabold">بديل شيبورد</div>
                <div className="text-sm mt-1 opacity-90">ألواح WPC — توريد + تركيب</div>
              </div>
            </a>
          </div>

          <div className="mt-10">
            <Button asChild className="bg-gold hover:bg-gold/90 text-black font-bold">
              <a href="https://wa.me/966550604837?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%B9%D8%B1%D8%B6%20%D8%B3%D8%B9%D8%B1%20%D9%84%D9%85%D9%88%D8%A7%D8%AF%20%D8%AF%D9%8A%D9%83%D9%88%D8%B1%20%D9%85%D9%86%20%D9%85%D8%AA%D8%AC%D8%B1%20PYBCCO">
                طلب عبر واتساب
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}