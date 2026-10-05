import { Link } from 'react-router-dom';
import { ArrowRight } from '../components/Icons';
import { usePageMeta } from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta('Page Not Found — NeuroMind', 'The page you are looking for does not exist on NeuroMind.', { noindex: true });
  return (
    <section className="n404">
      <div className="container">
        <div className="code" aria-hidden="true">404</div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: 10 }}>Page not found</h1>
        <p style={{ color: 'var(--ink-3)', maxWidth: 420, marginInline: 'auto', marginBottom: 28 }}>
          The page you are looking for doesn't exist or may have been moved. Let's get you back on
          track.
        </p>
        <div className="n404-programs">
          <p className="n404-programs-label" id="n404-programs-label">
            Popular programs
          </p>
          <div className="n404-links" aria-labelledby="n404-programs-label">
            <Link to="/programs/ai-foundation">AI Foundations</Link>
            <Link to="/programs/data-science-ai">Data Science &amp; AI</Link>
            <Link to="/programs/cybersecurity">Cybersecurity</Link>
            <Link to="/programs/product-ux-ai-design">Product &amp; UX / AI Design</Link>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">
            Back to Home <ArrowRight />
          </Link>
          <Link to="/programs" className="btn btn-secondary">
            Explore Programs
          </Link>
        </div>
      </div>
    </section>
  );
}
