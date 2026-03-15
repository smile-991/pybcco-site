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
  "https://pybcco.com/engineering-insights/cost/how-to-estimate-project-cost-initially";

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
      "كيف تحسب تكلفة مشروعك بشكل مبدئي؟ دليل عملي قبل طلب عرض السعر",
    description:
      "دليل عملي يساعدك على حساب تكلفة مشروعك بشكل مبدئي قبل طلب عرض السعر، مع شرح العوامل التي تؤثر على التقدير الأولي وكيف تبني تصورًا أقرب للواقع.",
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
      "حساب تكلفة المشروع",
      "تقدير تكلفة مبدئي",
      "تكلفة التشطيب",
      "تكلفة البناء",
      "حاسبة تكلفة التشطيب",
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
        name: "كيف أحسب تكلفة مشروعي بشكل مبدئي؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "ابدأ بتحديد نوع المشروع ومساحته ونطاق الأعمال ومستوى التشطيب المطلوب، ثم استخدم نطاقًا سعريًا مبدئيًا أو حاسبة أولية لبناء تصور تقريبي قبل طلب عرض السعر التفصيلي.",
        },
      },
      {
        "@type": "Question",
        name: "هل التقدير المبدئي يكفي لاتخاذ قرار نهائي؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "لا، التقدير المبدئي مفيد لفهم الميزانية العامة فقط، أما القرار النهائي فيحتاج إلى عرض سعر تفصيلي يوضح البنود والمواد والمواصفات والاستثناءات.",
        },
      },
      {
        "@type": "Question",
        name: "ما أكثر عامل يسبب خطأ في التقدير الأولي؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "من أكثر الأسباب شيوعًا: عدم وضوح نطاق العمل، وعدم تحديد مستوى التشطيب، وإغفال بعض البنود المهمة أو افتراض أن كل المشاريع تتشابه في التكلفة.",
        },
      },
      {
        "@type": "Question",
        name: "هل المساحة وحدها تكفي لتقدير تكلفة المشروع؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "لا، المساحة عنصر مهم لكنها ليست العامل الوحيد. فالتصميم والمواد ونطاق الأعمال ومستوى التفاصيل قد تغير التقدير بشكل واضح.",
        },
      },
      {
        "@type": "Question",
        name: "متى أستخدم الحاسبة ومتى أطلب عرض سعر؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "استخدم الحاسبة في مرحلة التصور الأولي، واطلب عرض سعر عندما تكون أقرب إلى التنفيذ وتحتاج معرفة البنود والمواصفات والتكلفة بشكل أدق.",
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
        name: "كيف تحسب تكلفة مشروعك بشكل مبدئي؟",
        item: CANONICAL,
      },
    ],
  };
}

export default function HowToEstimateProjectCostInitially() {
  const jsonLd = useMemo(() => {
    return [buildArticleJsonLd(), buildFaqJsonLd(), buildBreadcrumbJsonLd()];
  }, []);

  return (
    <>
      <SeoHead
        title="كيف تحسب تكلفة مشروعك بشكل مبدئي؟ دليل عملي قبل طلب عرض السعر | PYBCCO"
        description="تعرف على الطريقة الصحيحة لحساب تكلفة مشروعك بشكل مبدئي قبل طلب عرض السعر، مع فهم العوامل التي تؤثر على التقدير الأولي وكيف تبني تصورًا أقرب للواقع."
        canonical={CANONICAL}
        robots="index,follow,max-image-preview:large"
        ogType="article"
        jsonLd={jsonLd}
      />

      <div className="container mx-auto px-4">
        <article className="max-w-4xl">
          <div className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-sm font-medium">
            تقرير ضمن قسم التكلفة والتسعير
          </div>

          <h1 className="mt-5 text-3xl md:text-4xl font-bold leading-tight">
            كيف تحسب تكلفة مشروعك بشكل مبدئي؟
          </h1>

          <p className="mt-3 text-lg opacity-80 leading-relaxed">
            دليل عملي يساعدك على بناء تصور أولي أقرب للواقع قبل طلب عرض السعر
          </p>

          <p className="mt-8 leading-relaxed opacity-90">
            من أكثر الأخطاء الشائعة عند بداية أي مشروع بناء أو تشطيب أن يبحث
            العميل مباشرة عن <strong>رقم نهائي</strong> قبل أن يحدد أصلًا ما هو
            المشروع الذي يريد تنفيذه، وما هو نطاق العمل، وما مستوى التشطيب أو
            المواد التي يتخيلها. لذلك تكون النتيجة غالبًا إما أرقام عامة لا
            تساعد فعليًا، أو توقعات غير دقيقة تُسبب ارتباكًا لاحقًا.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            الطريقة الأصح ليست أن تبحث عن “السعر النهائي” من أول لحظة، بل أن
            تبني أولًا <strong>تقديرًا مبدئيًا منطقيًا</strong>. هذا التقدير لا
            يعطيك سعرًا نهائيًا للتعاقد، لكنه يمنحك شيئًا مهمًا جدًا:{" "}
            <strong>فهمًا أوليًا لحجم المشروع ماليًا</strong>. وبدون هذا الفهم،
            يصبح أي قرار لاحق، سواء في اختيار المستوى أو مقارنة العروض أو ضبط
            الميزانية، قرارًا ضعيفًا.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            في هذا التقرير سنشرح كيف تحسب تكلفة مشروعك بشكل مبدئي بطريقة عملية
            ومنظمة، وما العناصر التي يجب أن تحددها قبل أي تقدير، وما الأخطاء التي
            تجعل التقدير مضللًا، ومتى يكون التقدير الأولي كافيًا، ومتى يجب
            الانتقال إلى عرض سعر تفصيلي.
          </p>

          <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
            <h2 className="text-xl font-bold">الخلاصة السريعة</h2>
            <p className="mt-3 leading-relaxed opacity-90">
              لحساب <strong>تكلفة مشروعك بشكل مبدئي</strong> تحتاج أولًا إلى
              تحديد نوع المشروع، والمساحة، ونطاق الأعمال، ومستوى التشطيب أو
              المواد، ثم استخدام تقدير أولي أو حاسبة تساعدك على بناء صورة عامة.
              لكن هذا التقدير ليس بديلًا عن عرض سعر تفصيلي عندما تقترب من قرار
              التنفيذ.
            </p>
          </div>

          <h2 className="mt-12 text-2xl font-bold">
            لماذا تحتاج إلى تقدير مبدئي أصلًا؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            لأن بداية المشروع دائمًا تكون مليئة بالأسئلة المفتوحة. هل ميزانيتك
            الحالية تكفي؟ هل المشروع أقرب إلى مستوى اقتصادي أم متوسط؟ هل الفرق
            بين خيار وآخر كبير أم محدود؟ هل الدخول في تنفيذ كامل الآن منطقي أم
            يحتاج إلى إعادة ترتيب للأولويات؟
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            التقدير المبدئي لا يحل كل هذه الأسئلة، لكنه يمنحك{" "}
            <strong>أرضية واقعية</strong> تقف عليها. وبدون هذه الأرضية قد تدخل
            في المقارنة بين عروض أو قرارات أو مستويات وأنت لا تعرف أصلًا حجم
            المشروع المتوقع.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            ما الفرق بين التقدير المبدئي وعرض السعر النهائي؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            هذه نقطة محورية جدًا. <strong>التقدير المبدئي</strong> هو حساب أولي
            يساعد على فهم اتجاه التكلفة وحجمها العام. أما{" "}
            <strong>عرض السعر النهائي</strong> فهو وثيقة أكثر دقة وتفصيلًا، يجب
            أن توضح البنود والمواد والمواصفات والاستثناءات وطريقة التنفيذ.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            بمعنى آخر: التقدير المبدئي مناسب عندما تسأل “تقريبًا كم قد يكلف
            المشروع؟”، بينما عرض السعر النهائي مناسب عندما تسأل “ماذا سأحصل
            تحديدًا مقابل هذا الرقم؟”.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            الخطوة الأولى: حدد نوع المشروع
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            لا يمكن بناء تقدير أولي صحيح إذا لم تحدد ما هو المشروع أصلًا. هل
            تتحدث عن:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>بناء فيلا جديدة من البداية؟</li>
            <li>بناء عظم فقط؟</li>
            <li>تشطيب فيلا عظم؟</li>
            <li>تشطيب شقة؟</li>
            <li>تجديد أو ترميم جزئي؟</li>
            <li>مشروع تسليم مفتاح؟</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            هذا التحديد أساسي جدًا، لأن كل نوع من هذه المشاريع له منطق مختلف في
            البنود والتكلفة. لذلك لا تبدأ بالحساب قبل أن تعرف أنت نفسك ما الذي
            تريد تسعيره بالضبط.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            الخطوة الثانية: حدد المساحة بشكل واضح
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            المساحة عنصر مهم جدًا في أي تقدير أولي، لأنها تمنحك نقطة انطلاق
            عملية. لكن يجب الانتباه إلى أن المساحة لا تكفي وحدها. هي ضرورية،
            لكنها ليست العامل الوحيد. ومع ذلك، لا يمكن بناء تقدير معقول بدونها.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            إذا كانت المساحة غير واضحة أو تقريبية جدًا، فسيبقى التقدير نفسه
            مضطربًا. لذلك حاول أن تبدأ برقم قريب من الواقع قدر الإمكان.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            الخطوة الثالثة: حدد نطاق الأعمال
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            هذه من أكثر النقاط التي تُهمل عادة، لكنها من أهم أسباب الخطأ في
            التقدير. هل المشروع يشمل كل شيء؟ أم بنودًا معينة فقط؟ هل العناصر
            النهائية داخلة؟ هل هناك أعمال خارجية؟ هل المقصود تشطيب كامل أم
            تعديلات على بعض البنود فقط؟
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            كلما كان <strong>نطاق العمل</strong> أوضح، أصبح التقدير الأولي أقرب
            للواقع. أما إذا كان النطاق مفتوحًا أو ضبابيًا، فغالبًا سيكون التقدير
            نفسه مضللًا.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            الخطوة الرابعة: حدد مستوى التشطيب أو الجودة المستهدفة
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            هل تتصور مشروعًا اقتصاديًا؟ أم متوسطًا؟ أم فاخرًا؟ هذا السؤال ليس
            شكليًا، بل هو من أهم العوامل التي تغيّر التكلفة. لأن الانتقال من
            مستوى إلى آخر لا يرفع التكلفة في بند واحد فقط، بل في مجموعة كبيرة من
            البنود.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لذلك إذا بنيت تقديرك الأولي دون تحديد المستوى، فأنت عمليًا تحسب
            مشروعًا غير واضح. والنتيجة غالبًا تكون رقمًا لا يمثّل ما تريده
            فعليًا.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            الخطوة الخامسة: حدّد البنود الحساسة مبكرًا
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            في كل مشروع توجد بنود لها تأثير أعلى من غيرها على الميزانية. مثل:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>الأرضيات</li>
            <li>الأبواب</li>
            <li>الدهانات</li>
            <li>السباكة والكهرباء</li>
            <li>العناصر الصحية</li>
            <li>الأعمال الجبسية والديكورية</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            لست مضطرًا لحسم كل تفصيل في البداية، لكن يجب أن تكون لديك صورة عامة
            عن هذه البنود، لأن تجاهلها في التقدير المبدئي يجعل الرقم يبدو أقل
            مما هو متوقع في الواقع.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            كيف تستخدم سعر المتر بشكل صحيح؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            <strong>سعر المتر</strong> مفيد جدًا في هذه المرحلة، لكنه مفيد فقط
            إذا استُخدم بالشكل الصحيح. أي أنه يساعدك على بناء تصور عام انطلاقًا
            من المساحة والمستوى ونوع المشروع، لكنه لا يغني عن قراءة البنود
            الحقيقية لاحقًا.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            الخطأ الشائع هو أن يأخذ العميل رقمًا عامًا للمتر ثم يعامله وكأنه سعر
            نهائي لجميع الحالات. بينما الصحيح أن سعر المتر هو{" "}
            <strong>أداة توجيه أولية</strong>، لا أكثر.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            ما أكثر الأخطاء التي تجعل التقدير المبدئي مضللًا؟
          </h2>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>عدم تحديد نوع المشروع بشكل واضح.</li>
            <li>الخلط بين العظم والتشطيب وتسليم المفتاح.</li>
            <li>إهمال نطاق الأعمال الفعلي.</li>
            <li>عدم تحديد مستوى التشطيب من البداية.</li>
            <li>الاعتماد على أرقام عامة دون ربطها بالمشروع الحقيقي.</li>
            <li>نسيان البنود الحساسة ذات التأثير العالي على الميزانية.</li>
            <li>الاعتقاد أن كل المشاريع المتشابهة في المساحة لها نفس التكلفة.</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            هذه الأخطاء لا تبدو كبيرة عند البداية، لكنها تجعل التقدير غير مفيد،
            بل أحيانًا مضللًا أكثر من كونه مساعدًا.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            متى يكون التقدير المبدئي كافيًا؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            يكون كافيًا عندما تكون في مرحلة الاستكشاف وفهم حدود المشروع. مثلًا:
            هل ميزانيتك الحالية قريبة من الواقع؟ هل المشروع مناسب الآن أم يحتاج
            إلى إعادة ترتيب؟ هل الفرق بين مستوى وآخر كبير؟
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            في هذه المرحلة، لا تحتاج إلى كل تفصيل، بل تحتاج إلى{" "}
            <strong>فهم أولي ذكي</strong> يساعدك على ترتيب قرارك.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            ومتى يصبح التقدير المبدئي غير كافٍ؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            عندما تقترب من التنفيذ، أو تبدأ في المقارنة الجدية بين أكثر من جهة،
            أو تريد اتخاذ قرار نهائي، فهنا لا يعود التقدير الأولي كافيًا. في هذه
            المرحلة تحتاج إلى:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>عرض سعر تفصيلي</li>
            <li>تحديد أوضح للمواد</li>
            <li>تحديد أدق للنطاق</li>
            <li>فهم ما هو مشمول وما هو غير مشمول</li>
            <li>وضوح في طريقة التنفيذ والاستلام</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            بمعنى مختصر: التقدير الأولي ممتاز للاتجاه، لكنه لا يكفي للتعاقد.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            ما أفضل طريقة عملية لبدء الحساب؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            أفضل طريقة هي أن تبني التقدير على خمس نقاط واضحة:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>نوع المشروع</li>
            <li>المساحة</li>
            <li>نطاق الأعمال</li>
            <li>مستوى التشطيب أو الجودة</li>
            <li>البنود الأكثر حساسية في التكلفة</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            بعد ذلك يمكنك استخدام <strong>حاسبة أولية</strong> أو تقدير مبني على
            نطاقات معقولة لتكوين صورة أولية. هذه الطريقة أفضل بكثير من سؤال عام
            عن “كم يكلف المشروع” دون أي تعريف فعلي له.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            لماذا تعتبر الحاسبة مفيدة في هذه المرحلة؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            لأن الحاسبة تساعدك على تحويل الأسئلة العامة إلى مدخلات أكثر وضوحًا:
            المساحة، نوع المشروع، مستوى التشطيب. وهذا يجعل التقدير الأولي أكثر
            فائدة من مجرد سماع رقم عام من السوق دون فهم.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لكن يجب أن تتذكر دائمًا أن الحاسبة لا تعطي سعرًا نهائيًا للتعاقد،
            وإنما تعطيك <strong>تصورًا مبدئيًا</strong> يساعدك على ترتيب قرارك
            وفهم حدود الميزانية.
          </p>

          <div className="mt-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 md:p-8">
            <h2 className="text-2xl font-bold">ابدأ بالحساب المبدئي الآن</h2>
            <p className="mt-3 leading-relaxed opacity-90">
              إذا كنت تريد بناء تصور أولي أقرب للواقع قبل طلب عرض سعر تفصيلي،
              يمكنك استخدام الحاسبة في الموقع. ستساعدك على ترتيب المشروع ذهنيًا
              وماليًا قبل الانتقال إلى مرحلة التسعير التفصيلي.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-2xl">
                <Link to="/villa-finishing-price-riyadh">
                  افتح حاسبة التكلفة
                </Link>
              </Button>

              <Button asChild variant="outline" className="rounded-2xl">
                <Link to="/engineering-insights/cost">
                  العودة إلى قسم التكلفة والتسعير
                </Link>
              </Button>
            </div>
          </div>

          <h2 className="mt-12 text-2xl font-bold">خلاصة التقرير</h2>

          <p className="mt-4 leading-relaxed opacity-90">
            <strong>حساب تكلفة مشروعك بشكل مبدئي</strong> لا يبدأ من رقم، بل من
            تعريف المشروع نفسه: نوعه، ومساحته، ونطاقه، ومستواه، والبنود الأكثر
            تأثيرًا فيه. كلما كانت هذه العناصر أوضح، أصبح التقدير الأولي أقرب
            للواقع وأكثر فائدة.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            والقرار الذكي هنا ليس أن تبحث عن دقة نهائية من أول خطوة، بل أن تبني
            تصورًا أوليًا جيدًا، ثم تنتقل بعد ذلك إلى عرض سعر تفصيلي عندما تقترب
            من التنفيذ. بهذه الطريقة تصبح قراراتك أوضح، ومقارنتك للعروض أدق،
            وفرص المفاجآت أقل.
          </p>

          <div className="mt-10 rounded-xl border bg-gray-50 p-4 text-sm opacity-90">
            <p className="font-bold">روابط مفيدة:</p>
            <ul className="mt-2 list-disc pr-6 space-y-1">
              <li>
                <Link
                  to="/villa-finishing-price-riyadh"
                  className="underline decoration-yellow-400 underline-offset-4 hover:opacity-80"
                >
                  حاسبة تكلفة التشطيب
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
                  to="/engineering-insights/cost/what-increases-finishing-cost-riyadh"
                  className="underline decoration-yellow-400 underline-offset-4 hover:opacity-80"
                >
                  ما الذي يرفع تكلفة التشطيب في الرياض؟
                </Link>
              </li>
            </ul>
          </div>

          <section className="mt-14">
            <h2 className="text-2xl font-bold mb-4">الأسئلة الشائعة</h2>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q1">
                <AccordionTrigger>
                  كيف أحسب تكلفة مشروعي بشكل مبدئي؟
                </AccordionTrigger>
                <AccordionContent>
                  ابدأ بتحديد نوع المشروع ومساحته ونطاق الأعمال ومستوى التشطيب
                  المطلوب، ثم استخدم نطاقًا سعريًا مبدئيًا أو حاسبة أولية لبناء
                  تصور تقريبي قبل طلب عرض السعر التفصيلي.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q2">
                <AccordionTrigger>
                  هل التقدير المبدئي يكفي لاتخاذ قرار نهائي؟
                </AccordionTrigger>
                <AccordionContent>
                  لا، التقدير المبدئي مفيد لفهم الميزانية العامة فقط، أما القرار
                  النهائي فيحتاج إلى عرض سعر تفصيلي يوضح البنود والمواد
                  والمواصفات والاستثناءات.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q3">
                <AccordionTrigger>
                  ما أكثر عامل يسبب خطأ في التقدير الأولي؟
                </AccordionTrigger>
                <AccordionContent>
                  من أكثر الأسباب شيوعًا: عدم وضوح نطاق العمل، وعدم تحديد مستوى
                  التشطيب، وإغفال بعض البنود المهمة أو افتراض أن كل المشاريع
                  تتشابه في التكلفة.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q4">
                <AccordionTrigger>
                  هل المساحة وحدها تكفي لتقدير تكلفة المشروع؟
                </AccordionTrigger>
                <AccordionContent>
                  لا، المساحة عنصر مهم لكنها ليست العامل الوحيد. فالتصميم
                  والمواد ونطاق الأعمال ومستوى التفاصيل قد تغير التقدير بشكل
                  واضح.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q5">
                <AccordionTrigger>
                  متى أستخدم الحاسبة ومتى أطلب عرض سعر؟
                </AccordionTrigger>
                <AccordionContent>
                  استخدم الحاسبة في مرحلة التصور الأولي، واطلب عرض سعر عندما
                  تكون أقرب إلى التنفيذ وتحتاج معرفة البنود والمواصفات والتكلفة
                  بشكل أدق.
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