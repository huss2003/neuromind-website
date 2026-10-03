import { Link } from 'react-router-dom';
import { ArrowRight } from '../components/Icons';
import { usePageMeta } from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta('Page Not Found — NeuroMind');
  return (
    <section className="n404">
      <div className="container">
        <div className="code" aria-hidden="true">404</div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: 10 }}>Page not found</h1>
        <p style={{ color: 'var(--ink-3)', maxWidth: 420, marginInline: 'auto', marginBottom: 28 }}>
          The page you are looking for doesn't exist or may have been moved. Let's get you back on
          track.
        </p>
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
