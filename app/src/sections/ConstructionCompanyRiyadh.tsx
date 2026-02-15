import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ConstructionCompanyRiyadh() {
  useEffect(() => {
    document.title = "شركة مقاولات بالرياض | تنفيذ وتشطيب وترميم - بنيان الهرم";

    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content =
      "شركة بنيان الهرم للمقاولات بالرياض: تنفيذ مشاريع، تشطيب فلل وشقق تسليم مفتاح، ترميم وصيانة، بناء عظم، وإشراف هندسي كامل. أسعار تنافسية والتزام بالمواعيد. تواصل الآن.";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      {/* HERO */}
      <section className="container mx-auto px-4 pt-24 pb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gold text-center">
          شركة مقاولات بالرياض لتنفيذ المشاريع والتشطيب والترميم باحتراف
        </h1>

        <p className="mt-6 text-lg text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
          <a href="/" className="text-gold font-bold hover:underline">
  شركة بنيان الهرم للمقاولات
</a>

          مقاولات في الرياض تقدم حلول تنفيذ متكاملة تشمل{" "}
          <a href="/villa-finishing-riyadh" className="text-gold font-bold hover:underline">
  تشطيب الفلل والشقق
</a>
،{" "}
<a href="/villa-renovation-riyadh" className="text-gold font-bold hover:underline">
  الترميم والصيانة
</a>
،{" "}
<a href="/villa-bone-construction-riyadh" className="text-gold font-bold hover:underline">
  بناء العظم
</a>

        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            className="bg-gold text-black font-bold px-8 py-6 text-lg"
            onClick={() => (window.location.href = "tel:+966550604837")}
          >
            اتصال مباشر
          </Button>

          

          <Button
            variant="secondary"
            className="bg-white text-black font-bold px-8 py-6 text-lg"
            onClick={() => (window.location.href = "https://wa.me/966550604837?text=أرغب%20بـ%20طلب%20معاينة%20مجانية%20لمشروع%20في%20الرياض")}
          >
            طلب معاينة مجانية
          </Button>
        </div>
      </section>

      {/* TRUST CARDS */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-right">
          {[
            {
              title: "إشراف هندسي كامل",
              desc: "مهندسون ومراقبون لمتابعة التنفيذ وضبط الجودة خطوة بخطوة.",
            },
            {
              title: "تنفيذ تسليم مفتاح",
              desc: "من البداية حتى التسليم النهائي بدون تشتيت بين عدة مقاولين.",
            },
            {
              title: "التزام بالمواعيد",
              desc: "خطة عمل واضحة وتقارير متابعة لتسليم المشروع ضمن الجدول.",
            },
            {
              title: "أسعار تنافسية",
              desc: "خيارات متعددة تناسب ميزانية العميل مع جودة تنفيذ عالية.",
            },
          ].map((x, i) => (
            <div
              key={i}
              className="bg-white/5 p-6 rounded-2xl border border-gold/20"
            >
              <h3 className="text-xl font-bold text-gold mb-3">{x.title}</h3>
              <p className="text-white/80 leading-relaxed">{x.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          خدمات <span className="text-gold">شركة مقاولات بالرياض</span>
        </h2>

        <p className="mt-4 text-white/70 text-center max-w-3xl mx-auto">
          نقدم مجموعة خدمات متكاملة لعملاء الرياض، سكني وتجاري، مع جودة تنفيذ
          عالية وإدارة مشروع محترفة.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "تشطيب فلل وشقق (دهانات، جبس، أرضيات، أبواب، إضاءة)",
            "تشطيب خارجي وواجهات",
            "ترميم فلل ومباني + معالجة التشققات والرطوبة",
            "بناء عظم (حسب المخططات والمواصفات)",
            "أعمال خرسانات وبنية تحتية (حسب نطاق المشروع)",
            "إدارة المشروع + توريد مواد حسب رغبة العميل",
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="text-white/85 leading-relaxed">{item}</div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          صفحات مهمة <span className="text-gold">لخدماتنا</span>
        </h2>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  <a
    href="/villa-finishing-riyadh"
    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-gold/40 transition"
  >
    <div className="text-lg font-bold text-gold">تشطيب فلل بالرياض</div>
    <div className="mt-2 text-white/70">
      تفاصيل التشطيب وتسليم المفتاح مع طرق تواصل مباشرة.
    </div>
  </a>

  <a
    href="/villa-renovation-riyadh"
    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-gold/40 transition"
  >
    <div className="text-lg font-bold text-gold">ترميم فلل بالرياض</div>
    <div className="mt-2 text-white/70">
      تجديد وترميم شامل ومعالجة التشققات والرطوبة وتحديث كامل حسب ميزانيتك.
    </div>
  </a>

  <a
    href="/villa-bone-construction-riyadh"
    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-gold/40 transition"
  >
    <div className="text-lg font-bold text-gold">بناء عظم بالرياض</div>
    <div className="mt-2 text-white/70">
      تنفيذ العظم حسب المخططات والمواصفات مع إشراف هندسي والتزام بالجدول الزمني.
    </div>
  </a>

  <a
    href="/apartment-finishing-riyadh"
    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-gold/40 transition"
  >
    <div className="text-lg font-bold text-gold">تشطيب شقق بالرياض</div>
    <div className="mt-2 text-white/70">
      تشطيب شقق سكنية بتصاميم عصرية وجودة عالية من البداية حتى التسليم.
    </div>
  </a>

  <a
    href="/villa-finishing-price-riyadh"
    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-gold/40 transition"
  >
    <div className="text-lg font-bold text-gold">أسعار تشطيب فلل بالرياض</div>
    <div className="mt-2 text-white/70">
      تقدير تكلفة التشطيب حسب المساحة والمواد مع استشارة مجانية قبل البدء.
    </div>
  </a>

  <a
    href="/home-renovation-company-riyadh"
    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-gold/40 transition"
  >
    <div className="text-lg font-bold text-gold">مقاول ترميم منازل بالرياض</div>
    <div className="mt-2 text-white/70">
      حلول ترميم المنازل وإعادة التأهيل بإدارة هندسية متكاملة حتى التسليم.
    </div>
  </a>
</div>

      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 pb-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          أسئلة شائعة عن <span className="text-gold">شركة مقاولات بالرياض</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              q: "هل تقدمون معاينة مجانية داخل الرياض؟",
              a: "نعم، حسب موقع المشروع ونطاق العمل، ونرتب زيارة ومعاينة ثم عرض سعر واضح.",
            },
            {
              q: "هل عندكم إشراف هندسي ومراقبين؟",
              a: "نعم، لدينا فريق إشراف لضبط الجودة والمواد والتنفيذ والالتزام بالمخططات.",
            },
            {
              q: "هل تقدمون تسليم مفتاح؟",
              a: "نعم، من إدارة المشروع حتى التسليم النهائي، ويمكن الاتفاق مع توريد مواد أو بدون.",
            },
            {
              q: "كم مدة التنفيذ عادة؟",
              a: "تختلف حسب حجم المشروع ونوع التشطيب. نضع جدول زمني واضح قبل البدء.",
            },
          ].map((x, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="text-lg font-bold text-gold">{x.q}</div>
              <div className="mt-2 text-white/75 leading-relaxed">{x.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container mx-auto px-4 pb-20">
        <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold">جاهز تبدأ مشروعك في الرياض؟</h3>
          <p className="mt-3 text-white/70">
            تواصل معنا الآن، وخذ استشارة أولية، ونرتّب معاينة مجانية ونقدّم عرض
            سعر مناسب.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gold text-black font-bold px-8 py-6 text-lg"
              onClick={() => (window.location.href = "tel:+966550604837")}
            >
              اتصال
            </Button>

            <Button
              variant="outline"
              className="border-white/30 text-white px-8 py-6 text-lg"
              onClick={() => (window.location.href = "https://wa.me/966550604837")}
            >
              واتساب
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
