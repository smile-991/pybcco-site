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
  "https://pybcco.com/engineering-insights/cost/misleading-quotation-mistakes";

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
      "الأخطاء التي تجعل عرض السعر مضللًا | كيف تقرأ عروض الأسعار بشكل صحيح قبل التعاقد؟",
    description:
      "دليل عملي يشرح الأخطاء التي تجعل عرض السعر مضللًا في مشاريع البناء والتشطيب، وكيف تميّز بين السعر الواضح والسعر الذي يبدو أقل فقط بسبب غموض البنود أو ضعف التفاصيل.",
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
      "عرض السعر",
      "أخطاء عرض السعر",
      "عروض أسعار التشطيب",
      "مقارنة عروض الأسعار",
      "تكلفة التشطيب",
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
        name: "متى يكون عرض السعر مضللًا؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "يكون عرض السعر مضللًا عندما يكون غامضًا في البنود أو المواد أو النطاق، أو عندما يبدو أقل فقط لأنه يستثني عناصر مهمة أو يترك تفاصيل كثيرة مفتوحة للتفسير لاحقًا.",
        },
      },
      {
        "@type": "Question",
        name: "هل السعر الأرخص يعني دائمًا عرضًا أفضل؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "لا، لأن بعض العروض الأرخص تكون أقل فقط بسبب نقص في التوضيح أو استثناء بنود مهمة أو استخدام مواد بمستوى أدنى من المتوقع.",
        },
      },
      {
        "@type": "Question",
        name: "ما أهم شيء يجب مراجعته في عرض السعر؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "أهم شيء هو وضوح النطاق، وتحديد المواد أو المستوى، ومعرفة ما هو مشمول وما هو غير مشمول، وآلية احتساب الإضافات أو التعديلات.",
        },
      },
      {
        "@type": "Question",
        name: "كيف أقارن بين عرضين بشكل صحيح؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "بمقارنة النطاق والبنود والمواد والاستثناءات وطريقة التنفيذ، وليس بمقارنة الرقم النهائي فقط.",
        },
      },
      {
        "@type": "Question",
        name: "هل العرض المختصر يعتبر مشكلة دائمًا؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "ليس دائمًا، لكنه يصبح مشكلة عندما يكون الاختصار على حساب الوضوح، لأن البنود غير المحددة قد تتحول لاحقًا إلى إضافات أو خلافات أو توقعات مختلفة بين الطرفين.",
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
        name: "الأخطاء التي تجعل عرض السعر مضللًا",
        item: CANONICAL,
      },
    ],
  };
}

export default function MisleadingQuotationMistakes() {
  const jsonLd = useMemo(() => {
    return [buildArticleJsonLd(), buildFaqJsonLd(), buildBreadcrumbJsonLd()];
  }, []);

  return (
    <main dir="rtl" className="py-16">
      <SeoHead
        title="الأخطاء التي تجعل عرض السعر مضللًا | كيف تقرأ عروض الأسعار بشكل صحيح؟ | PYBCCO"
        description="تعرف على الأخطاء التي تجعل عرض السعر مضللًا في مشاريع البناء والتشطيب، وكيف تميّز بين السعر الواضح والسعر الذي يبدو أقل فقط بسبب غموض البنود."
        canonical={CANONICAL}
        robots="index,follow,max-image-preview:large"
        jsonLd={jsonLd}
      />

      <div className="container mx-auto px-4">
        <article className="max-w-4xl">
          <div className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-sm font-medium">
            تقرير ضمن قسم التكلفة والتسعير
          </div>

          <h1 className="mt-5 text-3xl md:text-4xl font-bold leading-tight">
            الأخطاء التي تجعل عرض السعر مضللًا
          </h1>

          <p className="mt-3 text-lg opacity-80 leading-relaxed">
            كيف تميّز بين العرض الواضح والعرض الذي يبدو أقل فقط على الورق؟
          </p>

          <p className="mt-8 leading-relaxed opacity-90">
            كثير من العملاء يظنون أن أصعب جزء في مرحلة ما قبل التنفيذ هو معرفة
            <strong> كم سيكلف المشروع</strong>، لكن في الواقع هناك سؤال آخر أكثر
            أهمية:
            <strong> هل عرض السعر الذي أمامي واضح فعلًا أم مضلل؟</strong>
            لأن المشكلة في كثير من الحالات لا تكون في وجود سعر مرتفع أو منخفض،
            بل في أن العرض نفسه لا يوضح بما يكفي{" "}
            <strong>ما الذي يتضمنه وما الذي لا يتضمنه</strong>.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            ولهذا السبب يقع كثير من العملاء في خطأ شائع: يختارون العرض الأقل
            رقمًا وهم يظنون أنهم وفروا، ثم يكتشفون لاحقًا أن هذا الفرق في السعر
            لم يكن توفيرًا حقيقيًا، بل كان نتيجة{" "}
            <strong>غموض أو نقص في البنود أو اختلاف في مستوى المواد</strong>.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            في هذا التقرير سنشرح أهم الأخطاء التي تجعل عرض السعر مضللًا، وكيف
            تقرأ أي عرض بشكل أذكى، وما الذي يجب أن تبحث عنه قبل أن تقارن بين
            رقمين أو تتخذ قرار التعاقد.
          </p>

          <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
            <h2 className="text-xl font-bold">الخلاصة السريعة</h2>
            <p className="mt-3 leading-relaxed opacity-90">
              عرض السعر يصبح مضللًا عندما يكون الرقم واضحًا لكن{" "}
              <strong>النطاق غير واضح</strong>، أو عندما يكون الوصف عامًا جدًا،
              أو عندما تُترك المواد والمواصفات والاستثناءات مفتوحة للتفسير لاحقًا.
              لذلك لا تقارن الأرقام وحدها، بل قارن دائمًا{" "}
              <strong>ما وراء الرقم</strong>.
            </p>
          </div>

          <h2 className="mt-12 text-2xl font-bold">
            لماذا يبدو بعض عروض الأسعار أقل من غيرها؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            ليس دائمًا لأن الجهة المنفذة أرخص فعلًا أو أكثر كفاءة، بل أحيانًا
            لأن العرض بُني على{" "}
            <strong>افتراضات غير مكتوبة أو تفاصيل ناقصة</strong>. والنتيجة أن
            الرقم يبدو مريحًا في البداية، لكن عند التعمق في التنفيذ أو مناقشة
            التفاصيل تظهر بنود إضافية أو اختلافات في التوقعات.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لذلك يجب أن تتذكر دائمًا أن العرض الأقل رقمًا ليس بالضرورة الأقل
            تكلفة فعليًا، كما أن العرض الأعلى ليس بالضرورة مبالغة. الفارق الحقيقي
            قد يكون ببساطة أن أحد العرضين أوضح من الآخر.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            1) الوصف العام جدًا للبنود
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            من أكثر الأخطاء شيوعًا أن يكتب العرض عبارات عامة مثل:
            “تشطيب كامل”، “أعمال كهرباء”، “أعمال سباكة”، “أرضيات”، “دهانات”،
            دون أي توضيح كافٍ. هذا النوع من العبارات قد يبدو منظمًا للوهلة
            الأولى، لكنه في الحقيقة يفتح بابًا واسعًا للتفسير المختلف بين العميل
            والجهة المنفذة.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            عندما يكون الوصف عامًا، يصبح السؤال الطبيعي:
            <strong> أي مستوى؟ أي مواد؟ ما حدود هذا البند؟</strong>
            وإذا لم تكن هذه النقاط واضحة، فالعرض لا يزال ناقصًا حتى لو بدا
            رسميًا.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            2) غياب تحديد المواد أو المستوى
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            كثير من الفروقات الكبيرة في السعر تأتي من{" "}
            <strong>اختلاف مستوى المواد</strong>. فإذا كان العرض لا يوضح ما إذا
            كان المقصود مستوى اقتصادي أو متوسط أو فاخر، أو لا يبين نوعية
            العناصر الأساسية ولو بشكل عام، فإن الرقم يصبح بلا مرجع واضح.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            وهنا قد يظن العميل أن السعر يشمل مستوى معينًا، بينما يكون المقصود في
            الواقع مستوى أقل. وعندما تبدأ المناقشة التفصيلية تظهر الفروقات
            المالية فجأة.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            3) عدم وضوح ما هو مشمول وما هو غير مشمول
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            هذه من أخطر النقاط. بعض العروض تذكر البنود الأساسية، لكنها لا توضح
            بشكل صريح ما هو{" "}
            <strong>مستثنى من السعر</strong>. وهنا تبدأ المفاجآت: هل الإنارة
            داخلة؟ هل الأدوات الصحية داخلة؟ هل الأبواب داخلة؟ هل الأعمال
            الخارجية محسوبة؟ هل النقل أو التعديلات أو بعض التركيبات مشمولة أم
            لا؟
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            كل عرض لا يوضح الاستثناءات بوضوح يترك بابًا مفتوحًا لارتفاع التكلفة
            أو لسوء الفهم لاحقًا.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            4) مقارنة عروض مبنية على نطاقات مختلفة
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            أحيانًا لا يكون العرض مضللًا في ذاته، لكن المشكلة تكون في طريقة
            المقارنة. إذا كان أحد العرضين يشمل نطاقًا أوسع من الآخر، أو يتضمن
            عناصر إضافية أو مواد أفضل أو تفاصيل تنفيذ أعلى، فإن مقارنة الرقمين
            مباشرة ستكون مقارنة خاطئة.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لذلك من أهم قواعد قراءة عروض الأسعار:
            <strong> لا تقارن رقمًا برقم، بل قارن نطاقًا بنطاق</strong>.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            5) ترك التعديلات والإضافات دون آلية واضحة
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            لا يوجد مشروع يخلو تمامًا من احتمالية التعديل أو الإضافة، لكن الخطر
            الحقيقي يبدأ عندما يكون العرض صامتًا تمامًا عن كيفية التعامل مع هذه
            الأمور. كيف ستُحتسب الإضافات؟ كيف يتم اعتمادها؟ هل كل تعديل يحتاج
            موافقة؟ هل الأسعار الإضافية مرتبطة بمنطق واضح أم لا؟
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            العرض الجيد لا يمنع التعديلات، لكنه يوضح{" "}
            <strong>كيف ستتم إدارتها</strong>. أما العرض الذي يترك هذا الباب
            مفتوحًا بالكامل، فقد يتحول بسهولة إلى مصدر توتر وارتفاعات مالية غير
            متوقعة.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            6) غياب الربط بين الدفعات والبنود أو المراحل
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            من العلامات التي تجعل العرض ضعيفًا أو مربكًا أن يذكر الدفعات بشكل
            منفصل دون ربطها بمراحل واضحة أو إنجازات فعلية. في هذه الحالة قد
            يكون هناك ضبابية في فهم متى يستحق كل مبلغ، وما الذي يُسلّم مقابله،
            وما هي المرحلة التي تعتبر منجزة فعليًا.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            الربط الواضح بين الدفعات والمراحل يعطي العميل والجهة المنفذة صورة
            أكثر استقرارًا، ويقلل من الخلافات على الاستحقاق والزمن.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            7) الإيجاز الزائد الذي يبدو احترافيًا لكنه ناقص
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            بعض العروض تبدو أنيقة ومختصرة جدًا، وهذا قد يعطي انطباعًا بالاحتراف.
            لكن الاختصار الزائد يصبح مشكلة عندما يحذف{" "}
            <strong>المعلومات التي يحتاجها القرار</strong>. العرض ليس بروشورًا
            تسويقيًا، بل أداة توضيح وتفاهم. وإذا اختصر على حساب وضوح البنود،
            فإن أناقته الشكلية لا تعني أنه صالح للمقارنة أو التعاقد.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            8) إغفال البنود ذات التأثير العالي
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            بعض البنود تؤثر بقوة على الميزانية مثل الأرضيات، والسباكة،
            والكهرباء، والأبواب، والعناصر الصحية، والأعمال الجبسية. إذا لم تكن
            هذه البنود واضحة بما يكفي، أو إذا وردت بشكل مختصر جدًا، فإن أثرها
            المالي قد يظهر لاحقًا كمفاجأة كبيرة.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لذلك في أي عرض سعر، ابحث دائمًا عن البنود التي تملك{" "}
            <strong>أعلى قابلية لتغيير التكلفة</strong>، وليس فقط عن عدد البنود
            أو شكل الجدول.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            9) استخدام كلمات مريحة دون تعريف فعلي
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            مثل: “تشطيب ممتاز”، “مواد عالية الجودة”، “تسليم مفتاح”، “تنفيذ
            احترافي”، “أفضل الخامات”. هذه الكلمات قد تكون صحيحة أو غير صحيحة،
            لكن المشكلة أنها لا تكفي وحدها. إذا لم يكن هناك ما يوضح المقصود
            عمليًا، فإن هذه الكلمات تبقى{" "}
            <strong>وصفًا عامًا لا يساعد في اتخاذ قرار مالي</strong>.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            اسأل دائمًا: ما تعريف هذه العبارة داخل هذا العرض؟ ما الذي تعنيه
            فعليًا في البنود؟ كيف ستنعكس على المواد والتنفيذ؟
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            10) تجاهل قراءة العرض ككل والتركيز على الرقم فقط
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            هذا ربما يكون الخطأ الأكبر. قد يكون العرض واضحًا نسبيًا، لكن العميل
            يختصر كل شيء في السؤال:
            <strong> كم الرقم النهائي؟</strong>
            وهنا تضيع الفروق المهمة بين العروض. لأن السعر وحده لا يشرح الجودة،
            ولا يشرح النطاق، ولا يشرح المواد، ولا يشرح الاستثناءات.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            قراءة العرض الصحيح تبدأ من السؤال:
            <strong> ماذا سأحصل مقابل هذا الرقم؟</strong>
            لا من السؤال:
            <strong> ما أقل رقم موجود؟</strong>
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            كيف تكتشف أن العرض يحتاج مراجعة أعمق؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            إذا وجدت واحدة أو أكثر من العلامات التالية، فالعرض يحتاج قراءة أعمق:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>وصف عام جدًا للبنود.</li>
            <li>عدم وجود تمييز واضح بين المشمول والمستثنى.</li>
            <li>غياب الإشارة إلى مستوى المواد أو الجودة.</li>
            <li>عدم وضوح طريقة التعامل مع التعديلات.</li>
            <li>وجود رقم إجمالي مريح لكن تفاصيل قليلة.</li>
            <li>صعوبة مقارنة البنود مع عرض آخر بسبب ضعف التحديد.</li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold">
            كيف تقرأ عرض السعر بشكل صحيح؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            القراءة الصحيحة لأي عرض يجب أن تمر على هذه النقاط:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>ما هو نطاق العمل بالضبط؟</li>
            <li>ما البنود المذكورة؟ وهل هي واضحة بما يكفي؟</li>
            <li>ما مستوى المواد أو المواصفات؟</li>
            <li>ما العناصر المستثناة؟</li>
            <li>كيف سيتم احتساب الإضافات أو التعديلات؟</li>
            <li>هل الدفعات مرتبطة بمراحل مفهومة؟</li>
            <li>هل يمكن مقارنة العرض بسهولة مع عرض آخر؟</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            إذا كانت هذه النقاط واضحة، فالعرض غالبًا أقرب لأن يكون عرضًا صالحًا
            للمقارنة واتخاذ القرار.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            متى يكون العرض الأغلى أفضل فعليًا؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            عندما يكون أوضح، وأشمل، وأكثر ضبطًا في البنود والمواد والنطاق. في
            هذه الحالة لا يكون “أغلى” بمعنى سلبي، بل قد يكون{" "}
            <strong>أقرب للواقع</strong>. وأحيانًا يكون العرض الأرخص أقل فقط لأنه
            يترك فراغات كثيرة ستتحول لاحقًا إلى إضافات أو إلى خيبة أمل في مستوى
            التنفيذ.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لذلك لا تسأل فقط: “من أرخص؟” بل اسأل أيضًا:
            <strong> من أوضح؟</strong>
          </p>

          <div className="mt-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 md:p-8">
            <h2 className="text-2xl font-bold">ابنِ تصورًا أوليًا قبل مقارنة العروض</h2>
            <p className="mt-3 leading-relaxed opacity-90">
              قبل أن تقارن بين أكثر من عرض سعر، من الأفضل أن يكون لديك تصور
              أولي عن مشروعك ومستواه ونطاقه. الحاسبة في الموقع تساعدك على بناء
              هذا التصور حتى تصبح قراءتك للعروض أكثر دقة.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-2xl">
                <Link to="/villa-finishing-price-riyadh">
                  افتح حاسبة التكلفة
                </Link>
              </Button>

              <Button asChild variant="outline" className="rounded-2xl">
                <Link to="/engineering-insights/cost/how-to-estimate-project-cost-initially">
                  كيف تحسب تكلفة مشروعك بشكل مبدئي؟
                </Link>
              </Button>
            </div>
          </div>

          <h2 className="mt-12 text-2xl font-bold">خلاصة التقرير</h2>

          <p className="mt-4 leading-relaxed opacity-90">
            العرض المضلل لا يكون دائمًا كذبًا صريحًا، بل يكون كثيرًا نتيجة{" "}
            <strong>نقص في الوضوح</strong>. رقم واضح مع نطاق غامض، أو بنود
            مختصرة جدًا، أو مواد غير محددة، أو استثناءات غير مذكورة، كلها أمور
            تجعل المقارنة ضعيفة والقرار هشًا.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            وكلما قرأت العرض بعين تبحث عن{" "}
            <strong>المعنى وراء الرقم</strong>، لا عن الرقم وحده، أصبحت قدرتك
            على اختيار العرض الصحيح أعلى، وقلت احتمالات أن يتحول المشروع لاحقًا
            إلى سلسلة من الإضافات أو الخلافات أو المفاجآت غير المرغوبة.
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
                  to="/engineering-insights/cost/how-to-estimate-project-cost-initially"
                  className="underline decoration-yellow-400 underline-offset-4 hover:opacity-80"
                >
                  كيف تحسب تكلفة مشروعك بشكل مبدئي؟
                </Link>
              </li>
              <li>
                <Link
                  to="/engineering-insights/cost/what-increases-finishing-cost-riyadh"
                  className="underline decoration-yellow-400 underline-offset-4 hover:opacity-80"
                >
                  ما الذي يرفع تكلفة التشطيب في الرياض؟
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
                  متى يكون عرض السعر مضللًا؟
                </AccordionTrigger>
                <AccordionContent>
                  يكون عرض السعر مضللًا عندما يكون غامضًا في البنود أو المواد أو
                  النطاق، أو عندما يبدو أقل فقط لأنه يستثني عناصر مهمة أو يترك
                  تفاصيل كثيرة مفتوحة للتفسير لاحقًا.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q2">
                <AccordionTrigger>
                  هل السعر الأرخص يعني دائمًا عرضًا أفضل؟
                </AccordionTrigger>
                <AccordionContent>
                  لا، لأن بعض العروض الأرخص تكون أقل فقط بسبب نقص في التوضيح أو
                  استثناء بنود مهمة أو استخدام مواد بمستوى أدنى من المتوقع.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q3">
                <AccordionTrigger>
                  ما أهم شيء يجب مراجعته في عرض السعر؟
                </AccordionTrigger>
                <AccordionContent>
                  أهم شيء هو وضوح النطاق، وتحديد المواد أو المستوى، ومعرفة ما هو
                  مشمول وما هو غير مشمول، وآلية احتساب الإضافات أو التعديلات.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q4">
                <AccordionTrigger>
                  كيف أقارن بين عرضين بشكل صحيح؟
                </AccordionTrigger>
                <AccordionContent>
                  بمقارنة النطاق والبنود والمواد والاستثناءات وطريقة التنفيذ،
                  وليس بمقارنة الرقم النهائي فقط.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q5">
                <AccordionTrigger>
                  هل العرض المختصر يعتبر مشكلة دائمًا؟
                </AccordionTrigger>
                <AccordionContent>
                  ليس دائمًا، لكنه يصبح مشكلة عندما يكون الاختصار على حساب
                  الوضوح، لأن البنود غير المحددة قد تتحول لاحقًا إلى إضافات أو
                  خلافات أو توقعات مختلفة بين الطرفين.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </article>
      </div>
    </main>
  );
}