import { Link } from 'react-router-dom';
import { programs } from '../data';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="nav-logo" aria-label="NeuroMind home">
              <img src="/assets/logo-icon.png" alt="" width={36} height={36} />
              <span className="nav-logo-text">
                Neuro<span style={{ color: '#60a5fa' }}>Mind</span>
              </span>
            </Link>
            <p className="footer-tagline">
              Structured technology education pathways — from absolute beginner foundations toward
              advanced practical skills, projects and professional portfolios.
            </p>
            <p className="footer-tagline" style={{ marginTop: 12, fontWeight: 600, color: '#94a3b8', letterSpacing: '0.12em', fontSize: '0.75rem' }}>
              EXPLORE · BUILD · CREATE
            </p>
          </div>

          <div>
            <h2 className="footer-heading">Programs</h2>
            <ul className="footer-links">
              {programs.map((p) => (
                <li key={p.slug}>
                  <Link to={`/programs/${p.slug}`}>{p.shortTitle}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer-heading">Explore</h2>
            <ul className="footer-links">
              <li><Link to="/programs">All Programs</Link></li>
              <li><Link to="/#why">Why NeuroMind</Link></li>
              <li><Link to="/#journey">Learning Journey</Link></li>
              <li><Link to="/#projects">Projects</Link></li>
              <li><Link to="/#certification">Certification Prep</Link></li>
              <li><Link to="/#compare">Compare Programs</Link></li>
              <li><Link to="/#faq">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="footer-heading">Institution</h2>
            <ul className="footer-links">
              <li><Link to="/about">About NeuroMind</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/contact">Program Inquiry</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} <strong>NeuroMind</strong>. All rights reserved.
          </span>
          <span>Founder — Jair D Souza</span>
        </div>
      </div>
    </footer>
  );
}
