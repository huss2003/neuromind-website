import { Link } from 'react-router-dom';
import type { Program } from '../data/types';
import { ArrowRight } from './Icons';

export default function ProgramCard({ program }: { program: Program }) {
  const isFoundation = program.category === 'foundation';
  return (
    <article
      className={`program-card card-hover${isFoundation ? ' foundation-card' : ''}`}
      style={{ ['--card-accent' as string]: program.accent }}
    >
      <div className="chip-row">
        {program.cardChips.map((chip) => (
          <span
            key={chip}
            className="chip"
            style={
              isFoundation
                ? { background: '#f5f3ff', color: '#6d28d9' }
                : undefined
            }
          >
            {chip}
          </span>
        ))}
      </div>

      <h3>{program.cardTitle}</h3>
      <p className="card-tagline">{program.tagline}</p>

      <ul className="card-areas">
        {program.areas.slice(0, 4).map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>

      <div className="card-prog">
        {program.progression.map((stage, i) => (
          <span key={stage}>
            {i > 0 && <span aria-hidden="true"> → </span>}
            <b>{stage}</b>
          </span>
        ))}
      </div>

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
