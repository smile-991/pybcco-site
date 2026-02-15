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
  className="bg-gold text-black font-bold px-8 py-6 text-lg hover:opacity-90 transition"
  onClick={() => window.location.href = "https://wa.me/966556064837"}
>
  واتساب الآن
</Button>

        </div>
            </section>

      {/* INTERNAL LINKS */}
      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          خدمات أخرى في <span className="text-gold">الرياض</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a href="/construction-company-riyadh" className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition text-right">
            <div className="text-lg font-bold text-gold">شركة مقاولات بالرياض</div>
          </a>

          <a href="/villa-finishing-riyadh" className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition text-right">
            <div className="text-lg font-bold text-gold">تشطيب فلل بالرياض</div>
          </a>

          <a href="/villa-bone-construction-riyadh" className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition text-right">
            <div className="text-lg font-bold text-gold">بناء عظم بالرياض</div>
          </a>
        </div>
      </section>

    </div>
  );
}
