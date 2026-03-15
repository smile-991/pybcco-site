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
  "https://pybcco.com/engineering-insights/cost/how-to-compare-finishing-quotations";

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
    headline:
      "كيف تقارن بين عرضي سعر لمشروع تشطيب؟ دليل عملي قبل اتخاذ القرار",
    description:
      "دليل عملي يشرح كيف تقارن بين عرضي سعر لمشروع تشطيب بطريقة صحيحة، من حيث النطاق والمواد والاستثناءات والدفعات وآلية التنفيذ، وليس من خلال الرقم النهائي فقط.",
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
      "مقارنة عروض الأسعار",
      "عرض سعر تشطيب",
      "مقارنة عرضي سعر",
      "تكلفة التشطيب",
      "اختيار شركة تشطيب",
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
        name: "كيف أقارن بين عرضي سعر لمشروع تشطيب؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "تتم المقارنة الصحيحة عبر مراجعة النطاق والبنود والمواد والاستثناءات وآلية التنفيذ والدفعات، وليس من خلال الرقم النهائي فقط.",
        },
      },
      {
        "@type": "Question",
        name: "هل العرض الأرخص هو الأفضل دائمًا؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "لا، لأن بعض العروض الأرخص تكون أقل فقط بسبب استثناء بنود أو استخدام مواد أدنى أو غياب تفاصيل مهمة من التسعير.",
        },
      },
      {
        "@type": "Question",
        name: "ما أهم شيء يجب التحقق منه عند مقارنة عرضين؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "أهم نقطة هي التأكد أن العرضين مبنيان على نفس النطاق تقريبًا ونفس مستوى المواد، وإلا ستكون المقارنة مضللة.",
        },
      },
      {
        "@type": "Question",
        name: "هل فرق السعر بين عرضين يعني دائمًا فرقًا في الربح فقط؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "ليس دائمًا، فقد يكون فرق السعر ناتجًا عن اختلاف النطاق أو جودة المواد أو شمول بنود إضافية أو وضوح أكبر في العرض الأعلى.",
        },
      },
      {
        "@type": "Question",
        name: "كيف أعرف أن عرض السعر ناقص أو غير واضح؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "إذا كان الوصف عامًا جدًا، أو لم يوضح المواد أو الاستثناءات أو آلية الإضافات والدفعات، فغالبًا يحتاج العرض إلى مراجعة أعمق قبل الاعتماد عليه.",
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
        name: "كيف تقارن بين عرضي سعر لمشروع تشطيب؟",
        item: CANONICAL,
      },
    ],
  };
}

export default function HowToCompareFinishingQuotations() {
  const jsonLd = useMemo(() => {
    return [buildArticleJsonLd(), buildFaqJsonLd(), buildBreadcrumbJsonLd()];
  }, []);

  return (
    <>
      <SeoHead
        title="كيف تقارن بين عرضي سعر لمشروع تشطيب؟ دليل عملي قبل اتخاذ القرار | PYBCCO"
        description="تعرف على الطريقة الصحيحة لمقارنة عرضي سعر لمشروع تشطيب من حيث البنود والمواد والنطاق والدفعات، بدل الاكتفاء بمقارنة الرقم النهائي فقط."
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
            كيف تقارن بين عرضي سعر لمشروع تشطيب؟
          </h1>

          <p className="mt-3 text-lg opacity-80 leading-relaxed">
            دليل عملي يساعدك على اتخاذ قرار صحيح قبل التعاقد
          </p>

          <p className="mt-8 leading-relaxed opacity-90">
            كثير من العملاء يصلون إلى مرحلة يكون فيها لديهم{" "}
            <strong>عرضا سعر أو أكثر</strong> لمشروع التشطيب، ويظنون أن القرار
            أصبح بسيطًا: من الأرخص؟ لكن في الواقع، هذه هي اللحظة التي يقع فيها
            أكبر عدد من الأخطاء. لأن المقارنة بين عرضين لا تكون صحيحة إذا تمت
            على أساس الرقم النهائي فقط، بل يجب أن تتم على أساس{" "}
            <strong>ما الذي يشمله كل عرض فعليًا</strong>.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            قد يكون أحد العرضين أقل من الآخر بعشرات الآلاف، لكن السبب لا يكون
            دائمًا أن الجهة الأولى أفضل سعرًا، بل ربما لأن النطاق أضيق، أو
            المواد أقل، أو بعض البنود غير محسوبة أصلًا، أو أن تفاصيل التنفيذ
            والاستلام أقل وضوحًا. وفي المقابل، قد يبدو عرض آخر أعلى، لكنه في
            الحقيقة أكثر اكتمالًا وانضباطًا وأقرب إلى التكلفة الواقعية للمشروع.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لذلك، إذا كنت تريد مقارنة عرضي سعر بطريقة ذكية، فلا تسأل فقط:{" "}
            <strong>من الأرخص؟</strong>
            بل اسأل:
            <strong> ماذا يتضمن كل عرض؟ وما الذي سأحصل عليه فعلًا؟</strong>
          </p>

          <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
            <h2 className="text-xl font-bold">الخلاصة السريعة</h2>
            <p className="mt-3 leading-relaxed opacity-90">
              المقارنة الصحيحة بين عرضي سعر لا تتم عبر الرقم النهائي فقط، بل عبر
              مقارنة <strong>النطاق، والمواد، والبنود، والاستثناءات، وآلية
              التنفيذ، والدفعات، والضمانات</strong>. إذا لم يكن العرضان مبنيين
              على نفس الأساس تقريبًا، فالمقارنة بينهما ستكون مضللة.
            </p>
          </div>

          <h2 className="mt-12 text-2xl font-bold">
            لماذا تكون مقارنة الأرقام وحدها خطأ؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            لأن الرقم النهائي هو{" "}
            <strong>نتيجة</strong>، وليس تفسيرًا. هو يخبرك كم المبلغ، لكنه لا
            يخبرك لماذا وصل إلى هذا المبلغ، ولا ما الذي يدخل تحته، ولا ما الذي
            تم استبعاده، ولا كيف تم افتراض مستوى المواد أو التنفيذ.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لهذا السبب، قد يبدو عرض أقل من الآخر بشكل واضح، لكن عند القراءة
            الدقيقة تكتشف أن الفرق ليس في التسعير فقط، بل في{" "}
            <strong>بنية العرض نفسها</strong>. وهنا تبدأ المقارنة الحقيقية.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            الخطوة الأولى: تأكد أن العرضين يتحدثان عن نفس النطاق
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            هذه أهم نقطة على الإطلاق. قبل أن تنظر إلى الأسعار، اسأل:
            <strong> هل العرضان يغطيان نفس العمل فعلًا؟</strong>
            هل كلاهما يشمل نفس البنود؟ هل كلاهما يشمل نفس المساحات؟ هل أحدهما
            يتضمن أعمالًا إضافية أو خارجية أو نهائية والآخر لا؟
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            إذا لم يكن النطاق متقاربًا، فالمقارنة لا تزال غير ناضجة. لأنك
            ببساطة تقارن مشروعين مختلفين ظاهريًا تحت عنوان واحد.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            الخطوة الثانية: قارن مستوى المواد لا أسماء البنود فقط
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            قد يذكر العرضان نفس البنود: دهانات، أرضيات، أبواب، سباكة، كهرباء،
            جبس، لكن الفرق الحقيقي قد يكون في{" "}
            <strong>مستوى المواد</strong>، لا في اسم البند نفسه.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لذلك لا يكفي أن ترى بند “أرضيات” موجودًا في العرضين، بل يجب أن تسأل:
            ما المستوى المفترض؟ ما نوعية المادة؟ هل التوقع في العرض الأول يشبه
            التوقع في العرض الثاني أم لا؟
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            كثير من العملاء يقعون في خطأ اعتبار البنود متساوية لمجرد أن العنوان
            نفسه مكرر في الجدول، بينما الواقع أن الفارق قد يكون كبيرًا جدًا في
            الجودة والسعر.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            الخطوة الثالثة: افهم ما هو مشمول وما هو غير مشمول
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            بعض العروض تبدو متشابهة جدًا حتى تكتشف أن أحدها يترك عددًا من البنود
            خارج التسعير. هنا يصبح العرض الأقل رقمًا أقل فقط لأنه{" "}
            <strong>يستثني أشياء مهمة</strong>، لا لأنه أفضل تسعيرًا.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لذلك اقرأ دائمًا:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>ما العناصر الداخلة ضمن السعر؟</li>
            <li>ما العناصر المستثناة؟</li>
            <li>هل التركيبات النهائية مشمولة أم لا؟</li>
            <li>هل هناك أعمال خارجية أو خدمات جانبية غير محسوبة؟</li>
            <li>هل توجد افتراضات لم تُكتب بوضوح؟</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            كلما كان هذا الجانب أوضح، أصبحت المقارنة أكثر عدلًا.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            الخطوة الرابعة: راقب البنود ذات التأثير المالي الأعلى
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            ليست كل البنود متساوية في أثرها على الميزانية. بعض البنود يمكن أن
            تغير السعر بشكل واضح، مثل:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>الأرضيات</li>
            <li>الأبواب</li>
            <li>السباكة والكهرباء</li>
            <li>العناصر الصحية</li>
            <li>الجبس والأعمال الديكورية</li>
            <li>الدهانات والحوائط والمعالجات الخاصة</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            إذا وجدت فرقًا في السعر بين عرضين، فابدأ بهذه البنود أولًا. كثيرًا
            ما يكون الفرق الحقيقي مختبئًا فيها، لا في البنود الصغيرة.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            الخطوة الخامسة: قارن مستوى الوضوح في كل عرض
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            العرض الجيد ليس فقط عرضًا منخفضًا أو عاليًا، بل عرضًا{" "}
            <strong>واضحًا</strong>. هل تستطيع فهمه بسهولة؟ هل يشرح نفسه؟ هل
            تعرف ما الذي ستحصل عليه؟ أم أنك تحتاج إلى افتراض أشياء كثيرة غير
            مكتوبة؟
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            العرض الواضح قد يبدو أطول أو أكثر تفصيلًا، لكنه غالبًا أكثر أمانًا
            من عرض مختصر جدًا يترك التفاصيل معلقة.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            الخطوة السادسة: افهم آلية الإضافات والتعديلات
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            لا يوجد مشروع يخلو تمامًا من احتمال الإضافة أو التعديل. لكن الفرق
            بين عرض وآخر يظهر في{" "}
            <strong>طريقة إدارة هذه المسألة</strong>. هل يوضح العرض كيف ستُحسب
            الإضافات؟ هل هناك آلية اعتماد؟ هل أي تغيير سيُوثق؟ أم أن الأمر
            متروك للنقاش المفتوح أثناء التنفيذ؟
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            العرض الذي يترك هذا الباب غامضًا قد يتحول لاحقًا إلى مصدر توتر أو
            تضخم في التكلفة، حتى لو كان رقمه الأولي منخفضًا.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            الخطوة السابعة: انظر إلى الدفعات والاستحقاقات
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            لا تقارن التكلفة فقط، بل قارن أيضًا{" "}
            <strong>طريقة الدفع</strong>. هل الدفعات مرتبطة بمراحل واضحة؟ هل
            هناك توازن منطقي بين ما يدفع وما يُنجز؟ هل العرض يربط الاستحقاق
            بالتنفيذ أم يتركه عامًا؟
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            أحيانًا يكون عرضان قريبين في الرقم، لكن أحدهما أكثر تنظيمًا في الدفعات،
            وهذا بحد ذاته عنصر مهم في راحة العميل وحسن إدارة المشروع.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            الخطوة الثامنة: انتبه للعبارات التسويقية غير المحددة
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            بعض العروض تستخدم كلمات مريحة مثل:
            “أفضل جودة”، “خامات ممتازة”، “تشطيب فاخر”، “تنفيذ احترافي”، دون أن
            تربط هذه الكلمات بتفاصيل يمكن فهمها. هنا يجب أن تسأل:
            <strong> ما المقصود عمليًا؟</strong>
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لأن المقارنة لا تُبنى على الانطباعات، بل على المعاني الواضحة داخل
            البنود والمواصفات.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            الخطوة التاسعة: اسأل نفسك ماذا يعني فرق السعر فعليًا؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            إذا كان هناك فرق واضح بين العرضين، فلا تتعامل معه فورًا على أنه فرق
            في “الربح” فقط. اسأل:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>هل الفرق بسبب مواد أعلى؟</li>
            <li>هل الفرق بسبب شمول بنود أكثر؟</li>
            <li>هل الفرق بسبب وضوح أعلى في العرض؟</li>
            <li>هل أحد العرضين يترك أمورًا كثيرة مفتوحة؟</li>
            <li>هل أحدهما مبني على افتراضات أقل واقعية؟</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            بهذه الطريقة يتحول فرق السعر من رقم مجرد إلى{" "}
            <strong>معلومة قابلة للفهم</strong>.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            هل العرض الأعلى يكون أحيانًا هو الاختيار الصحيح؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            نعم، إذا كان أوضح وأكثر اكتمالًا وانضباطًا. العرض الأعلى لا يكون
            مشكلة إذا كان يعطيك صورة أدق للمشروع الحقيقي. بل أحيانًا يكون العرض
            الأعلى هو{" "}
            <strong>الأقل مخاطرة</strong> لأنه يقلل احتمالات المفاجآت
            والاستثناءات والإضافات غير المتوقعة لاحقًا.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لذلك، لا تنظر إلى الأعلى سعرًا بوصفه “أسوأ” مباشرة، بل بوصفه عرضًا
            يحتاج فهم سبب ارتفاعه قبل الحكم عليه.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            ما العلامات التي تدل أن أحد العرضين أضعف من الآخر؟
          </h2>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>الوصف العام جدًا للبنود</li>
            <li>غياب تحديد المواد أو المستوى</li>
            <li>عدم وضوح الاستثناءات</li>
            <li>عدم وجود آلية للإضافات والتعديلات</li>
            <li>ضعف الربط بين الدفعات والمراحل</li>
            <li>صعوبة فهم ما الذي ستأخذه مقابل الرقم</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            وجود هذه العلامات لا يعني بالضرورة أن العرض غير صالح بالكامل، لكنه
            يعني أنه يحتاج إلى مراجعة أعمق قبل الاعتماد عليه.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            ما أفضل طريقة عملية للمقارنة؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            أفضل طريقة هي أن تتعامل مع المقارنة كأنك تقارن{" "}
            <strong>جدولين متوازيين</strong>:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>النطاق مقابل النطاق</li>
            <li>المواد مقابل المواد</li>
            <li>البنود الحساسة مقابل نظيرتها</li>
            <li>الاستثناءات مقابل الاستثناءات</li>
            <li>الدفعات مقابل الدفعات</li>
            <li>وضوح التنفيذ والاستلام مقابل نظيره</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            وعندها فقط تنظر إلى الرقم النهائي. بهذه الطريقة يصبح الرقم نتيجة
            منطقية للمقارنة، لا نقطة البداية الوحيدة.
          </p>

          <div className="mt-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 md:p-8">
            <h2 className="text-2xl font-bold">
              ابنِ تصورًا أوليًا قبل مقارنة العروض
            </h2>
            <p className="mt-3 leading-relaxed opacity-90">
              كلما كان لديك تصور أولي أوضح عن مشروعك ومستواه ونطاقه، أصبحت
              مقارنة العروض أسهل وأكثر دقة. يمكنك استخدام الحاسبة في الموقع
              لبناء هذا التصور قبل الدخول في مرحلة الاختيار النهائي.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-2xl">
                <Link to="/villa-finishing-price-riyadh">
                  افتح حاسبة التكلفة
                </Link>
              </Button>

              <Button asChild variant="outline" className="rounded-2xl">
                <Link to="/engineering-insights/cost/misleading-quotation-mistakes">
                  الأخطاء التي تجعل عرض السعر مضللًا
                </Link>
              </Button>
            </div>
          </div>

          <h2 className="mt-12 text-2xl font-bold">خلاصة التقرير</h2>

          <p className="mt-4 leading-relaxed opacity-90">
            مقارنة عرضي سعر لمشروع تشطيب لا تكون صحيحة إذا اقتصرت على الرقم
            النهائي فقط. المقارنة الذكية تبدأ من فهم{" "}
            <strong>النطاق، والمواد، والبنود، والاستثناءات، وآلية التنفيذ،
            والدفعات</strong>. كلما قارنت هذه العناصر بوضوح، أصبحت قراءتك
            للعروض أقرب للواقع.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            والقرار الصحيح ليس أن تختار الأرخص مباشرة، بل أن تختار{" "}
            <strong>العرض الأوضح والأكثر ملاءمة لمشروعك</strong>. لأن الوضوح في
            هذه المرحلة يقلل احتمالات المفاجآت، ويحسن قدرتك على ضبط الميزانية،
            ويجعل علاقتك بالتنفيذ أكثر استقرارًا منذ البداية.
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
                  to="/engineering-insights/cost/misleading-quotation-mistakes"
                  className="underline decoration-yellow-400 underline-offset-4 hover:opacity-80"
                >
                  الأخطاء التي تجعل عرض السعر مضللًا
                </Link>
              </li>
              <li>
                <Link
                  to="/engineering-insights/cost/how-to-estimate-project-cost-initially"
                  className="underline decoration-yellow-400 underline-offset-4 hover:opacity-80"
                >
                  كيف تحسب تكلفة مشروعك بشكل مبدئي؟
                </Link>
              </li>
              <li>
                <Link
                  to="/engineering-insights/how-to-choose-construction-company-riyadh"
                  className="underline decoration-yellow-400 underline-offset-4 hover:opacity-80"
                >
                  كيف تختار أفضل شركة مقاولات في الرياض؟
                </Link>
              </li>
            </ul>
          </div>

          <section className="mt-14">
            <h2 className="text-2xl font-bold mb-4">الأسئلة الشائعة</h2>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q1">
                <AccordionTrigger>
                  كيف أقارن بين عرضي سعر لمشروع تشطيب؟
                </AccordionTrigger>
                <AccordionContent>
                  تتم المقارنة الصحيحة عبر مراجعة النطاق والبنود والمواد
                  والاستثناءات وآلية التنفيذ والدفعات، وليس من خلال الرقم
                  النهائي فقط.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q2">
                <AccordionTrigger>
                  هل العرض الأرخص هو الأفضل دائمًا؟
                </AccordionTrigger>
                <AccordionContent>
                  لا، لأن بعض العروض الأرخص تكون أقل فقط بسبب استثناء بنود أو
                  استخدام مواد أدنى أو غياب تفاصيل مهمة من التسعير.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q3">
                <AccordionTrigger>
                  ما أهم شيء يجب التحقق منه عند مقارنة عرضين؟
                </AccordionTrigger>
                <AccordionContent>
                  أهم نقطة هي التأكد أن العرضين مبنيان على نفس النطاق تقريبًا
                  ونفس مستوى المواد، وإلا ستكون المقارنة مضللة.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q4">
                <AccordionTrigger>
                  هل فرق السعر بين عرضين يعني دائمًا فرقًا في الربح فقط؟
                </AccordionTrigger>
                <AccordionContent>
                  ليس دائمًا، فقد يكون فرق السعر ناتجًا عن اختلاف النطاق أو
                  جودة المواد أو شمول بنود إضافية أو وضوح أكبر في العرض الأعلى.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q5">
                <AccordionTrigger>
                  كيف أعرف أن عرض السعر ناقص أو غير واضح؟
                </AccordionTrigger>
                <AccordionContent>
                  إذا كان الوصف عامًا جدًا، أو لم يوضح المواد أو الاستثناءات أو
                  آلية الإضافات والدفعات، فغالبًا يحتاج العرض إلى مراجعة أعمق
                  قبل الاعتماد عليه.
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