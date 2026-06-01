import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";

const canonical = "https://pybcco.com/engineering-insights/cost/bathroom-renovation-cost-riyadh";

export default function BathroomRenovationCostRiyadh() {
  const title = "تكلفة ترميم حمام كامل بالرياض 2026 | بنيان الهرم";
  const description =
    "تعرف على تكلفة ترميم حمام كامل في الرياض 2026، شامل التكسير والسباكة والعزل والبلاط والأدوات الصحية، مع توضيح العوامل التي ترفع السعر.";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "كم تكلفة ترميم حمام كامل في الرياض؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "تتراوح تكلفة ترميم حمام كامل في الرياض غالبًا بين 6,000 و11,000 ريال للحمام القياسي، وقد تزيد حسب المساحة ونوعية المواد وحالة السباكة والعزل.",
        },
      },
      {
        "@type": "Question",
        name: "هل تكلفة ترميم الحمام تشمل المواد؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يمكن أن يشمل السعر المواد والتنفيذ حسب الاتفاق، لكن يجب توضيح نوع البلاط والأدوات الصحية والخلاطات والعزل قبل اعتماد العرض النهائي.",
        },
      },
      {
        "@type": "Question",
        name: "كم يستغرق ترميم الحمام؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "غالبًا يستغرق ترميم الحمام من 5 إلى 10 أيام عمل حسب حجم التكسير، حالة السباكة، مدة اختبار العزل، وتوفر المواد.",
        },
      },
      {
        "@type": "Question",
        name: "هل يجب تغيير السباكة بالكامل عند ترميم الحمام؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ليس دائمًا، لكن في الحمامات القديمة يفضل فحص التمديدات جيدًا قبل الإغلاق، لأن إصلاح السباكة بعد تركيب البلاط يكون مكلفًا ومزعجًا.",
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
    inLanguage: "ar-SA",
    author: {
      "@type": "Organization",
      name: "بنيان الهرم للمقاولات",
    },
    publisher: {
      "@type": "Organization",
      name: "بنيان الهرم للمقاولات",
      logo: {
        "@type": "ImageObject",
        url: "https://pybcco.com/favicon.webp",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://pybcco.com" },
      {
        "@type": "ListItem",
        position: 2,
        name: "الرؤى الهندسية",
        item: "https://pybcco.com/engineering-insights",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "التكلفة والتسعير",
        item: "https://pybcco.com/engineering-insights/cost",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "تكلفة ترميم حمام كامل بالرياض",
        item: canonical,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      <SeoHead
        title={title}
        description={description}
        canonical={canonical}
        jsonLd={[articleSchema, breadcrumbSchema, faqSchema]}
      />

      <section className="container mx-auto px-4 py-20 max-w-4xl text-right">
        <div className="mb-6">
          <Link to="/building-and-finishing-prices-riyadh" className="text-gold font-bold hover:underline">
            ← العودة إلى دليل الأسعار
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gold leading-tight">
          تكلفة ترميم حمام كامل بالرياض 2026
        </h1>

        <p className="mt-6 text-lg text-white/80 leading-9">
          ترميم الحمام من أكثر أعمال الترميم طلبًا في الرياض، وتختلف تكلفته حسب
          مساحة الحمام، حالة السباكة القديمة، نوع العزل، جودة البلاط، ومستوى
          الأدوات الصحية المختارة. في هذا الدليل نوضح متوسط السعر والبنود التي
          تدخل عادة في ترميم الحمام الكامل.
        </p>

        <div className="mt-8 rounded-2xl border border-gold/25 bg-gold/10 p-6">
          <div className="text-lg font-extrabold text-gold">متوسط السعر</div>
          <div className="mt-3 text-3xl font-black">من 6,000 إلى 11,000 ريال</div>
          <p className="mt-3 text-white/75 leading-8">
            السعر تقديري لحمام قياسي، وقد يزيد أو ينقص حسب المساحة والمواصفات
            والمعاينة الفعلية.
          </p>
        </div>

        <h2 className="mt-12 text-2xl md:text-3xl font-bold text-gold">
          ماذا تشمل تكلفة ترميم الحمام؟
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ["التكسير والإزالة", "إزالة البلاط القديم والأدوات الصحية وترحيل المخلفات."],
            ["أعمال السباكة", "تعديل أو استبدال تمديدات التغذية والصرف حسب الحالة."],
            ["العزل المائي", "عزل الأرضية ومناطق الرطوبة مع اختبار العزل قبل الإغلاق."],
            ["البلاط والسيراميك", "توريد وتركيب بلاط الأرضيات والجدران حسب النوع المختار."],
            ["الأدوات الصحية", "كرسي، مغسلة، خلاطات، شطاف، إكسسوارات حسب المواصفات."],
            ["الكهرباء والإنارة", "تعديل نقاط الكهرباء أو الإضاءة أو مراوح الشفط حسب الحاجة."],
          ].map(([head, text]) => (
            <div key={head} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-bold text-white">{head}</h3>
              <p className="mt-2 text-white/70 leading-7">{text}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-2xl md:text-3xl font-bold text-gold">
          مثال تقديري لحمام 2 × 3 متر
        </h2>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-right text-sm md:text-base">
            <tbody>
              {[
                ["تكسير وإزالة وترحيل", "800 – 1,200 ريال"],
                ["سباكة وتعديل تمديدات", "1,500 – 2,500 ريال"],
                ["عزل مائي واختبار", "600 – 900 ريال"],
                ["بلاط وتركيب", "2,000 – 3,500 ريال"],
                ["أدوات صحية وخلاطات", "1,500 – 3,000 ريال"],
                ["كهرباء وإضاءة وشفاط", "400 – 900 ريال"],
              ].map(([item, price]) => (
                <tr key={item} className="border-b border-white/10">
                  <td className="p-4 text-white/75">{item}</td>
                  <td className="p-4 font-bold text-white">{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-12 text-2xl md:text-3xl font-bold text-gold">
          ما الذي يرفع تكلفة ترميم الحمام؟
        </h2>

        <ul className="mt-5 space-y-3 text-white/80 leading-8">
          <li>✔️ تغيير السباكة بالكامل بدل التعديل الجزئي.</li>
          <li>✔️ استخدام بورسلان كبير المقاس أو قصّات كثيرة.</li>
          <li>✔️ اختيار أدوات صحية أو خلاطات فاخرة.</li>
          <li>✔️ إضافة شاور بوكس أو نيشات داخل الجدار.</li>
          <li>✔️ وجود تهريب أو مشاكل عزل قديمة تحتاج معالجة.</li>
          <li>✔️ تعديل أماكن الكرسي أو المغسلة أو الدش.</li>
        </ul>

        <div className="mt-12 rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <h2 className="text-2xl font-bold text-gold">تريد سعرًا أدق لحمامك؟</h2>
          <p className="mt-4 text-white/80 leading-8">
            أرسل لنا صور الحمام والمقاسات التقريبية عبر واتساب، أو اطلب معاينة
            داخل الرياض ليتم تجهيز عرض سعر واضح حسب الحالة الفعلية.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/966550604837"
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
          </div>
        </div>

        <h2 className="mt-12 text-2xl md:text-3xl font-bold text-gold">
          الأسئلة الشائعة
        </h2>

        <div className="mt-6 space-y-6 text-white/80 leading-8">
          <div>
            <h3 className="font-bold text-white">كم تكلفة ترميم حمام كامل في الرياض؟</h3>
            <p className="mt-2">
              غالبًا بين 6,000 و11,000 ريال للحمام القياسي، وقد تزيد حسب المواد
              والمساحة وحالة السباكة.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white">هل السعر شامل المواد؟</h3>
            <p className="mt-2">
              يمكن أن يكون شاملًا للمواد والتنفيذ إذا تم تحديد المواصفات بوضوح
              داخل عرض السعر.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white">كم مدة ترميم الحمام؟</h3>
            <p className="mt-2">
              غالبًا من 5 إلى 10 أيام عمل حسب حجم الأعمال وتجهيز المواد.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white">هل يجب تغيير السباكة بالكامل؟</h3>
            <p className="mt-2">
              لا يلزم دائمًا، لكن في الحمامات القديمة يفضل فحص التمديدات قبل
              تركيب البلاط.
            </p>
          </div>
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-bold text-gold">صفحات مرتبطة</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              ["دليل أسعار البناء والتشطيب", "/building-and-finishing-prices-riyadh"],
              ["ترميم فلل بالرياض", "/villa-renovation-riyadh"],
              ["مقاول ترميم منازل بالرياض", "/home-renovation-company-riyadh"],
              ["حاسبة تكلفة التشطيب", "/villa-finishing-price-riyadh"],
            ].map(([name, href]) => (
              <Link
                key={href}
                to={href}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-gold font-bold hover:bg-white/10"
              >
                {name}
              </Link>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}