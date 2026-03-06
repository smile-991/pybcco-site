import { useMemo } from "react";
import { Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import {
Accordion,
AccordionContent,
AccordionItem,
AccordionTrigger,
} from "@/components/ui/accordion";

type JsonLd = Record<string, any>;

const SITE_URL = "https://pybcco.com";
const CANONICAL =
"https://pybcco.com/engineering-insights/cost/finishing-price-per-meter-riyadh";

const DATE_PUBLISHED = "2026-03-06";
const DATE_MODIFIED = "2026-03-06";

function buildArticleJsonLd(): JsonLd {
return {
"@context": "https://schema.org",
"@type": "Article",
"@id": `${CANONICAL}#article`,
mainEntityOfPage: { "@type": "WebPage", "@id": CANONICAL },
inLanguage: "ar",
headline: "سعر متر التشطيب في الرياض",
description:
"تعرف على سعر متر التشطيب في الرياض والعوامل التي تؤثر على تكلفة التشطيب وكيف يتم حساب التكلفة الفعلية للمشاريع.",
datePublished: DATE_PUBLISHED,
dateModified: DATE_MODIFIED,
author: {
"@type": "Organization",
name: "بنيان الهرم للمقاولات – PYBCCO",
url: SITE_URL,
},
publisher: {
"@type": "Organization",
name: "PYBCCO",
logo: {
"@type": "ImageObject",
url: `${SITE_URL}/logo.webp`,
},
},
};
}

function buildFaqJsonLd(): JsonLd {
return {
"@context": "https://schema.org",
"@type": "FAQPage",
mainEntity: [
{
"@type": "Question",
name: "كم سعر متر التشطيب في الرياض؟",
acceptedAnswer: {
"@type": "Answer",
text:
"يختلف سعر متر التشطيب في الرياض حسب مستوى التشطيب ونوعية المواد المستخدمة ونطاق الأعمال، لذلك لا يوجد رقم ثابت لجميع المشاريع.",
},
},
{
"@type": "Question",
name: "هل يمكن الاعتماد على سعر المتر لمعرفة التكلفة؟",
acceptedAnswer: {
"@type": "Answer",
text:
"سعر المتر يعطي تصورًا مبدئيًا فقط عن التكلفة، لكن السعر النهائي يعتمد على تفاصيل المشروع مثل المواد والتصميم ونطاق الأعمال.",
},
},
{
"@type": "Question",
name: "ما الفرق بين التشطيب الاقتصادي والتشطيب الفاخر؟",
acceptedAnswer: {
"@type": "Answer",
text:
"الفرق يكون في نوعية المواد المستخدمة ومستوى التفاصيل في التنفيذ، حيث يكون التشطيب الفاخر أعلى تكلفة بسبب استخدام مواد ذات جودة أعلى.",
},
},
],
};
}

export default function FinishingPricePerMeterRiyadh() {

const jsonLd = useMemo(() => {
return [buildArticleJsonLd(), buildFaqJsonLd()];
}, []);

return (
<main dir="rtl" className="py-16">

<SeoHead
title="سعر متر التشطيب في الرياض | دليل فهم تكلفة التشطيب"
description="تعرف على سعر متر التشطيب في الرياض وكيف يتم حساب التكلفة الفعلية لمشاريع التشطيب والعوامل التي تؤثر على السعر."
canonical={CANONICAL}
robots="index,follow,max-image-preview:large"
jsonLd={jsonLd}
/>

<div className="container mx-auto px-4">
<article className="max-w-4xl">

<h1 className="text-3xl md:text-4xl font-bold">
سعر متر التشطيب في الرياض
</h1>

<p className="mt-6 leading-relaxed opacity-90">
عند التخطيط لتنفيذ مشروع تشطيب فيلا أو منزل في الرياض،
فإن السؤال الأكثر شيوعًا هو: كم يبلغ سعر متر التشطيب؟
</p>

<p className="mt-4 leading-relaxed opacity-90">
سعر المتر هو طريقة تقريبية يستخدمها كثير من العملاء
لتقدير تكلفة المشروع قبل الدخول في تفاصيل التنفيذ.
لكن في الواقع لا يوجد سعر واحد ينطبق على جميع المشاريع،
لأن تكلفة التشطيب تختلف حسب عدة عوامل.
</p>

<h2 className="mt-10 text-2xl font-bold">
متوسط سعر متر التشطيب في الرياض
</h2>

<p className="mt-4 leading-relaxed opacity-90">
في السوق المحلي في الرياض يتراوح سعر التشطيب عادة ضمن نطاق تقريبي،
ويختلف حسب مستوى التشطيب ونوعية المواد.
</p>

<table className="mt-6 w-full border border-gray-200">
<thead>
<tr className="bg-gray-50">
<th className="p-3 text-right">مستوى التشطيب</th>
<th className="p-3 text-right">سعر المتر التقريبي</th>
</tr>
</thead>
<tbody>
<tr>
<td className="p-3">تشطيب اقتصادي</td>
<td className="p-3">حوالي 1200 ريال</td>
</tr>
<tr>
<td className="p-3">تشطيب متوسط</td>
<td className="p-3">1400 – 1600 ريال</td>
</tr>
<tr>
<td className="p-3">تشطيب فاخر</td>
<td className="p-3">1700 ريال أو أكثر</td>
</tr>
</tbody>
</table>

<p className="mt-6 leading-relaxed opacity-90">
هذه الأسعار تعتبر تقديرات عامة للسوق، وقد تختلف حسب تفاصيل المشروع.
</p>

<h2 className="mt-10 text-2xl font-bold">
مثال حسابي لتكلفة التشطيب
</h2>

<p className="mt-4 leading-relaxed opacity-90">
إذا كانت مساحة الفيلا 300 متر، وكان متوسط سعر التشطيب 1500 ريال للمتر،
فإن التكلفة التقريبية قد تكون:
</p>

<ul className="mt-4 list-disc pr-6 space-y-2">
<li>300 × 1500 = 450,000 ريال تقريبًا</li>
</ul>

<p className="mt-4 leading-relaxed opacity-90">
لكن السعر الفعلي قد يختلف حسب التصميم والمواد المستخدمة ونطاق الأعمال.
</p>

<h2 className="mt-10 text-2xl font-bold">
العوامل التي تؤثر على سعر متر التشطيب
</h2>

<ul className="mt-4 list-disc pr-6 space-y-2">
<li>جودة المواد المستخدمة</li>
<li>نوع الأرضيات</li>
<li>الأعمال الجبسية والديكورات</li>
<li>التصميم الداخلي</li>
<li>نطاق الأعمال المطلوبة</li>
</ul>

<h2 className="mt-10 text-2xl font-bold">
كيف تحصل على تقدير دقيق للتكلفة؟
</h2>

<p className="mt-4 leading-relaxed opacity-90">
أفضل طريقة لمعرفة تكلفة المشروع هي إعداد تقدير تفصيلي
يعتمد على المساحة ونطاق الأعمال ومستوى التشطيب المطلوب.
</p>

<div className="mt-10 rounded-xl border p-6">
<h3 className="font-bold text-lg">
احسب تكلفة مشروعك الآن
</h3>

<p className="mt-2 opacity-80">
يمكنك استخدام الحاسبة للحصول على تصور مبدئي لتكلفة المشروع.
</p>

<div className="mt-4">
<Button asChild>
<Link to="/villa-finishing-price-riyadh">
استخدم الحاسبة
</Link>
</Button>
</div>
</div>

<section className="mt-14">

<h2 className="text-2xl font-bold mb-4">
الأسئلة الشائعة
</h2>

<Accordion type="single" collapsible>

<AccordionItem value="1">
<AccordionTrigger>
كم سعر متر التشطيب في الرياض؟
</AccordionTrigger>
<AccordionContent>
يختلف السعر حسب مستوى التشطيب ونوعية المواد المستخدمة.
</AccordionContent>
</AccordionItem>

<AccordionItem value="2">
<AccordionTrigger>
هل سعر المتر يعطي التكلفة النهائية؟
</AccordionTrigger>
<AccordionContent>
لا، سعر المتر يعطي تقديرًا أوليًا فقط، بينما يعتمد السعر النهائي
على تفاصيل المشروع.
</AccordionContent>
</AccordionItem>

</Accordion>

</section>

</article>
</div>

</main>
);
}