import { useEffect } from "react";

type JsonLd = Record<string, any>;

type SeoHeadProps = {
  title: string;
  description: string;
  canonical: string; // absolute URL preferred
  ogImage?: string; // absolute URL recommended
  ogImageAlt?: string;
  ogType?: string; // default: website
  twitterCard?: "summary" | "summary_large_image";
  robots?: string; // "index,follow" | "noindex,follow" ...
  jsonLd?: JsonLd | JsonLd[];
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

function normalizeAbsoluteUrl(url: string) {
  try {
    const parsed = new URL(url);

    // force non-www
    if (parsed.hostname === "www.pybcco.com") {
      parsed.hostname = "pybcco.com";
    }

    // remove hash and query from canonical
    parsed.hash = "";
    parsed.search = "";

    // normalize trailing slash except homepage
    if (parsed.pathname.length > 1 && parsed.pathname.endsWith("/")) {
      parsed.pathname = parsed.pathname.slice(0, -1);
    }

    return parsed.toString();
  } catch {
    return url;
  }
}

// ✅ البيانات الرسمية المعتمدة
const NAP = {
  name_ar: "PYBCCO – شركة بنيان الهرم للمقاولات",
  name_en: "PYBCCO – Bunyan Al Haram Contracting Company",
  phone: "+966550604837",
  email: "info@pybcco.com",
  url: "https://pybcco.com",
  logo: "https://pybcco.com/assets/logo.webp",
  address_en: "Al Washm St, Al Murabba, Riyadh 12345, Saudi Arabia",
  city_en: "Riyadh",
  region_en: "Riyadh Province",
  country_en: "SA",
  postal: "12345",
  foundingDate: "2013",
  hasMap: "https://maps.app.goo.gl/mQSMdPr2px1becUp8",
  availableLanguage: ["Arabic"],
  socials: [
    "https://www.linkedin.com/company/pybcco",
    "https://x.com/pybcco",
    "https://instagram.com/pybcco.decor",
    "https://www.facebook.com/pybcco",
    "https://www.youtube.com/@pybcco",
    "https://www.tiktok.com/@pybcco",
  ],
};

function buildWebsiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${NAP.url}/#website`,
    url: NAP.url,
    name: NAP.name_ar,
    alternateName: NAP.name_en,
    inLanguage: "ar",
    publisher: {
      "@id": `${NAP.url}/#localbusiness`,
    },
  };
}

function buildLocalBusinessJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ConstructionCompany"],
    "@id": `${NAP.url}/#localbusiness`,
    name: NAP.name_ar,
    alternateName: NAP.name_en,
    url: NAP.url,
    logo: NAP.logo,
    telephone: NAP.phone,
    email: NAP.email,
    foundingDate: NAP.foundingDate,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Al Washm St, Al Murabba",
      addressLocality: NAP.city_en,
      addressRegion: NAP.region_en,
      postalCode: NAP.postal,
      addressCountry: NAP.country_en,
    },
    areaServed: [
      {
        "@type": "City",
        name: NAP.city_en,
      },
      {
        "@type": "AdministrativeArea",
        name: "Riyadh",
      },
    ],
    hasMap: NAP.hasMap,
    availableLanguage: NAP.availableLanguage,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: NAP.phone,
        email: NAP.email,
        contactType: "customer service",
        areaServed: "SA",
        availableLanguage: NAP.availableLanguage,
      },
      {
        "@type": "ContactPoint",
        telephone: NAP.phone,
        contactType: "WhatsApp",
        areaServed: "SA",
        availableLanguage: NAP.availableLanguage,
      },
    ],
    sameAs: NAP.socials,
  };
}

function looksLikeLocalBusiness(obj: any) {
  const t = obj?.["@type"];
  const types = Array.isArray(t) ? t : t ? [t] : [];
  return types.includes("LocalBusiness") || types.includes("ConstructionCompany");
}

function looksLikeWebsite(obj: any) {
  const t = obj?.["@type"];
  const types = Array.isArray(t) ? t : t ? [t] : [];
  return types.includes("WebSite");
}

export default function SeoHead({
  title,
  description,
  canonical,
  ogImage,
  ogImageAlt = "PYBCCO – شركة بنيان الهرم للمقاولات",
  ogType = "website",
  twitterCard = "summary_large_image",
  robots = "index,follow,max-image-preview:large",
  jsonLd,
}: SeoHeadProps) {
  useEffect(() => {
    const canonicalUrl = normalizeAbsoluteUrl(canonical);

    // 1) Title
    document.title = title;

    // 2) Basic meta
    upsertMetaByName("description", description);
    upsertMetaByName("robots", robots);
    upsertMetaByName("googlebot", robots);

    // 3) Canonical
    upsertLinkRel("canonical", canonicalUrl);

    // 4) Open Graph
    upsertMetaByProperty("og:title", title);
    upsertMetaByProperty("og:description", description);
    upsertMetaByProperty("og:url", canonicalUrl);
    upsertMetaByProperty("og:type", ogType);
    upsertMetaByProperty("og:site_name", "PYBCCO");
    upsertMetaByProperty("og:locale", "ar_AR");

    if (ogImage) {
      upsertMetaByProperty("og:image", ogImage);
      upsertMetaByProperty("og:image:alt", ogImageAlt);
    } else {
      removeMetaByProperty("og:image");
      removeMetaByProperty("og:image:alt");
      removeMetaByProperty("og:image:width");
      removeMetaByProperty("og:image:height");
    }

    // 5) Twitter
    upsertMetaByName("twitter:card", twitterCard);
    upsertMetaByName("twitter:title", title);
    upsertMetaByName("twitter:description", description);

    if (ogImage) {
      upsertMetaByName("twitter:image", ogImage);
      upsertMetaByName("twitter:image:alt", ogImageAlt);
    } else {
      removeMetaByName("twitter:image");
      removeMetaByName("twitter:image:alt");
    }

    // 6) JSON-LD
    const prefix = "seo-jsonld-";
    removeJsonLdScripts(prefix);

    const arrUser = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

    const userHasLocalBusiness = arrUser.some((o) => looksLikeLocalBusiness(o));
    const userHasWebsite = arrUser.some((o) => looksLikeWebsite(o));

    const arrFinal = [
      ...(userHasWebsite ? [] : [buildWebsiteJsonLd()]),
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
  }, [
    title,
    description,
    canonical,
    ogImage,
    ogImageAlt,
    ogType,
    twitterCard,
    robots,
    jsonLd,
  ]);

  return null;
}