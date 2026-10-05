import { Link } from 'react-router-dom';
import type { Program } from '../data/types';
import { ArrowRight } from './Icons';

export default function ProgramCard({ program }: { program: Program }) {
  const isFoundation = program.category === 'foundation';
  const entry = isFoundation ? 'Standard 8' : 'Class 10 passed';
  return (
    <article
      className={`program-card card-hover${isFoundation ? ' foundation-card' : ''}`}
      style={{ ['--card-accent' as string]: program.accent }}
    >
      <div className="pc-head">
        <span className={`pc-type${isFoundation ? ' pc-type-foundation' : ''}`}>
          {isFoundation ? '1-Year Foundation' : '3-Year Specialization'}
        </span>
        <h3>{program.cardTitle}</h3>
        <p className="card-tagline">{program.tagline}</p>
      </div>

      <dl className="pc-facts">
        <div className="pc-fact">
          <dt>Duration</dt>
          <dd>{isFoundation ? '1 year' : '3 years'}</dd>
        </div>
        <div className="pc-fact">
          <dt>Weekly</dt>
          <dd>{isFoundation ? '2 hrs/week' : '4 hrs/week'}</dd>
        </div>
        <div className="pc-fact">
          <dt>Entry</dt>
          <dd>{entry}</dd>
        </div>
      </dl>

      <p className="pc-focus">
        <b>Focus · </b>
        {program.areas.slice(0, 3).join(' · ')}
      </p>

      <p className="pc-progression">
        {program.progression.map((stage, i) => (
          <span key={stage}>
            {i > 0 && <span className="pc-arrow" aria-hidden="true"> → </span>}
            {stage}
          </span>
        ))}
      </p>

      <Link
        to={`/programs/${program.slug}`}
        className="btn btn-secondary"
        aria-label={`Explore ${program.cardTitle}`}
      >
        Explore {program.shortTitle} <ArrowRight />
      </Link>
    </article>
  );
}
