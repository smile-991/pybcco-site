import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function VillaFinishingPriceRiyadh() {

  useEffect(() => {
    document.title = "سعر تشطيب المتر بالرياض 2026 | بنيان الهرم";

    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content =
      "تعرف على سعر تشطيب المتر في الرياض 2026. أسعار تبدأ من 450 ريال للمتر حسب مستوى المواد. شركة بنيان الهرم للمقاولات.";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">

      <section className="container mx-auto px-4 pt-24 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gold">
          سعر تشطيب المتر بالرياض 2026
        </h1>

        <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          يبدأ سعر تشطيب المتر في الرياض من 
          <span className="text-gold font-bold"> 450 ريال للمتر</span>
          ويختلف السعر حسب مستوى المواد ونوع التشطيب
          (اقتصادي – متوسط – فاخر).
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            className="bg-gold text-black font-bold px-8 py-6 text-lg"
            onClick={() => window.location.href = "tel:+966550604837"}
          >
            اتصال مباشر
          </Button>

        </div>
      </section>

      <section className="container mx-auto px-4 py-14 text-right max-w-4xl">
        <h2 className="text-2xl font-bold text-gold mb-4">
          ما الذي يؤثر على سعر التشطيب؟
        </h2>

        <ul className="space-y-3 text-white/80">
          <li>✔️ نوع الأرضيات (بورسلان – رخام – باركيه)</li>
          <li>✔️ نوع الدهانات والعزل</li>
          <li>✔️ مستوى الأسقف الجبسية والإضاءة</li>
          <li>✔️ عدد دورات المياه والمطابخ</li>
          <li>✔️ مستوى التشطيب المطلوب</li>
        </ul>
      </section>
      {/* INTERNAL LINKS */}
      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          صفحات مهمة <span className="text-gold">لخدماتنا</span>
        </h2>

        <p className="mt-4 text-white/70 text-center max-w-3xl mx-auto">
          إذا بدك تشطيب أو ترميم أو بناء عظم في الرياض، تفضل صفحاتنا التالية:
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "شركة مقاولات بالرياض", href: "/construction-company-riyadh" },
            { title: "تشطيب فلل بالرياض", href: "/villa-finishing-riyadh" },
            { title: "ترميم فلل بالرياض", href: "/villa-renovation-riyadh" },
            { title: "تشطيب شقق بالرياض", href: "/apartment-finishing-riyadh" },
            { title: "بناء عظم بالرياض", href: "/villa-bone-construction-riyadh" },
            { title: "مقاول ترميم منازل بالرياض", href: "/home-renovation-company-riyadh" },
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
