import { useMemo } from "react";
import SeoHead from "@/components/SeoHead";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type JsonLd = Record<string, any>;

const SITE_URL = "https://pybcco.com";
const CANONICAL =
  "https://pybcco.com/engineering-insights/how-to-choose-construction-company-riyadh";

// عدّلهم إذا بتحب (بس اترك Published ثابت، وعدّل Modified عند أي تحديث كبير)
const DATE_PUBLISHED = "2026-03-02";
const DATE_MODIFIED = "2026-03-05";

function buildFaqJsonLd(canonical: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "ما هي أفضل طريقة لاختيار شركة مقاولات في الرياض؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "أفضل طريقة هي مقارنة أكثر من شركة بناءً على وضوح العقد، وجود إشراف هندسي، شفافية التسعير، وسابقة الأعمال، وليس السعر فقط.",
        },
      },
      {
        "@type": "Question",
        name: "هل من الضروري وجود ضمان على التشطيب؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "نعم، وجود ضمان على التشطيب لمدة سنتين على الأقل يعكس ثقة الشركة بجودة التنفيذ ويحمي العميل من أي عيوب تنفيذية ناتجة عن العمل.",
        },
      },
      {
        "@type": "Question",
        name: "كم مدة تنفيذ تشطيب فيلا في الرياض عادةً؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "تختلف المدة حسب المساحة ونطاق الأعمال، لكنها غالباً تتراوح بين 3 إلى 6 أشهر في المشاريع السكنية المتوسطة.",
        },
      },
      {
        "@type": "Question",
        name: "كيف أتأكد من مصداقية شركة مقاولات؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "يمكن التأكد من خلال مراجعة السجل التجاري والرقم الضريبي، الاطلاع على مشاريع سابقة موثّقة، وجود عقد تفصيلي واضح، وتحديد آلية الدفعات والاستلام.",
        },
      },
      {
        "@type": "Question",
        name: "هل السعر المنخفض يعني عرض أفضل؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "ليس بالضرورة. السعر المنخفض قد يعني تقليل جودة المواد أو غياب الإشراف. الأهم هو وضوح البنود والمواصفات الفنية وآلية التنفيذ.",
        },
      },
    ],
  };
}

function buildBreadcrumbJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${CANONICAL}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "رؤى هندسية",
        item: `${SITE_URL}/engineering-insights`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "كيف تختار أفضل شركة مقاولات في الرياض؟",
        item: CANONICAL,
      },
    ],
  };
}

function buildArticleJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${CANONICAL}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": CANONICAL },
    inLanguage: "ar",
    headline: "كيف تختار أفضل شركة مقاولات في الرياض؟ دليل عملي قبل توقيع العقد",
    description:
      "دليل عملي لاختيار شركة مقاولات في الرياض: نطاق العمل، العقد التفصيلي، الإشراف الهندسي، الشفافية، وضمان التشطيب لمدة سنتين، مع أسئلة شائعة.",
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    author: {
      "@type": "Organization",
      name: "بنيان الهرم للمقاولات – PYBCCO",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "بنيان الهرم للمقاولات – PYBCCO",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.webp`,
      },
    },
    // اختياري: صورة المقال (إذا ما عندك صورة خاصة للمقال خليه اللوجو أو صورة عامة)
    image: [`${SITE_URL}/logo.webp`],
    about: [
      "شركة مقاولات في الرياض",
      "مقاول تشطيب فلل بالرياض",
      "تشطيب فلل بالرياض",
      "عقد تشطيب",
      "ضمان التشطيب",
      "إشراف هندسي",
    ],
  };
}

export default function HowToChooseConstructionCompanyRiyadh() {
  const jsonLd = useMemo(() => {
    const faqJsonLd = buildFaqJsonLd(CANONICAL);
    const breadcrumbJsonLd = buildBreadcrumbJsonLd();
    const articleJsonLd = buildArticleJsonLd();
    return [articleJsonLd, faqJsonLd, breadcrumbJsonLd];
  }, []);

  return (
    <main dir="rtl" className="py-16">
      <SeoHead
        title="كيف تختار أفضل شركة مقاولات في الرياض؟ دليل عملي قبل توقيع العقد | PYBCCO"
        description="دليل عملي لاختيار شركة مقاولات في الرياض: نطاق العمل، العقد التفصيلي، الإشراف الهندسي، الشفافية، وضمان التشطيب لمدة سنتين، مع أسئلة شائعة."
        canonical={CANONICAL}
        robots="index,follow,max-image-preview:large"
        jsonLd={jsonLd as any}
      />

      <div className="container mx-auto px-4">
        <article className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            كيف تختار أفضل شركة مقاولات في الرياض؟
          </h1>
          <p className="mt-2 text-lg opacity-80">
            دليل عملي قبل توقيع عقد تشطيب أو بناء
          </p>

          <p className="mt-8 leading-relaxed opacity-90">
            اختيار <strong>شركة مقاولات في الرياض</strong> ليس قرارًا بسيطًا،
            خصوصًا مع تعدد الشركات واختلاف مستويات الجودة والتنظيم. سواء كنت تبحث
            عن <strong>مقاول تشطيب فلل بالرياض</strong> أو شركة لتنفيذ مشروع{" "}
            <strong>عظم</strong> كامل، فإن طريقة الاختيار ستحدد جودة النتيجة
            النهائية وتقلل المفاجآت أثناء التنفيذ.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            في هذه <strong>الرؤية الهندسية</strong> نعرض معايير عملية تساعدك على
            اختيار <strong>أفضل شركة مقاولات</strong> بثقة قبل توقيع أي عقد.
          </p>

          {/* روابط داخلية سياقية (قوية لـ SEO) */}
          <div className="mt-6 rounded-xl border bg-gray-50 p-4 text-sm opacity-90">
            <p className="font-bold">روابط مفيدة:</p>
            <ul className="mt-2 list-disc pr-6 space-y-1">
              <li>
                <a
                  href="/construction-company-riyadh"
                  className="underline decoration-yellow-400 underline-offset-4 hover:opacity-80"
                >
                  شركة مقاولات بالرياض – تفاصيل الخدمات
                </a>
              </li>
              <li>
                <a
                  href="/villa-finishing-price-riyadh"
                  className="underline decoration-yellow-400 underline-offset-4 hover:opacity-80"
                >
                  حاسبة تكلفة التشطيب – تصور مبدئي قبل البدء
                </a>
              </li>
            </ul>
          </div>

          <h2 className="mt-10 text-2xl font-bold">
            1) وضوح نطاق أعمال التشطيب أو البناء
          </h2>
          <p className="mt-3 leading-relaxed opacity-90">
            عند البحث عن <strong>شركة تشطيب فلل بالرياض</strong> تأكد أولًا من
            تحديد نطاق العمل بدقة، مثل:
          </p>
          <ul className="mt-3 list-disc pr-6 space-y-2 opacity-90">
            <li>نطاق الأعمال بالتفصيل</li>
            <li>المواصفات الفنية</li>
            <li>المواد المعتمدة</li>
            <li>آلية الإشراف الهندسي</li>
            <li>جدول التنفيذ</li>
          </ul>
          <p className="mt-3 leading-relaxed opacity-90">
            الاحتراف الحقيقي يبدأ قبل التنفيذ… من وضوح التفاصيل.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            2) وجود عقد تفصيلي وليس عرض سعر مختصر
          </h2>
          <p className="mt-3 leading-relaxed opacity-90">
            عند التعاقد مع <strong>مقاول تشطيب فلل في الرياض</strong> يجب أن
            يحتوي العقد على:
          </p>
          <ul className="mt-3 list-disc pr-6 space-y-2 opacity-90">
            <li>وصف دقيق للبنود</li>
            <li>جدول الدفعات</li>
            <li>مدة التنفيذ</li>
            <li>آلية استلام الأعمال</li>
            <li>شروط التعديلات</li>
          </ul>
          <p className="mt-3 leading-relaxed opacity-90">
            الشركات المنظمة لا تعتمد على اتفاقات شفوية، بل على عقود واضحة تحمي
            الطرفين.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            3) إشراف هندسي وإدارة مشروع حقيقية
          </h2>
          <p className="mt-3 leading-relaxed opacity-90">
            من أهم الفروق بين مقاول عادي و
            <strong> شركة مقاولات محترفة في الرياض</strong> وجود:
          </p>
          <ul className="mt-3 list-disc pr-6 space-y-2 opacity-90">
            <li>إشراف هندسي فعلي</li>
            <li>متابعة جودة التنفيذ</li>
            <li>إدارة مراحل المشروع</li>
            <li>تنظيم العمالة والمواد</li>
          </ul>
          <p className="mt-3 leading-relaxed opacity-90">
            إدارة المشروع باحتراف تقلل الأخطاء وتضمن الالتزام بالجدول الزمني قدر
            الإمكان.
          </p>

          <h2 className="mt-10 text-2xl font-bold">4) نظام متابعة وشفافية مالية</h2>
          <p className="mt-3 leading-relaxed opacity-90">
            عند تنفيذ <strong>تشطيب فلل بالرياض</strong> من المهم وجود:
          </p>
          <ul className="mt-3 list-disc pr-6 space-y-2 opacity-90">
            <li>متابعة واضحة لمراحل التنفيذ</li>
            <li>توثيق الأعمال</li>
            <li>وضوح في الدفعات</li>
            <li>تقارير تقدم</li>
          </ul>
          <p className="mt-3 leading-relaxed opacity-90">
            غياب التنظيم هو أحد أكثر أسباب قلق العملاء عند التعامل مع شركات
            المقاولات.
          </p>

          <h2 className="mt-10 text-2xl font-bold">5) الضمان على أعمال التشطيب</h2>
          <p className="mt-3 leading-relaxed opacity-90">
            الشركة الواثقة من جودة تنفيذها تقدم{" "}
            <strong>ضمانًا واضحًا على التشطيب</strong>.
          </p>
          <ul className="mt-3 list-disc pr-6 space-y-2 opacity-90">
            <li>
              <strong>ضمان على أعمال التشطيب لمدة سنتين</strong>
            </li>
            <li>معالجة أي عيوب تنفيذية ناتجة عن العمل</li>
            <li>التزام كتابي ضمن العقد</li>
          </ul>
          <p className="mt-3 leading-relaxed opacity-90">
            وجود <strong>ضمان لمدة سنتين على التشطيب</strong> يعكس ثقة الشركة
            بجودة التنفيذ وليس مجرد وعود تسويقية.
          </p>

          <h2 className="mt-10 text-2xl font-bold">6) لا تجعل السعر هو المعيار الوحيد</h2>
          <p className="mt-3 leading-relaxed opacity-90">
            عند مقارنة عروض <strong>شركات المقاولات في الرياض</strong> ستلاحظ
            تفاوتًا في الأسعار، لكن السعر المنخفض لا يعني دائمًا صفقة أفضل.
          </p>
          <p className="mt-3 leading-relaxed opacity-90">المعيار الأهم هو:</p>
          <ul className="mt-3 list-disc pr-6 space-y-2 opacity-90">
            <li>وضوح البنود</li>
            <li>جودة المواد</li>
            <li>خبرة الفريق</li>
            <li>نظام العمل والإشراف</li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold">خلاصة الرؤية</h2>
          <p className="mt-3 leading-relaxed opacity-90">
            اختيار <strong>أفضل شركة مقاولات في الرياض</strong> يعتمد على وضوح
            الإجراءات، والإشراف الهندسي، وشفافية التسعير، ووجود ضمان حقيقي على
            التشطيب، وإدارة مشروع احترافية. كلما كانت الشركة منظمة تقنيًا
            وإداريًا، كانت تجربة التنفيذ أكثر استقرارًا وجودة.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            إذا كنت تبحث عن شركة مقاولات لتنفيذ تشطيب فلل في الرياض
          </h2>
          <p className="mt-3 leading-relaxed opacity-90">
            يمكنك الاطلاع على خدماتنا وآلية التنفيذ المتبعة، أو الحصول على تصور
            مبدئي لتكلفة مشروعك قبل البدء.
          </p>

          {/* FAQ Accordion */}
          <section className="mt-14">
            <h2 className="text-2xl font-bold mb-4">الأسئلة الشائعة</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q1">
                <AccordionTrigger>
                  ما هي أفضل طريقة لاختيار شركة مقاولات في الرياض؟
                </AccordionTrigger>
                <AccordionContent>
                  أفضل طريقة هي مقارنة أكثر من شركة بناءً على وضوح العقد، وجود
                  إشراف هندسي، شفافية التسعير، وسابقة الأعمال، وليس السعر فقط.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q2">
                <AccordionTrigger>هل من الضروري وجود ضمان على التشطيب؟</AccordionTrigger>
                <AccordionContent>
                  نعم، وجود ضمان على التشطيب لمدة سنتين على الأقل يعكس ثقة الشركة
                  بجودة التنفيذ ويحمي العميل من أي عيوب تنفيذية ناتجة عن العمل.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q3">
                <AccordionTrigger>كم مدة تنفيذ تشطيب فيلا في الرياض عادةً؟</AccordionTrigger>
                <AccordionContent>
                  تختلف المدة حسب المساحة ونطاق الأعمال، لكنها غالباً تتراوح بين 3
                  إلى 6 أشهر في المشاريع السكنية المتوسطة.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q4">
                <AccordionTrigger>كيف أتأكد من مصداقية شركة مقاولات؟</AccordionTrigger>
                <AccordionContent>
                  يمكن التأكد من خلال مراجعة السجل التجاري والرقم الضريبي، الاطلاع
                  على مشاريع سابقة موثّقة، وجود عقد تفصيلي واضح، وتحديد آلية الدفعات
                  والاستلام.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q5">
                <AccordionTrigger>هل السعر المنخفض يعني عرض أفضل؟</AccordionTrigger>
                <AccordionContent>
                  ليس بالضرورة. السعر المنخفض قد يعني تقليل جودة المواد أو غياب
                  الإشراف. الأهم هو وضوح البنود والمواصفات الفنية وآلية التنفيذ.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </article>
      </div>
    </main>
  );
}