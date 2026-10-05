import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { usePageMeta } from '../hooks/usePageMeta';
import { getProgram, programs, type Program } from '../data';
import { SITE } from '../data/site';
import Accordion from '../components/Accordion';
import SectionHead from '../components/SectionHead';
import CurriculumRoadmap from '../components/CurriculumRoadmap';
import {
  FAQSplit,
  ProjectFeatured,
  ProjectRail,
  ProgressionTrack,
  SpecStrip,
  TabbedSkillsRoles,
} from '../components/ProgramSections';
import { CertGantt, PortfolioStairs } from '../components/program-extras';
import { SignatureVisual } from '../components/program-visuals';
import { ArrowRight, Check } from '../components/Icons';
import NotFound from './NotFound';

/* Labels for the decorative week rail (session days are illustrative). */
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const SUBNAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'fit', label: 'Fit' },
  { id: 'curriculum', label: 'Curriculum' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'faq', label: 'FAQ' },
];

/* Fixed learning loop — the assessment band renders these as a step flow. */
const ASSESS_FLOW = ['Learn', 'Practice', 'Build', 'Assess', 'Document'];

type RoleTiers = { strong: string[]; possible: string[] };

/** Description lead: bold the first clause (before an em dash) or the first sentence. */
function splitLead(text: string): [string, string] {
  const dash = text.indexOf('\u2014');
  if (dash > 0) return [text.slice(0, dash).trim(), ` ${text.slice(dash)}`];
  const stop = text.search(/\.\s/);
  if (stop > 0) return [text.slice(0, stop + 1), text.slice(stop + 1)];
  return [text, ''];
}

export default function ProgramDetail() {
  const { slug } = useParams<{ slug: string }>();
  const program = slug ? getProgram(slug) : undefined;
  const [activeSection, setActiveSection] = useState('overview');
  const [pastHero, setPastHero] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  useReveal();

  // Sticky sub-nav — track which section is in view (underline + aria-current).
  useEffect(() => {
    setActiveSection('overview');
    setPastHero(false);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-25% 0px -60% 0px' },
    );
    SUBNAV.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [slug]);

  // The sub-nav CTA appears only once the hero has scrolled fully out of view.
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [slug]);

  // Hide the mobile action bar while the on-screen keyboard is open — the visual
  // viewport shrinks well below the layout viewport when a keyboard appears.
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const onResize = () => setKeyboardOpen(window.innerHeight - vv.height > 120);
    onResize();
    vv.addEventListener('resize', onResize);
    return () => vv.removeEventListener('resize', onResize);
  }, []);

  usePageMeta(
    program ? `${program.shortTitle} — NeuroMind` : 'Page Not Found — NeuroMind',
    program
      ? program.tagline
      : 'The page you are looking for does not exist on NeuroMind.',
    { noindex: !program },
  );

  if (!program) return <NotFound />;

  const accentStyle = {
    ['--accent' as string]: program.accent,
    ['--accent-soft' as string]: program.accentSoft,
    ['--accent-strong' as string]: program.accentStrong,
    ['--accent-ink' as string]: program.accentInk,
  };

  // Weekly rhythm derived from the program data (weekly: '2 Hours/Week' | '4 Hours/Week').
  const weeklyHours = Number.parseInt(program.weekly, 10);
  const sessions =
    Number.isFinite(weeklyHours) && weeklyHours > 0 ? Math.max(1, Math.round(weeklyHours / 2)) : 0;
  const hoursPerSession = sessions > 0 ? Math.round(weeklyHours / sessions) : 0;
  // Illustrative slots for the decorative week rail.
  const sessionDays = sessions === 1 ? [2] : [1, 4];

  const [leadStrong, leadRest] = splitLead(program.description);
  const isFoundation = program.category === 'foundation';
  const assessGlance = isFoundation ? 'Major-topic exams' : 'Monthly exams (theory + practical)';
  const assessLine = isFoundation
    ? 'Major-topic examinations + capstone'
    : 'Monthly examinations: theory + practical';

  const featured =
    program.projects.find((p) => p.featured) ?? program.projects[program.projects.length - 1];
  const railProjects = program.projects.filter((p) => p !== featured);

  // roleTiers is optional program data (falls back to the roles list inside the component).
  const roleTiers = (program as Program & { roleTiers?: RoleTiers }).roleTiers;

  // Amber callout: the certNote (or the neutral fallback) plus the fee line only
  // when the note does not already say where fees are paid.
  const certFeeLine = /(issuing (organisation|organization|body)|booked with|separate fees)/i.test(
    program.certNote ?? '',
  )
    ? null
    : 'Exam fees are paid to the certification provider.';

  // Condensed cost note for "Before you start" — existing wording, first sentence only.
  const costNote = program.notes.find((n) => /cost|fees|pricing/i.test(n));
  const costLine = costNote
    ? (costNote.match(/^.*?\.(?=\s|$)/)?.[0] ?? costNote)
    : undefined;

  const glance = [
    { label: 'Program type', value: isFoundation ? '1-Year Foundation' : '3-Year Specialization' },
    { label: 'Entry', value: program.entry },
    { label: 'Duration', value: program.duration },
    { label: 'Weekly commitment', value: program.weekly },
    { label: 'Total hours', value: program.hours },
    { label: 'Assessment', value: assessGlance },
    { label: 'Certification prep', value: `${program.certifications.length} external roadmaps` },
  ];

  return (
    <div className="program-detail-page" data-th={program.signature} style={accentStyle}>
      {/* 1. HERO */}
      <section className="pd-hero" id="hero" ref={heroRef}>
        <div className="container">
          <nav className="breadcrumb pd-crumb mono-label" aria-label="Breadcrumb">
            <Link to="/programs">Programs</Link>
            <span className="sep" aria-hidden="true">/</span>
            <span aria-current="page">{program.shortTitle}</span>
          </nav>

          <div className="pd-hero-grid">
            <div className="pd-hero-lead">
              <h1>{program.title}</h1>
              <p className="pd-hero-tag">{program.tagline}</p>
              <div className="pd-hero-actions">
                <Link to={`/contact?program=${program.slug}`} className="btn btn-primary">
                  Talk to us <ArrowRight />
                </Link>
                <a href="#curriculum" className="btn btn-secondary">
                  View curriculum
                </a>
              </div>
              <p className="pd-micro">{SITE.counsellingNote}</p>
            </div>
            <div className="pd-hero-visual">
              <SignatureVisual variant={program.signature} />
            </div>
          </div>

          <div className="pd-hero-specs">
            <SpecStrip
              items={[
                { label: 'Duration', value: program.duration },
                { label: 'Total hours', value: program.hours },
                { label: 'Weekly commitment', value: program.weekly },
                { label: 'Entry level', value: program.entry },
                { label: 'Next batch', value: program.nextBatch },
              ]}
            />
          </div>

          <div className="pd-hero-track">
            <ProgressionTrack steps={program.progression} />
          </div>
        </div>
      </section>

      {/* 2. STICKY SUB-NAV */}
      <nav className="section-nav" aria-label="On this page">
        <div className="container section-nav-inner">
          {SUBNAV.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={activeSection === s.id ? 'active' : undefined}
              aria-current={activeSection === s.id ? 'true' : undefined}
            >
              {s.label}
            </a>
          ))}
          {pastHero && (
            <Link to={`/contact?program=${program.slug}`} className="section-nav-cta">
              Talk to us
            </Link>
          )}
        </div>
      </nav>

      {/* 3. OVERVIEW */}
      <section className="section" id="overview">
        <div className="container">
          <h2 className="pd-h2">Overview</h2>
          <div className="pd-overview">
            <p className="pd-lead">
              <strong>{leadStrong}</strong>
              {leadRest}
            </p>
            <div className="pd-glance">
              <p className="mono-label pd-glance-title">At a glance</p>
              <dl className="pd-glance-list">
                {glance.map((g) => (
                  <div key={g.label} className="pd-glance-row">
                    <dt className="mono-label">{g.label}</dt>
                    <dd>{g.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FIT */}
      <section className="section" id="fit">
        <div className="container">
          <h2 className="pd-h2">Is this program for you?</h2>
          <div className="pd-fit">
            <div>
              <h3>A good fit if&hellip;</h3>
              <ul className="pd-fit-list">
                {program.fitGood.map((item) => (
                  <li key={item}>
                    <span className="pd-fit-ic" aria-hidden="true">
                      <Check />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Probably not for you if&hellip;</h3>
              <ul className="pd-fit-list">
                {program.fitNot.map((item) => (
                  <li key={item}>
                    <span className="pd-fit-dash" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="pd-reassure">{program.whereYouStart}</p>
        </div>
      </section>

      {/* 5. CURRICULUM */}
      <section className="section" id="curriculum">
        <div className="container">
          <SectionHead
            eyebrow="Curriculum"
            title="Year-by-year roadmap"
            sub={
              program.years.length === 1
                ? 'Twelve months, mapped month by month.'
                : 'Thirty-six months, mapped year by year.'
            }
          />
          <CurriculumRoadmap years={program.years} programTitle={program.shortTitle} />
        </div>
      </section>

      {/* 6. PROJECTS */}
      <section className="section" id="projects">
        <div className="container">
          <h2 className="pd-h2">Hands-on projects</h2>
          {featured && (
            <ProjectFeatured
              project={featured}
              kicker={'Capstone · Year ' + (featured.year ?? 3)}
            />
          )}
          {railProjects.length > 0 && (
            <div className="pd-rail-block">
              <p className="mono-label pd-rail-label">Earlier projects</p>
              <ProjectRail projects={railProjects} />
            </div>
          )}
        </div>
      </section>

      {/* 7. ASSESSMENT STRIP */}
      <section className="pd-band" id="assess">
        <div className="container">
          <div className="pd-assess">
            <span className="mono-label">How you&rsquo;re assessed</span>
            <ol className="pd-flow">
              {ASSESS_FLOW.map((step, i) => (
                <li key={step} className="pd-flow-step">
                  {i > 0 && (
                    <span className="pd-flow-arrow" aria-hidden="true">
                      &rarr;
                    </span>
                  )}
                  <span className="pd-flow-n mono-label">{String(i + 1).padStart(2, '0')}</span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="pd-assess-note">{assessLine}</p>
          </div>
        </div>
      </section>

      {/* 8. CERTIFICATIONS */}
      <section className="section" id="certifications">
        <div className="container">
          <SectionHead eyebrow="Certifications" title="Certification preparation" />
          <CertGantt
            certs={program.certifications.map((c) => ({ name: c.name, role: c.role }))}
            certWindows={program.certWindows}
            totalMonths={program.years.length * 12 || 12}
          />
          <div className="pd-callout reveal">
            <p>{program.certNote ?? 'External certification is optional and not awarded by NeuroMind.'}</p>
            {certFeeLine && <p className="pd-callout-fee">{certFeeLine}</p>}
          </div>
        </div>
      </section>

      {/* 9. PORTFOLIO GROWTH */}
      <section className="section" id="portfolio">
        <div className="container">
          <h2 className="pd-h2">Your portfolio, built over time</h2>
          <PortfolioStairs journey={program.portfolioJourney} />
        </div>
      </section>

      {/* 10. SKILLS & CAREER */}
      <section className="section" id="skills">
        <div className="container">
          <SectionHead eyebrow="Skills & career" title="What you&rsquo;ll be able to do" />
          <TabbedSkillsRoles
            skills={program.skills}
            roles={program.roles}
            roleTiers={roleTiers}
          />
        </div>
      </section>

      {/* 11. BEFORE YOU START */}
      <section className="section" id="before">
        <div className="container">
          <h2 className="pd-h2">Before you start</h2>
          <div className="pd-before">
            <ul className="pd-reqs">
              <li>
                <span className="pd-fit-ic" aria-hidden="true">
                  <Check />
                </span>
                <span>
                  <b>Entry &middot; </b>
                  {program.entry}
                </span>
              </li>
              <li>
                <span className="pd-fit-ic" aria-hidden="true">
                  <Check />
                </span>
                <span>
                  <b>Schedule &middot; </b>
                  {program.calendar}
                </span>
              </li>
              {!program.hardwareSpecs && program.hardware && (
                <li>
                  <span className="pd-fit-ic" aria-hidden="true">
                    <Check />
                  </span>
                  <span>
                    <b>Hardware &middot; </b>
                    {program.hardware}
                  </span>
                </li>
              )}
              {costLine && (
                <li>
                  <span className="pd-fit-dash" aria-hidden="true" />
                  <span>
                    <b>Extra costs &middot; </b>
                    {costLine}
                  </span>
                </li>
              )}
            </ul>

            {program.hardwareSpecs && (
              <div className="pd-hw">
                <p className="mono-label">Laptop requirements</p>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Item</th>
                      <th scope="col">Minimum</th>
                      <th scope="col">Recommended</th>
                    </tr>
                  </thead>
                  <tbody>
                    {program.hardwareSpecs.map((s) => (
                      <tr key={s.item}>
                        <th scope="row">{s.item}</th>
                        <td>{s.min}</td>
                        <td>{s.recommended ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* A typical week — illustrative rhythm; hours derive from the program data */}
          {sessions > 0 && (
            <div className="week-strip reveal pd-week">
              <div className="week-strip-head">
                <div>
                  <p className="mono-label pd-week-label">A typical week</p>
                  <h3 className="week-strip-title">{weeklyHours} hours per week</h3>
                </div>
                <p className="week-strip-meta">
                  <strong>
                    {sessions} session{sessions === 1 ? '' : 's'} × {hoursPerSession} hours
                  </strong>
                  <span className="week-strip-sub">{program.hours} total across the program</span>
                </p>
              </div>
              <div className="week-days" aria-hidden="true">
                {DAY_LABELS.map((day, i) => (
                  <div key={day} className={`week-day${sessionDays.includes(i) ? ' on' : ''}`}>
                    <span className="week-day-label">{day}</span>
                    <span className="week-day-slot">
                      {sessionDays.includes(i) ? `${hoursPerSession}h` : ''}
                    </span>
                  </div>
                ))}
              </div>
              <p className="week-note">Illustrative — actual timings depend on batch schedule</p>
            </div>
          )}

          <div className="pd-notes-acc">
            <Accordion
              title={
                <>
                  <strong>Program notes</strong>
                  <span className="chip" style={{ marginLeft: 8 }}>
                    {program.notes.length}
                  </span>
                </>
              }
            >
              <ul className="pd-notes">
                {program.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </Accordion>
          </div>
        </div>
      </section>

      {/* 12. FAQ */}
      <section className="section" id="faq">
        <div className="container">
          <h2 className="pd-h2">Common questions</h2>
          <FAQSplit
            faqs={program.faqs.slice(0, 6)}
            contactHref={`/contact?program=${program.slug}`}
          />
        </div>
      </section>

      {/* 13. FINAL CTA */}
      <section className="pd-cta" id="cta">
        <div className="pd-cta-band">
          <div className="container pd-cta-inner">
            <div className="pd-cta-copy">
              <h2>Ready to start {program.shortTitle}?</h2>
              <div className="pd-hero-actions">
                <Link to={`/contact?program=${program.slug}`} className="btn btn-primary">
                  Talk to us <ArrowRight />
                </Link>
                <a href="#curriculum" className="btn btn-secondary">
                  View curriculum
                </a>
              </div>
              <p className="pd-micro">{SITE.counsellingNote}</p>
            </div>
            <SignatureVisual variant={program.signature} className="pd-cta-visual" />
          </div>
        </div>
        <div className="container pd-other">
          <h3 className="pd-other-title">Explore other programs</h3>
          <div className="pd-other-links">
            {programs
              .filter((p) => p.slug !== program.slug)
              .map((p) => (
                <Link key={p.slug} to={`/programs/${p.slug}`} className="pd-other-link">
                  <span>
                    <span className="pd-other-name">{p.shortTitle}</span>
                    <span className="pd-other-meta">{p.duration}</span>
                  </span>
                  <ArrowRight />
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Mobile sticky action bar — under 768px only (CSS-gated) */}
      <nav className={`program-cta-bar${keyboardOpen ? ' kb-open' : ''}`} aria-label="Program actions">
        <Link to={`/contact?program=${program.slug}`} className="btn btn-primary program-cta-btn">
          Talk to Us
        </Link>
        <Link to="/programs#compare" className="btn btn-secondary program-cta-btn">
          Compare
        </Link>
      </nav>
    </div>
  );
}
