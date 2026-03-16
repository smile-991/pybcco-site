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
  "https://pybcco.com/engineering-insights/cost/gray-structure-cost-riyadh";

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
    headline: "تكلفة بناء عظم بالرياض | ما الذي يشمله العظم وما الذي يغير السعر؟",
    description:
      "دليل عملي لفهم تكلفة بناء عظم بالرياض، وما الذي يدخل عادة ضمن مرحلة العظم، والعوامل التي تؤثر على السعر، وكيف تبني تصورًا أوليًا قبل طلب عرض السعر.",
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
      "تكلفة بناء عظم بالرياض",
      "بناء فلل بالرياض",
      "مرحلة العظم",
      "سعر بناء العظم",
      "تكلفة الهيكل الإنشائي",
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
        name: "كم تكلفة بناء عظم بالرياض؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "تختلف تكلفة بناء العظم بالرياض حسب المساحة والتصميم وعدد الأدوار وطبيعة الموقع ونطاق الأعمال، لذلك لا يوجد رقم ثابت يصلح لجميع المشاريع.",
        },
      },
      {
        "@type": "Question",
        name: "ما المقصود بمرحلة العظم؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "مرحلة العظم تشير عادة إلى الأعمال الإنشائية الأساسية مثل الحفر والأساسات والخرسانة والهيكل الرئيسي وبعض الأعمال المرتبطة به حسب نطاق المشروع.",
        },
      },
      {
        "@type": "Question",
        name: "هل العظم يشمل التشطيب؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "لا، في العادة العظم يختلف عن التشطيب. العظم يركز على الهيكل الإنشائي والأعمال الأساسية، بينما التشطيب يشمل الأعمال النهائية بحسب النطاق المتفق عليه.",
        },
      },
      {
        "@type": "Question",
        name: "ما الذي يرفع تكلفة العظم أكثر من المتوقع؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "من أبرز الأسباب: تعقيد التصميم، ظروف الموقع، عدد الأدوار، اختلاف التربة، تغيّر البنود أثناء التنفيذ، وعدم وضوح النطاق من البداية.",
        },
      },
      {
        "@type": "Question",
        name: "هل سعر المتر يكفي لحساب تكلفة العظم؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "سعر المتر يساعد على بناء تصور أولي فقط، لكنه لا يغني عن دراسة المخططات ونطاق الأعمال والتفاصيل التنفيذية إذا كان الهدف الوصول إلى تقدير أدق.",
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
        name: "تكلفة بناء عظم بالرياض",
        item: CANONICAL,
      },
    ],
  };
}

export default function GrayStructureCostRiyadh() {
  const jsonLd = useMemo(() => {
    return [buildArticleJsonLd(), buildFaqJsonLd(), buildBreadcrumbJsonLd()];
  }, []);

  return (
    <>
      <SeoHead
        title="تكلفة بناء عظم بالرياض | ما الذي يشمله العظم وما الذي يغير السعر؟ | PYBCCO"
        description="تعرف على تكلفة بناء عظم بالرياض، وما الذي يدخل عادة ضمن مرحلة العظم، والعوامل التي تؤثر على السعر، وكيف تبني تصورًا أوليًا للمشروع."
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
              تكلفة بناء عظم بالرياض
            </h1>

            <p className="mt-3 text-lg opacity-80 leading-relaxed">
              فهم مرحلة العظم بطريقة صحيحة يساعدك على بناء قرار مالي أوضح قبل بدء
              التنفيذ
            </p>

            <p className="mt-8 leading-relaxed opacity-90">
              كثير من العملاء عندما يبدأون التفكير في مشروع بناء جديد لا يكون
              سؤالهم الأول عن التشطيب، بل عن{" "}
              <strong>تكلفة بناء العظم بالرياض</strong>. وهذا منطقي جدًا، لأن
              مرحلة العظم تمثل القاعدة الأساسية للمشروع، وهي المرحلة التي يبدأ عندها
              التحول من المخطط على الورق إلى هيكل قائم فعليًا على الأرض.
            </p>

            <p className="mt-4 leading-relaxed opacity-90">
              لكن رغم شيوع هذا السؤال، إلا أن كثيرًا من الالتباس يحصل في فهم معنى
              “العظم” نفسه. بعض الناس يقصد بالعظم الهيكل الكامل فقط، وبعضهم يدخل
              ضمنه بعض الأعمال التأسيسية أو البنود المرتبطة بالموقع، وآخرون
              يقارنون بين عروض تختلف في النطاق وهم يظنون أنها متشابهة. لذلك، لا
              يكفي أن تسأل عن الرقم فقط، بل يجب أن تعرف{" "}
              <strong>ما الذي يشمله العظم فعلًا</strong>، وما الذي لا يشمله، وما
              العوامل التي تجعله أعلى أو أقل من مشروع لآخر.
            </p>

            <p className="mt-4 leading-relaxed opacity-90">
              في هذا التقرير سنشرح مفهوم بناء العظم بطريقة عملية، وسنوضح البنود
              التي تدخل فيه عادة، والعوامل التي تؤثر على التكلفة، والأخطاء الشائعة
              في قراءة الأسعار، وكيف تبني تصورًا أوليًا أقرب للواقع قبل طلب عرض
              سعر تفصيلي. وإذا كنت تريد تكوين صورة أشمل عن الميزانية من بداية
              المشروع وحتى المراحل النهائية، فابدأ من{" "}
              <Link
                to="/villa-construction-cost-calculator-riyadh"
                className="font-semibold text-yellow-600 hover:text-yellow-700"
              >
                حاسبة تكلفة بناء الفيلا في الرياض
              </Link>{" "}
              ثم عد إلى هذا الدليل لتفصل مرحلة العظم ضمن المسار الكامل للمشروع.
            </p>

            <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
              <h2 className="text-xl font-bold">الخلاصة السريعة</h2>
              <p className="mt-3 leading-relaxed opacity-90">
                <strong>تكلفة بناء عظم بالرياض</strong> لا تعتمد على المساحة وحدها،
                بل تتأثر أيضًا بالتصميم، وعدد الأدوار، وطبيعة التربة، ونطاق
                الأعمال، وطريقة التنفيذ. لذلك لا يوجد رقم موحد لكل المشاريع، بل
                يجب التعامل مع التكلفة على أنها تقدير مبدئي يتأكد لاحقًا بعد دراسة
                المخططات والتفاصيل.
              </p>
            </div>

            <h2 className="mt-12 text-2xl font-bold">
              ما المقصود بمرحلة العظم؟
            </h2>

            <p className="mt-4 leading-relaxed opacity-90">
              مرحلة العظم تشير عادة إلى{" "}
              <strong>الأعمال الإنشائية الأساسية</strong> التي تُنشئ الهيكل
              الرئيسي للمشروع. وهي المرحلة التي ينتقل فيها المشروع من أعمال
              التحضير الأولية إلى وجود بناء فعلي واضح على الموقع.
            </p>

            <p className="mt-4 leading-relaxed opacity-90">
              في كثير من المشاريع، قد تشمل هذه المرحلة عادة عناصر مثل:
            </p>

            <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
              <li>أعمال الحفر والردم بحسب نطاق المشروع.</li>
              <li>الأساسات وما يرتبط بها إنشائيًا.</li>
              <li>الخرسانة المسلحة والعناصر الهيكلية الرئيسية.</li>
              <li>الأعمدة، والأسقف، والجسور.</li>
              <li>المباني الهيكلية أو بعض الأعمال الأساسية المرتبطة بها.</li>
              <li>بعض الأعمال التأسيسية أو التحضيرية بحسب الاتفاق.</li>
            </ul>

            <p className="mt-4 leading-relaxed opacity-90">
              لكن يجب الانتباه إلى نقطة مهمة جدًا:{" "}
              <strong>
                ليس كل عرض “عظم” يشمل نفس البنود بالضبط
              </strong>
              . لذلك من الضروري دائمًا قراءة النطاق الفعلي وعدم الاعتماد على
              الاسم فقط. ولهذا يفيدك أيضًا الرجوع إلى{" "}
              <Link
                to="/engineering-insights/cost/villa-construction-cost-riyadh"
                className="font-semibold text-yellow-600 hover:text-yellow-700"
              >
                دليل تكلفة بناء فيلا بالرياض
              </Link>{" "}
              حتى ترى كيف تُقرأ مرحلة العظم داخل الصورة الكاملة للبناء.
            </p>

            <h2 className="mt-12 text-2xl font-bold">
              لماذا تختلف تكلفة العظم من مشروع إلى آخر؟
            </h2>

            <p className="mt-4 leading-relaxed opacity-90">
              لأن مرحلة العظم ليست مجرد كمية خرسانة وحديد فقط، بل هي نتيجة مباشرة
              لعوامل متعددة تتعلق بطبيعة المشروع نفسه. ولهذا قد ترى مشروعين
              بمساحات متقاربة، لكن الفارق في التكلفة بينهما واضح بسبب اختلاف
              التكوين الإنشائي أو ظروف التنفيذ أو مستوى التعقيد.
            </p>

            <h3 className="mt-8 text-xl font-bold">1) مساحة المشروع</h3>
            <p className="mt-3 leading-relaxed opacity-90">
              كلما زادت المساحة زادت الكميات المطلوبة من المواد وساعات العمل، لكن
              المساحة ليست العامل الوحيد. أحيانًا يكون مشروع أصغر مساحة لكنه أكثر
              تعقيدًا من مشروع أكبر وأبسط.
            </p>

            <h3 className="mt-8 text-xl font-bold">2) التصميم الإنشائي والمعماري</h3>
            <p className="mt-3 leading-relaxed opacity-90">
              التصميم البسيط والمباشر يختلف عن التصميم الذي يحتوي على كوابيل أو
              بروزات أو توزيع إنشائي معقد أو فراغات خاصة تحتاج معالجة مختلفة. هذه
              العناصر تؤثر مباشرة على كميات المواد وطريقة التنفيذ والزمن المطلوب.
            </p>

            <h3 className="mt-8 text-xl font-bold">3) عدد الأدوار</h3>
            <p className="mt-3 leading-relaxed opacity-90">
              مشروع دور واحد يختلف عن مشروع متعدد الأدوار من حيث المنظومة
              الإنشائية وتوزيع الأحمال وبعض المتطلبات التنفيذية. وهذا يؤثر على
              التكلفة حتى لو كانت المساحة الكلية متقاربة.
            </p>

            <h3 className="mt-8 text-xl font-bold">4) طبيعة التربة والموقع</h3>
            <p className="mt-3 leading-relaxed opacity-90">
              الموقع نفسه قد يغيّر جزءًا من التكلفة. فبعض المواقع تكون ظروفها
              أبسط من غيرها، وبعضها يتطلب أعمالًا إضافية أو تجهيزات خاصة أو معالجة
              معينة قبل استكمال التنفيذ الطبيعي.
            </p>

            <h3 className="mt-8 text-xl font-bold">5) نطاق الأعمال المكتوب</h3>
            <p className="mt-3 leading-relaxed opacity-90">
              لا يمكن مقارنة عرضين للعظم إذا لم يكن النطاق متطابقًا تقريبًا.
              أحيانًا يشمل عرض الحفر والردم وبعض الأعمال التحضيرية، وأحيانًا يكون
              النطاق أضيق. لذلك الرقم وحده لا يكفي لفهم الفرق. ومن المهم هنا أيضًا
              مراجعة{" "}
              <Link
                to="/engineering-insights/cost/misleading-quotation-mistakes"
                className="font-semibold text-yellow-600 hover:text-yellow-700"
              >
                الأخطاء التي تجعل عرض السعر مضللًا
              </Link>{" "}
              لأن جزءًا كبيرًا من سوء فهم أسعار العظم يبدأ من ضعف وضوح البنود.
            </p>

            <h2 className="mt-12 text-2xl font-bold">
              هل العظم يشمل التشطيب؟
            </h2>

            <p className="mt-4 leading-relaxed opacity-90">
              في العادة لا.{" "}
              <strong>العظم يختلف عن التشطيب</strong> من حيث المرحلة والنطاق
              والهدف. العظم يركز على إنشاء الهيكل الأساسي للمبنى، بينما التشطيب
              يأتي لاحقًا ليجعل المشروع قابلًا للاستخدام من الناحية الوظيفية
              والجمالية.
            </p>

            <p className="mt-4 leading-relaxed opacity-90">
              لهذا السبب، عندما تسأل عن تكلفة بناء عظم، يجب ألا تخلطها مع تكلفة
              التشطيب أو مع تكلفة المشروع كاملًا من الحفر حتى تسليم المفتاح. كل
              مرحلة لها منطق مختلف في الحساب والتسعير. وإذا أردت ربط هذه المرحلة
              بما يأتي بعدها، فاقرأ أيضًا{" "}
              <Link
                to="/engineering-insights/cost/villa-shell-to-finish-cost-riyadh"
                className="font-semibold text-yellow-600 hover:text-yellow-700"
              >
                تكلفة تشطيب فيلا عظم بالرياض
              </Link>{" "}
              لتفهم الانتقال من الهيكل الإنشائي إلى الأعمال النهائية.
            </p>

            <h2 className="mt-12 text-2xl font-bold">
              هل سعر المتر مفيد في مرحلة العظم؟
            </h2>

            <p className="mt-4 leading-relaxed opacity-90">
              نعم، لكنه مفيد فقط كوسيلة{" "}
              <strong>لبناء تصور أولي سريع</strong>. فكما هو الحال في التشطيب،
              يمكن لسعر المتر أن يساعدك على فهم ما إذا كانت ميزانية المشروع ضمن
              الحدود المنطقية، لكنه لا يكفي وحده لاتخاذ قرار نهائي أو مقارنة دقيقة
              بين العروض.
            </p>

            <p className="mt-4 leading-relaxed opacity-90">
              السبب هو أن سعر المتر قد يتغير بسبب اختلاف التصميم أو النطاق أو
              ظروف الموقع أو التفاصيل الإنشائية. لذلك يجب أن يبقى هذا الرقم في
              ذهنك كمؤشر أولي، لا كقيمة نهائية ثابتة. وإذا كنت في مرحلة تكوين
              صورة عامة قبل طلب التسعير، فمراجعة{" "}
              <Link
                to="/villa-construction-cost-calculator-riyadh"
                className="font-semibold text-yellow-600 hover:text-yellow-700"
              >
                حاسبة تكلفة البناء
              </Link>{" "}
              تعطيك أساسًا أوليًا أوسع من الاعتماد على سؤال سعر المتر وحده.
            </p>

            <h2 className="mt-12 text-2xl font-bold">
              كيف تبني تصورًا أوليًا لتكلفة العظم؟
            </h2>

            <p className="mt-4 leading-relaxed opacity-90">
              أفضل طريقة هي أن تبدأ بتحديد الأمور التالية:
            </p>

            <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
              <li>المساحة الفعلية للمشروع.</li>
              <li>عدد الأدوار والتوزيع العام.</li>
              <li>هل التصميم بسيط أم يحتوي على تعقيد واضح؟</li>
              <li>هل الموقع يحتاج إلى أعمال إضافية أو ظروف خاصة؟</li>
              <li>ما البنود الداخلة فعليًا ضمن عرض العظم؟</li>
            </ul>

            <p className="mt-4 leading-relaxed opacity-90">
              بعد ذلك يمكن استخدام تقدير أولي يساعدك على فهم حجم المشروع ماليًا،
              ثم تنتقل إلى عرض سعر تفصيلي يوضح ما هو مشمول وما هو غير مشمول بدقة.
              ومن المفيد هنا أيضًا قراءة{" "}
              <Link
                to="/engineering-insights/cost/how-to-estimate-project-cost-initially"
                className="font-semibold text-yellow-600 hover:text-yellow-700"
              >
                كيف تحسب تكلفة مشروعك بشكل مبدئي
              </Link>{" "}
              لأنها تكمل نفس الفكرة لكن بصورة أوسع على مستوى المشروع كله.
            </p>

            <h2 className="mt-12 text-2xl font-bold">
              ما أكثر الأخطاء التي ترفع تكلفة العظم؟
            </h2>

            <p className="mt-4 leading-relaxed opacity-90">
              في كثير من الحالات لا ترتفع التكلفة فقط بسبب السعر الأساسي، بل بسبب
              قرارات غير واضحة أو تغييرات لاحقة. ومن أبرز الأسباب:
            </p>

            <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
              <li>تعديل التصميم بعد بدء التنفيذ.</li>
              <li>عدم وضوح البنود المشمولة في العقد.</li>
              <li>عدم الانتباه إلى فروق النطاق بين العروض.</li>
              <li>الاكتفاء بسعر المتر دون قراءة التفاصيل.</li>
              <li>إغفال ظروف الموقع أو طبيعته عند الحساب الأولي.</li>
              <li>الاعتماد على أرقام عامة متداولة دون ربطها بالمشروع الفعلي.</li>
            </ul>

            <p className="mt-4 leading-relaxed opacity-90">
              لهذا السبب، فإن ضبط الميزانية في مرحلة العظم لا يعتمد فقط على إيجاد
              “سعر جيد”، بل يعتمد أيضًا على{" "}
              <strong>وضوح التخطيط من البداية</strong>. وكلما كانت رؤيتك أوضح،
              أصبحت مقارنة العروض أكثر عدلًا، سواء كنت تراجع صفحة متخصصة أو
              تتنقل عبر{" "}
              <Link
                to="/"
                className="font-semibold text-yellow-600 hover:text-yellow-700"
              >
                موقع بنيان الهرم للمقاولات
              </Link>{" "}
              بين الخدمات والمقالات المرتبطة بالمشروع.
            </p>

            <h2 className="mt-12 text-2xl font-bold">
              كيف تقارن بين عرضين لعظم بطريقة صحيحة؟
            </h2>

            <p className="mt-4 leading-relaxed opacity-90">
              المقارنة الصحيحة لا تكون بين الرقم النهائي فقط، بل بين:
            </p>

            <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
              <li>النطاق مقابل النطاق.</li>
              <li>المخططات أو الافتراضات الإنشائية مقابل مثيلاتها.</li>
              <li>البنود المشمولة مقابل البنود المشمولة.</li>
              <li>ما هو مستثنى في هذا العرض وما هو مستثنى في الآخر.</li>
              <li>الوضوح في آلية التعديلات أو الأعمال الإضافية.</li>
            </ul>

            <p className="mt-4 leading-relaxed opacity-90">
              العرض الأقل رقمًا ليس دائمًا الأفضل، وأحيانًا يكون الفرق في السعر
              ناتجًا عن فرق حقيقي في النطاق أو الوضوح أو التنظيم. ولهذا يفيدك
              أيضًا الرجوع إلى{" "}
              <Link
                to="/engineering-insights/cost/how-to-compare-finishing-quotations"
                className="font-semibold text-yellow-600 hover:text-yellow-700"
              >
                كيفية مقارنة عروض الأسعار
              </Link>{" "}
              لأن منطق المقارنة نفسه مهم جدًا حتى في مرحلة العظم.
            </p>

            <h2 className="mt-12 text-2xl font-bold">
              متى تنتقل من التقدير الأولي إلى العرض التفصيلي؟
            </h2>

            <p className="mt-4 leading-relaxed opacity-90">
              إذا كنت في بداية المشروع، فالتقدير الأولي ممتاز لبناء تصور عام. أما
              إذا اقتربت من قرار التنفيذ، فهنا يجب أن تنتقل إلى{" "}
              <strong>عرض سعر تفصيلي</strong> يوضح البنود بوضوح حتى لا تتحول
              الأرقام العامة إلى خلافات أو مفاجآت لاحقًا.
            </p>

            <p className="mt-4 leading-relaxed opacity-90">
              بهذه الطريقة يصبح التقدير الأولي مفيدًا كمرحلة أولى، وليس كبديل عن
              الدراسة الفعلية للمشروع. والبداية العملية المناسبة غالبًا تكون من{" "}
              <Link
                to="/villa-construction-cost-calculator-riyadh"
                className="font-semibold text-yellow-600 hover:text-yellow-700"
              >
                حاسبة تكلفة بناء الفيلا في الرياض
              </Link>{" "}
              ثم الانتقال بعدها إلى قراءة عروض الأسعار التفصيلية حسب مرحلة المشروع.
            </p>

            <div className="mt-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 md:p-8">
              <h2 className="text-2xl font-bold">احسب تكلفة مشروعك بشكل مبدئي</h2>
              <p className="mt-3 leading-relaxed opacity-90">
                إذا كنت تريد تصورًا أوليًا لميزانية مشروعك قبل طلب عرض سعر
                تفصيلي، يمكنك استخدام الحاسبة في الموقع للحصول على فهم مبدئي أقرب
                للواقع. وإذا كان هدفك ربط مرحلة العظم بالصورة الكاملة للمشروع،
                فابدأ من{" "}
                <Link
                  to="/villa-construction-cost-calculator-riyadh"
                  className="font-semibold text-yellow-600 hover:text-yellow-700"
                >
                  حاسبة تكلفة بناء الفيلا في الرياض
                </Link>
                .
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="rounded-2xl">
                  <Link to="/villa-construction-cost-calculator-riyadh">
                    افتح حاسبة تكلفة البناء
                  </Link>
                </Button>

                <Button asChild variant="outline" className="rounded-2xl">
                  <Link to="/construction-company-riyadh">خدمات المقاولات</Link>
                </Button>
              </div>
            </div>

            <h2 className="mt-12 text-2xl font-bold">خلاصة التقرير</h2>

            <p className="mt-4 leading-relaxed opacity-90">
              <strong>تكلفة بناء عظم بالرياض</strong> لا تُفهم بشكل صحيح من خلال
              رقم واحد فقط، بل من خلال فهم ما يشمله العظم فعلًا، وما العوامل التي
              تؤثر على الهيكل الإنشائي ونطاق التنفيذ وطبيعة الموقع.
            </p>

            <p className="mt-4 leading-relaxed opacity-90">
              وكلما كان تعريفك للنطاق أوضح، وقراءتك للعروض أدق، وقدرتك على التمييز
              بين التقدير المبدئي والسعر النهائي أكبر، أصبحت قراراتك المالية أكثر
              استقرارًا وقلّت احتمالات المفاجآت أثناء التنفيذ. ويمكنك دائمًا البدء
              من{" "}
              <Link
                to="/villa-construction-cost-calculator-riyadh"
                className="font-semibold text-yellow-600 hover:text-yellow-700"
              >
                حاسبة تكلفة البناء
              </Link>{" "}
              ثم العودة إلى هذا الدليل لتفصيل مرحلة العظم ضمن خطة المشروع ككل.
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
                    to="/engineering-insights/cost/villa-300m-construction-cost-riyadh"
                    className="underline decoration-yellow-400 underline-offset-4 hover:opacity-80"
                  >
                    تكلفة بناء فيلا 300 متر بالرياض
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
                    to="/villa-construction-cost-calculator-riyadh"
                    className="underline decoration-yellow-400 underline-offset-4 hover:opacity-80"
                  >
                    حاسبة تكلفة بناء الفيلا في الرياض
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="underline decoration-yellow-400 underline-offset-4 hover:opacity-80"
                  >
                    الصفحة الرئيسية
                  </Link>
                </li>
              </ul>
            </div>

            <section className="mt-14">
              <h2 className="text-2xl font-bold mb-4">الأسئلة الشائعة</h2>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="q1">
                  <AccordionTrigger>
                    كم تكلفة بناء عظم بالرياض؟
                  </AccordionTrigger>
                  <AccordionContent>
                    تختلف تكلفة بناء العظم بالرياض حسب المساحة والتصميم وعدد
                    الأدوار وطبيعة الموقع ونطاق الأعمال، لذلك لا يوجد رقم ثابت
                    يصلح لجميع المشاريع.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q2">
                  <AccordionTrigger>
                    ما المقصود بمرحلة العظم؟
                  </AccordionTrigger>
                  <AccordionContent>
                    مرحلة العظم تشير عادة إلى الأعمال الإنشائية الأساسية مثل الحفر
                    والأساسات والخرسانة والهيكل الرئيسي وبعض الأعمال المرتبطة به
                    حسب نطاق المشروع.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q3">
                  <AccordionTrigger>
                    هل العظم يشمل التشطيب؟
                  </AccordionTrigger>
                  <AccordionContent>
                    لا، في العادة العظم يختلف عن التشطيب. العظم يركز على الهيكل
                    الإنشائي والأعمال الأساسية، بينما التشطيب يشمل الأعمال النهائية
                    بحسب النطاق المتفق عليه.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q4">
                  <AccordionTrigger>
                    ما الذي يرفع تكلفة العظم أكثر من المتوقع؟
                  </AccordionTrigger>
                  <AccordionContent>
                    من أبرز الأسباب: تعقيد التصميم، ظروف الموقع، عدد الأدوار،
                    اختلاف التربة، تغيّر البنود أثناء التنفيذ، وعدم وضوح النطاق من
                    البداية.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q5">
                  <AccordionTrigger>
                    هل سعر المتر يكفي لحساب تكلفة العظم؟
                  </AccordionTrigger>
                  <AccordionContent>
                    سعر المتر يساعد على بناء تصور أولي فقط، لكنه لا يغني عن دراسة
                    المخططات ونطاق الأعمال والتفاصيل التنفيذية إذا كان الهدف
                    الوصول إلى تقدير أدق.
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