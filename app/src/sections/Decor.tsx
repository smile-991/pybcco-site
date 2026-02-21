import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";

export default function Decor() {
  return (
    <main dir="rtl" className="min-h-screen bg-white">
      <SeoHead
        title="المتجر | بنيان الهرم للمقاولات"
        description="مواد ديكورية محلية بالرياض: بديل خشب، بديل رخام، بانوهات، صفائح حجرية — توريد أو توريد + تركيب."
        canonical="https://pybcco.com/decor"
      />

      <section className="pt-28 pb-12">
        <div className="container-custom">
          <h1 className="text-3xl font-extrabold text-gray-900">المتجر</h1>
          <p className="mt-3 text-gray-600 max-w-2xl">
            مواد ديكورية محلية داخل الرياض — أسعار واضحة + طلب سريع واتساب — مع خيار توريد + تركيب بإشراف مقاول.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a href="/decor/wood" className="rounded-2xl border p-5 hover:shadow-md transition">
              <div className="font-bold text-lg">بديل الخشب</div>
              <div className="text-sm text-gray-600 mt-1">ألواح PVC — توريد + تركيب</div>
            </a>

            <div className="rounded-2xl border p-5 opacity-60">
              <div className="font-bold text-lg">بديل الرخام</div>
              <div className="text-sm text-gray-600 mt-1">قريبًا</div>
            </div>

            <div className="rounded-2xl border p-5 opacity-60">
              <div className="font-bold text-lg">بانوهات فوم</div>
              <div className="text-sm text-gray-600 mt-1">قريبًا</div>
            </div>
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