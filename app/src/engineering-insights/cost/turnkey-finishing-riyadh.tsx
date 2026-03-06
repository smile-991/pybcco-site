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
  "https://pybcco.com/engineering-insights/cost/turnkey-finishing-riyadh";

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
    headline: "تشطيب تسليم مفتاح بالرياض: ماذا يشمل؟",
    description:
      "دليل عملي يشرح معنى تشطيب تسليم مفتاح بالرياض، وما البنود التي يشملها عادة، وما الذي يجب توضيحه قبل التعاقد حتى لا تحدث مفاجآت أثناء التنفيذ.",
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
      "تشطيب تسليم مفتاح بالرياض",
      "تشطيب فلل بالرياض",
      "عقد تشطيب",
      "نطاق أعمال التشطيب",
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
        name: "ما معنى تشطيب تسليم مفتاح بالرياض؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "يقصد به تنفيذ الأعمال المتفق عليها حتى يصبح المشروع جاهزًا للاستخدام وفق نطاق العمل المحدد في العقد، وليس مجرد إنهاء بعض البنود بشكل جزئي.",
        },
      },
      {
        "@type": "Question",
        name: "هل تشطيب تسليم مفتاح يشمل جميع البنود دائمًا؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "ليس بالضرورة. المصطلح عام، لكن البنود الفعلية تختلف من مشروع لآخر، لذلك يجب تحديد ما هو مشمول وما هو غير مشمول بشكل واضح داخل العقد أو عرض السعر التفصيلي.",
        },
      },
      {
        "@type": "Question",
        name: "ما الفرق بين التشطيب العادي وتسليم المفتاح؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "تشطيب تسليم مفتاح يعني عادة إدارة وتنفيذ المشروع حتى مرحلة جاهزية الاستخدام وفق البنود المتفق عليها، بينما قد يشير التشطيب العادي إلى تنفيذ جزء من الأعمال أو بنود محددة فقط.",
        },
      },
      {
        "@type": "Question",
        name: "ما أهم شيء يجب التأكد منه قبل التعاقد على تسليم مفتاح؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "أهم نقطة هي وضوح نطاق العمل والمواصفات والمواد والدفعات والاستلامات وما هو مستثنى من العقد، لأن الغموض في هذه النقاط يسبب معظم الخلافات لاحقًا.",
        },
      },
      {
        "@type": "Question",
        name: "هل تسليم المفتاح يعني سعرًا ثابتًا دائمًا؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "ليس دائمًا. قد يكون هناك سعر إجمالي أو تسعير حسب البنود، لكن أي تغييرات أو إضافات خارج النطاق المتفق عليه قد تؤثر على التكلفة النهائية.",
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
        name: "تشطيب تسليم مفتاح بالرياض",
        item: CANONICAL,
      },
    ],
  };
}

export default function TurnkeyFinishingRiyadh() {
  const jsonLd = useMemo(() => {
    return [buildArticleJsonLd(), buildFaqJsonLd(), buildBreadcrumbJsonLd()];
  }, []);

  return (
    <main dir="rtl" className="py-16">
      <SeoHead
        title="تشطيب تسليم مفتاح بالرياض: ماذا يشمل؟ | دليل العميل قبل التعاقد | PYBCCO"
        description="دليل واضح لفهم تشطيب تسليم مفتاح بالرياض: ماذا يشمل، ما الذي قد لا يشمله، وما البنود التي يجب توضيحها في العقد قبل بدء المشروع."
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
            تشطيب تسليم مفتاح بالرياض: ماذا يشمل؟
          </h1>

          <p className="mt-3 text-lg opacity-80 leading-relaxed">
            دليل عملي لفهم معنى تسليم المفتاح قبل توقيع العقد أو مقارنة عروض
            الأسعار
          </p>

          <p className="mt-8 leading-relaxed opacity-90">
            كثير من العملاء يسمعون عبارة{" "}
            <strong>تشطيب تسليم مفتاح بالرياض</strong> في عروض الشركات أو أثناء
            النقاش مع المقاولين، لكن المشكلة أن هذا المصطلح يبدو واضحًا من
            الخارج، بينما قد يحمل معاني مختلفة من مشروع إلى آخر. بعض الناس
            يفهمه على أنه مشروع كامل من البداية حتى الجاهزية التامة، وآخرون
            يظنون أنه يعني التشطيب الداخلي فقط، بينما في الواقع كل ذلك يتوقف على{" "}
            <strong>نطاق العمل الفعلي المكتوب في العقد</strong>.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لهذا السبب، لا يكفي أن ترى عبارة “تسليم مفتاح” في عرض السعر حتى
            تعتبر أن كل شيء مشمول. الأهم هو أن تعرف بدقة{" "}
            <strong>ما الذي يشمله المشروع فعلًا، وما الذي لا يشمله</strong>،
            وما هي المواد المتفق عليها، وكيف سيتم الاستلام، وهل هناك بنود
            إضافية قد تظهر لاحقًا أم لا.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            في هذا التقرير سنشرح معنى تشطيب تسليم مفتاح بشكل واضح، وسنوضح البنود
            التي يشملها عادة، والبنود التي قد تكون مستثناة أحيانًا، والنقاط التي
            يجب على العميل التأكد منها قبل التوقيع حتى لا تتحول فكرة “الراحة”
            إلى مفاجآت مكلفة أثناء التنفيذ.
          </p>

          <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
            <h2 className="text-xl font-bold">الخلاصة السريعة</h2>
            <p className="mt-3 leading-relaxed opacity-90">
              تشطيب تسليم مفتاح يعني عادة أن الشركة تتولى تنفيذ المشروع حتى يصبح
              جاهزًا للاستخدام وفق{" "}
              <strong>النطاق المتفق عليه كتابيًا</strong>. لذلك القيمة الحقيقية
              ليست في الاسم نفسه، بل في وضوح البنود، والمواصفات، والمواد،
              والدفعات، والاستثناءات، وآلية الاستلام.
            </p>
          </div>

          <h2 className="mt-12 text-2xl font-bold">
            ما المقصود بتشطيب تسليم مفتاح؟
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            المعنى العام لتشطيب تسليم مفتاح هو أن يتم تنفيذ الأعمال المطلوبة حتى
            يصل المشروع إلى مرحلة جاهزية الاستخدام أو السكن أو التشغيل، وذلك
            حسب نوع المشروع ونطاق العمل. أي أن العميل لا يستلم مشروعًا نصف
            مكتمل أو بنودًا جزئية فقط، بل يستلم نتيجة نهائية ضمن الاتفاق.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لكن هنا توجد نقطة مهمة جدًا:{" "}
            <strong>
              الجاهزية لا تعني الشيء نفسه في كل العقود
            </strong>
            . فبعض العقود تعتبر الجاهزية مرتبطة بالبنود الأساسية فقط، وبعضها
            يشمل تفاصيل أعلى، وبعضها يستثني عناصر يعتبرها العميل جزءًا بديهيًا
            من التسليم. لذلك من الخطأ الاعتماد على العنوان وحده دون قراءة
            التفاصيل.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            لماذا يفضّل بعض العملاء نظام تسليم المفتاح؟
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            لأن هذا النموذج يمنح العميل إحساسًا أعلى بالتنظيم والراحة. بدل أن
            يقسم المشروع إلى عدة متعهدين أو مراحل منفصلة، يكون لديه جهة واحدة
            مسؤولة عن التنفيذ والإدارة والمتابعة. وهذا يخفف الجهد في كثير من
            الحالات، خصوصًا عندما يكون العميل مشغولًا أو لا يريد الدخول في
            التفاصيل اليومية للموقع.
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>تقليل تشتت المسؤولية بين أكثر من جهة.</li>
            <li>وضوح أكبر في الجهة المسؤولة عن التنفيذ.</li>
            <li>سهولة أعلى في متابعة المشروع والدفعات.</li>
            <li>تقليل احتمالات تضارب الأعمال بين المقاولين الفرعيين.</li>
            <li>تحسين تجربة العميل إذا كان التنظيم والإدارة واضحين.</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            لكن كل هذه المزايا تتحقق فقط إذا كان{" "}
            <strong>العقد تفصيليًا</strong>، وكانت المواصفات واضحة، وكانت آلية
            التنفيذ والاستلام منظمة. أما إذا كان العقد مختصرًا وغامضًا، فإن
            مصطلح “تسليم مفتاح” قد يتحول إلى عنوان جميل فقط دون حماية فعلية
            للعميل.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            ماذا يشمل تشطيب تسليم مفتاح عادة؟
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            البنود تختلف من مشروع إلى آخر، لكن في المشاريع السكنية يشمل تشطيب
            تسليم مفتاح عادة عددًا من الأعمال الأساسية المرتبطة بجعل المساحات
            جاهزة للاستخدام وفق المستوى المتفق عليه. ومن أكثر البنود شيوعًا:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>أعمال التأسيس أو المراجعة اللازمة قبل بدء التشطيب.</li>
            <li>أعمال الكهرباء والسباكة المرتبطة بنطاق المشروع.</li>
            <li>أعمال اللياسة والمعالجات الأساسية للجدران والأسقف.</li>
            <li>الأرضيات والحوائط حسب المواد المعتمدة.</li>
            <li>الدهانات الداخلية وما يرتبط بها من تجهيزات.</li>
            <li>الأسقف الجبسية أو التفاصيل الديكورية حسب العقد.</li>
            <li>تركيب الأبواب وبعض العناصر النهائية.</li>
            <li>تركيب الأدوات الصحية والإنارة أو بعض ملحقاتها وفق النطاق.</li>
            <li>التنظيف النهائي والتسليم بحسب الاتفاق.</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            المهم هنا هو كلمة <strong>“حسب العقد”</strong>. لأن وجود هذه البنود
            بشكل عام لا يعني بالضرورة أن كل مشروع يشملها جميعًا بنفس المستوى أو
            بنفس نوعية المواد أو بنفس الكميات.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            ما الذي قد لا يكون مشمولًا رغم وجود عبارة “تسليم مفتاح”؟
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            هذه من أكثر النقاط التي تسبب سوء فهم بين العميل والجهة المنفذة.
            فهناك بنود قد يعتبرها العميل ضمنية وطبيعية، بينما تراها الشركة
            إضافية أو خارج النطاق. ومن الأمثلة الشائعة على ذلك:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>تفاصيل ديكورية خاصة أو أعمال تصميم داخلي إضافية.</li>
            <li>مواد أعلى من المستوى المحدد في العقد.</li>
            <li>أعمال خارجية أو ملاحق لم تُذكر ضمن النطاق.</li>
            <li>تعديلات بعد بدء التنفيذ على المخططات أو مواقع البنود.</li>
            <li>توريد عناصر خاصة يختارها العميل لاحقًا من موردين محددين.</li>
            <li>بعض أنظمة الإضاءة أو الأجهزة أو التركيبات غير الأساسية.</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            لذلك يجب أن يكون السؤال قبل التوقيع ليس فقط:{" "}
            <strong>“هل هذا تسليم مفتاح؟”</strong> بل:{" "}
            <strong>
              “ما البنود المحددة المشمولة؟ وما البنود غير المشمولة؟”
            </strong>
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            الفرق بين تشطيب جزئي وتشطيب تسليم مفتاح
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            في التشطيب الجزئي، قد تتولى الشركة أو المقاول تنفيذ مجموعة محددة من
            البنود فقط، مثل الأرضيات والدهانات مثلًا، أو الأسقف الجبسية دون باقي
            الأعمال، أو تنفيذ بند معين من دون إدارة المشروع بالكامل. هذا النموذج
            قد يكون مناسبًا لبعض الحالات، لكنه يحتاج من العميل متابعة أكبر
            وتنسيقًا أعلى بين جهات متعددة.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            أما في <strong>تشطيب تسليم مفتاح</strong>، فالفكرة الأساسية هي وجود
            جهة واحدة تتولى التنفيذ المنظم حتى نهاية النطاق المتفق عليه، مع
            تحمّل أكبر لمسؤولية إدارة المراحل وتسلسل الأعمال. وهذا يجعل التجربة
            أسهل عادة إذا كانت الجهة المنفذة منظمة إداريًا وفنيًا.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            متى يكون عرض “تسليم مفتاح” جيدًا فعلًا؟
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            العرض الجيد لا يُقاس فقط بعنوانه ولا برقم السعر وحده، بل بمدى وضوحه
            وتفصيله. ويمكن اعتبار عرض تسليم المفتاح جيدًا عندما يجيب بوضوح عن
            الأسئلة التالية:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>ما البنود التي يشملها التنفيذ تحديدًا؟</li>
            <li>ما المواد أو المستويات المعتمدة لكل بند؟</li>
            <li>ما العناصر المستثناة من السعر؟</li>
            <li>كيف سيتم احتساب التعديلات أو الإضافات؟</li>
            <li>ما الجدول الزمني المتوقع للمشروع؟</li>
            <li>ما آلية الاستلام المرحلي والنهائي؟</li>
            <li>ما الضمانات أو الالتزامات المكتوبة بعد التسليم؟</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            إذا كانت هذه النقاط غير واضحة، فحتى لو كان السعر جذابًا أو العنوان
            مريحًا، يبقى العرض ضعيفًا من ناحية الحماية والوضوح.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            هل تسليم المفتاح يعني أن السعر سيكون أقل أو أعلى؟
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            ليس هناك قاعدة ثابتة. أحيانًا يكون السعر الإجمالي منطقيًا لأن
            المشروع منظم من البداية، وأحيانًا يظهر السعر أعلى لأن العرض يشمل
            تفاصيل واضحة ونطاقًا أوسع من عروض أخرى تبدو أرخص ظاهريًا. لذلك
            المقارنة العادلة لا تكون بين الأرقام المجردة، بل بين{" "}
            <strong>النطاق مقابل النطاق</strong> و
            <strong> المواصفات مقابل المواصفات</strong>.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            من الأخطاء الشائعة أن يقارن العميل عرض “تسليم مفتاح” مفصلًا بعرض آخر
            مختصرًا ثم يعتقد أن المفصل أغلى بلا سبب، بينما الواقع أن العرض
            المختصر قد يكون أقل فقط لأنه لا يشمل بنودًا أو لا يوضح مستويات
            التنفيذ والمواد.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            مثال عملي: لماذا يحدث اختلاف كبير بين عرضين؟
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            لنفترض أن لديك عرضين لمشروع تشطيب فيلا. العرض الأول مكتوب عليه
            “تسليم مفتاح” ويتضمن مواصفات واضحة للأرضيات والدهانات والجبس
            والأبواب وآلية الاستلام. العرض الثاني يحمل اسمًا مشابهًا، لكنه لا
            يحدد المواد بشكل دقيق ولا يذكر بعض البنود إلا بشكل عام.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            طبيعي جدًا أن يبدو العرض الثاني أرخص على الورق، لكنه قد يفتح الباب
            لاحقًا لإضافات كثيرة أو خلافات على التفسير. هنا يكون الفرق الحقيقي
            ليس في السعر فقط، بل في{" "}
            <strong>درجة الوضوح والانضباط</strong>.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            ما الذي يجب كتابته بوضوح في عقد تسليم المفتاح؟
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            حتى يكون العقد قويًا ومفيدًا فعلاً، يجب أن يحتوي على تفاصيل عملية
            تمنع الالتباس لاحقًا. وأهم ما يجب توضيحه:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>وصف البنود ونطاق كل بند بشكل واضح.</li>
            <li>مواصفات المواد أو المستوى المعتمد لكل عنصر.</li>
            <li>المخططات أو المراجع التنفيذية المرتبطة بالعقد.</li>
            <li>الدفعات ومراحل الاستحقاق وربطها بالإنجاز.</li>
            <li>المدة الزمنية وآلية التعامل مع التأخيرات.</li>
            <li>بنود التغيير والإضافات وكيفية اعتمادها.</li>
            <li>الاستثناءات بشكل صريح لا لبس فيه.</li>
            <li>آلية الاستلام والملاحظات والضمان.</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            كلما كان العقد أوضح، أصبحت تجربة التنفيذ أكثر استقرارًا، وقلّت فرص
            الخلافات وسوء الفهم.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            كيف تتعامل مع عرض تسليم مفتاح بطريقة ذكية؟
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            أفضل طريقة هي أن تنظر إلى العرض على أنه{" "}
            <strong>خريطة مشروع</strong>، لا مجرد رقم. اقرأ البنود، اسأل عن
            المواد، اطلب التوضيح في الأمور العامة، وقارن دائمًا بين ما هو مشمول
            فعلًا لا بين الأسعار وحدها. إذا وجدت بندًا غير واضح، فهذه إشارة إلى
            أنه قد يتحول لاحقًا إلى نقطة خلاف أو تكلفة إضافية.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            ومن الجيد أيضًا أن يكون لديك تصور مبدئي عن مستوى التشطيب الذي تريده
            قبل طلب العرض، لأن عدم الحسم في هذا الجانب يجعل المقارنة بين الشركات
            صعبة، ويؤدي إلى فروق كبيرة في التوقعات.
          </p>

          <div className="mt-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 md:p-8">
            <h2 className="text-2xl font-bold">
              احسب تكلفة مشروعك بشكل مبدئي
            </h2>
            <p className="mt-3 leading-relaxed opacity-90">
              إذا كنت في مرحلة المقارنة وتريد فهمًا أوليًا للتكلفة قبل الدخول في
              عرض سعر تفصيلي، يمكنك استخدام الحاسبة في الموقع للحصول على تصور
              مبدئي يساعدك على ترتيب ميزانية المشروع بشكل أفضل.
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

          <h2 className="mt-12 text-2xl font-bold">خلاصة التقرير</h2>
          <p className="mt-4 leading-relaxed opacity-90">
            <strong>تشطيب تسليم مفتاح بالرياض</strong> قد يكون خيارًا ممتازًا
            للعميل إذا كان الهدف الحصول على تنفيذ منظم وتجربة أكثر راحة، لكن
            نجاح هذا الخيار يعتمد بالكامل تقريبًا على{" "}
            <strong>وضوح نطاق العمل</strong> والمواصفات والمواد والاستثناءات
            وآلية الاستلام.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لذلك لا تتعامل مع “تسليم مفتاح” على أنه مصطلح سحري يكفي وحده لضمان
            الجودة أو اكتمال البنود. القيمة الحقيقية دائمًا في التفاصيل
            المكتوبة، وفي مستوى التنظيم، وفي قدرة الجهة المنفذة على إدارة
            المشروع بوضوح وشفافية من البداية حتى التسليم.
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
                  to="/construction-company-riyadh"
                  className="underline decoration-yellow-400 underline-offset-4 hover:opacity-80"
                >
                  شركة مقاولات بالرياض – صفحة الخدمات
                </Link>
              </li>
            </ul>
          </div>

          <section className="mt-14">
            <h2 className="text-2xl font-bold mb-4">الأسئلة الشائعة</h2>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q1">
                <AccordionTrigger>
                  ما معنى تشطيب تسليم مفتاح بالرياض؟
                </AccordionTrigger>
                <AccordionContent>
                  يقصد به تنفيذ الأعمال المتفق عليها حتى يصبح المشروع جاهزًا
                  للاستخدام وفق نطاق العمل المحدد في العقد، وليس مجرد إنهاء بعض
                  البنود بشكل جزئي.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q2">
                <AccordionTrigger>
                  هل تشطيب تسليم مفتاح يشمل جميع البنود دائمًا؟
                </AccordionTrigger>
                <AccordionContent>
                  ليس بالضرورة. المصطلح عام، لكن البنود الفعلية تختلف من مشروع
                  لآخر، لذلك يجب تحديد ما هو مشمول وما هو غير مشمول بشكل واضح
                  داخل العقد أو عرض السعر التفصيلي.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q3">
                <AccordionTrigger>
                  ما الفرق بين التشطيب العادي وتسليم المفتاح؟
                </AccordionTrigger>
                <AccordionContent>
                  تشطيب تسليم مفتاح يعني عادة إدارة وتنفيذ المشروع حتى مرحلة
                  جاهزية الاستخدام وفق البنود المتفق عليها، بينما قد يشير
                  التشطيب العادي إلى تنفيذ جزء من الأعمال أو بنود محددة فقط.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q4">
                <AccordionTrigger>
                  ما أهم شيء يجب التأكد منه قبل التعاقد على تسليم مفتاح؟
                </AccordionTrigger>
                <AccordionContent>
                  أهم نقطة هي وضوح نطاق العمل والمواصفات والمواد والدفعات
                  والاستلامات وما هو مستثنى من العقد، لأن الغموض في هذه النقاط
                  يسبب معظم الخلافات لاحقًا.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q5">
                <AccordionTrigger>
                  هل تسليم المفتاح يعني سعرًا ثابتًا دائمًا؟
                </AccordionTrigger>
                <AccordionContent>
                  ليس دائمًا. قد يكون هناك سعر إجمالي أو تسعير حسب البنود، لكن
                  أي تغييرات أو إضافات خارج النطاق المتفق عليه قد تؤثر على
                  التكلفة النهائية.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </article>
      </div>
    </main>
  );
}