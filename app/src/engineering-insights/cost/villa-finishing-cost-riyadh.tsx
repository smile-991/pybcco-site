import { useMemo } from "react";
import { Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type JsonLd = Record<string, any>;

const SITE_URL = "https://pybcco.com";
const CANONICAL =
  "https://pybcco.com/engineering-insights/cost/villa-finishing-cost-riyadh";

const DATE_PUBLISHED = "2026-03-06";
const DATE_MODIFIED = "2026-03-06";

function buildArticleJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${CANONICAL}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": CANONICAL,
    },
    inLanguage: "ar",
    headline: "تكلفة تشطيب فيلا بالرياض | دليل تقدير التكلفة قبل التنفيذ",
    description:
      "دليل عملي لفهم تكلفة تشطيب فيلا بالرياض والعوامل التي تؤثر على السعر، مع مثال تقريبي لفيلا 300 متر وربط مباشر بحاسبة التكلفة.",
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
    image: [`${SITE_URL}/logo.webp`],
    about: [
      "تكلفة تشطيب فيلا بالرياض",
      "سعر متر التشطيب",
      "تكلفة بناء فيلا 300 متر",
      "تشطيب فلل بالرياض",
      "تشطيب تسليم مفتاح",
    ],
  };
}

function buildFaqJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${CANONICAL}#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "كم تكلفة تشطيب فيلا بالرياض؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "تختلف تكلفة تشطيب الفيلا في الرياض حسب المساحة ومستوى التشطيب ونوعية المواد ونطاق الأعمال. لذلك لا يوجد رقم ثابت يصلح لجميع المشاريع.",
        },
      },
      {
        "@type": "Question",
        name: "هل 1200 إلى 1700 ريال للمتر يشمل البناء والتشطيب؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "يمكن استخدام هذا النطاق كتقدير تقريبي شائع في بعض المشاريع من الحفر حتى تسليم المفتاح، لكنه ليس سعرًا ثابتًا، لأن التكلفة النهائية تتغير حسب المواصفات والتصميم والمواد.",
        },
      },
      {
        "@type": "Question",
        name: "كيف يمكن تقدير تكلفة فيلا 300 متر بشكل مبدئي؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "يتم ذلك عبر ضرب المساحة في نطاق سعري تقريبي مناسب لمستوى المشروع، ثم مراجعة البنود الفعلية مثل التشطيب والمواد والأعمال الخاصة للحصول على تصور أولي قبل عرض السعر التفصيلي.",
        },
      },
      {
        "@type": "Question",
        name: "ما الذي يرفع تكلفة التشطيب عادة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "من أبرز الأسباب: اختيار مواد أعلى جودة، التعديلات أثناء التنفيذ، غموض البنود، التصاميم المعقدة، وضعف التخطيط قبل البدء.",
        },
      },
      {
        "@type": "Question",
        name: "هل الحاسبة تعطي سعرًا نهائيًا؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "لا، الحاسبة تعطي تصورًا مبدئيًا فقط، بينما يحتاج السعر النهائي إلى دراسة تفاصيل المشروع والمخططات ونطاق العمل الفعلي.",
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
        name: "التكلفة والتسعير",
        item: `${SITE_URL}/engineering-insights/cost`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "تكلفة تشطيب فيلا بالرياض",
        item: CANONICAL,
      },
    ],
  };
}

export default function VillaFinishingCostRiyadh() {
  const jsonLd = useMemo(() => {
    return [buildArticleJsonLd(), buildFaqJsonLd(), buildBreadcrumbJsonLd()];
  }, []);

  return (
    <>
      <SeoHead
        title="تكلفة تشطيب فيلا بالرياض | دليل تقدير التكلفة قبل التنفيذ | PYBCCO"
        description="تعرف على العوامل التي تؤثر على تكلفة تشطيب الفلل في الرياض، مع مثال تقريبي لفيلا 300 متر وربط مباشر بحاسبة تكلفة التشطيب."
        canonical={CANONICAL}
        robots="index,follow,max-image-preview:large"
        ogType="article"
        jsonLd={jsonLd}
      />

      <main dir="rtl" className="py-16">
      <div className="container mx-auto px-4">
        <article className="max-w-4xl">
          <div className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-sm font-medium">
            تقرير ضمن قسم التكلفة والتسعير
          </div>

          <h1 className="mt-5 text-3xl md:text-4xl font-bold leading-tight">
            تكلفة تشطيب فيلا بالرياض
          </h1>

          <p className="mt-3 text-lg opacity-80 leading-relaxed">
            دليل عملي لفهم تكلفة المشروع قبل طلب عرض السعر التفصيلي
          </p>

          <p className="mt-8 leading-relaxed opacity-90">
            يبحث كثير من العملاء عن <strong>تكلفة تشطيب فيلا بالرياض</strong>{" "}
            قبل البدء بالمشروع، لأن معرفة التكلفة بشكل مبدئي تساعد على التخطيط
            المالي، وتساعد أيضًا على اختيار المسار الأنسب من البداية بدل الدخول
            في تنفيذ غير واضح التكاليف. لكن المشكلة أن كثيرًا من الناس يبحثون عن
            رقم واحد ثابت، بينما الواقع أن تكلفة التشطيب والبناء تتأثر بعوامل
            متعددة، لذلك لا يمكن التعامل معها كرقم جامد يصلح لكل الفلل ولكل
            الحالات.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            في هذا التقرير سنشرح الصورة بشكل عملي وواضح، وسنوضح كيف يمكن قراءة
            تكلفة التشطيب، وما الفرق بين المستويات المختلفة، وما الذي يرفع
            الأسعار، وكيف يمكن تكوين تصور مبدئي أقرب للواقع قبل طلب عرض السعر
            النهائي.
          </p>

          <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
            <h2 className="text-xl font-bold">ملخص سريع</h2>
            <p className="mt-3 leading-relaxed opacity-90">
              بشكل عام، يمكن النظر إلى نطاق تقريبي متداول في بعض المشاريع في
              الرياض يتراوح بين <strong>1200 و1700 ريال للمتر المسطح تقريبًا</strong>{" "}
              من الحفر حتى <strong>تسليم المفتاح</strong>، لكن هذا ليس سعرًا
              ثابتًا، بل تقدير تقريبي يتغير حسب المواصفات، المواد، التصميم،
              ومستوى التشطيب.
            </p>
          </div>

          <h2 className="mt-12 text-2xl font-bold">
            ماذا نعني بتكلفة البناء والتشطيب؟
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            عندما يسأل العميل عن تكلفة تشطيب أو بناء فيلا، فهو قد يقصد واحدًا من
            ثلاثة أمور:
          </p>
          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>تكلفة التشطيب فقط لفيلا قائمة على العظم.</li>
            <li>تكلفة البناء من البداية حتى نهاية الهيكل الإنشائي.</li>
            <li>تكلفة المشروع كاملًا من الحفر حتى تسليم المفتاح.</li>
          </ul>
          <p className="mt-4 leading-relaxed opacity-90">
            لذلك أول خطوة لفهم التكلفة بشكل صحيح هي تحديد المقصود بدقة. لأن
            الخلط بين تشطيب فقط وبين مشروع كامل من الحفر إلى التسليم يؤدي إلى
            تقديرات غير دقيقة ومقارنات خاطئة بين العروض.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            النطاق التقريبي لتكلفة البناء والتشطيب في الرياض
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            في كثير من الحالات، يمكن استخدام نطاق تقريبي عام يساعد العميل على
            تكوين صورة أولية، وهو أن تكلفة البناء والتشطيب قد تتراوح تقريبًا بين{" "}
            <strong>1200 و1700 ريال للمتر المسطح</strong> في بعض المشاريع من
            الحفر حتى تسليم المفتاح.
          </p>
          <p className="mt-4 leading-relaxed opacity-90">
            هذا النطاق قد يشمل عادة عناصر أساسية مثل:
          </p>
          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>أعمال الحفر والردم.</li>
            <li>أعمال الخرسانة والهيكل الإنشائي.</li>
            <li>العزل وبعض الأعمال التأسيسية.</li>
            <li>السباكة والكهرباء.</li>
            <li>اللياسة والدهانات.</li>
            <li>الأرضيات والأسقف الجبسية.</li>
            <li>بعض أعمال الأبواب والتشطيبات الداخلية الأساسية.</li>
          </ul>
          <p className="mt-4 leading-relaxed opacity-90">
            لكن يجب فهم هذا الرقم على أنه <strong>مرجع تقريبي</strong> وليس عرض
            سعر نهائي، لأن أي تغيير في التصميم أو المواد أو مستوى التشطيب قد
            يرفع أو يخفض التكلفة بشكل واضح.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            مثال تقريبي: تكلفة فيلا 300 متر
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            لنفترض وجود مشروع <strong>فيلا بمساحة 300 متر مسطح</strong>. إذا تم
            الاعتماد على نطاق تقريبي بين 1200 و1700 ريال للمتر، فإن الصورة
            الأولية قد تكون كالتالي:
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl border">
            <table className="w-full text-sm">
              <thead className="bg-muted/60">
                <tr>
                  <th className="p-4 text-right font-bold">الحالة</th>
                  <th className="p-4 text-right font-bold">سعر المتر التقريبي</th>
                  <th className="p-4 text-right font-bold">التكلفة التقديرية</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-4">الحد الأدنى التقريبي</td>
                  <td className="p-4">1200 ريال</td>
                  <td className="p-4">360,000 ريال تقريبًا</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4">مستوى متوسط تقريبي</td>
                  <td className="p-4">1400 – 1600 ريال</td>
                  <td className="p-4">420,000 – 480,000 ريال تقريبًا</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4">مستوى أعلى</td>
                  <td className="p-4">1700 ريال أو أكثر</td>
                  <td className="p-4">510,000 ريال تقريبًا أو أكثر</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 leading-relaxed opacity-90">
            هذا المثال لا يُستخدم كعرض سعر نهائي، لكنه يعطي العميل تصورًا مبدئيًا
            مفيدًا قبل الدخول في تفاصيل المشروع. والهدف من هذا النوع من
            التقديرات هو بناء فهم أولي للسوق، وليس اعتماد رقم نهائي للتعاقد.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            ما العوامل التي تؤثر على تكلفة تشطيب الفيلا؟
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            لا توجد فيلتان متطابقتان تمامًا من حيث التكلفة، حتى لو كانت المساحة
            متقاربة. السبب هو أن التكلفة تتغير بحسب عوامل رئيسية، أهمها:
          </p>

          <h3 className="mt-8 text-xl font-bold">1) مساحة المشروع</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            كلما زادت المساحة زادت كميات المواد المطلوبة وزادت ساعات العمل، لكن
            في بعض الحالات قد تنخفض تكلفة بعض البنود نسبيًا عند المشاريع الأكبر
            بسبب توزيع التكاليف الثابتة على مساحة أوسع.
          </p>

          <h3 className="mt-8 text-xl font-bold">2) مستوى التشطيب</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            مستوى التشطيب من أكثر العوامل تأثيرًا على السعر. فالتشطيب الاقتصادي
            يختلف عن المتوسط، والمتوسط يختلف عن الفاخر، ليس فقط في نوع المواد،
            بل أيضًا في كمية التفاصيل، وطريقة التنفيذ، ومستوى الدقة المطلوبة.
          </p>

          <h3 className="mt-8 text-xl font-bold">3) نوعية المواد</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            اختيار الأرضيات، الأبواب، الدهانات، الأدوات الصحية، الإضاءة، وأنظمة
            السباكة والكهرباء يغيّر التكلفة بشكل مباشر. كل بند من هذه البنود له
            مستويات وأسعار متعددة، وعند اجتماع عدة اختيارات عالية الجودة في
            مشروع واحد، ترتفع الميزانية بشكل ملحوظ.
          </p>

          <h3 className="mt-8 text-xl font-bold">4) التصميم والتفاصيل المعمارية</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            بعض المشاريع تكون بسيطة من حيث الشكل والتفاصيل، بينما مشاريع أخرى
            تحتوي على تفاصيل معمارية وديكورية كثيرة، مثل الأسقف الجبسية المعقدة،
            والمعالجات الخاصة للجدران، والتقسيمات المتعددة، وهذه كلها تؤثر على
            الوقت والعمالة والتكلفة.
          </p>

          <h3 className="mt-8 text-xl font-bold">5) نطاق الأعمال</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            من المهم جدًا تحديد هل المطلوب هو تشطيب فقط، أم أعمال عظم وتشطيب، أم
            مشروع كامل من الحفر حتى التسليم. كلما كان نطاق العمل أوسع، زادت
            البنود المطلوب احتسابها، وأصبحت المقارنة بين العروض أكثر حساسية.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            الفرق بين التشطيب الاقتصادي والمتوسط والفاخر
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            كثير من اختلاف الأسعار لا يكون سببه الخطأ في التسعير، بل اختلاف
            المستوى المستهدف من البداية. لذلك من المهم أن يعرف العميل ماذا يريد
            بدقة قبل طلب عرض السعر.
          </p>

          <h3 className="mt-8 text-xl font-bold">التشطيب الاقتصادي</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            يركز على الأساسيات والوظيفة، ويكون مناسبًا لمن يريد ضبط الميزانية مع
            الاكتفاء بمواد جيدة ولكن غير مرتفعة السعر. هذا النوع قد يحقق الهدف
            المطلوب في كثير من المشاريع إذا كان الاختيار منظمًا ومدروسًا.
          </p>

          <h3 className="mt-8 text-xl font-bold">التشطيب المتوسط</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            يعتبر الخيار الأكثر توازنًا لدى كثير من العملاء، لأنه يجمع بين جودة
            جيدة ومظهر مناسب وتكلفة معقولة نسبيًا. وغالبًا يكون هذا المستوى هو
            الأكثر طلبًا في المشاريع السكنية التي تستهدف الجودة العملية دون
            مبالغة.
          </p>

          <h3 className="mt-8 text-xl font-bold">التشطيب الفاخر</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            يعتمد على مواد أعلى جودة وتفاصيل تنفيذ أكثر دقة واهتمامًا بالتفاصيل
            الجمالية. هذا المستوى يرفع التكلفة عادة، لكنه يمنح نتيجة مختلفة من
            حيث الشكل النهائي والانطباع العام وطول العمر في بعض البنود.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            ما الذي يرفع تكلفة المشروع أكثر من المتوقع؟
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            كثير من المشاريع لا ترتفع تكلفتها بسبب السعر الأساسي فقط، بل بسبب
            أخطاء تحدث أثناء التنفيذ أو قبل التعاقد. ومن أبرز الأسباب:
          </p>
          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>عدم وضوح البنود في العقد أو عرض السعر.</li>
            <li>التعديلات الكثيرة أثناء التنفيذ.</li>
            <li>اختيار مواد أعلى من المخطط له بعد البداية.</li>
            <li>ضعف التخطيط المسبق للمشروع.</li>
            <li>عدم وجود تصور واضح للمستوى المطلوب من التشطيب.</li>
            <li>الاعتماد على السعر الأقل دون مقارنة المواصفات.</li>
          </ul>
          <p className="mt-4 leading-relaxed opacity-90">
            لهذا السبب، من الخطأ التركيز فقط على الرقم النهائي دون قراءة البنود
            والمواصفات. العرض الأرخص ظاهريًا قد لا يكون الأرخص فعليًا بعد بدء
            التنفيذ.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            كيف تحصل على تقدير مبدئي أقرب للواقع؟
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            أفضل طريقة عملية في البداية هي أن تبدأ بتقدير أولي يساعدك على فهم
            حدود الميزانية، ثم تنتقل بعد ذلك إلى عرض سعر تفصيلي. ويمكن فعل ذلك
            عبر:
          </p>
          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>تحديد مساحة المشروع بدقة.</li>
            <li>تحديد هل المشروع تشطيب فقط أم مشروع كامل.</li>
            <li>اختيار مستوى التشطيب المستهدف بشكل واضح.</li>
            <li>تحديد البنود الخاصة أو غير المعتادة إن وجدت.</li>
            <li>استخدام أداة تقدير أولية قبل طلب التسعير التفصيلي.</li>
          </ul>

          <div className="mt-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 md:p-8">
            <h2 className="text-2xl font-bold">احسب تكلفة مشروعك بشكل مبدئي</h2>
            <p className="mt-3 leading-relaxed opacity-90">
              إذا كنت تريد تصورًا أوليًا سريعًا قبل طلب عرض سعر تفصيلي، يمكنك
              استخدام حاسبة التكلفة في الموقع. الحاسبة لا تعطي سعرًا نهائيًا،
              لكنها تساعدك على بناء فهم أولي منطقي قبل الدخول في تفاصيل المشروع.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-2xl">
                <Link to="/villa-finishing-price-riyadh">
                  افتح حاسبة التكلفة
                </Link>
              </Button>

              <Button asChild variant="outline" className="rounded-2xl">
                <Link to="/villa-finishing-riyadh">خدمات تشطيب الفلل</Link>
              </Button>
            </div>
          </div>

          <h2 className="mt-12 text-2xl font-bold">
            خلاصة التقرير
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            فهم <strong>تكلفة تشطيب فيلا بالرياض</strong> لا يبدأ من البحث عن
            رقم واحد ثابت، بل من فهم العوامل التي تحكم السعر فعلًا. المساحة،
            مستوى التشطيب، نوعية المواد، التصميم، ونطاق الأعمال كلها عوامل
            أساسية تحدد التكلفة النهائية.
          </p>
          <p className="mt-4 leading-relaxed opacity-90">
            ويمكن استخدام نطاق تقريبي شائع مثل{" "}
            <strong>1200 إلى 1700 ريال للمتر المسطح</strong> كمرجع أولي في بعض
            المشاريع من الحفر حتى تسليم المفتاح، لكن القرار الصحيح دائمًا يكون
            ببناء تصور مبدئي أولًا، ثم الانتقال إلى دراسة تفصيلية للمشروع وعرض
            سعر واضح البنود.
          </p>

          <div className="mt-10 rounded-xl border bg-gray-50 p-4 text-sm opacity-90">
            <p className="font-bold">روابط مفيدة:</p>
            <ul className="mt-2 list-disc pr-6 space-y-1">
              <li>
                <Link
                  to="/engineering-insights/cost"
                  className="underline decoration-yellow-400 underline-offset-4 hover:opacity-80"
                >
                  العودة إلى قسم التكلفة والتسعير
                </Link>
              </li>
              <li>
                <Link
                  to="/construction-company-riyadh"
                  className="underline decoration-yellow-400 underline-offset-4 hover:opacity-80"
                >
                  شركة مقاولات بالرياض – صفحة الخدمات
                </Link>
              </li>
              <li>
                <Link
                  to="/villa-finishing-price-riyadh"
                  className="underline decoration-yellow-400 underline-offset-4 hover:opacity-80"
                >
                  حاسبة تكلفة التشطيب
                </Link>
              </li>
            </ul>
          </div>

          <section className="mt-14">
            <h2 className="text-2xl font-bold mb-4">الأسئلة الشائعة</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q1">
                <AccordionTrigger>
                  كم تكلفة تشطيب فيلا بالرياض؟
                </AccordionTrigger>
                <AccordionContent>
                  تختلف تكلفة تشطيب الفيلا في الرياض حسب المساحة ومستوى التشطيب
                  ونوعية المواد ونطاق الأعمال، لذلك لا يوجد رقم ثابت يصلح لجميع
                  المشاريع.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q2">
                <AccordionTrigger>
                  هل 1200 إلى 1700 ريال للمتر يشمل البناء والتشطيب؟
                </AccordionTrigger>
                <AccordionContent>
                  يمكن استخدام هذا النطاق كتقدير تقريبي شائع في بعض المشاريع من
                  الحفر حتى تسليم المفتاح، لكنه ليس سعرًا ثابتًا، لأن التكلفة
                  النهائية تتغير حسب المواصفات والتصميم والمواد.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q3">
                <AccordionTrigger>
                  كيف يمكن تقدير تكلفة فيلا 300 متر بشكل مبدئي؟
                </AccordionTrigger>
                <AccordionContent>
                  يتم ذلك عبر ضرب المساحة في نطاق سعري تقريبي مناسب لمستوى
                  المشروع، ثم مراجعة البنود الفعلية مثل التشطيب والمواد والأعمال
                  الخاصة للحصول على تصور أولي قبل عرض السعر التفصيلي.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q4">
                <AccordionTrigger>
                  ما الذي يرفع تكلفة التشطيب عادة؟
                </AccordionTrigger>
                <AccordionContent>
                  من أبرز الأسباب: اختيار مواد أعلى جودة، التعديلات أثناء
                  التنفيذ، غموض البنود، التصاميم المعقدة، وضعف التخطيط قبل
                  البدء.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q5">
                <AccordionTrigger>
                  هل الحاسبة تعطي سعرًا نهائيًا؟
                </AccordionTrigger>
                <AccordionContent>
                  لا، الحاسبة تعطي تصورًا مبدئيًا فقط، بينما يحتاج السعر النهائي
                  إلى دراسة تفاصيل المشروع والمخططات ونطاق العمل الفعلي.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </article>
      </div>
      </main>
    </>
  );
}