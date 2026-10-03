import { programs, comparisonRows } from '../data';
import { Link } from 'react-router-dom';
import { ArrowRight } from './Icons';

export default function ComparisonTable() {
  const foundation = programs.filter((p) => p.category === 'foundation');
  const professionals = programs.filter((p) => p.category === 'professional');

  const glanceCard = (p: (typeof programs)[number]) => {
    const focusRow = comparisonRows.find((r) => r.label === 'Focus');
    const projectsRow = comparisonRows.find((r) => r.label === 'Projects');
    const pi = programs.indexOf(p);
    return (
      <div
        key={p.slug}
        className={`cg-card${p.category === 'foundation' ? ' foundation' : ''}`}
        style={{ ['--cg-accent' as string]: p.accent }}
      >
        <h3>
          <Link to={`/programs/${p.slug}`}>{p.shortTitle}</Link>
        </h3>
        <dl className="cg-facts">
          <div className="cg-fact">
            <dt>Duration</dt>
            <dd>{p.duration}</dd>
          </div>
          <div className="cg-fact">
            <dt>Commitment</dt>
            <dd>
              {p.weekly} · {p.hours} total
            </dd>
          </div>
          <div className="cg-fact">
            <dt>Entry</dt>
            <dd>{p.entry}</dd>
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
            Detailed comparison of all four NeuroMind programs across duration, hours, entry
            level, focus, progression, projects, certification preparation and assessment.
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
            {comparisonRows
              .filter((row) => row.label !== 'Certification Preparation')
              .map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {row.values.map((v, i) => (
                    <td key={i}>{v}</td>
                  ))}
                </tr>
              ))}
            <tr>
              <th scope="row">Certification Preparation</th>
              {programs.map((p) => (
                <td key={p.slug}>
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
                </td>
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
              {p.category === 'foundation' ? '1-year foundation' : '3-year specialization'}
            </span>
            <h3>
              <Link to={`/programs/${p.slug}`}>{p.shortTitle}</Link>
            </h3>
            <dl>
              {comparisonRows
                .filter((row) => row.label !== 'Certification Preparation')
                .map((row) => (
                  <div key={row.label} className="cm-row">
                    <dt>{row.label}</dt>
                    <dd>{row.values[pi]}</dd>
                  </div>
                ))}
              <div className="cm-row">
                <dt>Certification Preparation</dt>
                <dd>
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
                </dd>
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
