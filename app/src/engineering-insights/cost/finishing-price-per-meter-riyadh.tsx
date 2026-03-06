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
  "https://pybcco.com/engineering-insights/cost/finishing-price-per-meter-riyadh";

const DATE_PUBLISHED = "2026-03-06";
const DATE_MODIFIED = "2026-03-06";

function buildArticleJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${CANONICAL}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": CANONICAL },
    inLanguage: "ar",
    headline: "سعر متر التشطيب في الرياض | كيف يُحسب فعليًا وما الذي يغيّر السعر؟",
    description:
      "دليل عملي لفهم سعر متر التشطيب في الرياض، وكيف يتم حساب التكلفة الفعلية، وما الفرق بين التشطيب الاقتصادي والمتوسط والفاخر، مع مثال تطبيقي لفيلا 300 متر.",
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
      "سعر متر التشطيب في الرياض",
      "تكلفة تشطيب فيلا بالرياض",
      "تشطيب فلل بالرياض",
      "تشطيب اقتصادي ومتوسط وفاخر",
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
        name: "كم سعر متر التشطيب في الرياض؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "لا يوجد رقم ثابت يصلح لجميع المشاريع، لأن سعر متر التشطيب في الرياض يتغير بحسب مستوى التشطيب ونوعية المواد ونطاق الأعمال والتفاصيل المعمارية.",
        },
      },
      {
        "@type": "Question",
        name: "هل سعر المتر يكفي لمعرفة تكلفة المشروع؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "سعر المتر يفيد في التقدير المبدئي فقط، لكنه لا يكفي وحده لتحديد التكلفة النهائية، لأن التفاصيل الفعلية للمشروع قد ترفع السعر أو تخفضه.",
        },
      },
      {
        "@type": "Question",
        name: "ما الفرق بين التشطيب الاقتصادي والمتوسط والفاخر؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "الفرق يكون في نوعية المواد، مستوى التفاصيل، جودة العناصر النهائية، وتعقيد التنفيذ. كلما ارتفع المستوى ارتفعت التكلفة غالبًا.",
        },
      },
      {
        "@type": "Question",
        name: "كيف أحسب تكلفة فيلا 300 متر بشكل أولي؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "يمكن حساب تصور أولي عبر ضرب المساحة في نطاق سعري تقريبي مناسب للمستوى المطلوب، ثم مراجعة البنود الفعلية للحصول على صورة أقرب للواقع.",
        },
      },
      {
        "@type": "Question",
        name: "ما الذي يجعل سعر متر التشطيب مضللًا أحيانًا؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "قد يكون السعر مضللًا إذا لم يكن نطاق العمل واضحًا، أو إذا كانت بعض البنود مستثناة، أو كانت المواد المحددة أقل من توقع العميل.",
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
        name: "سعر متر التشطيب في الرياض",
        item: CANONICAL,
      },
    ],
  };
}

export default function FinishingPricePerMeterRiyadh() {
  const jsonLd = useMemo(() => {
    return [buildArticleJsonLd(), buildFaqJsonLd(), buildBreadcrumbJsonLd()];
  }, []);

  return (
    <main dir="rtl" className="py-16">
      <SeoHead
        title="سعر متر التشطيب في الرياض | كيف يُحسب فعليًا وما الذي يغيّر السعر؟ | PYBCCO"
        description="تعرف على سعر متر التشطيب في الرياض بطريقة عملية، وما العوامل التي تؤثر عليه، وكيف تحسب تكلفة مشروعك بشكل مبدئي قبل طلب عرض السعر."
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
            سعر متر التشطيب في الرياض
          </h1>

          <p className="mt-3 text-lg opacity-80 leading-relaxed">
            كيف يُقرأ هذا الرقم فعليًا؟ وما الذي يجعله يختلف من مشروع إلى آخر؟
          </p>

          <p className="mt-8 leading-relaxed opacity-90">
            من أكثر الأسئلة شيوعًا قبل بدء أي مشروع تشطيب هو:
            <strong> كم سعر متر التشطيب في الرياض؟</strong>
            والسبب بسيط، لأن هذا السؤال يعطي العميل نقطة بداية لفهم الميزانية
            المتوقعة قبل أن يدخل في تفاصيل كثيرة. لكن المشكلة أن كثيرًا من الناس
            يتعاملون مع <strong>سعر المتر</strong> كأنه رقم ثابت ونهائي، بينما
            الحقيقة أن هذا الرقم هو <strong>أداة تقدير أولية فقط</strong>، وليس
            بديلًا عن دراسة المشروع فعليًا.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لذلك إذا أردت أن تستفيد فعلًا من معرفة سعر متر التشطيب، فلا يكفي أن
            تسأل عن الرقم وحده. الأهم أن تعرف{" "}
            <strong>كيف يتم احتساب هذا السعر</strong>، وما الذي يشمله، وما الذي
            قد يرفعه أو يخفضه، وكيف تفرّق بين السعر المنطقي والسعر المضلل.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            في هذا التقرير سنشرح مفهوم سعر المتر بطريقة عملية، ونوضح الفرق بين
            المستويات المختلفة، ونقدم مثالًا تطبيقيًا لفيلا 300 متر، ثم نوضح
            الأخطاء الشائعة التي تجعل الاعتماد على “سعر المتر” وحده قرارًا غير
            دقيق.
          </p>

          <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
            <h2 className="text-xl font-bold">الخلاصة السريعة</h2>
            <p className="mt-3 leading-relaxed opacity-90">
              <strong>سعر متر التشطيب في الرياض</strong> لا يكون رقمًا موحدًا
              لكل المشاريع، بل يتغير بحسب مستوى التشطيب، ونوعية المواد، والتصميم،
              والتفاصيل التنفيذية، ونطاق الأعمال. لذلك يمكن استخدامه كتقدير
              مبدئي فقط، وليس كسعر نهائي للتعاقد.
            </p>
          </div>

          <h2 className="mt-12 text-2xl font-bold">
            لماذا يسأل الناس عن سعر متر التشطيب؟
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            لأن السؤال عن سعر المتر هو أسرع طريقة لتكوين صورة أولية عن ميزانية
            المشروع. بدل أن يبدأ العميل بعشرات البنود والتفاصيل الفنية، يلجأ إلى
            رقم مختصر يساعده على فهم هل المشروع قريب من ميزانيته أم لا. وهذا
            طبيعي جدًا، لأن أغلب العملاء لا يريدون منذ البداية الدخول في كل بند
            من بنود التشطيب قبل أن يحصلوا على تصور عام.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لكن المشكلة تبدأ عندما يتحول هذا الرقم من{" "}
            <strong>مؤشر تقريبي</strong> إلى{" "}
            <strong>حكم نهائي على الأسعار والعروض</strong>. وهنا يقع كثير من
            سوء الفهم. فقد يرى العميل سعر متر أقل فيظن أنه أفضل، ثم يكتشف لاحقًا
            أن بعض البنود غير مشمولة، أو أن المواد أقل من المتوقع، أو أن هناك
            تفاصيل لم تُحتسب من البداية.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            ما المقصود فعليًا بسعر متر التشطيب؟
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            المقصود به عادة هو{" "}
            <strong>متوسط تقريبي لتكلفة التشطيب لكل متر مسطح</strong> في المشروع،
            بحيث يمكن استخدامه لتقدير الميزانية الأولية عبر ضرب المساحة في رقم
            تقريبي مناسب. لكنه لا يعني أن كل متر في المشروع يكلف بنفس الطريقة
            حرفيًا، لأن بعض المساحات تتطلب أعمالًا أكثر من غيرها، وبعض البنود
            تختلف كثافتها من مشروع إلى آخر.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لذلك، عندما تسمع رقمًا معينًا لسعر المتر، يجب أن تسأل مباشرة:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>ما المستوى المقصود بهذا السعر؟</li>
            <li>ما المواد الأساسية المفترضة ضمن هذا الرقم؟</li>
            <li>هل يشمل كل البنود أم بعض البنود فقط؟</li>
            <li>هل هو للتشطيب فقط أم لمشروع أوسع؟</li>
            <li>هل توجد أعمال أو استثناءات غير داخلة في الحساب؟</li>
          </ul>

          <h2 className="mt-12 text-2xl font-bold">
            هل يوجد رقم واحد صحيح لسعر متر التشطيب؟
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            لا. وهذه نقطة مهمة جدًا. لا يوجد سعر متر واحد صحيح لكل حالات
            التشطيب، لأن السوق ليس موحدًا بهذا الشكل، والمشاريع ليست متطابقة.
            حتى لو كانت المساحة متساوية، يمكن أن يختلف السعر بسبب اختلاف المواد
            أو اختلاف مستوى التفاصيل أو اختلاف النطاق الفعلي للأعمال.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لهذا السبب الأفضل دائمًا أن تتعامل مع سعر المتر على أنه{" "}
            <strong>نطاق تقريبي</strong>، وليس رقمًا نهائيًا أو قاعدة مطلقة.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            نطاقات تقريبية حسب مستوى التشطيب
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            من الناحية العملية، يمكن تقسيم التشطيب إلى مستويات رئيسية، ولكل
            مستوى نطاق تقريبي مختلف. والجدول التالي لا يمثل عرض سعر ثابت، لكنه
            يساعد على فهم الصورة بشكل مبسط:
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl border">
            <table className="w-full text-sm">
              <thead className="bg-muted/60">
                <tr>
                  <th className="p-4 text-right font-bold">مستوى التشطيب</th>
                  <th className="p-4 text-right font-bold">سعر المتر التقريبي</th>
                  <th className="p-4 text-right font-bold">الوصف العام</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-4">اقتصادي</td>
                  <td className="p-4">حوالي 1200 ريال</td>
                  <td className="p-4">
                    مناسب للميزانيات المضبوطة مع مواد عملية ومستوى بسيط ومنظم.
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="p-4">متوسط</td>
                  <td className="p-4">1400 – 1600 ريال</td>
                  <td className="p-4">
                    توازن جيد بين الجودة والمظهر والتكلفة، وهو الأكثر شيوعًا في
                    كثير من المشاريع السكنية.
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="p-4">فاخر</td>
                  <td className="p-4">1700 ريال أو أكثر</td>
                  <td className="p-4">
                    مواد أعلى جودة وتفاصيل أكثر واهتمام أكبر بالعناصر الجمالية
                    والتنفيذية.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 leading-relaxed opacity-90">
            المهم في هذا الجدول ليس الرقم بحد ذاته، بل فهم أن{" "}
            <strong>اختلاف المستوى يغيّر السعر مباشرة</strong>. لذلك لا يمكن
            مقارنة عرضين أو رقمين دون التأكد أنهما يتحدثان عن نفس المستوى تقريبًا.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            مثال تطبيقي: فيلا 300 متر
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            لنفترض أن لديك مشروع فيلا بمساحة <strong>300 متر مسطح</strong>،
            وتريد فقط تصورًا أوليًا للمبلغ المتوقع بناءً على سعر متر التشطيب.
            في هذه الحالة يمكن استخدام الحساب التالي:
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl border">
            <table className="w-full text-sm">
              <thead className="bg-muted/60">
                <tr>
                  <th className="p-4 text-right font-bold">المستوى</th>
                  <th className="p-4 text-right font-bold">سعر المتر</th>
                  <th className="p-4 text-right font-bold">التكلفة التقريبية</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-4">اقتصادي</td>
                  <td className="p-4">1200 ريال</td>
                  <td className="p-4">360,000 ريال تقريبًا</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4">متوسط</td>
                  <td className="p-4">1400 – 1600 ريال</td>
                  <td className="p-4">420,000 – 480,000 ريال تقريبًا</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4">فاخر</td>
                  <td className="p-4">1700 ريال أو أكثر</td>
                  <td className="p-4">510,000 ريال تقريبًا أو أكثر</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 leading-relaxed opacity-90">
            هذا المثال ليس عرض سعر نهائي، لكنه مفيد جدًا لبناء صورة أولية عن
            الفروق بين المستويات. وفي كثير من الأحيان، مجرد فهم هذا الفرق يوفر
            على العميل وقتًا طويلًا من المقارنات غير الدقيقة.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            ما الذي يرفع سعر متر التشطيب؟
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            هناك عوامل مباشرة تجعل سعر المتر أعلى من المتوقع. ومن أهمها:
          </p>

          <h3 className="mt-8 text-xl font-bold">1) نوعية المواد</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            كلما انتقلت من مواد أساسية إلى مواد أعلى جودة، ارتفع سعر المتر.
            ويشمل ذلك الأرضيات، والدهانات، والأبواب، والعناصر الصحية، والإضاءة،
            وكثيرًا من التفاصيل النهائية.
          </p>

          <h3 className="mt-8 text-xl font-bold">2) التفاصيل المعمارية والديكورية</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            المشروع البسيط من حيث التفاصيل يختلف عن مشروع يحتوي على أعمال جبسية
            معقدة، أو ديكورات خاصة، أو تفاصيل تنفيذ دقيقة تحتاج وقتًا ومهارة
            أعلى. هذه الأمور ترفع السعر غالبًا حتى لو كانت المساحة نفسها.
          </p>

          <h3 className="mt-8 text-xl font-bold">3) مستوى التشطيب المطلوب</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            بعض العملاء يريدون نتيجة عملية ومنظمة، بينما آخرون يبحثون عن مستوى
            أعلى من الناحية الجمالية والتفصيلية. الفرق بين هذين الخيارين ينعكس
            مباشرة على سعر المتر.
          </p>

          <h3 className="mt-8 text-xl font-bold">4) نطاق الأعمال</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            أحيانًا يكون الرقم المتداول لسعر المتر مبنيًا على تشطيب كامل، وأحيانًا
            يكون لبنود محددة فقط. لذلك أي اختلاف في نطاق العمل يجعل المقارنة
            بين الأسعار غير عادلة ما لم تكن البنود متطابقة تقريبًا.
          </p>

          <h3 className="mt-8 text-xl font-bold">5) التعديلات أثناء التنفيذ</h3>
          <p className="mt-3 leading-relaxed opacity-90">
            من أكثر الأسباب التي ترفع التكلفة النهائية: تغيير القرارات بعد بدء
            التنفيذ. كل تعديل في المواد أو المواقع أو التفاصيل قد يرفع التكلفة
            حتى لو كان سعر المتر الأولي يبدو مناسبًا.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            ما الذي يجعل سعر متر التشطيب مضللًا أحيانًا؟
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            الخطر لا يكون في السؤال عن سعر المتر نفسه، بل في الاعتماد عليه بدون
            فهم. وقد يصبح هذا الرقم مضللًا في الحالات التالية:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>إذا كان نطاق الأعمال غير واضح.</li>
            <li>إذا كانت بعض البنود غير مشمولة دون توضيح.</li>
            <li>إذا لم تُحدد المواد أو مستويات الجودة.</li>
            <li>إذا كانت هناك أعمال خاصة غير محسوبة داخل الرقم.</li>
            <li>إذا قورنت مشاريع مختلفة على أساس نفس الرقم فقط.</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            لهذا السبب، الرقم المنخفض لا يعني دائمًا عرضًا أفضل، كما أن الرقم
            الأعلى لا يعني بالضرورة مبالغة. أحيانًا يكون السعر الأعلى أوضح
            وأكثر واقعية لأنه يشمل بنودًا فعلية وموادًا أفضل ومستوى تنفيذ أدق.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            كيف تستخدم سعر المتر بطريقة صحيحة؟
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            الاستخدام الذكي لسعر المتر يكون على مرحلتين:
          </p>

          <ul className="mt-4 list-disc pr-6 space-y-2 opacity-90">
            <li>أولًا: استخدامه لتكوين تصور مبدئي عن الميزانية.</li>
            <li>ثانيًا: الانتقال بعد ذلك إلى عرض سعر تفصيلي حسب البنود.</li>
          </ul>

          <p className="mt-4 leading-relaxed opacity-90">
            بهذه الطريقة تستفيد من الرقم كأداة توجيه، لا كبديل عن الدراسة
            الفعلية. وهذا هو الأسلوب الصحيح قبل طلب التسعير النهائي أو مقارنة
            الشركات.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            ما الأفضل: الاعتماد على سعر المتر أم على عرض بنود تفصيلي؟
          </h2>
          <p className="mt-4 leading-relaxed opacity-90">
            في البداية، سعر المتر مفيد وسريع. لكنه بعد مرحلة التقدير الأولي لا
            يكفي وحده. الأفضل دائمًا عند الاقتراب من القرار هو الاعتماد على{" "}
            <strong>عرض بنود واضح</strong> يحدد المواد، والمواصفات، والاستثناءات،
            وآلية التنفيذ. بهذه الطريقة يمكن مقارنة العروض بشكل عادل ومعرفة ما
            الذي ستدفع مقابله فعلًا.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            باختصار: <strong>سعر المتر جيد كبداية، لكنه غير كافٍ كنهاية.</strong>
          </p>

          <div className="mt-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 md:p-8">
            <h2 className="text-2xl font-bold">احسب تكلفة مشروعك بشكل مبدئي</h2>
            <p className="mt-3 leading-relaxed opacity-90">
              إذا كنت تريد تصورًا أوليًا مبنيًا على مساحة مشروعك قبل الدخول في
              عرض سعر تفصيلي، يمكنك استخدام الحاسبة في الموقع. الحاسبة لا تعطي
              سعرًا نهائيًا، لكنها تساعدك على بناء فهم أولي منطقي للميزانية
              المتوقعة.
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
            سؤال <strong>سعر متر التشطيب في الرياض</strong> سؤال مهم ومفيد، لكنه
            يصبح أكثر فائدة عندما يُفهم بالشكل الصحيح. الرقم هنا ليس غاية
            بحد ذاته، بل أداة تساعدك على بناء تصور أولي للمشروع وفهم الفروق بين
            المستويات المختلفة.
          </p>

          <p className="mt-4 leading-relaxed opacity-90">
            لذلك، استخدم سعر المتر كبداية، ثم انتقل إلى التفاصيل: ما المواد؟
            ما المستوى؟ ما البنود؟ ما الاستثناءات؟ وما الذي يدخل فعليًا ضمن
            التنفيذ؟ عندها فقط تستطيع قراءة التكلفة بذكاء واتخاذ قرار أكثر
            دقة وثقة.
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
                  to="/engineering-insights/cost/turnkey-finishing-riyadh"
                  className="underline decoration-yellow-400 underline-offset-4 hover:opacity-80"
                >
                  تشطيب تسليم مفتاح بالرياض
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
                  كم سعر متر التشطيب في الرياض؟
                </AccordionTrigger>
                <AccordionContent>
                  لا يوجد رقم ثابت يصلح لجميع المشاريع، لأن سعر متر التشطيب في
                  الرياض يتغير بحسب مستوى التشطيب ونوعية المواد ونطاق الأعمال
                  والتفاصيل المعمارية.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q2">
                <AccordionTrigger>
                  هل سعر المتر يكفي لمعرفة تكلفة المشروع؟
                </AccordionTrigger>
                <AccordionContent>
                  سعر المتر يفيد في التقدير المبدئي فقط، لكنه لا يكفي وحده
                  لتحديد التكلفة النهائية، لأن التفاصيل الفعلية للمشروع قد ترفع
                  السعر أو تخفضه.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q3">
                <AccordionTrigger>
                  ما الفرق بين التشطيب الاقتصادي والمتوسط والفاخر؟
                </AccordionTrigger>
                <AccordionContent>
                  الفرق يكون في نوعية المواد، مستوى التفاصيل، جودة العناصر
                  النهائية، وتعقيد التنفيذ. كلما ارتفع المستوى ارتفعت التكلفة
                  غالبًا.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q4">
                <AccordionTrigger>
                  كيف أحسب تكلفة فيلا 300 متر بشكل أولي؟
                </AccordionTrigger>
                <AccordionContent>
                  يمكن حساب تصور أولي عبر ضرب المساحة في نطاق سعري تقريبي مناسب
                  للمستوى المطلوب، ثم مراجعة البنود الفعلية للحصول على صورة أقرب
                  للواقع.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q5">
                <AccordionTrigger>
                  ما الذي يجعل سعر متر التشطيب مضللًا أحيانًا؟
                </AccordionTrigger>
                <AccordionContent>
                  قد يكون السعر مضللًا إذا لم يكن نطاق العمل واضحًا، أو إذا كانت
                  بعض البنود مستثناة، أو كانت المواد المحددة أقل من توقع العميل.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </article>
      </div>
    </main>
  );
}