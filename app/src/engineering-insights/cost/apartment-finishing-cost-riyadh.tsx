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
  "https://pybcco.com/engineering-insights/cost/apartment-finishing-cost-riyadh";

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
      "تكلفة تشطيب شقة بالرياض | كيف تُحسب فعليًا وما الذي يرفع السعر؟",
    description:
      "دليل عملي لفهم تكلفة تشطيب شقة بالرياض، والعوامل التي تؤثر على السعر، والفرق بين التشطيب الاقتصادي والمتوسط والفاخر، وكيف تبني تصورًا أوليًا قبل طلب عرض السعر.",
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
      "تكلفة تشطيب شقة بالرياض",
      "تشطيب شقق بالرياض",
      "تكلفة التشطيب",
      "سعر متر التشطيب",
      "تشطيب اقتصادي ومتوسط وفاخر",
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
        name: "كم تكلفة تشطيب شقة بالرياض؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "تختلف تكلفة تشطيب الشقة بالرياض حسب المساحة الحالية وحالة الشقة ومستوى التشطيب ونوعية المواد ونطاق الأعمال، لذلك لا يوجد رقم ثابت يصلح لجميع الحالات.",
        },
      },
      {
        "@type": "Question",
        name: "هل تشطيب الشقة أرخص من تشطيب الفيلا؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "غالبًا نعم من حيث إجمالي الميزانية بسبب فرق المساحة ونطاق بعض الأعمال، لكن تكلفة بعض البنود قد تبقى مرتفعة نسبيًا حسب مستوى المواد والتفاصيل المطلوبة.",
        },
      },
      {
        "@type": "Question",
        name: "ما الذي يرفع تكلفة تشطيب الشقة أكثر من المتوقع؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "من أبرز الأسباب: التعديلات أثناء التنفيذ، اختيار مواد أعلى من المخطط، عدم وضوح البنود، الأعمال الجبسية أو الديكورية الخاصة، وحالة الموقع قبل بدء العمل.",
        },
      },
      {
        "@type": "Question",
        name: "هل سعر المتر يكفي لمعرفة تكلفة تشطيب الشقة؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "سعر المتر يفيد في بناء تصور أولي فقط، لكنه لا يكفي وحده للوصول إلى تكلفة دقيقة دون معرفة البنود الفعلية والمواد ونطاق العمل داخل الشقة.",
        },
      },
      {
        "@type": "Question",
        name: "ما الفرق بين التشطيب الاقتصادي والمتوسط والفاخر للشقق؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "الفرق يكون عادة في نوعية المواد، ومستوى التفاصيل، وجودة العناصر النهائية، ومدى وجود أعمال إضافية أو ديكورية، وهذا ينعكس مباشرة على التكلفة.",
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
        name: "تكلفة تشطيب شقة بالرياض",
        item: CANONICAL,
      },
    ],
  };
}

export default function ApartmentFinishingCostRiyadh() {
  const jsonLd = useMemo(() => {
    return [buildArticleJsonLd(), buildFaqJsonLd(), buildBreadcrumbJsonLd()];
  }, []);

  return (
    <>
      <SeoHead
        title="تكلفة تشطيب شقة بالرياض | كيف تُحسب فعليًا وما الذي يرفع السعر؟ | PYBCCO"
        description="تعرف على تكلفة تشطيب شقة بالرياض، والعوامل التي تؤثر على السعر، وكيف تبني تصورًا أوليًا للتكلفة قبل طلب عرض السعر التفصيلي."
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
            تكلفة تشطيب شقة بالرياض
          </h1>

          <p className="mt-3 text-lg opacity-80 leading-relaxed">
            دليل عملي لفهم ميزانية التشطيب قبل طلب عرض السعر
          </p>

          <p className="mt-8 leading-relaxed opacity-90">
            كثير من الناس عندما يشترون شقة جديدة أو يستلمون وحدة سكنية أو
            يفكرون في تجديد شقة قائمة، يكون أول سؤال لديهم هو:
            <strong> كم تكلفة تشطيب شقة بالرياض؟</strong>
            وهذا سؤال طبيعي جدًا، لأن التشطيب هو المرحلة التي تجعل الشقة قابلة
            للاستخدام الفعلي، وهو أيضًا المرحلة التي تظهر فيها فروقات كبيرة في
            الأسعار بين مشروع وآخر.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لكن المشكلة أن بعض الناس يتوقعون وجود رقم واحد ثابت يمكن تطبيقه على
            كل الشقق، بينما الواقع مختلف.{" "}
            <strong>تكلفة تشطيب الشقة ليست رقمًا موحدًا</strong>، بل تتأثر بحالة
            الشقة، ومساحتها، والمستوى المطلوب، ونوعية المواد، ونطاق العمل، وهل
            الحديث عن تشطيب من الصفر أم عن تحسين وتجديد جزئي أو كامل.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لذلك إذا أردت قراءة تكلفة تشطيب شقة بشكل صحيح، فلا يكفي أن تسأل عن
            السعر فقط. الأهم أن تفهم{" "}
            <strong>ما الذي يدخل فعليًا ضمن التشطيب</strong>، وما العوامل التي
            تغيّر السعر، وكيف تبني تصورًا أوليًا منطقيًا قبل الدخول في عرض سعر
            تفصيلي.
          </p>

          <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
            <h2 className="text-xl font-bold">الخلاصة السريعة</h2>
            <p className="mt-3 leading-relaxed opacity-90">
              <strong>تكلفة تشطيب شقة بالرياض</strong> تعتمد على المساحة،
              وحالة الشقة الحالية، ونوعية المواد، ومستوى التشطيب، ونطاق الأعمال،
              ووجود أعمال إضافية أو تعديلات خاصة. لذلك لا يوجد رقم ثابت لجميع
              الشقق، والأفضل دائمًا التعامل مع التكلفة كتقدير أولي يتأكد لاحقًا
              بعرض سعر واضح البنود.
            </p>
          </div>

          <h2 className="mt-12 text-2xl font-bold">
            ما المقصود بتشطيب الشقة؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            تشطيب الشقة قد يعني أكثر من حالة. أحيانًا تكون الشقة جديدة وتحتاج
            إلى استكمال كل الأعمال النهائية من الداخل، وأحيانًا تكون قائمة لكن
            تحتاج إلى تجديد شامل أو تحسينات كبيرة، وأحيانًا يكون المطلوب تنفيذ
            بنود محددة فقط. لذلك كلمة “تشطيب” وحدها لا تكفي لفهم التكلفة ما لم
            يتضح <strong>النطاق الفعلي للعمل</strong>.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            في كثير من الحالات تشمل أعمال التشطيب بنودًا مثل:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>أعمال الكهرباء وتمديداتها أو تعديلاتها.</li>
            <li>أعمال السباكة وتمديداتها أو تغيير بعض العناصر.</li>
            <li>اللياسة والمعالجات السطحية بحسب حالة الموقع.</li>
            <li>الدهانات بكل مراحلها.</li>
            <li>الأرضيات والحوائط بحسب المواد المعتمدة.</li>
            <li>الأسقف الجبسية أو المعالجات الديكورية.</li>
            <li>الأبواب وبعض البنود الخشبية.</li>
            <li>العناصر الصحية والإنارة وبعض التركيبات النهائية.</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            لكن وجود هذه البنود بشكل عام لا يعني أن كل مشروع سيشملها بنفس
            الطريقة أو بنفس المستوى أو بنفس نوعية المواد، ولذلك يظهر الفرق في
            الأسعار بشكل واضح.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            لماذا تختلف تكلفة تشطيب الشقة من حالة إلى أخرى؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            السبب الرئيسي هو أن الشقق ليست متشابهة من حيث الحالة الحالية أو
            المطلوب منها. فشقة جديدة على الهيكل الداخلي تختلف عن شقة جاهزة تحتاج
            فقط بعض اللمسات، وشقة قديمة تحتاج إلى إزالة وإعادة تنفيذ لبعض
            البنود تختلف عن شقة لا تحتاج إلا إلى تشطيب نهائي بسيط.
          </p>

          <h3 className="mt-8 text-xl font-bold">1) مساحة الشقة</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            المساحة عنصر أساسي لأنها تحدد جزءًا من كميات المواد والعمل، لكن
            المساحة ليست العامل الوحيد. قد تكون هناك شقة أصغر ولكن تفاصيلها أو
            حالتها أكثر تعقيدًا من شقة أكبر.
          </p>

          <h3 className="mt-8 text-xl font-bold">2) حالة الشقة الحالية</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            هذه نقطة مهمة جدًا في الشقق تحديدًا. هل الشقة جديدة؟ هل هي على
            العظم؟ هل هي شبه جاهزة؟ هل تحتاج فكّ وإزالة لبعض البنود القائمة؟
            كل حالة من هذه الحالات تؤثر مباشرة على تكلفة التنفيذ.
          </p>

          <h3 className="mt-8 text-xl font-bold">3) مستوى التشطيب</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            التشطيب الاقتصادي يختلف عن المتوسط، والمتوسط يختلف عن الفاخر من حيث
            نوعية المواد ومستوى التفاصيل وجودة العناصر النهائية. وهذه من أكبر
            النقاط التي ترفع أو تخفض ميزانية الشقة.
          </p>

          <h3 className="mt-8 text-xl font-bold">4) نوعية المواد</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            الأرضيات، والدهانات، والأدوات الصحية، والأبواب، والإضاءة، والعناصر
            الخشبية والديكورية، كلها مواد لها مستويات مختلفة، والفروقات بينها
            تتراكم بسرعة داخل الشقة حتى لو بدت البنود منفصلة في البداية.
          </p>

          <h3 className="mt-8 text-xl font-bold">5) نطاق الأعمال</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            بعض المشاريع تشمل التشطيب الكامل، وبعضها يقتصر على بنود معينة، وبعضها
            يتضمن أعمال تعديل أو إعادة تنفيذ. لذلك لا يمكن قراءة أي سعر دون
            معرفة ما هو داخل النطاق فعليًا.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            هل تشطيب الشقة أرخص من تشطيب الفيلا؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            من حيث <strong>إجمالي الميزانية</strong> يكون ذلك غالبًا صحيحًا،
            لأن مساحة الشقة عادة أصغر من الفيلا، ونطاق بعض الأعمال يكون أقل.
            لكن هذا لا يعني أن كل بند داخل الشقة سيكون رخيصًا تلقائيًا، لأن
            بعض الأعمال والمواد تحتفظ بتكلفتها بغض النظر عن كون المشروع شقة أو
            فيلا.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لذلك الأفضل أن تفكر بهذه الطريقة: تشطيب الشقة قد يكون أقل إجمالًا
            من الفيلا، لكن <strong>منطق التسعير نفسه يبقى قائمًا</strong>:
            مستوى المواد، التفاصيل، النطاق، وحالة الموقع كلها عوامل حاسمة.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            هل سعر المتر مفيد في تشطيب الشقة؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            نعم، سعر المتر مفيد كأداة أولية تساعد على بناء تصور سريع عن الميزانية
            المتوقعة. لكنه لا يكفي وحده للوصول إلى تكلفة دقيقة، لأن الشقق تختلف
            كثيرًا من حيث حالتها الحالية، ونوع البنود المطلوبة، ومستوى التشطيب
            المستهدف.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لذلك إذا استخدمت سعر المتر، فاستخدمه على أنه{" "}
            <strong>تقدير مبدئي</strong> فقط، ثم انتقل إلى عرض سعر تفصيلي يحدد
            البنود والمواد والاستثناءات بدقة.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            كيف تبني تصورًا أوليًا لتكلفة تشطيب الشقة؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            أفضل طريقة هي أن تبدأ بوضوح في عدة نقاط:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>ما مساحة الشقة الفعلية؟</li>
            <li>ما حالة الشقة الحالية؟</li>
            <li>هل المطلوب تشطيب كامل أم تعديل وتجديد جزئي؟</li>
            <li>ما مستوى التشطيب المستهدف؟</li>
            <li>هل هناك أعمال جبسية أو ديكورية خاصة؟</li>
            <li>ما المواد التي تتصورها في البنود الرئيسية؟</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            عندما تكون هذه الأمور واضحة، يصبح أي تقدير أولي أكثر واقعية، وتصبح
            قدرتك على قراءة عروض الأسعار أعلى بكثير من مجرد سؤال عام عن التكلفة.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            الفرق بين التشطيب الاقتصادي والمتوسط والفاخر للشقق
          </h2>

          <h3 className="mt-8 text-xl font-bold">التشطيب الاقتصادي</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            مناسب لمن يريد نتيجة عملية وواضحة مع ضبط الميزانية. يعتمد عادة على
            مواد جيدة ضمن حدود معقولة دون الدخول في تفاصيل مرتفعة التكلفة.
          </p>

          <h3 className="mt-8 text-xl font-bold">التشطيب المتوسط</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            يعتبر الخيار الأكثر توازنًا في كثير من الشقق، لأنه يجمع بين جودة
            مناسبة ومظهر جيد وتكلفة أكثر واقعية من الفاخر.
          </p>

          <h3 className="mt-8 text-xl font-bold">التشطيب الفاخر</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            يعتمد على مواد أعلى جودة ولمسات أكثر دقة وعناصر نهائية أقوى من
            الناحية الجمالية. وهذا يرفع تكلفة التشطيب بشكل واضح، خاصة إذا
            اجتمعت عدة بنود عالية المستوى داخل الشقة نفسها.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            ما أكثر الأشياء التي ترفع تكلفة تشطيب الشقة؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            هناك أسباب متكررة تجعل التكلفة النهائية أعلى من المتوقع، ومن أهمها:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>التعديلات أثناء التنفيذ بعد بدء العمل.</li>
            <li>اختيار مواد أعلى من المستوى المخطط له.</li>
            <li>عدم وضوح البنود من البداية.</li>
            <li>وجود أعمال إزالة أو إصلاح قبل التشطيب الجديد.</li>
            <li>إضافة تفاصيل جبسية أو ديكورية لم تكن محسوبة.</li>
            <li>مقارنة أسعار دون مقارنة المواصفات الفعلية.</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            لذلك فإن التحكم بالميزانية لا يبدأ من مطاردة أقل رقم، بل من وضوح
            القرار بشأن{" "}
            <strong>المستوى المطلوب والنطاق الحقيقي للعمل</strong>.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            كيف تقارن بين عرضين لتشطيب شقة؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            المقارنة الصحيحة يجب أن تكون بين:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>النطاق مقابل النطاق.</li>
            <li>المواد مقابل المواد.</li>
            <li>مستوى التشطيب مقابل المستوى نفسه.</li>
            <li>البنود المستثناة في كل عرض.</li>
            <li>آلية احتساب الإضافات والتعديلات.</li>
            <li>وضوح المدة والاستلامات والدفعات.</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            العرض الأرخص لا يكون دائمًا الأفضل، كما أن العرض الأعلى لا يكون
            دائمًا مبالغًا فيه. أحيانًا يكون الفرق الحقيقي سببه وضوح أكبر في
            المواد أو شمول بنود غير موجودة في العرض الآخر.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            متى تحتاج إلى عرض سعر تفصيلي؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            إذا كنت في بداية التفكير، فالتقدير الأولي ممتاز لبناء فهم مبدئي
            للميزانية. أما إذا كنت على وشك التنفيذ أو المقارنة الجادة بين أكثر
            من جهة، فهنا تحتاج إلى{" "}
            <strong>عرض سعر تفصيلي مكتوب</strong> يحدد البنود والمواد والنطاق
            والاستثناءات بوضوح.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            بهذه الطريقة تستفيد من التقدير الأولي كبداية، ثم تنتقل إلى مرحلة
            أدق عندما تقترب من القرار.
          </p>

          <div className="mt-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 md:p-8">
            <h2 className="text-2xl font-bold">احسب تكلفة مشروعك بشكل مبدئي</h2>
            <p className="mt-3 leading-relaxed opacity-90">
              إذا كنت تريد تصورًا أوليًا لتكلفة تشطيب الشقة قبل طلب عرض سعر
              تفصيلي، يمكنك استخدام الحاسبة في الموقع للحصول على فهم مبدئي
              يساعدك على ترتيب ميزانيتك بشكل أفضل.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-2xl">
                <Link to="/villa-finishing-price-riyadh">
                  افتح حاسبة التكلفة
                </Link>
              </Button>

              <Button asChild variant="outline" className="rounded-2xl">
                <Link to="/apartment-finishing-riyadh">خدمات تشطيب الشقق</Link>
              </Button>
            </div>
          </div>

          <h2 className="mt-12 text-2xl font-bold">خلاصة التقرير</h2>

          <p className="mt-4 leading-relaxed opacity-90">
            <strong>تكلفة تشطيب شقة بالرياض</strong> لا يمكن اختصارها في رقم
            واحد فقط، لأن التكلفة تتشكل من حالة الشقة، ومساحتها، ونطاق الأعمال،
            ونوعية المواد، ومستوى التشطيب، ومدى وجود تفاصيل إضافية أو تعديلات
            خاصة.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            وكلما كانت رؤيتك أوضح من البداية، وكانت قراءتك للعروض أدق، وحددت
            المستوى المطلوب والنطاق الحقيقي للعمل، أصبحت قدرتك على ضبط الميزانية
            أفضل، وقلت احتمالات المفاجآت أثناء التنفيذ.
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
              <li>
                <Link
                  to="/engineering-insights/cost/villa-shell-to-finish-cost-riyadh"
                  className="underline decoration-yellow-400 underline-offset-4 hover:opacity-80"
                >
                  تكلفة تشطيب فيلا عظم بالرياض
                </Link>
              </li>
            </ul>
          </div>

          <section className="mt-14">
            <h2 className="text-2xl font-bold mb-4">الأسئلة الشائعة</h2>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q1">
                <AccordionTrigger>
                  كم تكلفة تشطيب شقة بالرياض؟
                </AccordionTrigger>
                <AccordionContent>
                  تختلف تكلفة تشطيب الشقة بالرياض حسب المساحة الحالية وحالة
                  الشقة ومستوى التشطيب ونوعية المواد ونطاق الأعمال، لذلك لا يوجد
                  رقم ثابت يصلح لجميع الحالات.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q2">
                <AccordionTrigger>
                  هل تشطيب الشقة أرخص من تشطيب الفيلا؟
                </AccordionTrigger>
                <AccordionContent>
                  غالبًا نعم من حيث إجمالي الميزانية بسبب فرق المساحة ونطاق بعض
                  الأعمال، لكن تكلفة بعض البنود قد تبقى مرتفعة نسبيًا حسب مستوى
                  المواد والتفاصيل المطلوبة.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q3">
                <AccordionTrigger>
                  ما الذي يرفع تكلفة تشطيب الشقة أكثر من المتوقع؟
                </AccordionTrigger>
                <AccordionContent>
                  من أبرز الأسباب: التعديلات أثناء التنفيذ، اختيار مواد أعلى من
                  المخطط، عدم وضوح البنود، الأعمال الجبسية أو الديكورية الخاصة،
                  وحالة الموقع قبل بدء العمل.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q4">
                <AccordionTrigger>
                  هل سعر المتر يكفي لمعرفة تكلفة تشطيب الشقة؟
                </AccordionTrigger>
                <AccordionContent>
                  سعر المتر يفيد في بناء تصور أولي فقط، لكنه لا يكفي وحده للوصول
                  إلى تكلفة دقيقة دون معرفة البنود الفعلية والمواد ونطاق العمل
                  داخل الشقة.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q5">
                <AccordionTrigger>
                  ما الفرق بين التشطيب الاقتصادي والمتوسط والفاخر للشقق؟
                </AccordionTrigger>
                <AccordionContent>
                  الفرق يكون عادة في نوعية المواد، ومستوى التفاصيل، وجودة
                  العناصر النهائية، ومدى وجود أعمال إضافية أو ديكورية، وهذا
                  ينعكس مباشرة على التكلفة.
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