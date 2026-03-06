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
  "https://pybcco.com/engineering-insights/cost/plumbing-and-electrical-cost-finishing";

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
      "تكلفة السباكة والكهرباء ضمن التشطيب | كيف تُقرأ هذه البنود وما الذي يرفع سعرها؟",
    description:
      "دليل عملي لفهم تكلفة السباكة والكهرباء ضمن التشطيب، وما الذي يدخل في هذه البنود، وما العوامل التي ترفع السعر، وكيف تقرأ عرض السعر بشكل أدق قبل التنفيذ.",
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
      "تكلفة السباكة والكهرباء",
      "السباكة ضمن التشطيب",
      "الكهرباء ضمن التشطيب",
      "تكلفة تشطيب فيلا بالرياض",
      "بنود التشطيب",
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
        name: "هل السباكة والكهرباء من أكثر البنود تأثيرًا في تكلفة التشطيب؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "نعم، لأنهما من البنود الأساسية التي ترتبط بعدد النقاط والتجهيزات ونوعية المواد وطريقة التأسيس والتنفيذ، وأي تغيير فيهما قد ينعكس على التكلفة النهائية بشكل واضح.",
        },
      },
      {
        "@type": "Question",
        name: "ما الذي يرفع تكلفة الكهرباء ضمن التشطيب؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "من أبرز الأسباب: زيادة عدد النقاط، تغيير مواقعها أثناء التنفيذ، اختيار تجهيزات أعلى مستوى، وتعقيد التوزيع أو متطلبات الإضاءة والأنظمة الإضافية.",
        },
      },
      {
        "@type": "Question",
        name: "ما الذي يرفع تكلفة السباكة ضمن التشطيب؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "من أكثر الأسباب: زيادة عدد الحمامات أو المطابخ، تغيير مواقع التغذية والصرف، اختيار أدوات صحية أعلى جودة، ووجود أعمال إضافية أو إعادة تنفيذ لبعض الأجزاء.",
        },
      },
      {
        "@type": "Question",
        name: "هل يمكن معرفة تكلفة السباكة والكهرباء من سعر المتر فقط؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "ليس بدقة، لأن هذه البنود تتأثر بعدد النقاط والتوزيع ونوعية المواد والتفاصيل الفنية، لذلك سعر المتر يعطي تصورًا عامًا فقط ولا يغني عن قراءة البنود الفعلية.",
        },
      },
      {
        "@type": "Question",
        name: "كيف أقارن بين عرضين في بند السباكة والكهرباء؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "بمقارنة النطاق الفعلي، وعدد النقاط، ونوعية المواد، وما إذا كانت التركيبات أو بعض العناصر النهائية داخلة أو مستثناة، وليس بمقارنة الرقم النهائي فقط.",
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
        name: "تكلفة السباكة والكهرباء ضمن التشطيب",
        item: CANONICAL,
      },
    ],
  };
}

export default function PlumbingAndElectricalCostFinishing() {
  const jsonLd = useMemo(() => {
    return [buildArticleJsonLd(), buildFaqJsonLd(), buildBreadcrumbJsonLd()];
  }, []);

  return (
    <main dir="rtl" className="py-16">
      <SeoHead
        title="تكلفة السباكة والكهرباء ضمن التشطيب | كيف تُقرأ هذه البنود وما الذي يرفع سعرها؟ | PYBCCO"
        description="تعرف على تكلفة السباكة والكهرباء ضمن التشطيب، وما العوامل التي ترفع السعر، وكيف تفهم البنود بشكل أدق قبل طلب عرض السعر أو بدء التنفيذ."
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
            تكلفة السباكة والكهرباء ضمن التشطيب
          </h1>

          <p className="mt-3 text-lg opacity-80 leading-relaxed">
            كيف تُقرأ هذه البنود عمليًا؟ وما الذي يجعلها ترتفع أكثر من المتوقع؟
          </p>

          <p className="mt-8 leading-relaxed opacity-90">
            عندما يبدأ العميل في فهم <strong>تكلفة التشطيب</strong>، فإنه يركّز
            غالبًا على الرقم الإجمالي للمشروع. لكن عند الاقتراب أكثر من البنود
            الفعلية، تظهر عناصر أساسية تؤثر بقوة على الميزانية، ومن أهمها{" "}
            <strong>السباكة والكهرباء</strong>. وهذان البندان ليسا مجرد تفاصيل
            فنية داخل المشروع، بل من أكثر البنود حساسية وتأثيرًا على الجودة
            والتكلفة في الوقت نفسه.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            كثير من الالتباس يحدث هنا لأن بعض العملاء ينظرون إلى السباكة
            والكهرباء على أنها جزء “مفهوم ضمنًا”، بينما في الواقع كل واحد منهما
            يحتوي على طبقات متعددة من القرارات: عدد النقاط، مواقعها، مستوى
            المواد، طريقة التأسيس، التركيبات النهائية، وما إذا كانت بعض العناصر
            داخلة أو مستثناة من العرض.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لذلك إذا أردت قراءة تكلفة التشطيب بشكل صحيح، فمن المهم أن تفهم كيف
            تُحسب بنود السباكة والكهرباء، وما الذي يرفع سعرها، وكيف تقارن بين
            العروض دون أن تنخدع برقم عام غير كافٍ.
          </p>

          <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
            <h2 className="text-xl font-bold">الخلاصة السريعة</h2>
            <p className="mt-3 leading-relaxed opacity-90">
              <strong>السباكة والكهرباء</strong> من أكثر البنود تأثيرًا في تكلفة
              التشطيب، لأنهما يرتبطان بعدد النقاط، ونوعية المواد، وطريقة
              التأسيس، والتوزيع، ومستوى التركيبات النهائية. لذلك لا يكفي أن تسأل
              عن سعرهما بشكل عام، بل يجب أن تعرف ما الذي يشمله كل بند فعليًا.
            </p>
          </div>

          <h2 className="mt-12 text-2xl font-bold">
            لماذا تعتبر السباكة والكهرباء بنودًا حساسة ماليًا؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            لأنهما من البنود التي لا يظهر أثرها فقط في مرحلة التنفيذ، بل يبقى
            أثرها بعد الاستخدام أيضًا. إذا تم تنفيذها بشكل جيد، فإنها تعطي راحة
            واستقرارًا للمشروع. وإذا كانت قراراتها غير واضحة أو موادها ضعيفة أو
            تعديلاتُها كثيرة، فإن أثرها المالي والفني يظهر بسرعة.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            ومن الناحية المالية، هذان البندان يتأثران بعدد كبير من المتغيرات:
            عدد النقاط، أماكنها، متطلبات الفراغات، تعدد الحمامات أو المطابخ،
            مستوى الأدوات أو التمديدات، وطبيعة التوزيع داخل المسطح. لذلك لا
            يمكن فهم تكلفتهما من عنوان عام فقط.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            ما الذي يدخل عادة ضمن بند الكهرباء؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            بند الكهرباء ضمن التشطيب قد يشمل عادة عناصر مثل:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>تمديدات الكهرباء الأساسية بحسب المخطط أو النطاق.</li>
            <li>نقاط الإنارة والمفاتيح والأفياش.</li>
            <li>التوزيع داخل الغرف والفراغات المختلفة.</li>
            <li>بعض النقاط الخاصة مثل المكيفات أو الأجهزة حسب المشروع.</li>
            <li>اللوحات أو التجهيزات المرتبطة بالنظام بحسب النطاق.</li>
            <li>بعض التركيبات النهائية أو قد تكون مستثناة بحسب العرض.</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            لكن الفرق الحقيقي لا يكون في اسم البند فقط، بل في{" "}
            <strong>عدد النقاط ونوع المواد ومستوى التجهيزات</strong>. فقد يكون
            هناك عرضان يذكران “كهرباء كاملة” لكن أحدهما يشمل تفاصيل أكثر أو
            موادًا أفضل أو عدد نقاط أكبر من الآخر.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            ما الذي يدخل عادة ضمن بند السباكة؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            بند السباكة قد يشمل عادة:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>تمديدات التغذية والصرف بحسب المخطط أو التوزيع.</li>
            <li>التجهيزات المتعلقة بالحمامات والمطابخ وبعض النقاط الخدمية.</li>
            <li>توصيلات بعض العناصر الصحية بحسب النطاق.</li>
            <li>الاختبارات أو بعض أعمال الفحص بحسب النظام المعتمد.</li>
            <li>بعض التركيبات النهائية أو قد تكون مستثناة من العرض.</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            وكما في الكهرباء، لا يكفي عنوان “سباكة” لفهم التكلفة. الفرق قد يكون
            في عدد الحمامات، وعدد النقاط، ومواقعها، ونوعية المواسير أو
            التجهيزات، وهل الأدوات الصحية ضمن السعر أو خارجه.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            ما الذي يرفع تكلفة الكهرباء ضمن التشطيب؟
          </h2>

          <h3 className="mt-8 text-xl font-bold">1) زيادة عدد النقاط</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            كل نقطة إضافية في الإنارة أو الأفياش أو المفاتيح أو التكييف أو
            الأنظمة الخاصة تؤثر على التكلفة. ومع تكرار ذلك في كامل المشروع،
            يصبح الفرق واضحًا في الميزانية.
          </p>

          <h3 className="mt-8 text-xl font-bold">2) تغيير المواقع أثناء التنفيذ</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            عندما تتغير مواقع النقاط بعد بدء العمل، فهذا لا يعني فقط نقل نقطة من
            مكان لآخر، بل قد يعني إعادة ترتيب في التمديدات أو التكسير أو التنسيق
            مع بنود أخرى، ما يرفع التكلفة والوقت معًا.
          </p>

          <h3 className="mt-8 text-xl font-bold">3) اختيار تجهيزات أعلى مستوى</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            الفرق بين مستوى وآخر في بعض مواد وتجهيزات الكهرباء قد يبدو بسيطًا في
            البداية، لكنه يتضاعف عند تكراره في عدد كبير من النقاط أو العناصر
            داخل المشروع.
          </p>

          <h3 className="mt-8 text-xl font-bold">4) تعقيد التوزيع أو المتطلبات الخاصة</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            بعض المشاريع تحتوي على متطلبات إضافية أو توزيع معقد أو رغبة في مرونة
            أكبر في الإضاءة والتشغيل، وهذا ينعكس طبيعيًا على التكلفة.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            ما الذي يرفع تكلفة السباكة ضمن التشطيب؟
          </h2>

          <h3 className="mt-8 text-xl font-bold">1) زيادة عدد الحمامات أو النقاط</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            كلما زاد عدد الحمامات أو نقاط التغذية والصرف أو المغاسل أو المطابخ،
            زادت الكميات والأعمال المطلوبة، وبالتالي ترتفع التكلفة.
          </p>

          <h3 className="mt-8 text-xl font-bold">2) تغيير مواقع التغذية أو الصرف</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            من أكثر ما يرفع تكلفة السباكة أن يتم تعديل مواقع بعض العناصر أثناء
            التنفيذ، لأن ذلك قد يفرض إعادة توزيع أو تمديد أو معالجة إضافية.
          </p>

          <h3 className="mt-8 text-xl font-bold">3) اختيار أدوات صحية أعلى جودة</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            إذا كانت بعض العناصر النهائية أو التركيبات داخلة في النطاق، فإن
            انتقالها من مستوى إلى آخر يرفع التكلفة بشكل مباشر، خاصة إذا تكرر ذلك
            في أكثر من حمام أو مساحة.
          </p>

          <h3 className="mt-8 text-xl font-bold">4) إعادة تنفيذ أو معالجات إضافية</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            في بعض الحالات تظهر الحاجة إلى تصحيح أو معالجة أو إعادة تنفيذ جزء من
            الأعمال، سواء بسبب تغييرات أو بسبب ظروف الموقع، وهذا ينعكس على
            الميزانية النهائية.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            هل سعر المتر يكفي لفهم هذه البنود؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            ليس بدقة. سعر المتر قد يساعد في بناء تصور عام عن ميزانية التشطيب،
            لكنه لا يشرح لك ما الذي يحدث داخل بنود مثل السباكة والكهرباء. فهذه
            البنود لا تتحدد فقط بالمساحة، بل بعدد النقاط، والتوزيع، والمستوى،
            والتفاصيل الفنية، وحجم التعديلات المطلوبة.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لذلك أي قراءة دقيقة لتكلفتهما تحتاج إلى فهم البند نفسه، وليس فقط
            الاعتماد على رقم عام للمشروع بالكامل.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            ما أكثر الأخطاء الشائعة في هذه البنود؟
          </h2>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>عدم تحديد عدد النقاط أو نطاقها من البداية.</li>
            <li>تغيير المواقع أثناء التنفيذ.</li>
            <li>الخلط بين التأسيس والتركيبات النهائية.</li>
            <li>مقارنة عرضين دون معرفة ما إذا كانت التركيبات داخلة أو خارجة.</li>
            <li>عدم الانتباه إلى مستوى المواد أو المواصفات.</li>
            <li>ترك قرارات كثيرة مفتوحة إلى وقت التنفيذ.</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            هذه الأخطاء قد تجعل العميل يظن أن التكلفة ارتفعت فجأة، بينما الحقيقة
            أن السبب غالبًا هو أن البند لم يكن محددًا بشكل كافٍ منذ البداية.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            كيف تقارن بين عرضين في بند السباكة والكهرباء؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            المقارنة الصحيحة لا تكون بين الرقم فقط، بل بين:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>عدد النقاط في كل عرض.</li>
            <li>نوع المواد أو المستوى المعتمد.</li>
            <li>ما إذا كانت التركيبات النهائية مشمولة أم لا.</li>
            <li>وجود بنود خاصة أو إضافية داخل أحد العرضين دون الآخر.</li>
            <li>وضوح النطاق والاستثناءات.</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            العرض الأرخص قد لا يكون أفضل إذا كان يترك جزءًا من البنود خارج
            الحساب، أو يعتمد على مستوى أدنى من المواد، أو يذكر توصيفًا عامًا دون
            تفصيل كافٍ.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            كيف تقلل احتمالات ارتفاع تكلفة السباكة والكهرباء؟
          </h2>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>حسم عدد النقاط الأساسية من البداية.</li>
            <li>تقليل التعديلات أثناء التنفيذ قدر الإمكان.</li>
            <li>تحديد مستوى المواد أو التركيبات بوضوح.</li>
            <li>فهم ما إذا كانت بعض العناصر داخلة أو مستثناة من السعر.</li>
            <li>قراءة البنود بشكل تفصيلي قبل التعاقد.</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            بهذه الطريقة يصبح المشروع أكثر انضباطًا، وتقل احتمالات ظهور زيادات
            مالية غير متوقعة داخل هذه البنود.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            متى يكون التقدير الأولي مفيدًا ومتى تحتاج تفصيلًا أكبر؟
          </h2>

          <p className="mt-4 leading-relaxed opacity-90">
            التقدير الأولي مفيد عندما تريد فهم الصورة العامة للمشروع. لكن عندما
            تبدأ في مرحلة المقارنة الجدية أو تقترب من التنفيذ، تصبح الحاجة أكبر
            إلى{" "}
            <strong>تفصيل البنود</strong>، خصوصًا في السباكة والكهرباء، لأنهما من
            البنود التي تتأثر بالتفاصيل الصغيرة بشكل مباشر.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لذلك الأفضل أن تتعامل مع هذه البنود بعقلية:{" "}
            <strong>افهم التفاصيل قبل أن تقرأ الرقم</strong>.
          </p>

          <div className="mt-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 md:p-8">
            <h2 className="text-2xl font-bold">احسب تكلفة مشروعك بشكل مبدئي</h2>
            <p className="mt-3 leading-relaxed opacity-90">
              إذا كنت تريد تصورًا أوليًا لتكلفة المشروع قبل الغوص في التفاصيل
              الكاملة، يمكنك استخدام الحاسبة في الموقع للحصول على فهم مبدئي يساعدك
              على ترتيب الميزانية واتخاذ القرار بشكل أفضل.
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
            <strong>تكلفة السباكة والكهرباء ضمن التشطيب</strong> لا تُفهم بشكل
            صحيح من عنوان عام فقط، لأن هذين البندين يتأثران بالنقاط، والتوزيع،
            والمواد، والقرارات التنفيذية، والاستثناءات المكتوبة في العرض.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            وكلما كانت هذه البنود أوضح من البداية، وكانت قراءتك للعروض أدق،
            وقراراتك محسومة قبل التنفيذ، أصبحت قدرتك على ضبط الميزانية أعلى، وقلت
            احتمالات أن تتحول هذه البنود الأساسية إلى مصدر مفاجآت مالية لاحقًا.
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
                  to="/engineering-insights/cost/what-increases-finishing-cost-riyadh"
                  className="underline decoration-yellow-400 underline-offset-4 hover:opacity-80"
                >
                  ما الذي يرفع تكلفة التشطيب في الرياض؟
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
            </ul>
          </div>

          <section className="mt-14">
            <h2 className="text-2xl font-bold mb-4">الأسئلة الشائعة</h2>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q1">
                <AccordionTrigger>
                  هل السباكة والكهرباء من أكثر البنود تأثيرًا في تكلفة التشطيب؟
                </AccordionTrigger>
                <AccordionContent>
                  نعم، لأنهما من البنود الأساسية التي ترتبط بعدد النقاط
                  والتجهيزات ونوعية المواد وطريقة التأسيس والتنفيذ، وأي تغيير
                  فيهما قد ينعكس على التكلفة النهائية بشكل واضح.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q2">
                <AccordionTrigger>
                  ما الذي يرفع تكلفة الكهرباء ضمن التشطيب؟
                </AccordionTrigger>
                <AccordionContent>
                  من أبرز الأسباب: زيادة عدد النقاط، تغيير مواقعها أثناء التنفيذ،
                  اختيار تجهيزات أعلى مستوى، وتعقيد التوزيع أو متطلبات الإضاءة
                  والأنظمة الإضافية.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q3">
                <AccordionTrigger>
                  ما الذي يرفع تكلفة السباكة ضمن التشطيب؟
                </AccordionTrigger>
                <AccordionContent>
                  من أكثر الأسباب: زيادة عدد الحمامات أو المطابخ، تغيير مواقع
                  التغذية والصرف، اختيار أدوات صحية أعلى جودة، ووجود أعمال
                  إضافية أو إعادة تنفيذ لبعض الأجزاء.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q4">
                <AccordionTrigger>
                  هل يمكن معرفة تكلفة السباكة والكهرباء من سعر المتر فقط؟
                </AccordionTrigger>
                <AccordionContent>
                  ليس بدقة، لأن هذه البنود تتأثر بعدد النقاط والتوزيع ونوعية
                  المواد والتفاصيل الفنية، لذلك سعر المتر يعطي تصورًا عامًا فقط
                  ولا يغني عن قراءة البنود الفعلية.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q5">
                <AccordionTrigger>
                  كيف أقارن بين عرضين في بند السباكة والكهرباء؟
                </AccordionTrigger>
                <AccordionContent>
                  بمقارنة النطاق الفعلي، وعدد النقاط، ونوعية المواد، وما إذا كانت
                  التركيبات أو بعض العناصر النهائية داخلة أو مستثناة، وليس
                  بمقارنة الرقم النهائي فقط.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </article>
      </div>
    </main>
  );
}