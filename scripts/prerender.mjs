// Post-build: inject the server-rendered page and AEO/SEO structured data into dist/index.html.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');
const SITE = 'https://next3media.com/';

const { render, faqs, services, cities, contact } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);

const appHtml = render();

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE}#website`,
      url: SITE,
      name: 'NEXT3 Media',
      inLanguage: 'en-IN',
      publisher: { '@id': `${SITE}#org` },
    },
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE}#org`,
      name: 'NEXT3 Media',
      slogan: 'Innovate. Automate. Elevate.',
      description:
        'NEXT3 Media is a media and communications agency in Bengaluru and Hyderabad, India, offering public relations, corporate events, weddings, photography and videography, film and ad production, and digital, social and influencer marketing.',
      url: SITE,
      logo: `${SITE}logo.webp`,
      image: `${SITE}og-image.jpg`,
      email: contact.email,
      areaServed: cities.map((c) => ({ '@type': 'City', name: c.name })),
      address: cities.map((c) => ({
        '@type': 'PostalAddress', addressLocality: c.name, addressRegion: c.state, addressCountry: 'IN',
      })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'NEXT3 Media services',
        itemListElement: services.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.title,
            description: s.text,
            provider: { '@id': `${SITE}#org` },
            areaServed: cities.map((c) => c.name),
          },
        })),
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE}#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

const file = path.join(dist, 'index.html');
let html = fs.readFileSync(file, 'utf8');
if (!html.includes('<div id="root"></div>')) throw new Error('root placeholder not found');
html = html
  .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  .replace(
    '</head>',
    `  <script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>\n  </head>`
  );
fs.writeFileSync(file, html);
fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`prerendered ${Math.round(appHtml.length / 1024)} KB of HTML + structured data`);
