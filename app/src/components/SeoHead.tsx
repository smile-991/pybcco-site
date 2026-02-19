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
      // Optional but nice for previews (leave if you don't know exact sizes)
      // upsertMetaByProperty("og:image:width", "1200");
      // upsertMetaByProperty("og:image:height", "630");
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

    if (jsonLd) {
      const arr = Array.isArray(jsonLd) ? jsonLd : [jsonLd];

      arr.forEach((obj, idx) => {
        const script = document.createElement("script");
        script.id = `${prefix}${idx}`;
        script.type = "application/ld+json";
        script.text = JSON.stringify(obj);
        document.head.appendChild(script);
      });
    }

    // Cleanup on unmount (important مع React Router)
    return () => {
      removeJsonLdScripts(prefix);
    };
  }, [title, description, canonical, ogImage, ogType, twitterCard, jsonLd]);

  return null;
}
