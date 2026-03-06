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
  "https://pybcco.com/engineering-insights/cost/villa-300m-construction-cost-riyadh";

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
    headline: "تكلفة بناء فيلا 300 متر بالرياض | تقدير عملي للعظم والتشطيب وتسليم المفتاح",
    description:
      "دليل عملي لفهم تكلفة بناء فيلا 300 متر بالرياض، وما الذي يؤثر على الميزانية، مع أمثلة تقريبية للعظم والتشطيب وتسليم المفتاح قبل طلب عرض السعر.",
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
      "تكلفة بناء فيلا 300 متر بالرياض",
      "بناء فلل بالرياض",
      "تكلفة العظم",
      "تكلفة التشطيب",
      "تسليم مفتاح",
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
        name: "كم تكلفة بناء فيلا 300 متر بالرياض؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "تختلف تكلفة بناء فيلا 300 متر بالرياض حسب التصميم ونطاق الأعمال ومستوى التشطيب ونوعية المواد، لذلك لا يوجد رقم ثابت واحد لجميع الحالات.",
        },
      },
      {
        "@type": "Question",
        name: "هل مساحة 300 متر تعني تكلفة موحدة في جميع المشاريع؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "لا، لأن المساحة وحدها لا تكفي. اختلاف التصميم، وعدد الأدوار، والتفاصيل المعمارية، ومستوى المواد، كلها عوامل تؤثر على التكلفة النهائية.",
        },
      },
      {
        "@type": "Question",
        name: "هل الأفضل حساب التكلفة على أساس سعر المتر؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "سعر المتر مفيد للتقدير المبدئي فقط، لكنه لا يغني عن دراسة البنود الفعلية للمشروع إذا كان الهدف الوصول إلى ميزانية دقيقة.",
        },
      },
      {
        "@type": "Question",
        name: "ما الفرق بين العظم والتشطيب وتسليم المفتاح في فيلا 300 متر؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "العظم يشير عادة إلى الهيكل الإنشائي والأعمال الأساسية، والتشطيب يشمل الأعمال النهائية بحسب النطاق، أما تسليم المفتاح فيعني مشروعًا جاهزًا للاستخدام وفق البنود المتفق عليها.",
        },
      },
      {
        "@type": "Question",
        name: "ما أكثر شيء يرفع تكلفة فيلا 300 متر؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "من أكثر الأسباب تأثيرًا: تعقيد التصميم، جودة المواد، كثرة التعديلات أثناء التنفيذ، وعدم وضوح النطاق من البداية.",
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
        name: "تكلفة بناء فيلا 300 متر بالرياض",
        item: CANONICAL,
      },
    ],
  };
}

export default function Villa300mConstructionCostRiyadh() {
  const jsonLd = useMemo(() => {
    return [buildArticleJsonLd(), buildFaqJsonLd(), buildBreadcrumbJsonLd()];
  }, []);

  return (
    <main dir="rtl" className="py-16">
      <SeoHead
        title="تكلفة بناء فيلا 300 متر بالرياض | تقدير عملي للعظم والتشطيب وتسليم المفتاح | PYBCCO"
        description="تعرف على تكلفة بناء فيلا 300 متر بالرياض بطريقة عملية، مع شرح العوامل المؤثرة على السعر، وفروقات العظم والتشطيب وتسليم المفتاح."
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
            تكلفة بناء فيلا 300 متر بالرياض
          </h1>

          <p className="mt-3 text-lg opacity-80 leading-relaxed">
            تقدير عملي يساعدك على فهم الميزانية قبل طلب عرض السعر التفصيلي
          </p>

          <p className="mt-8 leading-relaxed opacity-90">
            عندما يبحث العميل عن <strong>تكلفة بناء فيلا 300 متر بالرياض</strong>،
            فهو غالبًا لا يبحث عن معلومة عامة فقط، بل يريد أن يعرف هل المشروع
            قريب من ميزانيته أم لا، وهل الرقم الذي يسمعه من السوق منطقي أم مبالغ
            فيه. وهذا يجعل هذا النوع من الأسئلة من أكثر الأسئلة أهمية قبل بدء أي
            مشروع سكني.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لكن رغم أن مساحة 300 متر تبدو واضحة ومحددة، فإن التكلفة النهائية لا
            يمكن اختصارها في رقم واحد فقط. السبب هو أن المساحة لا تمثل سوى جزء
            من الصورة، بينما بقية الصورة تتشكل من التصميم، وعدد الأدوار، ونطاق
            الأعمال، ومستوى المواد، وطريقة التنفيذ، ومستوى التشطيب المطلوب.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لهذا السبب، الهدف من هذا التقرير ليس إعطاء رقم جامد، بل تقديم{" "}
            <strong>إطار عملي واضح</strong> يساعدك على فهم كيف تُقرأ تكلفة فيلا
            300 متر بشكل منطقي، وما الفرق بين العظم والتشطيب وتسليم المفتاح،
            وما العوامل التي قد ترفع الميزانية أو تجعلها أكثر انضباطًا من
            البداية.
          </p>

          <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
            <h2 className="text-xl font-bold">الخلاصة السريعة</h2>
            <p className="mt-3 leading-relaxed opacity-90">
              <strong>تكلفة بناء فيلا 300 متر بالرياض</strong> تختلف بحسب نطاق
              المشروع والمستوى المطلوب. ويمكن استخدام سعر المتر أو النطاقات
              التقريبية لبناء تصور أولي، لكن القرار الصحيح يجب أن يعتمد في
              النهاية على عرض سعر تفصيلي يوضح البنود والمواصفات والاستثناءات.
            </p>
          </div>

          <h2 className="mt-12 text-2xl font-bold">
            هل مساحة 300 متر تعني تكلفة واضحة من البداية؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            ليس بالضرورة. مساحة 300 متر تساعد بالتأكيد في بناء تصور أولي، لكنها
            لا تعني أن المشروع أصبح واضح التكلفة بشكل كامل. فقد تكون هناك فيلتان
            بنفس المساحة، لكن إحداهما أبسط بكثير من الأخرى من حيث التصميم،
            والواجهات، والتفاصيل، والمواد، وبالتالي يكون الفرق في التكلفة كبيرًا
            رغم تطابق المساحة تقريبًا.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لذلك يجب التعامل مع مساحة 300 متر على أنها{" "}
            <strong>نقطة بداية جيدة</strong> للحساب، وليست وحدها العامل الحاسم
            في التسعير.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            ما الذي يقصده الناس عادة عند سؤال: تكلفة بناء فيلا 300 متر؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            هذا السؤال قد يحمل أكثر من معنى. بعض الناس يقصدون:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>تكلفة الهيكل الإنشائي فقط (العظم).</li>
            <li>تكلفة العظم مع التشطيب.</li>
            <li>تكلفة المشروع كاملًا من الحفر حتى تسليم المفتاح.</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            ومن هنا تبدأ أهمية توضيح النطاق. لأن مقارنة سعر عظم فقط بسعر مشروع
            كامل ستكون مقارنة خاطئة من البداية، حتى لو بدت الأرقام قريبة في
            ظاهرها.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            الفرق بين العظم والتشطيب وتسليم المفتاح في فيلا 300 متر
          </h2>

          <h3 className="mt-8 text-xl font-bold">1) العظم</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            يقصد به عادة الأعمال الهيكلية الأساسية للمشروع، مثل الحفر،
            والأساسات، والخرسانة، وبعض الأعمال الإنشائية المرتبطة بإقامة الهيكل
            الرئيسي للفيلا. هذه المرحلة مهمة جدًا لأنها تمثل البنية الأساسية التي
            سيُبنى عليها كل شيء لاحقًا.
          </p>

          <h3 className="mt-8 text-xl font-bold">2) التشطيب</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            يبدأ بعد اكتمال الهيكل الأساسي، ويشمل البنود النهائية التي تجعل
            الفيلا قابلة للاستخدام من الناحية الوظيفية والجمالية، مثل اللياسة،
            والدهانات، والأرضيات، والجبس، والأبواب، وبعض التركيبات بحسب النطاق.
          </p>

          <h3 className="mt-8 text-xl font-bold">3) تسليم المفتاح</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            يعني عادة مشروعًا تتم إدارته وتنفيذه حتى تصل الفيلا إلى مرحلة
            الجاهزية للاستخدام وفق البنود المكتوبة في العقد. وهنا يكون الوضوح في
            النطاق والمواصفات أهم من الاسم نفسه، لأن “تسليم المفتاح” قد يختلف في
            التفاصيل من عرض إلى آخر.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            مثال عملي لتصور أولي لفيلا 300 متر
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            إذا أردنا بناء تصور أولي منطقي لمشروع فيلا 300 متر، فالأفضل أن نفكر
            على شكل مستويات ونطاقات، لا كرقم واحد. مثلًا، قد يكون المشروع:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>مشروعًا يركز على الأساسيات مع مستوى تشطيب اقتصادي منظم.</li>
            <li>مشروعًا بمستوى متوسط وهو الأكثر شيوعًا في كثير من الحالات.</li>
            <li>مشروعًا بمستوى أعلى من حيث المواد والتفاصيل والتشطيبات.</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            في هذه المرحلة لا يكون الهدف تثبيت رقم نهائي، بل فهم أن{" "}
            <strong>الفرق بين المستويات</strong> قد يغيّر الميزانية بعشرات أو
            مئات الآلاف أحيانًا، خاصة عندما تتكرر فروقات المواد والتفاصيل على
            كامل المشروع.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            لماذا تختلف تكلفة فيلا 300 متر من مشروع إلى آخر؟
          </h2>

          <h3 className="mt-8 text-xl font-bold">1) اختلاف التصميم</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            التصميم البسيط يختلف عن التصميم الذي يحتوي على كتل معمارية كثيرة،
            وبروزات، وواجهات معقدة، وفراغات خاصة. وكلما ازداد التعقيد، ازدادت
            الحاجة إلى وقت أكبر وأعمال أكثر دقة وتكلفة أعلى.
          </p>

          <h3 className="mt-8 text-xl font-bold">2) اختلاف عدد الأدوار</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            مساحة 300 متر قد تكون موزعة بطرق مختلفة. فيلا بتوزيع أبسط تختلف عن
            مشروع متعدد الأدوار أو يحتوي على ملحقات وأسقف وتجهيزات إضافية. هذه
            الاختلافات تؤثر على التكلفة حتى لو كانت المساحة العامة نفسها.
          </p>

          <h3 className="mt-8 text-xl font-bold">3) اختلاف المواد</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            من أكثر الأسباب وضوحًا في اختلاف الأسعار اختيار المواد. فالفروقات
            بين الأرضيات، والدهانات، والأبواب، والعناصر الصحية، والإضاءة قد لا
            تبدو ضخمة عند النظر إلى كل بند منفصل، لكنها تصبح كبيرة عند جمعها
            على كامل مساحة المشروع.
          </p>

          <h3 className="mt-8 text-xl font-bold">4) اختلاف مستوى التشطيب</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            التشطيب الاقتصادي يختلف عن المتوسط، والمتوسط يختلف عن الفاخر في
            الجودة والتفاصيل والتكلفة. وهذا من أكثر العوامل تأثيرًا على ميزانية
            فيلا 300 متر.
          </p>

          <h3 className="mt-8 text-xl font-bold">5) اختلاف نطاق التنفيذ</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            بعض العروض تشمل بنودًا أكثر من غيرها، وبعضها يترك عناصر معينة خارج
            السعر، وبعضها يحدد مواد بمستوى مختلف. لذلك أي مقارنة بين الأسعار لا
            تكون عادلة إلا إذا كانت البنود متقاربة فعلًا.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            هل سعر المتر مناسب لحساب فيلا 300 متر؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            نعم، سعر المتر مفيد جدًا في هذه الحالة كأداة أولية، لأنه يسمح لك
            بتحويل السؤال العام إلى تصور أقرب للواقع. فإذا عرفت مساحة المشروع
            بوضوح، أمكنك بناء نطاق مبدئي يساعدك على فهم ما إذا كانت ميزانيتك
            متناسبة مع مستوى المشروع المستهدف.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لكن من المهم جدًا ألا يتحول سعر المتر إلى بديل عن دراسة البنود.
            فالرقم قد يكون مناسبًا على الورق، ثم يتغير لاحقًا إذا كانت المواد أو
            النطاق أو التصميم مختلفة عما كنت تفترضه.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            متى يكون الاعتماد على التقدير المبدئي مفيدًا؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            يكون مفيدًا عندما تكون في بداية المشروع وتحتاج إلى معرفة حدود
            الميزانية، أو عندما تريد المقارنة الأولية بين أكثر من خيار، أو عندما
            تحاول معرفة هل المشروع قابل للتنفيذ ضمن إمكانياتك الحالية أم لا.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            أما إذا وصلت إلى مرحلة التعاقد، فالتقدير المبدئي وحده لا يكفي. في
            هذه المرحلة تحتاج إلى{" "}
            <strong>عرض سعر تفصيلي مكتوب</strong> يحدد البنود والمواد
            والاستثناءات وآلية التنفيذ والاستلام.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            ما أكثر الأخطاء التي ترفع تكلفة فيلا 300 متر؟
          </h2>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>بدء المشروع دون حسم مستوى التشطيب المطلوب.</li>
            <li>التعديل المستمر في المواد أو التفاصيل أثناء التنفيذ.</li>
            <li>مقارنة الأرقام دون مقارنة النطاق والمواصفات.</li>
            <li>إغفال بعض البنود المهمة عند الحساب الأولي.</li>
            <li>اختيار تصميم معقد دون تقدير أثره المالي مسبقًا.</li>
            <li>الاعتماد على رقم عام من السوق باعتباره سعرًا نهائيًا.</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            كثير من هذه الأخطاء لا يتعلق بالمقاول وحده ولا بالسعر وحده، بل
            بطريقة التخطيط من البداية. وكلما كانت الصورة أوضح، كانت الميزانية
            أكثر انضباطًا.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            كيف تقرأ عرض سعر فيلا 300 متر بطريقة صحيحة؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            عند وصول عرض السعر، لا تنظر إلى الرقم النهائي فقط. بل اقرأ:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>ما هو نطاق العمل المشمول؟</li>
            <li>ما مستوى المواد المذكور في العرض؟</li>
            <li>هل هناك بنود مستثناة؟</li>
            <li>ما آلية احتساب الإضافات أو التعديلات؟</li>
            <li>هل يوجد وضوح في المدة والاستلامات والدفعات؟</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            العرض الجيد ليس فقط الأرخص، بل العرض الذي تستطيع فهمه بوضوح وتعرف
            ماذا ستحصل مقابله فعلًا.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            كيف تبني قرارًا ماليًا أكثر ذكاءً؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            القرار الذكي يبدأ من تقسيم الموضوع إلى مراحل:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>أولًا: بناء تصور مبدئي للمشروع ومساحته ونطاقه.</li>
            <li>ثانيًا: تحديد مستوى التشطيب الذي تريده فعليًا.</li>
            <li>ثالثًا: استخدام تقدير أولي أو حاسبة لبناء إطار مالي منطقي.</li>
            <li>رابعًا: طلب عرض سعر تفصيلي قابل للقراءة والمقارنة.</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            بهذه الطريقة لا تعتمد على التخمين، ولا تدخل في المشروع بصورة ضبابية،
            بل تبني قرارك على فهم تدريجي ومنظم.
          </p>

          <div className="mt-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 md:p-8">
            <h2 className="text-2xl font-bold">احسب تكلفة مشروعك بشكل مبدئي</h2>
            <p className="mt-3 leading-relaxed opacity-90">
              إذا كنت تريد تصورًا أوليًا لمشروع فيلا 300 متر قبل الدخول في عرض
              سعر تفصيلي، يمكنك استخدام الحاسبة في الموقع. الحاسبة لا تعطي سعرًا
              نهائيًا، لكنها تساعدك على فهم حدود الميزانية المتوقعة بطريقة عملية.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-2xl">
                <Link to="/villa-finishing-price-riyadh">
                  افتح حاسبة التكلفة
                </Link>
              </Button>

              <Button asChild variant="outline" className="rounded-2xl">
                <Link to="/construction-company-riyadh">خدمات المقاولات</Link>
              </Button>
            </div>
          </div>

          <h2 className="mt-12 text-2xl font-bold">خلاصة التقرير</h2>

          <p className="mt-4 leading-relaxed opacity-90">
            <strong>تكلفة بناء فيلا 300 متر بالرياض</strong> لا تُفهم من المساحة
            وحدها، بل من خلال فهم النطاق الكامل للمشروع، ومستوى التشطيب،
            والتصميم، والمواد، وطريقة التنفيذ. ولهذا فإن الرقم التقريبي مفيد
            كبداية، لكنه لا يكفي وحده لبناء قرار نهائي.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            كلما تعاملت مع المشروع كمنظومة مترابطة من قرارات واضحة، أصبحت قدرتك
            على ضبط الميزانية أعلى، وأصبحت قراءتك للعروض أكثر دقة، وقلت احتمالات
            المفاجآت أثناء التنفيذ.
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
                  to="/engineering-insights/cost/villa-construction-cost-riyadh"
                  className="underline decoration-yellow-400 underline-offset-4 hover:opacity-80"
                >
                  تكلفة بناء فيلا بالرياض
                </Link>
              </li>
              <li>
                <Link
                  to="/engineering-insights/cost/villa-finishing-cost-riyadh"
                  className="underline decoration-yellow-400 underline-offset-4 hover:opacity-80"
                >
                  تكلفة تشطيب فيلا بالرياض
                </Link>
              </li>
              <li>
                <Link
                  to="/engineering-insights/cost/finishing-price-per-meter-riyadh"
                  className="underline decoration-yellow-400 underline-offset-4 hover:opacity-80"
                >
                  سعر متر التشطيب في الرياض
                </Link>
              </li>
            </ul>
          </div>

          <section className="mt-14">
            <h2 className="text-2xl font-bold mb-4">الأسئلة الشائعة</h2>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q1">
                <AccordionTrigger>
                  كم تكلفة بناء فيلا 300 متر بالرياض؟
                </AccordionTrigger>
                <AccordionContent>
                  تختلف تكلفة بناء فيلا 300 متر بالرياض حسب التصميم ونطاق
                  الأعمال ومستوى التشطيب ونوعية المواد، لذلك لا يوجد رقم ثابت
                  واحد لجميع الحالات.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q2">
                <AccordionTrigger>
                  هل مساحة 300 متر تعني تكلفة موحدة في جميع المشاريع؟
                </AccordionTrigger>
                <AccordionContent>
                  لا، لأن المساحة وحدها لا تكفي. اختلاف التصميم، وعدد الأدوار،
                  والتفاصيل المعمارية، ومستوى المواد، كلها عوامل تؤثر على
                  التكلفة النهائية.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q3">
                <AccordionTrigger>
                  هل الأفضل حساب التكلفة على أساس سعر المتر؟
                </AccordionTrigger>
                <AccordionContent>
                  سعر المتر مفيد للتقدير المبدئي فقط، لكنه لا يغني عن دراسة
                  البنود الفعلية للمشروع إذا كان الهدف الوصول إلى ميزانية دقيقة.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q4">
                <AccordionTrigger>
                  ما الفرق بين العظم والتشطيب وتسليم المفتاح في فيلا 300 متر؟
                </AccordionTrigger>
                <AccordionContent>
                  العظم يشير عادة إلى الهيكل الإنشائي والأعمال الأساسية، والتشطيب
                  يشمل الأعمال النهائية بحسب النطاق، أما تسليم المفتاح فيعني
                  مشروعًا جاهزًا للاستخدام وفق البنود المتفق عليها.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q5">
                <AccordionTrigger>
                  ما أكثر شيء يرفع تكلفة فيلا 300 متر؟
                </AccordionTrigger>
                <AccordionContent>
                  من أكثر الأسباب تأثيرًا: تعقيد التصميم، جودة المواد، كثرة
                  التعديلات أثناء التنفيذ، وعدم وضوح النطاق من البداية.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </article>
      </div>
    </main>
  );
}