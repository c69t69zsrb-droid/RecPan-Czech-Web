import { newsArticles } from './src/data/newsArticles.js';
import { careerPositions } from './src/data/careerPositions.js';

const SITE_URL = 'https://rec-pan.eu';

const articleSlugCs = {
  'recpan-expanding-team-pribram': 'recpan-rozsiruje-tym-pribram',
  'recpan-at-intersolar-europe': 'recpan-na-intersolar-europe',
  'recpan-begins-international-expansion': 'recpan-zahajuje-mezinarodni-expanzi',
  'new-recycling-facility-under-development': 'vystavba-prvniho-recyklacniho-centra',
};

const articleDates = {
  'recpan-expanding-team-pribram': '2026-07-18',
  'recpan-at-intersolar-europe': '2026-06-17',
  'recpan-begins-international-expansion': '2026-06-11',
  'new-recycling-facility-under-development': '2025-11-20',
};

function buildEnPath(route, params = {}) {
  switch (route) {
    case 'home': return '/';
    case 'news': return '/news';
    case 'article': return `/news/${params.slug}`;
    case 'career': return '/career';
    case 'position': return `/career/${params.id}`;
    default: return '/';
  }
}

function buildCsPath(route, params = {}) {
  switch (route) {
    case 'home': return '/cs';
    case 'news': return '/cs/aktuality';
    case 'article': return `/cs/aktuality/${articleSlugCs[params.slug] || params.slug}`;
    case 'career': return '/cs/kariera';
    case 'position': return `/cs/kariera/${params.id}`;
    default: return '/cs';
  }
}

function generateSitemapXml() {
  const today = new Date().toISOString().split('T')[0];

  const allPages = [
    { route: 'home', lastmod: today, changefreq: 'weekly', priority: '1.0' },
    { route: 'news', lastmod: today, changefreq: 'weekly', priority: '0.8' },
    ...newsArticles.map((a) => ({
      route: 'article',
      slug: a.slug,
      lastmod: articleDates[a.slug] || today,
      changefreq: 'monthly',
      priority: '0.7',
    })),
    { route: 'career', lastmod: today, changefreq: 'weekly', priority: '0.8' },
    ...careerPositions.map((p) => ({
      route: 'position',
      id: p.id,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.6',
    })),
  ];

  const urls = allPages
    .map((page) => {
      const params = page.slug ? { slug: page.slug } : page.id ? { id: page.id } : {};
      const enPath = buildEnPath(page.route, params);
      const csPath = buildCsPath(page.route, params);
      const enUrl = `${SITE_URL}${enPath}`;
      const csUrl = `${SITE_URL}${csPath}`;

      const alternates = [
        `    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>`,
        `    <xhtml:link rel="alternate" hreflang="cs" href="${csUrl}"/>`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>`,
      ].join('\n');

      return [
        `  <url>
    <loc>${enUrl}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${alternates}
  </url>`,
        `  <url>
    <loc>${csUrl}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${alternates}
  </url>`,
      ].join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;
}

export default function generateSitemapPlugin() {
  return {
    name: 'recpan-sitemap',
    configureServer(server) {
      server.middlewares.use('/sitemap.xml', (_req, res) => {
        const xml = generateSitemapXml();
        res.setHeader('Content-Type', 'application/xml');
        res.end(xml);
      });
    },
    generateBundle() {
      const xml = generateSitemapXml();
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: xml,
      });
    },
  };
}