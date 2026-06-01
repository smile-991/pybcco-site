import SeoHead from "@/components/SeoHead";
import { Link } from "react-router-dom";

const canonical =
  "https://pybcco.com/engineering-insights/cost/annex-construction-cost-riyadh";

export default function AnnexConstructionCostRiyadh() {
  const title = "تكلفة بناء ملحق بالرياض 2026 | بنيان الهرم";
  const description =
    "تعرف على تكلفة بناء ملحق في الرياض 2026، وما الذي يشمله السعر من عظم وتشطيب وكهرباء وسباكة وعزل، مع أهم العوامل التي تغير التكلفة.";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "كم تكلفة بناء ملحق في الرياض؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "تبدأ تكلفة بناء ملحق صغير في الرياض غالبًا من 10,800 إلى 16,000 ريال للأعمال الأساسية، وقد تزيد حسب المساحة ونوع السقف ومستوى التشطيب والكهرباء والسباكة.",
        },
      },
      {
        "@type": "Question",
        name: "هل تكلفة بناء الملحق تشمل المواد؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "يمكن أن يكون السعر شاملًا للمواد والتنفيذ حسب الاتفاق، ويجب توضيح نوع البلوك، السقف، العزل، البلاط، الدهان، الكهرباء والسباكة قبل اعتماد العرض.",
        },
      },
      {
        "@type": "Question",
        name: "كم مدة تنفيذ ملحق صغير؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "غالبًا يستغرق تنفيذ الملحق الصغير من أسبوعين إلى شهر حسب المساحة ونوع السقف وتوفر المواد والتشطيبات المطلوبة.",
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
        name: "تكلفة بناء ملحق بالرياض",
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
          تكلفة بناء ملحق بالرياض 2026
        </h1>

        <p className="mt-6 text-lg leading-9 text-white/80">
          بناء الملحق من أكثر الطلبات شيوعًا في الرياض، سواء كان مجلسًا خارجيًا،
          غرفة إضافية، غرفة سائق، مطبخًا خارجيًا، أو مساحة خدمات. وتختلف التكلفة
          حسب المساحة، نوع السقف، وجود دورة مياه، مستوى التشطيب، وأعمال الكهرباء
          والسباكة المطلوبة.
        </p>

        <div className="mt-8 rounded-2xl border border-gold/25 bg-gold/10 p-6">
          <div className="text-lg font-extrabold text-gold">متوسط السعر</div>
          <div className="mt-3 text-3xl font-black">
            من 10,800 إلى 16,000 ريال
          </div>
          <p className="mt-3 leading-8 text-white/75">
            السعر تقديري لملحق صغير بالأعمال الأساسية، وقد يتغير حسب المساحة
            والمواصفات وحالة الموقع.
          </p>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-gold md:text-3xl">
          ماذا تشمل تكلفة بناء الملحق؟
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ["أعمال البناء", "بلوك، لياسة، تجهيز الفتحات، وربط الملحق بالموقع."],
            ["السقف", "سقف خرساني أو شينكو أو ساندوتش بانل حسب الاتفاق."],
            ["العزل", "عزل السطح أو المناطق المعرضة للماء والرطوبة."],
            ["الكهرباء", "نقاط إنارة، أفياش، تمديدات، قاطع مستقل عند الحاجة."],
            ["السباكة", "تغذية وصرف في حال وجود دورة مياه أو مغسلة."],
            ["التشطيب", "بلاط، دهان، أبواب، نوافذ، وتشطيبات داخلية أساسية."],
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
          مثال تقريبي لتكلفة ملحق صغير
        </h2>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-right text-sm md:text-base">
            <tbody>
              {[
                ["بناء وبلوك ولياسة", "3,000 – 5,000 ريال"],
                ["سقف وعزل", "2,500 – 5,000 ريال"],
                ["كهرباء وإنارة", "900 – 1,800 ريال"],
                ["سباكة عند الحاجة", "1,000 – 2,500 ريال"],
                ["بلاط ودهان وتشطيب", "2,500 – 5,000 ريال"],
                ["باب ونافذة وإكسسوارات", "900 – 2,000 ريال"],
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
          ما الذي يرفع تكلفة بناء الملحق؟
        </h2>

        <ul className="mt-5 space-y-3 leading-8 text-white/80">
          <li>✔️ زيادة المساحة أو ارتفاع الجدران.</li>
          <li>✔️ اختيار سقف خرساني بدل السقف الخفيف.</li>
          <li>✔️ وجود دورة مياه أو مطبخ داخل الملحق.</li>
          <li>✔️ الحاجة إلى تمديدات كهرباء مستقلة.</li>
          <li>✔️ استخدام تشطيبات أعلى من المستوى الاقتصادي.</li>
          <li>✔️ وجود تكسير أو تجهيزات إضافية في الموقع.</li>
        </ul>

        <div className="mt-12 rounded-2xl border border-gold/20 bg-gold/5 p-6">
          <h2 className="text-2xl font-bold text-gold">
            تريد تقدير تكلفة ملحقك؟
          </h2>
          <p className="mt-4 leading-8 text-white/80">
            أرسل لنا المساحة التقريبية وصور الموقع، وسنوضح لك التكلفة المبدئية
            وما إذا كان السعر يحتاج معاينة أو مخطط بسيط قبل التنفيذ.
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