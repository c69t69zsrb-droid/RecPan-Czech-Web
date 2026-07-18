import { newsArticles } from './src/data/newsArticles.js';
import { careerPositions } from './src/data/careerPositions.js';

const SITE_URL = 'https://rec-pan.cz';

const articleDates = {
  'recpan-at-intersolar-europe': '2026-06-17',
  'recpan-begins-international-expansion': '2026-06-11',
  'new-recycling-facility-under-development': '2025-11-20',
};

function generateSitemapXml() {
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    { loc: '/', lastmod: today, changefreq: 'weekly', priority: '1.0' },
    { loc: '/news', lastmod: today, changefreq: 'weekly', priority: '0.8' },
    { loc: '/career', lastmod: today, changefreq: 'weekly', priority: '0.8' },
  ];

  const articlePages = newsArticles.map((a) => ({
    loc: `/news/${a.slug}`,
    lastmod: articleDates[a.slug] || today,
    changefreq: 'monthly',
    priority: '0.7',
  }));

  const positionPages = careerPositions.map((p) => ({
    loc: `/career/${p.id}`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.6',
  }));

  const allPages = [...staticPages, ...articlePages, ...positionPages];

  const urls = allPages
    .map((page) => {
      const fullUrl = `${SITE_URL}${page.loc}`;
      return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="cs" href="${fullUrl}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${fullUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${fullUrl}"/>
  </url>`;
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