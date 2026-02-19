import { useEffect } from "react";

type JsonLd = Record<string, any>;

type SeoHeadProps = {
  title: string;
  description: string;
  canonical: string; // absolute URL (https://pybcco.com/...)
  ogImage?: string; // absolute URL recommended
  ogType?: string; // default: website
  twitterCard?: "summary" | "summary_large_image"; // default summary_large_image
  jsonLd?: JsonLd | JsonLd[]; // FAQ / Service / Breadcrumb / WebPage ...
};

function upsertMetaByName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertMetaByProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLinkRel(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function removeMetaByName(name: string) {
  const el = document.querySelector(`meta[name="${name}"]`);
  if (el) el.remove();
}

function removeMetaByProperty(property: string) {
  const el = document.querySelector(`meta[property="${property}"]`);
  if (el) el.remove();
}

function removeJsonLdScripts(prefix: string) {
  document.querySelectorAll(`script[id^="${prefix}"]`).forEach((s) => s.remove());
}

// ✅ NAP موحّد (لا تغيّره إلا إذا غيّرته في GBP نفسه)
const NAP = {
  name_ar: "بنيان الهرم للمقاولات – PYBCCO",
  name_en: "Bunyan Al Haram Contracting – PYBCCO",
  phone: "+966550604837",
  email: "info@pybcco.com",
  url: "https://pybcco.com",
  address_en: "Al Washm St, Al Murabba, Riyadh 12345, Saudi Arabia",
  address_ar: "شارع الوشم، حي المربع، الرياض 12345، المملكة العربية السعودية",
  city_en: "Riyadh",
  city_ar: "الرياض",
  region_en: "Riyadh Province",
  country_en: "SA",
  postal: "12345",
};

function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ConstructionCompany"],
    "@id": `${NAP.url}/#localbusiness`,
    name: NAP.name_ar,
    alternateName: NAP.name_en,
    url: NAP.url,
    telephone: NAP.phone,
    email: NAP.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Al Washm St, Al Murabba",
      addressLocality: NAP.city_en,
      addressRegion: NAP.region_en,
      postalCode: NAP.postal,
      addressCountry: NAP.country_en,
    },
    areaServed: [
      { "@type": "City", name: NAP.city_en },
      { "@type": "AdministrativeArea", name: "North Riyadh" },
    ],
    sameAs: [
      "https://www.linkedin.com/company/pybcco/",
      "https://x.com/pybcco",
    ],
  } as JsonLd;
}

function looksLikeLocalBusiness(obj: any) {
  const t = obj?.["@type"];
  const types = Array.isArray(t) ? t : t ? [t] : [];
  return types.includes("LocalBusiness") || types.includes("ConstructionCompany");
}

export default function SeoHead({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  jsonLd,
}: SeoHeadProps) {
  useEffect(() => {
    // 1) Title
    document.title = title;

    // 2) Meta description
    upsertMetaByName("description", description);

    // 3) Canonical
    upsertLinkRel("canonical", canonical);

    // 4) Open Graph
    upsertMetaByProperty("og:title", title);
    upsertMetaByProperty("og:description", description);
    upsertMetaByProperty("og:url", canonical);
    upsertMetaByProperty("og:type", ogType);

    if (ogImage) {
      upsertMetaByProperty("og:image", ogImage);
    } else {
      removeMetaByProperty("og:image");
      removeMetaByProperty("og:image:width");
      removeMetaByProperty("og:image:height");
    }

    // 5) Twitter
    upsertMetaByName("twitter:card", twitterCard);
    upsertMetaByName("twitter:title", title);
    upsertMetaByName("twitter:description", description);

    if (ogImage) upsertMetaByName("twitter:image", ogImage);
    else removeMetaByName("twitter:image");

    // 6) JSON-LD (supports one or many) - avoid duplicates across route changes
    const prefix = "seo-jsonld-";
    removeJsonLdScripts(prefix);

    // ✅ نجمع: LocalBusiness الموحد + أي jsonLd من الصفحة
    const arrUser = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

    // ✅ إذا الصفحة نفسها بتحط LocalBusiness، ما نكرره (منع duplication)
    const userHasLocalBusiness = arrUser.some((o) => looksLikeLocalBusiness(o));

    const arrFinal = [
      ...(userHasLocalBusiness ? [] : [buildLocalBusinessJsonLd()]),
      ...arrUser,
    ];

    arrFinal.forEach((obj, idx) => {
      const script = document.createElement("script");
      script.id = `${prefix}${idx}`;
      script.type = "application/ld+json";
      script.text = JSON.stringify(obj);
      document.head.appendChild(script);
    });

    return () => {
      removeJsonLdScripts(prefix);
    };
  }, [title, description, canonical, ogImage, ogType, twitterCard, jsonLd]);

  return null;
}
