import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLockBody } from '../hooks/useLockBody';
import { Menu, Close, ArrowRight } from './Icons';

const links = [
  { to: '/programs', label: 'Programs' },
  { to: '/#journey', label: 'Learning Journey' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  useLockBody(drawerOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="container nav-inner">
          <Link to="/" className="nav-logo" aria-label="NeuroMind home">
            <img src="/assets/logo-icon.png" alt="" width={36} height={36} />
            <span className="nav-logo-text">
              Neuro<span>Mind</span>
            </span>
          </Link>

          <nav aria-label="Main navigation">
            <ul className="nav-links">
              {links.map((l) => (
                <li key={l.label}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      isActive && !l.to.includes('#') ? 'active' : undefined
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-cta">
            <Link to="/programs" className="btn btn-primary">
              Explore Programs <ArrowRight />
            </Link>
            <button
              className="nav-toggle"
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-menu"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`drawer-backdrop${drawerOpen ? ' open' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <div
        id="mobile-menu"
        className={`drawer${drawerOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        inert={!drawerOpen}
      >
        <div className="drawer-head">
          <Link to="/" className="nav-logo" onClick={() => setDrawerOpen(false)}>
            <img src="/assets/logo-icon.png" alt="" width={32} height={32} />
            <span className="nav-logo-text">
              Neuro<span>Mind</span>
            </span>
          </Link>
          <button className="nav-toggle" style={{ display: 'flex' }} aria-label="Close navigation menu" onClick={() => setDrawerOpen(false)}>
            <Close />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          <ul className="drawer-links">
            {links.map((l) => (
              <li key={l.label}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    isActive && !l.to.includes('#') ? 'active' : undefined
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Link to="/programs" className="btn btn-primary" onClick={() => setDrawerOpen(false)}>
          Explore Programs <ArrowRight />
        </Link>
        <Link to="/contact" className="btn btn-secondary" onClick={() => setDrawerOpen(false)}>
          Talk to Us
        </Link>
      </div>
    </>
  );
}
