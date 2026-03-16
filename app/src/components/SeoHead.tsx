import { useEffect } from "react";

type JsonLd = Record<string, any>;

type SeoHeadProps = {
  title: string;
  description: string;
  canonical: string; // absolute URL preferred
  ogImage?: string; // absolute URL recommended
  ogImageAlt?: string;
  ogType?: string; // website | article | product ...
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

    // force https
    parsed.protocol = "https:";

    // force non-www
    if (parsed.hostname === "www.pybcco.com") {
      parsed.hostname = "pybcco.com";
    }

    // canonical should not contain hash or query
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
const ENTITY = {
  siteUrl: "https://pybcco.com",
  siteName: "PYBCCO",
  companyNameAr: "PYBCCO – شركة بنيان الهرم للمقاولات",
  companyNameEn: "PYBCCO – Bunyan Al Haram Contracting Company",
  phone: "+966550604837",
  email: "info@pybcco.com",
  logo: "https://pybcco.com/logo.webp",
  address: {
    streetAddress: "Al Washm St, Al Murabba",
    addressLocality: "Riyadh",
    addressRegion: "Riyadh Province",
    postalCode: "12345",
    addressCountry: "SA",
  },
  foundingDate: "2013",
  hasMap: "https://maps.app.goo.gl/mQSMdPr2px1becUp8",
  availableLanguages: ["Arabic"],
  sameAs: [
    "https://www.linkedin.com/company/pybcco",
    "https://x.com/pybcco",
    "https://instagram.com/pybcco.decor",
    "https://www.facebook.com/pybcco",
    "https://www.youtube.com/@pybcco",
    "https://www.tiktok.com/@pybcco",
  ],
};

function buildOrganizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${ENTITY.siteUrl}/#organization`,
    name: ENTITY.companyNameAr,
    alternateName: ENTITY.companyNameEn,
    url: ENTITY.siteUrl,
    logo: {
      "@type": "ImageObject",
      url: ENTITY.logo,
    },
    email: ENTITY.email,
    telephone: ENTITY.phone,
    foundingDate: ENTITY.foundingDate,
    sameAs: ENTITY.sameAs,
  };
}

function buildWebsiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${ENTITY.siteUrl}/#website`,
    url: ENTITY.siteUrl,
    name: ENTITY.siteName,
    alternateName: ENTITY.companyNameAr,
    inLanguage: "ar",
    publisher: {
      "@id": `${ENTITY.siteUrl}/#organization`,
    },
  };
}

function buildLocalBusinessJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${ENTITY.siteUrl}/#localbusiness`,
    name: ENTITY.companyNameAr,
    alternateName: ENTITY.companyNameEn,
    url: ENTITY.siteUrl,
    logo: ENTITY.logo,
    image: ENTITY.logo,
    email: ENTITY.email,
    telephone: ENTITY.phone,
    foundingDate: ENTITY.foundingDate,
    address: {
      "@type": "PostalAddress",
      streetAddress: ENTITY.address.streetAddress,
      addressLocality: ENTITY.address.addressLocality,
      addressRegion: ENTITY.address.addressRegion,
      postalCode: ENTITY.address.postalCode,
      addressCountry: ENTITY.address.addressCountry,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Riyadh",
      },
      {
        "@type": "AdministrativeArea",
        name: "Riyadh Province",
      },
      {
        "@type": "Country",
        name: "Saudi Arabia",
      },
    ],
    hasMap: ENTITY.hasMap,
    availableLanguage: ENTITY.availableLanguages,
    parentOrganization: {
      "@id": `${ENTITY.siteUrl}/#organization`,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: ENTITY.phone,
        email: ENTITY.email,
        contactType: "customer service",
        areaServed: "SA",
        availableLanguage: ENTITY.availableLanguages,
      },
      {
        "@type": "ContactPoint",
        telephone: ENTITY.phone,
        contactType: "WhatsApp",
        areaServed: "SA",
        availableLanguage: ENTITY.availableLanguages,
      },
    ],
    sameAs: ENTITY.sameAs,
  };
}

function extractTypes(obj: any): string[] {
  const t = obj?.["@type"];
  if (Array.isArray(t)) return t;
  if (typeof t === "string") return [t];
  return [];
}

function hasSchemaType(obj: any, targetTypes: string[]) {
  const types = extractTypes(obj);
  return targetTypes.some((t) => types.includes(t));
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

    // 2) Core meta
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
    upsertMetaByProperty("og:site_name", ENTITY.siteName);
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

    const userHasOrganization = arrUser.some((o) =>
      hasSchemaType(o, ["Organization"])
    );
    const userHasWebsite = arrUser.some((o) =>
      hasSchemaType(o, ["WebSite"])
    );
    const userHasLocalBusiness = arrUser.some((o) =>
      hasSchemaType(o, ["LocalBusiness", "ConstructionCompany"])
    );

    const arrFinal: JsonLd[] = [
      ...(userHasOrganization ? [] : [buildOrganizationJsonLd()]),
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