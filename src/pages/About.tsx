import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { usePageMeta } from '../hooks/usePageMeta';
import { programs } from '../data';
import SectionHead from '../components/SectionHead';
import CtaSection from '../components/CtaSection';
import { ArrowRight, Check } from '../components/Icons';

export default function About() {
  useReveal();
  usePageMeta(
    'About — NeuroMind',
    'NeuroMind is a technology education institution founded by Jair D Souza, offering structured pathways in AI, Data Science, Cybersecurity and Product & UX design.',
  );

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="sep" aria-hidden="true">/</span>
            <span aria-current="page">About</span>
          </nav>
          <h1>About NeuroMind</h1>
          <p className="hero-sub">
            A technology education institution built on a simple belief: serious technical
            education should be structured, practical and accessible to everyone.
          </p>
        </div>
      </section>

      {/* WHAT WE ARE */}
      <section className="section">
        <div className="container container-narrow">
          <div className="reveal">
            <span className="eyebrow">What NeuroMind Is</span>
            <h2 className="section-title" style={{ marginBottom: 20 }}>
              Structured technology education, from beginner to professional.
            </h2>
            <p style={{ fontSize: '1.0625rem', color: 'var(--ink-2)', lineHeight: 1.8, marginBottom: 16 }}>
              NeuroMind offers structured learning pathways in Artificial Intelligence, Data
              Science, Cybersecurity and Product &amp; UX / AI Design. Each program is designed to
              take a student from absolute beginner foundations toward advanced practical skills,
              real projects and professional portfolios.
            </p>
            <p style={{ fontSize: '1.0625rem', color: 'var(--ink-2)', lineHeight: 1.8 }}>
              We believe technology education works best when it starts from zero, builds through
              hands-on work, and is honest about what it can and cannot promise. That principle
              shapes every program we offer.
            </p>
          </div>
        </div>
      </section>

      {/* WHY IT EXISTS */}
      <section className="section bg-soft">
        <div className="container">
          <div className="fit-grid">
            <div className="reveal">
              <span className="eyebrow">Why NeuroMind Exists</span>
              <h2 className="section-title" style={{ marginBottom: 20 }}>
                The gap between curiosity and capability.
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--ink-2)', lineHeight: 1.8, marginBottom: 16 }}>
                Students are curious about AI, data, cybersecurity and design — but many learning
                options either assume prior knowledge, skip fundamentals, or make promises they
                can't keep. Parents want structure and transparency. Students want to build real
                things.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--ink-2)', lineHeight: 1.8 }}>
                NeuroMind was founded by Jair D Souza to bridge that gap: programs that begin at
                absolute beginner level, progress step by step through documented curricula, and
                produce tangible evidence of learning — projects, portfolios and certification
                readiness.
              </p>
            </div>
            <div className="reveal reveal-d2">
              <div className="card" style={{ padding: 32 }}>
                <h3 style={{ fontSize: '1.125rem', marginBottom: 16 }}>What We Believe</h3>
                <ul className="fit-list">
                  {[
                    'Everyone can learn technology — with the right structure',
                    'Projects build deeper understanding than theory alone',
                    'Portfolios matter more than certificates on their own',
                    'Ethics and responsibility belong in every technical education',
                    'Honesty about outcomes builds more trust than big promises',
                  ].map((item) => (
                    <li key={item}>
                      <span className="check" aria-hidden="true"><Check /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Re-insertion point — FOUNDER section.
          Owner content needed before restoring: an approved personal message
          (and optional bio) from Jair D Souza. Until then the verified founder
          name is mentioned inline in "Why NeuroMind Exists" above. */}

      {/* PHILOSOPHY + MODEL */}
      <section className="section bg-soft">
        <div className="container">
          <SectionHead
            eyebrow="Educational Philosophy"
            title="How we think about learning."
            sub="These principles are embedded in every program — not as marketing language, but as structural design choices."
            center
          />
          <div className="grid-3">
            {[
              { title: 'Start From Zero', desc: 'Every program assumes no prior knowledge. Fundamentals come first, always. This makes education accessible and prevents students from falling behind.', color: '#2563EB' },
              { title: 'Learn By Building', desc: 'Theory is followed by demonstration and independent hands-on work. Every month produces something tangible — a project, a lab, a documented artifact.', color: '#7C3AED' },
              { title: 'Progress With Structure', desc: 'Clear stages, monthly milestones, regular assessments and portfolio development. Students always know where they are and where they are going.', color: '#06B6D4' },
              { title: 'Document Everything', desc: 'GitHub repositories, portfolio artifacts and case studies grow alongside learning. By graduation, students have evidence of what they can do.', color: '#10B981' },
              { title: 'Prepare For Certifications', desc: 'Industry certification preparation is embedded within programs — so students can validate their skills with external credentials when they choose to.', color: '#F59E0B' },
              { title: 'Use Technology Responsibly', desc: 'Ethics, safety, bias, privacy and responsible AI are taught throughout — because professionals do not just need skills, they need judgment.', color: '#2563EB' },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`card card-hover reveal reveal-d${(i % 3) + 1}`}
                style={{ borderTop: `3px solid ${item.color}` }}
              >
                <h3 style={{ fontSize: '1.0625rem', marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--ink-3)', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM STRUCTURE */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Program Structure"
            title="Two levels, four pathways."
            sub="NeuroMind currently offers one foundation program and three professional specializations — each with its own structured curriculum."
          />
          <div className="grid-2" style={{ gap: 20 }}>
            {programs.map((p, i) => (
              <Link
                key={p.slug}
                to={`/programs/${p.slug}`}
                className={`card card-hover reveal reveal-d${(i % 2) + 1}`}
                style={{
                  ['--accent' as string]: p.accent,
                  ['--accent-soft' as string]: p.accentSoft,
                  ['--accent-ink' as string]: p.accentInk,
                  ['--accent-strong' as string]: p.accentStrong,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <span className="chip" style={{ alignSelf: 'flex-start' }}>
                  {p.category === 'foundation' ? 'Foundation' : 'Professional'}
                </span>
                <h3 style={{ fontSize: '1.125rem' }}>{p.shortTitle}</h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--ink-3)', lineHeight: 1.6 }}>{p.tagline}</p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--ink-4)', marginTop: 'auto' }}>
                  {p.duration} · {p.hours} · {p.weekly} · {p.entry}
                </p>
                <span className="link-arrow" style={{ fontSize: '0.875rem' }}>
                  View program <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Re-insertion point — FUTURE VISION section.
          Owner content needed before restoring: confirmed mission and vision
          statements (and any dated roadmap). */}

      <section className="section">
        <CtaSection
          title="Want to learn more about our programs?"
          sub="Explore the full curriculum, or get in touch with any questions."
          primary={{ label: 'Explore Programs', to: '/programs' }}
          secondary={{ label: 'Contact Us', to: '/contact' }}
        />
      </section>
      <div style={{ height: 32 }} />
    </>
  );
}
