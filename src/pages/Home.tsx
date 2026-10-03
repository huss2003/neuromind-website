import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { usePageMeta } from '../hooks/usePageMeta';
import { programs, foundationProgram, professionalPrograms } from '../data';
import ProgramCard from '../components/ProgramCard';
import SectionHead from '../components/SectionHead';
import ComparisonTable from '../components/ComparisonTable';
import HelpMeChoose from '../components/HelpMeChoose';
import CtaSection from '../components/CtaSection';
import { ArrowRight, Check, Compass } from '../components/Icons';
import PlaceholderNote from '../components/Placeholder';

const learningModel = [
  { num: '01', label: 'Understand', desc: 'Learn concepts from zero, with clear explanations and real examples.', color: '#2563EB', soft: '#EFF6FF' },
  { num: '02', label: 'Explore', desc: 'See how technology works in real situations and professional contexts.', color: '#7C3AED', soft: '#F5F3FF' },
  { num: '03', label: 'Build', desc: 'Apply knowledge through hands-on labs and practical work every month.', color: '#06B6D4', soft: '#ECFEFF' },
  { num: '04', label: 'Create', desc: 'Develop projects and portfolio evidence that demonstrate real capability.', color: '#10B981', soft: '#ECFDF5' },
  { num: '05', label: 'Progress', desc: 'Move steadily toward advanced and professional-level skills.', color: '#F59E0B', soft: '#FFFBEB' },
];

const whyCards = [
  { title: 'Start From Zero', desc: 'Every program is structured for absolute beginners. No prior technical knowledge is assumed — the curriculum begins with fundamentals.', color: '#2563EB' },
  { title: 'Learn By Building', desc: 'Practical projects accompany every month of the curriculum. Theory is followed by demonstration and independent hands-on work.', color: '#7C3AED' },
  { title: 'Build Your Portfolio', desc: 'Documented project work grows alongside learning — from first artifacts to a professional capstone portfolio.', color: '#06B6D4' },
  { title: 'Progress Step By Step', desc: 'Clear progression from beginner to advanced levels, with monthly examinations and structured milestones throughout.', color: '#10B981' },
  { title: 'Certification Preparation', desc: 'Industry certification preparation is embedded inside the programs — prepare alongside your studies, not as an afterthought.', color: '#F59E0B' },
  { title: 'Responsible Technology', desc: 'Ethics, safety and responsible use of technology are taught throughout — not as an add-on, but as part of how professionals work.', color: '#2563EB' },
];

const projectShowcase = [
  { title: 'No-Code AI Agent', program: 'AI Foundations', skills: 'Automation workflows · Agent instructions · Guardrails', produces: 'A working agent built on n8n/Make/Zapier with tested guardrails.', accent: '#6D28D9', soft: '#F5F3FF' },
  { title: 'Production ML API', program: 'Data Science & AI', skills: 'ML deployment · APIs · Model monitoring', produces: 'A deployed model API with basic monitoring and documentation.', accent: '#1D4ED8', soft: '#EFF6FF' },
  { title: 'SOC Investigation Portfolio', program: 'Cybersecurity', skills: 'Splunk · Detection searches · Investigation', produces: 'Investigation dashboards and tuned detections from simulated alerts.', accent: '#0E7490', soft: '#ECFEFF' },
  { title: 'AI Assistant UX Prototype', program: 'Product & UX / AI Design', skills: 'AI UX patterns · Conversational UI · Citations', produces: 'A clickable prototype demonstrating uncertainty, citations and oversight.', accent: '#B45309', soft: '#FFFBEB' },
  { title: 'RAG Application', program: 'Data Science & AI', skills: 'LLMs · Embeddings · Vector search · Evaluation', produces: 'A source-grounded data assistant with traceable citations.', accent: '#1D4ED8', soft: '#EFF6FF' },
  { title: 'Threat Hunting Report', program: 'Cybersecurity', skills: 'MITRE ATT&CK · Hypothesis-driven hunting', produces: 'Documented hunts mapped to ATT&CK with coverage-gap analysis.', accent: '#0E7490', soft: '#ECFEFF' },
  { title: 'Production-Style Design System', program: 'Product & UX / AI Design', skills: 'Tokens · Components · Accessibility · Handoff', produces: 'A documented, reusable design system with governance notes.', accent: '#B45309', soft: '#FFFBEB' },
  { title: 'Prompt Library + Capstone', program: 'AI Foundations', skills: 'Prompt engineering · Evaluation · Iteration', produces: 'A curated set of tested prompts presented with a creator capstone.', accent: '#6D28D9', soft: '#F5F3FF' },
];

const faqs = [
  {
    q: 'What is NeuroMind?',
    a: 'NeuroMind is a technology education institution offering structured learning pathways in AI, Data Science, Cybersecurity and Product & UX design. Programs take students from absolute beginner foundations toward advanced practical skills, projects and professional portfolios.',
  },
  {
    q: 'Do I need technical knowledge to start?',
    a: 'No. Every NeuroMind program is designed for absolute beginners. The 1-year AI Foundations program starts at Standard 8 level; the 3-year professional programs start at Class 10 level. The curriculum begins with fundamentals in every pathway.',
  },
  {
    q: 'What is the difference between the foundation and professional programs?',
    a: 'The 1-Year AI Literacy & AI Foundations program (104 hours) builds broad AI literacy, practical AI skills and certification readiness. The 3-Year Professional Programs (624 hours each) are deep specializations in Data Science & AI, Cybersecurity, or Product & UX / AI Design — designed to progress from beginner to professional / job-ready level.',
  },
  {
    q: 'How are students assessed?',
    a: 'Assessment is built into the learning system. The 3-year programs include a monthly one-hour examination after every major topic, plus projects and portfolio evidence. The 1-year foundation includes major-topic examinations, practical projects and a capstone.',
  },
  {
    q: 'Does NeuroMind guarantee jobs or internships?',
    a: 'No. Programs are designed to build job-readiness through skills, hands-on projects, GitHub evidence and professional portfolios. No internship, employment or salary outcomes are guaranteed. Certification preparation is included, but external certifications are optional and separately funded.',
  },
  {
    q: 'Are the certifications awarded by NeuroMind?',
    a: 'No. Certification preparation (such as Microsoft AI-901, AWS AIF-C01, DP-900, Security+, and others) is embedded within the programs. External certification exams are conducted by the issuing organisations, are optional, and carry separate fees.',
  },
];

function LearningPathVisual() {
  const steps = [
    { label: 'Beginner', desc: 'Absolute beginner entry', color: '#2563EB', soft: '#EFF6FF' },
    { label: 'Learning', desc: 'Structured concepts + labs', color: '#7C3AED', soft: '#F5F3FF' },
    { label: 'Building', desc: 'Hands-on projects monthly', color: '#06B6D4', soft: '#ECFEFF' },
    { label: 'Creating', desc: 'Portfolio evidence', color: '#10B981', soft: '#ECFDF5' },
    { label: 'Professional', desc: 'Professional-level capability', color: '#F59E0B', soft: '#FFFBEB' },
  ];
  return (
    <div className="hero-visual reveal">
      <p className="hero-visual-title">The NeuroMind Progression</p>
      <div className="prog-path">
        {steps.map((s, i) => (
          <div
            key={s.label}
            className="prog-step"
            style={{ ['--step-color' as string]: s.color, ['--step-soft' as string]: s.soft }}
          >
            <span className="prog-dot" aria-hidden="true">
              {i + 1}
            </span>
            <span>
              <span className="prog-label">{s.label}</span>
              <br />
              <span className="prog-desc">{s.desc}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [hmcOpen, setHmcOpen] = useState(false);
  useReveal();
  usePageMeta(
    'NeuroMind — Build Your Future with AI, Data, Cybersecurity & Design',
    'Structured technology education pathways in AI, Data Science, Cybersecurity and Product & UX design — from absolute beginner foundations to professional portfolios.',
  );

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="hero-badge reveal">
              <b>New</b> Structured technology education pathways
            </span>
            <h1 className="reveal reveal-d1">
              Build Your Future with <span className="grad">AI, Data, Cybersecurity &amp; Design</span>
            </h1>
            <p className="hero-sub reveal reveal-d2">
              Structured pathways in AI, Data Science, Cybersecurity and Product &amp; UX design —
              built to take students from absolute beginner foundations toward practical skills,
              projects and professional portfolios. Designed for school students from Standard 8
              onwards; no prior technical knowledge is needed.
            </p>
            <div className="hero-actions reveal reveal-d3">
              <Link to="/programs" className="btn btn-primary btn-lg">
                Explore Programs <ArrowRight />
              </Link>
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={() => setHmcOpen(true)}
              >
                <Compass /> Help Me Choose
              </button>
            </div>
            <div className="hero-trust reveal reveal-d4">
              <div className="hero-trust-item">
                <strong>104–624</strong>
                <span>Hours per program</span>
              </div>
              <div className="hero-trust-item">
                <strong>4</strong>
                <span>Technology pathways</span>
              </div>
              <div className="hero-trust-item">
                <strong>Standard 8</strong>
                <span>Foundation program entry</span>
              </div>
              <div className="hero-trust-item">
                <strong>Class 10 Passed</strong>
                <span>Professional programs entry</span>
              </div>
            </div>
          </div>
          <LearningPathVisual />
        </div>
      </section>

      {/* WHAT IS NEUROMIND */}
      <section className="section" id="what">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 56 }}>
            <div className="reveal">
              <span className="eyebrow">What is NeuroMind?</span>
              <h2 className="section-title">
                Serious technology education, made clear and accessible.
              </h2>
              <p className="section-sub" style={{ marginBottom: 20 }}>
                NeuroMind is a technology education institution founded by Jair D Souza. We offer
                structured learning pathways in Artificial Intelligence, Data Science,
                Cybersecurity and Product &amp; UX / AI Design — each designed to take a student
                from absolute beginner to advanced, professional-level capability.
              </p>
              <p className="section-sub">
                Every program follows the same principle: start from zero, learn by building,
                document your progress, and move forward step by step. No hype, no shortcuts —
                just structured learning with practical outcomes.
              </p>
            </div>
            <div className="reveal reveal-d2">
              <div className="card" style={{ padding: 32, background: 'var(--bg-soft)' }}>
                <h3 style={{ fontSize: '1.125rem', marginBottom: 16 }}>Our Educational Philosophy</h3>
                <ul className="fit-list">
                  {[
                    'Modern and practical — skills that apply to real work',
                    'Human and clear — complex ideas made understandable',
                    'Accessible — absolute beginners are welcome',
                    'Project-oriented — build while you learn',
                    'Future-focused — AI-era skills taught responsibly',
                    'Trustworthy — honest about what programs do and do not include',
                  ].map((item) => (
                    <li key={item}>
                      <span className="check" aria-hidden="true">
                        <Check />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING MODEL */}
      <section className="section bg-soft" id="journey">
        <div className="container">
          <SectionHead
            eyebrow="The NeuroMind Learning Model"
            title="A journey from understanding to professional capability"
            sub="Every NeuroMind program follows the same learning model — whether you study for one year or three. This is how knowledge connects."
            center
          />
          <div className="prog-strip reveal">
            {learningModel.map((step) => (
              <div
                key={step.num}
                className="prog-strip-step"
                style={{ ['--strip-color' as string]: step.color }}
              >
                <div className="prog-strip-num">{step.num}</div>
                <div className="prog-strip-label">{step.label}</div>
                <div className="prog-strip-desc">{step.desc}</div>
              </div>
            ))}
          </div>

          <div className="grid-2 reveal" style={{ marginTop: 56, gap: 24 }}>
            <div className="card card-hover" style={{ borderLeft: '4px solid #2563EB' }}>
              <span className="chip" style={{ marginBottom: 14 }}>3-Year Professional Programs</span>
              <h3 style={{ fontSize: '1.125rem', marginBottom: 10 }}>
                Year 1 Foundations → Year 2 Specialization → Year 3 Advanced + Professional
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--ink-3)', lineHeight: 1.7 }}>
                Each year builds on the last: computing and core skills first, then specialization,
                then advanced practice — supported by monthly projects, assessments and portfolio
                development throughout.
              </p>
            </div>
            <div className="card card-hover" style={{ borderLeft: '4px solid #7C3AED' }}>
              <span className="chip chip-purple" style={{ marginBottom: 14 }}>1-Year AI Foundation</span>
              <h3 style={{ fontSize: '1.125rem', marginBottom: 10 }}>
                Months 1–3 Understand → 4–6 Explore → 7–9 Build → 10–12 Create
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--ink-3)', lineHeight: 1.7 }}>
                A focused year that builds AI literacy from the ground up — foundations and safety
                first, then generative AI and prompting, then automation and building, and finally
                Python and certification preparation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHOOSE YOUR PATH */}
      <section className="section" id="paths">
        <div className="container">
          <SectionHead
            eyebrow="Choose Your Path"
            title="Start with AI foundations or build toward a professional specialization."
            sub="Two levels of study, four technology pathways. Every program starts from absolute beginner level."
          />

          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span className="chip chip-purple">Foundation Program</span>
              <span style={{ fontSize: '0.875rem', color: 'var(--ink-3)' }}>
                A strong starting point — not a substitute for the professional programs
              </span>
            </div>
            <div style={{ maxWidth: 480 }}>
              <ProgramCard program={foundationProgram} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
              <span className="chip">Professional Specializations</span>
              <span style={{ fontSize: '0.875rem', color: 'var(--ink-3)' }}>
                3-year pathways from absolute beginner toward professional-level capability
              </span>
              <button
                className="btn btn-secondary"
                style={{ marginLeft: 'auto', padding: '8px 18px', fontSize: '0.875rem' }}
                onClick={() => setHmcOpen(true)}
              >
                <Compass /> Help Me Choose
              </button>
            </div>
            <div className="grid-3">
              {professionalPrograms.map((p, i) => (
                <div key={p.slug} className={`reveal reveal-d${i + 1}`}>
                  <ProgramCard program={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="section bg-soft" id="compare">
        <div className="container">
          <SectionHead
            eyebrow="Compare Programs"
            title="See the differences side by side."
            sub="A clear comparison of duration, commitment, focus and outcomes across all four programs — for clarity, not ranking."
          />
          <ComparisonTable />
        </div>
      </section>

      {/* START FROM ZERO */}
      <section className="section">
        <div className="container container-narrow" style={{ textAlign: 'center' }}>
          <div className="reveal">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Start From Zero</span>
            <h2 className="section-title">
              You don't need to know everything before you start.
            </h2>
            <p className="section-sub" style={{ marginInline: 'auto', maxWidth: 560, marginBottom: 40 }}>
              Every NeuroMind program explicitly begins at absolute beginner level. The curriculum
              is designed so that a student with no prior technical knowledge can follow along,
              build skills gradually and progress with confidence.
            </p>
          </div>
          <div className="prog-strip reveal" style={{ maxWidth: 760, marginInline: 'auto' }}>
            {[
              { label: 'Start', desc: 'No prior knowledge needed', color: '#2563EB' },
              { label: 'Learn', desc: 'Concepts from zero', color: '#7C3AED' },
              { label: 'Practice', desc: 'Hands-on every month', color: '#06B6D4' },
              { label: 'Build', desc: 'Projects and portfolio', color: '#10B981' },
              { label: 'Advance', desc: 'Professional capability', color: '#F59E0B' },
            ].map((s) => (
              <div key={s.label} className="prog-strip-step" style={{ ['--strip-color' as string]: s.color }}>
                <div className="prog-strip-label">{s.label}</div>
                <div className="prog-strip-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT-FIRST LEARNING */}
      <section className="section bg-soft" id="projects">
        <div className="container">
          <SectionHead
            eyebrow="Project-First Learning"
            title="Don't just learn. Build."
            sub="Each example below corresponds to real curriculum work inside the program shown — these are curriculum projects, not completed student work or testimonials."
          />
          <div className="grid-4">
            {projectShowcase.map((proj, i) => (
              <article
                key={proj.title}
                className={`project-card reveal reveal-d${(i % 4) + 1}`}
                style={{ ['--accent' as string]: proj.accent }}
              >
                <div className="chip-row">
                  <span className="chip" style={{ background: proj.soft, color: proj.accent }}>
                    {proj.program}
                  </span>
                </div>
                <h4>{proj.title}</h4>
                <p className="skills">
                  <b>Skills · </b>
                  {proj.skills}
                </p>
                <p className="produces">{proj.produces}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATION */}
      <section className="section" id="certification">
        <div className="container">
          <SectionHead
            eyebrow="Certification Preparation"
            title="Prepare for industry certifications alongside your program."
            sub="Certification preparation is embedded inside the curriculum — not bolted on at the end. External certification exams are optional, conducted by the issuing organisations, and carry separate fees."
          />
          <div className="grid-2 reveal" style={{ gap: 20 }}>
            {programs.map((p) => (
              <div
                key={p.slug}
                className="card card-hover"
                style={{
                  ['--accent' as string]: p.accent,
                  ['--accent-soft' as string]: p.accentSoft,
                  ['--accent-ink' as string]: p.accentInk,
                  ['--accent-strong' as string]: p.accentStrong,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1.0625rem' }}>{p.shortTitle}</h3>
                  <Link to={`/programs/${p.slug}`} className="link-arrow" style={{ fontSize: '0.8125rem' }}>
                    Details <ArrowRight size={13} />
                  </Link>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {p.certifications.map((c) => (
                    <li
                      key={c.name}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 12,
                        fontSize: '0.875rem',
                        padding: '8px 0',
                        borderBottom: '1px solid var(--line)',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span style={{ color: 'var(--ink-2)', fontWeight: 500 }}>{c.name}</span>
                      <span style={{ color: p.accent, fontWeight: 600, fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                        {c.window}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NEUROMIND */}
      <section className="section bg-soft" id="why">
        <div className="container">
          <SectionHead
            eyebrow="Why NeuroMind"
            title="Built on documented educational principles."
            sub="No empty marketing claims — just the structural qualities that define how NeuroMind programs are designed."
            center
          />
          <div className="grid-3">
            {whyCards.map((card, i) => (
              <div
                key={card.title}
                className={`card card-hover reveal reveal-d${(i % 3) + 1}`}
                style={{ borderTop: `3px solid ${card.color}` }}
              >
                <h3 style={{ fontSize: '1.0625rem', marginBottom: 10 }}>{card.title}</h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--ink-3)', lineHeight: 1.65 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST THROUGH TRANSPARENCY */}
      <section className="section">
        <div className="container">
          <div className="fit-grid">
            <div className="reveal">
              <span className="eyebrow">Know What You're Signing Up For</span>
              <h2 className="section-title" style={{ marginBottom: 20 }}>
                Transparency builds trust.
              </h2>
              <p className="section-sub" style={{ marginBottom: 28 }}>
                We tell you exactly what each program contains — duration, weekly commitment, entry
                requirements, assessment structure, projects, portfolio development and
                certification preparation. No surprises.
              </p>
              <div className="facts-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                <div className="fact-cell">
                  <div className="fact-value">Monthly</div>
                  <div className="fact-label">Examinations in 3-year programs</div>
                </div>
                <div className="fact-cell">
                  <div className="fact-value">36</div>
                  <div className="fact-label">Portfolio artifacts over 3 years</div>
                </div>
                <div className="fact-cell">
                  <div className="fact-value">Embedded</div>
                  <div className="fact-label">Certification preparation</div>
                </div>
                <div className="fact-cell">
                  <div className="fact-value">Zero</div>
                  <div className="fact-label">Prior knowledge required</div>
                </div>
              </div>
            </div>
            <div className="reveal reveal-d2">
              <div className="fit-note">
                <div className="accent-bar" aria-hidden="true" />
                <h4>For Students &amp; Parents</h4>
                <p style={{ marginBottom: 16 }}>
                  Every program page answers the questions that matter: What will my child learn?
                  How many hours per week? How are they assessed? What will they build? What
                  certifications can they prepare for?
                </p>
                <p style={{ marginBottom: 20 }}>
                  Programs are honest about what they include and what they don't. No job
                  guarantees, no fabricated statistics, no unrealistic promises — just structured
                  education with clear outcomes.
                </p>
                <Link to="/programs" className="btn btn-primary">
                  Explore All Programs <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="section bg-soft">
        <div className="container container-narrow" style={{ textAlign: 'center' }}>
          <div className="reveal">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Founder</span>
            <h2 className="section-title">Jair D Souza</h2>
            <p className="section-sub" style={{ maxWidth: 520, marginInline: 'auto' }}>
              Founder of NeuroMind. A focused vision: make serious technology education
              accessible, structured and honest — so every student can start from where they are
              and progress toward real capability.
            </p>
            <div style={{ marginTop: 24, maxWidth: 480, marginInline: 'auto', textAlign: 'left' }}>
              <PlaceholderNote label="Founder message — not yet published">
                A personal message from Jair D Souza will be published here once available.
              </PlaceholderNote>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container container-narrow">
          <SectionHead
            eyebrow="Common Questions"
            title="Answers before you ask."
            center
          />
          <div className="accordion reveal">
            {faqs.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <CtaSection
          title="Your starting point is just the beginning."
          sub="Explore the programs, compare the pathways, and find the one that matches your interests. Every journey starts with a single step."
          primary={{ label: 'Explore Programs', to: '/programs' }}
          secondary={{ label: 'Talk to NeuroMind', to: '/contact' }}
        />
      </section>

      <div style={{ height: 96 }} />

      <HelpMeChoose open={hmcOpen} onClose={() => setHmcOpen(false)} />
    </>
  );
}

function FaqItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div className="acc-item" data-open={open}>
      <button
        type="button"
        className="acc-trigger"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {q}
        <span className="acc-icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              style={{ transform: open ? 'rotate(45deg)' : 'none', transformOrigin: 'center', transition: 'transform 250ms' }} />
          </svg>
        </span>
      </button>
      <div className="acc-body" role="region">
        <div className="acc-body-inner">
          <div className="acc-content">
            <p style={{ fontSize: '0.9375rem', color: 'var(--ink-2)', lineHeight: 1.7 }}>{a}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
