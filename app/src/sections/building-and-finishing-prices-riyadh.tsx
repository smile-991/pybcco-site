import { Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";

const priceCards = [
  {
    title: "تكلفة ترميم حمام كامل",
    price: "من 6,000 إلى 11,000 ريال",
    desc: "يشمل التكسير، السباكة، العزل، البلاط، الأدوات الصحية حسب المواصفات.",
    href: "/engineering-insights/cost/bathroom-renovation-cost-riyadh",
  },
  {
    title: "سعر متر العظم مع المواد",
    price: "حسب المساحة والمخططات",
    desc: "تكلفة الهيكل الإنشائي مع المواد والتنفيذ، وتختلف حسب التصميم والتربة.",
    href: "/engineering-insights/cost/gray-structure-cost-riyadh",
  },
  {
    title: "تكلفة بناء ملحق",
    price: "من 10,800 إلى 16,000 ريال",
    desc: "ملحق قياسي بمساحة تقريبية 15–20 م",
    href: "/engineering-insights/cost/annex-construction-cost-riyadh",
  },
  {
    title: "سعر متر الجبس بورد",
    price: "من 90 إلى 110 ريال / م²",
    desc: "أسقف مستوية أو ديكورية حسب السماكة، التصميم، والإنارة المخفية.",
    href: "/engineering-insights/cost/gypsum-board-price-riyadh",
  },
  {
    title: "سعر متر الدهان",
    price: "من 18 إلى 45 ريال / م²",
    desc: "حسب نوع المعجون، عدد الأوجه، جودة الدهان، وحالة الجدران.",
    href: "/engineering-insights/cost/painting-price-per-square-meter-riyadh",
  },
  {
    title: "سعر متر البورسلان والسيراميك",
    price: "من 70 إلى 180 ريال / م²",
    desc: "يشمل التركيب وقد يختلف حسب المقاس، القص، الوزرات، ونوع المادة.",
    href: "/engineering-insights/cost/porcelain-installation-price-riyadh",
  },

];

export default function BuildingAndFinishingPricesRiyadh() {
  const canonical = "https://pybcco.com/building-and-finishing-prices-riyadh";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${canonical}#collection`,
      name: "دليل أسعار البناء والتشطيب في الرياض",
      description:
        "دليل مختصر لمتوسط أسعار أعمال البناء والتشطيب والترميم في الرياض، مع روابط للحاسبات والصفحات التفصيلية.",
      url: canonical,
      inLanguage: "ar-SA",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: "https://pybcco.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "دليل الأسعار",
          item: canonical,
        },
      ],
    },
  ];

  return (
    <>
      <SeoHead
        title="دليل أسعار البناء والتشطيب في الرياض 2026 | بنيان الهرم"
        description="تعرف على متوسط أسعار البناء والتشطيب والترميم في الرياض، مثل تكلفة ترميم الحمام، سعر العظم، الجبس، الدهان، البلاط، الملاحق، والإنترلوك."
        canonical={canonical}
        robots="index,follow"
        jsonLd={jsonLd}
      />

      <main dir="rtl" className="min-h-screen bg-white text-slate-950">
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900 text-white">
          <div className="mx-auto max-w-6xl px-4 py-20 text-center">
            <span className="mb-4 inline-flex rounded-full bg-yellow-400/15 px-4 py-2 text-sm font-bold text-yellow-400">
              دليل أسعار المقاولات في الرياض
            </span>

            <h1 className="mx-auto max-w-4xl text-3xl font-black leading-tight md:text-5xl">
              دليل أسعار البناء والتشطيب والترميم في الرياض 2026
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-200 md:text-lg">
              جمعنا لك متوسط أسعار أهم أعمال البناء والتشطيب والترميم في
              الرياض، مع توضيح أن الأسعار تقديرية وتختلف حسب المساحة، جودة
              المواد، حالة الموقع، والمواصفات المطلوبة.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/villa-construction-cost-calculator-riyadh"
                className="rounded-xl bg-yellow-400 px-6 py-3 text-sm font-extrabold text-black transition hover:bg-yellow-300"
              >
                حاسبة تكلفة البناء
              </Link>

              <Link
                to="/villa-finishing-price-riyadh"
                className="rounded-xl border border-white/25 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-white hover:text-black"
              >
                حاسبة تكلفة التشطيب
              </Link>

              <a
                href="/#contact"
                className="rounded-xl border border-white/25 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-white hover:text-black"
              >
                طلب معاينة
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-black md:text-3xl">
              متوسط أسعار البنود الأكثر طلباً
            </h2>
            <p className="mx-auto mt-3 max-w-3xl leading-8 text-slate-600">
              هذه الأسعار ليست عرض سعر نهائي، لكنها تساعدك على تكوين تصور
              مبدئي قبل طلب المعاينة أو إعداد عرض تفصيلي.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {priceCards.map((card) => (
              <Link
                key={card.title}
                to={card.href}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl"
              >
                <div className="mb-4 inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-extrabold text-yellow-700">
                  سعر تقديري
                </div>

                <h3 className="text-xl font-black text-slate-950 group-hover:text-yellow-600">
                  {card.title}
                </h3>

                <p className="mt-3 text-2xl font-black text-slate-900">
                  {card.price}
                </p>

                <p className="mt-4 leading-7 text-slate-600">{card.desc}</p>

                <span className="mt-6 inline-flex text-sm font-extrabold text-yellow-600">
                  عرض التفاصيل ←
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-slate-50">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-black">
                لماذا تختلف الأسعار من مشروع لآخر؟
              </h2>
              <ul className="mt-5 space-y-3 leading-8 text-slate-700">
                <li>• اختلاف مساحة المشروع وحالة الموقع.</li>
                <li>• نوع المواد المختارة وجودتها.</li>
                <li>• وجود أعمال تكسير أو إزالة أو تعديل تمديدات.</li>
                <li>• مستوى التشطيب المطلوب: اقتصادي، قياسي، أو فاخر.</li>
                <li>• صعوبة التنفيذ وتفاصيل التصميم.</li>
              </ul>
            </div>

            <div className="rounded-3xl bg-slate-950 p-7 text-white shadow-sm">
              <h2 className="text-2xl font-black">
                تريد سعراً أدق لمشروعك؟
              </h2>
              <p className="mt-4 leading-8 text-slate-200">
                استخدم الحاسبة للحصول على تقدير مبدئي، أو اطلب معاينة من فريق
                بنيان الهرم للمقاولات ليتم تجهيز عرض سعر حسب الواقع والمخططات.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/villa-finishing-price-riyadh"
                  className="rounded-xl bg-yellow-400 px-5 py-3 text-sm font-extrabold text-black"
                >
                  احسب التكلفة
                </Link>
                <a
                  href="/#contact"
                  className="rounded-xl border border-white/25 px-5 py-3 text-sm font-extrabold text-white"
                >
                  تواصل معنا
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-black md:text-3xl">
            ملاحظات مهمة قبل الاعتماد على الأسعار
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-black">الأسعار تقديرية</h3>
              <p className="mt-2 leading-7 text-slate-600">
                لا يمكن اعتماد السعر النهائي قبل معرفة المساحة والمواصفات وحالة
                الموقع.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-black">المواد تؤثر كثيراً</h3>
              <p className="mt-2 leading-7 text-slate-600">
                نفس البند قد يختلف سعره بشكل كبير حسب جودة المواد والماركات
                المختارة.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-black">المعاينة تحسم السعر</h3>
              <p className="mt-2 leading-7 text-slate-600">
                في الترميم خصوصاً، حالة السباكة والكهرباء والعزل قد تغير التكلفة
                النهائية.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}