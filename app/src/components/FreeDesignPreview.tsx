import { ArrowLeft, CheckCircle2, ImagePlus, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_FREE_DESIGN =
  "https://wa.me/966550604837?text=" +
  encodeURIComponent(
    "السلام عليكم، أريد تصميم مبدئي مجاني لجدار تلفزيون/مدخل باستخدام بديل الخشب أو بديل الرخام. سأرسل صورة الجدار والمقاسات التقريبية."
  );

const STEPS = [
  "أرسل صورة الجدار أو المساحة",
  "نقترح توزيع بديل الخشب/الرخام والإنارة",
  "نرسل تصورًا مبدئيًا مع عرض سعر للتوريد والتركيب",
];

export default function FreeDesignPreview({ compact = false }: { compact?: boolean }) {
  return (
    <section
      dir="rtl"
      className={[
        compact ? "mt-10" : "mt-14",
        "rounded-[2rem] overflow-hidden border border-gray-200 bg-white shadow-sm",
      ].join(" ")}
    >
      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-0">
        <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-gold/15 px-4 py-2 text-sm font-extrabold text-gray-900">
            <Sparkles className="h-4 w-4 text-gold" />
            خدمة مجانية للطلبات الجادة داخل الرياض
          </div>

          <h2 className="mt-5 text-2xl md:text-3xl font-extrabold text-gray-950 leading-tight">
            أرسل صورة الجدار وخذ تصورًا مبدئيًا مجانيًا قبل التنفيذ
          </h2>

          <p className="mt-4 text-gray-650 leading-relaxed text-[15px] md:text-base">
            إذا عندك جدار تلفزيون، مدخل، أو صالة وتفكر ببديل الخشب أو بديل الرخام،
            نجهز لك تصورًا أوليًا يساعدك تتخيل النتيجة قبل طلب التوريد والتركيب.
          </p>

          <div className="mt-6 grid gap-3">
            {STEPS.map((step) => (
              <div key={step} className="flex items-start gap-3 text-gray-750">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span className="font-semibold leading-relaxed">{step}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-gray-50 border border-gray-200 p-4 text-sm text-gray-600 leading-relaxed">
            ملاحظة مهمة: الصورة المعروضة هي <span className="font-extrabold text-gray-900">تصور تصميمي مبدئي</span> وليست صورة تنفيذ نهائي،
            ويتم اعتماد التفاصيل النهائية بعد المقاسات والمعاينة واختيار المواد.
          </div>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Button asChild className="bg-gold hover:bg-gold/90 text-black font-extrabold h-11 px-5">
              <a href={WHATSAPP_FREE_DESIGN} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                اطلب التصميم المبدئي
              </a>
            </Button>

            <Button asChild variant="outline" className="font-bold h-11 px-5">
              <a href="/decor/wood">
                شاهد بديل الخشب
                <ArrowLeft className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="bg-gray-950 p-4 md:p-5 lg:p-6">
          <div className="grid grid-cols-2 gap-3 h-full min-h-[390px]">
            <figure className="relative overflow-hidden rounded-3xl bg-gray-900">
              <img
                src="/decor/free-design/tv-wall-before.webp"
                alt="جدار تلفزيون قبل التصميم المبدئي"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <figcaption className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-gray-950 shadow-sm">
                قبل
              </figcaption>
            </figure>

            <figure className="relative overflow-hidden rounded-3xl bg-gray-900">
              <img
                src="/decor/free-design/tv-wall-concept.webp"
                alt="تصور تصميمي مبدئي لجدار تلفزيون باستخدام بديل الخشب وبديل الرخام"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <figcaption className="absolute top-3 right-3 rounded-full bg-gold px-3 py-1 text-xs font-extrabold text-black shadow-sm">
                تصور مبدئي
              </figcaption>
            </figure>
          </div>

          <div className="mt-4 flex items-center gap-2 text-white/80 text-sm">
            <ImagePlus className="h-4 w-4 text-gold" />
            مثال توضيحي لتحويل صورة عادية إلى تصور قابل للنقاش قبل التنفيذ.
          </div>
        </div>
      </div>
    </section>
  );
}
