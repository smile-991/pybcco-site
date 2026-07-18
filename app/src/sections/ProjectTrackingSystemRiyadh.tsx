import SeoHead from "@/components/SeoHead"
import RelatedVideoSection from "@/components/video/RelatedVideoSection"
import { Button } from "@/components/ui/button"
import {
  getVideoBySlug,
  getYoutubeEmbedUrl,
} from "@/data/videos"
import { Link } from "react-router-dom"

const SITE = "https://pybcco.com"

const trackingVideo = (() => {
  const video = getVideoBySlug("project-tracking-system")

  if (!video) {
    throw new Error("تعذر العثور على فيديو نظام متابعة المشاريع.")
  }

  return video
})()

export default function ProjectTrackingSystemRiyadh() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "نظام متابعة مشاريع البناء والتشطيب في الرياض",
    serviceType: "متابعة وإدارة مشاريع البناء والتشطيب والترميم عبر منصة رقمية",
    provider: {
      "@type": "ConstructionCompany",
      name: "PYBCCO",
      url: SITE,
    },
    areaServed: {
      "@type": "City",
      name: "الرياض",
    },
    description:
      "منصة متابعة رقمية متكاملة لعملاء PYBCCO في الرياض تتيح متابعة نسبة الإنجاز، مراجعة الدفعات، تحميل العقود والوثائق، والاطلاع على التحديثات الميدانية بالصور بكل شفافية وتنظيم.",
    url: `${SITE}/project-tracking-system-riyadh`,
  }

  const videoPageUrl = `${SITE}/videos/${trackingVideo.slug}`

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${videoPageUrl}#video`,
    name: trackingVideo.title,
    description: trackingVideo.description,
    thumbnailUrl: [`${SITE}${trackingVideo.cover}`],
    uploadDate: trackingVideo.uploadDate,
    duration: trackingVideo.duration,
    embedUrl: getYoutubeEmbedUrl(trackingVideo.youtubeId),
    url: videoPageUrl,
    inLanguage: "ar",
    isFamilyFriendly: true,
    keywords: trackingVideo.keywords.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE}/project-tracking-system-riyadh`,
    },
    publisher: {
      "@id": `${SITE}/#organization`,
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "هل النظام آمن؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، لكل عميل حساب خاص ومغلق بالكامل ولا يمكن لأي طرف آخر الاطلاع على بيانات مشروعك.",
        },
      },
      {
        "@type": "Question",
        name: "هل يمكن للعميل تعديل البيانات؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "النظام مخصص للعرض والمتابعة فقط حفاظًا على دقة التوثيق وحفظ الحقوق، بينما تتم التحديثات من إدارة المشروع.",
        },
      },
      {
        "@type": "Question",
        name: "هل يمكن تحميل نسخة العقد والوثائق؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، يتم رفع العقد والوثائق الرسمية داخل الحساب ليتمكن العميل من تحميلها في أي وقت.",
        },
      },
      {
        "@type": "Question",
        name: "هل تظهر الدفعات بشكل واضح؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، يظهر سجل تفصيلي للدفعات يتضمن المبلغ والتاريخ والملاحظات، إضافةً إلى إجمالي المدفوع والمتبقي.",
        },
      },
      {
        "@type": "Question",
        name: "ماذا يحدث بعد انتهاء المشروع؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يبقى المشروع مؤرشفًا داخل الحساب ويمكن الرجوع إليه لاحقًا للاطلاع على الوثائق والتحديثات.",
        },
      },
      {
        "@type": "Question",
        name: "متى يتم تحديث نسبة الإنجاز والتحديثات؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يتم تحديث نسبة الإنجاز والتحديثات الميدانية من إدارة المشروع بشكل دوري وفق مراحل التنفيذ، مع توثيق التحديثات بالصور عند توفرها.",
        },
      },
    ],
  }

  return (
    <>
      <SeoHead
        title="نظام متابعة مشاريع البناء والتشطيب في الرياض | PYBCCO"
        description="منصة متابعة رقمية متكاملة لعملاء PYBCCO في الرياض: نسبة الإنجاز، الدفعات، العقود والوثائق PDF، وتحديثات ميدانية بالصور — بكل شفافية وتنظيم."
        canonical={`${SITE}/project-tracking-system-riyadh`}
        jsonLd={[serviceSchema, videoSchema, faqSchema]}
      />

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          نظام متابعة مشاريع البناء والتشطيب في الرياض | منصة رقمية متكاملة لعملاء PYBCCO
        </h1>

        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-10">
          في PYBCCO لا نعتبر تنفيذ المشروع هو المرحلة الأهم فقط، بل نؤمن أن وضوح المعلومات والشفافية الكاملة أثناء التنفيذ لا تقل أهمية عن جودة العمل نفسه.
          يعاني كثير من العملاء من عدم وضوح مراحل التنفيذ أو صعوبة متابعة تفاصيل الدفعات والعقود، لذلك قمنا بتطوير نظام متابعة رقمي متكامل يتيح لك متابعة
          مشروعك خطوة بخطوة — بكل شفافية وتنظيم واحترافية.
        </p>

        <div className="text-center mb-16">
          <Link to="/portal">
            <Button className="px-8 py-6 text-lg">🔐 دخول العملاء</Button>
          </Link>

          {/* ✅ الصورة تحت زر دخول العملاء */}
          <div className="mt-12 flex justify-center">
            <img
              src="/images/example.webp"
              alt="واجهة نظام متابعة المشاريع - PYBCCO"
              className="rounded-2xl shadow-2xl border border-gray-200 max-w-5xl w-full"
              loading="lazy"
            />
          </div>
        </div>

        <RelatedVideoSection
          video={trackingVideo}
          heading="شاهد كيف يتابع عميل PYBCCO مشروعه خطوة بخطوة"
          description="فيديو مختصر يوضح فكرة نظام متابعة المشاريع وكيف يجمع نسبة الإنجاز والصور والتقارير والدفعات والوثائق داخل تجربة رقمية منظمة للعميل."
        />

        <h2 className="text-2xl font-semibold mb-6">لماذا أطلقنا نظام المتابعة الرقمي؟</h2>

        <p className="text-gray-700 leading-8 mb-4">
          قطاع المقاولات في الرياض يشهد نمواً كبيراً، لكن ما زال يعاني من ضعف التوثيق وسوء تنظيم المعلومات في بعض الحالات. لذلك قررنا أن يكون نظام المتابعة
          جزءاً أساسياً من طريقة عملنا، وليس مجرد إضافة تجميلية.
        </p>

        <ul className="space-y-3 text-gray-700 mb-12">
          <li>• توثيق جميع مراحل تنفيذ أعمال البناء أو التشطيب أو الترميم</li>
          <li>• توضيح نسبة الإنجاز الفعلية بشكل مستمر</li>
          <li>• تنظيم الدفعات المالية بطريقة دقيقة وواضحة</li>
          <li>• حفظ العقود والوثائق الرسمية داخل حساب آمن خاص بك</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-6">ماذا يمكنك متابعته داخل النظام؟</h2>

        <p className="text-gray-700 leading-8 mb-6">
          عند توقيع العقد وإنشاء حسابك الخاص، يمكنك متابعة كل ما يخص مشروعك بطريقة واضحة ومنظمة:
        </p>

        <ul className="space-y-4 text-gray-700 mb-12">
          <li>• نسبة الإنجاز الفعلية لأعمال البناء أو التشطيب أو الترميم</li>
          <li>• إجمالي قيمة العقد والمبالغ المدفوعة والمتبقية</li>
          <li>• سجل تفصيلي لجميع الدفعات (المبلغ – التاريخ – الملاحظات)</li>
          <li>• تحميل نسخة العقد التنفيذي والوثائق الرسمية بصيغة PDF</li>
          <li>• الاطلاع على تحديثات ميدانية موثقة بالصور</li>
          <li>• أرشفة المشروع بالكامل بعد التسليم للرجوع إليه لاحقًا</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-6">كيف يعمل النظام؟</h2>

        <ol className="space-y-4 text-gray-700 mb-10">
          <li>1. بعد توقيع العقد يتم إنشاء حساب خاص باسمك</li>
          <li>2. يتم تزويدك ببيانات الدخول الآمنة</li>
          <li>3. يمكنك الدخول من أي مكان ومتابعة مشروعك بسهولة</li>
          <li>4. يتم تحديث البيانات مباشرة من إدارة المشروع وفق مراحل التنفيذ</li>
        </ol>

        <p className="text-gray-700 leading-8 mb-12">
          النظام مخصص للعرض والمتابعة فقط لضمان دقة التوثيق وحفظ الحقوق، بينما تتم جميع التحديثات من فريق الإدارة المختص.
        </p>

        <h2 className="text-2xl font-semibold mb-6">لمن يناسب هذا النظام؟</h2>

        <ul className="space-y-3 text-gray-700 mb-12">
          <li>• أصحاب الفلل الجديدة في مرحلة البناء</li>
          <li>• مشاريع تشطيب الفلل السكنية</li>
          <li>• أعمال ترميم الفلل والمنازل</li>
          <li>• العملاء الذين يرغبون في متابعة المشروع عن بُعد</li>
          <li>• المستثمرون الذين يحتاجون توثيقًا ماليًا وتنفيذيًا منظمًا</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-6">الأمان والخصوصية</h2>

        <p className="text-gray-700 leading-8 mb-6">
          لكل عميل حساب خاص ومغلق بالكامل، ولا يمكن لأي طرف آخر الاطلاع على بيانات مشروعك. يتم حفظ المعلومات بشكل منظم، مع توثيق مستمر لكل تحديث، مما يضمن أعلى
          درجات الشفافية والتنظيم.
        </p>

        <p className="text-gray-700 leading-8 mb-12">
          هدفنا أن تشعر بالاطمئنان الكامل أثناء تنفيذ مشروعك، وأن تعرف بدقة أين وصلت الأعمال، وما تم دفعه، وما هو المتبقي — دون الحاجة للاتصال المتكرر أو البحث
          عن التفاصيل.
        </p>

        <h2 className="text-2xl font-semibold mb-6">نظام متابعة يعكس احترافية التنفيذ</h2>

        <p className="text-gray-700 leading-8 mb-10">
          نحن في PYBCCO نؤمن أن المشروع الناجح لا يعتمد فقط على جودة التنفيذ، بل على وضوح الإدارة والتنظيم. لذلك أصبحت جميع مشاريعنا في الرياض تُدار عبر نظام متابعة
          رقمي احترافي يعكس مستوى الجدية والتنظيم الذي نعمل به.
        </p>

        <div className="text-center mt-6">
          <p className="text-gray-700 mb-4">
            إذا كنت أحد عملائنا الحاليين يمكنك الدخول إلى حسابك ومتابعة مشروعك الآن. وإذا كنت تفكر في تنفيذ مشروع بناء أو تشطيب، فإن هذا النظام سيكون جزءاً
            أساسياً من تجربتك معنا.
          </p>

          <Link to="/portal">
            <Button className="px-8 py-6 text-lg">🔐 دخول العملاء</Button>
          </Link>
        </div>
      </section>
    </>
  )
}