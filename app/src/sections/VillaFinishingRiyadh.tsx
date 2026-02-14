import { useEffect } from "react";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import { Button } from "@/components/ui/button";

export default function VillaFinishingRiyadh() {
  useEffect(() => {
    document.title = "تشطيب فلل بالرياض | شركة بنيان الهرم للمقاولات";
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden pt-24">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </div>

        <div className="relative container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
              تشطيب فلل بالرياض <span className="text-gold">تسليم مفتاح</span>
            </h1>
            <p className="mt-5 text-white/80 text-base sm:text-lg leading-relaxed">
              تشطيب داخلي وخارجي باحترافية عالية، إشراف مهندسين ومراقبين، عمالة على الكفالة،
              وأسعار مرنة حسب المواد ورغبة العميل بالدفع.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                className="bg-gold text-black font-bold px-8 py-6 text-lg"
                onClick={() => window.location.href = "tel:+966550604837"}
              >
                اتصل الآن
              </Button>

              <Button
                variant="outline"
                className="border-white/30 text-white px-8 py-6 text-lg"
                onClick={() => window.location.href = "https://wa.me/966550604837"}
              >
                واتساب
              </Button>
            </div>

            <div className="mt-6 text-sm text-white/60">
              يبدأ سعر التشطيب غالبًا من <span className="text-white font-bold">450 ريال/م²</span> ويزيد حسب المواد والمستوى.
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="container mx-auto px-4 py-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          لماذا <span className="text-gold">بنيان الهرم</span>؟
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "تسليم مفتاح", desc: "من العظم إلى التشطيب النهائي وتسليم جاهز للسكن." },
            { title: "عمالة على الكفالة", desc: "استقرار وجودة تنفيذ بدون مفاجآت وتبديل مستمر." },
            { title: "إشراف هندسي", desc: "مهندسون ومراقبون لضبط الجودة والالتزام." },
            { title: "أسعار مرنة", desc: "خيارات متعددة حسب المواد ورغبة العميل." },
            { title: "سرعة وتنظيم", desc: "خطة زمنية واضحة وتقارير متابعة." },
            { title: "جودة تشطيب عالية", desc: "تفاصيل تنفيذ نظيفة ومعايير تشطيب ممتازة." },
          ].map((x, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="text-lg font-bold">{x.title}</div>
              <div className="mt-2 text-white/70 leading-relaxed">{x.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          خدماتنا في <span className="text-gold">تشطيب الفلل</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "تشطيب داخلي كامل (دهانات، جبس، أرضيات، أبواب)",
            "تشطيب خارجي وواجهات",
            "ترميم وصيانة الفلل والمباني",
            "أعمال سباكة وكهرباء وتكييف (حسب الاتفاق)",
            "إدارة كامل المشروع + توريد مواد حسب رغبة العميل",
            "تسليم مفتاح مع إشراف هندسي",
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-white/80">{item}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-20">
        <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold">جاهز تبدأ تشطيب فيلتك؟</h3>
          <p className="mt-3 text-white/70">
            تواصل معنا، ونرتب زيارة ومعاينة، ونقدّم عرض سعر مرن حسب مستوى المواد.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
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
        </div>
      </section>

      <Footer />
    </div>
  );
}
