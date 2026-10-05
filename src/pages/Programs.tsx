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
      <section className="page-hero page-hero-tight">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="sep" aria-hidden="true">/</span>
            <span aria-current="page">Programs</span>
          </nav>
          <h1>Programs</h1>
          <p className="hero-sub">
            One 1-year foundation and three 3-year specializations — every program
            starts from absolute beginner level.
          </p>
          <div className="programs-hero-actions">
            <button className="btn btn-secondary" onClick={() => setHmcOpen(true)}>
              <Compass /> Help Me Choose
            </button>
          </div>
        </div>
      </section>

      <section className="section section-programs">
        <div className="container">
          <h2 className="sr-only">Program choices</h2>
          <div className="programs-group">
            <div className="programs-group-head">
              <span className="chip chip-purple">1-Year Foundation</span>
              <span className="programs-group-note">
                AI literacy first · Standard 8 entry · 2 hrs/week · 104 hours
              </span>
            </div>
            <div className="programs-foundation">
              <ProgramCard program={foundationProgram} />
            </div>
          </div>

          <div className="programs-group">
            <div className="programs-group-head">
              <span className="chip">3-Year Professional Specializations</span>
              <span className="programs-group-note">
                Class 10 passed entry · 4 hrs/week · 624 hours each
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
