import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { Calculator, ClipboardCheck, Hammer, ArrowLeft } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/966550604837?text=" +
  encodeURIComponent(
    "السلام عليكم، أريد استشارة مبدئية بخصوص مشروع ترميم أو تشطيب داخل الرياض."
  );

export default function RenovationRoiInternalPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-neutral-950 text-white">
      <SeoHead
        title="أداة داخلية لتقييم جدوى الترميم | بنيان الهرم للمقاولات"
        description="صفحة داخلية غير مفهرسة لاختبار أفكار تقييم جدوى الترميم والتشطيب قبل تحويلها إلى صفحة عامة داخل موقع بنيان الهرم للمقاولات."
        canonical="https://pybcco.com/internal/renovation-roi-test"
        robots="noindex,nofollow"
      />

      <section className="relative overflow-hidden border-b border-white/10 px-6 py-20 sm:px-10 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,184,0,0.20),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-bold text-yellow-300">
            <Calculator className="h-4 w-4" />
            صفحة اختبار داخلية
          </div>

          <h1 className="max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
            تقييم مبدئي لجدوى الترميم والتشطيب قبل اتخاذ القرار
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-9 text-neutral-300">
            هذه الصفحة مخصصة للاختبار الداخلي ولا تظهر في نتائج البحث. الهدف منها
            تجربة محتوى يمكن استخدامه لاحقًا لتوضيح متى يكون الترميم مجديًا، ومتى
            تكون إعادة التشطيب أو إعادة التوزيع أفضل من الحلول الجزئية.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="bg-yellow-400 text-black hover:bg-yellow-300">
              <a href={WHATSAPP_URL}>طلب استشارة مبدئية</a>
            </Button>
            <Button asChild variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
              <a href="/offers">
                <ArrowLeft className="ml-2 h-4 w-4" />
                العودة إلى العروض
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-6 py-12 sm:px-10 lg:grid-cols-3 lg:px-16">
        {[
          {
            icon: Hammer,
            title: "حالة المبنى",
            text: "هل المشكلة تجميلية فقط، أم مرتبطة بالعزل، الكهرباء، السباكة، أو الواجهة؟",
          },
          {
            icon: ClipboardCheck,
            title: "نطاق العمل",
            text: "كلما كان النطاق واضحًا من البداية، قلت المفاجآت أثناء التنفيذ وتحسنت دقة السعر.",
          },
          {
            icon: Calculator,
            title: "العائد من الترميم",
            text: "الترميم الجيد لا يرفع الشكل فقط، بل يحسن قابلية الاستخدام وقيمة العقار وثقة المستأجر أو المشتري.",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-black">{item.title}</h2>
              <p className="mt-3 leading-8 text-neutral-300">{item.text}</p>
            </article>
          );
        })}
      </section>
    </main>
  );
}
