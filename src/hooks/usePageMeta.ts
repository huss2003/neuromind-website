import { useEffect } from 'react';

const DEFAULT_TITLE = 'NeuroMind — Technology Education Pathways';
const DEFAULT_DESC =
  'NeuroMind offers structured technology education pathways in AI, Data Science, Cybersecurity and Product & UX design — from absolute beginner foundations to professional-level skills, projects and portfolios.';

function setMeta(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

/** Sets document.title + meta description per page; restores defaults on unmount. */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) setMeta('description', description);
    return () => {
      document.title = DEFAULT_TITLE;
      setMeta('description', DEFAULT_DESC);
    };
  }, [title, description]);
}
