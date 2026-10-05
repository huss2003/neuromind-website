import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { usePageMeta } from '../hooks/usePageMeta';
import { getProgram, programs } from '../data';
import Accordion from '../components/Accordion';
import CtaSection from '../components/CtaSection';
import NotFound from './NotFound';
import { ArrowRight, Check } from '../components/Icons';

export default function ProgramDetail() {
  const { slug } = useParams<{ slug: string }>();
  const program = slug ? getProgram(slug) : undefined;
  const [openYear, setOpenYear] = useState<number>(1);
  const [activeSection, setActiveSection] = useState('overview');
  useReveal();

  useEffect(() => {
    setOpenYear(1);
  }, [slug]);

  // Sticky "on this page" nav — track which section is in view
  useEffect(() => {
    const ids = ['overview', 'for-you', 'curriculum', 'projects', 'certification', 'faq'];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-25% 0px -60% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [slug]);

  usePageMeta(
    program ? `${program.shortTitle} — NeuroMind` : 'Program — NeuroMind',
    program?.tagline,
  );

  if (!program) return <NotFound />;

  const accentStyle = {
    ['--accent' as string]: program.accent,
    ['--accent-soft' as string]: program.accentSoft,
    ['--accent-strong' as string]: program.accentStrong,
    ['--accent-ink' as string]: program.accentInk,
  };

  return (
    <div style={accentStyle}>
      {/* HERO */}
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="sep" aria-hidden="true">/</span>
            <a href="/programs">Programs</a>
            <span className="sep" aria-hidden="true">/</span>
            <span aria-current="page">{program.shortTitle}</span>
          </nav>

          <span className="eyebrow">{program.category === 'foundation' ? 'Foundation Program' : 'Professional Program'}</span>
          <h1>{program.title}</h1>
          <p className="hero-sub">{program.tagline}</p>

          <div className="detail-facts">
            <div className="detail-fact">
              <span className="df-val">{program.hours.replace(' Hours', '')}</span>
              <span className="df-lab">Total Hours</span>
            </div>
            <div className="detail-fact">
              <span className="df-val">{program.duration.split('·')[0].trim()}</span>
              <span className="df-lab">Duration</span>
            </div>
            <div className="detail-fact">
              <span className="df-val">{program.weekly.replace(' Hours/Week', ' hrs/wk')}</span>
              <span className="df-lab">Weekly Commitment</span>
            </div>
            <div className="detail-fact">
              <span className="df-val">{program.entry}</span>
              <span className="df-lab">Entry Level</span>
            </div>
          </div>

          <div className="detail-progression">
            <span className="dp-label">Progression:</span>
            {program.progression.map((stage, i) => (
              <span key={stage} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                {i > 0 && <span className="dp-arrow" aria-hidden="true">→</span>}
                <span className="dp-stage">{stage}</span>
              </span>
            ))}
          </div>

          <div className="hero-actions" style={{ marginTop: 28, marginBottom: 0 }}>
            <a href="#curriculum" className="btn btn-primary">
              Explore Curriculum <ArrowRight />
            </a>
            <Link to="/contact" className="btn btn-secondary">
              Talk to NeuroMind
            </Link>
          </div>
        </div>
      </section>

      {/* ON THIS PAGE */}
      <nav className="section-nav" aria-label="On this page">
        <div className="container section-nav-inner">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'for-you', label: 'Is It For You?' },
            { id: 'curriculum', label: 'Curriculum' },
            { id: 'projects', label: 'Projects' },
            { id: 'certification', label: 'Certification' },
            { id: 'faq', label: 'FAQ' },
          ].map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={activeSection === s.id ? 'active' : undefined}
              aria-current={activeSection === s.id ? 'true' : undefined}
            >
              {s.label}
            </a>
          ))}
          <Link to="/contact" className="section-nav-cta">
            Ask a Question
          </Link>
        </div>
      </nav>

      {/* DESCRIPTION */}
      <section className="section-tight" id="overview">
        <div className="container container-narrow">
          <p className="reveal" style={{ fontSize: '1.0625rem', color: 'var(--ink-2)', lineHeight: 1.8 }}>
            {program.description}
          </p>
        </div>
      </section>

      {/* IS THIS FOR YOU */}
      <section className="section bg-soft" id="for-you">
        <div className="container">
          <div className="fit-grid">
            <div className="reveal">
              <span className="eyebrow">Is This Program For You?</span>
              <h2 className="section-title" style={{ marginBottom: 24 }}>This program may be suitable if you:</h2>
              <ul className="fit-list">
                {program.suitableFor.map((item) => (
                  <li key={item}>
                    <span className="check" aria-hidden="true"><Check /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal reveal-d2">
              <div className="fit-note">
                <div className="accent-bar" aria-hidden="true" />
                <h3>Before you choose</h3>
                <p style={{ marginBottom: 16 }}>{program.beforeYouChoose}</p>
                <h3 style={{ marginTop: 20 }}>Where you start</h3>
                <p>{program.whereYouStart}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHERE YOU PROGRESS */}
      <section className="section">
        <div className="container container-narrow" style={{ textAlign: 'center' }}>
          <div className="reveal">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Where You Progress</span>
            <h2 className="section-title">By the end of this program, you will be at:</h2>
            <div className="prog-strip reveal" style={{ marginTop: 32, maxWidth: 720, marginInline: 'auto' }}>
              {program.progression.map((stage, i) => {
                const colors = ['#2563EB', '#7C3AED', '#06B6D4', '#10B981', '#F59E0B'];
                return (
                  <div key={stage} className="prog-strip-step" style={{ ['--strip-color' as string]: colors[i % 5] }}>
                    <div className="prog-strip-num">{String(i + 1).padStart(2, '0')}</div>
                    <div className="prog-strip-label">{stage}</div>
                  </div>
                );
              })}
            </div>
            <p className="section-sub reveal" style={{ marginTop: 28, maxWidth: 560, marginInline: 'auto' }}>
              {program.whereYouProgress}
            </p>
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="section bg-soft" id="curriculum">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Curriculum</span>
            <h2 className="section-title">Year-by-year journey</h2>
            <p className="section-sub">
              {program.years.length === 1
                ? 'A structured 12-month journey through the complete curriculum.'
                : `A structured ${program.years.length}-year journey. Expand each year to see the month-by-month curriculum.`}
            </p>
          </div>

          {/* Factual year-by-year timeline — hours and themes derive from the curriculum data */}
          <ol className="year-timeline reveal" aria-label="Year-by-year timeline">
            {program.years.map((year) => {
              const yearHours = year.months.reduce((s, m) => s + (m.hours ?? 0), 0);
              // ponytail: themes split from year.focus text; promote to a data field if a year summary ever lacks a comma list
              const themes = year.focus
                .split('—')[0]
                .split(/,| and /)
                .map((t) => t.trim().replace(/\.$/, ''))
                .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
                .filter((t) => t.length > 2)
                .slice(0, 4);
              return (
                <li key={year.n} className="year-tl-step">
                  <span className="year-tl-marker" aria-hidden="true">{year.n}</span>
                  <div className="year-tl-card">
                    <div className="year-tl-head">
                      <strong className="year-tl-title">Year {year.n} — {year.label}</strong>
                      <span className="year-tl-hours">{yearHours} hours</span>
                    </div>
                    <ul className="year-tl-themes">
                      {themes.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="year-glance-grid">
            {program.years.map((year) => (
              <div key={year.n} className="year-glance">
                <div className="yg-head">
                  <strong>
                    Year {year.n} — {year.label}
                  </strong>
                  <span className="chip">
                    {year.months.length} Months · {year.months.reduce((s, m) => s + (m.hours ?? 0), 0)} Hours
                  </span>
                </div>
                <p className="yg-focus">{year.focus}</p>
                <p className="yg-topics">{year.months.map((m) => m.title).join(' · ')}</p>
              </div>
            ))}
          </div>

          <div className="accordion">
            {program.years.map((year) => (
              <Accordion
                key={year.n}
                defaultOpen={year.n === openYear}
                title={
                  <>
                    <strong style={{ fontFamily: 'var(--font-head)', fontSize: '1.0625rem' }}>
                      Year {year.n} — {year.label}
                    </strong>
                  </>
                }
                meta={
                  <span className="chip" style={{ marginLeft: 8 }}>
                    {year.months.length} Months · {year.months.reduce((s, m) => s + (m.hours ?? 0), 0)} Hours
                  </span>
                }
                onOpenChange={(open) => open && setOpenYear(year.n)}
              >
                <p style={{ fontSize: '0.9375rem', color: 'var(--ink-3)', marginBottom: 16, lineHeight: 1.6 }}>
                  {year.focus}
                </p>
                <div className="month-list">
                  {year.months.map((month) => (
                    <Accordion
                      key={month.n}
                      level="month"
                      title={month.title}
                      meta={`M${month.n}`}
                    >
                      <div className="month-detail-grid">
                        <div className="month-detail full">
                          <h5>Core Topics &amp; Skills</h5>
                          <p>{month.core}</p>
                        </div>
                        {month.labs && (
                          <div className="month-detail">
                            <h5>Hands-On Work</h5>
                            <p>{month.labs}</p>
                          </div>
                        )}
                        <div className="month-detail">
                          <h5>Portfolio Output</h5>
                          <p>{month.portfolio}</p>
                        </div>
                        <div className="month-detail">
                          <h5>Assessment</h5>
                          <p>{month.assessment}</p>
                        </div>
                        {month.hours !== undefined && (
                          <div className="month-detail">
                            <h5>Hours</h5>
                            <p>
                              {month.hours} hours{month.weeks ? ` · ${month.weeks} weeks` : ''}
                            </p>
                          </div>
                        )}
                        {month.stage && (
                          <div className="month-detail">
                            <h5>Stage</h5>
                            <p>{month.stage}</p>
                          </div>
                        )}
                      </div>
                    </Accordion>
                  ))}
                </div>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section" id="projects">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Hands-On Projects</span>
            <h2 className="section-title">Projects designed to become portfolio evidence.</h2>
            <p className="section-sub">
              Each project below is part of the published curriculum — they are curriculum
              projects, not completed student work or testimonials. Every project develops
              specific skills and creates documented output for the student portfolio.
            </p>
          </div>
          <div className="grid-3">
            {program.projects.map((proj, i) => (
              <article
                key={proj.title}
                className={`project-card reveal reveal-d${(i % 3) + 1}`}
              >
                <span className="chip chip-neutral project-badge">Curriculum project</span>
                <h3>{proj.title}</h3>
                <p className="skills">
                  <b>Skills · </b>
                  {proj.skills}
                </p>
                <p className="produces">{proj.produces}</p>
                {proj.evidence && (
                  <p className="evidence">
                    <b>Portfolio evidence · </b>
                    {proj.evidence}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ASSESSMENT */}
      <section className="section bg-soft">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Assessment Model</span>
            <h2 className="section-title">Learn → Practice → Build → Assess → Document</h2>
            <p className="section-sub">
              Assessment is part of the learning system — not an afterthought. Here is how progress
              is measured throughout the program.
            </p>
          </div>
          <div className="assess-grid">
            {program.assessmentModel.map((item, i) => (
              <div key={i} className="assess-item reveal">
                <span className="assess-num">{i + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATION */}
      <section className="section" id="certification">
        <div className="container container-narrow">
          <div className="section-head reveal">
            <span className="eyebrow">Certification Preparation</span>
            <h2 className="section-title">Certification roadmaps built into the program.</h2>
            <p className="section-sub">
              Certification preparation is embedded within the curriculum. The exams and
              credentials are issued by the external organisations — NeuroMind does not award
              them. External certification exams are optional.
            </p>
          </div>
          <div className="cert-list reveal">
            {program.certifications.map((cert) => (
              <div key={cert.name} className="cert-item">
                <span className="cert-name">{cert.name}</span>
                <span className="cert-window">{cert.window}</span>
                <span className="cert-role">{cert.role}</span>
              </div>
            ))}
          </div>
          {program.certNote && (
            <div className="cert-note reveal">
              <b>Important:</b> {program.certNote}
            </div>
          )}
        </div>
      </section>

      {/* PORTFOLIO JOURNEY */}
      <section className="section bg-soft">
        <div className="container container-narrow">
          <div className="section-head reveal">
            <span className="eyebrow">Portfolio Development</span>
            <h2 className="section-title">Your portfolio grows with you.</h2>
            <p className="section-sub">
              From first artifact to professional capstone — a visual journey of documented progress.
            </p>
          </div>
          <div className="journey reveal">
            {program.portfolioJourney.map((j) => (
              <div key={j.milestone} className="journey-row">
                <span className="journey-milestone">{j.milestone}</span>
                <span className="journey-output">{j.output}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Skills Developed</span>
            <h2 className="section-title">What you will be able to do.</h2>
          </div>
          <div className="skills-grid">
            {program.skills.map((group) => (
              <div key={group.group} className="skill-group reveal">
                <h3>{group.group}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="section bg-soft">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Potential Role Areas</span>
            <h2 className="section-title">Where this program can lead.</h2>
            <p className="section-sub">
              These are potential role areas aligned with the curriculum. Actual outcomes depend on
              individual effort, portfolio strength, employer requirements and market conditions —
              no employment is guaranteed.
            </p>
          </div>
          <div className="roles-grid">
            {program.roles.map((role) => (
              <div key={role.role} className="role-item reveal">
                <div className="role-name">{role.role}</div>
                <div className="role-note">{role.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTES */}
      <section className="section">
        <div className="container container-narrow">
          <div className="section-head reveal">
            <span className="eyebrow">Program Notes</span>
            <h2 className="section-title">Important information.</h2>
          </div>
          <ul className="notes-list reveal">
            {program.notes.map((note) => (
              <li key={note}>
                <span className="bullet" aria-hidden="true" />
                {note}
              </li>
            ))}
            {program.hardware && (
              <li>
                <span className="bullet" aria-hidden="true" />
                <span><b>Hardware requirements.</b> {program.hardware}</span>
              </li>
            )}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-soft" id="faq">
        <div className="container container-narrow">
          <div className="section-head reveal">
            <span className="eyebrow">FAQ</span>
            <h2 className="section-title">Common questions about this program.</h2>
          </div>
          <div className="accordion reveal">
            {program.faqs.map((f, i) => (
              <Accordion key={f.q} defaultOpen={i === 0} title={f.q}>
                <p style={{ fontSize: '0.9375rem', color: 'var(--ink-2)', lineHeight: 1.7 }}>{f.a}</p>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section">
        <CtaSection
          title="Ready to explore this path?"
          sub="Take the next step — explore the full curriculum in detail, or talk to NeuroMind about your questions."
          primary={{ label: 'Explore the Curriculum', to: '#curriculum' }}
          secondary={{ label: 'Talk to NeuroMind', to: '/contact' }}
          tertiary={{ label: 'Compare Programs', to: '/programs#compare' }}
        />
      </section>
      <div style={{ height: 32 }} />

      {/* Other programs */}
      <section className="section-tight bg-soft">
        <div className="container">
          <div className="section-head reveal" style={{ marginBottom: 28 }}>
            <span className="eyebrow">Other Programs</span>
            <h2 className="section-title" style={{ fontSize: '1.5rem' }}>Explore more pathways.</h2>
          </div>
          <div className="grid-3">
            {programs
              .filter((p) => p.slug !== program.slug)
              .map((p) => (
                <Link
                  key={p.slug}
                  to={`/programs/${p.slug}`}
                  className="card card-hover reveal"
                  style={{
                    ['--accent' as string]: p.accent,
                    ['--accent-soft' as string]: p.accentSoft,
                    ['--accent-ink' as string]: p.accentInk,
                    ['--accent-strong' as string]: p.accentStrong,
                  }}
                >
                  <span className="chip" style={{ marginBottom: 12 }}>
                    {p.category === 'foundation' ? 'Foundation' : 'Professional'}
                  </span>
                  <h3 style={{ fontSize: '1.0625rem', marginBottom: 6 }}>{p.shortTitle}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--ink-3)', marginBottom: 14 }}>{p.tagline}</p>
                  <span className="link-arrow" style={{ fontSize: '0.875rem' }}>
                    View program <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>
      <div style={{ height: 32 }} />
    </div>
  );
}
