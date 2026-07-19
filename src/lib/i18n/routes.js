// Article slug translations (EN slug → CS slug)
const articleSlugCs = {
  "recpan-expanding-team-pribram": "recpan-rozsiruje-tym-pribram",
  "recpan-at-intersolar-europe": "recpan-na-intersolar-europe",
  "recpan-begins-international-expansion": "recpan-zahajuje-mezinarodni-expanzi",
  "new-recycling-facility-under-development": "vystavba-prvniho-recyklacniho-centra",
};

// Reverse mapping (CS slug → EN slug)
const articleSlugEn = Object.fromEntries(
  Object.entries(articleSlugCs).map(([en, cs]) => [cs, en])
);

// Translate a slug to the target language
export function translateArticleSlug(slug, targetLang) {
  if (targetLang === "cs") {
    return articleSlugCs[slug] || slug;
  }
  return articleSlugEn[slug] || slug;
}

// Get language from pathname
export function getLanguageFromPath(pathname) {
  return pathname.startsWith("/cs") ? "cs" : "en";
}

// Parse current path to determine route, language, and params
export function parsePath(pathname) {
  let path = pathname;
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  if (path === "") path = "/";

  const lang = path.startsWith("/cs") ? "cs" : "en";
  const rest = lang === "cs" ? (path.slice(3) || "/") : path;

  if (rest === "/" || rest === "") {
    return { route: "home", lang, params: {} };
  }

  const segments = rest.split("/").filter(Boolean);

  if (lang === "en") {
    if (segments[0] === "news") {
      if (segments.length === 1) return { route: "news", lang, params: {} };
      if (segments.length === 2) return { route: "article", lang, params: { slug: segments[1] } };
    }
    if (segments[0] === "career") {
      if (segments.length === 1) return { route: "career", lang, params: {} };
      if (segments.length === 2) return { route: "position", lang, params: { id: segments[1] } };
    }
  } else {
    if (segments[0] === "aktuality") {
      if (segments.length === 1) return { route: "news", lang, params: {} };
      if (segments.length === 2) return { route: "article", lang, params: { slug: segments[1] } };
    }
    if (segments[0] === "kariera") {
      if (segments.length === 1) return { route: "career", lang, params: {} };
      if (segments.length === 2) return { route: "position", lang, params: { id: segments[1] } };
    }
  }

  return { route: "unknown", lang, params: {} };
}

// Build a path for a given route, language, and params
export function buildPath(route, lang, params = {}) {
  if (route === "home") {
    return lang === "cs" ? "/cs" : "/";
  }
  if (route === "news") {
    return lang === "cs" ? "/cs/aktuality" : "/news";
  }
  if (route === "article") {
    const slug = translateArticleSlug(params.slug || "", lang);
    return lang === "cs" ? `/cs/aktuality/${slug}` : `/news/${slug}`;
  }
  if (route === "career") {
    return lang === "cs" ? "/cs/kariera" : "/career";
  }
  if (route === "position") {
    const id = params.id || "";
    return lang === "cs" ? `/cs/kariera/${id}` : `/career/${id}`;
  }
  return lang === "cs" ? "/cs" : "/";
}

// Get the equivalent path in the target language
export function getTranslatedPath(pathname, targetLang) {
  const { route, params } = parsePath(pathname);
  if (route === "unknown") {
    return targetLang === "cs" ? "/cs" : "/";
  }
  return buildPath(route, targetLang, params);
}

// Get both language versions of a path (for hreflang)
export function getAlternatePaths(pathname) {
  return {
    en: getTranslatedPath(pathname, "en"),
    cs: getTranslatedPath(pathname, "cs"),
  };
}