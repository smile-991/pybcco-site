import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";

const canonical =
  "https://pybcco.com/engineering-insights/cost/gypsum-board-price-riyadh";

export default function GypsumBoardPriceRiyadh() {
  const title = "سعر متر الجبس بورد بالرياض 2026 | بنيان الهرم";
  const description =
    "تعرف على سعر متر الجبس بورد في الرياض 2026، وما الذي يشمله السعر، والفرق بين الأسقف المستوية والديكورية والعوامل التي تغير التكلفة.";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "كم سعر متر الجبس بورد في الرياض؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يتراوح سعر متر الجبس بورد في الرياض غالبًا بين 90 و110 ريال للمتر المربع للأعمال القياسية، وقد يزيد حسب التصميم والإنارة المخفية والتفاصيل الديكورية.",
        },
      },
      {
        "@type": "Question",
        name: "هل سعر الجبس بورد يشمل المواد والتركيب؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "عادة يتم الاتفاق على السعر شامل المواد والتركيب، لكن يجب توضيح نوع الألواح، سماكة الهيكل، المعجون، الزوايا، وفتحات الإنارة قبل اعتماد العرض.",
        },
      },
      {
        "@type": "Question",
        name: "ما الفرق بين الجبس المستوي والديكوري في السعر؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "الجبس المستوي يكون أقل تكلفة لأنه أبسط في التنفيذ، أما الجبس الديكوري أو متعدد المستويات فيحتاج وقتًا وتفاصيل أكثر وقد يرفع السعر.",
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
        name: "سعر متر الجبس بورد بالرياض",
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
          سعر متر الجبس بورد بالرياض 2026
        </h1>

        <p className="mt-6 text-lg leading-9 text-white/80">
          يختلف سعر متر الجبس بورد في الرياض حسب نوع التصميم، مساحة السقف، وجود
          إنارة مخفية، عدد المستويات، ونوع الألواح المستخدمة. لذلك لا يكفي معرفة
          سعر المتر فقط، بل يجب معرفة ما الذي يشمله السعر فعليًا.
        </p>

        <div className="mt-8 rounded-2xl border border-gold/25 bg-gold/10 p-6">
          <div className="text-lg font-extrabold text-gold">متوسط السعر</div>
          <div className="mt-3 text-3xl font-black">
            من 90 إلى 110 ريال / م²
          </div>
          <p className="mt-3 leading-8 text-white/75">
            السعر تقديري للأعمال القياسية، وقد يختلف حسب التصميم والتفاصيل
            والمواد والمساحة الفعلية.
          </p>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-gold md:text-3xl">
          ماذا يشمل سعر متر الجبس بورد؟
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ["الهيكل المعدني", "قنوات وزوايا تثبيت حسب المساحة ونوع السقف."],
            ["ألواح الجبس بورد", "ألواح عادية أو مقاومة للرطوبة حسب مكان التركيب."],
            ["المعجون والزوايا", "معالجة الفواصل والزوايا وتجهيز السطح للدهان."],
            ["فتحات الإنارة", "تجهيز فتحات السبوتات أو الإضاءة المخفية عند الحاجة."],
            ["التصميم", "سقف مستوٍ أو مستويات وديكورات حسب المخطط."],
            ["التنفيذ والتركيب", "تركيب وضبط المناسيب والاستقامة والتشطيب النهائي."],
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
          أمثلة على اختلاف السعر حسب نوع الجبس
        </h2>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-right text-sm md:text-base">
            <tbody>
              {[
                ["جبس بورد مستوٍ بسيط", "90 – 100 ريال / م²"],
                ["جبس بورد مع فتحات سبوتات", "95 – 110 ريال / م²"],
                ["جبس بورد ديكوري بسيط", "100 – 130 ريال / م²"],
                ["جبس بورد متعدد المستويات", "حسب التصميم والمعاينة"],
                ["جبس مقاوم للرطوبة", "قد يزيد حسب نوع اللوح والمساحة"],
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
          ما الذي يرفع تكلفة الجبس بورد؟
        </h2>

        <ul className="mt-5 space-y-3 leading-8 text-white/80">
          <li>✔️ كثرة المستويات والتفاصيل الديكورية.</li>
          <li>✔️ وجود إنارة مخفية أو فتحات سبوت كثيرة.</li>
          <li>✔️ استخدام ألواح مقاومة للرطوبة في دورات المياه أو المطابخ.</li>
          <li>✔️ صغر المساحة، لأن الأعمال الصغيرة لا تُحسب دائمًا كسعر متر فقط.</li>
          <li>✔️ الحاجة إلى تفصيل خاص حول التكييف أو الستائر أو المجاري.</li>
          <li>✔️ ضعف استواء السقف أو الحاجة إلى منسوب محدد بدقة.</li>
        </ul>

        <div className="mt-12 rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <h2 className="text-2xl font-bold text-gold">
            تريد تسعير جبس بورد لمشروعك؟
          </h2>
          <p className="mt-4 leading-8 text-white/80">
            أرسل لنا مساحة السقف أو المخطط، ونوضح لك السعر التقريبي حسب نوع
            التصميم، سواء كان سقفًا مستويًا أو ديكورًا مع إنارة مخفية.
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