import { Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type JsonLd = Record<string, any>;

const CANONICAL = "https://pybcco.com/engineering-insights";

const INSIGHTS = [
  {
    title: "كيف تختار أفضل شركة مقاولات في الرياض؟",
    excerpt:
      "دليل عملي قبل توقيع العقد: نطاق العمل، العقد التفصيلي، الإشراف الهندسي، الشفافية، وضمان التشطيب لمدة سنتين.",
    slug: "/engineering-insights/how-to-choose-construction-company-riyadh",
  },
  // لاحقًا أضف مقالات أخرى هنا بنفس النمط
];

function buildInsightsCollectionJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${CANONICAL}#collection`,
    url: CANONICAL,
    name: "رؤى هندسية | PYBCCO",
    description:
      "رؤى هندسية من PYBCCO تساعد العملاء على اتخاذ قرارات صحيحة قبل البدء بمشاريع البناء والتشطيب في الرياض.",
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://pybcco.com/#website",
      url: "https://pybcco.com",
      name: "PYBCCO",
    },
    mainEntity: {
      "@type": "ItemList",
      "@id": `${CANONICAL}#itemlist`,
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: INSIGHTS.length,
      itemListElement: INSIGHTS.map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://pybcco.com${p.slug}`,
        name: p.title,
      })),
    },
  };
}

function buildBreadcrumbJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${CANONICAL}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: "https://pybcco.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "رؤى هندسية",
        item: CANONICAL,
      },
    ],
  };
}

export default function EngineeringInsightsSection() {
  const jsonLd = [buildInsightsCollectionJsonLd(), buildBreadcrumbJsonLd()];

  return (
    <section className="py-16">
      <SeoHead
        title="رؤى هندسية | دليل العميل لاختيار شركة مقاولات وتشطيب في الرياض | PYBCCO"
        description="رؤى هندسية من PYBCCO تساعدك على اختيار شركة مقاولات في الرياض بثقة: عقود، إشراف، شفافية، وضمان التشطيب."
        canonical={CANONICAL}
        robots="index,follow,max-image-preview:large"
        jsonLd={jsonLd}
      />

      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold">
            رؤى هندسية
          </h1>
          <p className="mt-4 text-base md:text-lg opacity-80 leading-relaxed">
            محتوى موجّه للعملاء لمساعدتهم على اتخاذ قرارات صحيحة قبل البدء بمشاريع
            البناء والتشطيب في الرياض — بأسلوب مؤسسي مختصر دون مبالغة تسويقية.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {INSIGHTS.map((post) => (
            <Card key={post.slug} className="rounded-2xl">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold leading-snug">
                  {post.title}
                </h2>
                <p className="mt-3 opacity-80 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="mt-5">
                  <Button asChild className="rounded-2xl">
                    <Link to={post.slug}>قراءة الرؤية</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 opacity-70 text-sm">
          ملاحظة: هذا القسم مخصص لتعزيز الوعي والثقة، مع الحفاظ على هوية الموقع
          المؤسسية. لا يوجد “بلوق” أو أرشيف ضخم.
        </div>
      </div>
    </section>
  );
}