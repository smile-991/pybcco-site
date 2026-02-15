import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function HomeRenovationCompanyRiyadh() {
  useEffect(() => {
    document.title = "شركة ترميم منازل بالرياض | تجديد وصيانة شاملة - بنيان الهرم";

    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content =
      "شركة ترميم منازل بالرياض تقدم خدمات تجديد شامل، إصلاح تشققات، دهانات، جبس، سباكة وكهرباء حسب المعاينة. إشراف هندسي وجودة تنفيذ عالية.";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">

      <section className="container mx-auto px-4 pt-24 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gold">
          شركة ترميم منازل بالرياض وتجديد شامل
        </h1>

        <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          تقدم <a href="/" className="text-gold font-bold hover:underline">بنيان الهرم للمقاولات</a>
          خدمات ترميم منازل بالرياض تشمل معالجة التشققات،
          إصلاح الأضرار، تجديد الواجهات، وتحديث كامل للمنازل القديمة
          بإشراف هندسي وجودة تنفيذ عالية.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            className="bg-gold text-black font-bold px-8 py-6 text-lg"
            onClick={() => window.location.href = "tel:+966550604837"}
          >
            اتصال مباشر
          </Button>

          <Button
            variant="outline"
            className="border-white/30 text-white px-8 py-6 text-lg"
            onClick={() => window.location.href = "https://wa.me/966550604837"}
          >
            واتساب الآن
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 text-right max-w-4xl">
        <h2 className="text-2xl font-bold text-gold mb-4">
          خدمات ترميم المنازل تشمل:
        </h2>

        <ul className="space-y-3 text-white/80">
          <li>✔️ إصلاح تشققات الجدران والأسقف</li>
          <li>✔️ معالجة رطوبة وتسربات</li>
          <li>✔️ تجديد دهانات وواجهات</li>
          <li>✔️ تحديث مطابخ وحمامات</li>
          <li>✔️ إعادة تأهيل كاملة حسب حالة المنزل</li>
        </ul>
      </section>
      {/* INTERNAL LINKS */}
      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          خدمات أخرى في <span className="text-gold">الرياض</span>
        </h2>

        <p className="mt-4 text-white/70 text-center max-w-3xl mx-auto">
          تفضل تصفّح صفحاتنا الأخرى المرتبطة بالتشطيب والترميم وبناء العظم:
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "شركة مقاولات بالرياض", href: "/construction-company-riyadh" },
            { title: "ترميم فلل بالرياض", href: "/villa-renovation-riyadh" },
            { title: "تشطيب فلل بالرياض", href: "/villa-finishing-riyadh" },
            { title: "أسعار تشطيب فلل بالرياض", href: "/villa-finishing-price-riyadh" },
            { title: "تشطيب شقق بالرياض", href: "/apartment-finishing-riyadh" },
            { title: "بناء عظم بالرياض", href: "/villa-bone-construction-riyadh" },
          ].map((x, i) => (
            <a
              key={i}
              href={x.href}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition text-right"
            >
              <div className="text-lg font-bold text-gold">{x.title}</div>
              <div className="mt-1 text-white/70 text-sm">اضغط لعرض التفاصيل</div>
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}
