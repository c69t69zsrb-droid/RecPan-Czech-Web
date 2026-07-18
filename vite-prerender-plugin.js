import fs from 'fs';
import path from 'path';
import { newsArticles } from './src/data/newsArticles.js';
import { careerPositions } from './src/data/careerPositions.js';
import { translations } from './src/lib/i18n/translations.js';

const SITE_URL = 'https://rec-pan.eu';
const LOGO_URL = 'https://media.base44.com/images/public/6a42ca6def2b3dfe835b3720/161cbfc87_ChatGPTImageJul7202607_43_34PM.png';
const DEFAULT_OG_IMAGE = 'https://media.base44.com/images/public/6a42ca6def2b3dfe835b3720/abdf0ee40_IMG_06852Large.jpg';

const articleSlugCs = {
  'recpan-at-intersolar-europe': 'recpan-na-intersolar-europe',
  'recpan-begins-international-expansion': 'recpan-zahajuje-mezinarodni-expanzi',
  'new-recycling-facility-under-development': 'vystavba-prvniho-recyklacniho-centra',
};

const articleDates = {
  'recpan-at-intersolar-europe': '2026-06-17',
  'recpan-begins-international-expansion': '2026-06-11',
  'new-recycling-facility-under-development': '2025-11-20',
};

function t(key, lang) {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] ?? entry.cs ?? key;
}

function buildPath(route, lang, params = {}) {
  if (route === 'home') return lang === 'cs' ? '/cs' : '/';
  if (route === 'news') return lang === 'cs' ? '/cs/aktuality' : '/news';
  if (route === 'article') {
    const slug = lang === 'cs' ? (articleSlugCs[params.slug] || params.slug) : params.slug;
    return lang === 'cs' ? `/cs/aktuality/${slug}` : `/news/${slug}`;
  }
  if (route === 'career') return lang === 'cs' ? '/cs/kariera' : '/career';
  if (route === 'position') return lang === 'cs' ? `/cs/kariera/${params.id}` : `/career/${params.id}`;
  return lang === 'cs' ? '/cs' : '/';
}

function getAlternates(route, params = {}) {
  return {
    en: buildPath(route, 'en', params),
    cs: buildPath(route, 'cs', params),
  };
}

const ORGANIZATION_DATA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'RecPan s.r.o.',
  url: SITE_URL,
  logo: LOGO_URL,
  description: 'Next-generation solar panel recycling technology.',
  sameAs: [],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Petrská 1033/66',
    addressLocality: 'Prague',
    postalCode: '110 00',
    addressCountry: 'CZ',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+420603598400',
    email: 'office@rec-pan.cz',
    contactType: 'customer service',
  },
};

const WEBSITE_DATA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'RecPan',
  url: SITE_URL,
};

const LOCAL_BUSINESS_DATA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'RecPan s.r.o.',
  url: SITE_URL,
  image: DEFAULT_OG_IMAGE,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Petrská 1033/66',
    addressLocality: 'Prague',
    postalCode: '110 00',
    addressCountry: 'CZ',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 49.6111,
    longitude: 14.0056,
  },
  telephone: '+420603598400',
  email: 'office@rec-pan.cz',
  areaServed: 'Europe',
};

function breadcrumbData(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

function articleData({ title, description, image, path, datePublished, dateModified, articleSection }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: { '@type': 'ImageObject', url: image },
    datePublished,
    dateModified: dateModified || datePublished,
    articleSection,
    author: { '@type': 'Organization', name: 'RecPan' },
    publisher: {
      '@type': 'Organization',
      name: 'RecPan',
      logo: { '@type': 'ImageObject', url: LOGO_URL },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${path}` },
  };
}

function getRoutes() {
  const routes = [
    { route: 'home', lang: 'en', path: '/', params: {} },
    { route: 'home', lang: 'cs', path: '/cs', params: {} },
    { route: 'news', lang: 'en', path: '/news', params: {} },
    { route: 'news', lang: 'cs', path: '/cs/aktuality', params: {} },
    { route: 'career', lang: 'en', path: '/career', params: {} },
    { route: 'career', lang: 'cs', path: '/cs/kariera', params: {} },
  ];

  for (const article of newsArticles) {
    routes.push({
      route: 'article', lang: 'en',
      path: buildPath('article', 'en', { slug: article.slug }),
      params: { slug: article.slug },
      article,
    });
    routes.push({
      route: 'article', lang: 'cs',
      path: buildPath('article', 'cs', { slug: article.slug }),
      params: { slug: article.slug },
      article,
    });
  }

  for (const pos of careerPositions) {
    routes.push({
      route: 'position', lang: 'en',
      path: buildPath('position', 'en', { id: pos.id }),
      params: { id: pos.id },
      position: pos,
    });
    routes.push({
      route: 'position', lang: 'cs',
      path: buildPath('position', 'cs', { id: pos.id }),
      params: { id: pos.id },
      position: pos,
    });
  }

  return routes;
}

function getMetadata(routeDef) {
  const { route, lang, params, article, position } = routeDef;
  const alternates = getAlternates(route, params);
  const canonical = routeDef.path;
  const locale = lang === 'cs' ? 'cs_CZ' : 'en_US';

  if (route === 'home') {
    return {
      title: t('seo.home.title', lang),
      description: t('seo.home.desc', lang),
      canonical, alternates, locale, lang,
      image: DEFAULT_OG_IMAGE,
      type: 'website',
      structuredData: [ORGANIZATION_DATA, WEBSITE_DATA, LOCAL_BUSINESS_DATA],
    };
  }

  if (route === 'news') {
    return {
      title: t('seo.news.title', lang),
      description: t('news.pageDesc', lang),
      canonical, alternates, locale, lang,
      image: DEFAULT_OG_IMAGE,
      type: 'website',
      structuredData: [
        breadcrumbData([
          { name: lang === 'cs' ? 'Domů' : 'Home', path: buildPath('home', lang) },
          { name: t('news.pageTitle', lang), path: buildPath('news', lang) },
        ]),
      ],
    };
  }

  if (route === 'career') {
    return {
      title: t('seo.career.title', lang),
      description: t('seo.career.desc', lang),
      canonical, alternates, locale, lang,
      image: DEFAULT_OG_IMAGE,
      type: 'website',
      structuredData: [
        breadcrumbData([
          { name: lang === 'cs' ? 'Domů' : 'Home', path: buildPath('home', lang) },
          { name: t('career.label', lang), path: buildPath('career', lang) },
        ]),
      ],
    };
  }

  if (route === 'article') {
    const tr = article.translations[lang];
    return {
      title: `${tr.title} | RecPan`,
      description: tr.excerpt,
      canonical, alternates, locale, lang,
      image: article.image,
      type: 'article',
      structuredData: [
        articleData({
          title: tr.title,
          description: tr.excerpt,
          image: article.image,
          path: canonical,
          datePublished: articleDates[article.slug],
          dateModified: articleDates[article.slug],
          articleSection: tr.category,
        }),
        breadcrumbData([
          { name: lang === 'cs' ? 'Domů' : 'Home', path: buildPath('home', lang) },
          { name: lang === 'cs' ? 'Aktuality' : 'News', path: buildPath('news', lang) },
          { name: tr.title, path: canonical },
        ]),
      ],
    };
  }

  if (route === 'position') {
    return {
      title: `${position.title[lang]} | RecPan`,
      description: position.shortDescription[lang],
      canonical, alternates, locale, lang,
      image: position.image,
      type: 'website',
      structuredData: [
        breadcrumbData([
          { name: lang === 'cs' ? 'Domů' : 'Home', path: buildPath('home', lang) },
          { name: t('career.label', lang), path: buildPath('career', lang) },
          { name: position.title[lang], path: canonical },
        ]),
      ],
    };
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function generatePrerenderedHtml(template, routeDef) {
  const meta = getMetadata(routeDef);
  let html = template;

  html = html.replace(/<html\s+lang="[^"]*"/, `<html lang="${meta.lang}"`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);
  html = html.replace(/<meta\s+name="description"[^>]*>/, `<meta name="description" content="${escapeHtml(meta.description)}" />`);
  html = html.replace(/<link\s+rel="canonical"[^>]*>/, `<link rel="canonical" href="${SITE_URL}${meta.canonical}" />`);
  html = html.replace(/<link\s+rel="alternate"\s+hreflang="en"[^>]*>/, `<link rel="alternate" hreflang="en" href="${SITE_URL}${meta.alternates.en}" />`);
  html = html.replace(/<link\s+rel="alternate"\s+hreflang="cs"[^>]*>/, `<link rel="alternate" hreflang="cs" href="${SITE_URL}${meta.alternates.cs}" />`);
  html = html.replace(/<link\s+rel="alternate"\s+hreflang="x-default"[^>]*>/, `<link rel="alternate" hreflang="x-default" href="${SITE_URL}${meta.alternates.en}" />`);
  html = html.replace(/<meta\s+property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(meta.title)}" />`);
  html = html.replace(/<meta\s+property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(meta.description)}" />`);
  html = html.replace(/<meta\s+property="og:url"[^>]*>/, `<meta property="og:url" content="${SITE_URL}${meta.canonical}" />`);
  html = html.replace(/<meta\s+property="og:locale"[^>]*>/, `<meta property="og:locale" content="${meta.locale}" />`);
  html = html.replace(/<meta\s+property="og:image"[^>]*>/, `<meta property="og:image" content="${meta.image}" />`);
  html = html.replace(/<meta\s+property="og:type"[^>]*>/, `<meta property="og:type" content="${meta.type}" />`);
  html = html.replace(/<meta\s+name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`);
  html = html.replace(/<meta\s+name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`);
  html = html.replace(/<meta\s+name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${meta.image}" />`);

  // Remove all existing JSON-LD scripts, inject route-specific one
  html = html.replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, '');
  const jsonLd = JSON.stringify(meta.structuredData);
  html = html.replace('</head>', `  <script type="application/ld+json" data-seo="structured-data">${jsonLd}</script>\n  </head>`);

  return html;
}

export default function prerenderPlugin() {
  let processed = false;

  return {
    name: 'recpan-prerender',
    enforce: 'post',

    generateBundle(_options, bundle) {
      const indexAsset = bundle['index.html'];
      if (!indexAsset) {
        console.warn('[prerender] index.html not in bundle during generateBundle, will try writeBundle');
        return;
      }

      const template = typeof indexAsset.source === 'string'
        ? indexAsset.source
        : Buffer.from(indexAsset.source).toString('utf-8');

      const routes = getRoutes();

      for (const route of routes) {
        const html = generatePrerenderedHtml(template, route);
        if (route.path === '/') {
          indexAsset.source = html;
        } else {
          const fileName = `${route.path.replace(/^\//, '')}/index.html`;
          this.emitFile({ type: 'asset', fileName, source: html });
        }
      }

      processed = true;
      console.log(`[prerender] Generated ${routes.length} prerendered routes`);
    },

    writeBundle(options) {
      if (processed) return;

      const outDir = options.dir || path.resolve('dist');
      const indexHtmlPath = path.join(outDir, 'index.html');

      if (!fs.existsSync(indexHtmlPath)) {
        console.warn('[prerender] index.html not found at', indexHtmlPath);
        return;
      }

      const template = fs.readFileSync(indexHtmlPath, 'utf-8');
      const routes = getRoutes();

      for (const route of routes) {
        const html = generatePrerenderedHtml(template, route);
        const routeDir = route.path === '/'
          ? outDir
          : path.join(outDir, route.path.replace(/^\//, ''));

        fs.mkdirSync(routeDir, { recursive: true });
        fs.writeFileSync(path.join(routeDir, 'index.html'), html);
      }

      processed = true;
      console.log(`[prerender] Generated ${routes.length} prerendered routes (via writeBundle fallback)`);
    },
  };
}