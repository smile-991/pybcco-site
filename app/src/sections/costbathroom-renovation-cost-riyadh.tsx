import SeoHead from "@/components/SeoHead";
import RelatedVideoSection from "@/components/video/RelatedVideoSection";
import {
  getVideoBySlug,
  getYoutubeEmbedUrl,
  type VideoItem,
} from "@/data/videos";
import { Link } from "react-router-dom";

const SITE_URL = "https://pybcco.com";

function requireVideo(slug: string): VideoItem {
  const video = getVideoBySlug(slug);

  if (!video) {
    throw new Error(`تعذر العثور على الفيديو: ${slug}`);
  }

  return video;
}

const luxuryBathroomVideo = requireVideo(
  "luxury-bathroom-finishing",
);

const canonical =
  "https://pybcco.com/engineering-insights/cost/bathroom-renovation-cost-riyadh";

const BEFORE_IMAGE = `${SITE_URL}/images/bathroom-renovation.webp`;
const AFTER_IMAGE = `${SITE_URL}/images/bathroom.webp`;
const ARTICLE_IMAGE = AFTER_IMAGE;

const whatsappText =
  "السلام عليكم، أريد تسعير ترميم حمام في الرياض";
const whatsappUrl = `https://wa.me/966550604837?text=${encodeURIComponent(
  whatsappText
)}`;

export default function BathroomRenovationCostRiyadh() {
  const title =
    "تكلفة ترميم حمام بالرياض 2026 | من 6,000 إلى 11,000 ريال";

  const description =
    "دليل تكلفة ترميم حمام كامل في الرياض 2026: متوسط السعر، بنود التكسير والسباكة والعزل والبلاط والأدوات الصحية، مع صور وأمثلة وروابط للحصول على تسعير مباشر.";

  const datePublished = "2026-03-06";
  const dateModified = "2026-06-30";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "كم تكلفة ترميم حمام كامل في الرياض؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "تتراوح تكلفة ترميم حمام كامل في الرياض غالبًا بين 6,000 و11,000 ريال للحمام القياسي، وقد تزيد أو تنقص حسب المساحة، حالة السباكة، نوع العزل، جودة البلاط، والأدوات الصحية المختارة.",
        },
      },
      {
        "@type": "Question",
        name: "هل تكلفة ترميم الحمام تشمل المواد؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "يمكن أن يكون السعر شامل المواد والتنفيذ إذا تم الاتفاق على ذلك بوضوح. يجب تحديد نوع البلاط، الأدوات الصحية، الخلاطات، العزل، أعمال الكهرباء، وترحيل المخلفات قبل اعتماد العرض.",
        },
      },
      {
        "@type": "Question",
        name: "كم يستغرق ترميم الحمام؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "غالبًا يستغرق ترميم الحمام من 5 إلى 10 أيام عمل حسب حجم التكسير، حالة السباكة، مدة اختبار العزل، توفر البلاط والأدوات الصحية، وحجم التعديلات المطلوبة.",
        },
      },
      {
        "@type": "Question",
        name: "هل يجب تغيير السباكة بالكامل عند ترميم الحمام؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "ليس دائمًا، لكن في الحمامات القديمة يفضل فحص التمديدات جيدًا قبل تركيب البلاط، لأن إصلاح السباكة بعد الإغلاق يكون أعلى تكلفة وأكثر إزعاجًا.",
        },
      },
      {
        "@type": "Question",
        name: "ما أكثر شيء يرفع تكلفة ترميم الحمام؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "أكثر ما يرفع التكلفة هو تغيير مواقع الكرسي أو المغسلة أو الدش، استبدال السباكة بالكامل، اختيار بورسلان أو أدوات صحية مرتفعة السعر، إضافة شاور بوكس، أو اكتشاف مشاكل عزل وتهريب بعد التكسير.",
        },
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: canonical,
    image: [ARTICLE_IMAGE, BEFORE_IMAGE],
    datePublished,
    dateModified,
    inLanguage: "ar-SA",
    author: {
      "@type": "Organization",
      name: "بنيان الهرم للمقاولات",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "بنيان الهرم للمقاولات",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.webp`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
  };

  const videoPageUrl = `${SITE_URL}/videos/${luxuryBathroomVideo.slug}`;

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${videoPageUrl}#video`,
    name: luxuryBathroomVideo.title,
    description: luxuryBathroomVideo.description,
    thumbnailUrl: [`${SITE_URL}${luxuryBathroomVideo.cover}`],
    uploadDate: luxuryBathroomVideo.uploadDate,
    duration: luxuryBathroomVideo.duration,
    embedUrl: getYoutubeEmbedUrl(luxuryBathroomVideo.youtubeId),
    url: videoPageUrl,
    inLanguage: "ar",
    isFamilyFriendly: true,
    keywords: luxuryBathroomVideo.keywords.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "الرؤى الهندسية",
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
        name: "تكلفة ترميم حمام كامل بالرياض",
        item: canonical,
      },
    ],
  };

  const pricePackages = [
    {
      type: "ترميم حمام اقتصادي",
      range: "6,000 – 8,000 ريال",
      note:
        "مناسب للحمام الصغير أو القياسي مع بلاط وأدوات صحية عملية، ودون تغييرات كبيرة في المواقع.",
    },
    {
      type: "ترميم حمام متوسط",
      range: "8,000 – 11,000 ريال",
      note:
        "يشمل غالبًا تكسير، سباكة، عزل، بلاط بجودة جيدة، أدوات صحية مناسبة، وتشطيب أوضح.",
    },
    {
      type: "ترميم حمام بمواصفات أعلى",
      range: "11,000 – 18,000+ ريال",
      note:
        "حسب نوع البلاط، الشاور بوكس، النيشات، الخلاطات، الإضاءة، وتغيير مواقع السباكة.",
    },
    {
      type: "تعديل جزئي فقط",
      range: "حسب المعاينة",
      note:
        "مثل تغيير كرسي أو مغسلة أو خلاط أو معالجة تهريب محدود، ولا يُحسب مثل ترميم الحمام الكامل.",
    },
  ];

  const includedItems = [
    [
      "التكسير والإزالة",
      "إزالة البلاط القديم، فك الأدوات الصحية، وترحيل المخلفات حسب الاتفاق.",
    ],
    [
      "أعمال السباكة",
      "تعديل أو استبدال تمديدات التغذية والصرف حسب حالة الحمام القديمة.",
    ],
    [
      "العزل المائي",
      "عزل الأرضية ومناطق الرطوبة مع اختبار العزل قبل تركيب البلاط.",
    ],
    [
      "البلاط والسيراميك",
      "توريد وتركيب بلاط الأرضيات والجدران حسب النوع والمقاس المختار.",
    ],
    [
      "الأدوات الصحية",
      "كرسي، مغسلة، خلاطات، شطاف، إكسسوارات، حسب مستوى المواصفات.",
    ],
    [
      "الكهرباء والإنارة",
      "تعديل نقاط الكهرباء أو الإضاءة أو مروحة الشفط حسب الحاجة.",
    ],
  ];

  const costRows = [
    ["تكسير وإزالة وترحيل", "800 – 1,200 ريال"],
    ["سباكة وتعديل تمديدات", "1,500 – 2,500 ريال"],
    ["عزل مائي واختبار", "600 – 900 ريال"],
    ["بلاط وتركيب", "2,000 – 3,500 ريال"],
    ["أدوات صحية وخلاطات", "1,500 – 3,000 ريال"],
    ["كهرباء وإضاءة وشفاط", "400 – 900 ريال"],
  ];

  const costFactors = [
    {
      title: "حالة السباكة القديمة",
      text:
        "إذا كانت التمديدات قديمة أو يوجد تهريب أو ضعف تصريف، قد تحتاج إلى استبدال كامل بدل تعديل بسيط، وهذا يرفع التكلفة.",
    },
    {
      title: "تغيير مواقع الأدوات الصحية",
      text:
        "نقل مكان الكرسي أو المغسلة أو الدش يحتاج تعديل صرف وتغذية وقد يضيف تكلفة ووقتًا أكبر.",
    },
    {
      title: "نوع البلاط ومقاسه",
      text:
        "البورسلان الكبير أو البلاط الذي يحتاج قصّات كثيرة أو تركيب دقيق يكون أعلى تكلفة من السيراميك القياسي.",
    },
    {
      title: "العزل ومعالجة التهريب",
      text:
        "وجود مشاكل رطوبة أو تهريب قديم يحتاج معالجة قبل الإغلاق، ولا يصح تركيب البلاط قبل اختبار العزل.",
    },
    {
      title: "الأدوات الصحية والخلاطات",
      text:
        "فرق السعر بين الأدوات الاقتصادية والمتوسطة والفاخرة كبير، لذلك يجب تحديد مستوى المواصفات قبل التسعير.",
    },
    {
      title: "الشاور بوكس والنيشات والإضاءة",
      text:
        "إضافة شاور زجاج، نيشات داخل الجدار، مرايا بإضاءة، أو إضاءة مخفية يرفع التكلفة حسب التفاصيل.",
    },
  ];

  const comparisonTips = [
    "لا تقارن عرضين إلا إذا كانا يشملان نفس البنود.",
    "تأكد هل ترحيل المخلفات داخل السعر أم لا.",
    "اسأل هل العزل مع اختبار مائي مشمول.",
    "حدد نوع البلاط ومقاسه قبل اعتماد السعر.",
    "افصل سعر الأدوات الصحية عن سعر العمالة إذا كانت المواصفات غير محددة.",
    "لا تعتمد على سعر منخفض إذا لم يوضح السباكة والعزل والبلاط.",
  ];

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      <SeoHead
        title={title}
        description={description}
        canonical={canonical}
        ogImage="/images/bathroom.webp"
        robots="index,follow,max-image-preview:large,max-video-preview:-1"
        jsonLd={[
          articleSchema,
          videoSchema,
          breadcrumbSchema,
          faqSchema,
        ]}
      />

      <main className="container mx-auto max-w-5xl px-4 py-20 text-right">
        <div className="mb-6 flex flex-wrap gap-3">
          <Link
            to="/building-and-finishing-prices-riyadh"
            className="rounded-full border border-gold/40 px-4 py-2 text-sm font-bold text-gold hover:bg-gold hover:text-black"
          >
            ← العودة إلى دليل الأسعار
          </Link>

          <Link
            to="/home-renovation-company-riyadh"
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white/80 hover:bg-white/10"
          >
            ترميم منازل بالرياض
          </Link>
        </div>

        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <div className="absolute inset-0">
            <img
              src="/images/bathroom.webp"
              alt=""
              className="h-full w-full object-cover opacity-25"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black via-black/85 to-black/55" />
          </div>

          <div className="relative z-10 px-5 py-10 md:px-10 md:py-14">
            <p className="inline-flex rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-bold text-gold">
              تقرير تكلفة — ترميم حمامات داخل الرياض
            </p>

            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-gold md:text-5xl">
              تكلفة ترميم حمام بالرياض 2026
            </h1>

            <p className="mt-4 max-w-3xl text-xl font-bold leading-9 text-white">
              السعر والبنود من أول نظرة: تكسير، سباكة، عزل، بلاط، أدوات صحية،
              كهرباء وتشطيب.
            </p>

            <p className="mt-3 text-sm text-white/55">آخر تحديث: يونيو 2026</p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-gold/25 bg-black/55 p-5">
                <div className="text-sm font-bold text-white/60">
                  حمام قياسي
                </div>
                <div className="mt-2 text-3xl font-black text-gold">
                  6,000 – 11,000
                </div>
                <div className="mt-1 text-sm text-white/70">ريال تقريبًا</div>
              </div>

              <div className="rounded-2xl border border-gold/25 bg-black/55 p-5">
                <div className="text-sm font-bold text-white/60">
                  مدة التنفيذ
                </div>
                <div className="mt-2 text-3xl font-black text-gold">
                  5 – 10
                </div>
                <div className="mt-1 text-sm text-white/70">أيام عمل غالبًا</div>
              </div>

              <div className="rounded-2xl border border-gold/25 bg-black/55 p-5">
                <div className="text-sm font-bold text-white/60">
                  السعر الأدق
                </div>
                <div className="mt-2 text-3xl font-black text-gold">
                  بالصور
                </div>
                <div className="mt-1 text-sm text-white/70">
                  أرسل صور الحمام واتساب
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center rounded-xl bg-gold px-7 py-4 text-base font-extrabold text-black"
              >
                احصل على تسعير مباشر واتساب
              </a>

              <a
                href="#price-table"
                className="inline-flex justify-center rounded-xl border border-white/20 bg-white/10 px-7 py-4 text-base font-bold text-white hover:bg-white/15"
              >
                شاهد جدول التكلفة
              </a>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-gold/25 bg-gold/10 p-6">
          <h2 className="text-2xl font-extrabold text-gold">
            الخلاصة السريعة
          </h2>

          <p className="mt-4 leading-8 text-white/80">
            تكلفة ترميم حمام كامل في الرياض للحمام القياسي تكون غالبًا بين
            <strong className="text-white"> 6,000 و11,000 ريال</strong>، وقد
            تزيد إذا كانت السباكة تحتاج تغيير كامل، أو كان البلاط والأدوات
            الصحية بمستوى أعلى، أو تم تغيير أماكن الكرسي والمغسلة والدش.
          </p>

          <p className="mt-3 leading-8 text-white/70">
            هذه الأرقام تقديرية وليست عرض سعر نهائي. السعر الحقيقي يعتمد على
            مساحة الحمام، حالة التمديدات، نوع العزل، نوع البلاط، ومستوى الأدوات
            الصحية.
          </p>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <h2 className="text-2xl font-extrabold text-gold">
                أمثلة لتشطيب حمامات بعد الترميم
              </h2>
              <p className="mt-2 leading-8 text-white/70">
                الصور تساعد العميل على فهم الفرق بين مستوى اقتصادي أو متوسط أو
                أعلى، لأن تكلفة ترميم الحمام تتغير كثيرًا حسب تفاصيل التشطيب.
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-xl bg-gold px-5 py-3 text-center font-extrabold text-black"
            >
              أرسل صور حمامك للتسعير
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <figure className="overflow-hidden rounded-2xl border border-white/10 bg-black">
              <div className="relative">
                <img
                  src="/images/bathroom-renovation.webp"
                  alt="تصميم حمام بعد الترميم مع بلاط حديث ومغسلة ومرآة بإضاءة"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <span className="absolute right-3 top-3 rounded-full bg-black/70 px-4 py-2 text-sm font-extrabold text-white">
                  نموذج تشطيب
                </span>
              </div>
              <figcaption className="px-4 py-3 text-sm leading-7 text-white/60">
                مثال لتشطيب حمام حديث مع بلاط وأدوات صحية وإضاءة مناسبة.
              </figcaption>
            </figure>

            <figure className="overflow-hidden rounded-2xl border border-gold/30 bg-black">
              <div className="relative">
                <img
                  src="/images/bathroom.webp"
                  alt="حمام حديث بعد الترميم مع شاور زجاج وبلاط رمادي وإضاءة سقفية"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <span className="absolute right-3 top-3 rounded-full bg-gold px-4 py-2 text-sm font-extrabold text-black">
                  تشطيب أعلى
                </span>
              </div>
              <figcaption className="px-4 py-3 text-sm leading-7 text-white/60">
                إضافة شاور زجاج، نيشات، وإضاءة خاصة قد ترفع التكلفة حسب
                المواصفات.
              </figcaption>
            </figure>
          </div>
        </section>

        <RelatedVideoSection
          video={luxuryBathroomVideo}
          heading="شاهد نموذج تشطيب حمام فاخر بعد التنفيذ"
          description="فيديو مختصر يعرض مستوى تشطيب حمام فاخر من حيث البلاط والأدوات الصحية والإضاءة والتفاصيل النهائية، ويوضح كيف تؤثر المواصفات المختارة على النتيجة والتكلفة."
        />

        <section id="price-table">
          <h2 className="mt-12 text-2xl font-bold text-gold md:text-3xl">
            جدول تكلفة ترميم حمام في الرياض حسب مستوى التشطيب
          </h2>

          <p className="mt-4 leading-8 text-white/75">
            هذا الجدول يعطيك نطاقًا سريعًا قبل طلب المعاينة. إذا كان الحمام
            قديمًا أو فيه تهريب أو تغيير مواقع، فالسعر قد يتغير بعد الكشف.
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-right text-sm md:text-base">
              <thead className="bg-white/10 text-white">
                <tr>
                  <th className="p-4">نوع العمل</th>
                  <th className="p-4">التكلفة التقريبية</th>
                  <th className="p-4">ملاحظة</th>
                </tr>
              </thead>
              <tbody>
                {pricePackages.map((row) => (
                  <tr key={row.type} className="border-t border-white/10">
                    <td className="p-4 font-bold text-white">{row.type}</td>
                    <td className="p-4 font-extrabold text-gold">
                      {row.range}
                    </td>
                    <td className="p-4 leading-7 text-white/70">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <h2 className="mt-12 text-2xl font-bold text-gold md:text-3xl">
          ماذا تشمل تكلفة ترميم الحمام؟
        </h2>

        <p className="mt-4 leading-8 text-white/75">
          عند مقارنة أسعار ترميم الحمامات في الرياض، لا تنظر إلى الرقم فقط.
          الأهم معرفة البنود الداخلة في السعر، لأن عرضًا منخفضًا قد لا يشمل
          العزل أو ترحيل المخلفات أو الأدوات الصحية.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {includedItems.map(([head, text]) => (
            <div
              key={head}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <h3 className="text-lg font-bold text-white">{head}</h3>
              <p className="mt-2 leading-7 text-white/70">{text}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold text-gold md:text-3xl">
          مثال تقديري لحمام 2 × 3 متر
        </h2>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-right text-sm md:text-base">
            <tbody>
              {costRows.map(([item, price]) => (
                <tr key={item} className="border-b border-white/10">
                  <td className="p-4 text-white/75">{item}</td>
                  <td className="p-4 font-bold text-white">{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-gold md:text-3xl">
          ما الذي يرفع تكلفة ترميم الحمام؟
        </h2>

        <div className="mt-6 grid gap-4">
          {costFactors.map((factor, index) => (
            <section
              key={factor.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <h3 className="text-xl font-extrabold text-white">
                {index + 1}) {factor.title}
              </h3>
              <p className="mt-3 leading-8 text-white/75">{factor.text}</p>
            </section>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold text-gold md:text-3xl">
          كيف تقارن بين عروض ترميم الحمام؟
        </h2>

        <ul className="mt-5 space-y-3 leading-8 text-white/80">
          {comparisonTips.map((item) => (
            <li key={item}>✔️ {item}</li>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <h2 className="text-2xl font-bold text-gold">
            تريد سعرًا أدق لحمامك؟
          </h2>

          <p className="mt-4 leading-8 text-white/80">
            أرسل لنا صور الحمام والمقاسات التقريبية عبر واتساب، أو اطلب معاينة
            داخل الرياض ليتم تجهيز عرض سعر واضح حسب الحالة الفعلية.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center rounded-lg bg-gold px-6 py-3 font-extrabold text-black"
            >
              تواصل واتساب
            </a>

            <a
              href="/#contact"
              className="inline-flex justify-center rounded-lg border border-white/15 bg-white/10 px-6 py-3 font-bold text-white"
            >
              طلب معاينة
            </a>

            <Link
              to="/building-and-finishing-prices-riyadh"
              className="inline-flex justify-center rounded-lg border border-gold/40 px-6 py-3 font-bold text-gold hover:bg-gold hover:text-black"
            >
              شاهد دليل الأسعار
            </Link>
          </div>
        </div>

        <section className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold text-gold">الأسئلة الشائعة</h2>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="font-extrabold text-white">
                كم تكلفة ترميم حمام كامل في الرياض؟
              </h3>
              <p className="mt-2 leading-8 text-white/75">
                غالبًا بين 6,000 و11,000 ريال للحمام القياسي، وقد تزيد حسب
                المواد والمساحة وحالة السباكة والعزل.
              </p>
            </div>

            <div>
              <h3 className="font-extrabold text-white">
                هل السعر شامل المواد؟
              </h3>
              <p className="mt-2 leading-8 text-white/75">
                يمكن أن يكون شاملًا للمواد والتنفيذ إذا تم تحديد المواصفات
                بوضوح داخل عرض السعر.
              </p>
            </div>

            <div>
              <h3 className="font-extrabold text-white">
                كم مدة ترميم الحمام؟
              </h3>
              <p className="mt-2 leading-8 text-white/75">
                غالبًا من 5 إلى 10 أيام عمل حسب حجم الأعمال وتجهيز المواد ومدة
                اختبار العزل.
              </p>
            </div>

            <div>
              <h3 className="font-extrabold text-white">
                هل يجب تغيير السباكة بالكامل؟
              </h3>
              <p className="mt-2 leading-8 text-white/75">
                لا يلزم دائمًا، لكن في الحمامات القديمة يفضل فحص التمديدات قبل
                تركيب البلاط.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 border-t border-white/10 pt-8">
          <h2 className="text-2xl font-bold text-gold">
            صفحات مرتبطة قد تفيدك
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <Link
              to="/building-and-finishing-prices-riyadh"
              className="rounded-xl border border-white/10 bg-white/5 p-4 font-bold text-white hover:border-gold/40"
            >
              دليل أسعار البناء والتشطيب
            </Link>

            <Link
              to="/villa-renovation-riyadh"
              className="rounded-xl border border-white/10 bg-white/5 p-4 font-bold text-white hover:border-gold/40"
            >
              ترميم فلل بالرياض
            </Link>

            <Link
              to="/home-renovation-company-riyadh"
              className="rounded-xl border border-white/10 bg-white/5 p-4 font-bold text-white hover:border-gold/40"
            >
              مقاول ترميم منازل بالرياض
            </Link>

            <Link
              to="/engineering-insights/common-mistakes/plumbing-mistakes-before-closing-walls"
              className="rounded-xl border border-white/10 bg-white/5 p-4 font-bold text-white hover:border-gold/40"
            >
              أخطاء السباكة قبل إغلاق الجدران
            </Link>

            <Link
              to="/engineering-insights/cost/how-to-compare-finishing-quotations"
              className="rounded-xl border border-white/10 bg-white/5 p-4 font-bold text-white hover:border-gold/40"
            >
              كيف تقارن عروض التشطيب والترميم؟
            </Link>

            <Link
              to="/villa-finishing-price-riyadh"
              className="rounded-xl border border-white/10 bg-white/5 p-4 font-bold text-white hover:border-gold/40"
            >
              حاسبة تكلفة التشطيب
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}