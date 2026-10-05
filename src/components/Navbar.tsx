import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLockBody } from '../hooks/useLockBody';
import { programs } from '../data';
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
  const [programsOpen, setProgramsOpen] = useState(false);
  const programsRef = useRef<HTMLLIElement>(null);
  const programsBtnRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  // Distinguishes hover-opened from click/keyboard-opened: on hover-capable
  // devices the pointer opens the menu before a click lands, so the first
  // click must NOT immediately toggle it shut (it "confirms" the hover).
  const openedByHover = useRef(false);
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
    setProgramsOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setDrawerOpen(false);
      if (programsOpen) {
        setProgramsOpen(false);
        programsBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [programsOpen]);

  useEffect(() => {
    if (!programsOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!programsRef.current?.contains(e.target as Node)) setProgramsOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [programsOpen]);

  // Hover open is skipped on touch input (tap would fire mouseenter then click,
  // opening and closing in one tap).
  const openPrograms = () => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    window.clearTimeout(closeTimer.current);
    openedByHover.current = true;
    setProgramsOpen(true);
  };
  // Small close delay so the pointer can cross from the trigger to the panel.
  const closeProgramsSoon = () => {
    if (programsRef.current?.contains(document.activeElement)) return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setProgramsOpen(false), 120);
  };

  const isProgramsSection = location.pathname.startsWith('/programs');

  // Any close (hover-away, Escape, outside click, route change) resets the flag.
  useEffect(() => {
    if (!programsOpen) openedByHover.current = false;
  }, [programsOpen]);

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
              <li
                className="nav-programs"
                ref={programsRef}
                onMouseEnter={openPrograms}
                onMouseLeave={closeProgramsSoon}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setProgramsOpen(false);
                }}
              >
                <button
                  ref={programsBtnRef}
                  type="button"
                  className={`nav-programs-btn${isProgramsSection ? ' active' : ''}`}
                  aria-expanded={programsOpen}
                  aria-haspopup="true"
                  aria-controls="programs-dropdown"
                  onClick={() => {
                    if (openedByHover.current) {
                      openedByHover.current = false; // first click confirms hover-open
                      return;
                    }
                    setProgramsOpen((open) => !open);
                  }}
                >
                  Programs
                </button>
                <div
                  id="programs-dropdown"
                  className={`nav-drop${programsOpen ? ' open' : ''}`}
                  onClick={() => setProgramsOpen(false)}
                >
                  <ul className="nav-drop-list">
                    {programs.map((p) => (
                      <li key={p.slug}>
                        <Link to={`/programs/${p.slug}`}>
                          <span className="nav-drop-name">{p.shortTitle}</span>
                          <span className="nav-drop-chips">
                            <span className="chip chip-neutral">{p.duration}</span>
                            <span className="chip chip-neutral">{p.entry}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="nav-drop-foot">
                    <Link to="/programs#compare">Compare all programs</Link>
                    <Link to="/programs">Help me choose</Link>
                  </div>
                </div>
              </li>
              {links
                .filter((l) => l.to !== '/programs')
                .map((l) => (
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
            <Link to="/contact" className="btn btn-primary">
              Talk to Us <ArrowRight />
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
