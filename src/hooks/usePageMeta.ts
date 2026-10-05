import { useEffect } from 'react';

const DEFAULT_TITLE = 'NeuroMind — Technology Education Pathways';
const DEFAULT_DESC =
  'NeuroMind offers structured technology education pathways in AI, Data Science, Cybersecurity and Product & UX design — from absolute beginner foundations to professional-level skills, projects and portfolios.';

/** Canonical production origin — keep in sync with index.html and robots.txt. */
const SITE = 'https://neuromind-website-nine.vercel.app';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let meta = document.querySelector(`meta[${attr}="${key}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attr, key);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

/** Absolute, self-referencing canonical + og:url for the current route. */
function setCanonical(path: string) {
  const href = `${SITE}${path === '/' ? '/' : path.replace(/\/$/, '')}`;
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
  setMeta('property', 'og:url', href);
}

/** Sets title, description, canonical and og:url per page; restores defaults on unmount. */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    if (description) setMeta('property', 'og:description', description);
    setCanonical(window.location.pathname);
    return () => {
      document.title = DEFAULT_TITLE;
      setMeta('name', 'description', DEFAULT_DESC);
    };
  }, [title, description]);
}
