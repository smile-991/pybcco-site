import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ApartmentFinishingRiyadh() {
  useEffect(() => {
    document.title = "تشطيب شقق بالرياض | تنفيذ وتسليم مفتاح - بنيان الهرم";

    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content =
      "شركة بنيان الهرم تقدم خدمات تشطيب شقق بالرياض تسليم مفتاح، دهانات، جبس، أرضيات، سباكة وكهرباء حسب الاتفاق. جودة عالية والتزام بالمواعيد.";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">

      <section className="container mx-auto px-4 pt-24 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gold">
          تشطيب شقق بالرياض تسليم مفتاح
        </h1>

        <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          نقدم خدمات تشطيب شقق بالرياض بجودة عالية، من الدهانات والأرضيات
          إلى الأسقف الجبسية والإضاءة، مع إشراف هندسي وتنفيذ منظم
          يضمن تسليم الشقة جاهزة للسكن.
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
          خدمات تشطيب الشقق تشمل:
        </h2>

        <ul className="space-y-3 text-white/80">
          <li>✔️ دهانات داخلية احترافية</li>
          <li>✔️ جبس بورد وأسقف ديكورية</li>
          <li>✔️ تركيب أرضيات (بورسلان – باركيه – رخام)</li>
          <li>✔️ أعمال سباكة وكهرباء حسب الاتفاق</li>
          <li>✔️ تجهيز كامل وتسليم مفتاح</li>
        </ul>
      </section>

    </div>
  );
}
