// Build-time prerender: writes one HTML shell per public route with route-specific
// meta (title/description/canonical/OG/Twitter) so link scrapers and non-JS crawlers
// see the right preview, and a 404.html so Vercel returns real 404 statuses for
// unknown URLs instead of the SPA shell.
//
// ponytail: static route map — keep in sync with src/pages/* usePageMeta() calls
// and src/data/* taglines when adding routes.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

const DIST = 'dist';
const ORIGIN = 'https://neuromind-website-nine.vercel.app'; // keep in sync with src/hooks/usePageMeta.ts
const shell = readFileSync(join(DIST, 'index.html'), 'utf8');

const routes = {
  programs: {
    title: 'Programs — NeuroMind',
    desc: 'Explore NeuroMind programs: 1-Year AI Foundations, Data Science & AI, Cybersecurity, and Product & UX / AI Design — all starting from absolute beginner level.',
  },
  'programs/ai-foundation': {
    title: 'AI Foundations — NeuroMind',
    desc: 'From absolute beginner to AI-literate in one structured academic year.',
  },
  'programs/data-science-ai': {
    title: 'Data Science & AI — NeuroMind',
    desc: 'From absolute beginner to professional-level Data Science & AI learning.',
  },
  'programs/cybersecurity': {
    title: 'Cybersecurity — NeuroMind',
    desc: 'From absolute beginner to professional-level cybersecurity capability.',
  },
  'programs/product-ux-ai-design': {
    title: 'Product & UX / AI Design — NeuroMind',
    desc: 'From absolute beginner to professional-level product and AI design capability.',
  },
  about: {
    title: 'About — NeuroMind',
    desc: 'NeuroMind is a technology education institution founded by Jair D Souza, offering structured pathways in AI, Data Science, Cybersecurity and Product & UX design.',
  },
  contact: {
    title: 'Contact — NeuroMind',
    desc: 'Contact NeuroMind. Questions about programs, admissions or choosing the right pathway — see what is available and what is still being set up.',
  },
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function withMeta({ title, desc, path, noindex }) {
  const url = ORIGIN + (path === '/' ? '/' : '/' + path);
  let out = shell.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  out = out.replace(/<meta\s[^>]*>/g, (tag) => {
    const set = (v) => tag.replace(/(content=")[^"]*(")/, `$1${esc(v)}$2`);
    if (/\bname="description"/.test(tag)) return set(desc);
    if (/\bproperty="og:title"/.test(tag)) return set(title);
    if (/\bproperty="og:description"/.test(tag)) return set(desc);
    if (/\bproperty="og:url"/.test(tag)) return set(url);
    if (/\bname="twitter:title"/.test(tag)) return set(title);
    if (/\bname="twitter:description"/.test(tag)) return set(desc);
    return tag;
  });
  out = out.replace(/(<link\s[^>]*rel="canonical"[^>]*href=")[^"]*(")/, `$1${url}$2`);
  if (noindex) {
    out = out.replace(/(<meta\s[^>]*name="robots"[^>]*content=")[^"]*(")/, '$1noindex,follow$2');
  }
  return out;
}

for (const [path, meta] of Object.entries(routes)) {
  const file = join(DIST, `${path}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, withMeta({ ...meta, path }));
  console.log(`prerendered ${path}.html`);
}

// 404: not-found meta, noindex, no canonical (strip it — meaningless on 404).
let nf = withMeta({
  title: 'Page Not Found — NeuroMind',
  desc: 'The page you are looking for does not exist on NeuroMind.',
  path: '/',
  noindex: true,
}).replace(/<link\s[^>]*rel="canonical"[^>]*>\s*/, '');
writeFileSync(join(DIST, '404.html'), nf);
console.log('prerendered 404.html');
