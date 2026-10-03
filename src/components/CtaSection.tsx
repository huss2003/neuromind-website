import { Link } from 'react-router-dom';
import { ArrowRight } from './Icons';

interface Props {
  title: string;
  sub: string;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
  tertiary?: { label: string; to: string };
}

export default function CtaSection({ title, sub, primary, secondary, tertiary }: Props) {
  return (
    <div className="container">
      <div className="cta-section reveal">
        <h2>{title}</h2>
        <p>{sub}</p>
        <div className="cta-actions">
          {primary && (
            <Link to={primary.to} className="btn btn-primary btn-lg">
              {primary.label} <ArrowRight />
            </Link>
          )}
          {secondary && (
            <Link to={secondary.to} className="btn btn-secondary btn-lg">
              {secondary.label}
            </Link>
          )}
          {tertiary && (
            <Link to={tertiary.to} className="btn btn-secondary btn-lg">
              {tertiary.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
