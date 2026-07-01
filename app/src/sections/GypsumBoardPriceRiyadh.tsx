import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";

const SITE_URL = "https://pybcco.com";

const canonical =
  "https://pybcco.com/engineering-insights/cost/gypsum-board-price-riyadh";

const BEFORE_IMAGE = `${SITE_URL}/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-05.webp`;
const AFTER_IMAGE = `${SITE_URL}/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-08.webp`;
const ARTICLE_IMAGE = AFTER_IMAGE;

const whatsappText =
  "السلام عليكم، أريد تسعير جبس بورد لمشروع في الرياض";
const whatsappUrl = `https://wa.me/966550604837?text=${encodeURIComponent(
  whatsappText
)}`;

export default function GypsumBoardPriceRiyadh() {
  const title =
    "سعر متر الجبس بورد بالرياض 2026 | شامل المواد والتركيب";

  const description =
    "جدول سعر متر الجبس بورد في الرياض 2026 حسب نوع السقف: مستوي، مقاوم رطوبة، إنارة مخفية وديكورات. تعرف على ما يشمله السعر وكيف تحصل على تسعير مباشر.";

  const datePublished = "2026-03-06";
  const dateModified = "2026-06-30";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "كم سعر متر الجبس بورد في الرياض؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "يختلف سعر متر الجبس بورد في الرياض حسب نوع التصميم والمساحة. السقف المستوي البسيط قد يكون غالبًا في حدود 45 إلى 70 ريال للمتر، والجبس مع إنارة مخفية أو تفاصيل متوسطة قد يكون في حدود 70 إلى 130 ريال، أما الديكورات الكثيفة أو متعددة المستويات فقد تتجاوز ذلك حسب التصميم والمعاينة.",
        },
      },
      {
        "@type": "Question",
        name: "هل سعر الجبس بورد يشمل المواد والتركيب؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "في أغلب عروض الجبس بورد يكون السعر شامل الهيكل المعدني، ألواح الجبس، المسامير، معالجة الفواصل، الزوايا، والمعجون الأساسي. لكن يجب التأكد هل الدهان النهائي، الإنارة، السبوتات، وتمديدات الكهرباء مشمولة أم لا.",
        },
      },
      {
        "@type": "Question",
        name: "هل الدهان مشمول في سعر متر الجبس بورد؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "غالبًا سعر الجبس بورد يشمل تجهيز السطح ومعالجة الفواصل، ولا يشمل الدهان النهائي إلا إذا ذُكر صراحة في عرض السعر. لذلك يفضل فصل بند الجبس عن بند الدهان عند مقارنة العروض.",
        },
      },
      {
        "@type": "Question",
        name: "ما الفرق بين الجبس المستوي والجبس الديكوري في السعر؟",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "الجبس المستوي أبسط في التنفيذ وأقل تكلفة، أما الجبس الديكوري أو متعدد المستويات فيحتاج قص وتشكيل وزوايا وإنارة مخفية ووقت تنفيذ أطول، لذلك يكون سعره أعلى.",
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
        name: "سعر متر الجبس بورد بالرياض",
        item: canonical,
      },
    ],
  };

  const priceRows = [
    {
      type: "سقف جبس بورد مستوٍ بسيط",
      range: "45 – 70 ريال / م²",
      note: "للأسقف المستوية بدون تفاصيل كثيرة. يتأثر السعر بالمساحة وارتفاع السقف.",
    },
    {
      type: "جبس بورد مقاوم للرطوبة",
      range: "55 – 85 ريال / م²",
      note: "يستخدم غالبًا في دورات المياه والمطابخ والمناطق المعرضة للرطوبة.",
    },
    {
      type: "جبس بورد مع فتحات سبوتات",
      range: "65 – 100 ريال / م²",
      note: "يرتفع السعر حسب عدد الفتحات ودقة توزيع الإنارة وتجهيز النقاط.",
    },
    {
      type: "جبس بورد مع إنارة مخفية",
      range: "80 – 130 ريال / م²",
      note: "يشمل تفاصيل أكثر مثل مجاري إضاءة، كورنيش، أو مستويات بسيطة.",
    },
    {
      type: "ديكورات جبس متعددة المستويات",
      range: "120 – 180+ ريال / م²",
      note: "يعتمد على التصميم، كثرة القص، الانحناءات، الزوايا، ودقة التفاصيل.",
    },
    {
      type: "أعمال صغيرة أو غرفة واحدة",
      range: "تسعير مقطوعية",
      note: "الأعمال الصغيرة لا تُحسب دائمًا بالمتر فقط بسبب تكلفة الحضور والعدة والهدر.",
    },
  ];

  const includedItems = [
    [
      "الهيكل المعدني",
      "قنوات وزوايا تثبيت حسب المساحة ونوع السقف والمنسوب المطلوب.",
    ],
    [
      "ألواح الجبس بورد",
      "ألواح عادية أو مقاومة للرطوبة حسب مكان التركيب وطبيعة الاستخدام.",
    ],
    [
      "المسامير والفواصل",
      "تثبيت الألواح ومعالجة الفواصل بشريط ومعجون مناسب.",
    ],
    [
      "الزوايا والحواف",
      "تركيب الزوايا المعدنية أو البلاستيكية حسب التفاصيل المطلوبة.",
    ],
    [
      "تجهيز السطح",
      "تسوية الفواصل وتجهيز السطح للدهان، وليس بالضرورة الدهان النهائي.",
    ],
    [
      "فتحات الإنارة",
      "تجهيز فتحات السبوت أو المسارات البسيطة إذا كانت مذكورة في العرض.",
    ],
  ];

  const notIncludedItems = [
    "الدهان النهائي، إلا إذا كان مذكورًا صراحة في عرض السعر.",
    "توريد وتركيب السبوتات أو شرائط LED أو محولات الإنارة.",
    "نقل نقاط الكهرباء أو تمديد كيابل جديدة داخل السقف.",
    "العزل الصوتي أو الحراري داخل السقف أو القواطع.",
    "الفتحات الكبيرة الخاصة بالتكييف أو الدكت أو الستائر المخفية إذا لم تكن ضمن النطاق.",
    "أي تعديل بعد بدء التنفيذ لم يكن واضحًا في المخطط أو الاتفاق.",
  ];

  const costFactors = [
    {
      title: "نوع التصميم",
      text:
        "السقف المستوي أرخص من السقف متعدد المستويات. كلما زادت التفاصيل والقص والزوايا والإنارة المخفية زاد وقت التنفيذ وارتفعت التكلفة.",
    },
    {
      title: "نوع اللوح",
      text:
        "الألواح العادية تختلف عن المقاومة للرطوبة أو المقاومة للحريق. لذلك لا تقارن عرضين إلا بعد معرفة نوع اللوح وسماكته.",
    },
    {
      title: "المساحة الفعلية",
      text:
        "المساحات الكبيرة غالبًا تعطي سعر متر أفضل، بينما الأعمال الصغيرة قد تُسعّر بالمقطوعية لأنها تحتاج حضور فريق ومعدات وهدر مواد.",
    },
    {
      title: "فتحات الإنارة والتكييف",
      text:
        "كثرة فتحات السبوتات، فتحات التكييف، أو مسارات الستائر المخفية ترفع التكلفة لأنها تحتاج قياس وقص وتنفيذ أدق.",
    },
    {
      title: "منسوب السقف والاستقامة",
      text:
        "إذا كان السقف الأصلي غير مستوٍ أو يحتاج منسوبًا محددًا بدقة، يزيد وقت ضبط الهيكل وقد تتغير التكلفة.",
    },
    {
      title: "وضوح النطاق",
      text:
        "العرض الغامض قد يبدو أرخص في البداية، لكنه يسبب خلافات لاحقًا حول الدهان، الزوايا، الإنارة، أو نوع الألواح.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      <SeoHead
        title={title}
        description={description}
        canonical={canonical}
        ogImage="/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-08.webp"
        robots="index,follow,max-image-preview:large"
        jsonLd={[articleSchema, breadcrumbSchema, faqSchema]}
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
            to="/villa-finishing-price-riyadh"
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white/80 hover:bg-white/10"
          >
            حاسبة تكلفة التشطيب
          </Link>
        </div>

        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <div className="absolute inset-0">
            <img
              src="/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-08.webp"
              alt=""
              className="h-full w-full object-cover opacity-25"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black via-black/80 to-black/55" />
          </div>

          <div className="relative z-10 px-5 py-10 md:px-10 md:py-14">
            <p className="inline-flex rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-bold text-gold">
              تقرير تكلفة — جبس بورد وأسقف داخلية في الرياض
            </p>

            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-gold md:text-5xl">
              سعر متر الجبس بورد بالرياض 2026
            </h1>

            <p className="mt-4 max-w-3xl text-xl font-bold leading-9 text-white">
              جدول أسعار واضح حسب نوع السقف، مع توضيح ما يشمله السعر، وما الذي
              قد يرفع تكلفة الجبس بورد أثناء التنفيذ.
            </p>

            <p className="mt-3 text-sm text-white/55">
              آخر تحديث: يونيو 2026
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-gold/25 bg-black/55 p-5">
                <div className="text-sm font-bold text-white/60">
                  سقف مستوٍ بسيط
                </div>
                <div className="mt-2 text-3xl font-black text-gold">
                  45 – 70
                </div>
                <div className="mt-1 text-sm text-white/70">ريال / م²</div>
              </div>

              <div className="rounded-2xl border border-gold/25 bg-black/55 p-5">
                <div className="text-sm font-bold text-white/60">
                  إنارة مخفية / ديكور متوسط
                </div>
                <div className="mt-2 text-3xl font-black text-gold">
                  70 – 130
                </div>
                <div className="mt-1 text-sm text-white/70">ريال / م²</div>
              </div>

              <div className="rounded-2xl border border-gold/25 bg-black/55 p-5">
                <div className="text-sm font-bold text-white/60">
                  ديكور متعدد المستويات
                </div>
                <div className="mt-2 text-3xl font-black text-gold">
                  120+
                </div>
                <div className="mt-1 text-sm text-white/70">
                  ريال / م² حسب التصميم
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
                شاهد جدول الأسعار
              </a>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-gold/25 bg-gold/10 p-6">
          <h2 className="text-2xl font-extrabold text-gold">
            الخلاصة السريعة
          </h2>

          <p className="mt-4 leading-8 text-white/80">
            سعر متر الجبس بورد في الرياض لا يكون رقمًا واحدًا ثابتًا. السقف
            المستوي البسيط قد يبدأ غالبًا من حدود
            <strong className="text-white"> 45 إلى 70 ريال / م²</strong>،
            بينما الجبس مع فتحات سبوت أو إنارة مخفية أو تفاصيل متوسطة قد يكون
            في حدود
            <strong className="text-white"> 70 إلى 130 ريال / م²</strong>.
            أما التصاميم الكثيفة أو متعددة المستويات فقد تتجاوز
            <strong className="text-white"> 120 ريال / م²</strong> حسب
            التصميم والمعاينة.
          </p>

          <p className="mt-3 leading-8 text-white/70">
            هذه الأرقام تقديرية وليست عرض سعر نهائي. السعر الفعلي يتحدد بعد
            معرفة المساحة، نوع اللوح، تفاصيل التصميم، وهل السعر يشمل الدهان
            والإنارة أو لا.
          </p>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <h2 className="text-2xl font-extrabold text-gold">
                مثال قبل وبعد من أعمال الجبس بورد والتشطيب
              </h2>
              <p className="mt-2 leading-8 text-white/70">
                الصور التالية توضح الفرق بين مرحلة تنفيذ الجبس بورد ومعالجة
                الفواصل، ثم مرحلة التشطيب بعد تجهيز السقف والدهانات والإضاءة.
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-xl bg-gold px-5 py-3 text-center font-extrabold text-black"
            >
              احصل على تسعير واتساب
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <figure className="overflow-hidden rounded-2xl border border-white/10 bg-black">
              <div className="relative">
                <img
                  src="/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-05.webp"
                  alt="مرحلة قبل التشطيب النهائي أثناء تنفيذ الجبس بورد ومعالجة فواصل السقف في مشروع مكاتب بالرياض"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <span className="absolute right-3 top-3 rounded-full bg-black/70 px-4 py-2 text-sm font-extrabold text-white">
                  قبل
                </span>
              </div>
              <figcaption className="px-4 py-3 text-sm leading-7 text-white/60">
                أثناء تنفيذ السقف الجبس بورد ومعالجة الفواصل وتجهيز السطح قبل
                التشطيب النهائي.
              </figcaption>
            </figure>

            <figure className="overflow-hidden rounded-2xl border border-gold/30 bg-black">
              <div className="relative">
                <img
                  src="/projects/kafd-tower-303/commercial-offices-fitout-kafd-tower-303-riyadh-08.webp"
                  alt="مرحلة بعد تنفيذ وتشطيب سقف جبس بورد في مشروع مكاتب تجارية بالرياض"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <span className="absolute right-3 top-3 rounded-full bg-gold px-4 py-2 text-sm font-extrabold text-black">
                  بعد
                </span>
              </div>
              <figcaption className="px-4 py-3 text-sm leading-7 text-white/60">
                بعد تجهيز السقف والتشطيب، مع توضيح أهمية التفاصيل في تغيير
                تكلفة الجبس بورد.
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="price-table">
          <h2 className="mt-12 text-2xl font-bold text-gold md:text-3xl">
            جدول سعر متر الجبس بورد في الرياض حسب نوع العمل
          </h2>

          <p className="mt-4 leading-8 text-white/75">
            الجدول التالي يعطيك نطاقات عملية للمقارنة الأولية. لا تستخدمه كبديل
            عن المعاينة، لكنه يساعدك على معرفة هل العرض المقدم لك منطقي أم يحتاج
            توضيحًا.
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-right text-sm md:text-base">
              <thead className="bg-white/10 text-white">
                <tr>
                  <th className="p-4">نوع العمل</th>
                  <th className="p-4">السعر التقريبي</th>
                  <th className="p-4">ملاحظة</th>
                </tr>
              </thead>
              <tbody>
                {priceRows.map((row) => (
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
          ماذا يشمل سعر متر الجبس بورد عادة؟
        </h2>

        <p className="mt-4 leading-8 text-white/75">
          أهم سبب لاختلاف أسعار الجبس بورد بين مقاول وآخر هو اختلاف ما يدخل
          ضمن السعر. لذلك يجب أن يكون عرض السعر واضحًا، ولا يكتفي بعبارة
          “جبس بورد بالمتر”.
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
          بنود لا تفترض أنها مشمولة في السعر
        </h2>

        <p className="mt-4 leading-8 text-white/75">
          بعض الخلافات في مشاريع التشطيب لا تأتي من السعر نفسه، بل من أن العميل
          يعتقد أن بندًا معينًا مشمول، بينما المقاول لم يدخله في العرض. لذلك
          تأكد من البنود التالية قبل التعاقد:
        </p>

        <ul className="mt-5 space-y-3 leading-8 text-white/80">
          {notIncludedItems.map((item) => (
            <li key={item}>✔️ {item}</li>
          ))}
        </ul>

        <h2 className="mt-12 text-2xl font-bold text-gold md:text-3xl">
          ما الذي يرفع تكلفة الجبس بورد؟
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
          مثال سريع لحساب تكلفة سقف جبس بورد
        </h2>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="leading-8 text-white/80">
            إذا كانت لديك صالة مساحتها 25 م² وتريد سقف جبس بورد مستوي بسيط
            بسعر 60 ريال / م²، فالتكلفة التقريبية تكون:
          </p>

          <p className="mt-4 rounded-xl bg-black/40 p-4 text-center text-2xl font-black text-gold">
            25 × 60 = 1,500 ريال
          </p>

          <p className="mt-4 leading-8 text-white/70">
            لكن إذا أضفت إنارة مخفية، فتحات سبوت كثيرة، أو مستوى ديكوري إضافي，
            فقد يتغير السعر لأن التنفيذ لم يعد سقفًا مستويًا بسيطًا. وهذا بدون دهانات 
          </p>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-gold md:text-3xl">
          كيف تقارن بين عروض أسعار الجبس بورد؟
        </h2>

        <ul className="mt-5 space-y-3 leading-8 text-white/80">
          <li>✔️ لا تقارن السعر فقط؛ قارن نوع اللوح وسماكته.</li>
          <li>✔️ تأكد هل الدهان النهائي داخل السعر أم لا.</li>
          <li>✔️ اطلب توضيح عدد فتحات السبوت والإنارة المخفية.</li>
          <li>✔️ اسأل هل السعر يشمل الزوايا والمعجون ومعالجة الفواصل.</li>
          <li>✔️ لا تعتمد على سعر متر منخفض إذا كان النطاق غير واضح.</li>
          <li>✔️ في الأعمال الصغيرة، اسأل هل السعر بالمتر أم بالمقطوعية.</li>
        </ul>

        <div className="mt-12 rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <h2 className="text-2xl font-bold text-gold">
            تريد تسعير جبس بورد لمشروعك؟
          </h2>

          <p className="mt-4 leading-8 text-white/80">
            أرسل لنا مساحة السقف أو صورة من المخطط، ونوضح لك السعر التقريبي حسب
            نوع التصميم، سواء كان سقفًا مستويًا، جبس مقاوم للرطوبة، أو ديكورًا
            مع إنارة مخفية.
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
              to="/villa-finishing-price-riyadh"
              className="inline-flex justify-center rounded-lg border border-gold/40 px-6 py-3 font-bold text-gold hover:bg-gold hover:text-black"
            >
              افتح حاسبة التكلفة
            </Link>
          </div>
        </div>

        <section className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold text-gold">
            أسئلة شائعة عن سعر الجبس بورد
          </h2>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="font-extrabold text-white">
                كم سعر متر الجبس بورد في الرياض؟
              </h3>
              <p className="mt-2 leading-8 text-white/75">
                يختلف حسب النوع. السقف المستوي البسيط قد يكون غالبًا بين 45
                و70 ريال / م²، بينما الديكورات المتوسطة أو الإنارة المخفية قد
                تكون بين 70 و130 ريال / م²، والتصاميم الكثيفة قد تتجاوز ذلك.
              </p>
            </div>

            <div>
              <h3 className="font-extrabold text-white">
                هل السعر يشمل المواد والتركيب؟
              </h3>
              <p className="mt-2 leading-8 text-white/75">
                غالبًا نعم، لكن يجب التأكد من نوع الألواح، الهيكل المعدني،
                معالجة الفواصل، الزوايا، فتحات الإنارة، والدهان النهائي.
              </p>
            </div>

            <div>
              <h3 className="font-extrabold text-white">
                هل الجبس المقاوم للرطوبة أغلى؟
              </h3>
              <p className="mt-2 leading-8 text-white/75">
                غالبًا يكون أعلى من اللوح العادي، ويستخدم في الأماكن التي تحتاج
                مقاومة أفضل للرطوبة مثل الحمامات والمطابخ.
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
              to="/engineering-insights/cost/finishing-price-per-meter-riyadh"
              className="rounded-xl border border-white/10 bg-white/5 p-4 font-bold text-white hover:border-gold/40"
            >
              سعر متر التشطيب في الرياض
            </Link>

            <Link
              to="/engineering-insights/cost/villa-finishing-cost-riyadh"
              className="rounded-xl border border-white/10 bg-white/5 p-4 font-bold text-white hover:border-gold/40"
            >
              تكلفة تشطيب فيلا في الرياض
            </Link>

            <Link
              to="/engineering-insights/cost/how-to-compare-finishing-quotations"
              className="rounded-xl border border-white/10 bg-white/5 p-4 font-bold text-white hover:border-gold/40"
            >
              كيف تقارن عروض التشطيب؟
            </Link>

            <Link
              to="/building-and-finishing-prices-riyadh"
              className="rounded-xl border border-white/10 bg-white/5 p-4 font-bold text-white hover:border-gold/40"
            >
              دليل أسعار البناء والتشطيب
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}