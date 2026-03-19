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
  "https://pybcco.com/engineering-insights/cost/villa-construction-cost-riyadh";

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
    headline: "تكلفة بناء فيلا بالرياض | كيف تُحسب فعليًا وما الذي يرفع السعر؟",
    description:
      "دليل عملي لفهم تكلفة بناء فيلا بالرياض، والعوامل التي تؤثر على السعر، والفرق بين العظم والتشطيب وتسليم المفتاح، مع مثال تطبيقي يساعد على تكوين تصور أولي للمشروع.",
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
      "تكلفة بناء فيلا بالرياض",
      "بناء فلل بالرياض",
      "تكلفة العظم والتشطيب",
      "سعر بناء فيلا",
      "تكلفة تسليم مفتاح",
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
        name: "كم تكلفة بناء فيلا بالرياض؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "تختلف تكلفة بناء الفيلا في الرياض حسب المساحة والتصميم ومستوى التشطيب ونطاق الأعمال، لذلك لا يوجد رقم واحد ثابت يصلح لجميع المشاريع.",
        },
      },
      {
        "@type": "Question",
        name: "هل تكلفة البناء تعني العظم فقط؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "ليس دائمًا. بعض الناس يقصدون بالعظم فقط، وآخرون يقصدون المشروع كاملًا من الحفر حتى تسليم المفتاح، لذلك يجب تحديد المقصود بدقة قبل مقارنة الأسعار.",
        },
      },
      {
        "@type": "Question",
        name: "ما الذي يرفع تكلفة بناء الفيلا أكثر من المتوقع؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "من أبرز الأسباب: تعقيد التصميم، تغيّر المواد، كثرة التعديلات أثناء التنفيذ، ضعف التخطيط، وعدم وضوح البنود من البداية.",
        },
      },
      {
        "@type": "Question",
        name: "هل سعر المتر يكفي لحساب تكلفة بناء الفيلا؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "سعر المتر يفيد في التقدير المبدئي فقط، لكنه لا يكفي وحده لاتخاذ قرار نهائي لأن التكلفة الفعلية تعتمد على تفاصيل كثيرة مرتبطة بالمشروع.",
        },
      },
      {
        "@type": "Question",
        name: "ما الفرق بين العظم والتشطيب وتسليم المفتاح؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "العظم يشير عادة إلى الهيكل الإنشائي والأعمال الأساسية، بينما التشطيب يشمل الأعمال النهائية الداخلية والخارجية حسب النطاق، أما تسليم المفتاح فيعني غالبًا مشروعًا جاهزًا للاستخدام وفق البنود المتفق عليها.",
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
        name: "تكلفة بناء فيلا بالرياض",
        item: CANONICAL,
      },
    ],
  };
}

export default function VillaConstructionCostRiyadh() {
  const jsonLd = useMemo(() => {
    return [buildArticleJsonLd(), buildFaqJsonLd(), buildBreadcrumbJsonLd()];
  }, []);

  return (
    <>
      <SeoHead
        title="تكلفة بناء فيلا بالرياض | كيف تُحسب فعليًا وما الذي يرفع السعر؟ | PYBCCO"
        description="تعرف على طريقة حساب تكلفة بناء فيلا بالرياض، والفرق بين العظم والتشطيب وتسليم المفتاح، والعوامل التي تؤثر على الميزانية الفعلية للمشروع."
        canonical={CANONICAL}
        robots="index,follow,max-image-preview:large"
        ogType="article"
        jsonLd={jsonLd}
      />

      <main dir="rtl" className="py-16">
        <div className="fixed left-4 top-1/2 z-40 hidden w-[300px] -translate-y-1/2 xl:block">
          <div className="overflow-hidden rounded-3xl border border-yellow-500/30 bg-neutral-950 text-white shadow-2xl">
            <div className="bg-gradient-to-r from-yellow-500/20 via-yellow-400/10 to-transparent px-5 py-4">
              <p className="text-xs font-semibold tracking-wide text-yellow-400">
                عرض إضافي لزوار هذه الصفحة
              </p>
              <h2 className="mt-2 text-xl font-extrabold leading-snug">
                احصل على خصم 3% و ضمان 6 أشهر إضافية
              </h2>
              <p className="mt-2 text-sm leading-7 text-white/90">
                في حال سجلت في الموقع{" "}
                <span className="font-bold text-yellow-400">
                  (جرب الحاسبة التفاعلية و احسب مشروعك بنفسك)
                </span>
              </p>
            </div>

            <div className="px-5 pb-5 pt-2">
              <p className="text-sm leading-7 text-white/75">
                ابدأ بتقدير مبدئي سريع، ثم سجّل بياناتك لتحصل على المزايا الإضافية
                عند المتابعة.
              </p>

              <div className="mt-4 grid gap-3">
                <Button
                  asChild
                  className="h-12 rounded-2xl bg-yellow-500 font-bold text-black hover:bg-yellow-400"
                >
                  <Link to="/villa-construction-cost-calculator-riyadh">
                    افتح الحاسبة التفاعلية
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-2xl border-yellow-500/40 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to="/create-account">سجل في الموقع</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed inset-x-3 bottom-3 z-40 xl:hidden">
          <div className="rounded-2xl border border-yellow-500/30 bg-neutral-950/95 p-3 text-white shadow-2xl backdrop-blur">
            <p className="text-sm font-bold leading-6">
              احصل على خصم 3% و ضمان 6 أشهر إضافية{" "}
              <span className="text-yellow-400">
                (جرب الحاسبة التفاعلية و احسب مشروعك بنفسك)
              </span>
            </p>

            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Button
                asChild
                className="h-12 w-full rounded-xl bg-yellow-500 font-bold text-black hover:bg-yellow-400"
              >
                <Link to="/villa-construction-cost-calculator-riyadh">
                  افتح الحاسبة
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-12 w-full rounded-xl border-yellow-500/40 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/create-account">سجل الآن</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 xl:pl-[340px]">
          <article className="max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-sm font-medium">
              تقرير ضمن قسم التكلفة والتسعير
            </div>

            <h1 className="mt-5 text-3xl md:text-4xl font-bold leading-tight">
              تكلفة بناء فيلا بالرياض
            </h1>

            <p className="mt-3 text-lg opacity-80 leading-relaxed">
              كيف تُحسب التكلفة فعلًا؟ وما الفرق بين التقدير الأولي والميزانية
              النهائية؟
            </p>

            <p className="mt-8 leading-relaxed opacity-90">
              من أكثر الأسئلة تكرارًا عند التفكير في مشروع سكني جديد هو:
              <strong> كم تكلفة بناء فيلا بالرياض؟</strong> وهذا سؤال طبيعي جدًا،
              لأن قرار البناء يرتبط مباشرة بالقدرة المالية، وبوضوح الصورة من
              البداية. لكن المشكلة أن كثيرًا من الناس يبحثون عن رقم سريع ونهائي،
              بينما الواقع أن <strong>تكلفة بناء الفيلا ليست رقمًا ثابتًا</strong>
              ، بل نتيجة مجموعة كبيرة من العوامل المرتبطة بالمساحة، والتصميم،
              والمواصفات، وطريقة التنفيذ، ومستوى التشطيب المطلوب.
            </p>

            <p className="mt-4 leading-relaxed opacity-90">
              لذلك من الأفضل دائمًا أن يبدأ العميل بفهم{" "}
              <strong>منطق التسعير</strong>، لا بمطاردة رقم واحد. فعندما تفهم
              الفرق بين العظم، والتشطيب، وتسليم المفتاح، وتفهم ما الذي يدخل في كل
              مرحلة، تصبح قدرتك على قراءة السوق ومقارنة العروض واتخاذ القرار أفضل
              بكثير.
            </p>

            <p className="mt-4 leading-relaxed opacity-90">
              في هذا التقرير سنشرح كيف يتم تقدير تكلفة بناء الفيلا في الرياض بشكل
              عملي، وما العوامل التي تغيّر السعر، وما الأخطاء التي تؤدي إلى
              انحراف الميزانية، وكيف يمكن بناء تصور أولي منطقي قبل طلب عرض السعر
              التفصيلي.
            </p>

            <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
              <h2 className="text-xl font-bold">الخلاصة السريعة</h2>
              <p className="mt-3 leading-relaxed opacity-90">
                <strong>تكلفة بناء فيلا بالرياض</strong> تعتمد على المساحة، شكل
                التصميم، عدد الأدوار، نوع التربة، نطاق الأعمال، مستوى المواد،
                ومستوى التشطيب. لذلك لا يوجد رقم واحد ينطبق على الجميع، والأفضل
                دائمًا التعامل مع التكلفة كنطاق تقديري مبدئي قبل الانتقال إلى عرض
                سعر تفصيلي واضح البنود.
              </p>
            </div>

            <h2 className="mt-12 text-2xl font-bold">
              ما المقصود فعلًا بـ “تكلفة بناء فيلا”؟
            </h2>

            <p className="mt-4 leading-relaxed opacity-90">
              هذه العبارة قد تبدو واضحة، لكنها في الواقع تحمل أكثر من معنى. فبعض
              العملاء يقصدون بها <strong>العظم فقط</strong>، أي الهيكل الإنشائي
              والأعمال الأساسية قبل التشطيب. وآخرون يقصدون{" "}
              <strong>العظم مع التشطيب</strong>. بينما بعض الناس يستخدمون نفس
              العبارة وهم يقصدون المشروع كاملًا من الحفر حتى{" "}
              <strong>تسليم المفتاح</strong>.
            </p>

            <p className="mt-4 leading-relaxed opacity-90">
              لهذا السبب، أول خطوة قبل أي نقاش عن الأسعار هي أن تحدد بدقة:
              <strong> ما الذي تريد تسعيره بالضبط؟</strong> لأن مقارنة رقم عظم فقط
              برقم مشروع كامل ستكون مقارنة مضللة من البداية.
            </p>

            <h2 className="mt-12 text-2xl font-bold">
              الفرق بين العظم والتشطيب وتسليم المفتاح
            </h2>

            <h3 className="mt-8 text-xl font-bold">1) مرحلة العظم</h3>
            <p className="mt-3 leading-relaxed opacity-90">
              يقصد بها عادة الأعمال الإنشائية الأساسية، مثل الحفر، والردم،
              والأساسات، والخرسانة، والمباني الهيكلية، وبعض الأعمال التأسيسية
              بحسب النطاق. وهي تمثل الهيكل الرئيسي للمشروع قبل الدخول في الأعمال
              النهائية.
            </p>

            <h3 className="mt-8 text-xl font-bold">2) مرحلة التشطيب</h3>
            <p className="mt-3 leading-relaxed opacity-90">
              تشمل الأعمال التي تجعل المشروع جاهزًا بصريًا ووظيفيًا للاستخدام،
              مثل اللياسة، والدهانات، والأرضيات، والجبس، والأبواب، والعناصر
              الصحية، وبعض التركيبات النهائية بحسب ما هو متفق عليه.
            </p>

            <h3 className="mt-8 text-xl font-bold">3) تسليم المفتاح</h3>
            <p className="mt-3 leading-relaxed opacity-90">
              يقصد به غالبًا مشروع كامل تتم إدارته وتنفيذه حتى يصبح جاهزًا
              للاستخدام وفق البنود والمواصفات المكتوبة في العقد. وهنا تكون قيمة
              الوضوح في النطاق أكبر من قيمة الاسم نفسه، لأن “تسليم المفتاح” قد
              يختلف من شركة إلى أخرى إذا لم تُذكر التفاصيل بدقة.
            </p>

            <h2 className="mt-12 text-2xl font-bold">
              لماذا لا توجد تكلفة موحدة لبناء الفلل؟
            </h2>

            <p className="mt-4 leading-relaxed opacity-90">
              لأن كل مشروع فيلا يختلف عن الآخر في مجموعة عوامل رئيسية. حتى لو كانت
              المساحة نفسها، قد يكون أحد المشروعين أبسط بكثير من الآخر من حيث
              الشكل والتقسيمات والتفاصيل والمواد. ولهذا فإن{" "}
              <strong>تكلفة البناء ليست معادلة ثابتة</strong>، بل نتيجة قرارات
              متراكمة تبدأ من التصميم وتنتهي عند آخر بند في التنفيذ.
            </p>

            <p className="mt-4 leading-relaxed opacity-90">
              أي محاولة لاختزال هذا الموضوع في رقم واحد فقط ستؤدي غالبًا إلى تصور
              ناقص، ثم إلى مفاجآت لاحقًا عند التنفيذ أو عند مقارنة العروض.
            </p>

            <h2 className="mt-12 text-2xl font-bold">
              أهم العوامل التي تؤثر على تكلفة بناء الفيلا
            </h2>

            <h3 className="mt-8 text-xl font-bold">1) مساحة البناء الفعلية</h3>
            <p className="mt-3 leading-relaxed opacity-90">
              من الطبيعي أن تؤثر المساحة على التكلفة، لأن زيادة المساحة تعني زيادة
              المواد والعمالة والزمن. لكن المساحة وحدها ليست كل شيء، لأن شكل
              المساحة وطريقة توزيعها والتفاصيل المصاحبة لها قد ترفع التكلفة أو
              تجعلها أكثر كفاءة.
            </p>

            <h3 className="mt-8 text-xl font-bold">2) تصميم الفيلا</h3>
            <p className="mt-3 leading-relaxed opacity-90">
              التصميم البسيط والمباشر يختلف عن تصميم يحتوي على بروزات كثيرة،
              وواجهات معقدة، وفراغات خاصة، وعناصر معمارية تحتاج وقتًا وعناية
              أكبر. كلما زاد التعقيد، زادت عادةً الحاجة إلى أعمال أكثر دقة،
              وبالتالي ترتفع التكلفة.
            </p>

            <h3 className="mt-8 text-xl font-bold">3) عدد الأدوار وطبيعة المشروع</h3>
            <p className="mt-3 leading-relaxed opacity-90">
              فيلا دور واحد تختلف عن فيلا متعددة الأدوار من حيث الهيكل والتوزيع
              وبعض الجوانب التنفيذية. كما أن وجود ملاحق أو أسطح مجهزة أو أعمال
              خارجية إضافية قد يغير الميزانية بشكل واضح.
            </p>

            <h3 className="mt-8 text-xl font-bold">4) نوع التربة وأعمال الموقع</h3>
            <p className="mt-3 leading-relaxed opacity-90">
              بعض المشاريع تكون ظروفها الأرضية والموقعية أبسط، بينما مشاريع أخرى
              تحتاج إلى معالجات إضافية أو حفر أو تجهيزات خاصة قبل بدء التنفيذ.
              لذلك لا يمكن تجاهل ظروف الموقع عند الحديث عن تكلفة البناء.
            </p>

            <h3 className="mt-8 text-xl font-bold">5) مستوى التشطيب المستهدف</h3>
            <p className="mt-3 leading-relaxed opacity-90">
              حتى لو كان الحديث عن “بناء فيلا” بشكل عام، فإن مستوى التشطيب النهائي
              له تأثير مباشر على الميزانية الكلية. فالتشطيب الاقتصادي يختلف عن
              المتوسط، والمتوسط يختلف عن الفاخر، ليس فقط في نوعية المواد، بل في
              مستوى التفاصيل ومدة التنفيذ ودقة الأعمال.
            </p>

            <h3 className="mt-8 text-xl font-bold">6) نوعية المواد والمواصفات</h3>
            <p className="mt-3 leading-relaxed opacity-90">
              اختيار المواد من البداية من أكثر الأمور تأثيرًا على التكلفة. الفرق
              بين مادة عملية بمستوى جيد ومادة أعلى جودة قد يبدو محدودًا في بند
              واحد، لكنه يتحول إلى فرق كبير عند تكراره على عشرات البنود داخل
              المشروع.
            </p>

            <h3 className="mt-8 text-xl font-bold">7) نطاق الأعمال المتفق عليه</h3>
            <p className="mt-3 leading-relaxed opacity-90">
              أحيانًا يكون العرض يغطي الهيكل فقط، وأحيانًا يشمل أعمالًا إضافية أو
              تجهيزات أو عناصر نهائية. لذلك من المهم دائمًا معرفة{" "}
              <strong>ما الذي يدخل في السعر وما الذي لا يدخل</strong> قبل المقارنة
              بين الأرقام.
            </p>

            <h2 className="mt-12 text-2xl font-bold">
              هل سعر المتر مفيد في بناء الفيلا؟
            </h2>

            <p className="mt-4 leading-relaxed opacity-90">
              نعم، لكنه مفيد كمرحلة أولى فقط. سعر المتر يساعد العميل على تكوين
              تصور مبدئي سريع عن حجم المشروع ماليًا. لكنه لا يكفي لاتخاذ قرار
              نهائي، لأن تفاصيل المشروع قد تجعل الرقم المبدئي أعلى أو أقل بشكل
              واضح.
            </p>

            <p className="mt-4 leading-relaxed opacity-90">
              لذلك الأفضل هو استخدام سعر المتر كـ{" "}
              <strong>أداة تقدير أولية</strong>، ثم الانتقال بعد ذلك إلى عرض سعر
              تفصيلي يوضح البنود والمواصفات والمواد والاستثناءات.
            </p>

            <h2 className="mt-12 text-2xl font-bold">
              مثال تطبيقي: كيف تبني تصورًا أوليًا للمشروع؟
            </h2>

            <p className="mt-4 leading-relaxed opacity-90">
              لنفترض أن لديك مشروع فيلا بمساحة متوسطة، وتريد تكوين فهم أولي
              للميزانية المتوقعة. في هذه المرحلة لا تبحث عن رقم نهائي، بل عن{" "}
              <strong>إطار مالي منطقي</strong> يساعدك على التخطيط. تبدأ بتحديد:
            </p>

            <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
              <li>هل المشروع عظم فقط أم عظم وتشطيب أم تسليم مفتاح؟</li>
              <li>ما مستوى التشطيب المطلوب؟</li>
              <li>هل هناك أعمال خارجية أو إضافات خاصة؟</li>
              <li>هل التصميم بسيط أم يحتوي على تعقيد واضح؟</li>
              <li>هل المواد المستهدفة عملية أم أعلى من المتوسط؟</li>
            </ul>

            <p className="mt-4 leading-relaxed opacity-90">
              بعد ذلك يمكن استخدام تقدير أولي يعتمد على المساحة ونطاق المشروع
              والمستوى المطلوب، ثم تتضح الصورة أكثر عند تسعير البنود الفعلية.
            </p>

            <h2 className="mt-12 text-2xl font-bold">
              ما الذي يرفع تكلفة بناء الفيلا أكثر من المتوقع؟
            </h2>

            <p className="mt-4 leading-relaxed opacity-90">
              في كثير من الحالات لا تكون المشكلة في السعر الأساسي، بل في{" "}
              <strong>القرارات غير الواضحة</strong> أو التغييرات المتأخرة. ومن
              أكثر الأسباب التي تؤدي إلى تضخم التكلفة:
            </p>

            <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
              <li>تغيير المواد بعد بدء التنفيذ.</li>
              <li>تعديل التصميم أو إعادة توزيع بعض العناصر.</li>
              <li>عدم وضوح البنود منذ البداية.</li>
              <li>الميل إلى مقارنة الأسعار دون مقارنة المواصفات.</li>
              <li>إغفال بعض الأعمال من الحساب الأولي.</li>
              <li>عدم وجود خطة واضحة للمستوى المستهدف من المشروع.</li>
            </ul>

            <p className="mt-4 leading-relaxed opacity-90">
              لذلك يمكن القول إن جزءًا مهمًا من ضبط الميزانية لا يتعلق فقط
              بالسعر، بل يتعلق أيضًا بـ <strong>جودة التخطيط</strong> قبل التنفيذ.
            </p>

            <h2 className="mt-12 text-2xl font-bold">
              كيف تقارن بين عرضين لبناء فيلا بطريقة صحيحة؟
            </h2>

            <p className="mt-4 leading-relaxed opacity-90">
              الخطأ الشائع هو النظر إلى الرقم النهائي فقط. المقارنة الصحيحة يجب أن
              تكون بين:
            </p>

            <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
              <li>نطاق العمل مقابل نطاق العمل.</li>
              <li>المواصفات مقابل المواصفات.</li>
              <li>المواد مقابل المواد.</li>
              <li>طريقة التنفيذ والإدارة مقابل طريقة التنفيذ والإدارة.</li>
              <li>الضمانات وآلية الاستلام مقابل ما يقابلها في العرض الآخر.</li>
            </ul>

            <p className="mt-4 leading-relaxed opacity-90">
              العرض الأرخص ليس دائمًا الأفضل، كما أن العرض الأعلى ليس دائمًا
              مبالغة. أحيانًا يكون الفرق ناتجًا عن وضوح أكبر في البنود أو مستوى
              أعلى في المواد أو شمول عناصر غير موجودة في العرض الآخر.
            </p>

            <h2 className="mt-12 text-2xl font-bold">
              متى يكون التقدير الأولي مفيدًا فعلًا؟
            </h2>

            <p className="mt-4 leading-relaxed opacity-90">
              يكون مفيدًا عندما تستخدمه لتحديد اتجاهك، لا لاتخاذ قرار نهائي. إذا
              كنت في بداية المشروع وتريد معرفة ما إذا كانت ميزانيتك قريبة من
              الواقع، فالتقدير الأولي ممتاز. أما إذا كنت على وشك التعاقد، فيجب أن
              تنتقل من الأرقام العامة إلى <strong>تفصيل البنود</strong> والمواصفات
              وآلية التنفيذ.
            </p>

            <p className="mt-4 leading-relaxed opacity-90">
              وهذا بالضبط هو الفرق بين فهم السوق بشكل ذكي، وبين الاعتماد على أرقام
              عامة قد تبدو مريحة لكنها غير كافية وحدها.
            </p>

            <div className="mt-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 md:p-8">
              <h2 className="text-2xl font-bold">احسب تكلفة مشروعك بشكل مبدئي</h2>
              <p className="mt-3 leading-relaxed opacity-90">
                إذا كنت تريد تكوين تصور أولي عن ميزانية مشروع الفيلا قبل طلب عرض
                سعر تفصيلي، يمكنك استخدام الحاسبة في الموقع. الحاسبة لا تعطي سعرًا
                نهائيًا، لكنها تساعدك على بناء فهم أولي منطقي للمشروع.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="rounded-2xl">
                  <Link to="/villa-construction-cost-calculator-riyadh">
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
              <strong>تكلفة بناء فيلا بالرياض</strong> لا يمكن اختصارها في رقم
              واحد فقط، لأن التكلفة تتشكل من مجموعة عناصر مترابطة تبدأ من التصميم
              والمساحة، وتمر بنوعية المواد ومستوى التشطيب، وتنتهي بطريقة إدارة
              المشروع ونطاق الأعمال.
            </p>

            <p className="mt-4 leading-relaxed opacity-90">
              لذلك القرار الصحيح لا يكون في البحث عن “أقل رقم”، بل في بناء تصور
              واضح وواقعي، ثم طلب عرض سعر تفصيلي يمكن قراءته ومقارنته بشكل عادل.
              كلما كانت الصورة أوضح من البداية، كانت تجربة البناء أكثر استقرارًا
              وقلت احتمالات المفاجآت أثناء التنفيذ.
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
                    to="/engineering-insights/cost/turnkey-finishing-riyadh"
                    className="underline decoration-yellow-400 underline-offset-4 hover:opacity-80"
                  >
                    تشطيب تسليم مفتاح بالرياض
                  </Link>
                </li>
              </ul>
            </div>

            <section className="mt-14">
              <h2 className="text-2xl font-bold mb-4">الأسئلة الشائعة</h2>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="q1">
                  <AccordionTrigger>
                    كم تكلفة بناء فيلا بالرياض؟
                  </AccordionTrigger>
                  <AccordionContent>
                    تختلف تكلفة بناء الفيلا في الرياض حسب المساحة والتصميم ومستوى
                    التشطيب ونطاق الأعمال، لذلك لا يوجد رقم واحد ثابت يصلح لجميع
                    المشاريع.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q2">
                  <AccordionTrigger>
                    هل تكلفة البناء تعني العظم فقط؟
                  </AccordionTrigger>
                  <AccordionContent>
                    ليس دائمًا. بعض الناس يقصدون بالعظم فقط، وآخرون يقصدون المشروع
                    كاملًا من الحفر حتى تسليم المفتاح، لذلك يجب تحديد المقصود بدقة
                    قبل مقارنة الأسعار.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q3">
                  <AccordionTrigger>
                    ما الذي يرفع تكلفة بناء الفيلا أكثر من المتوقع؟
                  </AccordionTrigger>
                  <AccordionContent>
                    من أبرز الأسباب: تعقيد التصميم، تغيّر المواد، كثرة التعديلات
                    أثناء التنفيذ، ضعف التخطيط، وعدم وضوح البنود من البداية.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q4">
                  <AccordionTrigger>
                    هل سعر المتر يكفي لحساب تكلفة بناء الفيلا؟
                  </AccordionTrigger>
                  <AccordionContent>
                    سعر المتر يفيد في التقدير المبدئي فقط، لكنه لا يكفي وحده
                    لاتخاذ قرار نهائي لأن التكلفة الفعلية تعتمد على تفاصيل كثيرة
                    مرتبطة بالمشروع.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q5">
                  <AccordionTrigger>
                    ما الفرق بين العظم والتشطيب وتسليم المفتاح؟
                  </AccordionTrigger>
                  <AccordionContent>
                    العظم يشير عادة إلى الهيكل الإنشائي والأعمال الأساسية، بينما
                    التشطيب يشمل الأعمال النهائية الداخلية والخارجية حسب النطاق،
                    أما تسليم المفتاح فيعني غالبًا مشروعًا جاهزًا للاستخدام وفق
                    البنود المتفق عليها.
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