import { programs, comparisonRows } from '../data';
import { Link } from 'react-router-dom';
import { ArrowRight } from './Icons';

/* Display order: most decision-relevant facts first. comparisonRows (data)
   stays untouched; order and display labels live here. */
const FACT_ORDER = [
  'Entry Level',
  'Duration',
  'Weekly Commitment',
  'Total Hours',
  'Focus',
  'Progression',
  'Projects',
  'Assessment',
] as const;

const FACT_LABEL: Record<string, string> = {
  Projects: 'Example output',
};

const orderedFacts = FACT_ORDER.map((label) => comparisonRows.find((r) => r.label === label))
  .filter((r): r is (typeof comparisonRows)[number] => Boolean(r));

const typeOf = (p: (typeof programs)[number]) =>
  p.category === 'foundation' ? '1-Year Foundation' : '3-Year Specialization';

/* Data files use 'Class 10 Passed'; display copy standardizes to 'Class 10 passed'. */
const entryDisplay = (s: string) => s.replace('Class 10 Passed', 'Class 10 passed');

export default function ComparisonTable() {
  const foundation = programs.filter((p) => p.category === 'foundation');
  const professionals = programs.filter((p) => p.category === 'professional');

  const glanceCard = (p: (typeof programs)[number]) => {
    const pi = programs.indexOf(p);
    const focusRow = orderedFacts.find((r) => r.label === 'Focus');
    const projectsRow = orderedFacts.find((r) => r.label === 'Projects');
    return (
      <div
        key={p.slug}
        className={`cg-card${p.category === 'foundation' ? ' foundation' : ''}`}
        style={{ ['--cg-accent' as string]: p.accent }}
      >
        <span className={`cg-type${p.category === 'foundation' ? ' cg-type-foundation' : ''}`}>
          {typeOf(p)}
        </span>
        <h3>
          <Link to={`/programs/${p.slug}`}>{p.shortTitle}</Link>
        </h3>
        <dl className="cg-facts">
          <div className="cg-fact">
            <dt>Type</dt>
            <dd>{typeOf(p)}</dd>
          </div>
          <div className="cg-fact">
            <dt>Entry</dt>
            <dd>{entryDisplay(p.entry)}</dd>
          </div>
          <div className="cg-fact">
            <dt>Duration</dt>
            <dd>{p.duration}</dd>
          </div>
          <div className="cg-fact">
            <dt>Weekly</dt>
            <dd>
              {p.weekly} · {p.hours} total
            </dd>
          </div>
        </dl>
        <p className="cg-focus">{focusRow?.values[pi]}</p>
        <p className="cg-focus" style={{ paddingTop: 8, borderTop: 'none', marginTop: 8 }}>
          <b style={{ color: 'var(--ink-2)' }}>Typical output · </b>
          {projectsRow?.values[pi]}
        </p>
        <Link to={`/programs/${p.slug}`} className="link-arrow" style={{ marginTop: 12, fontSize: '0.875rem' }}>
          View program <ArrowRight size={14} />
        </Link>
      </div>
    );
  };

  const certDetails = (p: (typeof programs)[number]) => (
    <details className="cert-details">
      <summary>
        {p.certifications.length} certification roadmap
        {p.certifications.length > 1 ? 's' : ''} — view list
      </summary>
      <ul>
        {p.certifications.map((c) => (
          <li key={c.name}>
            {c.name} <span style={{ color: 'var(--ink-3)' }}>({c.window})</span>
          </li>
        ))}
      </ul>
    </details>
  );

  return (
    <>
      {/* AT A GLANCE — quick facts first, foundation separated from professionals */}
      <div className="reveal">
        <h3 className="cg-group-label" id="glance-foundation">
          1-Year Foundation
        </h3>
        <div className="cg-grid">{foundation.map(glanceCard)}</div>

        <h3 className="cg-group-label" id="glance-professional">
          3-Year Professional Specializations
        </h3>
        <div className="cg-grid">{professionals.map(glanceCard)}</div>
      </div>

      {/* DETAILED TABLE — full comparison for visitors who want every fact */}
      <div
        className="comparison-wrap compare-desktop reveal"
        role="region"
        aria-label="Detailed program comparison table"
        tabIndex={0}
        style={{ marginTop: 32 }}
      >
        <table className="comparison-table">
          <caption className="sr-only">
            Detailed comparison of all four NeuroMind programs across program type, entry
            level, duration, weekly commitment, hours, focus, progression, example output,
            assessment and certification preparation.
          </caption>
          <thead>
            <tr>
              <th scope="col">Program</th>
              {programs.map((p) => (
                <th scope="col" key={p.slug}>
                  <Link to={`/programs/${p.slug}`} style={{ color: 'var(--ink)', fontWeight: 600 }}>
                    {p.shortTitle} <ArrowRight size={13} />
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Program Type</th>
              {programs.map((p) => (
                <td key={p.slug}>{typeOf(p)}</td>
              ))}
            </tr>
            {orderedFacts.map((row) => (
              <tr key={row.label}>
                <th scope="row">{FACT_LABEL[row.label] ?? row.label}</th>
                {row.values.map((v, i) => (
                  <td key={i}>{row.label === 'Entry Level' ? entryDisplay(v) : v}</td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row">Certification Preparation</th>
              {programs.map((p) => (
                <td key={p.slug}>{certDetails(p)}</td>
              ))}
            </tr>
            <tr>
              <th scope="row">Explore</th>
              {programs.map((p) => (
                <td key={p.slug}>
                  <Link to={`/programs/${p.slug}`} className="link-arrow">
                    View program <ArrowRight size={14} />
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* MOBILE — stacked cards, no sideways scrolling */}
      <div className="compare-mobile">
        {programs.map((p, pi) => (
          <div key={p.slug} className="compare-mobile-card" style={{ ['--accent' as string]: p.accent }}>
            <span className="chip chip-neutral" style={{ marginBottom: 8 }}>
              {typeOf(p)}
            </span>
            <h3>
              <Link to={`/programs/${p.slug}`}>{p.shortTitle}</Link>
            </h3>
            <dl>
              {orderedFacts.map((row) => (
                <div key={row.label} className="cm-row">
                  <dt>{FACT_LABEL[row.label] ?? row.label}</dt>
                  <dd>{row.label === 'Entry Level' ? entryDisplay(row.values[pi]) : row.values[pi]}</dd>
                </div>
              ))}
              <div className="cm-row">
                <dt>Certification Preparation</dt>
                <dd>{certDetails(p)}</dd>
              </div>
            </dl>
            <Link to={`/programs/${p.slug}`} className="link-arrow">
              View program <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
