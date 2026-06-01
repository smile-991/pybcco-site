import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";

const canonical =
  "https://pybcco.com/engineering-insights/cost/porcelain-installation-price-riyadh";

export default function PorcelainInstallationPriceRiyadh() {
  const title = "سعر متر البورسلان والسيراميك بالرياض 2026 | بنيان الهرم";
  const description =
    "تعرف على سعر متر تركيب البورسلان والسيراميك في الرياض 2026 شامل المواد والتنفيذ، وما الذي يؤثر على السعر مثل المقاس، القص، الوزرات، وجودة المادة.";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "كم سعر متر البورسلان والسيراميك في الرياض؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يتراوح سعر متر البورسلان والسيراميك في الرياض غالبًا بين 70 و180 ريال للمتر المربع شامل المواد والتنفيذ، حسب نوع المادة والمقاس وطريقة التركيب وحالة الأرضية.",
        },
      },
      {
        "@type": "Question",
        name: "هل السعر يشمل المواد والتركيب؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، في هذا الدليل السعر تقديري شامل المواد والتنفيذ، لكن يجب تحديد نوع البلاط أو البورسلان والمقاس والوزرات والمواد اللاصقة قبل اعتماد العرض.",
        },
      },
      {
        "@type": "Question",
        name: "لماذا يختلف سعر تركيب البورسلان عن السيراميك؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "البورسلان غالبًا يحتاج دقة أعلى في القص والتركيب، وقد تكون خامته أعلى تكلفة من السيراميك، لذلك قد يكون سعره أعلى حسب النوع والمقاس.",
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
        name: "سعر متر البورسلان والسيراميك بالرياض",
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
          سعر متر البورسلان والسيراميك بالرياض 2026
        </h1>

        <p className="mt-6 text-lg leading-9 text-white/80">
          يختلف سعر متر البورسلان والسيراميك في الرياض حسب نوع المادة، المقاس،
          طريقة التركيب، حالة الأرضية، وجود وزرات، وكثرة القص حول الزوايا
          والأبواب. لذلك يجب قراءة السعر كمتوسط تقديري قبل المعاينة النهائية.
        </p>

        <div className="mt-8 rounded-2xl border border-gold/25 bg-gold/10 p-6">
          <div className="text-lg font-extrabold text-gold">متوسط السعر</div>
          <div className="mt-3 text-3xl font-black">
            من 70 إلى 180 ريال / م²
          </div>
          <p className="mt-3 leading-8 text-white/75">
            السعر تقديري شامل المواد والتنفيذ، وقد يختلف حسب نوع البلاط أو
            البورسلان والمقاس والمواد المستخدمة في التركيب.
          </p>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-gold md:text-3xl">
          ماذا يشمل سعر متر البلاط؟
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ["البلاط أو البورسلان", "توريد المادة حسب النوع والمقاس المتفق عليه."],
            ["مواد التركيب", "غراء أو مونة، ترويبة، ميزان، وفواصل حسب الحاجة."],
            ["تجهيز الأرضية", "تنظيف وتسوية بسيطة قبل التركيب عند الحاجة."],
            ["التركيب", "ضبط المناسيب، المحاور، الفواصل، والميول في المناطق الرطبة."],
            ["القص والوزرات", "قص حول الأبواب والزوايا وتركيب الوزرات حسب التصميم."],
            ["التنظيف النهائي", "تنظيف البلاط بعد التركيب وتجهيز السطح للتسليم."],
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
          أمثلة على اختلاف الأسعار
        </h2>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-right text-sm md:text-base">
            <tbody>
              {[
                ["سيراميك اقتصادي شامل التركيب", "70 – 100 ريال / م²"],
                ["سيراميك أو بورسلان متوسط", "100 – 140 ريال / م²"],
                ["بورسلان أفضل أو مقاسات أكبر", "140 – 180 ريال / م²"],
                ["مقاسات كبيرة جدًا أو قص كثير", "يُحسب حسب التصميم"],
                ["حمامات ومناطق تحتاج ميول", "قد تزيد حسب التفاصيل"],
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
          ما الذي يرفع تكلفة البورسلان والسيراميك؟
        </h2>

        <ul className="mt-5 space-y-3 leading-8 text-white/80">
          <li>✔️ استخدام بورسلان كبير المقاس أو سماكات خاصة.</li>
          <li>✔️ كثرة القص حول الزوايا والأعمدة والأبواب.</li>
          <li>✔️ الحاجة إلى تسوية أرضية أو معالجة فروقات مناسيب.</li>
          <li>✔️ تركيب الحمامات والمطابخ بسبب الميول والتفاصيل.</li>
          <li>✔️ اختيار مواد لاصقة أو ترويبة أعلى جودة.</li>
          <li>✔️ صغر المساحة لأن الأعمال الصغيرة قد لا تُسعر بالمتر فقط.</li>
        </ul>

        <div className="mt-12 rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <h2 className="text-2xl font-bold text-gold">
            تريد تسعير أرضيات مشروعك؟
          </h2>
          <p className="mt-4 leading-8 text-white/80">
            أرسل لنا المساحة التقريبية ونوع البلاط أو البورسلان المطلوب، ونوضح
            لك السعر المبدئي حسب المقاس وطريقة التركيب وحالة الأرضية.
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