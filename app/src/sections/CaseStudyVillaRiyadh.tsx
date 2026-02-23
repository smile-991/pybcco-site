import { useMemo, useState } from "react";
import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Img = { src: string; alt: string; ratio?: "land" | "port" };

const SITE_URL = "https://pybcco.com";
const PAGE_PATH = "/case-study-villa-renovation-riyadh";
const CANONICAL = `${SITE_URL}${PAGE_PATH}`;

const PHONE_LOCAL = "0550604837";
const PHONE_TEL = "+966550604837";
const WA_LINK =
  "https://wa.me/966550604837?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D9%85%D8%B9%D8%A7%D9%8A%D9%86%D8%A9%20%D9%88%D8%B9%D8%B1%D8%B6%20%D8%B3%D8%B9%D8%B1%20%D9%84%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D8%AA%D8%B4%D8%B7%D9%8A%D8%A8/%D8%AA%D8%B1%D9%85%D9%8A%D9%85%20%D9%81%D9%8A%D9%84%D8%A7%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6.";

const images = {
  hero: [
    { src: "/casestudy/main.webp", alt: "قبل/بعد – واجهة الفيلا", ratio: "land" },
    { src: "/casestudy/a6.webp", alt: "النتيجة النهائية – مجلس/صالة", ratio: "land" },
  ] as Img[],
  before: [
    { src: "/casestudy/c1.webp", alt: "الحالة قبل التطوير – السطح/الخارج", ratio: "land" },
    { src: "/casestudy/b1.webp", alt: "قبل التشطيب – ممر داخلي", ratio: "port" },
    { src: "/casestudy/a1.webp", alt: "قبل – مساحة داخلية خام", ratio: "port" },
  ] as Img[],
  demo: [
    { src: "/casestudy/x1.webp", alt: "مرحلة الهدم وإعادة التشكيل – داخل", ratio: "land" },
    { src: "/casestudy/x2.webp", alt: "إزالة البلاط وتجهيز السطح – مطبخ/خدمات", ratio: "land" },
    { src: "/casestudy/a3.webp", alt: "تجهيز نيش/تفاصيل قبل الإنهاء", ratio: "port" },
    { src: "/casestudy/a4.webp", alt: "نيش/قوالب قبل التشطيب النهائي", ratio: "port" },
  ] as Img[],
  execution: [
    { src: "/casestudy/b3.webp", alt: "تنفيذ داخلي – مرحلة تجهيز", ratio: "land" },
    { src: "/casestudy/b4.webp", alt: "تنفيذ داخلي – مرحلة متقدمة", ratio: "land" },
    { src: "/casestudy/b5.webp", alt: "تفاصيل تشطيب/معالجة", ratio: "port" },
    { src: "/casestudy/c2.webp", alt: "تنفيذ خارجي – تجهيز", ratio: "land" },
    { src: "/casestudy/c3.webp", alt: "تنفيذ خارجي – هيكل", ratio: "land" },
    { src: "/casestudy/c4.webp", alt: "تنفيذ خارجي – تثبيت", ratio: "land" },
  ] as Img[],
  final: [
    { src: "/casestudy/c6.webp", alt: "النتيجة النهائية – واجهة/إضاءة", ratio: "land" },
    { src: "/casestudy/b6.webp", alt: "النتيجة النهائية – صالة حديثة", ratio: "land" },
    { src: "/casestudy/a5.webp", alt: "النتيجة النهائية – مجلس", ratio: "land" },
    { src: "/casestudy/b2.webp", alt: "النتيجة النهائية – ممر/قوس", ratio: "port" },
  ] as Img[],
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
      {children}
    </span>
  );
}

function SectionTitle({
  title,
  desc,
}: {
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">
        {title}
      </h2>
      {desc ? (
        <p className="mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

function ImageGrid({
  items,
  onOpen,
}: {
  items: Img[];
  onOpen: (img: Img) => void;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((img) => (
        <button
          key={img.src}
          type="button"
          onClick={() => onOpen(img)}
          className="group text-right"
        >
          <div
            className={[
              "relative overflow-hidden rounded-2xl border bg-white shadow-sm",
              img.ratio === "port" ? "aspect-[3/4]" : "aspect-[4/3]",
            ].join(" ")}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </div>
          <p className="mt-2 text-sm text-gray-700 line-clamp-2">{img.alt}</p>
        </button>
      ))}
    </div>
  );
}

export default function CaseStudyVillaRiyadh() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Img | null>(null);

  const openImg = (img: Img) => {
    setActive(img);
    setOpen(true);
  };

  const jsonLd = useMemo(() => {
    const allImages = [
      ...images.hero,
      ...images.before,
      ...images.demo,
      ...images.execution,
      ...images.final,
    ].map((i) => `${SITE_URL}${i.src}`);

    return [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "الرئيسية",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "معرض المشاريع",
            item: `${SITE_URL}/projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "دراسة حالة: تشطيب وتجديد فيلا – الرياض",
            item: CANONICAL,
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "دراسة حالة: تشطيب وتجديد فيلا سكنية – الرياض (قبل/بعد)",
        description:
          "دراسة حالة حقيقية لمشروع تشطيب وتجديد فيلا بالرياض: هدم وإعادة تشكيل، تشطيبات داخلية وخارجية، تفاصيل تنفيذ، والنتيجة النهائية بالصور.",
        inLanguage: "ar",
        mainEntityOfPage: CANONICAL,
        author: {
          "@type": "Organization",
          name: "بنيان الهرم للمقاولات – PYBCCO",
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "بنيان الهرم للمقاولات – PYBCCO",
          url: SITE_URL,
        },
        image: allImages.slice(0, 8),
        about: [
          "تشطيب فلل الرياض",
          "ترميم فلل الرياض",
          "تجديد فيلا",
          "تشطيبات داخلية وخارجية",
          "مقاولات الرياض",
        ],
      },
    ];
  }, []);

  return (
    <main dir="rtl" className="min-h-screen bg-white">
      <SeoHead
        title="دراسة حالة: تشطيب وتجديد فيلا سكنية – الرياض (قبل/بعد) | بنيان الهرم للمقاولات"
        description="دراسة حالة حقيقية لمشروع تشطيب وتجديد فيلا بالرياض: هدم وإعادة تشكيل، تشطيبات داخلية وخارجية، تفاصيل تنفيذ، والنتيجة النهائية بالصور."
        canonical={CANONICAL}
        jsonLd={jsonLd as any}
      />

      {/* HERO */}
      <section className="pt-28 pb-10">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              دراسة حالة: تشطيب وتجديد فيلا سكنية – الرياض (قبل/بعد)
            </h1>

            <p className="mt-4 text-gray-600 leading-relaxed">
              هذه دراسة حالة حقيقية توضح كيف تم تحويل فيلا بحالة تقليدية إلى
              مظهر عصري بتفاصيل تنفيذ دقيقة. ركّزنا على: ضبط الهوية المعمارية،
              تحسين الواجهات، وتطوير الداخل مع حلول عملية ترفع قيمة العقار.
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Pill>الرياض</Pill>
              <Pill>تشطيب + تجديد</Pill>
              <Pill>قبل/بعد بالصور</Pill>
              <Pill>إشراف هندسي</Pill>
              <Pill>تنفيذ منظم</Pill>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild className="bg-yellow-500 text-black hover:bg-yellow-400">
                <a href={WA_LINK} target="_blank" rel="noreferrer">
                  واتساب معاينة
                </a>
              </Button>

              <Button asChild variant="outline">
                <a href={`tel:${PHONE_TEL}`}>اتصال الآن: {PHONE_LOCAL}</a>
              </Button>

              <Button asChild variant="outline">
                <a href="/projects">عرض مشاريعنا</a>
              </Button>
            </div>
          </div>

          <div className="mt-10">
            <ImageGrid items={images.hero} onOpen={openImg} />
          </div>
        </div>
      </section>

      {/* ملخص سريع */}
      <section className="pb-12">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl rounded-2xl border bg-white shadow-sm p-6 md:p-8">
            <SectionTitle
              title="ملخص المشروع (Executive Summary)"
              desc="هدف المشروع كان تطوير شامل يوازن بين الشكل العصري والعملية، مع تنفيذ نظيف وتفاصيل دقيقة ونتيجة واضحة بالصور."
            />

            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-sm font-bold text-gray-900">الموقع</p>
                <p className="mt-1 text-sm text-gray-700">الرياض – السعودية</p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">نوع العمل</p>
                <p className="mt-1 text-sm text-gray-700">
                  تشطيب وتجديد (داخلي + خارجي)
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">نطاق التنفيذ</p>
                <p className="mt-1 text-sm text-gray-700">
                  هدم/إعادة تشكيل + تشطيبات + تحسين واجهات
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border bg-gray-50 p-4">
                <p className="text-sm font-extrabold text-gray-900">التحديات</p>
                <ul className="mt-2 space-y-2 text-sm text-gray-700">
                  <li>• فراغات بحاجة إعادة تشكيل لتصبح عملية وعصرية.</li>
                  <li>• تشطيبات قديمة تتطلب إزالة وتجهيز من جديد.</li>
                  <li>• الحاجة لتوحيد الهوية المعمارية للواجهة والداخل.</li>
                </ul>
              </div>
              <div className="rounded-xl border bg-gray-50 p-4">
                <p className="text-sm font-extrabold text-gray-900">الحلول</p>
                <ul className="mt-2 space-y-2 text-sm text-gray-700">
                  <li>• هدم منظم وإعادة تشكيل للفتحات/التقسيمات.</li>
                  <li>• تجهيزات دقيقة قبل التشطيب النهائي.</li>
                  <li>• تنفيذ تشطيبات داخلية وخارجية مع ضبط التفاصيل.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEFORE */}
      <section className="pb-12">
        <div className="container-custom">
          <SectionTitle
            title="الحالة قبل التطوير"
            desc="توثيق الوضع الأولي قبل البدء: مساحات خام/تشطيبات قديمة، واحتياج واضح لتطوير المعالجة والتفاصيل."
          />
          <ImageGrid items={images.before} onOpen={openImg} />
        </div>
      </section>

      {/* DEMO */}
      <section className="pb-12">
        <div className="container-custom">
          <SectionTitle
            title="مرحلة الهدم وإعادة التشكيل"
            desc="بدأنا بهدم مدروس وإعادة تشكيل لبعض العناصر لتجهيز المساحات للحلول الجديدة، مع الحفاظ على سلامة التنفيذ وتنظيم الموقع."
          />
          <ImageGrid items={images.demo} onOpen={openImg} />
        </div>
      </section>

      {/* EXECUTION */}
      <section className="pb-12">
        <div className="container-custom">
          <SectionTitle
            title="التنفيذ الفني والتفاصيل"
            desc="هنا تظهر مراحل التنفيذ (داخلي/خارجي): تجهيزات، معالجة، وتقدم العمل خطوة بخطوة وصولاً للتشطيب."
          />
          <ImageGrid items={images.execution} onOpen={openImg} />
        </div>
      </section>

      {/* FINAL */}
      <section className="pb-14">
        <div className="container-custom">
          <SectionTitle
            title="النتيجة النهائية"
            desc="النتيجة النهائية تعكس تطوير واضح في الهوية المعمارية، جودة التشطيب، وتفاصيل تعطي قيمة أعلى للمكان."
          />
          <ImageGrid items={images.final} onOpen={openImg} />

          <div className="mt-10 mx-auto max-w-4xl rounded-2xl border bg-white shadow-sm p-6 md:p-8 text-center">
            <h3 className="text-lg md:text-xl font-extrabold text-gray-900">
              هل تريد تحويل فيلتك لنفس المستوى؟
            </h3>
            <p className="mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
              نرتّب لك معاينة سريعة داخل الرياض ونقدم تصور واضح للتكلفة وخطة
              تنفيذ منظمة بدون فوضى.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button asChild className="bg-yellow-500 text-black hover:bg-yellow-400">
                <a href={WA_LINK} target="_blank" rel="noreferrer">
                  اطلب معاينة واتساب
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={`tel:${PHONE_TEL}`}>اتصال: {PHONE_LOCAL}</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/villa-finishing-price-riyadh">حاسبة التكلفة</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-right">
              {active?.alt ?? "عرض الصورة"}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-2 overflow-hidden rounded-2xl border bg-black">
            {active ? (
              <img
                src={active.src}
                alt={active.alt}
                className="w-full h-auto object-contain"
              />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}