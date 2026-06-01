import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";

const canonical =
  "https://pybcco.com/engineering-insights/cost/painting-price-per-square-meter-riyadh";

export default function PaintingPricePerSquareMeterRiyadh() {
  const title = "سعر متر الدهان بالرياض 2026 | بنيان الهرم";
  const description =
    "تعرف على سعر متر الدهان في الرياض 2026 شامل المواد والتنفيذ، وما الذي يؤثر على السعر مثل المعجون، عدد الأوجه، نوع الدهان، وحالة الجدران.";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "كم سعر متر الدهان في الرياض؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يتراوح سعر متر الدهان في الرياض غالبًا بين 18 و45 ريال للمتر المربع شامل المواد والتنفيذ، حسب حالة الجدران ونوع المعجون والدهان وعدد الأوجه المطلوبة.",
        },
      },
      {
        "@type": "Question",
        name: "هل سعر الدهان يشمل المواد؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، في هذا الدليل السعر تقديري شامل المواد والتنفيذ، لكن يجب تحديد نوع الدهان والمعجون وعدد الأوجه قبل اعتماد السعر النهائي.",
        },
      },
      {
        "@type": "Question",
        name: "لماذا يختلف سعر الدهان من مشروع لآخر؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يختلف السعر حسب حالة الجدران، وجود تشققات أو رطوبة، نوع الدهان، عدد الأوجه، ارتفاع الأسقف، وحجم المشروع.",
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
        name: "سعر متر الدهان بالرياض",
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

      <section className="container mx-auto max-w-4xl px-4 py-20 text-right">
        <div className="mb-6">
          <Link
            to="/building-and-finishing-prices-riyadh"
            className="font-bold text-gold hover:underline"
          >
            ← العودة إلى دليل الأسعار
          </Link>
        </div>

        <h1 className="text-4xl font-extrabold leading-tight text-gold md:text-5xl">
          سعر متر الدهان بالرياض 2026
        </h1>

        <p className="mt-6 text-lg leading-9 text-white/80">
          يختلف سعر متر الدهان في الرياض حسب حالة الجدران، نوع المعجون، جودة
          الدهان، عدد الأوجه، وارتفاع الأسقف. لذلك يجب النظر إلى السعر على أنه
          تقدير مبدئي، وليس عرضًا نهائيًا قبل فحص الموقع والمواصفات.
        </p>

        <div className="mt-8 rounded-2xl border border-gold/25 bg-gold/10 p-6">
          <div className="text-lg font-extrabold text-gold">متوسط السعر</div>
          <div className="mt-3 text-3xl font-black">
            من 18 إلى 45 ريال / م²
          </div>
          <p className="mt-3 leading-8 text-white/75">
            السعر تقديري شامل المواد والتنفيذ، وقد يختلف حسب نوع الدهان، عدد
            الأوجه، وحالة الجدران قبل الدهان.
          </p>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-gold md:text-3xl">
          ماذا يشمل سعر متر الدهان؟
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ["تجهيز السطح", "تنظيف الجدران ومعالجة العيوب البسيطة قبل المعجون."],
            ["المعجون", "طبقة أو أكثر حسب حالة الجدار والمستوى المطلوب."],
            ["الصنفرة", "تنعيم السطح وتجهيزه قبل البرايمر والدهان النهائي."],
            ["البرايمر", "طبقة تأسيس تساعد على ثبات اللون وتحسين جودة التشطيب."],
            ["الدهان النهائي", "وجهين أو أكثر حسب نوع الدهان واللون المطلوب."],
            ["الحماية والتنظيف", "تغطية الأرضيات والمفاتيح والتنظيف بعد الانتهاء."],
          ].map(([head, text]) => (
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
          أمثلة على اختلاف أسعار الدهان
        </h2>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-right text-sm md:text-base">
            <tbody>
              {[
                ["دهان اقتصادي لجدران بحالة جيدة", "18 – 25 ريال / م²"],
                ["دهان داخلي قياسي مع معجون", "25 – 35 ريال / م²"],
                ["دهان بجودة أعلى أو ألوان خاصة", "35 – 45 ريال / م²"],
                ["معالجة تشققات أو رطوبة", "تُحسب حسب الحالة"],
                ["دهان خارجي أو واجهات", "يختلف حسب نوع المادة والارتفاع"],
              ].map(([item, price]) => (
                <tr key={item} className="border-b border-white/10">
                  <td className="p-4 text-white/75">{item}</td>
                  <td className="p-4 font-bold text-white">{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-gold md:text-3xl">
          ما الذي يرفع تكلفة الدهان؟
        </h2>

        <ul className="mt-5 space-y-3 leading-8 text-white/80">
          <li>✔️ وجود تشققات أو رطوبة تحتاج معالجة قبل الدهان.</li>
          <li>✔️ الحاجة إلى أكثر من طبقة معجون.</li>
          <li>✔️ اختيار دهانات عالية الجودة أو ألوان خاصة.</li>
          <li>✔️ ارتفاع الأسقف أو وجود سقالات.</li>
          <li>✔️ كثرة الزوايا والتفاصيل الجبسية.</li>
          <li>✔️ صغر المساحة، لأن الأعمال الصغيرة لا تُسعّر دائمًا بالمتر فقط.</li>
        </ul>

        <div className="mt-12 rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <h2 className="text-2xl font-bold text-gold">
            تريد تسعير أعمال الدهان؟
          </h2>
          <p className="mt-4 leading-8 text-white/80">
            أرسل لنا صور الجدران والمساحة التقريبية ونوع الدهان المطلوب، ونوضح
            لك السعر المبدئي حسب حالة الموقع والمواصفات.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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
      </section>
    </div>
  );
}