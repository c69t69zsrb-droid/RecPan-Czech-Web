import React, { useEffect } from "react";
import { getAlternatePaths } from "@/lib/i18n/routes";

const SITE_URL = "https://rec-pan.eu";
const LOGO_URL = "https://media.base44.com/images/public/6a42ca6def2b3fde835b3720/161cbfc87_ChatGPTImageJul7202607_43_34PM.png";
const DEFAULT_OG_IMAGE = "https://media.base44.com/images/public/6a42ca6def2b3fde835b3720/abdf0ee40_IMG_06852Large.jpg";

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href, hreflang) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

export const ORGANIZATION_DATA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RecPan s.r.o.",
  legalName: "RecPan s.r.o.",
  url: SITE_URL,
  logo: LOGO_URL,
  description: "Next-generation solar panel recycling technology.",
  sameAs: [],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Petrská 1166/33",
    addressLocality: "Prague 1",
    postalCode: "110 00",
    addressCountry: "CZ",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+420730445454",
    email: "office@rec-pan.cz",
    contactType: "customer service",
  },
  vatID: "CZ23695781",
};

export const WEBSITE_DATA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RecPan",
  url: SITE_URL,
};

export const LOCAL_BUSINESS_DATA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "RecPan s.r.o.",
  legalName: "RecPan s.r.o.",
  url: SITE_URL,
  image: DEFAULT_OG_IMAGE,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Petrská 1166/33",
    addressLocality: "Prague 1",
    postalCode: "110 00",
    addressCountry: "CZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.0875,
    longitude: 14.4213,
  },
  telephone: "+420730445454",
  email: "office@rec-pan.cz",
  vatID: "CZ23695781",
  areaServed: "Europe",
};

export function breadcrumbData(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function articleData({ title, description, image, path, datePublished, dateModified, articleSection }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: {
      "@type": "ImageObject",
      url: image,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    articleSection,
    author: { "@type": "Organization", name: "RecPan" },
    publisher: {
      "@type": "Organization",
      name: "RecPan",
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${path}` },
  };
}

export default function SEO({ title, description, path = "", image, type = "website", locale = "cs_CZ", language = "en", structuredData, noindex = false }) {
  const canonicalUrl = `${SITE_URL}${path}`;
  const ogImage = image || DEFAULT_OG_IMAGE;
  const structuredDataStr = structuredData ? JSON.stringify(structuredData) : null;
  const alternates = getAlternatePaths(path);
  const enUrl = `${SITE_URL}${alternates.en}`;
  const csUrl = `${SITE_URL}${alternates.cs}`;

  useEffect(() => {
    document.title = title;
    upsertMeta("name", "description", description);

    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    upsertLink("canonical", canonicalUrl);

    upsertLink("alternate", enUrl, "en");
    upsertLink("alternate", csUrl, "cs");
    upsertLink("alternate", enUrl, "x-default");

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("property", "og:image:width", "1200");
    upsertMeta("property", "og:image:height", "630");
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:site_name", "RecPan");
    upsertMeta("property", "og:locale", locale);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", ogImage);

    let scriptTag = document.querySelector('script[data-seo="structured-data"]');
    if (scriptTag) scriptTag.remove();
    if (structuredDataStr) {
      scriptTag = document.createElement("script");
      scriptTag.type = "application/ld+json";
      scriptTag.setAttribute("data-seo", "structured-data");
      scriptTag.textContent = structuredDataStr;
      document.head.appendChild(scriptTag);
    }
  }, [title, description, canonicalUrl, enUrl, csUrl, ogImage, type, locale, language, structuredDataStr, noindex]);

  return null;
}