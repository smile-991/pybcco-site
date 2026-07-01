import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  MessageCircle,
  Sparkles,
  X,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type FreeDesignProduct = "decor" | "wood" | "marble" | "shipboard";

type FreeDesignPreviewProps = {
  compact?: boolean;
  product?: FreeDesignProduct;
};

const PRODUCT_COPY: Record<
  FreeDesignProduct,
  {
    label: string;
    whatsAppText: string;
    productHref: string;
    productButton: string;
    description: string;
  }
> = {
  decor: {
    label: "خدمة مجانية للطلبات الجادة داخل الرياض",
    whatsAppText:
      "السلام عليكم، أريد تصميم مبدئي مجاني لجدار تلفزيون/مدخل باستخدام بدائل الديكور. سأرسل صورة الجدار والمقاسات التقريبية.",
    productHref: "/decor",
    productButton: "شاهد منتجات الديكور",
    description:
      "إذا عندك جدار تلفزيون، مدخل، أو صالة وتفكر ببديل الخشب أو بديل الرخام أو بديل الشيبورد، نجهز لك تصورًا أوليًا يساعدك تتخيل النتيجة قبل طلب التوريد والتركيب.",
  },
  wood: {
    label: "خدمة مجانية لطلبات بديل الخشب داخل الرياض",
    whatsAppText:
      "السلام عليكم، أريد تصميم مبدئي مجاني لجدار تلفزيون/مدخل باستخدام بديل الخشب PVC. سأرسل صورة الجدار والمقاسات التقريبية.",
    productHref: "/decor/wood",
    productButton: "شاهد بديل الخشب",
    description:
      "إذا عندك جدار تلفزيون، مدخل، أو صالة وتفكر ببديل الخشب مع إنارة أو دمج بديل رخام، نجهز لك تصورًا أوليًا يساعدك تتخيل النتيجة قبل طلب التوريد والتركيب.",
  },
  marble: {
    label: "خدمة مجانية لطلبات بديل الرخام داخل الرياض",
    whatsAppText:
      "السلام عليكم، أريد تصميم مبدئي مجاني لجدار تلفزيون/مدخل باستخدام بديل الرخام. سأرسل صورة الجدار والمقاسات التقريبية.",
    productHref: "/decor/marble",
    productButton: "شاهد بديل الرخام",
    description:
      "إذا عندك جدار تلفزيون، مدخل، أو صالة وتفكر ببديل الرخام مع بديل خشب أو إنارة مخفية، نجهز لك تصورًا أوليًا يساعدك تتخيل النتيجة قبل طلب التوريد والتركيب.",
  },
  shipboard: {
    label: "خدمة مجانية لطلبات بديل الشيبورد داخل الرياض",
    whatsAppText:
      "السلام عليكم، أريد تصميم مبدئي مجاني لجدار تلفزيون/مدخل باستخدام بديل الشيبورد WPC. سأرسل صورة الجدار والمقاسات التقريبية.",
    productHref: "/decor/shipboard",
    productButton: "شاهد بديل الشيبورد",
    description:
      "إذا عندك جدار تلفزيون، مدخل، أو صالة وتفكر ببديل الشيبورد WPC مع توزيع خشبي أو إنارة مخفية، نجهز لك تصورًا أوليًا يساعدك تتخيل النتيجة قبل طلب التوريد والتركيب.",
  },
};

const STEPS = [
  "أرسل صورة الجدار أو المساحة",
  "نقترح توزيع بدائل الديكور والإنارة",
  "نرسل تصورًا مبدئيًا مع عرض سعر للتوريد والتركيب",
];

const PREVIEW_IMAGES = [
  {
    src: "/decor/free-design/tv-wall-before.webp",
    label: "قبل",
    alt: "جدار تلفزيون قبل التصميم المبدئي",
  },
  {
    src: "/decor/free-design/tv-wall-concept.webp",
    label: "تصور مبدئي",
    alt: "تصور تصميمي مبدئي لجدار تلفزيون باستخدام بديل الخشب وبديل الرخام",
  },
];

export default function FreeDesignPreview({ compact = false, product = "decor" }: FreeDesignPreviewProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const copy = PRODUCT_COPY[product];

  const whatsAppUrl = useMemo(
    () => `https://wa.me/966550604837?text=${encodeURIComponent(copy.whatsAppText)}`,
    [copy.whatsAppText]
  );

  const closeLightbox = () => setLightboxIndex(null);
  const prevImg = () =>
    setLightboxIndex((current) =>
      current === null ? 0 : (current - 1 + PREVIEW_IMAGES.length) % PREVIEW_IMAGES.length
    );
  const nextImg = () =>
    setLightboxIndex((current) =>
      current === null ? 0 : (current + 1) % PREVIEW_IMAGES.length
    );

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") nextImg();
      if (e.key === "ArrowRight") prevImg();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  return (
    <section
      dir="rtl"
      className={[
        compact ? "mt-10" : "mt-14",
        "rounded-[2rem] overflow-hidden border border-gray-200 bg-white shadow-sm",
      ].join(" ")}
    >
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[10000] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white/90 hover:text-white flex items-center gap-2"
              aria-label="إغلاق"
            >
              <X className="h-6 w-6" />
              <span className="text-sm font-bold">إغلاق</span>
            </button>

            <button
              type="button"
              onClick={prevImg}
              className="absolute top-1/2 -translate-y-1/2 right-2 z-10 bg-white/10 hover:bg-white/20 text-white rounded-xl p-2"
              aria-label="الصورة السابقة"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={nextImg}
              className="absolute top-1/2 -translate-y-1/2 left-2 z-10 bg-white/10 hover:bg-white/20 text-white rounded-xl p-2"
              aria-label="الصورة التالية"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="bg-black rounded-2xl overflow-hidden border border-white/10">
              <img
                src={PREVIEW_IMAGES[lightboxIndex].src}
                alt={PREVIEW_IMAGES[lightboxIndex].alt}
                className="w-full h-[78vh] object-contain"
              />
            </div>

            <div className="mt-3 text-center text-white/80 text-sm font-semibold">
              {PREVIEW_IMAGES[lightboxIndex].label} — {lightboxIndex + 1} / {PREVIEW_IMAGES.length}
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-0">
        <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-gold/15 px-4 py-2 text-sm font-extrabold text-gray-900">
            <Sparkles className="h-4 w-4 text-gold" />
            {copy.label}
          </div>

          <h2 className="mt-5 text-2xl md:text-3xl font-extrabold text-gray-950 leading-tight">
            أرسل صورة الجدار وخذ تصورًا مبدئيًا مجانيًا قبل التنفيذ
          </h2>

          <p className="mt-4 text-gray-700 leading-relaxed text-[15px] md:text-base">
            {copy.description}
          </p>

          <div className="mt-6 grid gap-3">
            {STEPS.map((step) => (
              <div key={step} className="flex items-start gap-3 text-gray-750">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span className="font-semibold leading-relaxed">{step}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-gray-50 border border-gray-200 p-4 text-sm text-gray-650 leading-relaxed">
            ملاحظة مهمة: الصورة المعروضة هي <span className="font-extrabold text-gray-900">تصور تصميمي مبدئي</span> وليست صورة تنفيذ نهائي،
            ويتم اعتماد التفاصيل النهائية بعد المقاسات والمعاينة واختيار المواد.
          </div>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Button asChild className="bg-gold hover:bg-gold/90 text-black font-extrabold h-11 px-5">
              <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                اطلب التصميم المبدئي
              </a>
            </Button>

            <Button asChild variant="outline" className="font-bold h-11 px-5">
              <a href={copy.productHref}>
                {copy.productButton}
                <ArrowLeft className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="bg-gray-950 p-4 md:p-5 lg:p-6 flex flex-col gap-4">
          <div className="rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-white/90 text-sm font-bold flex items-center gap-2">
            <ImagePlus className="h-4 w-4 text-gold" />
            اضغط على الصورة لتكبيرها — المثال للتوضيح قبل التنفيذ.
          </div>

          <div className="grid grid-cols-2 gap-3 min-h-[360px] md:min-h-[420px] flex-1">
            {PREVIEW_IMAGES.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="group relative overflow-hidden rounded-3xl bg-gray-900 text-right cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-gray-950"
                aria-label={`تكبير صورة ${image.label}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className={[
                    "absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-extrabold shadow-sm",
                    index === 0 ? "bg-white/90 text-gray-950" : "bg-gold text-black",
                  ].join(" ")}
                >
                  {image.label}
                </span>
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-3 py-1 text-xs font-bold text-white opacity-0 transition group-hover:opacity-100">
                  <ZoomIn className="h-3.5 w-3.5" />
                  تكبير
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
