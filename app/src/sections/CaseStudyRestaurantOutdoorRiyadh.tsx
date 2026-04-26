import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead";

const beforeImages = [
  {
    src: "/projects/restaurant-outdoor/01-restaurant-outdoor-seating-before-riyadh.webp",
    alt: "جلسات خارجية لمطعم في الرياض قبل بدء التشطيب وتنفيذ الحوش الخارجي",
  },
  {
    src: "/projects/restaurant-outdoor/02-restaurant-courtyard-finishing-before-riyadh.webp",
    alt: "حوش خارجي لمطعم في الرياض قبل أعمال التشطيب والخرسانة المطبوعة",
  },
  {
    src: "/projects/restaurant-outdoor/03-outdoor-restaurant-renovation-before-riyadh.webp",
    alt: "منطقة جلسات خارجية لمطعم قبل الترميم والتجهيز في الرياض",
  },
  {
    src: "/projects/restaurant-outdoor/04-restaurant-outdoor-area-before-construction-riyadh.webp",
    alt: "مساحة خارجية لمطعم قبل تنفيذ الأرضيات والديكور في الرياض",
  },
  {
    src: "/projects/restaurant-outdoor/05-restaurant-yard-finishing-before-riyadh.webp",
    alt: "حوش مطعم خارجي قبل التشطيب في الرياض",
  },
  {
    src: "/projects/restaurant-outdoor/06-restaurant-exterior-seating-before-renovation-riyadh.webp",
    alt: "جلسات مطعم خارجية قبل التجديد والتشطيب في الرياض",
  },
  {
    src: "/projects/restaurant-outdoor/07-outdoor-dining-area-before-finishing-riyadh.webp",
    alt: "منطقة طعام خارجية قبل التشطيب لمطعم في الرياض",
  },
  {
    src: "/projects/restaurant-outdoor/08-restaurant-courtyard-before-work-riyadh.webp",
    alt: "حوش مطعم قبل بدء أعمال التشطيب والفرش في الرياض",
  },
  {
    src: "/projects/restaurant-outdoor/09-restaurant-outdoor-space-before-finishing-riyadh.webp",
    alt: "مساحة خارجية لمطعم قبل التشطيب النهائي في الرياض",
  },
];

const afterImages = [
  {
    src: "/projects/restaurant-outdoor/10-restaurant-outdoor-seating-after-riyadh.webp",
    alt: "جلسات خارجية لمطعم في الرياض بعد التشطيب خلال 12 يوم",
  },
  {
    src: "/projects/restaurant-outdoor/11-restaurant-courtyard-design-after-riyadh.webp",
    alt: "تصميم حوش خارجي لمطعم في الرياض بعد التنفيذ والفرش",
  },
  {
    src: "/projects/restaurant-outdoor/12-modern-restaurant-outdoor-finishing-riyadh.webp",
    alt: "تشطيب جلسات خارجية لمطعم بديكور يوناني شعبي في الرياض",
  },
  {
    src: "/projects/restaurant-outdoor/13-restaurant-outdoor-area-after-construction-riyadh.webp",
    alt: "منطقة خارجية لمطعم بعد تنفيذ الخرسانة المطبوعة والتشطيب في الرياض",
  },
  {
    src: "/projects/restaurant-outdoor/14-restaurant-yard-finishing-after-riyadh.webp",
    alt: "تشطيب حوش مطعم خارجي بعد التنفيذ في الرياض",
  },
  {
    src: "/projects/restaurant-outdoor/15-restaurant-exterior-seating-after-renovation-riyadh.webp",
    alt: "جلسات مطعم خارجية بعد التجديد والتشطيب والفرش في الرياض",
  },
  {
    src: "/projects/restaurant-outdoor/16-outdoor-dining-area-after-finishing-riyadh.webp",
    alt: "منطقة طعام خارجية بعد التشطيب لمطعم في الرياض",
  },
  {
    src: "/projects/restaurant-outdoor/17-restaurant-courtyard-after-work-riyadh.webp",
    alt: "حوش مطعم بعد الانتهاء من أعمال التشطيب خلال 12 يوم في الرياض",
  },
  {
    src: "/projects/restaurant-outdoor/18-restaurant-outdoor-space-after-finishing-riyadh.webp",
    alt: "مساحة خارجية لمطعم بعد التشطيب النهائي والفرش في الرياض",
  },
];

const faqItems = [
  {
    question: "كم استغرق تنفيذ مشروع الجلسات الخارجية للمطعم؟",
    answer:
      "تم تنفيذ المشروع خلال 12 يوم فقط، وشمل أعمال الأرضية الخرسانة المطبوعة، الدهانات، التشطيب الخارجي، الديكور، وترتيب الفرش والجلسات.",
  },
  {
    question: "ما نوع الأرضية المستخدمة في المشروع؟",
    answer:
      "تم تنفيذ أرضية خرسانة مطبوعة مناسبة للأحواش والجلسات الخارجية، وهي خيار عملي للمطاعم لأنها تتحمل الاستخدام المتكرر وتعطي شكلًا جماليًا واضحًا.",
  },
  {
    question: "ما هو طابع التصميم المستخدم في الجلسات الخارجية؟",
    answer:
      "تم اعتماد طابع يوناني شعبي يعتمد على اللون الأبيض مع الأزرق، مع مظلات قماشية وإضاءات وقطع ديكور تعطي المكان هوية بصرية واضحة ومناسبة للتصوير وتجربة الزوار.",
  },
  {
    question: "هل يمكن تنفيذ مشروع مشابه لمطعم أو كافيه في الرياض؟",
    answer:
      "نعم، يمكن تنفيذ مشاريع مشابهة للمطاعم والكافيهات والاستراحات، مع تعديل التصميم والمواد والفرش حسب المساحة والميزانية وهوية النشاط التجاري.",
  },
];

const caseStudyJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "تشطيب جلسات خارجية لمطعم في الرياض خلال 12 يوم",
  description:
    "دراسة حالة لمشروع تشطيب جلسات خارجية لمطعم في الرياض، تم تنفيذه خلال 12 يوم وشمل الخرسانة المطبوعة، الديكور اليوناني الشعبي، الفرش، والتشطيب الخارجي.",
  image: [
    "https://pybcco.com/projects/restaurant-outdoor/10-restaurant-outdoor-seating-after-riyadh.webp",
    "https://pybcco.com/projects/restaurant-outdoor/11-restaurant-courtyard-design-after-riyadh.webp",
    "https://pybcco.com/projects/restaurant-outdoor/12-modern-restaurant-outdoor-finishing-riyadh.webp",
  ],
  author: {
    "@type": "Organization",
    name: "بنيان الهرم للمقاولات",
    url: "https://pybcco.com",
  },
  publisher: {
    "@type": "Organization",
    name: "بنيان الهرم للمقاولات",
    logo: {
      "@type": "ImageObject",
      url: "https://pybcco.com/logo.webp",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://pybcco.com/case-study-restaurant-outdoor-riyadh",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const jsonLd = [caseStudyJsonLd, faqJsonLd];

export default function CaseStudyRestaurantOutdoorRiyadh() {
  return (
    <main dir="rtl" className="min-h-screen bg-stone-50 text-stone-900">
      <SeoHead
        title="تشطيب جلسات خارجية لمطعم في الرياض خلال 12 يوم | قبل وبعد"
        description="دراسة حالة لمشروع تشطيب جلسات خارجية لمطعم في الرياض خلال 12 يوم فقط، شمل الفرش، أرضية خرسانة مطبوعة، وديكور يوناني شعبي قبل وبعد التنفيذ."
        canonical="https://pybcco.com/case-study-restaurant-outdoor-riyadh"
        robots="index,follow,max-image-preview:large"
        ogImage="https://pybcco.com/projects/restaurant-outdoor/10-restaurant-outdoor-seating-after-riyadh.webp"
        jsonLd={jsonLd}
      />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="rounded-3xl bg-white p-6 shadow-sm md:p-10">
          <p className="mb-3 text-sm font-bold text-amber-700">
            دراسة حالة / مشروع مطعم تجاري
          </p>

          <h1 className="mb-5 text-3xl font-extrabold leading-tight md:text-5xl">
            تشطيب جلسات خارجية لمطعم في الرياض خلال 12 يوم
          </h1>

          <p className="max-w-4xl text-lg leading-9 text-stone-700">
            يوضح هذا المشروع مراحل تحويل حوش خارجي لمطعم في الرياض من مساحة غير
            مكتملة إلى جلسات خارجية جاهزة للتشغيل التجاري خلال 12 يوم فقط. شمل
            العمل تنفيذ أرضية خرسانة مطبوعة، أعمال الدهانات والتشطيب الخارجي،
            ديكور يوناني شعبي باللونين الأبيض والأزرق، المظلات، الإضاءة، وترتيب
            الفرش بما يناسب تجربة الزوار والتصوير والتشغيل اليومي للمطعم.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-stone-50 p-4">
              <p className="text-sm text-stone-500">نوع المشروع</p>
              <p className="mt-1 font-extrabold">جلسات خارجية لمطعم</p>
            </div>
            <div className="rounded-2xl bg-stone-50 p-4">
              <p className="text-sm text-stone-500">مدة التنفيذ</p>
              <p className="mt-1 font-extrabold">12 يوم فقط</p>
            </div>
            <div className="rounded-2xl bg-stone-50 p-4">
              <p className="text-sm text-stone-500">الأرضيات</p>
              <p className="mt-1 font-extrabold">خرسانة مطبوعة</p>
            </div>
            <div className="rounded-2xl bg-stone-50 p-4">
              <p className="text-sm text-stone-500">الطابع</p>
              <p className="mt-1 font-extrabold">يوناني شعبي</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-stone-100 px-4 py-2">تشطيب مطاعم</span>
            <span className="rounded-full bg-stone-100 px-4 py-2">جلسات خارجية</span>
            <span className="rounded-full bg-stone-100 px-4 py-2">خرسانة مطبوعة</span>
            <span className="rounded-full bg-stone-100 px-4 py-2">ديكور يوناني</span>
            <span className="rounded-full bg-stone-100 px-4 py-2">قبل وبعد</span>
            <span className="rounded-full bg-stone-100 px-4 py-2">الرياض</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-4 text-2xl font-extrabold">
            فكرة المشروع والتحدي قبل التنفيذ
          </h2>
          <p className="leading-9 text-stone-700">
            كان المطلوب تجهيز المساحة الخارجية للمطعم بسرعة عالية دون التضحية
            بالشكل النهائي أو قابلية التشغيل. التحدي الأساسي كان تحويل الحوش إلى
            منطقة جلسات جذابة خلال مدة قصيرة، مع اختيار مواد تتحمل الاستخدام
            الخارجي وتبقى مناسبة للهوية البصرية للمطعم.
          </p>
          <p className="mt-4 leading-9 text-stone-700">
            لذلك تم التركيز على حلول عملية وسريعة مثل الأرضية الخرسانة المطبوعة،
            الدهان الخارجي، المظلات القماشية، وتنسيق الفرش والإضاءة بطريقة تمنح
            المكان طابعًا شعبيًا يونانيًا واضحًا وقابلًا للتسويق بصريًا.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <h2 className="mb-4 text-2xl font-extrabold">
          قبل التنفيذ: حالة الموقع قبل التشطيب
        </h2>
        <p className="mb-6 max-w-4xl leading-8 text-stone-700">
          توضح الصور التالية حالة الموقع قبل اكتمال أعمال التشطيب، حيث كانت
          المساحة بحاجة إلى تجهيز أرضيات، معالجة ممرات، تشطيب واجهات، تنظيم
          المسارات، وتحويلها إلى جلسات خارجية قابلة للاستخدام التجاري.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {beforeImages.map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="h-72 w-full rounded-2xl object-cover shadow-sm"
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <h2 className="mb-4 text-2xl font-extrabold">
          بعد التنفيذ: جلسات خارجية جاهزة للتشغيل
        </h2>
        <p className="mb-6 max-w-4xl leading-8 text-stone-700">
          بعد التنفيذ أصبحت المساحة الخارجية جاهزة لاستقبال العملاء، مع أرضية
          خرسانة مطبوعة، دهانات خارجية، أبواب ونوافذ باللون الأزرق، مظلات قماشية،
          إضاءة ديكورية، وفرش متناسق يعزز تجربة الزوار ويمنح المطعم طابعًا
          مختلفًا وسهل التذكر.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {afterImages.map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="h-72 w-full rounded-2xl object-cover shadow-sm"
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-5 text-2xl font-extrabold">
            مراحل تنفيذ تشطيب الجلسات الخارجية
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-stone-50 p-5">
              <h3 className="mb-2 font-extrabold">1. تجهيز الموقع</h3>
              <p className="leading-8 text-stone-700">
                تنظيف المساحة، إزالة المخلفات، ترتيب مسارات الحركة، وتجهيز
                الحوش الخارجي لاستقبال أعمال الأرضيات والتشطيب.
              </p>
            </div>

            <div className="rounded-2xl bg-stone-50 p-5">
              <h3 className="mb-2 font-extrabold">2. تنفيذ الأرضية</h3>
              <p className="leading-8 text-stone-700">
                تنفيذ أرضية خرسانة مطبوعة مناسبة للجلسات الخارجية، مع مراعاة
                الشكل الجمالي وسهولة الاستخدام والصيانة.
              </p>
            </div>

            <div className="rounded-2xl bg-stone-50 p-5">
              <h3 className="mb-2 font-extrabold">3. التشطيب والدهانات</h3>
              <p className="leading-8 text-stone-700">
                تنفيذ أعمال التشطيب الخارجي والدهانات باللون الأبيض مع إبراز
                التفاصيل الزرقاء لتعزيز الهوية البصرية للمكان.
              </p>
            </div>

            <div className="rounded-2xl bg-stone-50 p-5">
              <h3 className="mb-2 font-extrabold">4. الديكور والفرش</h3>
              <p className="leading-8 text-stone-700">
                تركيب المظلات والإضاءة وتنسيق الفرش والديكور الشعبي بما يناسب
                تجربة مطعم خارجي قابل للتشغيل والتصوير.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-extrabold">نطاق العمل</h2>
            <ul className="space-y-3 leading-8 text-stone-700">
              <li>• تجهيز الحوش الخارجي للمطعم للاستخدام التجاري.</li>
              <li>• تنفيذ أرضية خرسانة مطبوعة مناسبة للجلسات الخارجية.</li>
              <li>• تنفيذ أعمال الدهانات والتشطيب الخارجي.</li>
              <li>• تنسيق الطابع اليوناني الشعبي بالأبيض والأزرق.</li>
              <li>• تركيب المظلات والإضاءة وقطع الديكور.</li>
              <li>• ترتيب الفرش وتحسين تجربة الزوار داخل الجلسات الخارجية.</li>
              <li>• تسليم المشروع خلال 12 يوم فقط.</li>
            </ul>
          </div>

          <div className="rounded-3xl bg-stone-900 p-6 text-white shadow-sm">
            <h2 className="mb-4 text-2xl font-extrabold">لديك مشروع مشابه؟</h2>
            <p className="mb-6 leading-8 text-stone-200">
              إذا كنت تملك مطعمًا أو كافيه أو استراحة وتحتاج إلى تشطيب جلسات
              خارجية، يمكننا مساعدتك في دراسة المساحة، اقتراح المواد المناسبة،
              وتجهيز عرض سعر مبدئي يناسب ميزانية المشروع.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/request-project"
                className="rounded-xl bg-amber-500 px-5 py-3 font-bold text-stone-950 transition hover:bg-amber-400"
              >
                اطلب تسعير مشروعك
              </Link>

              <Link
                to="/villa-finishing-price-riyadh"
                className="rounded-xl border border-white/25 px-5 py-3 font-bold text-white transition hover:bg-white/10"
              >
                استخدم الحاسبة
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 text-2xl font-extrabold">
            أسئلة شائعة عن تشطيب جلسات خارجية للمطاعم
          </h2>

          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-2xl bg-stone-50 p-5">
                <h3 className="mb-2 font-extrabold">{item.question}</h3>
                <p className="leading-8 text-stone-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}