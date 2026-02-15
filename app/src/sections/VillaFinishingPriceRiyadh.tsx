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

    </div>
  );
}
