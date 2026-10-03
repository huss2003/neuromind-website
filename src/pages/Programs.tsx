import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { usePageMeta } from '../hooks/usePageMeta';
import { foundationProgram, professionalPrograms } from '../data';
import ProgramCard from '../components/ProgramCard';
import SectionHead from '../components/SectionHead';
import ComparisonTable from '../components/ComparisonTable';
import HelpMeChoose from '../components/HelpMeChoose';
import CtaSection from '../components/CtaSection';
import { Compass } from '../components/Icons';

export default function Programs() {
  const [hmcOpen, setHmcOpen] = useState(false);
  useReveal();
  usePageMeta(
    'Programs — NeuroMind',
    'Explore NeuroMind programs: 1-Year AI Foundations, Data Science & AI, Cybersecurity, and Product & UX / AI Design — all starting from absolute beginner level.',
  );

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="sep" aria-hidden="true">/</span>
            <span aria-current="page">Programs</span>
          </nav>
          <h1>Programs</h1>
          <p className="hero-sub">
            Two levels of study, four technology pathways — every program starts from absolute
            beginner level and progresses toward practical, professional capability.
          </p>
          <div style={{ marginTop: 24 }}>
            <button className="btn btn-secondary" onClick={() => setHmcOpen(true)}>
              <Compass /> Help Me Choose
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span className="chip chip-purple">Foundation Program</span>
              <span style={{ fontSize: '0.875rem', color: 'var(--ink-3)' }}>
                Build AI literacy before choosing a specialization
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
                3-year pathways · 624 hours · Class 10 passed entry
              </span>
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

      <section className="section bg-soft" id="compare">
        <div className="container">
          <SectionHead
            eyebrow="Side by Side"
            title="Compare all four programs."
            sub="Duration, commitment, entry requirements, focus areas and certification preparation — laid out clearly so you can decide with confidence."
          />
          <ComparisonTable />
        </div>
      </section>

      <section className="section">
        <CtaSection
          title="Ready to explore a program in detail?"
          sub="Each program page covers the full curriculum, projects, assessments, certification preparation and what you will be able to do at the end."
          primary={{ label: 'Explore Data Science & AI', to: '/programs/data-science-ai' }}
          secondary={{ label: 'Talk to NeuroMind', to: '/contact' }}
        />
      </section>
      <div style={{ height: 32 }} />

      <HelpMeChoose open={hmcOpen} onClose={() => setHmcOpen(false)} />
    </>
  );
}
